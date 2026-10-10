"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* How long each statement stays before switching on its own. Any
   click or keyboard selection hands control to the visitor for good. */
const AUTOPLAY_MS = 6000;

type Pillar = {
  id: "vision" | "mission";
  eyebrow: string;
  title: string;
  body: string;
  /* Short anchors lifted straight from the statement above them —
     nothing new is claimed, they just make the copy scannable. */
  anchors: string[];
  /* Solid colour for this pillar (active tab, label, chips) */
  accent: string;
};

const pillars: Pillar[] = [
  {
    id: "vision",
    eyebrow: "Vision",
    title: "To become a trusted multi-sector ventures company.",
    body: "One that bridges traditional trade with cutting-edge technology and creates value through innovation and execution.",
    anchors: ["Trusted", "Multi-sector", "Trade + Technology"],
    accent: "#0F766E",
  },
  {
    id: "mission",
    eyebrow: "Mission",
    title: "Identify opportunity. Build capability. Create value.",
    body: "We identify high-potential opportunities in technology and trade, build professional capabilities, and create lasting value for clients, partners, and stakeholders through integrity, innovation, and execution excellence.",
    anchors: ["Integrity", "Innovation", "Execution excellence"],
    accent: "#33658A",
  },
];

const headerReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const panelReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: 0.1 },
  },
};

/* ============================================================
   PURPOSE DRAWINGS
   Small animated illustrations. Vision: a target board with an
   arrow landing in the bullseye. Mission: three rising steps
   (identify, build, create value) topped by a flag.
============================================================ */

function PurposeDrawing({
  kind,
  color,
}: {
  kind: Pillar["id"];
  color: string;
}) {
  const draw = (delay: number, duration = 1) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration, delay, ease: EASE },
  });

  if (kind === "vision") {
    /* Target board; an arrow flies in from the top-right and lands in
       the bullseye, then keeps a small quiver. */
    return (
      <motion.svg viewBox="0 0 220 240" className="absolute inset-0 h-full w-full overflow-visible" fill="none" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
        {[78, 56, 34].map((r, i) => (
          <motion.circle
            key={r}
            cx="100"
            cy="130"
            r={r}
            stroke={color}
            strokeOpacity={0.35 + i * 0.25}
            strokeWidth={2}
            {...draw(i * 0.15, 0.8)}
          />
        ))}
        <motion.circle
          cx="100"
          cy="130"
          r="12"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
          style={{ originX: "100px", originY: "130px" }}
        />

        {/* Arrow: flies in, then quivers pointing at the centre */}
        <motion.g
          initial={{ x: 50, y: -50, opacity: 0 }}
          animate={{ x: [50, 0, 3, 0], y: [-50, 0, -3, 0], opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: EASE, times: [0, 0.6, 0.8, 1] }}
        >
          <motion.g
            animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
            transition={{ duration: 1.4, delay: 2.1, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M104 126 L150 80" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
            <path d="M104 126 L114 124 M104 126 L106 116" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
            <path d="M150 80 L159 77 M150 80 L153 71 M144 86 L153 83 M144 86 L147 77" stroke={color} strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </motion.svg>
    );
  }

  /* Mission: three rising steps (Identify, Build, Create value) with a
     flag planted on the top step. */
  const steps = [
    { x: 14, y: 170, h: 50, label: "1" },
    { x: 78, y: 130, h: 90, label: "2" },
    { x: 142, y: 90, h: 130, label: "3" },
  ];

  return (
    <motion.svg viewBox="0 0 220 240" className="absolute inset-0 h-full w-full overflow-visible" fill="none" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
      {steps.map((step, i) => (
        <motion.g
          key={step.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08, ease: EASE }}
        >
          <rect
            x={step.x}
            y={step.y}
            width="58"
            height={step.h}
            rx="8"
            fill={color}
            fillOpacity={0.12 + i * 0.12}
            stroke={color}
            strokeWidth={2}
          />
          <text x={step.x + 29} y={step.y + 26} textAnchor="middle" fontSize="16" fontWeight="700" fill={color}>
            {step.label}
          </text>
        </motion.g>
      ))}

      {/* Flag on the top step */}
      <motion.path d="M171 90 V40" stroke={color} strokeWidth={2.5} strokeLinecap="round" {...draw(0.2, 0.35)} />
      <motion.path
        d="M171 42 L203 52 L171 64 Z"
        fill={color}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0.9, 1], opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        style={{ originX: "171px", transformBox: "view-box" }}
      />

      {/* Rising path over the steps */}
      <motion.path
        d="M30 160 Q80 110 100 120 T170 76"
        stroke={color}
        strokeOpacity={0.5}
        strokeWidth={2}
        {...draw(0.15, 0.6)}
      />
    </motion.svg>
  );
}

