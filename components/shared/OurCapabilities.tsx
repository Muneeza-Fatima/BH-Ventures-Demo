"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Rocket,
  Sparkles,
  BarChart3,
  Megaphone,
  Handshake,
} from "lucide-react";

const capabilities = [
  {
    icon: ArrowLeftRight,
    title: "International Trading",
    description:
      "Global trading and market access across strategically selected international markets.",
  },
  {
    icon: Rocket,
    title: "Strategic Ventures",
    description:
      "Identifying, developing, and supporting high-potential business opportunities.",
  },
  {
    icon: Sparkles,
    title: "AI & Web3 Solutions",
    description:
      "Technology-driven solutions across artificial intelligence, Web3, and emerging digital ecosystems.",
  },
  {
    icon: BarChart3,
    title: "Digital Analytics",
    description:
      "Turning business data into actionable insights for smarter strategic decisions.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Growth",
    description:
      "Digital marketing and growth strategies designed to strengthen brands and expand market reach.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description:
      "Connecting businesses, expertise, and resources through long-term strategic relationships.",
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
    y: -45,
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

export default function OurCapabilities() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

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
      id="our-capabilities"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#E7EEF3]

        py-10
        sm:py-13
        md:py-16
        lg:py-18
        xl:py-20
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[240px]
          bg-[radial-gradient(circle_at_85%_10%,rgba(45,212,191,0.07),transparent_58%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-[220px]
          w-[320px]
          bg-[radial-gradient(circle_at_bottom_left,rgba(139,166,184,0.06),transparent_65%)]
        "
      />

      {/* CONTENT */}

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
        "
      >
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.15 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mx-auto
            mb-7
            max-w-[720px]
            text-center

            sm:mb-10
            lg:mb-11
          "
        >
          {/* LABEL */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-center
              gap-2.5

              sm:mb-4
              sm:gap-3
            "
          >
            <span
              className="
                h-px
                w-6
                bg-gradient-to-r
                from-transparent
                to-[#149D8B]

                sm:w-11
              "
            />

            <span
              className="
                text-[8px]
                font-extrabold
                uppercase
                tracking-[0.28em]
                text-[#087C70]

                sm:text-[10px]
              "
            >
              What We Do
            </span>

            <span
              className="
                h-px
                w-6
                bg-gradient-to-l
                from-transparent
                to-[#149D8B]

                sm:w-11
              "
            />
          </div>

          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              text-[1.85rem]
              font-extrabold
              leading-[1.05]
              tracking-[-0.045em]
              text-[#132B40]

              sm:text-[2.6rem]
              lg:text-[2.9rem]
              xl:text-[3.1rem]
            "
          >
            Our{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#132B40]
                via-[#155E75]
                to-[#009F8C]
                bg-clip-text
                text-transparent
              "
            >
              Capabilities.
            </span>
          </motion.h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-3
              max-w-[570px]

              text-[11.5px]
              font-medium
              leading-[1.65]
              text-[#52697A]

              sm:mt-4
              sm:text-[14px]
              sm:leading-6

              lg:text-[15px]
            "
          >
            From international trading to emerging technologies, BH
            Ventures provides strategic capabilities designed to create
            and scale global opportunities.
          </p>
        </motion.div>

        {/* CARDS */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2
            sm:gap-5

            lg:grid-cols-3
            lg:gap-5

            xl:gap-6
          "
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <motion.article
                key={capability.title}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: {
                          duration: 0.22,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                }
                className="
                  group
                  relative
                  mx-auto
                  w-[94%]
                  min-h-[190px]
                  min-w-0

                  flex
                  flex-col

                  overflow-hidden
                  rounded-[16px]

                  border
                  border-[#3F7D82]/55

                  bg-gradient-to-br
                  from-[#173D4A]
                  via-[#123542]
                  to-[#0D293B]

                  p-4

                  shadow-[0_5px_16px_rgba(18,49,65,0.14)]

                  transition-[transform,border-color,box-shadow]
                  duration-300
                  ease-out

                  hover:border-[#36CDBB]/70
                  hover:shadow-[0_10px_24px_rgba(20,120,110,0.16)]

                  active:border-[#36CDBB]/60

                  sm:mx-0
                  sm:w-full
                  sm:min-h-[220px]
                  sm:rounded-[18px]
                  sm:p-5

                  lg:min-h-[225px]
                  lg:p-5

                  xl:min-h-[230px]
                "
              >
                {/* INNER BORDER */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-[1px]
                    rounded-[15px]
                    border
                    border-white/[0.04]

                    transition-colors
                    duration-300

                    group-hover:border-[#5EEAD4]/20

                    sm:rounded-[17px]
                  "
                />

                {/* TOP ACCENT */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-[15%]
                    right-[15%]
                    top-0
                    h-px

                    bg-gradient-to-r
                    from-transparent
                    via-[#8DEBDD]/50
                    to-transparent

                    transition-all
                    duration-300

                    group-hover:left-[8%]
                    group-hover:right-[8%]
                    group-hover:via-[#8DEBDD]/80
                  "
                />

                {/* NUMBER */}

                <span
                  className="
                    relative
                    z-10

                    text-[8px]
                    font-bold
                    tracking-[0.16em]

                    text-[#8EA7B8]

                    transition-colors
                    duration-300

                    group-hover:text-[#6EE7D8]

                    sm:text-[10px]
                    sm:tracking-[0.18em]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* ICON + TITLE */}

                <div
                  className="
                    relative
                    z-10
                    mt-3

                    flex
                    flex-col
                    items-start
                    gap-6

                    sm:mt-4
                    sm:gap-4
                  "
                >
                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-[10px]

                      border
                      border-[#4ED8C7]/35

                      bg-[#174E55]

                      text-[#73E6D8]

                      transition-[transform,border-color,background-color,color]
                      duration-300
                      ease-out

                      group-hover:-translate-y-0.5
                      group-hover:border-[#6EE7D8]/65
                      group-hover:bg-[#1A5B5E]
                      group-hover:text-[#B4FFF5]

                      sm:h-10
                      sm:w-10
                      sm:rounded-[12px]
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      aria-hidden="true"
                      className="
                        sm:h-[18px]
                        sm:w-[18px]
                      "
                    />
                  </div>

                  {/* TITLE */}

                  <h3
                    className="
                      max-w-[280px]

                      text-[12.5px]
                      font-bold
                      leading-[1.25]
                      tracking-[-0.01em]

                      text-white

                      transition-colors
                      duration-300

                      group-hover:text-[#D8FFF9]

                      sm:text-[16px]
                      sm:leading-[1.25]
                    "
                  >
                    {capability.title}
                  </h3>
                </div>

                {/* DESCRIPTION */}

                <p
                  className="
                    relative
                    z-10

                    mt-4
                    max-w-[390px]

                    text-[10px]
                    font-medium
                    leading-[1.6]

                    text-[#B8C8D3]

                    transition-colors
                    duration-300

                    group-hover:text-[#D0DEE5]

                    sm:mt-2.5
                    sm:text-[12px]
                    sm:leading-[1.6]
                  "
                >
                  {capability.description}
                </p>

                {/* BOTTOM ACCENT */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-5
                    right-5
                    h-px

                    origin-left
                    scale-x-0

                    bg-gradient-to-r
                    from-[#00D8C0]
                    via-[#5EEAD4]
                    to-transparent

                    opacity-0

                    transition-[transform,opacity]
                    duration-300
                    ease-out

                    group-hover:scale-x-100
                    group-hover:opacity-100

                    sm:left-6
                    sm:right-6
                  "
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}