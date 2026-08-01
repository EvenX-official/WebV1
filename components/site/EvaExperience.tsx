"use client";

import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  CalendarClock,
  Wallet,
  Store,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { EASE, useReducedMotion } from "@/lib/motion";

/* -------------------------------------------------------------------------- */
/* Activity feed: what Eva is doing right now                                  */
/* -------------------------------------------------------------------------- */

type Category = "timeline" | "budget" | "vendors" | "comms" | "risks" | "approvals";

const CATEGORY_META: Record<Category, { icon: typeof CalendarClock; label: string; tone: string; iconTone: string }> = {
  timeline:  { icon: CalendarClock,  label: "Timeline",  tone: "bg-brand-blue/15 text-brand-blue border-brand-blue/25",  iconTone: "text-brand-blue" },
  budget:    { icon: Wallet,         label: "Budget",    tone: "bg-amber-400/15 text-amber-300 border-amber-400/25",     iconTone: "text-amber-300" },
  vendors:   { icon: Store,          label: "Vendors",   tone: "bg-emerald-400/15 text-emerald-300 border-emerald-400/25", iconTone: "text-emerald-300" },
  comms:     { icon: MessageSquare,  label: "Comms",     tone: "bg-brand-purple/20 text-brand-purple border-brand-purple/30", iconTone: "text-brand-purple" },
  risks:     { icon: ShieldAlert,    label: "Risk",      tone: "bg-red-400/15 text-red-300 border-red-400/25",           iconTone: "text-red-300" },
  approvals: { icon: CheckCircle2,   label: "Approvals", tone: "bg-sky-400/15 text-sky-300 border-sky-400/25",           iconTone: "text-sky-300" },
};

const ACTIVITIES: { category: Category; text: string; hint?: string }[] = [
  { category: "vendors",   text: "PixelStage AV confirmed for both days",        hint: "shortlist ranked · 3 replies triaged" },
  { category: "budget",    text: "Catering quote 12% over benchmark. Flagged.",   hint: "£6,240 above the market average" },
  { category: "timeline",  text: "Rescheduled AV walkthrough to Wed 3pm",         hint: "avoids the keynote conflict · 4 owners notified" },
  { category: "comms",     text: "Drafted sponsor update, ready for your review", hint: "428 words · tone: warm, concise" },
  { category: "approvals", text: "Routed budget sign-off to Sarah",               hint: "due tomorrow · nudged if unopened by 4pm" },
  { category: "risks",     text: "Weather advisory noted for offsite reception",  hint: "wet-weather plan drafted, ready to trigger" },
  { category: "vendors",   text: "Nudged Meridien Transport for RFP reply",       hint: "response window closes in 6h" },
  { category: "timeline",  text: "Auto-reflowed 4 dependencies after venue swap", hint: "no downstream tasks slipped" },
];

/** How long each activity stays before the next appears. */
const ACTIVITY_MS = 2600;

function useActivityCarousel(active: boolean, reduced: boolean) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % ACTIVITIES.length), ACTIVITY_MS);
    return () => clearInterval(id);
  }, [active, reduced]);
  // return the 3 most recent activities, newest first
  return [0, 1, 2].map((offset) => {
    const i = (idx - offset + ACTIVITIES.length * 4) % ACTIVITIES.length;
    return { ...ACTIVITIES[i], age: offset, key: `${idx}-${offset}` };
  });
}

/* -------------------------------------------------------------------------- */
/* Insight tiles: live counters that periodically tick                         */
/* -------------------------------------------------------------------------- */

function LiveNumber({ target, active, format }: { target: number; active: boolean; format: (n: number) => string }) {
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!active) return;
    const c = animate(mv, target, { duration: 0.8, ease: EASE });
    return () => c.stop();
  }, [target, active, mv]);
  const t = useTransform(mv, (v) => format(v));
  return <motion.span>{t}</motion.span>;
}

function InsightTile({
  icon: Icon,
  label,
  targets,
  format,
  hint,
  active,
  reduced,
}: {
  icon: typeof CalendarClock;
  label: string;
  targets: number[];
  format: (n: number) => string;
  hint: string;
  active: boolean;
  reduced: boolean;
}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    const id = setInterval(() => setStep((s) => (s + 1) % targets.length), 4200);
    return () => clearInterval(id);
  }, [active, reduced, targets.length]);
  const target = targets[step];
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 min-h-[76px]">
      <div className="flex items-center gap-1.5 text-content-onDark-muted text-[10px] font-semibold uppercase tracking-wide">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-1 text-[18px] font-semibold text-content-onDark tabular-nums whitespace-nowrap">
        <LiveNumber target={target} active={active || reduced} format={format} />
      </div>
      <div className="mt-0.5 text-[10px] text-content-onDark-muted">{hint}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

