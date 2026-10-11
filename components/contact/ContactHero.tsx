"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const heroFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["700", "800"] });

/** Shared by the other contact components. Uses the site's own font, no extra font loading. */
export const DISPLAY = "font-bold";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const THOUGHTS = [
  "Start a partnership",
  "Source products from Dubai",
  "Build a digital product",
  "Launch a brand in new markets",
  "Grow with data and marketing",
  "Something I can't name yet",
];

const WORDS = ["Let's", "talk."];

function Letter({ ch, ci, count, word, still, i }: { ch: string; ci: number; count: number; word: number; still: boolean; i: number }) {
  // Word 1 is white, word 2 is solid mint, like the "Technology." line on the About page
  const style =
    word === 0
      ? { color: "#FFFFFF" }
      : { color: "#5EEAD4" };
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.2, y: 80, rotate: i % 2 ? 14 : -14 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 11, delay: 0.1 + i * 0.07 }}
      whileHover={{ scale: 1.15, y: -14, rotate: i % 2 ? 6 : -6 }}
      className="inline-block cursor-pointer"
    >
      <motion.span
        animate={still ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 3 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        className="block"
        style={style}
      >
        {ch}
      </motion.span>
    </motion.span>
  );
}

/* A soap bubble you can pop; it drifts back a moment later */
function Soap({ x, y, size, delay, dur }: { x: string; y: string; size: number; delay: number; dur: number }) {
  const [popped, setPopped] = useState(false);
  const pop = () => { setPopped(true); setTimeout(() => setPopped(false), 2600); };
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <AnimatePresence>
        {!popped && (
          <motion.button
            type="button"
            aria-label="Pop bubble"
            onClick={pop}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1, y: [0, -26, 0], x: [0, 10, 0] }}
            exit={{ opacity: 0, scale: 1.7, transition: { duration: 0.25 } }}
            transition={{ opacity: { delay }, scale: { delay, type: "spring" }, y: { duration: dur, repeat: Infinity, ease: "easeInOut" }, x: { duration: dur * 1.3, repeat: Infinity, ease: "easeInOut" } }}
            className="block cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            style={{
              width: size, height: size,
              background: "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.75) 0 7%, transparent 18%), radial-gradient(circle at 50% 50%, transparent 58%, rgba(94,234,212,0.28) 80%, rgba(56,189,248,0.5) 100%)",
              border: "1px solid rgba(190,255,245,0.35)",
              boxShadow: "inset 0 0 22px rgba(94,234,212,0.25), 0 0 30px rgba(45,212,191,0.15)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const SOAPS = [
  { x: "4%", y: "12%", size: 120, delay: 0.4, dur: 7 },
  { x: "78%", y: "6%", size: 150, delay: 0.7, dur: 8 },
  { x: "90%", y: "46%", size: 70, delay: 0.9, dur: 6 },
  { x: "58%", y: "58%", size: 54, delay: 1.1, dur: 5.5 },
  { x: "30%", y: "4%", size: 46, delay: 1.3, dur: 6.5 },
  { x: "8%", y: "58%", size: 80, delay: 1.0, dur: 7.5 },
];

export default function ContactHero() {
  const still = !!useReducedMotion();
  const pick = (topic: string) => window.dispatchEvent(new CustomEvent("contact:topic", { detail: topic }));

  return (
    <section id="contact-hero" className="relative isolate w-full overflow-hidden bg-[#0B1626] pb-24 pt-[110px] text-white lg:pt-[130px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[8%] h-[520px] w-[620px] rounded-full bg-[#14B8A6]/[0.16] blur-[140px]" />
        <div className="absolute right-[-6%] top-[30%] h-[480px] w-[480px] rounded-full bg-[#1D4ED8]/[0.2] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="absolute inset-0 z-0 hidden sm:block">
          {SOAPS.map((s, i) => <Soap key={i} {...s} />)}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1
            aria-label="Let's talk."
            className={`${heroFont.className} flex flex-wrap justify-center gap-x-[0.25em] text-[4rem] leading-[1.08] tracking-[-0.05em] sm:text-[7rem] lg:text-[9.6rem]`}
            style={{ filter: "drop-shadow(0 14px 36px rgba(45,212,191,0.22))" }}
          >
            {WORDS.map((w, wi) => (
              <span key={w} className="inline-flex">
                {w.split("").map((ch, ci) => (
                  <Letter key={ci} ch={ch} ci={ci} count={w.length} word={wi} still={still} i={wi * 6 + ci} />
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className={`${heroFont.className} mt-10 text-[1.3rem] font-bold leading-snug tracking-[-0.03em] text-white/90 sm:text-[2rem]`}
          >
            Tell us the dream. We&apos;ll build the road.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-4 max-w-[480px] text-[15.5px] font-medium leading-[1.75] text-white/60"
          >
            Pop a bubble for fun, or pick what&apos;s on your mind and we&apos;ll start your message for you.
          </motion.p>

          <ul className="mt-9 flex max-w-[900px] flex-wrap justify-center gap-3">
            {THOUGHTS.map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.08, duration: 0.6, ease: EASE }}>
                <button
                  type="button"
                  onClick={() => pick(t)}
                  className="group flex items-center gap-2.5 rounded-full border border-[#2DD4BF]/30 bg-[#0D1B2F]/70 px-5 py-3 text-[14px] font-semibold text-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur transition hover:-translate-y-1 hover:border-[#2DD4BF] hover:bg-[#14B8A6]/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DD4BF]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#2DD4BF] shadow-[0_0_12px_#2DD4BF] transition group-hover:scale-125" />
                  {t}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}