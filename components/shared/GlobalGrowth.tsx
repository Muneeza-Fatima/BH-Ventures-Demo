"use client";

import { motion, useReducedMotion } from "framer-motion";
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
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="built-for-global-growth"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden

        bg-[#F4F7F6]

        py-12
        sm:py-14
        md:py-18
        lg:py-22
        xl:py-26
      "
    >
      {/* =====================================================
          LIGHTWEIGHT OFF-WHITE BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[300px]
          bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.07),transparent_65%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-[300px]
          w-[300px]
          bg-[radial-gradient(circle,rgba(20,184,166,0.045),transparent_70%)]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1440px]

          px-5
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16

          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.55,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="
            mx-auto
            mb-9
            max-w-[720px]
            text-center

            sm:mb-11
            lg:mb-13
          "
        >
          {/* LABEL */}

          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="
                h-px
                w-7
                bg-gradient-to-r
                from-transparent
                to-[#149D8B]
                sm:w-10
              "
            />

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.28em]
                text-[#087C70]
                sm:text-[10px]
              "
            >
              Why BH Ventures
            </span>

            <span
              className="
                h-px
                w-7
                bg-gradient-to-l
                from-transparent
                to-[#149D8B]
                sm:w-10
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              text-[2rem]
              font-extrabold
              leading-[1.04]
              tracking-[-0.045em]
              text-[#102B40]

              sm:text-[2.5rem]
              md:text-[2.75rem]
              lg:text-[3.15rem]
            "
          >
            Built for Global{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#102B40]
                via-[#155E75]
                to-[#009F8C]
                bg-clip-text
                text-transparent
              "
            >
              Growth.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[580px]

              text-[13px]
              font-medium
              leading-6
              text-[#526575]

              sm:text-[14px]
              sm:leading-7

              lg:text-[15px]
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
            amount: 0.1,
          }}
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2
            sm:gap-5

            lg:grid-cols-4
            lg:gap-5

            xl:gap-6
          "
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -5,
                        transition: {
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
                className="
                  group
                  relative
                  min-w-0
                  overflow-hidden
                  rounded-[20px]

                  border
                  border-[#21445A]

                  bg-gradient-to-br
                  from-[#102D43]
                  via-[#0B263A]
                  to-[#071C2E]

                  p-5

                  shadow-[0_8px_24px_rgba(8,30,48,0.18)]

                  transition-[transform,border-color,box-shadow]
                  duration-300
                  ease-out

                  hover:border-[#5EEAD4]/55
                  hover:shadow-[0_14px_34px_rgba(8,30,48,0.24)]

                  active:border-[#5EEAD4]/45

                  sm:p-6
                  lg:p-6
                  xl:p-7
                "
              >
                {/* INNER BORDER */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-[1px]
                    rounded-[19px]
                    border
                    border-white/[0.035]
                  "
                />

                {/* TOP TURQUOISE LINE */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-[12%]
                    right-[12%]
                    top-0
                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-[#5EEAD4]/45
                    to-transparent

                    transition-all
                    duration-300

                    group-hover:left-[7%]
                    group-hover:right-[7%]
                    group-hover:via-[#5EEAD4]/80
                  "
                />

                {/* SUBTLE HIGHLIGHT */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    h-28
                    w-28

                    bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.09),transparent_70%)]

                    opacity-70
                    transition-opacity
                    duration-300

                    group-hover:opacity-100
                  "
                />

                {/* NUMBER */}

                <span
                  className="
                    relative
                    z-10
                    inline-block

                    text-[10px]
                    font-bold
                    tracking-[0.14em]
                    text-[#5EEAD4]/75

                    transition-colors
                    duration-300

                    group-hover:text-[#8AFFF3]
                  "
                >
                  {pillar.index}
                </span>

                {/* ICON */}

                <div
                  className="
                    relative
                    z-10
                    mt-4

                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-[14px]

                    border
                    border-[#5EEAD4]/25

                    bg-[#087F78]/15

                    text-[#5EEAD4]

                    transition-[transform,border-color,background-color,color]
                    duration-300
                    ease-out

                    group-hover:-translate-y-1
                    group-hover:border-[#5EEAD4]/60
                    group-hover:bg-[#087F78]/25
                    group-hover:text-[#B8FFF8]
                  "
                >
                  <Icon
                    size={19}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                {/* TITLE */}

                <h3
                  className="
                    relative
                    z-10
                    mt-5

                    text-[15px]
                    font-bold
                    leading-[1.25]
                    tracking-[-0.01em]
                    text-white

                    transition-colors
                    duration-300

                    group-hover:text-[#D9FFFA]

                    sm:text-[16px]
                  "
                >
                  {pillar.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    relative
                    z-10
                    mt-3

                    text-[12.5px]
                    font-medium
                    leading-[1.7]
                    text-white/55

                    transition-colors
                    duration-300

                    group-hover:text-white/72

                    sm:text-[13px]
                  "
                >
                  {pillar.description}
                </p>

                {/* BOTTOM ACCENT */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-[12%]
                    right-[12%]
                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-[#5EEAD4]/40
                    to-transparent

                    transition-all
                    duration-300

                    group-hover:left-[5%]
                    group-hover:right-[5%]
                    group-hover:via-[#5EEAD4]/80
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