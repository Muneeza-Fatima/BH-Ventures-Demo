"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  ClipboardCheck,
  Layers,
  Rocket,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* How long each stage stays on screen before the timeline advances
   on its own. Any click on a stage pill or arrow hands control back
   to the visitor for good; hovering or focusing the timeline pauses it. */
const AUTOPLAY_MS = 7000;

const threads = [
  "Trade",
  "Technology",
  "Data",
  "Marketing",
  "Innovation",
  "Business Development",
  "Events",
];

/* ============================================================
   How We Work — the five steps every venture moves through.
   Drawn from the Mission statement (identify opportunity, build
   capability, create value through execution); no dates, clients
   or numbers are invented. Badges reuse the verified facts
   (UAE free zone, ten licensed activities, founder-led,
   multi-sector).
============================================================ */

const journeySteps = [
  {
    id: "identify",
    label: "Identify",
    title: "Spot the opportunity",
    description:
      "We look for high-potential openings where trade and technology meet — in markets we can reach from the UAE.",
    icon: Search,
    image: "/images/about/story/howwework-identify.png",
    imageAlt: "Hand pointing at a rising bar chart over a tablet",
    caption: "Market research",
    badge: {
      label: "Opportunity-led",
      secondary: "Focused on markets reachable from the UAE.",
    },
  },
  {
    id: "assess",
    label: "Assess",
    title: "Assess and structure",
    description:
      "Each idea is tested for fit, structured under our licensed activities, and shaped into a clear plan before anything is built.",
    icon: ClipboardCheck,
    image: "/images/about/story/story-foundation-office.jpg",
    imageAlt: "Executive office overlooking the Dubai skyline",
    caption: "Planning",
    badge: {
      label: "10 Licensed Activities",
      secondary: "Ten licensed business activities, one license.",
    },
  },
  {
    id: "build",
    label: "Build",
    title: "Build the capability",
    description:
      "The right team, tools, partners and digital infrastructure are put in place so the venture can operate professionally from day one.",
    icon: Layers,
    image: "/images/about/story/story-innovation.jpg",
    imageAlt: "Team working together around a meeting table",
    caption: "Team & tools",
    badge: {
      label: "Founder-led",
      secondary: "Direct leadership and accountability.",
    },
  },
  {
    id: "launch",
    label: "Launch",
    title: "Launch and operate",
    description:
      "Ventures go to market with marketing, business development and events behind them — and are run with execution discipline.",
    icon: Rocket,
    image: "/images/about/story/howwework-launch-operate.png",
    imageAlt: "Businessman touching a network of business process icons",
    /* Small source image: show it whole instead of cropping/zooming */
    imageFit: "contain",
    caption: "Go to market",
    badge: {
      label: "Execution excellence",
      secondary: "Run with integrity and discipline.",
    },
  },
  {
    id: "scale",
    label: "Scale",
    title: "Scale across markets",
    description:
      "What works is grown into new markets and sectors, creating lasting value for clients, partners and stakeholders.",
    icon: TrendingUp,
    image: "/images/about/story/howwework-scale-coins.png",
    imageAlt: "Hand stacking coins in rising columns with a growth arrow",
    caption: "Global growth",
    badge: {
      label: "Multi-sector growth",
      secondary: "One platform, spanning several disciplines.",
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

/* Who We Are entry: heading sharpens out of a blur, the copy card
   slides in from the right, then the discipline names follow one
   by one. */

const headingReveal = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const cardSlideIn = {
  hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 },
  },
};

const disciplinesList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.35 },
  },
};

const disciplineItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.39 },
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
   disappearing and reappearing. While the timeline is auto-
   advancing, a thin progress line fills along the active pill so
   the visitor can see the next stage is coming.
============================================================ */

