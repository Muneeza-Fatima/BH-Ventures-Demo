"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  Globe2,
  Landmark,
  ListChecks,
  LayoutGrid,
  UserRound,
  Handshake,
  Cpu,
  type LucideIcon,
} from "lucide-react";

type Fact = {
  icon: LucideIcon;
  iconSecondary?: LucideIcon;
  title: string;
  detail: string;
  countValue?: number;
  countSuffix?: string;
  highlight?: boolean;
};

const facts: Fact[] = [
  {
    icon: Globe2,
    title: "UAE Based",
    detail: "Operating from the United Arab Emirates.",
  },
  {
    icon: Landmark,
    title: "Dubai",
    detail: "Registered as a UAE free-zone entity.",
  },
  {
    icon: ListChecks,
    title: "Licensed Activities",
    countValue: 10,
    countSuffix: " Licensed Activities",
    detail: "Across trade, technology and business services.",
    highlight: true,
  },
  {
    icon: LayoutGrid,
    title: "Multi-Sector Platform",
    detail: "Connecting multiple disciplines under one venture platform.",
  },
  {
    icon: UserRound,
    title: "Founder-Led",
    detail: "Direct leadership and accountability.",
  },
  {
    icon: Handshake,
    iconSecondary: Cpu,
    title: "Trade + Technology",
    detail: "Bridging traditional commerce with modern technology.",
  },
];

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;

    started.current = true;

    let animationFrame = 0;
    let startTime: number | null = null;
    const duration = 900;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
}

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
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const POP_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function AboutFacts() {
  const prefersReducedMotion = useReducedMotion();

  const hoverPop = prefersReducedMotion
    ? {}
    : {
        y: -6,
        scale: 1.012,
        transition: { duration: 0.35, ease: POP_EASE },
      };

  return (
    <section
      id="about-facts"
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
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[6%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#00BFA6]/[0.06]
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-[680px] text-center sm:mb-12 lg:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00A98F] sm:w-10" />

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
              Company at a Glance
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00A98F] sm:w-10" />
          </div>

          <h2
            className="
              text-[2rem]
              font-extrabold
              leading-[1.05]
              tracking-[-0.05em]
              text-[#102A43]
              sm:text-[2.6rem]
              lg:text-[3rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.6rem]!
            "
          >
            The facts,{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#102A43]
                via-[#155E75]
                to-[#00A98F]
                bg-clip-text
                text-transparent
              "
            >
              plainly stated.
            </span>
          </h2>
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
            lg:grid-cols-3
            lg:gap-5
          "
        >
          {facts.map((fact) => {
            const Icon = fact.icon;
            const SecondaryIcon = fact.iconSecondary;

            return (
              <motion.div
                key={fact.title}
                variants={cardVariants}
                whileHover={hoverPop}
                whileFocus={hoverPop}
                tabIndex={0}
                className={`
                  group
                  relative
                  isolate
                  overflow-hidden
                  rounded-[22px]
                  border
                  bg-white
                  p-7

                  transition-[border-color,box-shadow]
                  duration-[350ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:border-[#00BFA6]/60
                  hover:shadow-[0_22px_48px_rgba(16,42,67,0.10),0_0_36px_rgba(0,191,166,0.16)]

                  focus:border-[#00BFA6]/60
                  focus:shadow-[0_22px_48px_rgba(16,42,67,0.10),0_0_36px_rgba(0,191,166,0.16)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#00BFA6]/40
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#F4F7F5]

                  sm:p-8

                  ${
                    fact.highlight
                      ? "border-[#00BFA6]/55 shadow-[0_16px_40px_rgba(16,42,67,0.08),0_0_30px_rgba(0,191,166,0.18)]"
                      : "border-[#E2E8E7] shadow-[0_10px_30px_rgba(16,42,67,0.06)]"
                  }
                `}
              >
                {fact.highlight && (
                  <span
                    className="
                      absolute
                      right-5
                      top-5
                      rounded-full
                      border
                      border-[#00BFA6]/30
                      bg-[#EAF7F4]
                      px-2.5
                      py-1
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.14em]
                      text-[#0E8C77]
                    "
                  >
                    Core Stat
                  </span>
                )}

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
                    border-[#00BFA6]/25
                    bg-gradient-to-br
                    from-[#00BFA6]/15
                    via-[#00BFA6]/5
                    to-transparent
                    text-[#0E8C77]

                    transition-[transform,border-color,box-shadow]
                    duration-[280ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:-translate-y-0.5
                    group-hover:border-[#00BFA6]/60
                    group-hover:shadow-[0_0_16px_rgba(0,191,166,0.35)]

                    group-focus:-translate-y-0.5
                    group-focus:border-[#00BFA6]/60
                    group-focus:shadow-[0_0_16px_rgba(0,191,166,0.35)]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-[16px]
                      bg-[#00BFA6]/40
                      opacity-0

                      group-hover:[animation:fact-icon-ripple_450ms_ease-out]
                      group-focus:[animation:fact-icon-ripple_450ms_ease-out]
                    "
                  />

                  <Icon
                    size={22}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="
                      relative
                      z-10

                      transition-transform
                      duration-[280ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:scale-105
                      group-focus:scale-105
                    "
                  />

                  {SecondaryIcon && (
                    <span
                      className="
                        absolute
                        -bottom-1.5
                        -right-1.5
                        z-20
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white
                        bg-[#0E8C77]
                        text-white
                        shadow-[0_2px_6px_rgba(16,42,67,0.25)]
                      "
                    >
                      <SecondaryIcon
                        size={11}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </div>

                <h3
                  className={`
                    ${fact.iconSecondary ? "mt-6" : "mt-5"}
                    text-[19px]
                    font-extrabold
                    leading-tight
                    tracking-[-0.02em]
                    text-[#102A43]
                    sm:text-[21px]
                  `}
                >
                  {fact.countValue ? (
                    <>
                      <span className="text-[1.2em] text-[#00A98F]">
                        <CountUp value={fact.countValue} />
                      </span>
                      {fact.countSuffix}
                    </>
                  ) : (
                    fact.title
                  )}
                </h3>

                <p
                  className="
                    mt-2.5
                    min-h-[40px]
                    text-[13px]
                    font-medium
                    leading-5
                    text-[#526477]
                  "
                >
                  {fact.detail}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
