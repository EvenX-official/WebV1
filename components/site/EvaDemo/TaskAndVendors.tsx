"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { Beat } from "./useSequence";

const TASKS = [
  { title: "Confirm venue — The Shard", done: true, owner: "HM" },
  { title: "Draft agenda · day 1 keynote", done: true, owner: "SR" },
  { title: "Shortlist catering vendors", done: false, owner: "LK" },
  { title: "Book AV walkthrough", done: false, owner: "TM", flagged: true },
  { title: "Send save-the-date to 350 attendees", done: false, owner: "AP" },
];

const VENDORS = [
  { name: "Elite Events Catering", tag: "Catering", confirmed: false, initials: "EE", tone: "bg-amber-100 text-amber-700" },
  { name: "PixelStage AV", tag: "AV & staging", confirmed: true, initials: "PS", tone: "bg-brand-blue-soft text-brand-blue-strong" },
  { name: "Meridien Transport", tag: "Ground transport", confirmed: false, initials: "MT", tone: "bg-brand-purple-soft text-violet-700" },
];

export function TaskAndVendors({
  at,
  reduced,
}: {
  at: (b: Beat) => boolean;
  reduced: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
      {/* Tasks */}
      <div className="rounded-xl border border-surface-border bg-white p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-content-subtle">
            Tasks · today
          </span>
          <span className="text-[10px] text-content-subtle">7 owners</span>
        </div>
        <ul className="space-y-1.5">
          {TASKS.map((t, i) => (
            <motion.li
              key={t.title}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={at("tasks") ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.28, ease: EASE, delay: reduced ? 0 : 0.06 * i }}
              className="flex items-center gap-2 text-[12px]"
            >
              {t.done ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.4} />
              ) : (
                <Circle className="h-3.5 w-3.5 text-content-subtle" />
              )}
              <span
                className={
                  t.done
                    ? "line-through text-content-subtle truncate"
                    : "text-content-strong truncate"
                }
              >
                {t.title}
              </span>
              {t.flagged && (
                <span className="ml-auto text-[9px] font-medium rounded-full bg-amber-100 text-amber-700 px-1.5 py-0.5">
                  at risk
                </span>
              )}
              <span
                className={`shrink-0 ml-${t.flagged ? "1.5" : "auto"} text-[9px] rounded-full bg-surface-subtle text-content-muted h-4 w-4 grid place-items-center font-medium`}
              >
                {t.owner}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Vendors */}
      <div className="rounded-xl border border-surface-border bg-white p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-content-subtle">
            Vendors
          </span>
          <span className="text-[10px] text-content-subtle">Shortlisted by Eva</span>
        </div>
        <ul className="space-y-2">
          {VENDORS.map((v, i) => (
            <motion.li
              key={v.name}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={at("vendors") ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.32, ease: EASE, delay: reduced ? 0 : 0.08 * i }}
              className="flex items-center gap-2.5"
            >
              <div className="relative">
                <div
                  className={`h-7 w-7 rounded-lg grid place-items-center text-[10px] font-semibold ${v.tone}`}
                >
                  {v.initials}
                </div>
                {v.confirmed && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-content-strong truncate">
                  {v.name}
                </div>
                <div className="text-[10px] text-content-subtle">{v.tag}</div>
              </div>
              <span
                className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${
                  v.confirmed
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-surface-subtle text-content-muted"
                }`}
              >
                {v.confirmed ? "Confirmed" : "Awaiting reply"}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
