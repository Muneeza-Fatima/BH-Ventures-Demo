"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* A generic, honest hiring flow — no promised timelines. */
const steps = [
  {
    title: "Send your profile",
    description: "Share your CV or portfolio and tell us where you'd like to contribute.",
  },
  {
    title: "Intro conversation",
    description: "A short, informal call to understand your experience and what you're looking for.",
  },
  {
    title: "Meet the team",
    description: "Talk with the people you'd work with, around a real problem from our ventures.",
  },
  {
    title: "Offer & onboarding",
    description: "If it's a fit on both sides, we agree the details and get you started.",
  },
];

export default function CareersProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 50%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="careers-process"
      className="relative w-full min-w-0 overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 sm:mb-16"
        >
          <p className="mb-4! text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
            How we hire
          </p>
          <h2 className="font-heading max-w-[760px] text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#132B40] sm:text-[3rem] lg:text-[3.5rem]">
            Four simple <span className="text-[#0F766E]">steps.</span>
          </h2>
        </motion.div>

        <div ref={trackRef} className="relative">
          {/* Track: vertical on phones, horizontal from md up */}
          <div aria-hidden="true" className="absolute left-[19px] top-0 h-full w-[2px] bg-[#132B40]/10 md:left-0 md:top-[19px] md:h-[2px] md:w-full">
            <motion.div style={{ height: fill }} className="w-full bg-[#14B8A6] md:hidden" />
            <motion.div style={{ width: fill }} className="hidden h-full bg-[#14B8A6] md:block" />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="flex gap-5 md:flex-col md:gap-6"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#14B8A6] bg-white text-[14px] font-bold text-[#0F766E]">
                  {i + 1}
                </span>

                <div>
                  <h3 className="text-[19px] font-bold leading-[1.25] tracking-[-0.015em] text-[#132B40] sm:text-[21px]">
                    {step.title}
                  </h3>
                  <p className="mt-2! text-[15px] font-normal leading-[1.7] text-[#3B5266]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
