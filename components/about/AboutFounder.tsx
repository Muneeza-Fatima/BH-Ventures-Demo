"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
          right-[-180px]
          top-1/4
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#00CDB5]/[0.05]
          blur-[130px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          min-w-0
          max-w-[1440px]
          grid-cols-1
          items-center
          gap-12

          px-5
          sm:px-7
          md:px-10
          lg:px-12
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-16
          xl:px-16
          2xl:max-w-[1600px]
          2xl:px-20

          [@media(min-width:1024px)_and_(max-width:1366px)]:px-10!
        "
      >
        {/* =====================================================
            FOUNDER PORTRAIT PLACEHOLDER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95, clipPath: "inset(3% round 28px)" }}
          whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% round 28px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="
            relative
            mx-auto
            aspect-[4/5]
            w-full
            max-w-[380px]
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.10]
            bg-gradient-to-br
            from-[#132436]
            via-[#0F1D2C]
            to-[#0B1220]
            shadow-[0_25px_70px_rgba(0,0,0,0.35)]

            lg:max-w-none
          "
        >
          {/*
            Founder photo placeholder — replace this block with:
            <Image src="/images/founder-badar-ul-haq.jpg" alt="Badar Ul Haq" fill className="object-cover" />
            once an approved image is available.
          */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_20%,rgba(0,255,213,0.09),transparent_45%)]
            "
          />

          {/* Faint dot grid, fading out toward the edges */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
              [background-image:radial-gradient(rgba(255,255,255,0.10)_1px,transparent_1.2px)]
              [background-size:22px_22px]
              [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]
              [-webkit-mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]
            "
          />

          <Quote
            size={28}
            strokeWidth={1.5}
            aria-hidden="true"
            className="absolute left-6 top-6 z-10 text-[#2DD4BF]/40 sm:left-7 sm:top-7"
          />

          {/* Monogram badge */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div
              className="
                relative
                flex
                h-[220px]
                w-[220px]
                items-center
                justify-center
                rounded-full
                border
                border-[#2DD4BF]/20
                bg-[radial-gradient(circle_at_50%_35%,rgba(14,74,68,0.55),rgba(11,18,32,0.35)_70%)]
                shadow-[0_0_60px_-10px_rgba(0,255,213,0.25)]
                sm:h-[250px]
                sm:w-[250px]
              "
            >
              <span className="about-founder-ring absolute inset-[-14px] rounded-full border border-dashed border-[#2DD4BF]/35" />

              <span
                className="
                  font-heading
                  select-none
                  bg-gradient-to-b
                  from-white
                  to-[#00FFD5]
                  bg-clip-text
                  pb-[0.04em]
                  text-[150px]
                  font-bold
                  leading-none
                  tracking-[-0.04em]
                  text-transparent
                  opacity-90
                  [-webkit-background-clip:text]
                  sm:text-[180px]
                "
              >
                B
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-28
              bg-gradient-to-t
              from-[#0B1220]
              to-transparent
            "
          />

          {/* Caption */}
          <div className="absolute inset-x-0 bottom-7 z-20 flex items-center justify-center gap-3 px-6">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#00FFD5] sm:w-8" />

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
              Founder &amp; CEO · Dubai, UAE
            </span>

            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#00FFD5] sm:w-8" />
          </div>
        </motion.div>

        {/* =====================================================
            FOUNDER CONTENT
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center gap-3">
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
              Founder &amp; CEO
            </span>
          </div>

          <Quote
            size={30}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mb-5 text-[#2DD4BF]/40"
          />

          <h2
            className="
              font-heading
              max-w-[560px]
              text-[2rem]
              font-bold
              leading-[1.1]
              tracking-[-0.028em]
              text-[#E7EDF3]
              sm:text-[2.375rem]
              lg:text-[2.625rem]
            "
          >
            Badar Ul Haq
          </h2>

          <p
            className="
              pt-3
              text-[13px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white/45
              sm:text-[13.5px]
            "
          >
            Founder &amp; Chief Executive Officer
          </p>

          <p
            className="
              pt-6
              max-w-[540px]
              text-[14px]
              font-medium
              leading-[1.75]
              text-[#AAB6C2]
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            BH Ventures is a founder-led company. Every venture we take on
            carries direct accountability back to a single point of
            leadership, rather than being spread across layers of process.
          </p>

          <p
            className="
              pt-4
              max-w-[540px]
              text-[14px]
              font-medium
              leading-[1.75]
              text-[#AAB6C2]
              sm:text-[15px]
              lg:text-[16px]
            "
          >
            That leadership is built around professional standards and a
            long-term view — bringing traditional trade and modern
            technology together under one disciplined, execution-focused
            platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              "Founder-Led",
              "Direct Accountability",
              "Long-Term Vision",
            ].map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-white/[0.10]
                  bg-white/[0.03]
                  px-3.5
                  py-2
                  text-[11px]
                  font-bold
                  text-[#AAB6C2]
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
