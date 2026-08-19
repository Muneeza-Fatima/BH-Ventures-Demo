"use client";

import { motion, type Variants } from "framer-motion";
import HeroButtons from "./HeroButtons";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.35,
    },
  },
};

const headingWord: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        relative
        z-20
        w-full
        max-w-[590px]
        px-0

        md:max-w-[650px]
        md:px-2

        lg:max-w-[680px]
        lg:px-0

        xl:max-w-[700px]
      "
    >
      {/* Location */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: "easeOut",
        }}
        className="
          mb-5
          flex
          items-center
          gap-3
        "
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: "left center",
          }}
          className="h-px w-10 shrink-0 bg-[#14B8A6]"
        />

        <span
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#14B8A6]

            sm:text-xs
          "
        >
          Dubai • UAE
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        variants={headingContainer}
        initial="hidden"
        animate="visible"
        aria-label="Building the Future of Ventures."
        className="
          max-w-[680px]
          font-bold
          tracking-[-0.06em]
          text-[#0B1220]

          text-[3.65rem]
          leading-[0.92]

          sm:text-[3.85rem]

          md:text-[4rem]
          md:leading-[0.93]

          lg:text-[4.5rem]

          xl:text-[4.75rem]
        "
      >
        <span className="block">
          <motion.span variants={headingWord} className="inline-block">
            Building
          </motion.span>{" "}
          <motion.span variants={headingWord} className="inline-block">
            the
          </motion.span>
        </span>

        <span className="block">
          <motion.span variants={headingWord} className="inline-block">
            Future
          </motion.span>{" "}
          <motion.span variants={headingWord} className="inline-block">
            of
          </motion.span>
        </span>

        <span className="block">
          <motion.span
            variants={headingWord}
            className="inline-block font-extrabold"
          >
            Ventures.
          </motion.span>
        </span>
      </motion.h1>

      {/* Supporting Line */}
      <p
        className="
          mt-7
          max-w-[540px]
          text-[1.18rem]
          font-semibold
          leading-[1.6]
          tracking-[-0.012em]
          text-[#1E293B]

          sm:text-[1.22rem]

          md:text-[1.25rem]

          lg:text-[1.3rem]
        "
      >
        <span>Bridging </span>

        {/* Looping Text */}
        <span className="relative inline-block">
          <motion.span
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-12, 0, 0, 12],
            }}
            transition={{
              duration: 4.2,
              delay: 1,
              repeat: Infinity,
              repeatDelay: 1.2,
              times: [0, 0.2, 0.78, 1],
              ease: "easeInOut",
            }}
            className="
              relative
              inline-block
              whitespace-nowrap

              text-[1.12rem]

              sm:text-[1.18rem]

              md:text-[1.25rem]

              lg:text-[1.3rem]
            "
          >
            Trade, Technology & Innovation from the UAE.
          </motion.span>

          {/* Close Sea-Green Underline */}
          <motion.span
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4.2,
              delay: 1,
              repeat: Infinity,
              repeatDelay: 1.2,
              times: [0, 0.2, 0.78, 1],
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "left center",
            }}
            className="
              pointer-events-none
              absolute
              left-0
              bottom-0
              h-[2px]
              w-full
              bg-[#14B8A6]
            "
          />
        </span>
      </p>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="
          mt-5
          max-w-[535px]
          text-[16.5px]
          font-normal
          leading-[1.85]
          tracking-[-0.002em]
          text-[#475569]

          sm:text-[17px]
          sm:leading-[1.85]

          md:mt-5
          md:text-[17px]
          md:leading-[1.75]

          lg:mt-5
          lg:text-[17px]
          lg:leading-[1.8]
        "
      >
        BH Ventures FZE LLC is a forward-thinking ventures company
        specializing in Web3, Artificial Intelligence, Digital Analytics,
        Marketing, and International Trading.
      </motion.p>

      {/* CTA */}
      <motion.div
        variants={itemVariants}
        className="
          mt-8
          w-full
          pb-12

          sm:mt-8
          sm:pb-14

          md:mt-8
          md:pb-16

          lg:w-auto
          lg:pb-20
        "
      >
        <HeroButtons />
      </motion.div>
    </motion.div>
  );
}