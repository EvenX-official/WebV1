"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { Beat } from "./useSequence";

/**
 * Two-day timeline. Each phase is a coloured chip whose width scales in
 * from 0 to its target when the timeline beat fires.
 */
const PHASES = [
  { label: "Registration", width: 12, tone: "bg-brand-blue" },
  { label: "Keynote", width: 18, tone: "bg-brand-purple" },
  { label: "Workshops", width: 20, tone: "bg-brand-blue/70" },
  { label: "Lunch", width: 10, tone: "bg-amber-400" },
  { label: "Panel", width: 15, tone: "bg-brand-purple/70" },
  { label: "Networking", width: 12, tone: "bg-emerald-400" },
  { label: "Close", width: 13, tone: "bg-brand-blue-strong" },
];

export function TimelineBar({
  at,
  reduced,
}: {
  at: (b: Beat) => boolean;
  reduced: boolean;
}) {
  const on = at("timeline");
  return (
    <div className="rounded-xl border border-surface-border bg-white p-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-content-subtle">
          Timeline
        </span>
        <span className="text-[10px] text-content-subtle">14 to 15 Oct</span>
      </div>
      <div className="flex flex-col gap-2">
        {["Day 1", "Day 2"].map((day, di) => (
          <div key={day} className="flex items-center gap-2">
            <span className="w-9 shrink-0 text-[10px] font-medium text-content-muted">{day}</span>
            <div className="flex-1 h-6 rounded-md bg-surface-subtle overflow-hidden flex gap-[2px] p-[2px]">
              {PHASES.map((p, i) => (
                <motion.div
                  key={`${day}-${i}`}
                  initial={reduced ? false : { flexBasis: 0 }}
                  animate={{ flexBasis: on ? `${p.width}%` : 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: reduced ? 0 : 0.05 * i + di * 0.15,
                  }}
                  className={`${p.tone} rounded-[3px] h-full min-w-0`}
                  title={p.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
