"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useHydratedReducedMotion } from "./useHydratedReducedMotion";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"] });

/** Shared by the other contact components. Uses the site's own font. */
export const DISPLAY = "font-bold";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TOPICS = ["partnership.", "trade.", "technology.", "growth."];

const NODES = [
  { label: "London", x: 78, y: 92, d: 0.2 },
  { label: "New York", x: 40, y: 190, d: 0.9 },
  { label: "Frankfurt", x: 120, y: 40, d: 1.6 },
  { label: "Riyadh", x: 250, y: 120, d: 0.5 },
  { label: "Karachi", x: 340, y: 168, d: 1.2 },
  { label: "Singapore", x: 330, y: 300, d: 1.9 },
];

/* Deterministic sparkles so server and client render the same thing */
const SPARKS = (() => {
  let s = 7;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 34 }, () => ({ x: r() * 100, y: r() * 100, size: 2 + r() * 3, dur: 2 + r() * 3.5, delay: r() * 4 }));
})();

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

function Network({ still }: { still: boolean }) {
  const C = 200;
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" role="img" aria-label="Dubai headquarters connected to markets worldwide">
      <defs>
        <radialGradient id="hubGlow">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r="120" fill="url(#hubGlow)" />
      {[70, 120, 175].map((r) => (
        <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="#2DD4BF" strokeOpacity="0.2" strokeDasharray="2 5" />
      ))}

      {/* orbiting ring with a travelling spark */}
      {!still && (
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "200px 200px" }}>
          <circle cx={C} cy={C} r="148" fill="none" stroke="#7DD3FC" strokeOpacity="0.35" />
          <circle cx={C + 148} cy={C} r="6" fill="#FFFFFF" />
          <circle cx={C + 148} cy={C} r="14" fill="#FFFFFF" fillOpacity="0.25" />
        </motion.g>
      )}

      {!still &&
        [0, 1, 2].map((i) => (
          <motion.circle key={i} cx={C} cy={C} fill="none" stroke="#99F6E4" strokeWidth="1.6"
            initial={{ r: 10, opacity: 0.9 }} animate={{ r: 190, opacity: 0 }}
            transition={{ duration: 4.5, delay: i * 1.5, repeat: Infinity, ease: "easeOut" }} />
        ))}

      {NODES.map((n, i) => (
        <g key={n.label}>
          <motion.line x1={C} y1={C} x2={n.x} y2={n.y} stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="3 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: EASE }} />
          {!still && (
            <motion.circle r="3.2" fill="#FFFFFF" initial={{ cx: C, cy: C, opacity: 0 }}
              animate={{ cx: [C, n.x], cy: [C, n.y], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, delay: 1.4 + n.d, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }} />
          )}
          <motion.circle cx={n.x} cy={n.y} r="5" fill="#5EEAD4" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + i * 0.12 }} />
          {!still && (
            <motion.circle cx={n.x} cy={n.y} fill="none" stroke="#99F6E4" strokeWidth="1.2"
              initial={{ r: 5, opacity: 0 }} animate={{ r: [5, 20], opacity: [0.9, 0] }}
              transition={{ duration: 2, delay: n.d + 2, repeat: Infinity, repeatDelay: 1.4 }} />
          )}
          <text x={n.x} y={n.y - 13} textAnchor="middle" fill="#FFFFFF" fillOpacity="0.7" fontSize="11.5" fontWeight="700">{n.label}</text>
        </g>
      ))}

      <circle cx={C} cy={C} r="10" fill="#FFFFFF" />
      <circle cx={C} cy={C} r="18" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" />
      <text x={C} y={C + 38} textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">Dubai HQ</text>
    </svg>
  );
}

