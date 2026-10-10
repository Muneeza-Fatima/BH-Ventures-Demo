"use client";

import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tags = ["Founder-Led", "Direct Accountability", "Long-Term Vision"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

export default function AboutFounder() {
  return (
    <section
      id="about-founder"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]
        py-16
        sm:py-20
        lg:py-28
      "
    >

      <div className="mx-auto w-full min-w-0 max-w-[1440px] px-6 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
        <div className="mb-10 flex items-center justify-center gap-3 sm:mb-12">
          <span className="h-px w-8 bg-[#2DD4BF]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4] sm:text-[12px]">
            A word from our Founder
          </span>
          <span className="h-px w-8 bg-[#2DD4BF]" />
        </div>

        <motion.figure
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="
            about-shine
            relative
            m-0
            mx-auto
            max-w-[920px]
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.16]
            bg-white/[0.06]
            px-6
            py-10
            text-center
            shadow-[0_30px_80px_rgba(0,0,0,0.35)]
            backdrop-blur-xl

            sm:px-12
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          {/* Teal hairline across the top edge */}
          <span
            aria-hidden="true"
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#5EEAD4] to-transparent"
          />


          <blockquote className="m-0">
            <p className="font-heading text-[1.1rem] font-normal leading-[1.65] tracking-[-0.01em] text-white/90 sm:text-[1.75rem] sm:font-semibold sm:leading-[1.45] sm:text-white lg:text-[2rem]">
              <span className="text-[#5EEAD4]">&ldquo;</span>BH Ventures is a founder-led company. Every venture we take on
              carries direct accountability back to a single point of
              leadership, rather than being spread across layers of process.<span className="text-[#5EEAD4]">&rdquo;</span>
            </p>

            <p className="mx-auto mt-7! max-w-[640px] text-[14px] font-normal leading-[1.75] text-white/65 sm:text-[16px] sm:leading-[1.8]">
              That leadership is built around professional standards and a
              long-term view — bringing traditional trade and modern
              technology together under one disciplined, execution-focused
              platform.
            </p>
          </blockquote>

          {/* Signature block */}
          <figcaption className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-9 sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <span
              aria-hidden="true"
              className="
                flex
                h-12
                sm:h-16
                w-12
                sm:w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                border-2
                border-[#2DD4BF]
                bg-[#0F1B2D]
                font-heading
                text-[16px]
                sm:text-[20px]
                font-bold
                tracking-[-0.02em]
                text-[#5EEAD4]
              "
            >
              BH
            </span>

            <span>
              <span className="block font-heading text-[19px] font-bold tracking-[-0.02em] text-white sm:text-[24px]">
                Badar Ul Haq
              </span>
              <span className="mt-1 block text-[10.5px] font-semibold uppercase tracking-[0.16em] sm:text-[12px] sm:tracking-[0.18em] text-[#5EEAD4]">
                Founder &amp; Chief Executive Officer
              </span>
            </span>
          </figcaption>

          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/20 px-3 py-1 text-[12px] font-medium text-white/80 sm:px-4 sm:py-1.5 sm:text-[13px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </motion.figure>
      </div>
    </section>
  );
}
