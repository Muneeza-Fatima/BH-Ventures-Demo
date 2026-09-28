"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import createGlobe, { type Globe, type Marker } from "cobe";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import HeroOrbit from "./HeroOrbit";

/* ============================================================
   HERO GLOBE
   A WebGL dot globe (cobe) marking the markets listed on the
   Home "Where We Operate" section. cobe 2 has no render loop of
   its own — it draws only when update() is called — so one
   animation frame loop here drives rotation, the Dubai pulse
   and the drag / chip springs, and simply stops while the hero
   is off-screen. Drag to spin, pick a market chip to fly to it,
   or use the arrow keys on the focused globe. Falls back to the
   HeroOrbit when WebGL is unavailable. Hidden below md, as the
   orbit was.
============================================================ */

type Market = {
  chip: string;
  label: string;
  location: [number, number];
  size: number;
};

const markets: Market[] = [
  { chip: "UAE", label: "Dubai · corporate base", location: [25.2048, 55.2708], size: 0.09 },
  { chip: "Pakistan", label: "Pakistan", location: [33.6844, 73.0479], size: 0.06 },
  { chip: "UK", label: "United Kingdom", location: [51.5074, -0.1278], size: 0.06 },
  { chip: "US", label: "United States", location: [40.7128, -74.006], size: 0.06 },
  { chip: "France", label: "France", location: [48.8566, 2.3522], size: 0.06 },
];

/* Angles that bring a location to the front of the globe.
   Checked against cobe 2's own lat/lng -> xyz mapping and its
   rotation matrix: each marker lands at the centre [0, 0, 1]. */
