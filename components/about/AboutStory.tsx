"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeftRight,
  ArrowLeft,
  ArrowRight,
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

/* How long each stage stays on screen before the timeline advances
   on its own. Any click on a stage pill or arrow hands control back
   to the visitor for good; hovering or focusing the timeline pauses it. */
const AUTOPLAY_MS = 7000;

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
   disciplines are referenced (Dubai free-zone registration, ten
   licensed activities, trade + technology, multi-sector platform).
   The fact badge on each stage is drawn from the same verified set
   used on the Facts section — nothing here is invented.
============================================================ */

const journeySteps = [
  {
    id: "foundation",
    label: "Foundation",
    title: "Registered in Dubai",
    description:
      "BH Ventures FZE LLC is registered as a UAE free-zone entity on a simple thesis: trade and technology belong on one platform, not two.",
    icon: Landmark,
    image: "/images/about/story/story-foundation.jpg",
    imageAlt: "BH Ventures foundation — registered in Dubai",
    caption: "Dubai, UAE",
    badge: {
      label: "Dubai",
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
    image: "/images/about/story/story-trade-v2.jpg",
    imageAlt: "International trade and global reach",
    caption: "Cross-border trade",
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
    image: "/images/about/story/story-technology.jpg",
    imageAlt: "Modern technology applied to real ventures",
    caption: "Digital infrastructure",
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
    image: "/images/about/story/story-innovation-v2.jpg",
    imageAlt: "Innovation — disciplines connecting inside one platform",
    caption: "Connected disciplines",
    badge: {
      label: "Multi-Sector Platform",
      secondary: "One platform, spanning several disciplines.",
    },
  },
  {
    id: "global-opportunity",
    label: "Global Opportunity",
    title: "Ten activities, one license",
    description:
      "A licensed portfolio of ten business activities operates under a single founder-led platform, built for what comes next.",
    icon: Globe,
    image: "/images/about/story/story-global-v2.jpg",
    imageAlt: "Global opportunity — routes connecting markets worldwide",
    caption: "Global routes",
    badge: {
      label: "10 Licensed Activities",
      secondary: "Ten licensed business activities, one license.",
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
      aria-label="Timeline stages"
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
              focus-visible:ring-offset-[#0F1B2D]

              ${
                isActive
                  ? "border-transparent"
                  : "border-white/[0.12] bg-white/[0.02] hover:border-[#2DD4BF]/35 hover:bg-white/[0.05]"
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
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00CDB5] to-[#00FFD5] shadow-[0_10px_26px_rgba(0,205,181,0.35)]"
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
                isActive ? "text-[#06251F]" : "text-[#5EEAD4]/70 group-hover:text-[#5EEAD4]"
              }`}
            />

            <span
              className={`relative z-10 block transition-colors duration-300 ${
                isActive ? "text-[#06251F]" : "text-white/50 group-hover:text-white/85"
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
        border-[#2DD4BF]/20
        bg-[#00FFD5]/[0.05]
        px-4
        py-2.5
        text-left

        transition-colors
        duration-300

        hover:border-[#2DD4BF]/50
        hover:bg-[#00FFD5]/[0.09]
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
        relative
        h-full
        w-full
        rounded-[30px]
        bg-gradient-to-br
        from-white/[0.18]
        via-white/[0.06]
        to-[#00FFD5]/[0.28]
        p-px
        shadow-[0_30px_80px_rgba(0,0,0,0.42),0_0_60px_-20px_rgba(0,205,181,0.25)]
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
          bg-gradient-to-br
          from-[#132436]
          via-[#0F1D2C]
          to-[#0B1220]

          sm:grid-cols-2
          sm:grid-rows-1
        "
      >
        {/* One-time sheen sweep when the card first reveals */}
        {revealed && !prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="journey-sheen pointer-events-none absolute inset-y-[-20%] left-0 z-20 w-[28%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          />
        )}

        {/* =========================================
            TEXT PANE
        ========================================= */}
        <div className="relative z-10 order-2 flex flex-col p-6 sm:order-1 sm:p-8 lg:p-11 xl:p-12">
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

          {/* Stage label + progress dots */}
          <div className="relative flex items-center justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">
              Stage {stageNumber} /{" "}
              {String(journeySteps.length).padStart(2, "0")}
            </p>

            <div className="flex items-center gap-1.5" aria-hidden="true">
              {journeySteps.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === activeIndex
                      ? "w-7 bg-gradient-to-r from-[#00CDB5] to-[#00FFD5]"
                      : i < activeIndex
                        ? "w-3 bg-[#5EEAD4]/45"
                        : "w-3 bg-white/[0.14]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stage copy */}
          <div className="relative mt-8 min-h-[270px] flex-1 sm:min-h-[300px] md:min-h-[250px]">
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
                    text-[#E7EDF3]

                    sm:text-[26px]
                    lg:text-[30px]
                    xl:text-[32px]
                  "
                >
                  {step.title}
                </h3>

                <p className="max-w-[440px] pt-4 text-[14px] font-medium leading-[1.75] text-[#AAB6C2] sm:pt-5 sm:text-[14.5px] lg:text-[15.5px]">
                  {step.description}
                </p>

                <FactBadge label={step.badge.label} secondary={step.badge.secondary} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Previous / next */}
          <div className="relative mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
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
                border-white/[0.12]
                bg-white/[0.03]
                text-white/60
                outline-none
                transition-all
                duration-300

                hover:-translate-x-0.5
                hover:border-[#2DD4BF]/45
                hover:bg-[#00FFD5]/[0.08]
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
                border-[#2DD4BF]/30
                bg-[#00FFD5]/[0.08]
                text-[#5EEAD4]
                outline-none
                transition-all
                duration-300

                hover:translate-x-0.5
                hover:border-[#2DD4BF]/60
                hover:bg-[#00FFD5]/[0.14]
                hover:text-white

                focus-visible:ring-2
                focus-visible:ring-[#5EEAD4]/60
              "
            >
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>

            <span className="ml-1 min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
              Next <span className="text-white/20">·</span>{" "}
              <span className="text-white/55">{nextStep.label}</span>
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
              <div
                className={`absolute inset-0 ${
                  prefersReducedMotion ? "" : "journey-kenburns"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={activeIndex === 0}
                />
              </div>

              {/* Tonal blend into the text pane + gentle floor */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/15 to-transparent" />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0F1D2C]/70 via-transparent to-transparent sm:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/55 via-transparent to-transparent sm:hidden" />
            </motion.div>
          </AnimatePresence>

          {/* Fine grid */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.05]
              [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
              [background-size:34px_34px]
            "
          />

          {/* Corner accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-5 h-6 w-6 rounded-tr-lg border-r border-t border-[#5EEAD4]/45"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 rounded-br-lg border-b border-r border-[#5EEAD4]/45"
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
                bottom-5
                left-5
                flex
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
        <StageSignal signal={signal} originPercent={originPercent} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        variants={cardRevealVariant}
        className="mt-8 sm:mt-10"
      >
        <div className="h-[700px] sm:h-[580px] md:h-[500px] lg:h-[520px]">
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

/* ============================================================
   Highlighted phrase inside body copy.
============================================================ */

function Key({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-[#E7EDF3]">
      {children}
    </span>
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
        py-16
        sm:py-20
        md:py-24
        lg:py-28
        xl:py-32

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-20!
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      {/* Dot grid, held to the upper-right so it frames the intro copy */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[900px]
          opacity-[0.5]
          [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1.2px)]
          [background-size:30px_30px]
          [mask-image:radial-gradient(ellipse_at_85%_18%,black_0%,transparent_58%)]
          [-webkit-mask-image:radial-gradient(ellipse_at_85%_18%,black_0%,transparent_58%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          about-aurora
          pointer-events-none
          absolute
          left-[-160px]
          top-[12%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#00CDB5]/[0.06]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          about-aurora-alt
          pointer-events-none
          absolute
          right-[-120px]
          top-[4%]
          h-[380px]
          w-[520px]
          rounded-full
          bg-[#5A64FF]/[0.06]
          blur-[130px]
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
          2xl:max-w-[1600px]
          2xl:px-20

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
          viewport={{ once: true, amount: 0.2 }}
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-12
            lg:gap-12
            xl:gap-16
          "
        >
          {/* Heading column */}
          <div className="lg:col-span-6">
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
                font-heading
                max-w-[640px]
                text-[2.25rem]
                font-bold
                leading-[1.08]
                tracking-[-0.03em]
                text-[#E7EDF3]
                sm:text-[3rem]
                sm:leading-[1.06]
                lg:text-[3.25rem]
                xl:text-[3.75rem]

                [@media(min-width:1024px)_and_(max-width:1366px)]:text-[3rem]!
              "
            >
              A founder-led platform for{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-[#E7EDF3]
                  via-[#D8F1EC]
                  to-[#5EEAD4]
                  bg-clip-text
                  pb-[0.18em]
                  -mb-[0.18em]
                  text-transparent
                  [-webkit-background-clip:text]
                "
              >
                modern ventures.
              </span>
            </motion.h2>

            {/* Discipline chips — desktop only here; on smaller
                screens they sit under the copy, full width */}
            <motion.div variants={textItem} className="mt-10 hidden lg:block">
              <ThreadChips />
            </motion.div>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-6 lg:pt-9">
            {/* Lead — the one idea the whole company is built on */}
            <motion.div variants={textItem} className="relative pl-6 sm:pl-7">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-[#00FFD5] via-[#00CDB5]/70 to-transparent"
              />

              <p
                className="
                  font-heading
                  max-w-[560px]
                  text-[19px]
                  font-semibold
                  leading-[1.5]
                  tracking-[-0.015em]
                  text-[#E7EDF3]

                  sm:text-[21px]
                  lg:text-[22px]
                  xl:text-[24px]
                "
              >
                BH Ventures FZE LLC was built around a simple idea:{" "}
                <span className="text-[#5EEAD4]">
                  the opportunities of tomorrow sit at the intersection of
                  traditional trade and modern technology.
                </span>
              </p>
            </motion.div>

            <motion.p
              variants={textItem}
              className="
                pt-6
                max-w-[540px]
                text-[15px]
                font-medium
                leading-[1.75]
                text-[#AAB6C2]
                sm:text-[16px]
                lg:text-[16.5px]
              "
            >
              Rather than operating as a single business, we work as a
              venture-oriented platform that connects disciplines that are
              usually kept apart.
            </motion.p>

            <motion.p
              variants={textItem}
              className="
                pt-5
                max-w-[540px]
                text-[15px]
                font-medium
                leading-[1.75]
                text-[#AAB6C2]
                sm:text-[16px]
                lg:text-[16.5px]
              "
            >
              <Key>International trade</Key> gives us global reach.{" "}
              <Key>Technology and data</Key> give us the tools to move faster
              and decide smarter.{" "}
              <Key>Marketing, innovation, business development, and events</Key>{" "}
              give ideas the structure to become real, functioning ventures.
            </motion.p>

            <motion.div variants={textItem} className="mt-10 lg:hidden">
              <ThreadChips />
            </motion.div>
          </div>
        </motion.div>

        {/* =====================================================
            TIMELINE
        ===================================================== */}

        <div className="relative mt-20 sm:mt-24 lg:mt-28">
          <TimelineBackdrop visible={timelineRevealed} />

          <motion.div
            variants={timelineEntryContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            onViewportEnter={() => setTimelineRevealed(true)}
            className="
              flex
              flex-col
              gap-6
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
                  font-heading
                  max-w-[640px]
                  text-[2.25rem]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.03em]
                  text-[#E7EDF3]
                  sm:text-[3rem]
                  sm:leading-[1.06]
                  lg:text-[3.25rem]
                  xl:text-[3.75rem]

                  [@media(min-width:1024px)_and_(max-width:1366px)]:text-[3rem]!
                "
              >
                The{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-[#E7EDF3]
                    via-[#D8F1EC]
                    to-[#5EEAD4]
                    bg-clip-text
                    pb-[0.18em]
                    -mb-[0.18em]
                    text-transparent
                    [-webkit-background-clip:text]
                  "
                >
                  Journey.
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={timelineEntryItem}
              className="
                max-w-[440px]
                text-[15px]
                font-medium
                leading-[1.75]
                text-[#AAB6C2]
                sm:text-[16px]
                lg:pb-2
                lg:text-right
              "
            >
              How trade, technology, and innovation combine inside one
              founder-led venture platform — five stages, one thesis.
            </motion.p>
          </motion.div>

          <TimelineStages revealed={timelineRevealed} />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Discipline chips. Each carries a small point of light that
   travels around its rim (see .thread-chip in globals.css),
   staggered so the row reads as alive rather than mechanical.
============================================================ */

function ThreadChips() {
  return (
    <div>
      <p className="pb-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white/35">
        Seven disciplines, one platform
      </p>

      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {threads.map((thread, index) => {
          const Icon = thread.icon;

          return (
            <span
              key={thread.label}
              tabIndex={0}
              style={{ "--chip-delay": `${index * 0.65}s` } as React.CSSProperties}
              className="
                thread-chip
                flex
                items-center
                gap-2.5
                rounded-full
                border
                border-white/[0.10]
                bg-[#0B1220]/70
                py-2
                pl-2
                pr-4
                text-[11.5px]
                font-bold
                text-[#B2BCC7]
                outline-none

                transition-colors
                duration-300

                hover:border-[#2DD4BF]/45
                hover:text-[#E7EDF3]
                focus-visible:border-[#2DD4BF]/60

                sm:text-[12px]
              "
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00FFD5]/[0.10] text-[#5EEAD4] ring-1 ring-inset ring-[#2DD4BF]/25">
                <Icon size={12} strokeWidth={2} aria-hidden="true" />
              </span>

              {thread.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
