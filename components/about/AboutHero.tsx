"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

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
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.2,
    },
  },
};

const headingWord: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const orbitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

/* ============================================================
   ORBITAL VISUAL
   Three concentric rings, each carrying a single point of light
   that circles at its own pace around a softly breathing core —
   trade, technology and the disciplines between them, orbiting
   one platform. Pure CSS motion, no canvas, no images. Sits to
   the right of the copy on tablet and desktop; on phones it is
   hidden so the heading keeps the full width.
============================================================ */

const rings = [
  { inset: "32%", duration: "26s", direction: "normal", dashed: false, alpha: 0.28 },
  { inset: "19%", duration: "46s", direction: "reverse", dashed: true, alpha: 0.18 },
  { inset: "6%", duration: "74s", direction: "normal", dashed: false, alpha: 0.12 },
] as const;

function OrbitalVisual() {
  return (
    <motion.div
      aria-hidden="true"
      variants={orbitVariants}
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
      {/* Core */}
      <div className="about-core-breathe absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD5]/[0.13] blur-[46px]" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2DD4BF]/30 bg-[#0B1220]/60 backdrop-blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD5] shadow-[0_0_24px_6px_rgba(0,255,213,0.45)]" />

      {/* Rings */}
      {rings.map((ring, index) => (
        <div
          key={index}
          className={`about-orbit absolute rounded-full border ${
            ring.dashed ? "border-dashed" : "border-solid"
          }`}
          style={
            {
              inset: ring.inset,
              borderColor: `rgba(45, 212, 191, ${ring.alpha})`,
              "--orbit-duration": ring.duration,
              "--orbit-direction": ring.direction,
            } as React.CSSProperties
          }
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFD5] shadow-[0_0_16px_3px_rgba(0,255,213,0.55)]" />
          {index === 0 && (
            <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_10px_2px_rgba(255,255,255,0.35)]" />
          )}
        </div>
      ))}

      {/* Faint cross-hair guides */}
      <div className="absolute left-1/2 top-[6%] bottom-[6%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#2DD4BF]/[0.14] to-transparent" />
      <div className="absolute top-1/2 left-[6%] right-[6%] h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#2DD4BF]/[0.14] to-transparent" />
    </motion.div>
  );
}

