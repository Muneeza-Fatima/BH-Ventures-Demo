"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
      "BH Ventures FZE LLC is registered in the Ajman Free Zone, United Arab Emirates, with its corporate office in Dubai.",
  },
  {
    question: "What disciplines does BH Ventures work across?",
    answer:
      "The platform spans trade, technology, data, marketing, innovation, business development, and events — nine licensed business activities operating under a single founder-led company.",
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

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const panelId = `contact-faq-panel-${index}`;
  const buttonId = `contact-faq-trigger-${index}`;

  return (
    <div
      className={`
        overflow-hidden
        rounded-[18px]
        border
        bg-white/[0.03]

        transition-colors
        duration-300
        ease-out

        ${
          isOpen
            ? "border-[#2DD4BF]/50 shadow-[0_14px_36px_rgba(0,0,0,0.22),0_0_28px_rgba(45,212,191,0.14)]"
            : "border-white/[0.10] hover:border-white/[0.18]"
        }
      `}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="
            flex
            w-full
            items-center
            justify-between
            gap-4
            px-5
            py-4.5
            text-left

            outline-none

            focus-visible:ring-2
            focus-visible:ring-[#5EEAD4]/60
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#0F1B2D]

            sm:px-6
            sm:py-5
          "
        >
          <span
            className={`text-[13.5px] font-bold tracking-[-0.01em] transition-colors duration-300 sm:text-[14.5px] ${
              isOpen ? "text-white" : "text-white/80"
            }`}
          >
            {question}
          </span>

          <ChevronDown
            aria-hidden="true"
            size={18}
            strokeWidth={2}
            className={`shrink-0 text-[#5EEAD4] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: EASE,
            }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[13px] font-medium leading-6 text-white/60 sm:px-6 sm:pb-6 sm:text-[13.5px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="contact-faq"
      className="
        relative
        isolate
        w-full
        min-w-0
        overflow-hidden
        bg-[#0F1B2D]
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
          left-[-160px]
          bottom-[-120px]
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#00CDB5]/[0.045]
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
          max-w-[900px]
          px-5
          sm:px-7
          md:px-10
          lg:px-12
          xl:px-16
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-10 max-w-[640px] text-center sm:mb-12 lg:mb-14"
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
              Common Questions
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
              sm:text-[2.5rem]
              lg:text-[2.8rem]
            "
          >
            Frequently{" "}
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
              asked questions.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
