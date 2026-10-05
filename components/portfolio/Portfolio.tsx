"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  type Variants,
} from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  BrainCircuit,
  Layers,
  CarFront,
  Building2,
  BarChart3,
  Globe2,
} from "lucide-react";
import styles from "./Portfolio.module.css";
import { projects } from "@/data/projects";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const sectors = [
  {
    number: "01",
    title: "Artificial Intelligence",
    description:
      "Intelligent systems built to solve complex business challenges.",
    tags: ["AI", "Machine learning", "Automation"],
    Icon: BrainCircuit,
    size: "large",
    image:
      "https://plus.unsplash.com/premium_photo-1680608979589-e9349ed066d5?q=80&w=764&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Digital Transformation",
    description: "Modern technology helping businesses evolve and scale.",
    tags: ["Cloud", "Strategy"],
    Icon: Layers,
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    title: "Automotive",
    description: "Technology shaping the future of mobility.",
    tags: ["Mobility", "Connected"],
    Icon: CarFront,
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1283&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Business Technology",
    description: "Digital infrastructure built around modern business needs.",
    tags: ["Platforms", "Systems"],
    Icon: Building2,
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1580920461931-fcb03a940df5?q=80&w=1170&auto=format&fit=crop",
  },
  {
    number: "05",
    title: "Digital Analytics",
    description: "Turning complex data into meaningful business intelligence.",
    tags: ["Data", "Insights"],
    Icon: BarChart3,
    size: "normal",
    image:
      "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1074&auto=format&fit=crop",
  },
  {
    number: "06",
    title: "Emerging Markets",
    description:
      "Exploring opportunities across high-growth markets and industries.",
    tags: ["Growth", "Markets", "Ventures"],
    Icon: Globe2,
    size: "wide",
    image:
      "https://images.unsplash.com/photo-1786340436214-76fd497c650b?q=80&w=1106&auto=format&fit=crop",
  },
];

const pillars = [
  {
    title: "Identify",
    text: "Spotting opportunities across technology and emerging markets.",
  },
  {
    title: "Develop",
    text: "Shaping promising ideas into clear, workable concepts.",
  },
  {
    title: "Build",
    text: "Launching ventures designed for a rapidly changing world.",
  },
];

const tagList = Array.from(new Set(sectors.flatMap((s) => s.tags)));

// words that rotate at the end of the hero headline
const rotatingWords = ["forward.", "further.", "faster.", "together."];

const orbits = [
  {
    cls: "ring1",
    nodes: [
      { Icon: BrainCircuit, angle: 0 },
      { Icon: BarChart3, angle: 180 },
    ],
  },
  {
    cls: "ring2",
    nodes: [
      { Icon: Layers, angle: 90 },
      { Icon: Building2, angle: 270 },
    ],
  },
  {
    cls: "ring3",
    nodes: [
      { Icon: CarFront, angle: 45 },
      { Icon: Globe2, angle: 225 },
    ],
  },
];

/* ─────────────────────────────────────────────
   FRAMER VARIANTS
───────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease,
      delay: i * 0.09,
    },
  }),
};

/* Hero-only variants (delays pushed back so they play after the loader) */

const heroRise: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.85, ease } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: 0.35 + d },
  }),
};

/* Hero starts only after the loader has finished */
const heroStart: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 2.2 },
  },
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

// Powers the cursor-following spotlight on tiles and project cards
function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

/* ─────────────────────────────────────────────
   EXTRA MOTION COMPONENTS
───────────────────────────────────────────── */

const curtainEase = [0.76, 0, 0.24, 1] as const;

/* 1 ─ Curtain loader: counter, then the screen wipes upward */
export function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = window.setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9));
      setN(v);
      if (v === 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 350);
      }
    }, 55);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.loader}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: curtainEase }}
        >
          <div className={styles.loaderWord}>
            {"BH VENTURES".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: curtainEase }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </div>
          <span className={styles.loaderCount}>{String(n).padStart(3, "0")}</span>
          <span className={styles.loaderBar} style={{ transform: `scaleX(${n / 100})` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* 2 ─ Cursor: dot + lagging lens that swells over anything interactive */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const lx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 });
  const ly = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 });
  const [big, setBig] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e: globalThis.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      setBig(!!el);
      setLabel(el?.dataset.cursor ?? "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div className={styles.dot} style={{ x, y }} />
      <motion.div
        className={styles.lens}
        style={{ x: lx, y: ly }}
        animate={{ scale: big ? (label ? 2.6 : 1.9) : 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </>
  );
}

/* 3 ─ Magnetic: wrap buttons so they lean toward the cursor */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });

  function move(e: MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </motion.div>
  );
}

