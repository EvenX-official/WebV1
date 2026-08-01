"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, TrendingUp, Users } from "lucide-react";
import { EASE } from "@/lib/motion";

/** Shared card scaffold */
function PanelHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[12px] font-semibold text-content-strong">{title}</span>
      <span className="text-[11px] text-content-subtle">{meta}</span>
    </div>
  );
}

export function TimelinePanel() {
  const phases = [
    { l: "Registration", w: 8, tone: "bg-brand-blue" },
    { l: "Keynote", w: 14, tone: "bg-brand-purple" },
    { l: "Workshops", w: 22, tone: "bg-brand-blue/70" },
    { l: "Lunch", w: 8, tone: "bg-amber-400" },
    { l: "Panel", w: 14, tone: "bg-brand-purple/70" },
    { l: "Networking", w: 12, tone: "bg-emerald-400" },
    { l: "Close", w: 8, tone: "bg-brand-blue-strong" },
  ];
  return (
    <div className="p-5">
      <PanelHeader title="Two-day summit timeline" meta="14 to 15 October" />
      <div className="space-y-2.5">
        {["Day 1 · Wed", "Day 2 · Thu"].map((day, di) => (
          <div key={day}>
            <div className="text-[10px] uppercase tracking-wide text-content-subtle mb-1">{day}</div>
            <div className="flex gap-[3px] h-8 rounded-md bg-surface-subtle p-[3px]">
              {phases.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ flexBasis: 0, opacity: 0 }}
                  animate={{ flexBasis: `${p.w * 4}%`, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i + di * 0.15 }}
                  className={`${p.tone} rounded-[3px] min-w-0 relative group`}
                >
                  <span className="absolute inset-0 grid place-items-center text-[9px] font-medium text-white/90 truncate px-1">
                    {p.l}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-[11px]">
        {[
          { l: "Phases", v: "14" },
          { l: "Owners", v: "7" },
          { l: "Dependencies", v: "22" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-surface-border bg-surface-muted/50 p-2.5">
            <div className="text-[9px] uppercase tracking-wide text-content-subtle">{s.l}</div>
            <div className="text-[15px] font-semibold text-content-strong tabular-nums">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BudgetPanel() {
  const rows = [
    { cat: "Venue", n: 84000, pct: 34, tone: "bg-brand-blue" },
    { cat: "Catering", n: 52000, pct: 21, tone: "bg-amber-400", warn: true },
    { cat: "AV & staging", n: 38000, pct: 15, tone: "bg-brand-purple" },
    { cat: "Speakers", n: 30000, pct: 12, tone: "bg-emerald-400" },
    { cat: "Travel", n: 24000, pct: 10, tone: "bg-brand-blue/60" },
    { cat: "Other", n: 20400, pct: 8, tone: "bg-content-subtle" },
  ];
  return (
    <div className="p-5">
      <PanelHeader title="Budget · Leadership Summit" meta="73% committed" />
      <div className="rounded-xl border border-surface-border bg-surface-muted/40 p-3 mb-3">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] text-content-subtle">Total</div>
          <div className="text-[10px] text-emerald-600 flex items-center gap-1"><TrendingUp className="h-3 w-3"/> £4,200 under plan</div>
        </div>
        <div className="text-[26px] font-semibold text-content-strong tabular-nums mt-0.5">£248,400</div>
        <div className="mt-2 h-1.5 rounded-full bg-surface-border overflow-hidden flex">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ flexBasis: 0 }}
              animate={{ flexBasis: `${r.pct}%` }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i }}
              className={r.tone}
            />
          ))}
        </div>
      </div>
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.li
            key={r.cat}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: EASE, delay: 0.15 + 0.04 * i }}
            className="flex items-center gap-3 text-[12px]"
          >
            <span className={`h-2 w-2 rounded-sm ${r.tone}`} />
            <span className="text-content-strong flex-1">{r.cat}</span>
            {r.warn && (
              <span className="text-[9px] font-medium rounded-full bg-amber-100 text-amber-700 px-1.5 py-0.5">
                12% over benchmark
              </span>
            )}
            <span className="tabular-nums text-content-muted">£{r.n.toLocaleString()}</span>
            <span className="tabular-nums text-content-subtle w-8 text-right">{r.pct}%</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function TasksPanel() {
  const tasks = [
    { t: "Confirm venue at The Shard", done: true, o: "HM" },
    { t: "Draft keynote agenda", done: true, o: "SR" },
    { t: "Shortlist catering vendors", done: false, o: "LK" },
    { t: "Book AV walkthrough", done: false, o: "TM", flag: true },
    { t: "Send save-the-date · 350 attendees", done: false, o: "AP" },
    { t: "Sign speaker contracts", done: false, o: "SR" },
    { t: "Confirm ground transport", done: false, o: "MT" },
  ];
  return (
    <div className="p-5">
      <PanelHeader title="Tasks · this week" meta="5 of 34 complete" />
      <ul className="space-y-1.5">
        {tasks.map((t, i) => (
          <motion.li
            key={t.t}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: EASE, delay: 0.05 * i }}
            className="group flex items-center gap-2 rounded-lg border border-transparent hover:border-surface-border hover:bg-surface-muted/40 px-2 py-1.5 text-[12px]"
          >
            {t.done ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.4} />
            ) : (
              <Circle className="h-3.5 w-3.5 text-content-subtle" />
            )}
            <span className={t.done ? "line-through text-content-subtle" : "text-content-strong"}>{t.t}</span>
            {t.flag && (
              <span className="text-[9px] font-medium rounded-full bg-amber-100 text-amber-700 px-1.5 py-0.5">
                at risk
              </span>
            )}
            <span className="ml-auto text-[9px] rounded-full bg-surface-subtle text-content-muted h-4 w-4 grid place-items-center font-medium">{t.o}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function VendorsPanel() {
  const vendors = [
    { n: "PixelStage AV", tag: "AV & staging", status: "Confirmed", tone: "bg-brand-blue-soft text-brand-blue-strong", init: "PS", ok: true },
    { n: "Elite Events Catering", tag: "Catering", status: "Reply awaited", tone: "bg-amber-100 text-amber-700", init: "EE" },
    { n: "Meridien Transport", tag: "Ground transport", status: "Shortlisted", tone: "bg-brand-purple-soft text-violet-700", init: "MT" },
    { n: "Cavendish Print", tag: "Signage & print", status: "RFP sent", tone: "bg-emerald-50 text-emerald-700", init: "CP" },
  ];
  return (
    <div className="p-5">
      <PanelHeader title="Vendor shortlist" meta="Ranked by Eva" />
      <ul className="space-y-2">
        {vendors.map((v, i) => (
          <motion.li
            key={v.n}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.05 * i }}
            className="flex items-center gap-3 rounded-lg border border-surface-border p-2.5"
          >
            <div className="relative">
              <div className={`h-8 w-8 rounded-lg grid place-items-center text-[10px] font-semibold ${v.tone}`}>{v.init}</div>
              {v.ok && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-content-strong">{v.n}</div>
              <div className="text-[10px] text-content-subtle">{v.tag}</div>
            </div>
            <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${v.ok ? "bg-emerald-50 text-emerald-700" : "bg-surface-subtle text-content-muted"}`}>
              {v.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function ApprovalsPanel() {
  const items = [
    { t: "Approve budget: Sales Training", meta: "Requested by Halm · Due soon", state: "pending" },
    { t: "Sign: Elite Events Catering", meta: "Contract · £52,000", state: "pending" },
    { t: "Review change: Annual All-Hands", meta: "Venue moved to 15 Sept", state: "approved" },
    { t: "Confirm: Hilton Leeds Conference", meta: "Sales Training · 15 Sept", state: "approved" },
  ];
  return (
    <div className="p-5">
      <PanelHeader title="Approvals · Action Centre" meta="2 need attention" />
      <ul className="space-y-2">
        {items.map((it, i) => (
          <motion.li
            key={it.t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.05 * i }}
            className="flex items-center gap-3 rounded-lg border border-surface-border p-2.5"
          >
            <span
              className={`h-2 w-2 rounded-full mt-1 ${it.state === "pending" ? "bg-red-500" : "bg-emerald-500"}`}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-content-strong truncate">{it.t}</div>
              <div className="text-[10px] text-content-subtle">{it.meta}</div>
            </div>
            {it.state === "pending" ? (
              <span className="text-[10px] font-medium rounded-full bg-red-50 text-red-700 px-2 py-0.5">Due soon</span>
            ) : (
              <span className="text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">Approved</span>
            )}
          </motion.li>
        ))}
      </ul>
      <div className="mt-4 rounded-lg bg-brand-blue-soft/60 border border-brand-blue/15 p-3 flex items-center gap-3">
        <Users className="h-4 w-4 text-brand-blue-strong" />
        <div className="text-[12px] text-brand-blue-strong">
          Eva routes each approval to the right person, in the right order.
        </div>
      </div>
    </div>
  );
}