function Uptime({ reduced }: { reduced: boolean }) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [reduced]);
  return <>{sec === 0 ? "just now" : sec < 60 ? `${sec}s ago` : `${Math.floor(sec / 60)}m ago`}</>;
}

export function EvaExperience() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });
  const activities = useActivityCarousel(inView, reduced);

  return (
    <section
      id="eva"
      ref={ref}
      className="relative overflow-hidden bg-ink-950 text-content-onDark py-28 md:py-36"
    >
      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 40% at 25% 30%, rgba(124,92,250,0.32), transparent 70%), radial-gradient(50% 40% at 78% 20%, rgba(37,99,235,0.32), transparent 70%), radial-gradient(40% 30% at 55% 95%, rgba(37,99,235,0.20), transparent 70%)",
        }}
      />
      {/* slow drifting grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <div className="text-center max-w-[820px] mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-content-onDark-muted">
            <Sparkles className="h-3 w-3 text-brand-purple" /> Meet Eva
          </div>
          <h2 className="mt-6 font-display text-[38px] sm:text-[46px] md:text-[56px] leading-[1.05] tracking-tightest font-semibold">
            Not a chatbot.<br className="hidden sm:inline" /> The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              operator
            </span>{" "}
            behind your event.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.6] text-content-onDark-muted max-w-[620px] mx-auto">
            Eva watches every surface of your event workspace and works ahead of your team,
            reconciling budgets, chasing vendors, flagging risks, drafting communications.
            Your team stays in control. Eva keeps things moving.
          </p>
        </div>

        {/* Console */}
        <div className="mt-14 mx-auto max-w-[880px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden shadow-eva">
          {/* header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[13px] font-medium">Eva · working</span>
              <span className="text-[11px] text-content-onDark-muted">
                across your workspace
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-content-onDark-muted">
              <span className="hidden sm:inline">last action</span>
              <span className="text-content-onDark">
                <Uptime reduced={reduced} />
              </span>
            </div>
          </div>

          {/* activity feed */}
          <div className="relative px-3 sm:px-5 pt-4 pb-2 min-h-[220px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-content-onDark-muted mb-3 px-1">
              Live activity
            </div>
            <ul className="relative space-y-2">
              <AnimatePresence initial={false}>
                {activities.map((a) => {
                  const meta = CATEGORY_META[a.category];
                  return (
                    <motion.li
                      key={a.key}
                      layout
                      initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{
                        opacity: a.age === 0 ? 1 : a.age === 1 ? 0.72 : 0.42,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                    >
                      <div
                        className={`shrink-0 h-7 w-7 rounded-lg grid place-items-center border ${meta.tone}`}
                      >
                        <meta.icon className={`h-3.5 w-3.5 ${meta.iconTone}`} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[10px] text-content-onDark-muted">
                          <span className="font-semibold uppercase tracking-wide">{meta.label}</span>
                          <span className="opacity-60">
                            {a.age === 0 ? "just now" : `${a.age * 3}s ago`}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[13px] text-content-onDark leading-snug">
                          {a.text}
                        </div>
                        {a.hint && a.age === 0 && (
                          <div className="mt-1 text-[11px] text-content-onDark-muted">
                            {a.hint}
                          </div>
                        )}
                      </div>
                      {a.age === 0 && !reduced && (
                        <motion.span
                          aria-hidden
                          className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>

          {/* insight strip */}
          <div className="border-t border-white/[0.06] px-3 sm:px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-content-onDark-muted mb-3 px-1">
              Today's insights
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <InsightTile
                icon={CalendarClock}
                label="Timeline"
                targets={[3, 4, 5, 6]}
                format={(n) => `${Math.round(n)} shifts`}
                hint="all downstream tasks reflowed"
                active={inView}
                reduced={reduced}
              />
              <InsightTile
                icon={Wallet}
                label="Budget"
                targets={[4200, 4400, 4800, 5200]}
                format={(n) => `£${Math.round(n).toLocaleString()}`}
                hint="saved vs plan today"
                active={inView}
                reduced={reduced}
              />
              <InsightTile
                icon={ShieldAlert}
                label="Risks"
                targets={[2, 3, 3, 4]}
                format={(n) => `${Math.round(n)} caught`}
                hint="mitigation drafted"
                active={inView}
                reduced={reduced}
              />
              <InsightTile
                icon={TrendingUp}
                label="Momentum"
                targets={[92, 94, 96, 97]}
                format={(n) => `${Math.round(n)}%`}
                hint="on-track score"
                active={inView}
                reduced={reduced}
              />
            </div>
          </div>
        </div>

        {/* footer note */}
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-content-onDark-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            Runs continuously across every event workspace
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-brand-purple" />
            Every action is reviewable, reversible, and traceable
          </span>
        </div>
      </div>
    </section>
  );
}
