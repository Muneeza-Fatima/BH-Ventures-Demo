"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const values = [
  {
    emoji: "🚀",
    title: "Innovation",
    description:
      "We test new operating models and combine disciplines others keep separate, rather than defending one fixed way of working.",
    accent: "#14B8A6",
    accentSoft: "rgba(20,184,166,0.16)",
  },
  {
    emoji: "🤝",
    title: "Integrity",
    description:
      "Decisions and commitments hold up under scrutiny — with partners, with clients, and with each other.",
    accent: "#2DD4C3",
    accentSoft: "rgba(45,212,195,0.16)",
  },
  {
    emoji: "🌱",
    title: "Sustainability",
    description:
      "We build for the long term — ventures designed to hold up over time, not just perform in the short run.",
    accent: "#22C55E",
    accentSoft: "rgba(34,197,94,0.16)",
  },
  {
    emoji: "🌍",
    title: "Global Impact",
    description:
      "Operating from the UAE with a genuinely international outlook, built to create value across borders.",
    accent: "#22D3EE",
    accentSoft: "rgba(34,211,238,0.16)",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

export default function CareersValues() {
  return (
    <section
      id="careers-values"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mb-10 max-w-[680px] text-center sm:mb-12 lg:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
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
              Our Values
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FFD5] sm:w-10" />
          </div>

          <h2
            className="
              text-[2rem]
              font-extrabold
              leading-[1.05]
              tracking-[-0.05em]
              text-white
              sm:text-[2.6rem]
              lg:text-[3rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.6rem]!
            "
          >
            The principles that{" "}
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
              guide how we operate.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-5
          "
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.015,
                transition: { duration: 0.35, ease: EASE },
              }}
              whileFocus={{
                y: -6,
                scale: 1.015,
                transition: { duration: 0.35, ease: EASE },
              }}
              tabIndex={0}
              style={
                {
                  "--accent": value.accent,
                  "--accent-soft": value.accentSoft,
                } as CSSProperties
              }
              className="
                group
                relative
                isolate
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-6

                text-center

                transition-[border-color,background-color,box-shadow]
                duration-500
                ease-out

                hover:border-[var(--accent)]/50
                hover:bg-white/[0.045]
                hover:shadow-[0_20px_48px_rgba(0,0,0,0.28),0_0_36px_var(--accent-soft)]

                focus:border-[var(--accent)]/50
                focus:bg-white/[0.045]
                focus:shadow-[0_20px_48px_rgba(0,0,0,0.28),0_0_36px_var(--accent-soft)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--accent)]/60
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0B1220]

                sm:p-7
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[3px]
                  opacity-70

                  transition-opacity
                  duration-500

                  group-hover:opacity-100
                "
                style={{
                  background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
                }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  {/* Ripple / glow behind the emoji */}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-full
                      opacity-60

                      transition-all
                      duration-500

                      group-hover:scale-125
                      group-hover:opacity-100
                    "
                    style={{
                      background: `radial-gradient(circle, var(--accent-soft), transparent 70%)`,
                    }}
                  />

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-[6px]
                      rounded-full
                      border
                      opacity-0

                      group-hover:[animation:fact-icon-ripple_500ms_ease-out]
                    "
                    style={{ borderColor: "var(--accent)" }}
                  />

                  <span
                    role="img"
                    aria-label={value.title}
                    className="
                      relative
                      z-10
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      bg-[#0B1220]/60
                      text-[26px]
                      leading-none

                      transition-transform
                      duration-500
                      ease-out

                      group-hover:-translate-y-1
                      group-hover:scale-110
                    "
                    style={{ borderColor: "var(--accent-soft)" }}
                  >
                    {value.emoji}
                  </span>
                </span>

                <h3
                  className="
                    pt-5
                    text-[16px]
                    font-bold
                    leading-tight
                    tracking-[-0.02em]
                    text-white
                    sm:text-[17px]
                  "
                >
                  {value.title}
                </h3>

                <p
                  className="
                    pt-2.5
                    text-[13px]
                    font-medium
                    leading-6
                    text-white/60

                    transition-colors
                    duration-500

                    group-hover:text-white/78
                  "
                >
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
