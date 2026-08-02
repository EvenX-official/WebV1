"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  Wallet,
  CheckSquare,
  Store,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Section } from "./Section";
import { EASE, useReducedMotion } from "@/lib/motion";

type Module = {
  icon: typeof Wallet;
  title: string;
  copy: string;
  metric: string;
  metricLabel: string;
  visual: React.ReactNode;
};

const TimelineViz = () => (
  <div className="space-y-1.5">
    {[80, 65, 90, 50].map((w, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="w-8 text-[9px] text-content-subtle">D{i + 1}</span>
        <div className="flex-1 h-2 rounded-full bg-surface-subtle overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${w}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className="h-full bg-brand-blue rounded-full"
          />
        </div>
      </div>
    ))}
  </div>
);

const BudgetViz = () => (
  <div className="flex items-end gap-1.5 h-24">
    {[42, 66, 58, 84, 72, 90].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i }}
        className={`flex-1 rounded-sm ${i === 3 ? "bg-brand-blue" : "bg-brand-blue/30"}`}
      />
    ))}
  </div>
);

const TaskViz = () => (
  <div className="space-y-1.5">
    {["Confirm venue", "Draft agenda", "Shortlist catering", "Book AV"].map((t, i) => (
      <motion.div
        key={t}
        initial={{ opacity: 0, x: -4 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.24, ease: EASE, delay: 0.06 * i }}
        className="flex items-center gap-2 text-[11px]"
      >
        <span
          className={`h-3 w-3 rounded-sm border ${
            i < 2 ? "bg-emerald-500 border-emerald-500" : "border-content-subtle"
          } grid place-items-center`}
        >
          {i < 2 && (
            <svg viewBox="0 0 8 8" className="h-2 w-2 text-white">
              <path d="M1 4 L3 6 L7 2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <span className={i < 2 ? "line-through text-content-subtle" : "text-content-strong"}>{t}</span>
      </motion.div>
    ))}
  </div>
);

const VendorViz = () => (
  <div className="flex -space-x-2">
    {[
      { i: "PS", tone: "bg-brand-blue-soft text-brand-blue-strong", ok: true },
      { i: "EE", tone: "bg-amber-100 text-amber-700" },
      { i: "MT", tone: "bg-brand-purple-soft text-violet-700" },
      { i: "CP", tone: "bg-emerald-50 text-emerald-700" },
      { i: "+3", tone: "bg-surface-subtle text-content-muted" },
    ].map((v, i) => (
      <motion.div
        key={v.i}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.28, ease: EASE, delay: 0.06 * i }}
        className={`relative h-9 w-9 rounded-full ring-2 ring-white grid place-items-center text-[11px] font-semibold ${v.tone}`}
      >
        {v.i}
        {v.ok && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />}
      </motion.div>
    ))}
  </div>
);

/** Live team-comms feed for the sampled Leadership Summit 2026 event. */
type Msg = {
  who: string;
  side: "eva" | "team";
  text: string;
};
const MESSAGES: Msg[] = [
  { who: "Eva",    side: "eva",  text: "Drafted invite for 350 attendees. Ready to send Thursday." },
  { who: "Sarah",  side: "team", text: "Approved. Let's go." },
  { who: "Eva",    side: "eva",  text: "Sponsor update drafted. 428 words, warm tone." },
  { who: "Marcus", side: "team", text: "Add the venue photo?" },
  { who: "Eva",    side: "eva",  text: "Updated with The Shard hero shot. Ready to review." },
  { who: "Sarah",  side: "team", text: "Perfect. Send it." },
  { who: "Eva",    side: "eva",  text: "Drafting speaker confirmation for Prof. Chen…" },
];

