"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

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

export default function ContactHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact-hero"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]

        px-5
        pt-[110px]
        pb-14

        sm:px-7
        sm:pt-[118px]
        sm:pb-16

        md:px-10
        md:pt-[128px]
        md:pb-18

        lg:px-12
        lg:pt-[150px]
        lg:pb-20

        xl:px-16
        xl:pt-[164px]

        [@media(min-width:1024px)_and_(max-width:1366px)]:pt-[130px]!
      "
    >
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
          text-center
          2xl:max-w-[1600px]
        "
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center justify-center sm:mb-8"
        >
          <span
            className="
              story-pill
              relative
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/[0.14]
              bg-[linear-gradient(135deg,rgba(0,255,213,0.06),rgba(255,255,255,0.04))]
              px-4
              py-2
              backdrop-blur-sm

              shadow-[0_10px_30px_-8px_rgba(0,205,181,0.22)]
            "
          >
            <span className="relative flex h-[7px] w-[7px] shrink-0 items-center justify-center">
              {!prefersReducedMotion && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[#00FFD5] story-dot-breathe"
                />
              )}

              <span className="relative h-[7px] w-[7px] rounded-full bg-[#00FFD5]" />
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
              Get In Touch
            </span>
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="
            mx-auto
            max-w-[760px]
            font-extrabold
            tracking-[-0.05em]
            text-white
            text-[2.4rem]
            leading-[1.02]
            sm:text-[3rem]
            md:text-[3.6rem]
            lg:text-[4.2rem]
          "
        >
          Let&apos;s start a{" "}
          <span
            className="
              bg-gradient-to-r
              from-white
              via-[#F0FFFC]
              to-[#00FFD5]
              bg-clip-text
              text-transparent
            "
          >
            conversation.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="
            mx-auto
            pt-6
            max-w-[560px]
            text-[14px]
            font-medium
            leading-[1.75]
            text-white/65
            sm:pt-7
            sm:text-[15px]
            lg:text-[16px]
          "
        >
          Have a question about our ventures, services, or a potential
          partnership? Send us a message below, or reach the team directly
          through the channels alongside it.
        </motion.p>
      </motion.div>
    </section>
  );
}
