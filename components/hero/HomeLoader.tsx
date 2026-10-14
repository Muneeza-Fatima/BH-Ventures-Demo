"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Full-screen intro loader shown once per visit on the home page.
 * Counts from 000 → 100, then wipes the curtain upward to reveal the site.
 * Stored in sessionStorage so it only plays on the very first load of the
 * session — navigating back to "/" won't replay it.
 */
export default function HomeLoader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(true); // default true avoids SSR flash

  useEffect(() => {
    // Play on every page load / refresh
    setSkip(false);

    // Lock scroll while loader is visible
    document.body.style.overflow = "hidden";

    let v = 0;
    const id = window.setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9));
      setN(v);
      if (v === 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 400);
      }
    }, 50);

    return () => {
      window.clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="home-loader"
          style={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: CURTAIN_EASE }}
          className="
            fixed inset-0 z-[9999]
            grid place-items-center
            bg-[#060D18]
            text-white
            select-none
          "
        >
          {/* BH VENTURES — letter-by-letter reveal */}
          <div
            aria-label="BH Ventures"
            className="flex overflow-hidden pb-[0.1em] pt-[0.1em]"
            style={{
              fontSize: "clamp(2.4rem, 9vw, 7rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
            }}
          >
            {"BH VENTURES".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: CURTAIN_EASE,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Counter — bottom-right */}
          <span
            className="absolute bottom-6 right-7 font-bold tabular-nums"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              color: "#5EEAD4",
            }}
          >
            {String(n).padStart(3, "0")}
          </span>

          {/* Progress bar — bottom edge */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
            style={{
              background: "linear-gradient(90deg, #14B8A6, #5EEAD4)",
              transform: `scaleX(${n / 100})`,
              transition: "transform 0.05s linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
