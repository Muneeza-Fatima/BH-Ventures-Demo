"use client";

import Image from "next/image";
import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

/* ============================================================
   ANIMATION VARIANTS
   The visual reveals after the heading words, then the chips
   follow in a light stagger.
============================================================ */

const EASE = [0.22, 1, 0.36, 1] as const;

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: EASE,
      delay: 0.45,
      staggerChildren: 0.12,
      delayChildren: 0.9,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ============================================================
   CONTENT
   Disciplines mirror the hero paragraph exactly.
============================================================ */

const DISCIPLINES = [
  "Trade",
  "Technology",
  "Data",
  "Marketing",
  "Innovation",
] as const;

const dubaiTimeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Dubai",
});

const chipSurface =
  "border border-white/[0.14] bg-[#0B1220]/60 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md";

/* ============================================================
   HOOKS
============================================================ */

function useDubaiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(dubaiTimeFormat.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return fine;
}

/* ============================================================
   PARALLAX CHIP
   Outer layer carries the staggered reveal, inner layer the
   pointer parallax, so the two transforms never fight.
============================================================ */

function ParallaxChip({
  pointerX,
  pointerY,
  depth,
  className,
  decorative = false,
  children,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  depth: number;
  className: string;
  decorative?: boolean;
  children: ReactNode;
}) {
  const x = useTransform(pointerX, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(pointerY, [-0.5, 0.5], [-depth, depth]);

  return (
    <motion.div
      variants={chipVariants}
      aria-hidden={decorative || undefined}
      className={`absolute z-20 ${className}`}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </motion.div>
  );
}

/* ============================================================
   VISUAL
============================================================ */

export default function CareersHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const interactive = finePointer && !prefersReducedMotion;
  const time = useDubaiTime();

  const [hovered, setHovered] = useState(false);
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  // Pointer position within the visual, normalised to -0.5 … 0.5
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 18 });
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 18 });

  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(
      () => setDisciplineIndex((i) => (i + 1) % DISCIPLINES.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (interactive && event.pointerType === "mouse") setHovered(true);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  const scrollToTalent = () => {
    document
      .getElementById("talent-cta")
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const discipline = DISCIPLINES[prefersReducedMotion ? 0 : disciplineIndex];

  return (
    <div
      className="
        absolute
        right-[-4%]
        top-1/2
        hidden
        w-[520px]
        -translate-y-1/2

        lg:block
        xl:w-[580px]

        [@media(min-width:1024px)_and_(max-width:1366px)]:right-[-3%]
        [@media(min-width:1024px)_and_(max-width:1366px)]:w-[400px]
        [@media(min-width:1024px)_and_(max-width:1279px)]:right-[-44px]!
        [@media(min-width:1024px)_and_(max-width:1279px)]:w-[300px]!
      "
    >
      <motion.div
        variants={visualVariants}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative py-[6%]"
        style={{ perspective: 1200 }}
      >
        {/* =====================================================
            AMBIENT
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD5]/[0.08] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[98%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2DD4BF]/15"
        />

        {/* =====================================================
            PHOTO CARD
        ===================================================== */}

        <motion.div
          aria-hidden="true"
          style={{
            rotateX: interactive ? rotateX : 0,
            rotateY: interactive ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          className="
            relative
            mx-auto
            w-[78%]
            rounded-[28px]
            bg-gradient-to-br
            from-white/[0.18]
            via-white/[0.06]
            to-[#00FFD5]/[0.28]
            p-px
            shadow-[0_30px_80px_rgba(0,0,0,0.42),0_0_60px_-20px_rgba(0,205,181,0.25)]
          "
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[27px] bg-[#0F1D2C]">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              <Image
                src="/images/careers/career-team.jpg"
                alt=""
                fill
                sizes="(min-width:1280px) 580px, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Navy floor */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/15 to-transparent" />

            {/* Fine grid */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.05]
                [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
                [background-size:34px_34px]
              "
            />
          </div>
        </motion.div>

        {/* =====================================================
            CHIPS
        ===================================================== */}

        {/* Local time */}
        <ParallaxChip
          pointerX={pointerX}
          pointerY={pointerY}
          depth={interactive ? 14 : 0}
          className="left-0 top-[10%]"
        >
          <div className={`${chipSurface} rounded-2xl px-4 py-3`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
              Local time
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-[14px] font-semibold text-white">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#00FFD5] shadow-[0_0_10px_rgba(0,255,213,0.65)]"
              />
              <span>
                Dubai ·{" "}
                <time className="tabular-nums">{time ?? "--:--"}</time> GST
              </span>
            </p>
          </div>
        </ParallaxChip>

        {/* Founder-led */}
        <ParallaxChip
          pointerX={pointerX}
          pointerY={pointerY}
          depth={interactive ? 8 : 0}
          decorative
          className="right-0 top-[44%]"
        >
          <div className={`${chipSurface} rounded-2xl px-4 py-3`}>
            <p className="text-[13px] font-semibold text-white">Founder-led</p>
            <p className="mt-0.5 text-[12px] font-medium text-[#5EEAD4]/85">
              Direct ownership
            </p>
          </div>
        </ParallaxChip>

        {/* Disciplines */}
        <ParallaxChip
          pointerX={pointerX}
          pointerY={pointerY}
          depth={interactive ? 11 : 0}
          decorative
          className="left-[-2%] bottom-[18%]"
        >
          <div className={`${chipSurface} w-[178px] rounded-2xl px-4 py-3`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">
              Building across
            </p>
            <div className="relative mt-1.5 h-[20px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={discipline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-x-0 text-[15px] font-bold leading-[20px] text-white"
                >
                  {discipline}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </ParallaxChip>

        {/* Talent CTA shortcut */}
        <ParallaxChip
          pointerX={pointerX}
          pointerY={pointerY}
          depth={interactive ? 6 : 0}
          className="right-[4%] bottom-[2%]"
        >
          <button
            type="button"
            onClick={scrollToTalent}
            className={`
              ${chipSurface}
              group
              inline-flex
              cursor-pointer
              items-center
              gap-2
              rounded-full
              px-5
              py-3
              text-[13px]
              font-bold
              text-white
              transition-colors
              duration-300
              hover:border-[#2DD4BF]/45
              hover:text-[#00FFD5]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#00FFD5]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0B1220]
            `}
          >
            Send your profile
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </button>
        </ParallaxChip>
      </motion.div>
    </div>
  );
}
