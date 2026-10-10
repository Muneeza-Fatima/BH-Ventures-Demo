"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ============================================================
   ANIMATION VARIANTS
   Quiet fade + rise, staggered — nothing loops.
============================================================ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* Page-entry transitions: the glass card sharpens out of a blur,
   the photo is wiped open from the bottom, the facts cards follow. */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(100% 0% 0% 0% round 20px)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 20px)",
    transition: { duration: 1.2, ease: EASE, delay: 0.3 },
  },
};

const factsListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
};

const factVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ============================================================
   COMPANY FACTS
   Five even columns under the hero (the former Facts section).
============================================================ */

type HeroFact = {
  label: string;
  detail: string;
  count?: number;
};

const heroFacts: HeroFact[] = [
  { label: "UAE Based", detail: "Operating from the United Arab Emirates." },
  { label: "Dubai Free Zone", detail: "Registered as a UAE free-zone entity." },
  {
    count: 10,
    label: "Licensed Activities",
    detail: "Across trade, technology and business services.",
  },
  {
    label: "Multi-Sector",
    detail: "Connecting multiple disciplines under one venture platform.",
  },
  { label: "Founder-Led", detail: "Direct leadership and accountability." },
];

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    let start: number | null = null;
    const duration = 1100;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - progress, 4)) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
}


/* ============================================================
   HERO
============================================================ */

/* ============================================================
   LIGHT BEAMS
   Three soft teal beams fall diagonally from the top-right
   corner and sway very slowly, like stage lights. Pure CSS
   (classes in about.css); reduced motion leaves them still.
============================================================ */

const beams = [
  { left: "58%", width: "140px", rotate: "28deg", opacity: 0.16, delay: "0s" },
  { left: "70%", width: "220px", rotate: "34deg", opacity: 0.11, delay: "-4s" },
  { left: "82%", width: "120px", rotate: "40deg", opacity: 0.14, delay: "-8s" },
];