export default function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

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

        px-5
        pt-[118px]
        pb-20

        sm:px-7
        sm:pt-[126px]
        sm:pb-24

        md:px-10
        md:pt-[136px]
        md:pb-28

        lg:px-12
        lg:pt-[156px]
        lg:pb-32

        xl:px-16
        xl:pt-[170px]

        2xl:px-20

        [@media(min-width:1024px)_and_(max-width:1366px)]:pt-[136px]!
        [@media(min-width:1024px)_and_(max-width:1366px)]:pb-24!
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
          Layered, slow and low-contrast: a fine dot grid that
          fades toward the edges, two drifting aurora washes,
          a hairline at the top and a soft floor glow at the
          bottom so the section hands off gently to the next.
      ===================================================== */}

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.55]
          [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1.2px)]
          [background-size:30px_30px]
          [mask-image:radial-gradient(ellipse_at_68%_45%,black_10%,transparent_68%)]
          [-webkit-mask-image:radial-gradient(ellipse_at_68%_45%,black_10%,transparent_68%)]
        "
      />

      {/* Aurora washes */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          left-[-8%]
          top-[-160px]
          h-[520px]
          w-[760px]
          rounded-full
          bg-[#00CDB5]/[0.085]
          blur-[130px]
          ${prefersReducedMotion ? "" : "about-aurora"}
        `}
      />

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          right-[-120px]
          bottom-[-180px]
          h-[460px]
          w-[460px]
          rounded-full
          bg-[#5A64FF]/[0.07]
          blur-[130px]
          ${prefersReducedMotion ? "" : "about-aurora-alt"}
        `}
      />

      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-[70%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#2DD4BF]/40
          to-transparent
        "
      />

      {/* Floor glow — softens the hand-off into the next section */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-[#0F1B2D]
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          z-10
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          2xl:max-w-[1600px]
        "
      >
        <OrbitalVisual />

        {/* Eyebrow Pill */}

        <motion.div
          variants={itemVariants}
          className="mb-8 flex items-center sm:mb-10"
        >
          <span
            className="
              story-pill
              hero-story-pill
              relative
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-[#2DD4BF]/25
              bg-[linear-gradient(135deg,rgba(0,255,213,0.08),rgba(255,255,255,0.04))]
              px-4
              py-2.5
              backdrop-blur-sm

              shadow-[0_0_0_1px_rgba(45,212,191,0.06),0_14px_38px_-10px_rgba(0,205,181,0.32)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-[2.5px]
              hover:border-[#2DD4BF]/45
              hover:shadow-[0_0_0_1px_rgba(45,212,191,0.10),0_22px_50px_-10px_rgba(0,205,181,0.48)]
            "
          >
            <span className="relative flex h-[8px] w-[8px] shrink-0 items-center justify-center">
              {!prefersReducedMotion && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-[-6px] rounded-full border border-[#2DD4BF]/35 hero-story-ring"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[#00FFD5] story-dot-breathe"
                  />
                </>
              )}

              <span className="relative h-[8px] w-[8px] rounded-full bg-[#00FFD5] shadow-[0_0_10px_rgba(0,255,213,0.65)]" />
            </span>

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.30em]
                text-[#00FFD5]
                sm:text-[10px]
                md:text-[11px]
              "
            >
              Our Story
            </span>
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          variants={headingContainer}
          aria-label="Where Trade Meets Technology."
          className="
            font-heading
            max-w-[1040px]
            font-extrabold
            tracking-[-0.04em]
            text-white
            text-[2.35rem]
            leading-[1.02]
            sm:text-[3.3rem]
            sm:leading-[1]
            md:text-[4rem]
            md:leading-[0.98]
            lg:text-[4.8rem]
            lg:leading-[0.98]
            xl:text-[5.4rem]

            [@media(min-width:1024px)_and_(max-width:1366px)]:text-[4.4rem]!
          "
        >
          <span className="block">
            <motion.span variants={headingWord} className="inline-block">
              Where
            </motion.span>{" "}
            <motion.span variants={headingWord} className="inline-block">
              Trade
            </motion.span>
          </span>

          <span className="block">
            <motion.span variants={headingWord} className="inline-block">
              Meets
            </motion.span>{" "}
            {/*
              Gradient text is painted only inside the element's own box.
              With a tight line-height the box is shorter than the glyphs,
              so the descenders of "gy" were being cut off. The bottom
              padding extends the paint area to cover them and the matching
              negative margin gives the space back so the layout is unchanged.
            */}
            <motion.span
              variants={headingWord}
              className="
                inline-block
                bg-gradient-to-r
                from-white
                via-[#F0FFFC]
                to-[#00FFD5]
                bg-clip-text
                pb-[0.18em]
                -mb-[0.18em]
                pr-[0.05em]
                font-extrabold
                text-transparent
                [-webkit-background-clip:text]
              "
            >
              Technology.
            </motion.span>
          </span>
        </motion.h1>

        {/* Supporting Paragraph */}

        <motion.p
          variants={itemVariants}
          className="
            pt-9
            max-w-[620px]
            text-[15.5px]
            font-semibold
            leading-[1.8]
            tracking-[-0.005em]
            text-white/70
            sm:pt-11
            sm:text-[16.5px]
            md:text-[17.5px]
            lg:pt-12
            lg:text-[18.5px]
          "
        >
          <span className="font-extrabold text-white">
            BH Ventures FZE LLC
          </span>{" "}
          is a UAE free-zone company built to combine international trade,
          technology, data, marketing, innovation, and business development
          into a single, focused venture platform.
        </motion.p>

        {/* Accent Line */}

        <motion.div
          variants={itemVariants}
          className="
            mt-12
            flex
            items-center
            gap-3
            sm:mt-14
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-10
              bg-gradient-to-r
              from-[#00CDB5]
              to-transparent
            "
          />

          <span
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-white/40
              sm:text-[12px]
            "
          >
            UAE • Dubai
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
