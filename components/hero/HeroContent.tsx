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
      ease: "easeOut",
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
            from-[#14B8A6]
            to-[#2DD4BF]

            sm:w-9
          "
        />

        <span
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.24em]
            text-[#2DD4BF]

            sm:text-[11px]

            md:text-xs
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
          font-bold
          tracking-[-0.055em]
          text-white

          text-[3.25rem]
          leading-[0.94]

          sm:text-[3.6rem]
          sm:leading-[0.95]

          md:text-[3.9rem]
          md:leading-[0.95]

          lg:text-[4rem]

          xl:text-[4.7rem]
        "
      >
        <span className="block">
          <motion.span
            variants={headingWord}
            className="inline-block"
          >
            Building
          </motion.span>{" "}
          <motion.span
            variants={headingWord}
            className="inline-block"
          >
            the
          </motion.span>
        </span>

        <span className="block">
          <motion.span
            variants={headingWord}
            className="inline-block"
          >
            Future
          </motion.span>{" "}
          <motion.span
            variants={headingWord}
            className="inline-block"
          >
            of
          </motion.span>
        </span>

        <span className="block">
          <motion.span
            variants={headingWord}
            className="
              inline-block
              font-extrabold
              text-white
            "
          >
            Ventures.
          </motion.span>
        </span>
      </motion.h1>

      {/* Bridging Line */}
      <div
        className="
          mt-5
          flex
          w-full
          max-w-[620px]
          items-baseline
          overflow-hidden

          sm:mt-6
          md:mt-6
          lg:mt-5
        "
      >
        {/* Bridging */}
        <motion.span
          variants={itemVariants}
          className="
            shrink-0
            whitespace-nowrap
            text-[1rem]
            font-bold
            leading-[1.5]
            text-[#14B8A6]

            sm:text-[1.08rem]

            md:text-[1.12rem]

            lg:text-[1.18rem]

            xl:text-[1.24rem]
          "
        >
          Bridging
        </motion.span>

        {/* Animated Text */}
        <div
          className="
            ml-2
            min-w-0
            overflow-hidden
          "
        >
          <motion.span
            initial={{
              clipPath: "inset(0 100% 0 0)",
            }}
            animate={{
              clipPath: [
                "inset(0 100% 0 0)",
                "inset(0 0% 0 0)",
                "inset(0 0% 0 0)",
                "inset(0 100% 0 0)",
              ],
            }}
            transition={{
              duration: 5,
              times: [0, 0.25, 0.75, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
            className="
              inline-block
              whitespace-normal
              text-[1rem]
              font-bold
              leading-[1.5]

              sm:text-[1.08rem]

              md:text-[1.12rem]

              lg:text-[1.18rem]

              xl:text-[1.24rem]
            "
          >
            <span className="text-white">
              Technology{" "}
            </span>

            <span className="text-[#2DD4BF]">
              &amp;
            </span>

            <span className="text-white">
              {" Innovation "}
            </span>

            <span className="text-[#2DD4BF]">
              from the UAE.
            </span>
          </motion.span>
        </div>
      </div>

      {/* Premium Visible Gap */}
      <div
        aria-hidden="true"
        className="
          h-7

          sm:h-8

          md:h-8

          lg:h-8

          xl:h-9
        "
      />

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="
          max-w-[560px]
          text-[15.5px]
          font-bold
          leading-[1.7]
          text-white

          sm:text-[16px]

          md:text-[16px]

          lg:text-[16.5px]

          xl:text-[17px]
        "
      >
        <motion.span
          className="
            inline-block
            bg-[linear-gradient(90deg,#14B8A6_0%,#2DD4BF_30%,#ffffff_50%,#2DD4BF_70%,#14B8A6_100%)]
            bg-[length:250%_100%]
            bg-clip-text
            font-extrabold
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
        is a licensed free-zone company specializing in Web3
        Studio, Artificial Intelligence, Digital Analytics,
        Marketing, and International Trading.
      </motion.p>

      {/* Impact Line */}
      <motion.p
        variants={itemVariants}
        className="
          mt-5
          max-w-[560px]
          text-sm
          font-semibold
          leading-6
          text-[#2DD4BF]

          sm:text-[15px]

          md:text-[15px]

          lg:text-[15.5px]

          xl:text-base
        "
      >
        Driving global growth through innovation and strategic
        ventures.
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="
          mt-14
          flex
          flex-col
          items-start

          sm:mt-16

          md:mt-16

          lg:mt-16

          xl:mt-18
        "
      >
        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-white/60

            sm:text-[10px]
          "
        >
          Scroll to Explore
        </span>

        <motion.div
          animate={{
            y: [0, 5, 0],
            opacity: [0.65, 1, 0.65],
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
              text-[#2DD4BF]
              drop-shadow-[0_0_7px_rgba(45,212,191,0.65)]
            "
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}