export default function ContactHero() {
  const still = useHydratedReducedMotion();
  const [idx, setIdx] = useState(0);
  const mx = useMotionValue(400);
  const my = useMotionValue(300);
  const spot = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(45,212,191,0.16), transparent 62%)`;

  useEffect(() => {
    if (still) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TOPICS.length), 2400);
    return () => clearInterval(t);
  }, [still]);

  return (
    <section
      id="contact-hero"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}
      className={`${jakarta.className} relative isolate w-full overflow-hidden bg-[#060E1A] pb-20 pt-[130px] text-white lg:pb-24 lg:pt-[160px]`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div animate={still ? undefined : { x: [0, 120, -40, 0], y: [0, 60, -30, 0], scale: [1, 1.2, 0.95, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-20 top-[-10%] h-[560px] w-[620px] rounded-full bg-[#14B8A6]/[0.14] blur-[140px]" />
        <motion.div animate={still ? undefined : { x: [0, -140, 30, 0], y: [0, 80, -40, 0], scale: [1, 0.9, 1.2, 1] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[-8%] top-[5%] h-[520px] w-[560px] rounded-full bg-[#1D4ED8]/[0.18] blur-[140px]" />
        <motion.div animate={still ? undefined : { x: [0, 90, -90, 0], y: [0, -50, 40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-20%] left-[30%] h-[420px] w-[620px] rounded-full bg-[#14B8A6]/[0.08] blur-[140px]" />
        <motion.div style={{ background: spot }} className="absolute inset-0" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#5EEAD4 1px, transparent 1px), linear-gradient(90deg, #5EEAD4 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 40% 40%, #000 15%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at 40% 40%, #000 15%, transparent 75%)" }} />
        {SPARKS.map((p, i) => (
          <motion.span key={i} className="absolute rounded-full bg-[#5EEAD4] shadow-[0_0_10px_2px_rgba(94,234,212,0.6)]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={still ? { opacity: 0.4 } : { opacity: [0.1, 1, 0.1], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
        <div>
          <motion.div {...rise(0)} className="flex items-center gap-4">
            <span className="h-[2px] w-11 bg-[#2DD4BF]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#5EEAD4]">Dubai • UAE · Get in touch</span>
          </motion.div>

          <h1 aria-label="Let's talk" className="mt-8 text-[3.2rem] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-[4.8rem] lg:text-[6rem]">
            <span aria-hidden className="inline-flex flex-wrap overflow-hidden pb-[0.08em]">
              {"Let's talk".split("").map((ch, i) => (
                <motion.span key={i} initial={{ y: "110%", rotate: 8 }} animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.045, ease: EASE }} className="inline-block whitespace-pre">{ch}</motion.span>
              ))}
            </span>
            <span className="relative block h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={TOPICS[idx]}
                  initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }} animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }} exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: EASE }} className="absolute left-0 top-0">
                  <motion.span
                    animate={still ? undefined : { backgroundPosition: ["0% 50%", "300% 50%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundImage: "linear-gradient(90deg,#5EEAD4,#99F6E4,#38BDF8,#5EEAD4)", backgroundSize: "300% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
                  >
                    {TOPICS[idx]}
                  </motion.span>
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <motion.p {...rise(0.3)} className="mt-8 max-w-[560px] text-[1.1rem] font-medium leading-[1.75] text-white/70 sm:text-[1.2rem]">
            <span className="font-bold text-[#5EEAD4]">BH Ventures</span> answers partnership, trade and technology
            inquiries directly. Tell us what you&apos;re working on and a member of our team will reply, usually within the hour.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <motion.a href="#contact-form" whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#060E1A] shadow-[0_12px_40px_rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DD4BF]">
              {!still && <motion.span aria-hidden className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#2DD4BF]/40 to-transparent" initial={{ left: "-40%" }} animate={{ left: "140%" }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }} />}
              <span className="relative">Send a Message</span>
              <motion.span className="relative" animate={still ? undefined : { x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><ArrowRight size={16} strokeWidth={2.5} /></motion.span>
            </motion.a>
            <a href="mailto:info@bhventures.ae" className="group inline-flex items-center gap-2 text-[15px] font-bold text-white transition hover:text-[#5EEAD4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2DD4BF]">
              Email Us
              <ArrowRight size={15} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: EASE }} className="mx-auto aspect-square w-full max-w-[500px]">
          <motion.div animate={still ? undefined : { y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="h-full w-full">
            <Network still={still} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}