function LightBeams() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {beams.map((beam) => (
        <span
          key={beam.left}
          className="about-beam absolute -top-[20%] h-[140%] blur-[30px]"
          style={
            {
              left: beam.left,
              width: beam.width,
              opacity: beam.opacity,
              "--beam-rotate": beam.rotate,
              animationDelay: beam.delay,
              background:
                "linear-gradient(to bottom, rgba(94,234,212,0.9), rgba(45,212,191,0.25) 55%, transparent 85%)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function AboutHero() {
  return (
    <section
      id="about-hero"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]

        px-6
        pt-[112px]
        pb-14

        sm:px-7
        sm:pt-[124px]

        md:px-10
        md:pt-[132px]
        md:pb-16

        lg:px-12
        lg:pt-[148px]
        lg:pb-20

        xl:px-16

        2xl:px-20
      "
    >
      {/* =====================================================
          BACKGROUND
          No pattern: a soft mesh of large teal / blue lights on
          navy that drift very slowly. They sit behind the glass
          card so its blur has something to soften.
      ===================================================== */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="about-glow-a absolute left-[-6%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#14B8A6]/[0.20] blur-[120px]" />
        <div className="about-glow-b absolute left-[28%] top-[-10%] h-[440px] w-[440px] rounded-full bg-[#1D4ED8]/[0.16] blur-[120px]" />
        <div className="about-glow-c absolute bottom-[-20%] right-[-8%] h-[560px] w-[560px] rounded-full bg-[#0F766E]/[0.22] blur-[130px]" />
        {/* Soft vignette keeps the edges deep navy */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,18,32,0.6)_100%)]" />
      </div>

      <LightBeams />

      {/* Minimal fine grid, fading out toward the edges */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]
          bg-[size:64px_64px]
          [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_75%)]
          [-webkit-mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_75%)]
        "
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          2xl:max-w-[1600px]
        "
      >
        {/* =====================================================
            COPY + PHOTO
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-12

            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-center
            lg:gap-16

            xl:gap-24
          "
        >
          {/* Copy */}
          <div className="min-w-0">
            {/* Label */}
            <motion.div
              variants={itemVariants}
              className="mb-7 flex items-center gap-3 sm:mb-8"
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
                Our Story
              </span>
            </motion.div>

            {/* Glass card: heading + description */}
            <motion.div
              variants={cardVariants}
              className="
                about-shine
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.12]
                bg-white/[0.045]
                p-8
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                backdrop-blur-xl

                sm:p-10
                lg:p-12
              "
            >
              {/* Top highlight edge */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-8
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                "
              />

            {/* Heading */}
            <h1
              className="
                font-heading
                font-bold
                tracking-[-0.035em]
                text-[#F1F5F9]

                text-[2.3rem]
                leading-[1.12]
                sm:leading-[1.05]

                sm:text-[3rem]
                md:text-[3.5rem]
                lg:text-[3.6rem]
                xl:text-[4.1rem]
              "
            >
              Where Trade
              <br />
              Meets{" "}
              <span className="text-[#5EEAD4]">
                Technology.
              </span>
            </h1>

            {/* Paragraph */}
            <p
              className="
                mt-7!
                max-w-[560px]
                text-[15.5px]
                font-normal
                leading-[1.8]
                text-white/70

                sm:mt-8!
                sm:text-[17px]
                lg:text-[18px]
              "
            >
              <span className="font-semibold text-white">
                BH Ventures FZE LLC
              </span>{" "}
              is a UAE free-zone company built to combine international trade,
              technology, data, marketing, innovation, and business development
              into a single, focused venture platform.
            </p>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.figure
            variants={photoVariants}
            className="
              about-shine
              group
              relative
              m-0
              aspect-[16/10]
              w-full
              overflow-hidden
              rounded-[20px]
              border
              border-white/10
              bg-[#0F1B2D]

              lg:aspect-[4/5]
              lg:max-h-[560px]
              lg:justify-self-end
            "
          >
            <Image
              src="/images/about/story/story-foundation.jpg"
              alt="Museum of the Future and the Dubai skyline at night"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="
                object-cover
                object-center
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.03]
              "
            />

            {/* Soft bottom shade so the caption stays legible */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                h-1/3
                bg-gradient-to-t
                from-[#0B1220]/70
                to-transparent
              "
            />

            <figcaption
              className="
                absolute
                bottom-4
                left-4
                flex
                items-center
                gap-2
                rounded-full
                bg-[#0B1220]/80
                px-3.5
                py-1.5
                text-[12px]
                font-medium
                text-white/85
                backdrop-blur-sm

                sm:bottom-5
                sm:left-5
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
              Dubai, United Arab Emirates
            </figcaption>
          </motion.figure>
        </div>

        {/* =====================================================
            FACTS ROW
        ===================================================== */}

        <motion.ul
          variants={factsListVariants}
          className="
            mt-14
            grid
            grid-cols-1
            gap-4

            min-[420px]:grid-cols-2
            sm:mt-14
            sm:grid-cols-3
            sm:gap-4

            lg:mt-16
            lg:grid-cols-5
          "
        >
          {heroFacts.map((fact) => (
            <motion.li
              key={fact.label}
              variants={factVariants}
              tabIndex={0}
              className="
                about-shine
                relative
                overflow-hidden
                rounded-[18px]
                border
                border-white/[0.18]
                border-l-[3px]
                border-l-[#2DD4BF]
                bg-white/[0.09]
                p-6
                sm:p-5
                shadow-[0_14px_36px_rgba(0,0,0,0.25)]
                outline-none
                backdrop-blur-xl

                transition-[border-color,background-color]
                duration-300

                hover:border-y-white/[0.30]
                hover:border-r-white/[0.30]
                hover:bg-white/[0.13]
                focus-visible:border-[#2DD4BF]/60
              "
            >
              <p className="flex items-baseline gap-1.5 text-[15px] font-semibold text-white">
                {fact.count !== undefined && (
                  <span className="text-[1.25em] font-bold leading-none text-[#5EEAD4]">
                    <CountUp value={fact.count} />
                  </span>
                )}
                {fact.label}
              </p>

              <p className="mt-1.5! text-[13px] font-normal leading-[1.6] text-white/80">
                {fact.detail}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
