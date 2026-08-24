"use client";

import { motion } from "framer-motion";
import { UserRound, Quote } from "lucide-react";

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

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4">
            <span
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                border
                border-[#2DD4BF]/30
                bg-[#0E4A44]/40
                text-[#5EEAD4]
                sm:h-28
                sm:w-28
              "
            >
              <UserRound
                size={44}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </span>

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-white/35
              "
            >
              Portrait Coming Soon
            </span>
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
            className="mb-4 text-[#2DD4BF]/40"
          />

          <h2
            className="
              max-w-[560px]
              text-[2rem]
              font-extrabold
              leading-[1.1]
              tracking-[-0.04em]
              text-white
              sm:text-[2.4rem]
              lg:text-[2.7rem]
            "
          >
            Badar Ul Haq
          </h2>

          <p
            className="
              pt-2
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
              leading-7
              text-white/65
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
              leading-7
              text-white/65
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
                  text-white/70
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
