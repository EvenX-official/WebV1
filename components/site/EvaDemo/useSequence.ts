"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives the hero demo's beat-by-beat state.
 * Each beat's `at` is milliseconds from the start of the sequence.
 * When a `beat` value >= step.at, that step is considered active.
 */
export type Beat =
  | "idle"
  | "typing"
  | "analysing"
  | "structure"
  | "timeline"
  | "budget"
  | "tasks"
  | "vendors"
  | "risks"
  | "ready";

const SCHEDULE: { beat: Beat; at: number }[] = [
  { beat: "idle", at: 0 },
  { beat: "typing", at: 200 },
  { beat: "analysing", at: 2200 },
  { beat: "structure", at: 2900 },
  { beat: "timeline", at: 3600 },
  { beat: "budget", at: 4300 },
  { beat: "tasks", at: 5000 },
  { beat: "vendors", at: 5900 },
  { beat: "risks", at: 6700 },
  { beat: "ready", at: 7500 },
];

const ORDER: Beat[] = SCHEDULE.map((s) => s.beat);
const rank = (b: Beat) => ORDER.indexOf(b);

/** Returns true once we're at or past `b` in the sequence. */
export function useSequence({
  reduced,
  playKey,
}: {
  reduced: boolean;
  playKey: number;
}) {
  const [beat, setBeat] = useState<Beat>(reduced ? "ready" : "idle");
  const startedAt = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setBeat("ready");
      return;
    }
    setBeat("idle");
    startedAt.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      // pick the latest scheduled beat that has fired
      let current: Beat = "idle";
      for (const s of SCHEDULE) if (elapsed >= s.at) current = s.beat;
      setBeat((prev) => (prev === current ? prev : current));
      if (elapsed < SCHEDULE[SCHEDULE.length - 1].at + 100) {
        rafId.current = requestAnimationFrame(tick);
      }
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduced, playKey]);

  const at = (b: Beat) => rank(beat) >= rank(b);
  return { beat, at };
}
