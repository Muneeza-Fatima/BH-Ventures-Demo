"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  CheckCircle2,
  Lock,
  FileCheck2,
  BookOpen,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    tagline: "Doing what's right, every time.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    tagline: "Seeking better ways to build and operate.",
  },
  {
    icon: Target,
    title: "Ownership",
    tagline: "Taking direct accountability for outcomes.",
  },
  {
    icon: Users,
    title: "Client Focus",
    tagline: "Decisions made around real client needs.",
  },
  {
    icon: CheckCircle2,
    title: "Accuracy",
    tagline: "Precision in detail, not just direction.",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    tagline: "Protecting information as a standard, not a favor.",
  },
  {
    icon: FileCheck2,
    title: "Compliance",
    tagline: "Operating within clear regulatory standards.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    tagline: "Improving capability as markets evolve.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function AboutValues() {
  return (
    <section
      id="about-values"
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
          left-[-160px]
          top-[10%]
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#8B7CFF]/[0.05]
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
              Our Values
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
            What we{" "}
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
              hold ourselves to.
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
            grid-cols-2
            gap-3.5
            sm:grid-cols-3
            sm:gap-4
            lg:grid-cols-4
          "
        >
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#E2E8E7]
                  bg-white
                  p-5

                  shadow-[0_8px_24px_rgba(16,42,67,0.05)]

                  transition-all
                  duration-500

                  hover:border-[#00BFA6]/40
                  hover:shadow-[0_18px_40px_rgba(16,42,67,0.10)]

                  sm:p-6
                "
              >
                <span
                  className="
                    absolute
                    right-4
                    top-4
                    text-[10px]
                    font-bold
                    tracking-[0.14em]
                    text-[#102A43]/15
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-[12px]
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
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </div>

                <h3
                  className="
                    pt-4
                    text-[14px]
                    font-bold
                    leading-tight
                    tracking-[-0.01em]
                    text-[#102A43]
                    sm:text-[15px]
                  "
                >
                  {value.title}
                </h3>

                <p
                  className="
                    pt-2
                    text-[11.5px]
                    font-medium
                    leading-5
                    text-[#526477]

                    opacity-0
                    max-h-0

                    transition-all
                    duration-300
                    ease-out

                    group-hover:pt-2
                    group-hover:max-h-16
                    group-hover:opacity-100
                  "
                >
                  {value.tagline}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
