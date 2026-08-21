"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const headingWord: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
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
        max-w-[680px]
      "
    >
      {/* Location */}
      <motion.div
        variants={itemVariants}
        className="
          mb-6
          flex
          items-center
          gap-3
          sm:mb-7
          md:mb-8
          lg:mb-7
        "
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
            [text-shadow:0_0_8px_rgba(0,255,213,0.55)]
            sm:text-[10px]
            md:text-[11px]
          "
        >
          Dubai • UAE
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        variants={headingContainer}
        aria-label="Building the Future of Ventures."
        className="
          max-w-[680px]
          font-extrabold
          tracking-[-0.06em]
          text-white
          text-[3.25rem]
          leading-[0.94]
          sm:text-[3.6rem]
          sm:leading-[0.94]
          md:text-[3.9rem]
          md:leading-[0.94]
          lg:text-[4rem]
          xl:text-[4.7rem]
        "
      >
        <span className="block">
          <motion.span
            variants={headingWord}
            className="inline-block font-extrabold"
          >
            Building
          </motion.span>{" "}
          <motion.span
            variants={headingWord}
            className="inline-block font-extrabold"
          >
            the
          </motion.span>
        </span>

        <span className="block">
          <motion.span
            variants={headingWord}
            className="inline-block font-extrabold"
          >
            Future
          </motion.span>{" "}
          <motion.span
            variants={headingWord}
            className="inline-block font-extrabold"
          >
            of
          </motion.span>
        </span>

        <span className="block">
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
            Ventures.
          </motion.span>
        </span>
      </motion.h1>

      {/* Bridging Line */}
      <div
        className="
          mt-8
          w-full
          max-w-[620px]
          sm:mt-6
          md:mt-6
          lg:mt-5
        "
      >
        <div
          className="
            flex
            w-full
            items-baseline
            whitespace-nowrap
            text-[0.82rem]
            font-extrabold
            leading-[1.5]
            sm:text-[1.08rem]
            md:text-[1.12rem]
            lg:text-[1.18rem]
            xl:text-[1.24rem]
          "
        >
          <motion.span
            variants={itemVariants}
            className="
              shrink-0
              font-extrabold
              text-[#00FFD5]
              [text-shadow:0_0_8px_rgba(0,255,213,0.55)]
            "
          >
            Bridging
          </motion.span>

          <span
            className="
              ml-1.5
              min-w-0
              overflow-hidden
              sm:ml-2
            "
          >
            <motion.span
              initial={{
                clipPath: "inset(0 100% 0 0)",
                opacity: 0,
              }}
              animate={{
                clipPath: [
                  "inset(0 100% 0 0)",
                  "inset(0 0% 0 0)",
                  "inset(0 0% 0 0)",
                  "inset(0 100% 0 0)",
                ],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 5,
                times: [0, 0.25, 0.75, 1],
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 0.6,
              }}
              className="inline-block font-extrabold"
            >
              <span className="font-extrabold text-white">
                Technology{" "}
              </span>

              <span
                className="
                  font-black
                  text-[#00FFD5]
                  [text-shadow:0_0_8px_rgba(0,255,213,0.6)]
                "
              >
                &amp;{" "}
              </span>

              <span className="font-extrabold text-white">
                Innovation{" "}
              </span>

              <span
                className="
                  font-black
                  text-[#00FFD5]
                  [text-shadow:0_0_8px_rgba(0,255,213,0.6)]
                "
              >
                from the UAE.
              </span>
            </motion.span>
          </span>
        </div>
      </div>

      {/* Premium Gap */}
      <div
        aria-hidden="true"
        className="
          h-4
          sm:h-6
          md:h-6
          lg:h-6
          xl:h-7
        "
      />

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="
          max-w-[560px]
          text-[15px]
          font-extrabold
          leading-[1.75]
          tracking-[-0.005em]
          text-white/80
          sm:text-[16px]
          md:text-[16px]
          lg:text-[16.5px]
          xl:text-[17px]
        "
      >
        <motion.span
          className="
            inline-block
            bg-[linear-gradient(90deg,#00CDB5_0%,#00FFD5_35%,#7AFFF0_50%,#00FFD5_65%,#00CDB5_100%)]
            bg-[length:250%_100%]
            bg-clip-text
            font-black
            text-transparent
            [-webkit-background-clip:text]
          "
          animate={{
            backgroundPosition: [
              "100% 50%",
              "0% 50%",
              "100% 50%",
            ],
          }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        >
          BH Ventures FZE LLC
        </motion.span>{" "}
        <span className="font-extrabold text-white/90">
          is a licensed free-zone company specializing in Web3 Studio,
          Artificial Intelligence, Digital Analytics, Marketing, and
          International Trading.
        </span>
      </motion.p>

      {/* Impact Line */}
      <motion.p
        variants={itemVariants}
        className="
          mt-5
          flex
          max-w-[560px]
          items-center
          gap-2
          text-[13px]
          font-extrabold
          leading-6
          tracking-[0.01em]
          text-[#00FFD5]
          [text-shadow:0_0_8px_rgba(0,255,213,0.45)]
          sm:text-[14px]
          md:text-[14.5px]
          lg:text-[15px]
          xl:text-[15.5px]
        "
      >
        <span
          aria-hidden="true"
          className="
            inline-block
            h-px
            w-5
            shrink-0
            bg-gradient-to-r
            from-[#00CDB5]
            to-[#00FFD5]
          "
        />

        Driving global growth through innovation and strategic ventures.
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="
          mt-12
          flex
          flex-col
          items-start
          sm:mt-14
          md:mt-15
          lg:mt-15
          xl:mt-16
        "
      >
        <span
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.32em]
            text-white/55
            sm:text-[9px]
            md:text-[10px]
          "
        >
          Scroll to Explore
        </span>

        <motion.div
          animate={{
            y: [0, 5, 0],
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className="
              mt-2
              h-5
              w-5
              text-[#00FFD5]
            "
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}