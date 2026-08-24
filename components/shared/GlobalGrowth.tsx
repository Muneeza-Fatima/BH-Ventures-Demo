"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Layers,
  Cpu,
  Handshake,
} from "lucide-react";

const pillars = [
  {
    index: "01",
    icon: TrendingUp,
    title: "Strategic Market Expansion",
    description:
      "Identifying high-potential markets and creating opportunities for sustainable international growth.",
  },
  {
    index: "02",
    icon: Layers,
    title: "Diversified Business Ventures",
    description:
      "Building and supporting ventures across trading, technology, digital solutions, and emerging industries.",
  },
  {
    index: "03",
    icon: Cpu,
    title: "Technology-Driven Innovation",
    description:
      "Leveraging AI, Web3, analytics, and modern digital infrastructure to create smarter business solutions.",
  },
  {
    index: "04",
    icon: Handshake,
    title: "Trusted Global Partnerships",
    description:
      "Working with strategic partners across markets to connect expertise, resources, and long-term opportunities.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -120,
    scale: 0.88,
    rotateX: 12,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,

    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

export default function BuiltForGlobalGrowth() {
  return (
    <section
      id="built-for-global-growth"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]
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
          left-1/2
          top-0
          h-[420px]
          w-[620px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#00CDB5]/[0.05]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-[260px]
          w-[520px]
          -translate-x-1/2
          translate-y-1/2
          rounded-full
          bg-[#00FFD5]/[0.025]
          blur-[100px]
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
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
            ease: [0.25, 0.8, 0.25, 1],
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

          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="
                h-px
                w-8
                bg-gradient-to-r
                from-transparent
                to-[#00FFD5]
                sm:w-10
              "
            />

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
              Why BH Ventures
            </span>

            <span
              className="
                h-px
                w-8
                bg-gradient-to-l
                from-transparent
                to-[#00FFD5]
                sm:w-10
              "
            />
          </div>

          {/* Heading */}

          <h2
            className="
              text-[2.1rem]
              font-extrabold
              leading-[1.02]
              tracking-[-0.05em]
              text-white
              sm:text-[2.75rem]
              lg:text-[3.2rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.75rem]!
            "
          >
            Built for Global{" "}
            <span
              className="
                bg-gradient-to-r
                from-white
                via-[#EFFFFB]
                to-[#00FFD5]
                bg-clip-text
                text-transparent
              "
            >
              Growth.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[560px]
              text-[14px]
              font-medium
              leading-7
              text-white/60
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            BH Ventures combines strategic market access, technology,
            business innovation, and trusted partnerships to create
            sustainable opportunities across international markets.
          </p>
        </motion.div>

        {/* =====================================================
            CARDS
        ===================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-6
          "
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                variants={cardVariants}
                style={{
                  transformPerspective: 1000,
                }}
                whileHover={{
                  y: -8,
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
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-6

                  transition-all
                  duration-500
                  ease-out

                  hover:border-[#00FFD5]/35
                  hover:bg-white/[0.045]
                  hover:shadow-[0_20px_50px_rgba(0,255,213,0.10)]

                  sm:p-7
                "
              >
                {/* =================================================
                    TOP RIGHT AMBIENT GLOW
                ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    bg-[#00FFD5]/0
                    blur-[70px]
                    transition-all
                    duration-700
                    ease-out
                    group-hover:scale-125
                    group-hover:bg-[#00FFD5]/[0.14]
                  "
                />

                {/* =================================================
                    BOTTOM AMBIENT GLOW
                ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    left-1/2
                    h-32
                    w-40
                    -translate-x-1/2
                    rounded-full
                    bg-[#00FFD5]/0
                    blur-[60px]
                    transition-all
                    duration-700
                    group-hover:bg-[#00FFD5]/[0.08]
                  "
                />

                {/* =================================================
                    LIGHT SWEEP
                ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[120%]
                    w-[70%]
                    rotate-[18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.08]
                    to-transparent

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:translate-x-[320%]
                  "
                />

                {/* =================================================
                    NUMBER
                ================================================= */}

                <motion.span
                  initial={{
                    opacity: 0.25,
                    x: 0,
                  }}
                  whileHover={{
                    opacity: 0.65,
                    x: 4,
                  }}
                  className="
                    relative
                    z-10
                    inline-block
                    text-[11px]
                    font-bold
                    tracking-[0.12em]
                    text-[#5EEAD4]
                    transition-all
                    duration-300
                  "
                >
                  {pillar.index}
                </motion.span>

                {/* =================================================
                    ICON
                ================================================= */}

                <motion.div
                  className="
                    relative
                    z-10
                    mt-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#00FFD5]/15
                    bg-[#00FFD5]/[0.08]
                    text-[#5EEAD4]

                    transition-all
                    duration-500
                    ease-out

                    group-hover:border-[#00FFD5]/40
                    group-hover:bg-[#00FFD5]/[0.14]
                    group-hover:shadow-[0_0_25px_rgba(0,255,213,0.18)]
                    group-hover:scale-[1.1]
                    group-hover:rotate-[-5deg]
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* =================================================
                    TITLE
                ================================================= */}

                <motion.h3
                  className="
                    relative
                    z-10
                    mt-5
                    text-[16px]
                    font-bold
                    leading-tight
                    tracking-[-0.01em]
                    text-white

                    transition-all
                    duration-300
                    ease-out

                    group-hover:translate-x-[3px]
                    group-hover:text-[#EFFFFB]

                    sm:text-[17px]
                  "
                >
                  {pillar.title}
                </motion.h3>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <motion.p
                  className="
                    relative
                    z-10
                    mt-3
                    text-[13px]
                    font-medium
                    leading-6
                    text-white/55

                    transition-all
                    duration-300
                    ease-out

                    group-hover:-translate-y-[1px]
                    group-hover:text-white/75
                  "
                >
                  {pillar.description}
                </motion.p>

                {/* =================================================
                    BOTTOM ACCENT LINE
                ================================================= */}

                <motion.div
                  initial={{
                    scaleX: 0,
                    opacity: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    bottom-0
                    left-6
                    right-6
                    h-px
                    origin-left
                    bg-gradient-to-r
                    from-[#00FFD5]
                    via-[#5EEAD4]
                    to-transparent
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}