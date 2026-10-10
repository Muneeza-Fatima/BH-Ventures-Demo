"use client";

import { motion, type Variants } from "framer-motion";

const values = [
  { title: "Integrity", tagline: "Doing what's right, every time." },
  { title: "Innovation", tagline: "Seeking better ways to build and operate." },
  { title: "Ownership", tagline: "Taking direct accountability for outcomes." },
  { title: "Client Focus", tagline: "Decisions made around real client needs." },
  { title: "Accuracy", tagline: "Precision in detail, not just direction." },
  { title: "Compliance", tagline: "Operating within clear regulatory standards." },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const gridReveal: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/* Leaf-shaped cards: two opposite corners deeply rounded, the other
   two almost square. Alternate cards mirror the shape, and on hover
   the shape flips — a small, distinctive motion. */
const leafA =
  "rounded-tl-[48px] rounded-br-[48px] rounded-tr-[8px] rounded-bl-[8px] hover:rounded-tl-[8px] hover:rounded-br-[8px] hover:rounded-tr-[48px] hover:rounded-bl-[48px]";
const leafB =
  "rounded-tr-[48px] rounded-bl-[48px] rounded-tl-[8px] rounded-br-[8px] hover:rounded-tr-[8px] hover:rounded-bl-[8px] hover:rounded-tl-[48px] hover:rounded-br-[48px]";

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
        bg-white
        py-16
        sm:py-20
        lg:py-24
      "
    >

      <div
        className="
          mx-auto
          w-full
          min-w-0
          max-w-[1440px]
          px-6
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* Header */}
        <motion.div
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-12 flex flex-col gap-5 sm:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#14B8A6]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0F766E] sm:text-[12px]">
                Our Values
              </span>
            </div>

            <h2
              className="
                font-heading
                text-[2.1rem]
                font-bold
                leading-[1.12]
                tracking-[-0.028em]
                text-[#132B40]
                sm:text-[2.5rem]
                lg:text-[2.875rem]
              "
            >
              What we hold <span className="text-[#0F766E]">ourselves to.</span>
            </h2>
          </div>

          <p className="max-w-[380px] text-[15px] font-normal leading-[1.75] text-[#52697A] sm:text-[16px] lg:pb-1.5 lg:text-right">
            Six principles that shape how every venture is built and run.
          </p>
        </motion.div>

        {/* 2 × 3 glass cards */}
        <motion.ul
          variants={gridReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative grid grid-cols-1 gap-5 before:absolute before:bottom-8 before:left-[10px] before:top-8 before:w-[2px] before:bg-[#14B8A6]/30 sm:gap-5 sm:grid-cols-2 sm:before:hidden lg:grid-cols-3"
        >
          {values.map((value, index) => (
            <motion.li
              key={value.title}
              variants={cardReveal}
              className="relative pl-9 sm:pl-0"
            >
              {/* Phone: timeline bullet on the left, lights up as it scrolls into view */}
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ amount: 0.8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="
                  absolute
                  left-[3px]
                  top-8
                  h-4
                  w-4
                  rounded-full
                  border-[3px]
                  border-white
                  bg-[#14B8A6]
                  shadow-[0_0_0_2px_#14B8A6]
                  sm:hidden
                "
              />

              <div
                tabIndex={0}
                className={`
                  group
                  relative
                  h-full
                  overflow-hidden
                  ${index % 2 === 0 ? leafA : leafB}
                  border-[1.5px]
                  border-[#14B8A6]/60
                  bg-white
                  p-6
                  shadow-[0_18px_40px_rgba(19,43,64,0.10)]
                  outline-none

                  transition-[transform,border-color,box-shadow,border-radius]
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-1.5
                  hover:border-[#14B8A6]
                  hover:shadow-[0_24px_50px_rgba(19,43,64,0.14)]
                  focus-visible:border-[#14B8A6]

                  sm:p-7
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      font-heading
                      block
                      text-[1.6rem]
                      sm:text-[2.5rem]
                      font-bold
                      leading-none
                      tracking-[-0.04em]
                      text-[#0F766E]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5! text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-[#132B40] sm:text-[22px]">
                  {value.title}
                </h3>

                <p className="mt-2! text-[14.5px] font-normal leading-[1.65] text-[#3B5266] sm:text-[15px]">
                  {value.tagline}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
