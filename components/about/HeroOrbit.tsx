"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowLeftRight,
  BarChart3,
  CalendarDays,
  Cpu,
  Handshake,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
   HERO ORBIT
   Seven disciplines circling one platform. Motion is driven
   from a single animation frame loop: angles live in refs and
   each node's transform is written straight to the DOM, so the
   labels stay upright and React never re-renders per frame.
   Hover, focus or tap a node to pause the orbits, draw a line
   to the core and reveal what the discipline covers; click or
   press Enter to jump to the story. Hidden below md, as before.
============================================================ */

type Discipline = {
  name: string;
  line: string;
  icon: LucideIcon;
  ring: 0 | 1 | 2;
};

const disciplines: Discipline[] = [
  { name: "Trade", icon: ArrowLeftRight, ring: 1, line: "Cross-border trade, global reach" },
  { name: "Technology", icon: Cpu, ring: 0, line: "Web3, AI & digital infrastructure" },
  { name: "Data", icon: BarChart3, ring: 0, line: "Structured data & insight" },
  { name: "Marketing", icon: Megaphone, ring: 1, line: "Positioning & growth" },
  { name: "Innovation", icon: Sparkles, ring: 2, line: "New operating models" },
  { name: "Business Dev.", icon: Handshake, ring: 2, line: "Partnerships & pipeline" },
  { name: "Events", icon: CalendarDays, ring: 2, line: "Curated events & gatherings" },
];

/* Diameter as a fraction of the box, seconds per revolution
   (negative = reverse) and where the first node on the ring starts. */
const rings = [
  { diameter: 0.32, period: 26, startDeg: 0, dashed: false, alpha: 0.28 },
  { diameter: 0.5, period: -46, startDeg: -45, dashed: true, alpha: 0.18 },
  { diameter: 0.78, period: 74, startDeg: -90, dashed: false, alpha: 0.12 },
] as const;

/* Even spread of the nodes on each ring */
const startAngles = disciplines.map((d, index) => {
  const siblings = disciplines.filter((s) => s.ring === d.ring);
  const slot = siblings.indexOf(disciplines[index]);
  return ((rings[d.ring].startDeg + (360 / siblings.length) * slot) * Math.PI) / 180;
});

const LABEL_WIDTH = 212;
const LABEL_GAP = 18;
const MAX_TILT = 6;
const PAUSE_MS = 300;
const IDLE_START_MS = 2000;
const IDLE_EVERY_MS = 3500;
const IDLE_SHOW_MS = 2000;

const orbitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

function measureBounds(box: HTMLElement) {
  const size = box.offsetWidth;
  const rect = box.getBoundingClientRect();
  const section = box.closest("section")?.getBoundingClientRect();
  if (!size || !rect.width || !section) return { min: 0, max: size };
  const k = size / rect.width; // undo the reveal scale
  return {
    min: Math.max(0, (section.left + 12 - rect.left) * k),
    max: Math.min(size, (section.right - 12 - rect.left) * k),
  };
}

