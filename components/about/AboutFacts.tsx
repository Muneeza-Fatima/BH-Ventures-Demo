"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, ListChecks, Boxes } from "lucide-react";

const facts = [
  {
    icon: MapPin,
    label: "UAE Based",
    detail: "Operating out of the United Arab Emirates.",
  },
  {
    icon: ShieldCheck,
    label: "Ajman Free Zone",
    detail: "Registered as a free-zone entity.",
  },
  {
    icon: ListChecks,
    label: "Licensed Activities",
    detail: "9 licensed business activities.",
    count: 9,
  },
  {
    icon: Boxes,
    label: "Multi-Sector Platform",
    detail: "One venture platform, several disciplines.",
  },
];

function CountUp({ value, active }: { value: number; active: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;

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
  }, [active, value]);

  return <>{count}</>;
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

export default function AboutFacts() {
  const [visible, setVisible] = useState(false);

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
          onViewportEnter={() => setVisible(true)}
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
            lg:grid-cols-4
            lg:gap-5
          "
        >
          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <motion.div
                key={fact.label}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#E2E8E7]
                  bg-white
                  p-6

                  shadow-[0_10px_30px_rgba(16,42,67,0.06)]

                  transition-all
                  duration-500

                  hover:border-[#00BFA6]/40
                  hover:shadow-[0_20px_45px_rgba(16,42,67,0.10)]

                  sm:p-7
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[13px]
                    border
                    border-[#00BFA6]/25
                    bg-[#EAF7F4]
                    text-[#0E8C77]

                    transition-all
                    duration-500

                    group-hover:-translate-y-1
                    group-hover:border-[#00BFA6]/45
                  "
                >
                  <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                </div>

                <div
                  className="
                    mt-5
                    text-[26px]
                    font-extrabold
                    tracking-[-0.03em]
                    text-[#102A43]
                    sm:text-[28px]
                  "
                >
                  {"count" in fact ? (
                    <CountUp value={fact.count as number} active={visible} />
                  ) : (
                    <span className="text-[19px] leading-tight sm:text-[21px]">
                      {fact.label}
                    </span>
                  )}
                </div>

                {"count" in fact && (
                  <p className="pt-1 text-[15px] font-bold text-[#102A43]">
                    {fact.label}
                  </p>
                )}

                <p className="pt-2.5 text-[13px] font-medium leading-6 text-[#526477]">
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
