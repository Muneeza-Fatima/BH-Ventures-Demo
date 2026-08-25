"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeftRight,
  Cpu,
  BarChart3,
  Megaphone,
  Sparkles,
  Handshake,
  CalendarDays,
  Landmark,
  Globe,
  ShieldCheck,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const threads = [
  { label: "Trade", icon: ArrowLeftRight },
  { label: "Technology", icon: Cpu },
  { label: "Data", icon: BarChart3 },
  { label: "Marketing", icon: Megaphone },
  { label: "Innovation", icon: Sparkles },
  { label: "Business Dev.", icon: Handshake },
  { label: "Events", icon: CalendarDays },
];

/* ============================================================
   Thematic platform stages — not a year-by-year company history.
   No dates are implied; only verified, source-backed facts and
   disciplines are referenced (Ajman Free Zone, nine licensed
   activities, trade + technology, multi-sector platform). The
   fact badge on each stage is drawn from the same verified set
   used on the Facts section — nothing here is invented.
============================================================ */

const journeySteps = [
  {
    id: "foundation",
    label: "Foundation",
    title: "Registered in Ajman Free Zone",
    description:
      "BH Ventures FZE LLC is registered as a UAE free-zone entity on a simple thesis: trade and technology belong on one platform, not two.",
    icon: Landmark,
    badge: {
      label: "Ajman Free Zone",
      secondary: "Registered as a UAE free-zone entity.",
    },
  },
  {
    id: "trade",
    label: "Trade",
    title: "International trade, global reach",
    description:
      "Cross-border trade gives the platform market access and distribution reach across strategically selected regions.",
    icon: ArrowLeftRight,
    badge: {
      label: "UAE Based",
      secondary: "Headquartered in the UAE, trading globally.",
    },
  },
  {
    id: "technology",
    label: "Technology",
    title: "Modern technology, applied",
    description:
      "Web3, AI, and modern digital infrastructure are applied to real operating ventures — tools to move faster and decide smarter.",
    icon: Cpu,
    badge: {
      label: "Trade + Technology",
      secondary: "Modern tools applied to real ventures.",
    },
  },
  {
    id: "innovation",
    label: "Innovation",
    title: "Disciplines that don't usually mix",
    description:
      "Data, marketing, business development, and events combine with trade and technology inside one coherent venture platform.",
    icon: Sparkles,
    badge: {
      label: "Multi-Sector Platform",
      secondary: "One platform, spanning several disciplines.",
    },
  },
  {
    id: "global-opportunity",
    label: "Global Opportunity",
    title: "Nine activities, one license",
    description:
      "A licensed portfolio of nine business activities operates under a single founder-led platform, built for what comes next.",
    icon: Globe,
    badge: {
      label: "9 Licensed Activities",
      secondary: "Nine licensed business activities, one license.",
    },
  },
];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

/* ============================================================
   Timeline intro stagger — pill, heading, supporting text,
   selector, card. Tuned to land fully revealed in ~0.9s so the
   entry never reads as sluggish.
============================================================ */

const timelineEntryContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.03,
    },
  },
};

const timelineEntryItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/*
  The selector and card reveal on the same trigger as the heading
  block above (via the `revealed` flag, not their own whileInView),
  so they land as steps 4 and 5 of the same ~0.9s entry sequence
  regardless of how the heading's own viewport entry fires.
*/

const selectorRevealVariant = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.3 },
  },
};

const cardRevealVariant = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.39 },
  },
};

/* ============================================================
   Fires an incrementing "signal" whenever the active stage
   changes (never on initial mount) — used to trigger the
   one-time pulse/tracer micro-interaction.
============================================================ */

function useStageChangeSignal(activeIndex: number) {
  const [signal, setSignal] = useState(0);
  const prevIndex = useRef(activeIndex);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prevIndex.current = activeIndex;
      return;
    }

    if (prevIndex.current !== activeIndex) {
      prevIndex.current = activeIndex;
      setSignal((s) => s + 1);
    }
  }, [activeIndex]);

  return signal;
}

