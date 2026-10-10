"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Mail, ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ============================================================
   Questions and answers are derived only from verified content
   already present elsewhere on the site (About Hero, Story,
   Facts, Capabilities) and the shared contact channels used
   across Navbar / Footer / this page. Nothing here is invented.
============================================================ */

const faqs = [
  {
    question: "What does BH Ventures do?",
    answer:
      "BH Ventures FZE LLC is a UAE free-zone venture platform that combines international trade, technology, data, marketing, innovation, and business development under one roof, operating across four core capabilities: International Trade, Technology & Data, Marketing & Business Development, and Innovation & Strategic Ventures.",
  },
  {
    question: "Where is BH Ventures based?",
    answer:
      "BH Ventures FZE LLC is a Dubai free-zone company in the United Arab Emirates, with its corporate office in Dubai.",
  },
  {
    question: "What disciplines does BH Ventures work across?",
    answer:
      "The platform spans trade, technology, data, marketing, innovation, business development, and events — ten licensed business activities operating under a single founder-led company.",
  },
  {
    question: "How can I discuss a partnership?",
    answer:
      "Use the contact form above, or reach the team directly by email, WhatsApp, or Telegram. Partnership and business inquiries are handled directly by the team.",
  },
  {
    question: "How can I contact BH Ventures?",
    answer:
      "Email info@bhventures.ae, message the team on WhatsApp or Telegram, or use the contact form on this page — all channels reach the same team.",
  },
];

export default function ContactFAQ() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="contact-faq"
      className="relative isolate w-full min-w-0 overflow-hidden bg-[#0B1220] py-16 sm:py-20 lg:py-28"
    >
      {/* Soft light behind the questions */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[20%] -z-10 h-[460px] w-[460px] rounded-full bg-[#14B8A6]/[0.10] blur-[130px]"
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-7 md:px-10 lg:px-12 xl:px-16 2xl:max-w-[1600px] 2xl:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          {/* =====================================================
              LEFT: heading + help card (sticky on desktop)
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#2DD4BF]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5EEAD4] sm:text-[12px]">
                Common questions
              </span>
            </div>

            <h2 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.6rem] lg:text-[3rem]">
              Frequently asked <span className="text-[#5EEAD4]">questions.</span>
            </h2>

            <p className="mt-5 max-w-[420px] text-[15px] font-normal leading-[1.75] text-white/65 sm:text-[16px]">
              Quick answers about who we are, where we operate and how to
              reach the team.
            </p>

            {/* Help card */}
            <div className="relative mt-10 overflow-hidden rounded-[22px] border border-white/[0.22] bg-gradient-to-br from-white/[0.14] to-white/[0.06] p-6 backdrop-blur-xl sm:p-7">
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#5EEAD4]/70 to-transparent"
              />
              <p className="text-[17px] font-bold text-white">Still have a question?</p>
              <p className="mt-2 text-[14px] font-normal leading-[1.7] text-white/65">
                Write to us and the team will get back to you directly.
              </p>
              <a
                href="mailto:info@bhventures.ae"
                className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#14B8A6] px-5 py-2.5 text-[13.5px] font-semibold text-[#06251F] transition-colors duration-300 hover:bg-[#2DD4BF]"
              >
                <Mail size={15} strokeWidth={2} aria-hidden="true" />
                info@bhventures.ae
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT: numbered accordion
          ===================================================== */}
          <ul className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `contact-faq-panel-${index}`;
              const buttonId = `contact-faq-trigger-${index}`;

              return (
                <motion.li
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
                  className={`
                    relative
                    overflow-hidden
                    rounded-[20px]
                    border
                    transition-colors
                    duration-300
                    ${
                      isOpen
                        ? "border-[#2DD4BF]/50 bg-gradient-to-br from-white/[0.15] to-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.30)]"
                        : "border-white/[0.18] bg-white/[0.07] hover:border-white/[0.28] hover:bg-white/[0.10]"
                    }
                  `}
                >
                  {/* Teal bar on the open item */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-[3px] origin-top bg-[#2DD4BF] transition-transform duration-500 ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2DD4BF] sm:gap-6 sm:px-7 sm:py-6"
                    >
                      <span
                        className={`w-7 shrink-0 text-[13px] font-bold tracking-[0.1em] transition-colors duration-300 ${
                          isOpen ? "text-[#5EEAD4]" : "text-white/60"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`flex-1 text-[16px] font-semibold leading-[1.4] transition-colors duration-300 sm:text-[18px] ${
                          isOpen ? "text-white" : "text-white/85"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isOpen
                            ? "rotate-45 border-[#2DD4BF] bg-[#2DD4BF] text-[#06251F]"
                            : "border-white/25 text-white/70"
                        }`}
                      >
                        <Plus size={16} strokeWidth={2.2} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 pl-[4.25rem] text-[14.5px] font-normal leading-[1.8] text-white/70 sm:px-7 sm:pb-7 sm:pl-[5.75rem] sm:text-[15.5px]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
