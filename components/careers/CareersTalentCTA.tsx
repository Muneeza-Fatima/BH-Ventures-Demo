"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareersTalentCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="careers-talent-cta"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#0B1220]
        px-5
        py-20

        sm:px-8
        sm:py-24

        md:px-10
        md:py-28

        lg:px-12
        lg:py-32

        xl:px-16
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[320px]
          w-[560px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#14B8A6]/[0.055]
          blur-[110px]
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
          via-[#2DD4BF]/40
          to-transparent
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[900px]
          flex-col
          items-center
          text-center
        "
      >
        <div className="mb-6 flex items-center justify-center sm:mb-8">
          <span
            className="
              story-pill
              relative
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/[0.14]
              bg-[linear-gradient(135deg,rgba(0,255,213,0.06),rgba(255,255,255,0.04))]
              px-4
              py-2
              backdrop-blur-sm

              shadow-[0_10px_30px_-8px_rgba(0,205,181,0.22)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-[2.5px]
              hover:shadow-[0_18px_42px_-8px_rgba(0,205,181,0.38)]
            "
          >
            <span className="relative flex h-[7px] w-[7px] shrink-0 items-center justify-center">
              {!prefersReducedMotion && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[#00FFD5] story-dot-breathe"
                />
              )}

              <span className="relative h-[7px] w-[7px] rounded-full bg-[#00FFD5]" />
            </span>

            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.30em]
                text-[#00FFD5]
                sm:text-[10px]
              "
            >
              Talent Network
            </span>
          </span>
        </div>

        <h2
          className="
            w-full
            text-[30px]
            font-semibold
            leading-[1.1]
            tracking-[-0.045em]
            text-white
            sm:text-[40px]
            md:text-[48px]
            lg:text-[52px]
          "
        >
          Stay Close To
          <br className="hidden sm:block" /> What We&apos;re Building.
        </h2>

        <div
          aria-hidden="true"
          className="
            mt-6
            h-px
            w-12
            bg-gradient-to-r
            from-transparent
            via-[#2DD4BF]
            to-transparent
          "
        />

        <p
          className="
            mx-auto
            pt-5
            max-w-[560px]
            text-[14px]
            font-medium
            leading-7
            text-white/55
            sm:text-[16px]
          "
        >
          Send your profile to join our talent network — we&apos;ll reach
          out directly when an opportunity fits what you bring.
        </p>

        <div
          className="
            mt-8
            flex
            w-full
            flex-col
            items-center
            justify-center
            gap-3

            sm:flex-row
            sm:gap-4
          "
        >
          <Link
            href="/contact"
            className="
              group
              relative
              w-full
              max-w-[210px]
              sm:w-auto
              sm:max-w-none
            "
          >
            <span
              className="
                relative
                flex
                min-h-[50px]
                min-w-[190px]
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-full

                border
                border-[#14B8A6]/70
                bg-[#14B8A6]

                px-7

                text-[13px]
                font-bold
                text-[#07151A]

                shadow-[0_0_18px_rgba(20,184,166,0.22)]

                transition-transform
                duration-300
                ease-out

                group-hover:-translate-y-0.5
                group-hover:bg-[#2DD4BF]
                group-hover:shadow-[0_0_24px_rgba(45,212,191,0.35)]
              "
            >
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-[-20%]
                  left-[-70%]
                  w-[45%]
                  rotate-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/50
                  to-transparent
                  opacity-0

                  transition-all
                  duration-700
                  ease-out

                  group-hover:left-[125%]
                  group-hover:opacity-100
                "
              />

              <span className="relative z-10 whitespace-nowrap">
                Send Your Profile
              </span>

              <ArrowRight
                className="
                  relative
                  z-10
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </Link>

          <Link
            href="/about"
            className="
              group
              relative
              w-full
              max-w-[210px]
              sm:w-auto
              sm:max-w-none
            "
          >
            <span
              className="
                relative
                flex
                min-h-[50px]
                min-w-[190px]
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-full

                border
                border-white/[0.16]
                bg-white/[0.035]

                px-7

                text-[13px]
                font-bold
                text-white

                backdrop-blur-sm

                transition-transform
                duration-300
                ease-out

                group-hover:-translate-y-0.5
                group-hover:border-[#14B8A6]/70
                group-hover:bg-[#14B8A6]
                group-hover:text-[#07151A]
                group-hover:shadow-[0_0_24px_rgba(20,184,166,0.28)]
              "
            >
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-[-20%]
                  left-[-70%]
                  w-[45%]
                  rotate-[18deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/35
                  to-transparent
                  opacity-0

                  transition-all
                  duration-700
                  ease-out

                  group-hover:left-[125%]
                  group-hover:opacity-100
                "
              />

              <span className="relative z-10 whitespace-nowrap">
                About BH Ventures
              </span>

              <ArrowRight
                className="
                  relative
                  z-10
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
