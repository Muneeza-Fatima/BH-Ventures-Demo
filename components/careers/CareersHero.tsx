"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingLines = [["Build", "What's"], ["Next"]];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Overlapping photo collage. Each photo has a resting tilt and
   spreads a little further apart while the collage is hovered. */
const photos = [
  {
    src: "/images/careers/careers-workspace.png",
    alt: "Bright modern office desk with a laptop overlooking the Dubai skyline",
    className: "left-0 top-[8%] w-[62%] -rotate-[5deg] group-hover:-translate-x-3 group-hover:-rotate-[7deg]",
  },
  {
    src: "/images/careers/careers-global.png",
    alt: "Hand pointing at Dubai on a world map with connections to global markets",
    className: "right-0 top-0 w-[46%] rotate-[6deg] group-hover:translate-x-3 group-hover:rotate-[8deg]",
  },
  {
    src: "/images/careers/career-team.jpg",
    alt: "Colleagues collaborating at a whiteboard",
    className: "bottom-0 left-[22%] z-10 w-[58%] rotate-[2deg] group-hover:translate-y-3 group-hover:rotate-[0deg]",
  },
];

export default function CareersHero() {
  return (
    <section
      id="careers-hero"
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
        bg-[#F7F9F8]
        pt-[118px]
        pb-16
        sm:pt-[130px]
        lg:pt-[150px]
        lg:pb-24
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1440px]
          px-6
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16
          2xl:px-20
          grid-cols-1
          items-center
          gap-14
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16
          2xl:max-w-[1600px]
        "
      >
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#14B8A6]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
              Careers
            </span>
          </motion.div>

          <h1
            aria-label="Build What's Next With Us."
            className="
              font-heading
              text-[3rem]
              font-extrabold
              leading-[0.98]
              tracking-[-0.045em]
              text-[#132B40]
              sm:text-[4.25rem]
              lg:text-[5rem]
              xl:text-[6rem]
            "
          >
            {headingLines.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                {line.map((w) => (
                  <motion.span key={w} variants={word} className="mr-[0.22em] inline-block">
                    {w}
                  </motion.span>
                ))}
                {li === 1 && (
                  <motion.span variants={word} className="inline-block">
                    <span className="text-[#0F766E]">With Us.</span>
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7! max-w-[560px] text-[16px] font-normal leading-[1.75] text-[#3B5266] sm:text-[18px]"
          >
            We&apos;re a founder-led venture platform spanning trade,
            technology, data, marketing, and innovation. We look for people
            who want <span className="font-semibold text-[#132B40]">direct ownership</span>{" "}
            over real outcomes, not a seat inside a large process.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="
                group
                inline-flex
                min-h-[52px]
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[#132B40]
                px-7
                text-[14px]
                font-semibold
                text-white
                transition-colors
                duration-300
                hover:bg-[#0F766E]
              "
            >
              Send your profile
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#process"
              className="
                group
                inline-flex
                min-h-[52px]
                items-center
                justify-center
                gap-2.5
                rounded-full
                border-[1.5px]
                border-[#132B40]/20
                px-7
                text-[14px]
                font-semibold
                text-[#132B40]
                transition-colors
                duration-300
                hover:border-[#14B8A6]
                hover:text-[#0F766E]
              "
            >
              See how we hire
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10! text-[12px] font-semibold uppercase tracking-[0.24em] text-[#132B40]/45"
          >
            UAE &bull; Dubai
          </motion.p>
        </motion.div>

        {/* Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="group relative mx-auto aspect-[5/4] w-full max-w-[520px] lg:max-w-none"
        >
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`
                absolute
                aspect-[4/3]
                overflow-hidden
                rounded-[22px]
                border-[6px]
                border-white
                shadow-[0_24px_50px_rgba(19,43,64,0.18)]
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${photo.className}
              `}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
