"use client";

import { useCallback, useEffect, useRef, type PointerEvent } from "react";

/* ============================================================
   CARD SPOTLIGHT
   Tracks the pointer over a card and writes its position as
   --mx / --my on the element, which the `.spot-card::after`
   radial gradient in app/about/about.css reads. Writes go
   straight to the DOM once per frame — no React state, so the
   cards never re-render while the pointer moves.

   The handlers act on e.currentTarget, so one hook call can be
   spread onto every card in a mapped grid. The ref is there for
   a single element that wants it; it isn't required.
============================================================ */

export function useCardSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerMove = useCallback((e: PointerEvent<T>) => {
    // Touch has no hover; the glow would only flash under a tap.
    if (e.pointerType === "touch") return;

    const el = e.currentTarget;
    const { clientX, clientY } = e;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  // Drop any pending write so the glow fades out where it last was.
  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
