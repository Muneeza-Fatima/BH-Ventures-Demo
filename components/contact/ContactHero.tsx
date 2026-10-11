
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

  return (
    <section
      id="contact-hero"
      className={`${jakarta.className} relative isolate flex min-h-[520px] w-full items-center justify-center overflow-hidden bg-[#060C18] px-5 pb-16 pt-[120px] text-center text-white sm:min-h-[570px] sm:pb-20 sm:pt-[135px] lg:min-h-[600px]`}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-center opacity-[0.20]"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,12,24,0.86) 0%, rgba(6,12,24,0.70) 45%, #060C18 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(45,212,191,0.09), transparent 58%)",
          }}
        />

        {/* Subtle decorative lines */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5EEAD4]/[0.08] sm:h-[550px] sm:w-[550px]" />

        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5EEAD4]/[0.06] sm:h-[450px] sm:w-[450px]" />

        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(94,234,212,0.45), transparent)",
          }}
        />
      </div>

      {/* Centered content */}
      <div className="mx-auto w-full max-w-[950px]">
        <motion.div
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-7 bg-[#5EEAD4]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5EEAD4] sm:text-xs">
            Contact BH Ventures
          </span>

          <span className="h-px w-7 bg-[#5EEAD4]" />
        </motion.div>

        <motion.h1
          initial={still ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className={`${spectral.className} mx-auto max-w-[900px] text-[2.8rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-6xl lg:text-[5rem]`}
        >
          Every great partnership
          <br className="hidden sm:block" /> starts with a{" "}
          <span className="font-normal italic text-[#5EEAD4]">
            conversation.
          </span>
        </motion.h1>

        <motion.p
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="mx-auto mt-6 max-w-[570px] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8"
        >
          Have an idea, a business opportunity, or a question?
          Let&apos;s explore what&apos;s possible together.
        </motion.p>

        <motion.div
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
          className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <a
            href="#contact-form"
            className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#5EEAD4] px-7 py-3 text-sm font-bold text-[#06111C] transition duration-300 hover:-translate-y-0.5 hover:bg-[#99F6E4] hover:shadow-[0_8px_35px_rgba(94,234,212,0.20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5EEAD4]"
          >
            Send an Inquiry

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>

          <a
            href="mailto:info@bhventures.ae"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-[#5EEAD4]"
          >
            info@bhventures.ae
            <ArrowUpRight size={15} />
          </a>
        </motion.div>

        <motion.div
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.17em] text-white/45 sm:mt-12"
        >
          <span>Dubai</span>
          <span className="text-[#5EEAD4]">•</span>
          <span>International Business</span>
          <span className="text-[#5EEAD4]">•</span>
          <span>Technology & Innovation</span>
        </motion.div>
      </div>
    </section>
  );
}
