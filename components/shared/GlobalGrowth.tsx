"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  BriefcaseBusiness,
  BrainCircuit,
  Handshake,
} from "lucide-react";

const pillars = [
  {
    index: "01",
    icon: Globe,
    title: "Strategic Market Expansion",
    description:
      "Identifying high-potential markets and creating opportunities for sustainable international growth.",
    image: "/images/growth/market-expansion.png",
  },
  {
    index: "02",
    icon: BriefcaseBusiness,
    title: "Diversified Business Ventures",
    description:
      "Building and supporting ventures across trading, technology, digital solutions, and emerging industries.",
    image: "/images/growth/diversified-ventures.png",
  },
  {
    index: "03",
    icon: BrainCircuit,
    title: "Technology-Driven Innovation",
    description:
      "Leveraging AI, Web3, analytics, and modern digital infrastructure to create smarter business solutions.",
    image: "/images/growth/technology-innovation.png",
  },
  {
    index: "04",
    icon: Handshake,
    title: "Trusted Global Partnerships",
    description:
      "Working with strategic partners across markets to connect expertise, resources, and long-term opportunities.",
    image: "/images/growth/global-partnerships.png",
  },
];

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
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

export default function BuiltForGlobalGrowth() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="built-for-global-growth"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden

        bg-[#F4F7F6]

        py-12
        sm:py-14
        md:py-18
        lg:py-22
        xl:py-26
      "
    >
      {/* LIGHTWEIGHT OFF-WHITE BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[300px]
          bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.07),transparent_65%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-[300px]
          w-[300px]
          bg-[radial-gradient(circle,rgba(20,184,166,0.045),transparent_70%)]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1440px]

          px-5
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16

          2xl:max-w-[1600px]
          2xl:px-20
        "
      >
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.55,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="
            mx-auto
            mb-9
            max-w-[720px]
            text-center

            sm:mb-11
            lg:mb-13
          "
        >
          {/* LABEL */}

          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="
                h-px
                w-7
                bg-gradient-to-r
                from-transparent
                to-[#149D8B]

                sm:w-10
              "
            />

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.28em]
                text-[#087C70]

                sm:text-[10px]
              "
            >
              Why BH Ventures
            </span>

            <span
              className="
                h-px
                w-7
                bg-gradient-to-l
                from-transparent
                to-[#149D8B]

                sm:w-10
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              text-[2rem]
              font-extrabold
              leading-[1.04]
              tracking-[-0.045em]
              text-[#102B40]

              sm:text-[2.5rem]
              md:text-[2.75rem]
              lg:text-[3.15rem]
            "
          >
            Built for Global{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#102B40]
                via-[#155E75]
                to-[#009F8C]
                bg-clip-text
                text-transparent
              "
            >
              Growth.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[580px]

              text-[13px]
              font-medium
              leading-6
              text-[#526575]

              sm:text-[14px]
              sm:leading-7

              lg:text-[15px]
            "
          >
            BH Ventures combines strategic market access, technology,
            business innovation, and trusted partnerships to create
            sustainable opportunities across international markets.
          </p>
        </motion.div>


        {/* CARDS — expanding image gallery on desktop, grid below lg */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2
            sm:gap-5

            lg:flex
            lg:h-[480px]
            lg:gap-4

            xl:h-[520px]
          "
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isActive = active === i;

            return (
              <motion.article
                key={pillar.title}
                variants={
                  shouldReduceMotion
                    ? {
                        hidden: { opacity: 0 },
                        show: { opacity: 1 },
                      }
                    : cardVariants
                }
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ flexGrow: isActive ? 3.2 : 1 }}
                className={`
                  group
                  relative
                  isolate
                  min-h-[340px]
                  min-w-0
                  cursor-pointer
                  overflow-hidden
                  rounded-[24px]
                  border-2
                  bg-[#071C2E]
                  shadow-[0_14px_40px_rgba(8,30,48,0.22)]
                  outline-none
                  [text-shadow:0_1px_4px_rgba(0,0,0,0.75)]

                  transition-[flex-grow,border-color,box-shadow]
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  focus-visible:ring-2
                  focus-visible:ring-[#2DD4BF]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#F4F7F6]

                  sm:min-h-[380px]

                  lg:min-h-0
                  lg:basis-0

                  ${
                    isActive
                      ? "border-[#2DD4BF] lg:shadow-[0_22px_55px_rgba(8,30,48,0.35)]"
                      : "border-transparent"
                  }
                `}
              >
                {/* BACKGROUND IMAGE */}

                <Image
                  src={pillar.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw"
                  className="
                    pointer-events-none
                    -z-10
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Bottom-up overlay: image clear on top, text readable at bottom */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10
                    bg-gradient-to-t
                    from-[#071C2E]
                    via-[#071C2E]/55
                    to-transparent
                  "
                />

                {/* Collapsed panels get slightly dimmed on desktop */}
                <div
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10
                    hidden
                    bg-[#071C2E]/45
                    transition-opacity
                    duration-500
                    lg:block
                    ${isActive ? "opacity-0" : "opacity-100"}
                  `}
                />

                {/* CONTENT */}

                <div
                  className="
                    flex
                    h-full
                    flex-col
                    justify-between
                    p-5
                    sm:p-6
                    xl:p-7
                  "
                >
                  {/* TOP: number badge */}

                  <div className="flex justify-end">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className={`
                        drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]
                        transition-colors
                        duration-500
                        ${isActive ? "text-[#5EEAD4]" : "text-white/90"}
                      `}
                    />
                  </div>

                  {/* BOTTOM: title + description */}

                  <div>
                    <h3
                      className={`
                        font-bold
                        leading-[1.2]
                        tracking-[-0.01em]
                        text-white
                        transition-[font-size]
                        duration-500

                        text-[19px]
                        sm:text-[20px]

                        ${
                          isActive
                            ? "max-w-[420px] lg:text-[26px] xl:text-[28px]"
                            : "lg:text-[17px]"
                        }
                      `}
                    >
                      {pillar.title}
                    </h3>

                    <div
                      className={`
                        grid
                        transition-[grid-template-rows,opacity]
                        duration-500
                        ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                        }
                      `}
                    >
                      <p
                        className="
                          max-w-[460px]
                          overflow-hidden
                          pt-3
                          text-[13px]
                          font-semibold
                          leading-[1.7]
                          text-white/90

                          sm:text-[14px]
                          xl:text-[15px]
                        "
                      >
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
