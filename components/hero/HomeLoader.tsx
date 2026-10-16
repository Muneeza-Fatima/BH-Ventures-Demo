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
      // Smooth natural progression
      v = Math.min(100, v + Math.ceil(Math.random() * 8) + 1);
      setN(v);
      if (v >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = prevOverflow || "";
        }, 350);
      }
    }, 45);

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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060D18] text-white select-none overflow-hidden"
        >
          {/* Ambient background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#14B8A6]/18 via-[#2EE6C5]/10 to-transparent blur-[120px]" />
          </div>

          {/* Subtle tech background grid pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Central Logo & Loading Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -18 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            {/* Circular Logo Container with Concentric Glowing Orbital Rings */}
            <div className="relative flex items-center justify-center">
              {/* Outer-most ambient ring */}
              <div
                aria-hidden="true"
                className="absolute h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full border border-[#2EE6C5]/15 border-dashed animate-[spin_20s_linear_infinite]"
              />

              {/* Main glowing teal orbital ring (matching user screenshot) */}
              <div
                aria-hidden="true"
                className="absolute h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full border-2 border-[#2EE6C5]/85 shadow-[0_0_22px_rgba(46,230,197,0.45)]"
              />

              {/* Rotating glowing accent on the orbital ring */}
              <div
                aria-hidden="true"
                className="absolute h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-full border-t-2 border-[#5EEAD4] border-r-transparent border-b-transparent border-l-transparent animate-[spin_3s_linear_infinite]"
              />

              {/* Soft pulsing backlight glow */}
              <div
                aria-hidden="true"
                className="absolute h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full bg-[#14B8A6]/20 blur-xl animate-pulse"
              />

              {/* The Circular Medallion Logo */}
              <div className="relative flex h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 items-center justify-center rounded-full overflow-hidden border border-white/[0.12] bg-[#0E1B2B] shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_25px_rgba(46,230,197,0.18)]">
                <Image
                  src="/images/bh-ventures-circle-logo.png"
                  alt="BH Ventures"
                  width={224}
                  height={224}
                  priority
                  className="h-full w-full object-cover"
                />

                {/* Subtle sheen highlight on the circle */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.12] via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Loading Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-9 flex flex-col items-center w-full"
            >
              {/* Progress capsule bar */}
              <div className="relative h-2 w-64 sm:w-80 max-w-[82vw] overflow-hidden rounded-full bg-white/[0.07] p-[2px] border border-white/[0.1] shadow-inner backdrop-blur-sm">
                <motion.div
                  className="relative h-full rounded-full bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#2EE6C5] shadow-[0_0_12px_rgba(46,230,197,0.7)]"
                  style={{
                    width: `${n}%`,
                    transition: "width 0.08s ease-out",
                  }}
                >
                  {/* Glowing lead point */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-[0_0_10px_#5EEAD4]" />
                </motion.div>
              </div>

              {/* Status text + Percentage counter */}
              <div className="mt-3.5 flex w-64 sm:w-80 max-w-[82vw] items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2 text-white/60 tracking-wider text-[11px] sm:text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EE6C5] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14B8A6]" />
                  </span>
                  <span>LOADING...</span>
                </div>

                <span className="font-mono text-sm sm:text-base font-bold text-[#5EEAD4] tabular-nums drop-shadow-[0_0_8px_rgba(94,234,212,0.4)]">
                  {String(n).padStart(3, "0")}%
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom subtle label */}
          <div className="absolute bottom-6 text-[10px] sm:text-[11px] tracking-widest text-white/30 uppercase font-medium">
            BH Ventures FZE - LLC
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
