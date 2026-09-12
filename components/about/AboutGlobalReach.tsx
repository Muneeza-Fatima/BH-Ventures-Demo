"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe2, Handshake, TrendingUp, Blocks } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pillars = [
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "Operating from the UAE with direct reach into international markets across multiple regions.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Trusted partnerships that extend the platform's reach beyond direct operations.",
  },
  {
    icon: TrendingUp,
    title: "Market Expansion",
    description:
      "Pursuing new markets and business lines as trade and technology create fresh opportunity.",
  },
  {
    icon: Blocks,
    title: "Multi-Sector Flexibility",
    description:
      "One licensed platform, structured to move across disciplines rather than staying fixed to one.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function AboutGlobalReach() {
  const prefersReducedMotion = useReducedMotion();

  const hoverPop = prefersReducedMotion
    ? {}
    : {
        y: -6,
        scale: 1.015,
        transition: { duration: 0.35, ease: EASE },
      };

  return (
    <section
      id="about-global"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0F1B2D]
        py-14
        sm:py-18
        md:py-20
        lg:py-24
        xl:py-28

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-16!
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#00CDB5]/[0.05]
          blur-[130px]
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-12 max-w-[680px] text-center sm:mb-14 lg:mb-16"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FFD5] sm:w-10" />

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
              Why Global Matters
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FFD5] sm:w-10" />
          </div>

          <h2
            className="
              font-heading
              text-[2rem]
              font-bold
              leading-[1.1]
              tracking-[-0.028em]
              text-[#E7EDF3]
              sm:text-[2.5rem]
              lg:text-[2.875rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.5rem]!
            "
          >
            Built to move{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#E7EDF3]
                via-[#D8F1EC]
                to-[#5EEAD4]
                bg-clip-text
                pb-[0.18em]
                -mb-[0.18em]
                text-transparent
                [-webkit-background-clip:text]
              "
            >
              across borders.
            </span>
          </h2>

          <p
            className="
              mx-auto
              pt-6
              max-w-[560px]
              text-[14px]
              font-medium
              leading-[1.75]
              text-[#AAB6C2]
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            A single UAE base gives the platform reach into international
            markets — and the flexibility to grow into new ones without
            being locked to a single sector.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-5
          "
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                variants={cardVariants}
                whileHover={hoverPop}
                whileFocus={hoverPop}
                tabIndex={0}
                className="
                  group
                  relative
                  isolate
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-white/[0.09]
                  bg-white/[0.025]
                  p-6

                  transition-[border-color,box-shadow,background-color]
                  duration-[350ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:border-[#2DD4BF]/50
                  hover:bg-white/[0.045]
                  hover:shadow-[0_22px_50px_rgba(0,0,0,0.25),0_0_36px_rgba(0,205,181,0.16)]

                  focus:border-[#2DD4BF]/50
                  focus:bg-white/[0.045]
                  focus:shadow-[0_22px_50px_rgba(0,0,0,0.25),0_0_36px_rgba(0,205,181,0.16)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#5EEAD4]/60
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#0F1B2D]

                  sm:p-7
                "
              >
                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-[16px]
                    border
                    border-[#2DD4BF]/30
                    bg-[#0E4A44]/50
                    text-[#5EEAD4]

                    transition-transform
                    duration-[350ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:-translate-y-0.5
                    group-hover:scale-105
                    group-focus:-translate-y-0.5
                    group-focus:scale-105
                  "
                >
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <h3
                  className="
                    mt-6
                    text-[17px]
                    font-semibold
                    leading-[1.25]
                    tracking-[-0.018em]
                    text-[#E7EDF3]
                    sm:text-[18px]
                  "
                >
                  {pillar.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-[13px]
                    font-medium
                    leading-[1.7]
                    text-[#AAB6C2]

                    transition-colors
                    duration-300

                    group-hover:text-[#C9D2DB]
                    group-focus:text-[#C9D2DB]
                  "
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
