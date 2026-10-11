"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, ChevronRight } from "lucide-react";
import { DISPLAY } from "./ContactHero";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  { question: "What does BH Ventures do?", answer: "BH Ventures FZE LLC is a UAE free-zone venture platform that combines international trade, technology, data, marketing, innovation, and business development under one roof, operating across four core capabilities: International Trade, Technology & Data, Marketing & Business Development, and Innovation & Strategic Ventures." },
  { question: "Where is BH Ventures based?", answer: "BH Ventures FZE LLC is a Dubai free-zone company in the United Arab Emirates, with its corporate office in Dubai — one of the world's premier hubs for global trade and innovation." },
  { question: "What disciplines does BH Ventures work across?", answer: "The platform spans trade, technology, data, marketing, innovation, business development, and events — ten licensed business activities operating under a single founder-led company." },
  { question: "How can I discuss a partnership?", answer: "Use the contact form above, or reach the team directly by email, WhatsApp, or Telegram. Partnership and business inquiries are handled directly by the team — no gatekeeping." },
  { question: "How can I contact BH Ventures?", answer: "Email info@bhventures.ae, message the team on WhatsApp or Telegram, or use the contact form on this page — all channels reach the same team with a typical response time under an hour." },
];

export default function ContactFAQ() {
  const [active, setActive] = useState(0);
  const still = useHydratedReducedMotion();

  return (
    <section id="contact-faq" className="relative isolate w-full overflow-hidden bg-[#FFFDF8] py-20 text-[#0B1626] sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div animate={still ? undefined : { x: [0, 80, 0], y: [0, -40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-20 bottom-0 h-[480px] w-[480px] rounded-full bg-[#5EEAD4]/40 blur-[110px]" />
        <motion.div animate={still ? undefined : { x: [0, -70, 0], y: [0, 50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-16 top-0 h-[440px] w-[440px] rounded-full bg-[#7DD3FC]/45 blur-[110px]" />
        <motion.div animate={still ? undefined : { scale: [1, 1.25, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[40%] top-[30%] h-[300px] w-[300px] rounded-full bg-[#99F6E4]/35 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: EASE }}
          className={`${DISPLAY} mb-10 text-center text-[2.4rem] leading-tight tracking-[-0.03em] sm:text-[3.4rem]`}>
          Questions people ask <span className="bg-gradient-to-r from-[#0EA5E9] to-[#14B8A6] bg-clip-text text-transparent">before they write.</span>
        </motion.h2>
        <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="mx-auto -mt-6 mb-12 block h-[3px] w-28 origin-center rounded-full bg-gradient-to-r from-[#5EEAD4] via-[#38BDF8] to-[#14B8A6]" />

        <div className="relative grid overflow-hidden rounded-[36px] border border-white bg-white/80 shadow-[0_40px_100px_rgba(20,184,166,0.18)] backdrop-blur-2xl lg:grid-cols-[1fr_1.25fr]">
          {!still && <motion.span aria-hidden className="absolute left-0 top-0 z-10 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-[#14B8A6] to-transparent" animate={{ x: ["-100%", "300%"] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />}
          <ul className="flex flex-col gap-1.5 border-[#0B1626]/8 p-5 sm:p-7 lg:border-r">
            {faqs.map((faq, i) => {
              const on = active === i;
              return (
                <motion.li key={faq.question} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}>
                  <button type="button" onClick={() => setActive(i)} aria-current={on}
                    className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#14B8A6] ${on ? "bg-white shadow-[0_12px_34px_rgba(20,184,166,0.22)] ring-1 ring-[#2DD4BF]/30" : "hover:-translate-y-0.5 hover:bg-white/80"}`}>
                    <span className={`flex-1 text-[14.5px] font-semibold leading-snug transition ${on ? "text-[#0B1626]" : "text-[#0B1626]/55 group-hover:text-[#0B1626]/80"}`}>{faq.question}</span>
                    <ChevronRight size={15} className={`shrink-0 transition ${on ? "text-[#14B8A6] max-lg:rotate-90 lg:translate-x-0.5" : "text-[#0B1626]/25"}`} />
                    {on && <motion.span layoutId="faq-glow" className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b from-[#5EEAD4] via-[#14B8A6] to-[#1D4ED8]" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="px-4 pb-4 pt-2 text-[14.5px] leading-[1.8] text-[#0B1626]/70">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
            <li className="mt-3 lg:hidden">
              <a href="mailto:info@bhventures.ae" className="inline-flex items-center gap-2 rounded-full bg-[#0B1626] px-6 py-3 text-[13.5px] font-semibold text-[#5EEAD4]">
                <Mail size={14} /> Still have a question?
                <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>

          <div className="relative hidden min-h-[400px] flex-col p-7 sm:p-10 lg:flex lg:p-12">
            <motion.div aria-hidden animate={still ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-[#5EEAD4]/40 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }} className="relative z-10 flex flex-1 flex-col">
                <h3 className={`${DISPLAY} text-[1.7rem] leading-[1.15] tracking-[-0.02em] sm:text-[2rem]`}>{faqs[active].question}</h3>
                <p className="mt-5 max-w-[60ch] flex-1 text-[15.5px] leading-[1.85] text-[#0B1626]/65">{faqs[active].answer}</p>
              </motion.div>
            </AnimatePresence>
            <a href="mailto:info@bhventures.ae" className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0B1626] px-6 py-3 text-[13.5px] font-semibold text-[#5EEAD4] shadow-[0_12px_32px_rgba(27,43,58,0.22)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14B8A6]">
              <Mail size={14} /> Still have a question?
              <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}