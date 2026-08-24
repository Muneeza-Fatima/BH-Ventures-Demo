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

const combine = [
  {
    icon: ArrowLeftRight,
    title: "Trade",
    description:
      "International trading and market access across strategically selected markets.",
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "Web3, AI, and modern digital infrastructure applied to real business problems.",
  },
  {
    icon: BarChart3,
    title: "Data",
    description:
      "Turning information into structured insight that supports better decisions.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description:
      "Positioning and growth strategy that gives ventures visibility and reach.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "A willingness to test new models and combine disciplines others keep separate.",
  },
  {
    icon: Handshake,
    title: "Business Development",
    description:
      "Building the partnerships and pipelines that turn ideas into operating ventures.",
  },
  {
    icon: CalendarDays,
    title: "Events",
    description:
      "Bringing people, partners, and ideas together through curated gatherings.",
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
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
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
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
              What We Combine
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
            Seven disciplines.{" "}
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
          {combine.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === combine.length - 1;

            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-7

                  transition-all
                  duration-500
                  ease-out

                  hover:border-[#00FFD5]/30
                  hover:bg-white/[0.045]
                  hover:shadow-[0_24px_55px_rgba(0,255,213,0.08)]

                  sm:p-8
                  ${isLast ? "sm:col-span-2" : ""}
                `}
              >
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
                    group-hover:bg-[#00FFD5]/[0.10]
                  "
                />

                <div
                  className={`
                    relative
                    z-10
                    flex
                    flex-col
                    gap-6
                    ${
                      isLast
                        ? "sm:flex-row sm:items-center sm:justify-between sm:gap-10"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
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
                        border-[#2DD4BF]/30
                        bg-[#064E49]/60
                        text-[#5EEAD4]

                        transition-all
                        duration-500

                        group-hover:-translate-y-1
                        group-hover:border-[#5EEAD4]/50
                      "
                    >
                      <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-white/25
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={isLast ? "sm:max-w-[520px]" : ""}>
                    <h3
                      className="
                        text-[19px]
                        font-bold
                        leading-tight
                        tracking-[-0.02em]
                        text-white
                        transition-colors
                        duration-500
                        group-hover:text-[#C5FFF6]
                        sm:text-[21px]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        pt-2.5
                        text-[13.5px]
                        font-medium
                        leading-6
                        text-white/55
                        transition-colors
                        duration-500
                        group-hover:text-white/72
                        sm:text-[14px]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-7
                    right-7
                    h-px
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-[#00FFD5]
                    via-[#5EEAD4]
                    to-transparent
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-x-100
                    sm:left-8
                    sm:right-8
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
