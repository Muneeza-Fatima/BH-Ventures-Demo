"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hydration-safe wrapper around `useReducedMotion`.
 *
 * During SSR, `useReducedMotion()` returns `null`. On clients with
 * `prefers-reduced-motion: reduce` enabled (common on Windows with animation
 * effects disabled), it returns `true` immediately on the client.
 *
 * If components conditionally render DOM elements or change animation props
 * directly based on `useReducedMotion()`, the client VDOM diverges from
 * server HTML during initial hydration, causing a React hydration mismatch error.
 *
 * This hook guarantees `false` during SSR and initial client hydration, then
 * switches to the true user preference after mount.
 */
export function useHydratedReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? !!prefersReduced : false;
}