function locationToAngles(lat: number, lng: number): [number, number] {
  return [Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
}

/* Shortest signed distance between two angles, in [-PI, PI] */
function wrapAngle(angle: number) {
  const turn = Math.PI * 2;
  return ((((angle + Math.PI) % turn) + turn) % turn) - Math.PI;
}

const [START_PHI, START_THETA] = locationToAngles(...markets[0].location);

const AUTO_SPEED = 0.004; // radians per 60fps frame
const RESUME_MS = 2000;
const CHIP_HOLD_MS = 4000;
const TOUR_EVERY_MS = 4000;
const TOUR_HOLD_MS = 2500;
const DRAG_RADIANS_PER_PX = Math.PI / 600;
const KEY_STEP = 0.35;
const MAX_THETA = 1.2;
const SPRING = { stiffness: 60, damping: 20, mass: 1 };

/* Same reveal as the orbit it replaces */
const globeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

let webglSupport: boolean | undefined;

function supportsWebGL() {
  if (webglSupport === undefined) {
    try {
      // A throwaway canvas, so the real one is left free for cobe
      const gl = document.createElement("canvas").getContext("webgl");
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      webglSupport = !!gl;
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const noSubscribe = () => () => {};

/* The hero must never break: any render error inside the globe
   swaps in the orbit instead. */
class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <HeroOrbit /> : this.props.children;
  }
}

export default function HeroGlobe() {
  return (
    <GlobeBoundary>
      <GlobeCanvas />
    </GlobeBoundary>
  );
}

function GlobeCanvas() {
  const reduceMotion = useReducedMotion() ?? false;

  const webgl = useSyncExternalStore(noSubscribe, supportsWebGL, () => true);
  const [crashed, setFailed] = useState(false);
  const failed = !webgl || crashed;
  const [active, setActive] = useState<number | null>(0);
  const [interacted, setInteracted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(false);
  const reduceRef = useRef(reduceMotion);

  /* Rendered phi = autoPhi (the slow spin) + the sprung offset.
     Theta is sprung directly. */
  const autoPhiRef = useRef(START_PHI);
  const resumeAtRef = useRef(0);
  const dragRef = useRef<{
    id: number;
    x: number;
    y: number;
    phi: number;
    theta: number;
    lastX: number;
    lastT: number;
    velocity: number;
  } | null>(null);

  const phiTarget = useMotionValue(0);
  const thetaTarget = useMotionValue(START_THETA);
  const phiOffset = useSpring(phiTarget, SPRING);
  const theta = useSpring(thetaTarget, SPRING);

  useEffect(() => {
    reduceRef.current = reduceMotion;
  }, [reduceMotion]);

  /* Create the globe the first time the box has a size and is on
     screen, run the frame loop only while it stays on screen, and
     keep the drawing buffer at size x devicePixelRatio (2). */
  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;

    let globe: Globe | null = null;
    let frame = 0;
    let lastTime = 0;
    let size = 0;
    let firstFrame = true;
    let lastDrawn = "";

    const markersAt = (time: number): Marker[] =>
      markets.map((market, index) => ({
        location: market.location,
        size:
          index === 0 && !reduceRef.current
            ? 0.1 + 0.02 * Math.sin(time / 380) // Dubai pulses 0.08–0.12
            : market.size,
      }));

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!globe) return;

      const dt = lastTime ? Math.min(time - lastTime, 64) : 16.67;
      lastTime = time;

      const autoOn =
        !reduceRef.current && !dragRef.current && performance.now() >= resumeAtRef.current;
      if (autoOn) autoPhiRef.current += AUTO_SPEED * (dt / 16.67);

      const phi = autoPhiRef.current + phiOffset.get();
      const th = theta.get();
      const pulsing = !reduceRef.current;

      // Nothing moving (reduced motion, settled): skip the GPU work
      const key = `${phi.toFixed(5)}|${th.toFixed(5)}|${size}`;
      if (!pulsing && key === lastDrawn && !firstFrame) return;
      lastDrawn = key;

      try {
        globe.update({ phi, theta: th, markers: markersAt(time) });
      } catch {
        stop();
        setFailed(true);
        return;
      }

      if (firstFrame) {
        firstFrame = false;
        canvas.dataset.ready = "true"; // fades the canvas in
      }
    };

    const start = () => {
      if (frame || !globe) return;
      lastTime = 0;
      frame = requestAnimationFrame(draw);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const create = () => {
      if (globe || !size) return;
      try {
        globe = createGlobe(canvas, {
          devicePixelRatio: 2,
          width: size,
          height: size,
          phi: autoPhiRef.current + phiOffset.get(),
          theta: theta.get(),
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.16, 0.26, 0.34],
          markerColor: [0, 1, 0.84],
          glowColor: [0.04, 0.26, 0.25],
          opacity: 0.92,
          scale: 1.05,
          // Flush with the surface, so markers on the far side are culled at the limb
          markerElevation: 0,
          markers: markersAt(0),
        });
      } catch {
        setFailed(true);
      }
    };

    const onContextLost = () => {
      stop();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const resizeObserver = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next === size) return;
      size = next;
      if (!size) return; // hidden below md
      if (globe) {
        globe.update({ width: size, height: size });
        lastDrawn = "";
      } else if (visibleRef.current) {
        create();
        start();
      }
    });
    resizeObserver.observe(box);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        create();
        start();
      } else {
        stop();
      }
    });
    intersectionObserver.observe(box);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      globe?.destroy();
      globe = null;
    };
  }, [phiOffset, theta]);

  /* Point the globe at a market along the shortest path */
  const flyTo = (index: number) => {
    const [phi, th] = locationToAngles(...markets[index].location);
    const current = autoPhiRef.current + phiOffset.get();
    phiTarget.set(phiOffset.get() + wrapAngle(phi - current));
    thetaTarget.set(th);
  };

  const holdAutoRotate = (ms: number) => {
    resumeAtRef.current = performance.now() + ms;
  };

  /* Idle auto-tour until the first interaction */
  useEffect(() => {
    if (reduceMotion || interacted || failed) return;
    let next = 1;
    const interval = setInterval(() => {
      if (!visibleRef.current) return;
      setActive(next);
      flyTo(next);
      holdAutoRotate(TOUR_HOLD_MS);
      next = (next + 1) % markets.length;
    }, TOUR_EVERY_MS);
    return () => clearInterval(interval);
    // flyTo only reads refs and motion values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, interacted, failed]);

  const selectChip = (index: number) => {
    setInteracted(true);
    setActive(index);
    flyTo(index);
    holdAutoRotate(CHIP_HOLD_MS);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      phi: phiTarget.get(),
      theta: thetaTarget.get(),
      lastX: event.clientX,
      lastT: event.timeStamp,
      velocity: 0,
    };
    setDragging(true);
    setInteracted(true);
    setActive(null);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const dt = event.timeStamp - drag.lastT;
    if (dt > 0) {
      const velocity = (event.clientX - drag.lastX) / dt; // px per ms
      drag.velocity = drag.velocity * 0.6 + velocity * 0.4;
    }
    drag.lastX = event.clientX;
    drag.lastT = event.timeStamp;

    phiTarget.set(drag.phi + (event.clientX - drag.x) * DRAG_RADIANS_PER_PX);
    thetaTarget.set(
      Math.max(
        -MAX_THETA,
        Math.min(MAX_THETA, drag.theta + (event.clientY - drag.y) * DRAG_RADIANS_PER_PX)
      )
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    // A little inertia: carry the release velocity a short way on
    phiTarget.set(phiTarget.get() + drag.velocity * 180 * DRAG_RADIANS_PER_PX);
    dragRef.current = null;
    setDragging(false);
    holdAutoRotate(RESUME_MS);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return; // chips keep their own keys
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setInteracted(true);
    setActive(null);
    phiTarget.set(phiTarget.get() + (event.key === "ArrowRight" ? KEY_STEP : -KEY_STEP));
    holdAutoRotate(RESUME_MS);
  };

  if (failed) return <HeroOrbit />;

  const activeMarket = active === null ? null : markets[active];

  return (
    <motion.div
      ref={boxRef}
      variants={globeVariants}
      tabIndex={0}
      role="group"
      aria-label="Globe of the markets we operate in. Use the left and right arrow keys to rotate it."
      onKeyDown={onKeyDown}
      // -z-10: sit under the heading copy (the orbit's rings were see-through, the globe is not)
      className="
        hero-globe
        pointer-events-none
        absolute
        -z-10
        right-[-14%]
        top-1/2
        hidden
        aspect-square
        w-[440px]
        -translate-y-1/2
        select-none
        rounded-full

        md:block
        lg:right-[-6%]
        lg:w-[560px]
        xl:right-[1%]
        xl:w-[640px]
        2xl:right-[4%]
        2xl:w-[700px]

        [@media(min-width:1024px)_and_(max-width:1366px)]:right-[-10%]
        [@media(min-width:1024px)_and_(max-width:1366px)]:w-[500px]
      "
    >
      {/* Atmosphere: soft teal glow and a hairline at the globe's edge */}
      <div aria-hidden="true" className="hero-globe-atmosphere absolute inset-[8%] rounded-full" />
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full border border-[#2DD4BF]/20"
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`
          hero-globe-canvas
          pointer-events-auto
          absolute
          inset-0
          h-full
          w-full
          ${dragging ? "cursor-grabbing" : "cursor-grab"}
        `}
      />

      {/* Market chips */}
      {/* Below lg the box overhangs the clipped hero edge, so keep the chips clear of it */}
      <div className="absolute inset-x-0 bottom-[1%] flex flex-col items-center gap-2.5 pr-[16%] lg:pr-0">
        <div aria-live="polite" className="h-6">
          {activeMarket && (
            <span
              key={activeMarket.chip}
              className="
                hero-globe-label
                inline-flex
                items-center
                gap-2
                text-[12px]
                font-semibold
                tracking-[0.02em]
                text-[#E7EDF3]/85
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FFD5] shadow-[0_0_8px_rgba(0,255,213,0.8)]" />
              {activeMarket.label}
            </span>
          )}
        </div>

        <div className="pointer-events-auto flex flex-wrap justify-center gap-1.5">
          {markets.map((market, index) => (
            <button
              key={market.chip}
              type="button"
              data-active={active === index}
              aria-pressed={active === index}
              onClick={() => selectChip(index)}
              className="
                hero-globe-chip
                rounded-full
                border
                border-white/[0.14]
                bg-[#0B1220]/55
                px-3
                py-1.5
                text-[10.5px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/65
                backdrop-blur-md
              "
            >
              {market.chip}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
