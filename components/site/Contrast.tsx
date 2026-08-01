"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FileSpreadsheet,
  Mail,
  MessageCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Section } from "./Section";
import { EASE, useReducedMotion } from "@/lib/motion";
import { Logo } from "./Logo";

/* -------------------------------------------------------------------------- */
/* LEFT — the way it works today (living chaos, but readable)                 */
/* -------------------------------------------------------------------------- */

type OldCard = {
  icon: typeof Mail;
  title: string;
  meta: string;
  tone: string;
  y: number;
  x: number;
  rotate: number;
  badge?: React.ReactNode;
  ping?: "red" | "amber";
};

function LiveCounter({ from, to, interval = 1600 }: { from: number; to: number; interval?: number }) {
  const [n, setN] = useState(from);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= to ? from : v + 1)), interval);
    return () => clearInterval(id);
  }, [from, to, interval]);
  return <>{n}</>;
}

function Ping({ tone = "red" }: { tone?: "red" | "amber" }) {
  const color = tone === "red" ? "bg-red-500" : "bg-amber-500";
  const ring = tone === "red" ? "bg-red-400" : "bg-amber-400";
  return (
    <span className="relative flex h-2 w-2">
      <span className={`absolute inline-flex h-full w-full rounded-full opacity-70 ${ring} animate-ping`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

const OLD: OldCard[] = [
  {
    icon: FileSpreadsheet,
    title: "Master Plan v14.xlsx",
    meta: "Edited by 4 people · conflict",
    tone: "text-emerald-700 bg-emerald-50",
    y: 8,
    x: -18,
    rotate: -4,
    badge: (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-600 px-1.5 py-0.5 text-[9px] font-medium">
        <AlertCircle className="h-2.5 w-2.5" /> conflict
      </span>
    ),
    ping: "red",
  },
  {
    icon: Mail,
    title: "Re: Re: catering follow-up",
    meta: "12 replies · 3 attachments",
    tone: "text-brand-blue bg-brand-blue-soft",
    y: 84,
    x: 40,
    rotate: 3,
    badge: (
      <span className="rounded-full bg-red-500 text-white text-[9px] font-semibold h-4 min-w-[16px] px-1 grid place-items-center">
        <LiveCounter from={12} to={16} interval={1400} />
      </span>
    ),
  },
  {
    icon: MessageCircle,
    title: "Summit — WhatsApp",
    meta: "unread messages",
    tone: "text-emerald-700 bg-emerald-50",
    y: 160,
    x: -36,
    rotate: -2,
    badge: (
      <span className="rounded-full bg-emerald-500 text-white text-[9px] font-semibold h-4 min-w-[16px] px-1 grid place-items-center">
        <LiveCounter from={38} to={44} interval={1100} />
      </span>
    ),
    ping: "amber",
  },
  {
    icon: FileText,
    title: "Vendor brief FINAL_v3.docx",
    meta: "Shared 8 days ago",
    tone: "text-amber-700 bg-amber-50",
    y: 236,
    x: 22,
    rotate: 4,
    badge: (
      <span className="rounded-full bg-amber-100 text-amber-700 text-[9px] font-medium px-1.5 py-0.5">
        outdated
      </span>
    ),
  },
];

function OldWay({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-[340px] rounded-2xl bg-surface-muted/70 border border-surface-border overflow-hidden">
      {/* subtle noise / grid so the panel doesn't read blank */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,15,23,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,15,23,0.03) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {OLD.map((c, i) => (
        <motion.div
          key={c.title}
          initial={reduced ? false : { opacity: 0, y: c.y + 12, rotate: c.rotate, x: c.x }}
          whileInView={{ opacity: 1, y: c.y, rotate: c.rotate, x: c.x }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.08 * i }}
          className="absolute left-1/2 top-2 w-[248px] -translate-x-1/2"
        >
          <motion.div
            animate={
              reduced
                ? undefined
                : { y: [0, -3, 0], rotate: [0, 0.6, 0] }
            }
            transition={{
              duration: 3.4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="rounded-xl border border-surface-border bg-white shadow-card px-3 py-2.5 flex items-center gap-3"
          >
            <div className={`relative h-8 w-8 rounded-lg grid place-items-center ${c.tone}`}>
              <c.icon className="h-4 w-4" />
              {c.ping && !reduced && (
                <span className="absolute -top-0.5 -right-0.5">
                  <Ping tone={c.ping} />
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-content-strong truncate">
                {c.title}
              </div>
              <div className="text-[11px] text-content-subtle truncate">{c.meta}</div>
            </div>
            {c.badge && <div className="shrink-0">{c.badge}</div>}
          </motion.div>
        </motion.div>
      ))}
      {/* soft top + bottom fade so cards feel like a stack, not a stage */}
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-surface-muted/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface-muted/70 to-transparent" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* RIGHT — with EvenX (living, syncing)                                        */
/* -------------------------------------------------------------------------- */

const SYNC_LINES = [
  "Timeline synced across owners",
  "Budget reconciled with each PO",
  "Vendor replies triaged automatically",
  "Approvals routed to the right person",
];

function LastSynced({ reduced }: { reduced: boolean }) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setSec((s) => (s >= 6 ? 0 : s + 1)), 1000);
    return () => clearInterval(id);
  }, [reduced]);
  return <>{sec === 0 ? "just now" : `${sec}s ago`}</>;
}

function EvenXWay({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
      className="relative h-[340px] rounded-2xl border border-surface-border bg-white shadow-card px-5 py-4 overflow-hidden"
    >
      {/* subtle brand wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 60% at 50% -10%, rgba(37,99,235,0.06), transparent 70%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1.5 text-[10px] text-content-subtle">
          {!reduced && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          )}
          Live · <LastSynced reduced={reduced} />
        </div>
      </div>

      {/* Eva island */}
      <div className="relative mt-3.5 rounded-xl bg-ink-900 text-content-onDark p-3.5 overflow-hidden">
        {/* soft aurora */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(80% 60% at 100% 0%, rgba(124,92,250,0.28), transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-2 text-[12px]">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Eva · orchestrating your event
        </div>
        <p className="relative mt-1.5 text-[12.5px] leading-snug text-content-onDark-muted">
          Plan, tasks, vendors, budget and comms — one workspace, kept live as
          your team works.
        </p>
      </div>

      {/* sync lines with a periodic sweep */}
      <ul className="relative mt-3.5 space-y-2 text-[12.5px]">
        {SYNC_LINES.map((line, i) => (
          <motion.li
            key={line}
            initial={reduced ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, ease: EASE, delay: 0.25 + i * 0.06 }}
            className="relative overflow-hidden rounded-md px-1 py-0.5 flex items-center gap-2 text-content-strong"
          >
            {!reduced && (
              <motion.span
                aria-hidden
                className="absolute inset-y-0 -left-[40%] w-[35%] bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent"
                animate={{ x: ["0%", "400%"] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.9,
                }}
              />
            )}
            <CheckCircle2 className="relative h-3.5 w-3.5 text-emerald-500 shrink-0" strokeWidth={2.4} />
            <span className="relative">{line}</span>
          </motion.li>
        ))}
      </ul>

      {/* tiny footer status */}
      <div className="absolute inset-x-5 bottom-3.5 flex items-center justify-between text-[10px] text-content-subtle">
        <span>1 workspace · 7 owners</span>
        <span>Everything in sync</span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Center arrow with a gentle repeating pulse                                  */
/* -------------------------------------------------------------------------- */

function CenterArrow({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex lg:flex-col items-center justify-center py-4 lg:py-0">
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute h-14 w-14 rounded-full bg-brand-blue/10"
          animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
        className="relative rounded-full bg-brand-blue text-white h-11 w-11 grid place-items-center rotate-90 lg:rotate-0 shadow-[0_10px_24px_-10px_rgba(37,99,235,0.6)]"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Contrast() {
  const reduced = useReducedMotion();
  return (
    <Section
      id="contrast"
      eyebrow="Why event teams switch"
      title={
        <>
          Corporate events are run across a dozen tools.
          <br className="hidden md:inline" /> EvenX collapses them into one.
        </>
      }
      intro="Spreadsheets, inboxes, chat threads, decks, docs — event teams spend more time reconciling tools than running the event. EvenX replaces the stack with a workspace built for how events actually run."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-stretch">
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
              The way it works today
            </span>
          </div>
          <OldWay reduced={reduced} />
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-content-muted">
            <span>Fragmented</span>
            <span className="text-content-subtle">·</span>
            <span>Reactive</span>
            <span className="text-content-subtle">·</span>
            <span>Manual</span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <CenterArrow reduced={reduced} />
        </div>

        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue-strong">
              With EvenX
            </span>
          </div>
          <EvenXWay reduced={reduced} />
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-content-strong font-medium">
            <span>Orchestrated</span>
            <span className="text-content-subtle">·</span>
            <span>Intelligent</span>
            <span className="text-content-subtle">·</span>
            <span>Alive</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
