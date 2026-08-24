"use client";

import { motion, type Variants } from "framer-motion";

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

        px-5
        pt-[110px]
        pb-16

        sm:px-7
        sm:pt-[118px]
        sm:pb-20

        md:px-10
        md:pt-[128px]
        md:pb-24

        lg:px-12
        lg:pt-[150px]
        lg:pb-28

        xl:px-16
        xl:pt-[164px]

        [@media(min-width:1024px)_and_(max-width:1366px)]:pt-[130px]!
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-120px]
          h-[480px]
          w-[720px]
          -translate-x-1/2
          rounded-full
          bg-[#00CDB5]/[0.06]
          blur-[130px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-160px]
          bottom-[-140px]
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#5A64FF]/[0.05]
          blur-[120px]
        "
      />

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
        {/* Eyebrow */}

        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-3 sm:mb-8"
        >
          <span
            className="
              h-px
              w-8
              shrink-0
              bg-gradient-to-r
              from-[#00CDB5]
              to-[#00FFD5]
              sm:w-9
            "
          />

          <span
            className="
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.30em]
              text-[#00FFD5]
              [text-shadow:0_0_8px_rgba(0,255,213,0.5)]
              sm:text-[10px]
              md:text-[11px]
            "
          >
            About BH Ventures
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          variants={headingContainer}
          aria-label="Where Trade Meets Technology."
          className="
            max-w-[920px]
            font-extrabold
            tracking-[-0.055em]
            text-white
            text-[2.6rem]
            leading-[0.98]
            sm:text-[3.4rem]
            sm:leading-[0.98]
            md:text-[4.2rem]
            md:leading-[0.96]
            lg:text-[5.2rem]
            lg:leading-[0.95]
            xl:text-[5.8rem]
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
            <motion.span
              variants={headingWord}
              className="
                inline-block
                bg-gradient-to-r
                from-white
                via-[#F0FFFC]
                to-[#00FFD5]
                bg-clip-text
                font-black
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
            pt-8
            max-w-[640px]
            text-[15px]
            font-semibold
            leading-[1.75]
            tracking-[-0.005em]
            text-white/70
            sm:pt-9
            sm:text-[16px]
            md:text-[17px]
            lg:pt-10
            lg:text-[18px]
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
            mt-10
            flex
            items-center
            gap-3
            sm:mt-12
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
            UAE • Ajman Free Zone
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
