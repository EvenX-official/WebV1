"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives the hero demo's beat-by-beat state.
 * Each beat's `at` is milliseconds from the start of a run.
 * When at or past a beat, that beat is considered active.
 * When the last beat finishes, the run pauses briefly then loops.
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
  { beat: "typing", at: 300 },
  { beat: "analysing", at: 2900 },
  { beat: "structure", at: 3900 },
  { beat: "timeline", at: 5100 },
  { beat: "budget", at: 6500 },
  { beat: "tasks", at: 8000 },
  { beat: "vendors", at: 9500 },
  { beat: "risks", at: 10900 },
  { beat: "ready", at: 12200 },
];

/** Time held on the final "ready" state before the sequence resets. */
const HOLD_MS = 5000;
/** Fade-out gap after HOLD; also the moment `beat` returns to `idle`. */
const RESET_MS = 500;

const ORDER: Beat[] = SCHEDULE.map((s) => s.beat);
const rank = (b: Beat) => ORDER.indexOf(b);

export function useSequence({
  reduced,
  playKey,
  loop = true,
}: {
  reduced: boolean;
  playKey: number;
  loop?: boolean;
}) {
  const [beat, setBeat] = useState<Beat>(reduced ? "ready" : "idle");
  const startedAt = useRef<number>(0);
  const rafId = useRef<number | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (reduced) {
      setBeat("ready");
      return;
    }
    setBeat("idle");
    startedAt.current = performance.now();

    const end = SCHEDULE[SCHEDULE.length - 1].at;

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      let current: Beat = "idle";
      for (const s of SCHEDULE) if (elapsed >= s.at) current = s.beat;
      setBeat((prev) => (prev === current ? prev : current));
      if (elapsed < end + 50) {
        rafId.current = requestAnimationFrame(tick);
      } else if (loop) {
        // hold the ready state, then reset to idle (fades everything out),
        // then start a new run after a short pause.
        timeoutId.current = setTimeout(() => {
          setBeat("idle");
          timeoutId.current = setTimeout(() => setRunKey((k) => k + 1), RESET_MS);
        }, HOLD_MS);
      }
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [reduced, playKey, runKey, loop]);

  const at = (b: Beat) => rank(beat) >= rank(b);
  return { beat, at, runKey };
}
