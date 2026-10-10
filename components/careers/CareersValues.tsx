"use client";

import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* The same four principles as before, phrased as reasons to join. */
const reasons = [
  {
    title: "Room to experiment",
    description:
      "We test new operating models and combine disciplines others keep separate, rather than defending one fixed way of working.",
  },
  {
    title: "Work you can stand behind",
    description:
      "Decisions and commitments hold up under scrutiny — with partners, with clients, and with each other.",
  },
  {
    title: "Build for the long term",
    description:
      "Ventures designed to hold up over time, not just perform in the short run.",
  },
  {
    title: "Global from day one",
    description:
      "Operating from the UAE with a genuinely international outlook, built to create value across borders.",
  },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function CareersValues() {
  return (
    <section
      id="careers-values"
      className="relative w-full min-w-0 overflow-hidden bg-[#F7F9F8] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 sm:mb-14"
        >
          <p className="mb-4! text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
            Why join us
          </p>
          <h2 className="font-heading max-w-[760px] text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#132B40] sm:text-[3rem] lg:text-[3.5rem]">
            Why people <span className="text-[#0F766E]">choose</span> to build with us.
          </h2>
        </motion.div>

        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-x-12 border-t border-[#132B40]/15 md:grid-cols-2"
        >
          {reasons.map((reason, i) => (
            <motion.li
              key={reason.title}
              variants={item}
              className="group flex gap-6 border-b border-[#132B40]/15 py-8 sm:gap-8 sm:py-10"
            >
              <span
                className="
                  font-heading
                  shrink-0
                  text-[3rem]
                  font-extrabold
                  leading-none
                  tracking-[-0.05em]
                  text-transparent
                  transition-colors
                  duration-500
                  [-webkit-text-stroke:1.5px_#0F766E]
                  group-hover:text-[#0F766E]
                  sm:text-[4rem]
                "
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="pt-1 sm:pt-2">
                <h3 className="text-[20px] font-bold leading-[1.25] tracking-[-0.015em] text-[#132B40] sm:text-[24px]">
                  {reason.title}
                </h3>
                <p className="mt-3! max-w-[460px] text-[15px] font-normal leading-[1.75] text-[#3B5266] sm:text-[16px]">
                  {reason.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
