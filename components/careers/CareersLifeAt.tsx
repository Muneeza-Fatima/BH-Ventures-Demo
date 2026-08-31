"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/images/careers/career-team.jpg",
    alt: "BH Ventures team collaborating together",
    caption: "Team Collaboration",
  },
  {
    src: "/images/careers/career-workspace.jpg",
    alt: "BH Ventures modern workspace",
    caption: "Modern Workspace",
  },
  {
    src: "/images/careers/career-global.jpg",
    alt: "BH Ventures global operations",
    caption: "Global Operations",
  },
];

function GalleryTile({ image, index }: { image: GalleryImage; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.1 }}
      className="group relative w-full"
    >
      <div
        className="
          relative
          aspect-[4/3]
          w-full
          overflow-hidden
          rounded-[20px]
          border
          border-white/[0.10]

          transition-[border-color,box-shadow]
          duration-300
          ease-out

          hover:border-[#2DD4BF]/40
          hover:shadow-[0_0_32px_rgba(45,212,191,0.16)]
        "
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="
            object-cover

            transition-transform
            duration-300
            ease-out

            group-hover:scale-[1.03]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-16
            bg-gradient-to-t
            from-black/55
            to-transparent
          "
        />

        <span
          className="
            absolute
            bottom-3
            left-4
            text-[12px]
            font-semibold
            tracking-[0.02em]
            text-white/85
          "
        >
          {image.caption}
        </span>
      </div>
    </motion.div>
  );
}

export default function CareersLifeAt() {
  return (
    <section
      id="careers-life-at"
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
          left-[-160px]
          top-[15%]
          h-[380px]
          w-[380px]
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
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mb-10 max-w-[680px] text-center sm:mb-12 lg:mb-16"
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
              Life At BH Ventures
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00FFD5] sm:w-10" />
          </div>

          <h2
            className="
              text-[2rem]
              font-extrabold
              leading-[1.05]
              tracking-[-0.05em]
              text-white
              sm:text-[2.6rem]
              lg:text-[3rem]

              [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.6rem]!
            "
          >
            Life at{" "}
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
              BH Ventures
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
            A founder-led team working across disciplines — building,
            collaborating, and growing from Dubai to global markets.
          </p>
        </motion.div>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {galleryImages.map((image, index) => (
            <GalleryTile key={image.caption} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
