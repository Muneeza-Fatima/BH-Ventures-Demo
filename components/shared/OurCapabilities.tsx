"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Rocket,
  BrainCircuit,
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
    icon: BrainCircuit,
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

/* Card tones (navy / slate grey / ocean blue) */
const cardThemes = [
  {
    card: "border-[#0D293B] bg-[#0D293B] shadow-[0_6px_16px_rgba(13,41,59,0.12)]",
    icon: "text-[#5EEAD4]",
    title: "text-white",
    text: "text-white/65",
  },
  {
    card: "border-[#3B4A5E] bg-gradient-to-br from-[#3B4A5E] to-[#2C3A4C] shadow-[0_6px_16px_rgba(51,65,85,0.18)]",
    icon: "text-[#5EEAD4]",
    title: "text-white",
    text: "text-white/72",
  },
  {
    card: "border-[#155E75] bg-gradient-to-br from-[#155E75] to-[#164E63] shadow-[0_6px_16px_rgba(21,94,117,0.14)]",
    icon: "text-[#A5F3FC]",
    title: "text-white",
    text: "text-white/72",
  },
];

/* No two neighbours share a colour: not in the mobile list (i, i+1)
   and not in a desktop column (i, i+3) */
const themeOrder = [0, 1, 2, 1, 2, 0];

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


        {/* CARDS — architecture diagram: 3 cards / BH Ventures bus / 3 cards */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            relative
            flex
            flex-col
            gap-4
            pl-8

            sm:gap-5
            sm:pl-10

            lg:grid
            lg:grid-cols-3
            lg:grid-rows-[auto_72px_auto]
            lg:gap-x-6
            lg:gap-y-0
            lg:pl-0

            xl:gap-x-7
          "
        >
          {/* Mobile / tablet: vertical spine */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-6
              left-3
              top-6
              w-[2px]
              bg-[#14B8A6]/70

              sm:left-4
              lg:hidden
            "
          />

          {/* Desktop: horizontal bus with central hub */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              relative
              hidden

              lg:col-span-3
              lg:row-start-2
              lg:block
            "
          >
            <span
              className="
                absolute
                left-[16.666%]
                right-[16.666%]
                top-1/2
                h-[2px]
                bg-[#14B8A6]/80
              "
            />

            {/* Data pulse travelling along the bus */}
            <span
              className="
                capability-bus-pulse
                absolute
                top-1/2
                h-3.5
                w-3.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#2DD4BF]
                shadow-[0_0_16px_4px_rgba(45,212,191,0.75)]
              "
            />

            <span
              className="
                absolute
                left-1/2
                top-1/2
                z-10
                -translate-x-1/2
                -translate-y-1/2
                whitespace-nowrap
                rounded-full
                bg-[#0D293B]
                px-5
                py-2
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.24em]
                text-[#5EEAD4]
                shadow-[0_8px_20px_rgba(13,41,59,0.25)]
              "
            >
              BH Ventures
            </span>
          </div>

          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isTopRow = index < 3;
            const theme = cardThemes[themeOrder[index] ?? 0];

            return (
              <motion.article
                key={capability.title}
                variants={
                  shouldReduceMotion
                    ? {
                        hidden: { opacity: 0 },
                        show: { opacity: 1 },
                      }
                    : cardVariants
                }
                className={`
                  group
                  relative
                  min-h-[170px]
                  min-w-0
                  rounded-[18px]
                  border
                  p-5
                  ${theme.card}

                  transition-[border-color,box-shadow]
                  duration-300
                  ease-out

                  hover:border-[#2DD4BF]
                  hover:shadow-[0_10px_24px_rgba(18,49,65,0.14)]

                  sm:p-6

                  lg:min-h-[180px]
                  ${isTopRow ? "lg:row-start-1" : "lg:row-start-3"}
                `}
              >
                {/* Mobile connector: spine → card */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -left-5
                    top-9
                    h-[2px]
                    w-5
                    bg-[#14B8A6]/70
                    transition-colors
                    duration-300
                    group-hover:bg-[#2DD4BF]

                    sm:-left-6
                    sm:w-6
                    lg:hidden
                  "
                >
                  <span className="absolute -left-[5px] -top-[4px] h-[10px] w-[10px] rounded-full bg-[#14B8A6]" />
                </span>

                {/* Desktop connector: card → bus */}
                <span
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute
                    left-1/2
                    hidden
                    h-9
                    w-[2px]
                    bg-[#14B8A6]/80
                    transition-colors
                    duration-300
                    group-hover:bg-[#2DD4BF]
                    lg:block
                    ${isTopRow ? "top-full" : "bottom-full"}
                  `}
                >
                  <span
                    className={`
                      absolute
                      -left-[4px]
                      h-[10px]
                      w-[10px]
                      rounded-full
                      bg-[#14B8A6]
                      ${isTopRow ? "-bottom-[5px]" : "-top-[5px]"}
                    `}
                  />
                </span>

                {/* ICON (spacing lives here: global h3 rule resets heading margins) */}

                <div className="mb-5">
                  <Icon
                    size={24}
                    strokeWidth={1.3}
                    aria-hidden="true"
                    className={`
                      ${theme.icon}
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    `}
                  />
                </div>

                {/* TITLE */}

                <h3
                  className={`
                    ${theme.title}
                    text-[16px]
                    font-semibold!
                    leading-[1.3]
                    tracking-[-0.01em]

                    sm:text-[17px]
                  `}
                >
                  {capability.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className={`
                    ${theme.text}
                    mt-2
                    text-[13px]
                    font-normal!
                    leading-[1.7]

                    sm:text-[13.5px]
                  `}
                >
                  {capability.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