function scrollToStory() {
  document.getElementById("story")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroOrbit() {
  const reduceMotion = useReducedMotion() ?? false;

  const [userActive, setUserActive] = useState<number | null>(null);
  const [idleActive, setIdleActive] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);
  const active = userActive ?? idleActive;

  const boxRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGLineElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  const anglesRef = useRef<number[]>([...startAngles]);
  const speedRef = useRef(1);
  const pausedRef = useRef(false);
  const activeRef = useRef<number | null>(null);
  const sizeRef = useRef(0);
  const boundsRef = useRef({ min: 0, max: 0 });
  const sideRef = useRef<"right" | "left">("right");
  const touchTapRef = useRef<{ index: number; wasActive: boolean } | null>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 60, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    pausedRef.current = userActive !== null;
  }, [userActive]);

  /* Box size for the frame loop, plus the horizontal room a label
     can use: the box itself, clipped to the hero section (which
     hides overflow). Re-measured whenever a label is about to show,
     since the reveal scale may still have been running before. */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const measure = () => {
      sizeRef.current = box.offsetWidth;
      boundsRef.current = measureBounds(box);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
    sideRef.current = "right";
    if (active !== null && boxRef.current) boundsRef.current = measureBounds(boxRef.current);
  }, [active]);

  useAnimationFrame((_, delta) => {
    const size = sizeRef.current;
    if (!size) return; // hidden below md

    const dt = Math.min(delta, 50);
    const target = pausedRef.current || reduceMotion ? 0 : 1;
    const step = dt / PAUSE_MS;
    speedRef.current =
      speedRef.current < target
        ? Math.min(target, speedRef.current + step)
        : Math.max(target, speedRef.current - step);

    const current = activeRef.current;
    const half = size / 2;

    disciplines.forEach((d, i) => {
      const ring = rings[d.ring];
      if (!reduceMotion && speedRef.current > 0) {
        anglesRef.current[i] += ((2 * Math.PI) / ring.period) * (dt / 1000) * speedRef.current;
      }

      const angle = anglesRef.current[i];
      const radius = (ring.diameter / 2) * size;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const node = nodeRefs.current[i];
      if (node) {
        node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${
          i === current ? 2 : 0
        }px)`;
      }

      if (i !== current) return;

      /* Line from node to core, in the SVG's 0–100 space */
      const px = 50 + (x / size) * 100;
      const py = 50 + (y / size) * 100;
      const line = lineRef.current;
      if (line) {
        line.setAttribute("x1", `${px}`);
        line.setAttribute("y1", `${py}`);
      }
      const gradient = gradientRef.current;
      if (gradient) {
        gradient.setAttribute("x1", `${px}`);
        gradient.setAttribute("y1", `${py}`);
      }

      /* Keep the label on its side unless it would leave the box */
      const label = labelRefs.current[i];
      if (label) {
        const { min, max } = boundsRef.current;
        const nodeX = half + x;
        const roomRight = max - (nodeX + LABEL_GAP);
        const roomLeft = nodeX - LABEL_GAP - min;
        const fits = (side: "right" | "left") =>
          (side === "right" ? roomRight : roomLeft) >= LABEL_WIDTH;

        if (!fits(sideRef.current)) {
          const other = sideRef.current === "right" ? "left" : "right";
          const roomOther = other === "right" ? roomRight : roomLeft;
          const roomCurrent = other === "right" ? roomLeft : roomRight;
          if (fits(other) || roomOther > roomCurrent) sideRef.current = other;
        }

        label.style.transform =
          sideRef.current === "right"
            ? `translate(${LABEL_GAP}px, -50%)`
            : `translate(calc(-100% - ${LABEL_GAP}px), -50%)`;
      }
    });
  });

  /* Pointer parallax across the whole hero section */
  useEffect(() => {
    const section = boxRef.current?.closest("section");
    if (!section) return;

    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      tiltX.set(0);
      tiltY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      // Hold the tilt while a node is active so it can't slide out from under the cursor
      if (event.pointerType !== "mouse" || pausedRef.current) return;
      const rect = section.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      tiltY.set(Math.max(-1, Math.min(1, nx)) * MAX_TILT);
      tiltX.set(Math.max(-1, Math.min(1, ny)) * -MAX_TILT);
    };

    const onLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, tiltX, tiltY]);

  /* Idle life: walk through the nodes until someone interacts */
  useEffect(() => {
    if (reduceMotion || interacted) return;

    let next = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    const highlight = () => {
      setIdleActive(next);
      next = (next + 1) % disciplines.length;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setIdleActive(null), IDLE_SHOW_MS);
    };

    const startTimer = setTimeout(() => {
      highlight();
      interval = setInterval(highlight, IDLE_EVERY_MS);
    }, IDLE_START_MS);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
      setIdleActive(null);
    };
  }, [reduceMotion, interacted]);

  /* A tap elsewhere dismisses a touch-activated node */
  useEffect(() => {
    if (userActive === null) return;
    const onDown = (event: PointerEvent) => {
      // Taps on any node are handled by that node's own handlers
      if ((event.target as Element | null)?.closest?.(".orbit-node")) return;
      setUserActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [userActive]);

  const activate = (index: number) => {
    pausedRef.current = true; // before this event's pointermove reaches the parallax
    setInteracted(true);
    setIdleActive(null);
    setUserActive(index);
  };

  const deactivate = (index: number) => {
    setUserActive((current) => (current === index ? null : current));
  };

  const activeDiscipline = active === null ? null : disciplines[active];

  return (
    <motion.div
      ref={boxRef}
      variants={orbitVariants}
      style={{ perspective: 1200 }}
      className="
        pointer-events-none
        absolute
        right-[-14%]
        top-1/2
        hidden
        aspect-square
        w-[440px]
        -translate-y-1/2
        select-none

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
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        {/* Core glow */}
        <div
          aria-hidden="true"
          className="about-core-breathe absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD5]/[0.13] blur-[46px]"
        />

        {/* Rings, cross-hair guides and the active connector */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              ref={gradientRef}
              id="about-orbit-connector"
              gradientUnits="userSpaceOnUse"
              x1="50"
              y1="50"
              x2="50"
              y2="50"
            >
              <stop offset="0%" stopColor="#00FFD5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="about-orbit-guide-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0" />
              <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="about-orbit-guide-h" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0" />
              <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect x="49.9" y="6" width="0.2" height="88" fill="url(#about-orbit-guide-v)" />
          <rect x="6" y="49.9" width="88" height="0.2" fill="url(#about-orbit-guide-h)" />

          {rings.map((ring, index) => (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={ring.diameter * 50}
              fill="none"
              stroke={`rgba(45, 212, 191, ${ring.alpha})`}
              strokeWidth="0.2"
              strokeDasharray={ring.dashed ? "0.7 0.9" : undefined}
            />
          ))}

          {active !== null && (
            <motion.line
              key={active}
              ref={lineRef}
              x1="50"
              y1="50"
              x2="50"
              y2="50"
              pathLength={1}
              stroke="url(#about-orbit-connector)"
              strokeWidth="0.3"
              strokeLinecap="round"
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </svg>

        {/* Core */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2DD4BF]/30 bg-[#0B1220]/60 backdrop-blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD5] shadow-[0_0_24px_6px_rgba(0,255,213,0.45)]"
        />

        {/* Core badge */}
        <div
          aria-hidden="true"
          data-active={active !== null}
          className="orbit-core absolute left-1/2 top-[calc(50%+9.5%)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#2DD4BF]/20 bg-[#0B1220]/75 px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#9FB3C3] backdrop-blur-sm"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={activeDiscipline?.name ?? "platform"}
              className="block"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              {activeDiscipline?.name ?? "One platform"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Discipline nodes */}
        <div role="group" aria-label="What we bring together">
          {disciplines.map((d, index) => {
            const Icon = d.icon;
            const isActive = active === index;
            const labelId = `about-orbit-label-${index}`;

            return (
              <div
                key={d.name}
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                className={`absolute left-1/2 top-1/2 h-7 w-7 ${isActive ? "z-20" : "z-10"}`}
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <button
                  type="button"
                  aria-label={`${d.name} — jump to who we are`}
                  aria-describedby={labelId}
                  data-active={isActive}
                  className="orbit-node"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") activate(index);
                  }}
                  onPointerLeave={(event) => {
                    // Keyboard focus keeps the label; a mouse click's focus does not
                    if (event.pointerType === "mouse" && !event.currentTarget.matches(":focus-visible")) {
                      deactivate(index);
                    }
                  }}
                  onPointerDown={(event) => {
                    if (event.pointerType === "mouse") return;
                    touchTapRef.current = { index, wasActive: userActive === index };
                    activate(index);
                  }}
                  onFocus={() => activate(index)}
                  onBlur={() => deactivate(index)}
                  onClick={() => {
                    const tap = touchTapRef.current;
                    touchTapRef.current = null;
                    // First tap on touch reveals the label; the second one jumps.
                    if (tap && tap.index === index && !tap.wasActive) return;
                    scrollToStory();
                  }}
                >
                  <span aria-hidden="true" />
                </button>

                <div
                  ref={(el) => {
                    labelRefs.current[index] = el;
                  }}
                  id={labelId}
                  role="tooltip"
                  data-visible={isActive}
                  className="orbit-label pointer-events-none absolute left-1/2 top-1/2 w-[212px] items-center gap-3 rounded-xl border border-white/15 bg-[#0B1220]/70 px-3 py-2.5 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] backdrop-blur-md"
                  style={{ transform: `translate(${LABEL_GAP}px, -50%)` }}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2DD4BF]/25 bg-[#00FFD5]/[0.08] text-[#00FFD5]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold leading-tight text-[#E7EDF3]">
                      {d.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-[#B2BCC7]">
                      {d.line}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