/* ============================================================
   Section background handoff.
   A softly masked wash (not a divider or a banded strip) fades in
   behind the Timeline block once it scrolls into view — a subtle
   tonal shift that signals a new chapter without a hard edge
   anywhere. Driven by the same `revealed` flag as the entry
   stagger so it lands in the same beat as the rest of the intro.
============================================================ */

function TimelineBackdrop({ visible }: { visible: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="
        pointer-events-none
        absolute
        inset-x-[-8vw]
        -top-16
        bottom-0
        -z-10
        bg-gradient-to-b
        from-[#0B1626]
        via-[#0A1420]
        to-[#0B1220]
        [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]
        [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]
      "
    />
  );
}

/* ============================================================
   One-time pulse + tracer.
   A small ring ripples from the newly active pill's position and
   a thin luminous tracer briefly drops toward the content card.
   Keyed by `signal` so it replays once per stage change and never
   loops. Skipped entirely under prefers-reduced-motion.
============================================================ */

function StageSignal({
  signal,
  originPercent,
}: {
  signal: number;
  originPercent: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || signal === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.span
        key={`ring-${signal}`}
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5EEAD4]"
        style={{ left: `${originPercent}%` }}
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 0, scale: 7 }}
        transition={{ duration: 0.55, ease: EASE }}
      />

      <motion.span
        key={`tracer-${signal}`}
        className="absolute top-full h-10 w-px bg-gradient-to-b from-[#5EEAD4]/70 via-[#2DD4BF]/25 to-transparent"
        style={{ left: `${originPercent}%`, transformOrigin: "top" }}
        initial={{ opacity: 0, scaleY: 0.15 }}
        animate={{ opacity: [0, 0.75, 0], scaleY: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </div>
  );
}

/* ============================================================
   Timeline stage selector — real buttons, horizontally arranged.
   The active fill travels between pills via layoutId rather than
   disappearing and reappearing.
============================================================ */

function TimelineSelector({
  activeIndex,
  onSelect,
  className = "",
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="Timeline stages"
      className={`flex items-center gap-2 sm:gap-2.5 ${className}`}
    >
      {journeySteps.map((step, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive ? "step" : undefined}
            className={`
              group
              relative
              shrink-0
              rounded-full
              border
              px-4
              py-2
              text-[12px]
              font-bold
              tracking-[-0.01em]
              outline-none
              transition-colors
              duration-300

              focus-visible:ring-2
              focus-visible:ring-[#5EEAD4]/70
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0F1B2D]

              ${isActive ? "border-transparent" : "border-white/[0.12] hover:border-white/[0.22]"}
            `}
          >
            {isActive && (
              <motion.span
                layoutId="timelineActivePill"
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  ease: EASE,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00CDB5] to-[#00FFD5] shadow-[0_10px_26px_rgba(0,205,181,0.35)]"
              />
            )}

            <span
              className={`relative z-10 block ${
                isActive ? "text-[#06251F]" : "text-white/45 group-hover:text-white/75"
              }`}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   Small verified fact badge. Restrained hover/focus lift, a
   short spring nudge on tap, and an optional secondary line
   that reveals on toggle. Every label is drawn from the same
   verified facts used on the Facts section — nothing invented.
============================================================ */

function FactBadge({
  label,
  secondary,
}: {
  label: string;
  secondary: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
      whileHover={{ y: -4 }}
      whileFocus={{ y: -4 }}
      whileTap={{ y: -6 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className="
        mt-6
        inline-flex
        max-w-fit
        flex-col
        items-start
        gap-1
        rounded-2xl
        border
        border-white/[0.12]
        bg-white/[0.03]
        px-4
        py-2.5
        text-left

        transition-colors
        duration-300

        hover:border-[#2DD4BF]/50
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#5EEAD4]/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0F1D2C]
      "
    >
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5EEAD4]">
        <ShieldCheck size={12} strokeWidth={2} aria-hidden="true" />
        {label}
      </span>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="block overflow-hidden text-[11px] font-medium text-white/50"
          >
            {secondary}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ============================================================
   Content card. Fixed outer size so nothing ever jumps as stages
   change — only the inner text/visual crossfade. The visual pane
   leads by ~80ms before the text; the old visual softly fades and
   scales out while the new one crossfades in.
============================================================ */

function JourneyPanel({ activeIndex }: { activeIndex: number }) {
  const step = journeySteps[activeIndex];
  const Icon = step.icon;

  return (
    <div
      className="
        relative
        grid
        h-full
        w-full
        grid-cols-1
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.10]
        bg-gradient-to-br
        from-[#132436]
        via-[#0F1D2C]
        to-[#0B1220]
        shadow-[0_25px_70px_rgba(0,0,0,0.35)]

        sm:grid-cols-2
      "
    >
      {/* Text pane */}
      <div className="relative z-10 order-2 flex flex-col justify-center p-6 sm:order-1 sm:p-8 lg:p-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/35">
          Stage {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(journeySteps.length).padStart(2, "0")}
        </p>

        <div className="relative mt-6 min-h-[250px] sm:min-h-[210px]">
          <AnimatePresence mode="sync">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.48, delay: 0.08, ease: EASE },
              }}
              exit={{
                opacity: 0,
                y: -14,
                transition: { duration: 0.45, ease: EASE },
              }}
              className="absolute inset-0"
            >
              <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[22px] lg:text-[24px]">
                {step.title}
              </h3>

              <p className="pt-3 max-w-[420px] text-[13.5px] font-medium leading-7 text-white/60 sm:text-[14px] lg:text-[15px]">
                {step.description}
              </p>

              <FactBadge label={step.badge.label} secondary={step.badge.secondary} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Visual pane */}
      <div className="relative order-1 flex items-center justify-center py-8 sm:order-2 sm:py-0">
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.06]
            [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
            [background-size:34px_34px]
          "
        />

        <AnimatePresence mode="sync">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, ease: EASE },
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.45, ease: EASE },
            }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute flex flex-col items-center gap-4"
          >
            <span
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[22px]
                border
                border-[#2DD4BF]/30
                bg-[#0E4A44]/50
                text-[#5EEAD4]

                shadow-[0_18px_38px_rgba(0,0,0,0.35)]

                transition-shadow
                duration-300

                hover:shadow-[0_22px_46px_rgba(0,205,181,0.28)]

                sm:h-20
                sm:w-20
              "
            >
              <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
            </span>

            <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-white/50">
              {step.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   Timeline stages — click-driven, no scroll-jacking.
   Normal page scroll simply moves through the page; the active
   stage only changes when a pill is clicked (or reached via
   keyboard), so a visitor can jump straight from Foundation to
   Global Opportunity in one interaction. The card itself keeps
   the premium crossfade (visual leads by ~80ms, text follows)
   and fixed footprint per breakpoint so nothing reflows as the
   stage changes.
============================================================ */

function TimelineStages({ revealed }: { revealed: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const signal = useStageChangeSignal(activeIndex);
  const originPercent =
    journeySteps.length > 1 ? (activeIndex / (journeySteps.length - 1)) * 100 : 50;

  return (
    <>
      <motion.div
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        variants={selectorRevealVariant}
        className="
          relative
          -mx-5 mt-8 overflow-x-auto px-5 pb-1
          sm:mx-0 sm:mt-10 sm:overflow-visible sm:px-0
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <TimelineSelector
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          className="w-max flex-nowrap sm:w-auto sm:flex-wrap"
        />
        <StageSignal signal={signal} originPercent={originPercent} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        variants={cardRevealVariant}
        className="mt-8 sm:mt-10"
      >
        <div className="h-[560px] sm:h-[420px] lg:h-[460px]">
          <JourneyPanel activeIndex={activeIndex} />
        </div>
      </motion.div>
    </>
  );
}

export default function AboutStory() {
  const [timelineRevealed, setTimelineRevealed] = useState(false);

  return (
    <section
      id="about-story"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0F1B2D]
        py-14
        sm:py-18
        md:py-20
        lg:py-24
        xl:py-28

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-16!
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-160px]
          top-1/3
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#00CDB5]/[0.045]
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          px-5
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16

          [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
        "
      >
        {/* =====================================================
            INTRO
        ===================================================== */}

        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            variants={textItem}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FFD5] sm:w-10" />

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.28em]
                text-[#00FFD5]
                sm:text-[10px]
              "
            >
              Who We Are
            </span>
          </motion.div>

          <motion.h2
            variants={textItem}
            className="
              max-w-[850px]
              text-[2rem]
              font-extrabold
              leading-[1.06]
              tracking-[-0.045em]
              text-white
              sm:text-[2.5rem]
              lg:text-[2.9rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.5rem]!
            "
          >
            A founder-led platform for{" "}
            <span
              className="
                bg-gradient-to-r
                from-white
                via-[#EFFFFB]
                to-[#00FFD5]
                bg-clip-text
                text-transparent
              "
            >
              modern ventures.
            </span>
          </motion.h2>

          <motion.p
            variants={textItem}
            className="
              pt-6
              max-w-[640px]
              text-[14px]
              font-medium
              leading-7
              text-white/65
              sm:pt-7
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            BH Ventures FZE LLC was built around a simple idea: the
            opportunities of tomorrow sit at the intersection of traditional
            trade and modern technology. Rather than operating as a single
            business, we work as a venture-oriented platform that connects
            disciplines that are usually kept apart.
          </motion.p>

          <motion.p
            variants={textItem}
            className="
              pt-4
              max-w-[640px]
              text-[14px]
              font-medium
              leading-7
              text-white/65
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            International trade gives us global reach. Technology and data
            give us the tools to move faster and decide smarter. Marketing,
            innovation, business development, and events give ideas the
            structure to become real, functioning ventures.
          </motion.p>

          {/* Thread Chips */}

          <motion.div
            variants={textItem}
            className="mt-8 flex flex-wrap gap-2.5 sm:mt-10"
          >
            {threads.map((thread) => {
              const Icon = thread.icon;

              return (
                <span
                  key={thread.label}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.10]
                    bg-white/[0.03]
                    px-3.5
                    py-2
                    text-[11px]
                    font-bold
                    text-white/75

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-[#2DD4BF]/40
                    hover:bg-[#14B8A6]/[0.10]
                    hover:text-white
                  "
                >
                  <Icon
                    size={13}
                    strokeWidth={1.8}
                    className="text-[#5EEAD4]"
                    aria-hidden="true"
                  />

                  {thread.label}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* =====================================================
            TIMELINE
        ===================================================== */}

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <TimelineBackdrop visible={timelineRevealed} />

          <motion.div
            variants={timelineEntryContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={() => setTimelineRevealed(true)}
          >
            <motion.div
              variants={timelineEntryItem}
              className="mb-5 flex items-center gap-3"
            >
              <span
                className="
                  rounded-full
                  border
                  border-[#2DD4BF]/25
                  bg-[#0E4A44]/25
                  px-3.5
                  py-1.5
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.28em]
                  text-[#00FFD5]
                  sm:text-[10px]
                "
              >
                Timeline
              </span>
            </motion.div>

            <motion.h2
              variants={timelineEntryItem}
              className="
                max-w-[560px]
                text-[2rem]
                font-extrabold
                leading-[1.1]
                tracking-[-0.04em]
                text-white
                sm:text-[2.4rem]
                lg:text-[2.7rem]
              "
            >
              The Journey
            </motion.h2>

            <motion.p
              variants={timelineEntryItem}
              className="
                pt-5
                max-w-[520px]
                text-[14px]
                font-medium
                leading-7
                text-white/60
                sm:text-[15px]
                lg:text-[16px]
              "
            >
              How trade, technology, and innovation combine inside one
              founder-led venture platform.
            </motion.p>
          </motion.div>

          <TimelineStages revealed={timelineRevealed} />
        </div>
      </div>
    </section>
  );
}
