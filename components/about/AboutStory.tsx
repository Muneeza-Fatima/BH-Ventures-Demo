"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Cpu,
  BarChart3,
  Megaphone,
  Sparkles,
  Handshake,
  CalendarDays,
} from "lucide-react";

const threads = [
  { label: "Trade", icon: ArrowLeftRight },
  { label: "Technology", icon: Cpu },
  { label: "Data", icon: BarChart3 },
  { label: "Marketing", icon: Megaphone },
  { label: "Innovation", icon: Sparkles },
  { label: "Business Dev.", icon: Handshake },
  { label: "Events", icon: CalendarDays },
];

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const textItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const panelReveal = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    clipPath: "inset(4% 4% 4% 4% round 28px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function AboutStory() {
  return (
    <section
      id="about-story"
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
          left-[-160px]
          top-1/3
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#00CDB5]/[0.045]
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          min-w-0
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-12

          px-5
          sm:px-7
          md:px-10
          lg:px-12
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20

          [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
        "
      >
        {/* =====================================================
            NARRATIVE
        ===================================================== */}

        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            variants={textItem}
            className="mb-5 flex items-center gap-3"
          >
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FFD5] sm:w-10"
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
              Who We Are
            </span>
          </motion.div>

          <motion.h2
            variants={textItem}
            className="
              max-w-[560px]
              text-[2rem]
              font-extrabold
              leading-[1.06]
              tracking-[-0.045em]
              text-white
              sm:text-[2.5rem]
              lg:text-[2.9rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.5rem]!
            "
          >
            A founder-led platform for{" "}
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
              modern ventures.
            </span>
          </motion.h2>

          <motion.p
            variants={textItem}
            className="
              pt-6
              max-w-[520px]
              text-[14px]
              font-medium
              leading-7
              text-white/65
              sm:pt-7
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            BH Ventures FZE LLC was built around a simple idea: the
            opportunities of tomorrow sit at the intersection of traditional
            trade and modern technology. Rather than operating as a single
            business, we work as a venture-oriented platform that connects
            disciplines that are usually kept apart.
          </motion.p>

          <motion.p
            variants={textItem}
            className="
              pt-4
              max-w-[520px]
              text-[14px]
              font-medium
              leading-7
              text-white/65
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            International trade gives us global reach. Technology and data
            give us the tools to move faster and decide smarter. Marketing,
            innovation, business development, and events give ideas the
            structure to become real, functioning ventures.
          </motion.p>

          {/* Thread Chips */}

          <motion.div
            variants={textItem}
            className="mt-8 flex flex-wrap gap-2.5 sm:mt-10"
          >
            {threads.map((thread) => {
              const Icon = thread.icon;

              return (
                <span
                  key={thread.label}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.10]
                    bg-white/[0.03]
                    px-3.5
                    py-2
                    text-[11px]
                    font-bold
                    text-white/75

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:border-[#2DD4BF]/40
                    hover:bg-[#14B8A6]/[0.10]
                    hover:text-white
                  "
                >
                  <Icon
                    size={13}
                    strokeWidth={1.8}
                    className="text-[#5EEAD4]"
                    aria-hidden="true"
                  />

                  {thread.label}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* =====================================================
            VISUAL PANEL
        ===================================================== */}

        <motion.div
          variants={panelReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="
            relative
            aspect-[4/5]
            w-full
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.10]
            bg-gradient-to-br
            from-[#132436]
            via-[#0F1D2C]
            to-[#0B1220]
            shadow-[0_25px_70px_rgba(0,0,0,0.35)]

            sm:aspect-[5/4]
            lg:aspect-[4/5]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_75%_15%,rgba(0,255,213,0.10),transparent_45%),radial-gradient(circle_at_15%_85%,rgba(90,100,255,0.09),transparent_45%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.06]
              [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
              [background-size:34px_34px]
            "
          />

          {/* Floating Sector Cards */}

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 p-8">
            {threads.slice(0, 4).map((thread, index) => {
              const Icon = thread.icon;
              const offsets = [
                "self-start",
                "self-end",
                "self-start",
                "self-end",
              ];

              return (
                <motion.div
                  key={thread.label}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/[0.10]
                    bg-white/[0.05]
                    px-4
                    py-3
                    backdrop-blur-md
                    ${offsets[index]}
                  `}
                >
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#2DD4BF]/30
                      bg-[#0E4A44]/50
                      text-[#5EEAD4]
                    "
                  >
                    <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <span className="text-[12px] font-bold text-white/85">
                    {thread.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-24
              bg-gradient-to-t
              from-[#0B1220]
              to-transparent
            "
          />
        </motion.div>
      </div>
    </section>
  );
}