/* 4 ─ Tilt: 3D parallax card with a moving glare */
export function Tilt({
  children,
  max = 8,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform(
    [sx, sy],
    ([a, b]) =>
      `radial-gradient(360px circle at ${(a as number) * 100}% ${(b as number) * 100}%, rgba(255,255,255,0.13), transparent 60%)`,
  );

  function move(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function leave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      className={`${styles.tilt} ${className ?? ""}`}
      style={{ rotateX, rotateY }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
      <motion.span className={styles.glare} style={{ background: glare }} />
    </motion.div>
  );
}

/* 5 ─ Scramble: text decodes letter by letter when it scrolls in / is hovered */
const GLYPHS = "▓▒░/\\<>+=#%&";

export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(text);
  const timer = useRef<number | undefined>(undefined);

  function run() {
    let frame = 0;
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      frame++;
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < frame / 2
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (frame / 2 >= text.length) window.clearInterval(timer.current);
    }, 28);
  }

  useEffect(() => {
    if (inView) run();
    return () => window.clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className} onMouseEnter={run} aria-label={text}>
      {out}
    </span>
  );
}

/* 6 ─ Scroll ring: live progress, click to return to top */
export function ScrollRing() {
  const { scrollYProgress } = useScroll();
  const len = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className={styles.scrollRing}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="21" className={styles.scrollRingTrack} />
            <motion.circle
              cx="24"
              cy="24"
              r="21"
              className={styles.scrollRingBar}
              style={{ pathLength: len }}
            />
          </svg>
          <span>↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* 7 ─ Film grain over everything */
export function Grain() {
  return <div className={styles.grain} aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null);

  /* rotating last word of the hero headline */
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setWordIndex((i) => (i + 1) % rotatingWords.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, []);

  /* scroll-linked motion */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  /* mouse parallax for the hero image composition (-0.5 → 0.5) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const archX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const archY = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const circleX = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const circleY = useTransform(sy, [-0.5, 0.5], [18, -18]);
  const squareX = useTransform(sx, [-0.5, 0.5], [-34, 34]);
  const squareY = useTransform(sy, [-0.5, 0.5], [-22, 22]);
  const chipX = useTransform(sx, [-0.5, 0.5], [18, -18]);
  const chipY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const outlineX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const outlineY = useTransform(sy, [-0.5, 0.5], [10, -10]);

  function onHeroMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onHeroLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <main className={styles.portfolio}>
      <Loader />
      <Cursor />
      <Grain />
      <ScrollRing />

      <div className={styles.backgroundGrid} />

      {/* ═══════════════════════════════════════
          HERO — editorial split with image composition
      ═══════════════════════════════════════ */}

      <section
        className={styles.hero}
        ref={heroRef}
        onMouseMove={onHeroMove}
        onMouseLeave={onHeroLeave}
      >
        {/* ambient background */}
        <div className={styles.heroGridLines} aria-hidden="true" />

        <motion.div
          className={`${styles.orb} ${styles.orbA}`}
          aria-hidden="true"
          animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`${styles.orb} ${styles.orbB}`}
          aria-hidden="true"
          animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <span className={styles.heroMark} aria-hidden="true">
          BH
        </span>

        <div className={styles.heroInner}>
          {/* ───────── LEFT: copy ───────── */}
          <motion.div className={styles.heroCopy} style={{ y: textY }}>
            <motion.div
              variants={heroStart}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={heroRise}
                className={styles.heroEyebrowWrap}
              >
                <span className={styles.heroEyebrowLine} />
                <p className={styles.eyebrow}>
                  <Scramble text="BH VENTURES / PORTFOLIO" />
                </p>
              </motion.div>

              <h1
                className={styles.heroTitle}
                aria-label="Ideas that move business forward."
              >
                <span className={styles.heroLineMask}>
                  <motion.span variants={maskLine} className={styles.heroLine}>
                    Ideas that
                  </motion.span>
                </span>

                <span className={styles.heroLineMask}>
                  <motion.span variants={maskLine} className={styles.heroLine}>
                    <span className={styles.heroMove}>move</span>
                    business
                  </motion.span>
                </span>

                <span className={styles.heroLineMask}>
                  <motion.span variants={maskLine} className={styles.heroLine}>
                    <span className={styles.heroRotator} aria-hidden="true">
                      <span className={styles.heroRotatorSizer}>together.</span>

                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={rotatingWords[wordIndex]}
                          className={styles.heroRotatorWord}
                          initial={{ y: "70%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-70%", opacity: 0 }}
                          transition={{ duration: 0.45, ease }}
                        >
                          {rotatingWords[wordIndex]}
                        </motion.span>
                      </AnimatePresence>

                      <svg
                        className={styles.heroSwoosh}
                        viewBox="0 0 300 18"
                        preserveAspectRatio="none"
                      >
                        <motion.path
                          d="M2 12 C 60 2, 140 18, 298 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.1, delay: 3.2, ease }}
                        />
                      </svg>
                    </span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={heroRise}
                className={styles.heroDescription}
              >
                Exploring ventures, technologies and opportunities shaping the
                future of business{" "}
                <span className={styles.heroShimmer}>
                  from Dubai and beyond.
                </span>
              </motion.p>

              <motion.div variants={heroRise} className={styles.heroActions}>
                <Magnetic>
                  <a href="#sectors" className={styles.heroButton}>
                    Explore our work
                    <motion.span
                      className={styles.heroButtonIcon}
                      animate={{ y: [0, 3, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ChevronDown size={14} strokeWidth={2.5} />
                    </motion.span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a href="#projects" className={styles.heroGhost}>
                    Selected projects
                    <ArrowUpRight size={15} strokeWidth={2.2} />
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ───────── RIGHT: image composition ───────── */}
          <motion.div className={styles.heroStage} style={{ y: stageY }}>
            {/* outlined arch behind */}
            <motion.div
              className={styles.heroArchOutline}
              style={{ x: outlineX, y: outlineY }}
              aria-hidden="true"
            />

            {/* main arch */}
            <motion.div
              className={styles.heroArch}
              style={{ x: archX, y: archY }}
              variants={pop}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85"
                alt="Dubai skyline"
              />
              <span className={styles.heroArchShade} />
              <span className={styles.heroArchTag}>
                <i /> Dubai · UAE
              </span>
            </motion.div>

            {/* rounded square, top left */}
            <motion.div
              className={styles.heroSquare}
              style={{ x: squareX, y: squareY }}
              variants={pop}
              custom={2.15}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                alt=""
              />
            </motion.div>

            {/* circle, bottom left */}
            <motion.div
              className={styles.heroCircle}
              style={{ x: circleX, y: circleY }}
              variants={pop}
              custom={2.3}
              initial="hidden"
              animate="visible"
            >
              <img
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80"
                alt=""
              />
            </motion.div>

            {/* rotating text badge */}
            <motion.div
              className={styles.heroBadge}
              variants={pop}
              custom={2.5}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            >
              <svg viewBox="0 0 120 120" className={styles.heroBadgeSpin}>
                <defs>
                  <path
                    id="bhBadgeCircle"
                    d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                  />
                </defs>
                <text>
                  <textPath href="#bhBadgeCircle">
                    IDENTIFY • DEVELOP • BUILD • IDENTIFY • DEVELOP • BUILD •
                  </textPath>
                </text>
              </svg>
              <span className={styles.heroBadgeCore}>
                <ArrowUpRight size={22} strokeWidth={2.2} />
              </span>
            </motion.div>

            {/* floating glass chips */}
            <motion.div
              className={`${styles.heroChip} ${styles.heroChipTop}`}
              style={{ x: chipX, y: chipY }}
              variants={pop}
              custom={2.6}
              initial="hidden"
              animate="visible"
            >
              <span className={styles.heroLiveDot} />
              <div>
                <strong>{projects.length}</strong>
                <small>Active initiatives</small>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.heroChip} ${styles.heroChipMid}`}
              style={{ x: chipX, y: chipY }}
              variants={pop}
              custom={2.75}
              initial="hidden"
              animate="visible"
            >
              <div>
                <strong>{sectors.length}</strong>
                <small>Sectors explored</small>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* bottom sector strip */}
        <motion.div
          className={styles.heroStrip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3, ease }}
        >
          <span>AI</span>
          <i />
          <span>Digital Transformation</span>
          <i />
          <span>Automotive</span>
          <i />
          <span>Analytics</span>
          <i />
          <span>Emerging Markets</span>
        </motion.div>

        {/* Scroll progress bar */}
        <motion.div
          className={styles.heroProgressBar}
          style={{ scaleX: scrollYProgress }}
        />
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeRow}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copy) => (
              <div className={styles.marqueeGroup} key={copy}>
                {sectors.map((s, i) => (
                  <span
                    className={`${styles.marqueeItem} ${
                      i % 2 ? styles.marqueeOutline : ""
                    }`}
                    key={`${copy}-${s.number}`}
                  >
                    {s.title}
                    <i className={styles.marqueeDot} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.marqueeRow} ${styles.marqueeRowSmall}`}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copy) => (
              <div className={styles.marqueeGroup} key={copy}>
                {tagList.map((tag) => (
                  <span
                    className={`${styles.marqueeItem} ${styles.marqueeItemSmall}`}
                    key={`${copy}-${tag}`}
                  >
                    {tag}
                    <i className={styles.marqueeDotSmall} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          INTRO
      ═══════════════════════════════════════ */}

      <motion.section
        className={styles.intro}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className={styles.sectionIndex}>01</div>

        <div className={styles.introContent}>
          <div className={styles.introCopy}>
            <p className={styles.sectionEyebrow}>
              <Scramble text="OUR PORTFOLIO" />
            </p>

            <h2>
              Building opportunities <span>for what comes next.</span>
            </h2>

            <p className={styles.introText}>
              BH Ventures works across technology, business and innovation to
              identify opportunities, develop ideas and build ventures
              designed for a rapidly changing world.
            </p>
          </div>

          <div className={styles.orbit} aria-hidden="true">
            {orbits.map((ring) => (
              <div
                className={`${styles.ring} ${styles[ring.cls]}`}
                key={ring.cls}
              >
                {ring.nodes.map((n) => {
                  const NodeIcon = n.Icon;
                  return (
                    <span
                      className={styles.node}
                      key={n.angle}
                      style={{ "--a": `${n.angle}deg` } as CSSProperties}
                    >
                      <span className={styles.nodeFace}>
                        <span className={styles.nodeInner}>
                          <NodeIcon strokeWidth={1.7} />
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}

            <div className={styles.orbitCore}>
              <span>BH</span>
            </div>
          </div>

          <div className={styles.pillars}>
            {pillars.map((p) => (
              <div className={styles.pillar} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════
          SECTORS
      ═══════════════════════════════════════ */}

      <section className={styles.sectors} id="sectors">
        <motion.div
          className={`${styles.sectionHeading} ${styles.sectorsHeading}`}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div>
            <p className={styles.sectionEyebrow}>
              <Scramble text="AREAS OF FOCUS" />
            </p>
            <h2>Where we operate</h2>
          </div>
          <p
            className={`${styles.headingDescription} ${styles.sectorsDescription}`}
          >
            We explore opportunities across industries where technology,
            innovation and business can create meaningful growth.
          </p>
        </motion.div>

        <div className={styles.bento}>
          {sectors.map((sector, i) => {
            const { Icon } = sector;
            const sizeClass =
              sector.size === "large"
                ? styles.tileLarge
                : sector.size === "wide"
                  ? styles.tileWide
                  : "";

            const pills = (
              <div className={styles.tilePills}>
                {sector.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            );

            return (
              <motion.div
                key={sector.number}
                className={`${styles.cell} ${sizeClass}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <Tilt className={styles.fill} max={6}>
                  <div
                    className={`${styles.tile} ${sizeClass}`}
                    onMouseMove={trackPointer}
                    data-cursor={sector.number}
                  >
                    <div className={styles.tileMedia}>
                      <img src={sector.image} alt="" loading="lazy" />
                    </div>
                    <div className={styles.tileShade} />
                    <div className={styles.tileGlow} />

                    <div className={styles.tileTop}>
                      <span className={styles.tileIcon} aria-hidden="true">
                        <Icon strokeWidth={1.6} />
                      </span>
                      <span className={styles.tileIndex}>{sector.number}</span>
                    </div>

                    {sector.size === "wide" ? (
                      <div className={styles.tileBody}>
                        <h3>{sector.title}</h3>
                        <div className={styles.tileWideText}>
                          <p>{sector.description}</p>
                          {pills}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.tileBody}>
                        <h3>{sector.title}</h3>
                        <p>{sector.description}</p>
                        {pills}
                      </div>
                    )}
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════ */}

      <section className={styles.projects} id="projects">
        <div className={styles.projectsLayout}>
          {/* Sticky intro column */}
          <motion.div
            className={styles.projectsIntro}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className={styles.sectionEyebrow}>
              <Scramble text="SELECTED PROJECTS" />
            </p>
            <h2>
              What we&apos;re <span>building</span>
            </h2>
            <p className={styles.projectsText}>
              A selection of current initiatives and concepts across our
              portfolio.
            </p>
            <span className={styles.projectsCount}>
              <b>{projects.length}</b>{" "}
              {projects.length === 1 ? "project" : "projects"}
            </span>
          </motion.div>

          {/* Compact horizontal cards */}
          <div className={styles.projectList}>
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <Tilt max={3}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className={styles.projectCard}
                    onMouseMove={trackPointer}
                    data-cursor="View"
                  >
                    <div className={styles.projectThumb}>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                      />
                      <span className={styles.projectNumber}>
                        {project.number}
                      </span>
                    </div>

                    <div className={styles.projectBody}>
                      <span className={styles.projectCategory}>
                        {project.category}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>

                      <div className={styles.projectFooter}>
                        <span
                          className={`${styles.status} ${
                            project.status === "ACTIVE"
                              ? styles.active
                              : project.status === "IN DEVELOPMENT"
                                ? styles.development
                                : styles.exploring
                          }`}
                        >
                          <span className={styles.statusDot} />
                          {project.status}
                        </span>

                        <span className={styles.viewArrow} aria-hidden="true">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FUTURE CTA — spotlight, fanned photo cards, ticker
      ═══════════════════════════════════════ */}

      <section className={styles.future} onMouseMove={trackPointer}>
        <div className={styles.futureImage}>
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=85"
            alt="Dubai architecture"
          />
        </div>

        <div className={styles.futureOverlay} />
        <div className={styles.futureGrid} aria-hidden="true" />
        <div className={styles.futureSpot} aria-hidden="true" />
        <span className={styles.futureGhost} aria-hidden="true">
          NEXT
        </span>

        <motion.div
          className={styles.futureLayout}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.futureContent}>
            <motion.div variants={itemVariants} className={styles.futureTop}>
              <p className={styles.sectionEyebrow}>
                <Scramble text="LOOKING AHEAD" />
              </p>
              <span className={styles.futureLive}>
                <i />
                Open to new ideas
              </span>
            </motion.div>

            <motion.h2 variants={wordContainer}>
              <motion.span variants={wordVariant} className={styles.futureWord}>
                The{" "}
              </motion.span>
              <motion.span variants={wordVariant} className={styles.futureWord}>
                next{" "}
              </motion.span>
              <motion.span
                variants={wordVariant}
                className={`${styles.futureWord} ${styles.futureOutline}`}
              >
                opportunity{" "}
              </motion.span>
              <br />
              {["starts", "with"].map((w) => (
                <motion.span
                  key={w}
                  variants={wordVariant}
                  className={styles.futureWord}
                >
                  {w}{" "}
                </motion.span>
              ))}
              <motion.span
                variants={wordVariant}
                className={`${styles.futureWord} ${styles.futureAccent}`}
              >
                an idea.
              </motion.span>
            </motion.h2>

            <motion.p variants={itemVariants}>
              We are continuously exploring new ventures, partnerships and
              opportunities across technology and emerging markets.
            </motion.p>

            <motion.div variants={itemVariants} className={styles.futureActions}>
              <Magnetic>
                <Link href="/contact" className={styles.cta}>
                  Start a conversation
                  <span aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </Magnetic>
              <span className={styles.futureLocation}>
                <i /> Dubai · UAE
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className={styles.futureStack}
            aria-label="Where ideas take shape"
          >
            {[
              {
                n: "01",
                label: "New ventures",
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
              },
              {
                n: "02",
                label: "Strategic partnerships",
                img: "https://images.unsplash.com/photo-1580920461931-fcb03a940df5?q=80&w=900&auto=format&fit=crop",
              },
              {
                n: "03",
                label: "Emerging markets",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
              },
            ].map((c) => (
              <div className={styles.futureCard} key={c.n}>
                <img src={c.img} alt="" loading="lazy" />
                <span className={styles.futureCardShade} />
                <span className={styles.futureCardNum}>{c.n}</span>
                <strong>{c.label}</strong>
              </div>
            ))}

            <div className={styles.futureBadge} aria-hidden="true">
              <svg viewBox="0 0 120 120" className={styles.futureBadgeSpin}>
                <defs>
                  <path
                    id="bhFutureCircle"
                    d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                  />
                </defs>
                <text>
                  <textPath href="#bhFutureCircle">
                    LET&apos;S BUILD • LET&apos;S BUILD • LET&apos;S BUILD •
                  </textPath>
                </text>
              </svg>
              <span className={styles.futureBadgeCore}>
                <ArrowUpRight size={22} strokeWidth={2.2} />
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ticker */}
        <div className={styles.futureTicker} aria-hidden="true">
          <div className={styles.futureTrack}>
            {[0, 1].map((copy) => (
              <div className={styles.futureTickerGroup} key={copy}>
                {[
                  "New ventures",
                  "Strategic partnerships",
                  "Emerging markets",
                  "Start a conversation",
                ].map((t) => (
                  <span key={`${copy}-${t}`}>
                    {t}
                    <i />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}