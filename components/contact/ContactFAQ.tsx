"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, ChevronRight } from "lucide-react";
import { DISPLAY } from "./ContactHero";

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

  return (
    <section id="contact-faq" className="relative isolate w-full overflow-hidden bg-[#FBF7F0] py-20 text-[#0B1626] sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 bottom-0 h-[460px] w-[460px] rounded-full bg-[#2DD4BF]/25 blur-[120px]" />
        <div className="absolute -right-16 top-0 h-[420px] w-[420px] rounded-full bg-[#38BDF8]/20 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: EASE }}
          className={`${DISPLAY} mb-12 text-center text-[2.4rem] leading-tight tracking-[-0.03em] sm:text-[3.4rem]`}>
          Questions people ask <span className="italic text-[#0B1626]/55">before they write.</span>
        </motion.h2>

        <div className="grid overflow-hidden rounded-[36px] border border-white bg-white/60 shadow-[0_40px_100px_rgba(110,130,190,0.2)] backdrop-blur-2xl lg:grid-cols-[1fr_1.25fr]">
          <ul className="flex flex-col gap-1.5 border-b border-[#0B1626]/8 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            {faqs.map((faq, i) => {
              const on = active === i;
              return (
                <li key={faq.question}>
                  <button type="button" onClick={() => setActive(i)} aria-current={on}
                    className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#14B8A6] ${on ? "bg-white shadow-[0_10px_30px_rgba(120,140,200,0.2)]" : "hover:bg-white/60"}`}>
                    <span className={`flex-1 text-[14.5px] font-semibold leading-snug transition ${on ? "text-[#0B1626]" : "text-[#0B1626]/55 group-hover:text-[#0B1626]/80"}`}>{faq.question}</span>
                    <ChevronRight size={15} className={`shrink-0 transition ${on ? "translate-x-0.5 text-[#14B8A6]" : "text-[#0B1626]/25"}`} />
                    {on && <motion.span layoutId="faq-glow" className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-gradient-to-b from-[#5EEAD4] via-[#14B8A6] to-[#1D4ED8]" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative flex min-h-[340px] flex-col p-7 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }} className="flex flex-1 flex-col">
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