function TimelineSelector({
  activeIndex,
  onSelect,
  autoplaying,
  className = "",
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  autoplaying: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="How we work — steps"
      className={`flex items-center gap-2 sm:gap-2.5 ${className}`}
    >
      {journeySteps.map((step, index) => {
        const isActive = index === activeIndex;
        const Icon = step.icon;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive ? "step" : undefined}
            className={`
              group
              relative
              flex
              shrink-0
              items-center
              gap-2
              overflow-hidden
              rounded-full
              border
              px-4
              py-2.5
              text-[12px]
              font-bold
              tracking-[-0.01em]
              outline-none
              transition-colors
              duration-300

              sm:text-[12.5px]

              focus-visible:ring-2
              focus-visible:ring-[#5EEAD4]/70
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#F7F9F8]

              ${
                isActive
                  ? "border-transparent"
                  : "about-pill-glow border-[1.5px] border-[#14B8A6]/60 bg-white shadow-[0_2px_8px_rgba(19,43,64,0.06)] hover:border-[#14B8A6] hover:bg-[#14B8A6]/[0.06] active:border-[#14B8A6] active:bg-[#14B8A6]/[0.10]"
              }
            `}
          >
            {isActive && (
              <motion.span
                layoutId="timelineActivePill"
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  ease: EASE,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF] shadow-[0_8px_20px_rgba(20,184,166,0.28)]"
              />
            )}

            {isActive && autoplaying && !prefersReducedMotion && (
              <motion.span
                key={`progress-${activeIndex}`}
                aria-hidden="true"
                className="absolute inset-x-3 bottom-[5px] h-[2px] origin-left rounded-full bg-[#06251F]/35"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}

            <Icon
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className={`relative z-10 transition-colors duration-300 ${
                isActive ? "text-[#06251F]" : "text-[#0F766E]/70 group-hover:text-[#0F766E]"
              }`}
            />

            <span
              className={`relative z-10 block transition-colors duration-300 ${
                isActive ? "text-[#06251F]" : "text-[#52697A] group-hover:text-[#132B40]"
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
        border-[#14B8A6]/30
        bg-[#14B8A6]/[0.08]
        px-4
        py-2.5
        text-left

        transition-colors
        duration-300

        hover:border-[#14B8A6]/60
        hover:bg-[#14B8A6]/[0.14]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#14B8A6]/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#0F1B2D]
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
            className="block overflow-hidden text-[11px] font-medium text-white/60"
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

   Premium layer on top of that: a gradient hairline frame, a big
   ghosted stage numeral, stage progress dots, a slow push-in on
   the active image, a glass caption on the visual, and previous /
   next controls so the visitor never has to reach back up to the
   pills to move on.
============================================================ */

function JourneyPanel({
  activeIndex,
  onPrev,
  onNext,
  revealed,
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  revealed: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const step = journeySteps[activeIndex];
  const nextStep = journeySteps[(activeIndex + 1) % journeySteps.length];
  const StepIcon = step.icon;
  const stageNumber = String(activeIndex + 1).padStart(2, "0");

  return (
    <div
      className="
        about-border-spin
        [-webkit-tap-highlight-color:transparent]
        group/panel
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[30px]
        p-[2px]
        shadow-[0_24px_60px_rgba(11,18,32,0.28)]
      "
    >
      <div
        className="
          relative
          grid
          h-full
          w-full
          grid-cols-1
          grid-rows-[230px_1fr]
          overflow-hidden
          rounded-[29px]
          bg-[#0F1B2D]

          sm:grid-cols-2
          sm:grid-rows-1
        "
      >
        {/* One-time sheen sweep when the card first reveals */}
        {revealed && !prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="journey-sheen pointer-events-none hidden sm:block absolute inset-y-[-20%] left-0 z-20 w-[28%] bg-gradient-to-r from-transparent via-[#14B8A6]/[0.10] to-transparent"
          />
        )}

        {/* =========================================
            TEXT PANE
        ========================================= */}
        <div className="relative z-10 order-2 flex flex-col p-7 sm:order-1 sm:p-8 lg:p-11 xl:p-12">
          {/* Ghosted stage numeral */}
          <AnimatePresence mode="sync">
            <motion.span
              key={`numeral-${step.id}`}
              aria-hidden="true"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.4, ease: EASE } }}
              className="
                font-heading
                pointer-events-none
                absolute
                right-5
                top-3
                select-none
                text-[96px]
                font-extrabold
                leading-none
                tracking-[-0.06em]
                text-white/[0.04]

                sm:right-7
                sm:text-[124px]
                lg:right-9
                lg:text-[160px]
              "
            >
              {stageNumber}
            </motion.span>
          </AnimatePresence>

          {/* Stage label */}
          <div className="relative flex items-center justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/50">
              Stage {stageNumber} /{" "}
              {String(journeySteps.length).padStart(2, "0")}
            </p>
          </div>

          {/* Stage copy */}
          <div className="relative mt-7 min-h-[250px] flex-1 sm:mt-8 sm:min-h-[300px] md:min-h-[250px]">
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
                <h3
                  className="
                    font-heading
                    max-w-[460px]
                    text-[24px]
                    font-semibold
                    leading-[1.16]
                    tracking-[-0.022em]
                    text-white

                    sm:text-[26px]
                    lg:text-[30px]
                    xl:text-[32px]
                  "
                >
                  {step.title}
                </h3>

                <p className="max-w-[440px] pt-4 text-[14px] font-normal leading-[1.75] text-white/70 sm:pt-5 sm:text-[14.5px] lg:text-[15.5px]">
                  {step.description}
                </p>

                <FactBadge label={step.badge.label} secondary={step.badge.secondary} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Previous / next */}
          <div className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-6 sm:mt-6 sm:pt-5">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous stage"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.04]
                text-white/70
                outline-none
                transition-all
                duration-300

                hover:-translate-x-0.5
                hover:border-[#14B8A6]/50
                hover:bg-[#14B8A6]/[0.08]
                hover:text-white

                focus-visible:ring-2
                focus-visible:ring-[#5EEAD4]/60
              "
            >
              <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next stage"
              className="
                group
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#14B8A6]/40
                bg-[#14B8A6]/10
                text-[#5EEAD4]
                outline-none
                transition-all
                duration-300

                hover:translate-x-0.5
                hover:border-[#14B8A6]/70
                hover:bg-[#14B8A6]/20
                hover:text-white

                focus-visible:ring-2
                focus-visible:ring-[#5EEAD4]/60
              "
            >
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>

            <span className="ml-1 min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
              Next <span className="text-white/25">·</span>{" "}
              <span className="text-white/85">{nextStep.label}</span>
            </span>
          </div>
        </div>

        {/* =========================================
            VISUAL PANE
        ========================================= */}
        <div className="relative order-1 overflow-hidden sm:order-2">
          <AnimatePresence mode="sync">
            <motion.div
              key={`${step.id}-image`}
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
              className="absolute inset-0"
            >
              {/* Photo shown as-is: no overlay, no zoom, so it stays sharp */}
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className={`object-center ${
                  "imageFit" in step && step.imageFit === "contain"
                    ? "bg-[#0B0F1A] object-contain"
                    : "object-cover"
                }`}
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Corner accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute hidden sm:block right-5 top-5 h-6 w-6 rounded-tr-lg border-r border-t border-[#5EEAD4]/45"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute hidden sm:block bottom-5 right-5 h-6 w-6 rounded-br-lg border-b border-r border-[#5EEAD4]/45"
          />

          {/* Glass caption */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`${step.id}-caption`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.2, ease: EASE } }}
              exit={{ opacity: 0, y: 6, transition: { duration: 0.3, ease: EASE } }}
              className="
                absolute
                hidden
                sm:flex
                bottom-5
                left-5
                items-center
                gap-2.5
                rounded-full
                border
                border-white/[0.14]
                bg-[#0B1220]/55
                py-2
                pl-2
                pr-4
                backdrop-blur-md
                shadow-[0_10px_30px_rgba(0,0,0,0.35)]

                sm:bottom-6
                sm:left-6
              "
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00CDB5] to-[#00FFD5] text-[#06251F]">
                <StepIcon size={13} strokeWidth={2.2} aria-hidden="true" />
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/85">
                {step.caption}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Timeline stages — click-driven, no scroll-jacking.
   Normal page scroll simply moves through the page. The timeline
   advances on its own every few seconds once it is on screen so
   the card never sits still, but the moment the visitor clicks a
   pill or an arrow it becomes fully manual, and hovering or
   focusing the timeline pauses it. The card itself keeps the
   premium crossfade (visual leads by ~80ms, text follows) and a
   fixed footprint per breakpoint so nothing reflows as the stage
   changes.
============================================================ */

function TimelineStages({ revealed }: { revealed: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const signal = useStageChangeSignal(activeIndex);
  const originPercent =
    journeySteps.length > 1 ? (activeIndex / (journeySteps.length - 1)) * 100 : 50;

  const autoplaying = revealed && !manual && !paused && !prefersReducedMotion;

  const select = useCallback((index: number) => {
    setManual(true);
    setActiveIndex(
      ((index % journeySteps.length) + journeySteps.length) % journeySteps.length
    );
  }, []);

  useEffect(() => {
    if (!autoplaying) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % journeySteps.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [autoplaying, activeIndex]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="[-webkit-tap-highlight-color:transparent]"
    >
      <motion.div
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        variants={selectorRevealVariant}
        className="
          relative
          -mx-5 mt-10 overflow-x-auto px-5 pb-1
          sm:mx-0 sm:mt-12 sm:overflow-visible sm:px-0
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <TimelineSelector
          activeIndex={activeIndex}
          onSelect={select}
          autoplaying={autoplaying}
          className="w-max flex-nowrap sm:w-auto sm:flex-wrap"
        />
        <div className="hidden sm:contents">
          <StageSignal signal={signal} originPercent={originPercent} />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        variants={cardRevealVariant}
        className="mt-10 sm:mt-10"
      >
        <div className="h-[690px] sm:h-[580px] md:h-[500px] lg:h-[520px]">
          <JourneyPanel
            activeIndex={activeIndex}
            onPrev={() => select(activeIndex - 1)}
            onNext={() => select(activeIndex + 1)}
            revealed={revealed}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutStory() {
  const [timelineRevealed, setTimelineRevealed] = useState(false);

  return (
    <>
    <section
      id="about-story"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0F1B2D]
        py-16
        sm:py-20
        md:py-24
        lg:py-28
        xl:py-32

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-20!
      "
    >
      <div
        className="
          relative
          z-10
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

          [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
        "
      >
        {/* =====================================================
            INTRO — editorial statement
        ===================================================== */}

        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div
            className="
              grid
              grid-cols-1
              gap-10
              lg:grid-cols-12
              lg:gap-x-16
            "
          >
            {/* Heading column */}
            <div className="lg:col-span-5">
              <motion.div
                variants={textItem}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#2DD4BF]" />
                <span
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#5EEAD4]
                    sm:text-[12px]
                  "
                >
                  Who We Are
                </span>
              </motion.div>

              <motion.h2
                variants={headingReveal}
                className="
                  font-heading
                  max-w-[520px]
                  text-[2.2rem]
                  font-bold
                  leading-[1.15]
                  sm:leading-[1.08]
                  tracking-[-0.03em]
                  text-[#F1F5F9]
                  sm:text-[2.8rem]
                  lg:text-[3rem]
                  xl:text-[3.4rem]
                "
              >
                A founder-led platform for{" "}
                <span className="text-[#5EEAD4]">
                  modern ventures.
                </span>
              </motion.h2>
            </div>

            {/* Copy column — everything sits in one dark glass card */}
            <motion.div
              variants={cardSlideIn}
              className="
                rounded-[24px]
                about-shine
                relative
                overflow-hidden
                border
                border-white/[0.22]
                bg-gradient-to-br
                from-white/[0.14]
                via-white/[0.09]
                to-[#2DD4BF]/[0.12]
                backdrop-blur-xl
                p-8
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]

                sm:p-11
                lg:col-span-7
                xl:p-14
              "
            >
              <p
                className="
                  text-[18px]
                  font-medium
                  leading-[1.6]
                  tracking-[-0.01em]
                  text-white
                  sm:text-[20px]
                  xl:text-[21px]
                "
              >
                BH Ventures FZE LLC was built around a simple idea: the
                opportunities of tomorrow sit at the intersection of{" "}
                <span className="font-semibold text-[#5EEAD4]">
                  traditional trade and modern technology.
                </span>
              </p>

              <span
                aria-hidden="true"
                className="mt-8 block h-[2px] w-10 rounded-full bg-[#2DD4BF]"
              />

              <p
                className="
                  mt-8!
                  text-[15px]
                  font-normal
                  leading-[1.8]
                  text-white/70
                  sm:text-[16px]
                "
              >
                Rather than operating as a single business, we work as a
                venture-oriented platform that connects disciplines that are
                usually kept apart.
              </p>
            </motion.div>
          </div>

          {/* Disciplines */}
          <motion.div variants={textItem}>
            <DisciplinesRow />
          </motion.div>
        </motion.div>

      </div>
    </section>

    {/* =====================================================
        TIMELINE — its own light section
    ===================================================== */}

    <section
      id="about-journey"
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

          [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
        "
      >
        <div className="relative">

          <motion.div
            variants={timelineEntryContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            onViewportEnter={() => setTimelineRevealed(true)}
            className="
              flex
              flex-col
              gap-7
              lg:flex-row
              lg:items-end
              lg:justify-between
              lg:gap-12
            "
          >
            <div>
              <motion.div
                variants={timelineEntryItem}
                className="mb-5 flex items-center gap-3"
              >
                <span
                  className="
                    rounded-full
                    border
                    border-[#0F766E]/25
                    bg-[#14B8A6]/10
                    px-3.5
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#0F766E]
                    sm:text-[11px]
                  "
                >
                  How We Work
                </span>
              </motion.div>

              <motion.h2
                variants={timelineEntryItem}
                className="
                  font-heading
                  max-w-[640px]
                  text-[2.25rem]
                  font-bold
                  leading-[1.15]
                  tracking-[-0.03em]
                  text-[#132B40]
                  sm:text-[3rem]
                  sm:leading-[1.06]
                  lg:text-[3.25rem]
                  xl:text-[3.75rem]

                  [@media(min-width:1024px)_and_(max-width:1366px)]:text-[3rem]!
                "
              >
                From idea <span className="text-[#0F766E]">to venture.</span>
              </motion.h2>
            </div>

            <motion.p
              variants={timelineEntryItem}
              className="
                max-w-[440px]
                text-[15px]
                font-normal
                leading-[1.75]
                text-[#52697A]
                sm:text-[16px]
                lg:pb-2
                lg:text-right
              "
            >
              Every venture moves through the same five steps — one
              disciplined process, from first look to global scale.
            </motion.p>
          </motion.div>

          <TimelineStages revealed={timelineRevealed} />
        </div>
      </div>
    </section>
    </>
  );
}

/* ============================================================
   Disciplines — one quiet row of plain names under a hairline.
============================================================ */

function DisciplinesRow() {
  return (
    <motion.ul
      variants={disciplinesList}
      aria-label="Disciplines"
      className="
        mt-14
        grid
        grid-cols-2
        gap-x-4
        gap-y-4
        border-t
        border-white/10
        pt-8

        sm:flex
        sm:flex-wrap
        sm:items-center
        sm:gap-x-4
        sm:gap-y-2
        sm:pt-7
        lg:mt-16
      "
    >
      {threads.map((label, index) => (
        <motion.li
          key={label}
          variants={disciplineItem}
          className="flex items-center gap-3 sm:gap-4"
        >
          {/* Phone: every name has its own dot (2-column grid).
              Larger screens: dots only sit between names. */}
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#2DD4BF] ${
              index === 0 ? "sm:hidden" : ""
            }`}
          />
          <span
            className="
              text-[15px]
              font-semibold
              text-white/90
              transition-colors
              duration-300
              hover:text-[#5EEAD4]
              sm:text-[16px]
              lg:text-[17px]
            "
          >
            {label}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
