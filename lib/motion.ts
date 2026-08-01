"use client";

import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const DUR = {
  fast: 0.18,
  base: 0.32,
  slow: 0.64,
  narrative: 0.9,
} as const;

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE, delay },
  },
});

export const stagger = (stagger = 0.06, delayChildren = 0): Transition => ({
  staggerChildren: stagger,
  delayChildren,
});

/** Prefers-reduced-motion hook. Returns true when user has requested reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}