const CommsViz = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(1);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 2400);
    return () => clearInterval(id);
  }, [inView, reduced]);

  // Show the two most recent messages: current + previous.
  const visible = [0, 1].map((offset) => {
    const i = (idx - offset + MESSAGES.length * 4) % MESSAGES.length;
    return { ...MESSAGES[i], age: offset, key: `${idx}-${offset}` };
  });

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between text-[9px] text-content-subtle mb-1.5 px-0.5">
        <span className="font-medium">#leadership-summit-2026</span>
        <span className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
          live
        </span>
      </div>
      <div className="space-y-1 relative">
        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map((m) => {
              const isEva = m.side === "eva";
              return (
                <motion.div
                  key={m.key}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 6, filter: "blur(3px)" }}
                  animate={{
                    opacity: m.age === 0 ? 1 : 0.55,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={reduced ? undefined : { opacity: 0, y: -4, filter: "blur(3px)" }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className={`rounded-lg px-2 py-1 text-[10.5px] leading-snug max-w-[86%] ${
                    isEva
                      ? "bg-ink-900 text-content-onDark"
                      : "bg-surface-muted text-content-strong ml-auto"
                  }`}
                >
                  <div className="text-[9px] opacity-60 mb-0.5">{m.who}</div>
                  {m.text}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AnalyticsViz = () => {
  const points = [10, 24, 18, 34, 40, 52, 68];
  const max = 70;
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
      <defs>
        <linearGradient id="ana" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        d={
          "M 0 " +
          (80 - (points[0] / max) * 70) +
          points
            .slice(1)
            .map((p, i) => ` L ${((i + 1) / (points.length - 1)) * 200} ${80 - (p / max) * 70}`)
            .join("")
        }
        stroke="#2563EB"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        d={
          "M 0 " +
          (80 - (points[0] / max) * 70) +
          points
            .slice(1)
            .map((p, i) => ` L ${((i + 1) / (points.length - 1)) * 200} ${80 - (p / max) * 70}`)
            .join("") +
          " L 200 80 L 0 80 Z"
        }
        fill="url(#ana)"
      />
    </svg>
  );
};

const MODULES: Module[] = [
  { icon: CalendarClock, title: "Timeline that self-heals", copy: "Push a phase and every downstream task re-flows. No stale plans.", metric: "22", metricLabel: "dependencies resolved", visual: <TimelineViz /> },
  { icon: Wallet, title: "Budget in real time", copy: "POs, quotes and contracts land in the right line. Variance flagged instantly.", metric: "£4.2k", metricLabel: "under plan today", visual: <BudgetViz /> },
  { icon: CheckSquare, title: "Tasks with an owner", copy: "Eva generates the plan, assigns owners and follows up so nothing goes cold.", metric: "34", metricLabel: "tasks · 7 owners", visual: <TaskViz /> },
  { icon: Store, title: "Vendors, ranked and replied", copy: "Send an RFP, triage responses, and shortlist without a spreadsheet.", metric: "7", metricLabel: "vendors shortlisted", visual: <VendorViz /> },
  { icon: MessageSquare, title: "Comms, drafted for you", copy: "Eva drafts every invite, update and follow-up. Your team edits and sends.", metric: "3.4×", metricLabel: "faster than email chains", visual: <CommsViz /> },
  { icon: BarChart3, title: "Reports that stay live", copy: "Portfolio health for every event, refreshed as your team works.", metric: "0", metricLabel: "manual roll-ups", visual: <AnalyticsViz /> },
];

export function Modules() {
  return (
    <Section
      id="modules"
      eyebrow="Every layer, animated"
      title="A workspace made of surfaces built for events."
      intro="Timeline, budget, tasks, vendors, comms and reports. Each purpose-built, all connected, all kept alive by Eva."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((m, i) => (
          <motion.article
            key={m.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, ease: EASE, delay: (i % 3) * 0.06 }}
            className="rounded-2xl border border-surface-border bg-white p-5 hover:shadow-card transition-shadow group"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 shrink-0 rounded-lg bg-brand-blue-soft text-brand-blue-strong grid place-items-center">
                <m.icon className="h-4 w-4" strokeWidth={2.2} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-content-strong leading-snug">{m.title}</h3>
                <p className="mt-1 text-[13px] text-content-muted leading-snug">{m.copy}</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-surface-border bg-surface-muted/40 p-4 min-h-[104px] flex items-center">
              <div className="w-full">{m.visual}</div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[22px] font-semibold text-content-strong tabular-nums">{m.metric}</span>
              <span className="text-[11px] text-content-subtle uppercase tracking-wide">{m.metricLabel}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
