"use client";

import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { Beat } from "./useSequence";
import { ProgressRing } from "./ProgressRing";

export function EventCard({
  at,
  reduced,
}: {
  at: (b: Beat) => boolean;
  reduced: boolean;
}) {
  const visible = at("structure");
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="rounded-xl border border-surface-border bg-white p-3.5 flex items-center gap-3.5"
    >
      <div className="flex flex-col items-center justify-center rounded-lg bg-brand-blue-soft text-brand-blue-strong px-2.5 py-1.5 min-w-[46px]">
        <span className="text-[9px] font-semibold uppercase tracking-wide">Oct</span>
        <span className="text-[16px] font-semibold leading-none">14</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-content-strong truncate">
          Leadership Summit 2026
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-content-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> The Shard, London
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" /> 350 attendees · 2 days
          </span>
        </div>
      </div>
      <ProgressRing value={at("ready") ? 34 : at("vendors") ? 24 : at("tasks") ? 16 : at("budget") ? 10 : 0} />
    </motion.div>
  );
}
