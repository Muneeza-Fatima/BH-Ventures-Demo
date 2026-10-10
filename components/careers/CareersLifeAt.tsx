"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Placeholder photos until the team's own photos are supplied —
   captions are kept neutral so they don't claim to show our office. */
const photos = [
  {
    src: "/images/careers/career-team.jpg",
    alt: "Colleagues collaborating at a whiteboard",
    caption: "Collaboration",
  },
  {
    src: "/images/careers/careers-workspace.png",
    alt: "Bright modern office desk with a laptop overlooking the Dubai skyline",
    caption: "Workspace",
  },
  {
    src: "/images/careers/careers-global.png",
    alt: "Hand pointing at Dubai on a world map with connections to global markets",
    caption: "Global outlook",
  },
];

export default function CareersLifeAt() {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      id="careers-life"
      className="relative w-full min-w-0 overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4! text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0F766E]">
              Life at BH Ventures
            </p>
            <h2 className="font-heading max-w-[620px] text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#132B40] sm:text-[3rem] lg:text-[3.5rem]">
              One team, many <span className="text-[#0F766E]">disciplines.</span>
            </h2>
            <p className="mt-5! max-w-[520px] text-[15px] font-normal leading-[1.75] text-[#3B5266] sm:text-[16px]">
              A founder-led team working across disciplines — building,
              collaborating, and growing from Dubai to global markets.
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden gap-3 lg:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir === -1 ? "Previous photo" : "Next photo"}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border-[1.5px]
                  border-[#132B40]/20
                  text-[#132B40]
                  transition-colors
                  duration-300
                  hover:border-[#14B8A6]
                  hover:bg-[#14B8A6]
                  hover:text-white
                "
              >
                {dir === -1 ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll-snap strip inside the same container as the heading, so its
          left edge lines up exactly with the rest of the page */}
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
      <div
        ref={stripRef}
        className="
          careers-strip
          flex
          snap-x
          snap-mandatory
          gap-5
          overflow-x-auto
          pb-2
          -mr-6
          pr-6
          sm:-mr-7
          sm:pr-7
          md:-mr-10
          md:pr-10
          lg:mr-0
          lg:pr-0
        "
      >
        {photos.map((photo, i) => (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            className="
              group
              relative
              m-0
              aspect-[4/5]
              w-[72%]
              shrink-0
              snap-start
              overflow-hidden
              rounded-[24px]
              sm:aspect-[4/3]
              sm:w-[46%]
              lg:w-[30%]
            "
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 72vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#132B40] shadow-[0_8px_20px_rgba(19,43,64,0.15)] sm:bottom-5 sm:left-5">
              <span className="text-[#0F766E]">{String(i + 1).padStart(2, "0")}</span>
              {photo.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
      </div>
    </section>
  );
}
