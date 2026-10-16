"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen branded intro loader shown when website opens.
 * Features the circular BH Ventures logo badge with concentric orbital
 * loading rings, sleek progress bar, and dynamic percentage counter.
 */
export default function HomeLoader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Lock scroll while loader is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let v = 0;
    const interval = window.setInterval(() => {
      // Steady, smooth progression over ~1.8 seconds
      v = Math.min(100, v + Math.floor(Math.random() * 3) + 1);
      setN(v);
      if (v >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = prevOverflow || "";
        }, 350);
      }
    }, 35);

    return () => {
      window.clearInterval(interval);
      document.body.style.overflow = prevOverflow || "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="bh-home-loader"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.85, ease: CURTAIN_EASE },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07111E] text-white select-none overflow-hidden"
          /* One size scale for the whole loader: the badge is 28% of the
             screen's shorter side (130–260px), so it reads large on every
             device, including phones held sideways. Everything else is
             sized from it. */
          style={
            {
              "--badge": "clamp(130px, 28vmin, 260px)",
              "--bar": "min(clamp(240px, 62vmin, 540px), 82vw)",
            } as React.CSSProperties
          }
        >
          {/* Ambient background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[calc(var(--badge)*3.4)] w-[calc(var(--badge)*3.4)] max-h-[640px] max-w-[640px] rounded-full bg-gradient-to-tr from-[#14B8A6]/20 via-[#2EE6C5]/10 to-transparent blur-[120px]" />
          </div>

          {/* Central Logo & Loading Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -16 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            {/* Circular Logo Container matching requested design */}
            <div className="relative flex items-center justify-center">
              {/* Outer atmospheric blur */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-[calc(var(--badge)*1.45)] w-[calc(var(--badge)*1.45)] rounded-full bg-[#14B8A6]/20 blur-2xl"
              />

              {/* The teal circular ring surrounding the badge with a gap */}
              <div
                aria-hidden="true"
                className="absolute h-[calc(var(--badge)*1.2)] w-[calc(var(--badge)*1.2)] rounded-full border-[1.5px] border-[#2EE6C5] shadow-[0_0_22px_rgba(46,230,197,0.45)]"
              />

              {/* Rotating glowing highlight segment on the ring */}
              <div
                aria-hidden="true"
                className="absolute h-[calc(var(--badge)*1.2)] w-[calc(var(--badge)*1.2)] rounded-full border-t-[3px] border-[#5EEAD4] border-r-transparent border-b-transparent border-l-transparent animate-[spin_2.8s_linear_infinite]"
              />

              {/* The Inner Circular Logo Badge */}
              <div className="relative flex h-[var(--badge)] w-[var(--badge)] items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-[#0B1220] shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
                <Image
                  src="/images/bh-ventures-logo.jpeg"
                  alt="BH Ventures FZE - LLC"
                  width={420}
                  height={420}
                  priority
                  className="h-full w-full rounded-full object-cover"
                />

                {/* Glass sheen highlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.18] via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Loading Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-[calc(var(--badge)*0.32)] flex flex-col items-center w-full"
            >
              {/* Progress capsule bar */}
              <div className="relative h-2.5 sm:h-3 2xl:h-3.5 w-[var(--bar)] overflow-hidden rounded-full bg-white/[0.08] p-[2px] border border-white/[0.1] shadow-inner">
                <motion.div
                  className="relative h-full rounded-full bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#2EE6C5] shadow-[0_0_10px_rgba(46,230,197,0.7)]"
                  style={{
                    width: `${n}%`,
                    transition: "width 0.08s ease-out",
                  }}
                >
                  {/* Glowing lead point */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-white shadow-[0_0_10px_#5EEAD4]" />
                </motion.div>
              </div>

              {/* Status text + Percentage counter */}
              <div className="mt-3.5 flex w-[var(--bar)] items-center justify-between font-medium">
                <div className="flex items-center gap-2 text-white/70 tracking-[0.2em] text-[12px] sm:text-[13px] lg:text-[15px] 2xl:text-[16px]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EE6C5] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14B8A6]" />
                  </span>
                  <span>LOADING...</span>
                </div>

                <span className="font-mono text-[15px] sm:text-[17px] lg:text-[20px] 2xl:text-[22px] font-bold text-[#5EEAD4] tabular-nums drop-shadow-[0_0_8px_rgba(94,234,212,0.4)]">
                  {String(n).padStart(3, "0")}%
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
