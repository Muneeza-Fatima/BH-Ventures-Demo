"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { directChannels } from "@/components/about/aboutContactData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* =========================================================
   The full contact form lives on /contact, not here — this
   section is a teaser: verified contact/office info plus one
   primary CTA that hands off to the dedicated contact page.
   ========================================================= */

export default function AboutContact() {
  return (
    <section
      id="about-contact"
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
          left-1/2
          top-0
          h-[420px]
          w-[620px]
          -translate-x-1/2
          -translate-y-1/2
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-[680px] text-center"
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
              Global Presence
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
            Reach the team{" "}
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
              behind the platform.
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
            One corporate base in the UAE, with clear channels for the
            people who want to work with us.
          </p>
        </motion.div>

        {/* Direct channels */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="
            mx-auto
            mt-12
            grid
            max-w-[900px]
            grid-cols-1
            gap-4
            sm:mt-14
            sm:grid-cols-2
            lg:mt-16
            lg:grid-cols-4
          "
        >
          {directChannels.map((channel) => {
            const Icon = channel.icon;

            const content = (
              <>
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-[#2DD4BF]/30
                    bg-[#0E4A44]/50
                    text-[#5EEAD4]

                    transition-transform
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:scale-105
                  "
                >
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </span>

                <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  {channel.label}
                </span>

                <span className="mt-1 block text-[13px] font-bold text-white">
                  {channel.value}
                </span>
              </>
            );

            const cardClass = `
              group
              flex
              flex-col
              items-center
              rounded-2xl
              border
              border-white/[0.10]
              bg-white/[0.03]
              p-5
              text-center

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:border-[#2DD4BF]/40
              hover:bg-white/[0.05]
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.25),0_0_28px_rgba(45,212,191,0.16)]
            `;

            if (!channel.href) {
              return (
                <div key={channel.label} className={cardClass}>
                  {content}
                </div>
              );
            }

            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className={`${cardClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]`}
              >
                {content}
              </a>
            );
          })}
        </motion.div>

        {/* Primary CTA — hands off to the dedicated contact page */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <Link href="/contact" className="group relative">
            <span
              className="
                relative
                flex
                min-h-[52px]
                min-w-[220px]
                items-center
                justify-center
                gap-2.5
                overflow-hidden
                rounded-full

                border
                border-[#14B8A6]/70
                bg-[#14B8A6]

                px-8

                text-[13.5px]
                font-bold
                text-[#07151A]

                shadow-[0_0_18px_rgba(20,184,166,0.22)]

                transition-all
                duration-300
                ease-out

                group-hover:-translate-y-1
                group-hover:bg-[#2DD4BF]
                group-hover:shadow-[0_14px_38px_rgba(45,212,191,0.42)]
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
                Talk to Our Team
              </span>

              <ArrowRight
                className="
                  relative
                  z-10
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1.5
                "
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
