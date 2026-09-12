"use client";

import { motion, type Variants } from "framer-motion";
import { Eye, Compass, type LucideIcon } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Pillar = {
  id: "vision" | "mission";
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  body: string;
  /* Short anchors lifted straight from the statement above them —
     nothing new is claimed, they just make the copy scannable. */
  anchors: string[];
};

const pillars: Pillar[] = [
  {
    id: "vision",
    eyebrow: "Vision",
    icon: Eye,
    title: "To become a trusted multi-sector ventures company.",
    body: "One that bridges traditional trade with cutting-edge technology and creates value through innovation and execution.",
    anchors: ["Trusted", "Multi-sector", "Trade + Technology"],
  },
  {
    id: "mission",
    eyebrow: "Mission",
    icon: Compass,
    title: "Identify opportunity. Build capability. Create value.",
    body: "We identify high-potential opportunities in technology and trade, build professional capabilities, and create lasting value for clients, partners, and stakeholders through integrity, innovation, and execution excellence.",
    anchors: ["Integrity", "Innovation", "Execution excellence"],
  },
];

const pillarContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const pillarItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

function PillarPanel({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;

  return (
    <motion.div
      variants={pillarContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="
        group
        relative
        isolate
        overflow-hidden
        p-8
        sm:p-10
        md:p-12
        lg:p-14

        [@media(min-width:1024px)_and_(max-width:1366px)]:p-11!
      "
    >
      {/* Hover wash — a soft light rises from the panel's corner */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -z-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#00FFD5]/[0.07]
          opacity-0
          blur-[110px]
          transition-opacity
          duration-700
          ease-out
          group-hover:opacity-100
          ${index === 0 ? "left-[-140px] top-[-140px]" : "right-[-140px] bottom-[-140px]"}
        `}
      />

      {/* Ghosted icon watermark */}
      <Icon
        aria-hidden="true"
        strokeWidth={0.6}
        className="
          pointer-events-none
          absolute
          -z-10
          right-[-28px]
          bottom-[-34px]
          h-[220px]
          w-[220px]
          text-[#5EEAD4]/[0.05]
          transition-transform
          duration-700
          ease-out
          group-hover:-translate-y-2
          group-hover:rotate-[-4deg]

          sm:h-[260px]
          sm:w-[260px]
        "
      />

      <motion.span
        variants={pillarItem}
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-[#2DD4BF]/30
          bg-gradient-to-br
          from-[#064E49]/70
          to-[#0B1220]/40
          text-[#5EEAD4]
          shadow-[0_0_0_1px_rgba(45,212,191,0.06),0_12px_30px_-10px_rgba(0,205,181,0.45)]
          transition-transform
          duration-500
          ease-out
          group-hover:-translate-y-1
        "
      >
        <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
      </motion.span>

      <motion.p
        variants={pillarItem}
        className="
          flex
          items-center
          gap-3
          pt-7
          text-[10px]
          font-extrabold
          uppercase
          tracking-[0.28em]
          text-[#00FFD5]
        "
      >
        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-[#00FFD5] to-transparent" />
        {pillar.eyebrow}
      </motion.p>

      <motion.h3
        variants={pillarItem}
        className="
          font-heading
          max-w-[480px]
          pt-4
          text-[27px]
          font-bold
          leading-[1.14]
          tracking-[-0.03em]
          text-white

          sm:text-[32px]
          lg:text-[34px]
          xl:text-[38px]

          [@media(min-width:1024px)_and_(max-width:1366px)]:text-[31px]!
        "
      >
        {pillar.title}
      </motion.h3>

      <motion.p
        variants={pillarItem}
        className="
          max-w-[480px]
          pt-5
          text-[15px]
          font-medium
          leading-[1.8]
          text-white/62
          sm:text-[16px]
        "
      >
        {pillar.body}
      </motion.p>

      <motion.div
        variants={pillarItem}
        className="mt-8 flex flex-wrap gap-2"
      >
        {pillar.anchors.map((anchor) => (
          <span
            key={anchor}
            className="
              rounded-full
              border
              border-white/[0.10]
              bg-white/[0.03]
              px-3.5
              py-1.5
              text-[11px]
              font-bold
              tracking-[0.02em]
              text-white/65
              transition-colors
              duration-300
              group-hover:border-[#2DD4BF]/35
              group-hover:text-white/85
            "
          >
            {anchor}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function AboutMissionVision() {
  return (
    <section
      id="about-mission-vision"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0B1220]
        py-16
        sm:py-20
        md:py-24
        lg:py-28
        xl:py-32

        [@media(min-width:1024px)_and_(max-width:1366px)]:py-20!
      "
    >
      <div
        aria-hidden="true"
        className="
          about-aurora
          pointer-events-none
          absolute
          left-1/2
          bottom-0
          h-[320px]
          w-[640px]
          -translate-x-1/2
          translate-y-1/2
          rounded-full
          bg-[#00FFD5]/[0.045]
          blur-[110px]
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 flex flex-col gap-5 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00FFD5] sm:w-10" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#00FFD5] sm:text-[10px]">
                Purpose
              </span>
            </div>

            <h2
              className="
                font-heading
                max-w-[640px]
                text-[2.2rem]
                font-extrabold
                leading-[1.04]
                tracking-[-0.035em]
                text-white
                sm:text-[2.8rem]
                lg:text-[3.2rem]

                [@media(min-width:1024px)_and_(max-width:1366px)]:text-[2.8rem]!
              "
            >
              Where we&apos;re headed,{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-white
                  via-[#EFFFFB]
                  to-[#00FFD5]
                  bg-clip-text
                  pb-[0.16em]
                  -mb-[0.16em]
                  text-transparent
                  [-webkit-background-clip:text]
                "
              >
                and how.
              </span>
            </h2>
          </div>

          <p className="max-w-[400px] text-[15px] font-medium leading-[1.8] text-white/55 sm:text-[16px] lg:pb-1.5 lg:text-right">
            The long-term ambition, and the day-to-day discipline that gets us
            there.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="
            relative
            rounded-[30px]
            bg-gradient-to-br
            from-white/[0.16]
            via-white/[0.06]
            to-[#00FFD5]/[0.22]
            p-px
            shadow-[0_30px_80px_rgba(0,0,0,0.38),0_0_60px_-24px_rgba(0,205,181,0.3)]
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[29px]
              bg-gradient-to-br
              from-[#12213A]
              via-[#0F1B2D]
              to-[#0B1524]
            "
          >
            {/* Fine dot texture */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.35]
                [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1.2px)]
                [background-size:26px_26px]
                [mask-image:radial-gradient(ellipse_at_50%_0%,black_0%,transparent_70%)]
                [-webkit-mask-image:radial-gradient(ellipse_at_50%_0%,black_0%,transparent_70%)]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-px
                w-[55%]
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-[#2DD4BF]/60
                to-transparent
              "
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2">
              <PillarPanel pillar={pillars[0]} index={0} />

              {/* Divider */}
              <div
                aria-hidden="true"
                className="
                  hidden
                  lg:block
                  lg:absolute
                  lg:inset-y-10
                  lg:left-1/2
                  lg:w-px
                  lg:-translate-x-1/2
                  lg:bg-gradient-to-b
                  lg:from-transparent
                  lg:via-white/[0.14]
                  lg:to-transparent
                "
              />

              <div
                aria-hidden="true"
                className="
                  mx-8
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.12]
                  to-transparent
                  sm:mx-10
                  md:mx-12
                  lg:hidden
                "
              />

              <PillarPanel pillar={pillars[1]} index={1} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
