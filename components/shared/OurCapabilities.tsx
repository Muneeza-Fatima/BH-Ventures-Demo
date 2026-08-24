"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Rocket,
  Sparkles,
  BarChart3,
  Megaphone,
  Handshake,
} from "lucide-react";

const capabilities = [
  {
    icon: ArrowLeftRight,
    title: "International Trading",
    description:
      "Global trading and market access across strategically selected international markets.",
  },
  {
    icon: Rocket,
    title: "Strategic Ventures",
    description:
      "Identifying, developing, and supporting high-potential business opportunities.",
  },
  {
    icon: Sparkles,
    title: "AI & Web3 Solutions",
    description:
      "Technology-driven solutions across artificial intelligence, Web3, and emerging digital ecosystems.",
  },
  {
    icon: BarChart3,
    title: "Digital Analytics",
    description:
      "Turning business data into actionable insights for smarter strategic decisions.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Growth",
    description:
      "Digital marketing and growth strategies designed to strengthen brands and expand market reach.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Connecting businesses, expertise, and resources through long-term strategic relationships.",
  },
];

/* ============================================================
   HEADING ANIMATION
============================================================ */

const headingWords = ["Our", "Capabilities."];

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },

  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

/* ============================================================
   CARD ANIMATION
============================================================ */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

export default function OurCapabilities() {
  return (
    <section
      id="our-capabilities"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#F4F7F5]
        py-14
        sm:py-18
        md:py-20
        lg:py-24
        xl:py-28
        [@media(min-width:1024px)_and_(max-width:1366px)]:py-16!
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
          right-[-180px]
          top-[8%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#00BFA6]/[0.06]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-180px]
          bottom-[5%]
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#8B7CFF]/[0.045]
          blur-[120px]
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
            HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-10
            max-w-[720px]
            text-center
            sm:mb-12
            lg:mb-16
            [@media(min-width:1024px)_and_(max-width:1366px)]:mb-10!
          "
        >
          {/* Section Label */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.55,
              delay: 0.05,
            }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-transparent
                to-[#00A98F]
                sm:w-10
              "
            />

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.28em]
                text-[#008F7A]
                sm:text-[10px]
              "
            >
              What We Do
            </span>

            <span
              className="
                h-px
                w-8
                bg-gradient-to-l
                from-transparent
                to-[#00A98F]
                sm:w-10
              "
            />
          </motion.div>

          {/* Animated Heading */}

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              staggerChildren: 0.16,
            }}
            className="
              flex
              flex-wrap
              justify-center
              gap-x-3
              text-[2.1rem]
              font-extrabold
              leading-[1.02]
              tracking-[-0.05em]
              text-[#102A43]
              sm:text-[2.75rem]
              lg:text-[3.2rem]
              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.75rem]!
            "
          >
            {headingWords.map((word, index) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className={
                  index === 1
                    ? `
                      bg-gradient-to-r
                      from-[#102A43]
                      via-[#155E75]
                      to-[#00A98F]
                      bg-clip-text
                      text-transparent
                    `
                    : ""
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              mt-5
              max-w-[560px]
              text-[14px]
              font-medium
              leading-7
              text-[#526477]
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            From international trading to emerging technologies, BH
            Ventures provides strategic capabilities designed to create
            and scale global opportunities.
          </motion.p>
        </motion.div>

        {/* =====================================================
            PREMIUM CARDS
        ===================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-5
          "
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <motion.article
                key={capability.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: {
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]

                  border
                  border-[#29465D]

                  bg-gradient-to-br
                  from-[#1C344A]
                  via-[#192F44]
                  to-[#162A3D]

                  p-6

                  shadow-[0_16px_45px_rgba(8,25,40,0.22)]

                  transition-all
                  duration-500
                  ease-out

                  hover:border-[#3B6478]
                  hover:from-[#203A50]
                  hover:via-[#1C344A]
                  hover:to-[#192F44]

                  hover:shadow-[0_24px_60px_rgba(8,25,40,0.32)]

                  sm:p-7
                "
              >
                {/* Premium Inner Glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-56
                    w-56
                    rounded-full
                    bg-[#5EEAD4]/[0.055]
                    blur-[70px]
                    opacity-0
                    transition-opacity
                    duration-700
                    ease-out
                    group-hover:opacity-100
                  "
                />

                {/* Subtle Top Highlight */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-6
                    right-6
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.10]
                    to-transparent
                  "
                />

                {/* Number */}

                <div
                  className="
                    absolute
                    right-6
                    top-6
                    text-[10px]
                    font-bold
                    tracking-[0.18em]
                    text-white/20
                    transition-all
                    duration-500
                    group-hover:text-[#8DEBDD]/50
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* =================================================
                    DEEP TURQUOISE ICON
                ================================================= */}

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[13px]

                    border
                    border-[#2DD4BF]/35

                    bg-[#064E49]/60

                    text-[#5EEAD4]

                    shadow-[inset_0_0_20px_rgba(45,212,191,0.16),0_0_20px_rgba(20,184,166,0.12)]

                    transition-all
                    duration-500
                    ease-out

                    group-hover:-translate-y-1
                    group-hover:border-[#5EEAD4]/55
                    group-hover:bg-[#075E57]/70
                    group-hover:text-[#99F6E4]

                    group-hover:shadow-[inset_0_0_24px_rgba(45,212,191,0.22),0_0_28px_rgba(20,184,166,0.20)]
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="
                      relative
                      z-10
                      drop-shadow-[0_0_7px_rgba(94,234,212,0.45)]
                      transition-all
                      duration-500
                      ease-out
                      group-hover:scale-105
                      group-hover:drop-shadow-[0_0_10px_rgba(94,234,212,0.75)]
                    "
                  />
                </div>

                {/* Title */}

                <h3
                  className="
                    relative
                    mt-5
                    max-w-[270px]
                    text-[16px]
                    font-bold
                    leading-tight
                    tracking-[-0.015em]
                    text-white
                    transition-colors
                    duration-500
                    group-hover:text-[#C5FFF6]
                    sm:text-[17px]
                  "
                >
                  {capability.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    relative
                    mt-3
                    max-w-[390px]
                    text-[13px]
                    font-medium
                    leading-6
                    text-white/55
                    transition-colors
                    duration-500
                    group-hover:text-white/68
                  "
                >
                  {capability.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}