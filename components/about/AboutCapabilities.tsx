"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Cpu, Megaphone, Sparkles, ChevronRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const capabilities = [
  {
    icon: ArrowLeftRight,
    title: "International Trade",
    accent: "#14B8A6",
    accentSoft: "rgba(20,184,166,0.16)",
    bullets: [
      "Cross-border trade & market access",
      "Strategically selected international markets",
      "Import, export & distribution",
      "UAE free-zone trade platform",
    ],
  },
  {
    icon: Cpu,
    title: "Technology & Data",
    accent: "#2DD4C3",
    accentSoft: "rgba(45,212,195,0.16)",
    bullets: [
      "Web3, AI & modern digital infrastructure",
      "Applied to real business problems",
      "Structured data & insight",
      "Smarter, faster decision-making",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Business Development",
    accent: "#11998E",
    accentSoft: "rgba(17,153,142,0.18)",
    bullets: [
      "Positioning & growth strategy",
      "Partnerships & pipeline development",
      "Curated events & gatherings",
      "Visibility and reach for ventures",
    ],
  },
  {
    icon: Sparkles,
    title: "Innovation & Strategic Ventures",
    accent: "#22D3EE",
    accentSoft: "rgba(34,211,238,0.16)",
    bullets: [
      "Testing new operating models",
      "Combining disciplines others keep separate",
      "One multi-sector venture platform",
      "Founder-led execution",
    ],
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
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

export default function AboutCapabilities() {
  return (
    <section
      id="about-capabilities"
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mb-10 max-w-[720px] text-center sm:mb-12 lg:mb-16"
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
              What We Operate
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FFD5] sm:w-10" />
          </div>

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
            Four capabilities.{" "}
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
              One platform.
            </span>
          </h2>

          <p
            className="
              mx-auto
              pt-5
              max-w-[560px]
              text-[14px]
              font-medium
              leading-7
              text-white/60
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            Each capability stands on its own, but the real value comes from
            how they work together inside a single venture platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:gap-6
          "
        >
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  scale: 1.012,
                  transition: { duration: 0.35, ease: EASE },
                }}
                whileFocus={{
                  y: -6,
                  scale: 1.012,
                  transition: { duration: 0.35, ease: EASE },
                }}
                tabIndex={0}
                style={
                  {
                    "--accent": item.accent,
                    "--accent-soft": item.accentSoft,
                  } as CSSProperties
                }
                className="
                  group
                  relative
                  isolate
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-7

                  transition-[border-color,background-color,box-shadow]
                  duration-500
                  ease-out

                  hover:border-[var(--accent)]/50
                  hover:bg-white/[0.045]
                  hover:shadow-[0_24px_55px_rgba(0,0,0,0.28),0_0_40px_var(--accent-soft)]

                  focus:border-[var(--accent)]/50
                  focus:bg-white/[0.045]
                  focus:shadow-[0_24px_55px_rgba(0,0,0,0.28),0_0_40px_var(--accent-soft)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--accent)]/60
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#0B1220]

                  sm:p-8
                "
              >
                {/* Top accent strip */}
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
                    blur-[70px]
                    opacity-0
                    transition-opacity
                    duration-700
                    ease-out
                    group-hover:opacity-100
                  "
                  style={{ background: "var(--accent-soft)" }}
                />

                <div className="relative z-10">
                  <span
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border

                      transition-all
                      duration-500

                      group-hover:-translate-y-1
                      group-hover:scale-105
                    "
                    style={{
                      borderColor: "var(--accent-soft)",
                      backgroundColor: "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <h3
                    className="
                      pt-5
                      text-[19px]
                      font-bold
                      leading-tight
                      tracking-[-0.02em]
                      text-white
                      sm:text-[21px]
                    "
                  >
                    {item.title}
                  </h3>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="
                          flex
                          items-start
                          gap-2
                          text-[13.5px]
                          font-medium
                          leading-6
                          text-white/60

                          transition-colors
                          duration-500

                          group-hover:text-white/80
                        "
                      >
                        <ChevronRight
                          size={15}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="
                            mt-[3px]
                            shrink-0

                            transition-transform
                            duration-300

                            group-hover:translate-x-0.5
                          "
                          style={{ color: "var(--accent)" }}
                        />

                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