export default function AboutMissionVision() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);

  const autoplaying = inView && !manual && !prefersReducedMotion;

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % pillars.length),
      AUTOPLAY_MS
    );
    return () => window.clearTimeout(id);
  }, [autoplaying, active]);

  const select = (index: number) => {
    setManual(true);
    setActive(index);
  };

  const pillar = pillars[active];

  return (
    <section
      id="about-mission-vision"
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
        bg-[#F7F9F8]
        py-16
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          px-6
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}
        <motion.div
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-12 flex flex-col gap-6 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#14B8A6]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0F766E] sm:text-[12px]">
                Purpose
              </span>
            </div>

            <h2
              className="
                font-heading
                max-w-[640px]
                text-[2.1rem]
                font-bold
                leading-[1.12]
                tracking-[-0.028em]
                text-[#132B40]
                sm:text-[2.5rem]
                lg:text-[2.875rem]
              "
            >
              Where we&apos;re headed,{" "}
              <span className="text-[#0F766E]">and how.</span>
            </h2>
          </div>

          <p className="max-w-[400px] text-[15px] font-normal leading-[1.75] text-[#52697A] sm:text-[16px] lg:pb-1.5 lg:text-right">
            The long-term ambition, and the day-to-day discipline that gets us
            there.
          </p>
        </motion.div>

        {/* =====================================================
            INTERACTIVE PANEL
            Left: Vision / Mission selector. Right: the active
            statement, swapped with a crossfade.
        ===================================================== */}
        <motion.div
          variants={panelReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => setInView(true)}
          className="
            grid
            grid-cols-1
            overflow-hidden
            rounded-[28px]
            border
            border-2
            border-[#0F1B2D]
            bg-white
            shadow-[0_28px_70px_rgba(19,43,64,0.16)]

            lg:grid-cols-[340px_1fr]
            xl:grid-cols-[380px_1fr]
          "
        >
          {/* Selector */}
          <div
            role="tablist"
            aria-label="Purpose"
            className="
              grid
              grid-cols-2
              gap-2
              border-b
              border-[#14B8A6]/40
              bg-[#0F1B2D]
              p-3
              [-webkit-tap-highlight-color:transparent]

              lg:grid-cols-1
              lg:content-start
              lg:gap-3
              lg:border-b-0
              lg:border-r
              lg:p-6
            "
          >
            {pillars.map((item, index) => {
              const isActive = index === active;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="purpose-panel"
                  onClick={() => select(index)}
                  style={
                    isActive
                      ? { backgroundColor: item.accent, borderColor: item.accent }
                      : { borderLeftColor: item.accent, borderLeftWidth: 4 }
                  }
                  className={`
                    relative
                    flex
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-[18px]
                    px-4
                    py-2.5
                    text-left
                    outline-none
                    transition-colors
                    duration-300
                    focus-visible:ring-2
                    focus-visible:ring-[#14B8A6]

                    lg:items-start
                    lg:px-5
                    lg:py-5

                    ${
                      isActive
                        ? "border-[1.5px] text-white"
                        : "border-[1.5px] border-white/25 bg-white/[0.06] text-white hover:bg-white/[0.10]"
                    }
                  `}
                >

                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold sm:text-[16px]">
                      {item.eyebrow}
                    </span>
                    <span
                      className={`
                        mt-1
                        hidden
                        text-[13px]
                        leading-[1.5]
                        lg:block
                        ${isActive ? "text-white/85" : "text-white/70"}
                      `}
                    >
                      {item.title}
                    </span>
                  </span>

                  {/* Big arrow on the active tab, nudging toward the statement */}
                  {isActive && (
                    <span aria-hidden="true" className="about-arrow-nudge shrink-0 text-white">
                      <ArrowRight size={20} strokeWidth={2.2} className="hidden lg:block" />
                      <ArrowDown size={18} strokeWidth={2.2} className="lg:hidden" />
                    </span>
                  )}

                  {/* Autoplay progress */}
                  {isActive && autoplaying && (
                    <motion.span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-white/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Statement */}
          <div
            id="purpose-panel"
            role="tabpanel"
            aria-live="polite"
            className="
              relative
              flex
              flex-col
              min-h-[460px]
              p-6
              sm:min-h-[380px]
              sm:p-10
              lg:min-h-[400px]
              lg:p-14
              xl:p-16
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex flex-1 flex-col lg:pr-[260px] xl:pr-[300px]"
              >
                <p
                  className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: pillar.accent }}
                >
                  Our {pillar.eyebrow}
                </p>

                <h3
                  className="
                    font-heading
                    mt-3!
                    sm:mt-5!
                    max-w-[720px]
                    text-[1.6rem]
                    font-bold
                    leading-[1.18]
                    tracking-[-0.025em]
                    text-[#132B40]
                    sm:text-[2.2rem]
                    lg:text-[2.6rem]
                  "
                >
                  {pillar.title}
                </h3>

                <p className="mt-4! sm:mt-6! max-w-[640px] text-[15.5px] leading-[1.75]! sm:leading-[1.8]! font-normal text-[#2F4659] sm:text-[16px] lg:text-[17px]">
                  {pillar.body}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-6 sm:mt-8 sm:gap-2.5 sm:pt-0">
                  {pillar.anchors.map((anchor, i) => (
                    <motion.li
                      key={anchor}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE }}
                      style={{ borderColor: pillar.accent, color: pillar.accent }}
                      className="
                        rounded-full
                        border-[1.5px]
                        bg-white
                        px-3.5
                        sm:px-4
                        py-1
                        sm:py-1.5
                        text-[13px]
                        font-semibold
                      "
                    >
                      {anchor}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Line drawing related to the active pillar: below the text on
                phones/tablets, to the right of it on desktop */}
            <div aria-hidden="true" className="pointer-events-none relative mx-auto mt-6 h-[170px] w-[190px] sm:h-[200px] sm:w-[220px] lg:absolute lg:right-10 lg:top-1/2 lg:mt-0 lg:h-[240px] lg:w-[220px] lg:-translate-y-1/2 xl:right-14 xl:w-[250px]">
              <AnimatePresence>
                <PurposeDrawing key={pillar.id} kind={pillar.id} color={pillar.accent} />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
