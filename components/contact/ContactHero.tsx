
"use client";

import { Spectral, Plus_Jakarta_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const DISPLAY = "font-bold";

const EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export default function ContactHero() {
  const still = useHydratedReducedMotion();

  const reveal = (delay: number) => ({
    initial: still ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay: still ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="contact-hero"
      className={`${jakarta.className} relative isolate flex min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#060C18] px-5 pb-16 pt-[120px] text-center text-white sm:min-h-[560px] sm:pb-20 sm:pt-[130px] lg:min-h-[590px]`}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.18]"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,12,24,0.84) 0%, rgba(6,12,24,0.76) 48%, #060C18 100%)",
          }}
        />

        {/* Soft central glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, rgba(45,212,191,0.065), transparent 58%)",
          }}
        />

        {/* Subtle decorative circles */}
        <div className="absolute left-1/2 top-[43%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5EEAD4]/[0.045] sm:h-[460px] sm:w-[460px]" />

        <div className="absolute left-1/2 top-[43%] h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5EEAD4]/[0.03] sm:h-[590px] sm:w-[590px]" />

        {/* Smooth bottom fade into the page */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #060C18)",
          }}
        />
      </div>

      {/* Centered content */}
      <div className="relative mx-auto w-full max-w-[1000px]">
        {/* Eyebrow */}
        <motion.div
          {...reveal(0)}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-7 bg-[#5EEAD4]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5EEAD4] sm:text-xs">
            Contact BH Ventures
          </span>

          <span className="h-px w-7 bg-[#5EEAD4]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...reveal(0.07)}
          className={`${spectral.className} mx-auto max-w-[900px] text-[2.65rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[3.5rem] lg:text-[4.6rem]`}
        >
          Every great partnership
          <br className="hidden sm:block" /> starts with a{" "}
          <span className="font-normal italic text-[#5EEAD4]">
            conversation.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...reveal(0.14)}
          className="mx-auto mt-6 max-w-[560px] text-sm leading-7 text-slate-300 sm:mt-7 sm:text-base sm:leading-8"
        >
          Have an idea, a business opportunity, or a question?
          Let&apos;s explore what&apos;s possible together.
        </motion.p>

        {/* Contact actions */}
        <motion.div
          {...reveal(0.21)}
          className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6"
        >
          <a
            href="#contact-form"
            className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#5EEAD4] px-7 py-3 text-sm font-bold text-[#06111C] transition duration-300 hover:-translate-y-0.5 hover:bg-[#99F6E4] hover:shadow-[0_8px_28px_rgba(94,234,212,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5EEAD4]"
          >
            Send an Inquiry

            <ArrowRight
              size={16}
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

          <a
            href="mailto:info@bhventures.ae"
            className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors duration-300 hover:text-[#5EEAD4]"
          >
            <span>info@bhventures.ae</span>

            <ArrowUpRight
              size={14}
              className="text-white/45 transition-colors group-hover:text-[#5EEAD4]"
            />
          </a>
        </motion.div>

        {/* Brand signature */}
        <motion.div
          {...reveal(0.28)}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/45 sm:mt-12"
        >
          <span>Dubai</span>

          <span className="text-[#5EEAD4]/70">•</span>

          <span>International Business</span>

          <span className="text-[#5EEAD4]/70">•</span>

          <span>Technology & Innovation</span>
        </motion.div>
      </div>
    </section>
  );
}
