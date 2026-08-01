"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Mail, MessageCircle, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";
import { EASE } from "@/lib/motion";
import { Logo } from "./Logo";

const OLD_TOOLS = [
  { icon: FileSpreadsheet, label: "Master Plan v14.xlsx", meta: "Edited by 4 people", tone: "text-emerald-600 bg-emerald-50", rotate: -3, y: 0, x: 0 },
  { icon: Mail, label: "Re: Re: catering follow-up", meta: "12 replies · 3 attachments", tone: "text-brand-blue bg-brand-blue-soft", rotate: 2, y: 24, x: 40 },
  { icon: MessageCircle, label: "Summit — WhatsApp", meta: "38 unread", tone: "text-emerald-700 bg-emerald-50", rotate: -1.5, y: 56, x: -20 },
  { icon: FileText, label: "Vendor brief FINAL_v3.docx", meta: "Shared 8 days ago", tone: "text-amber-700 bg-amber-50", rotate: 3, y: 88, x: 30 },
];

export function Contrast() {
  return (
    <Section
      id="contrast"
      eyebrow="Why event teams switch"
      title={<>Corporate events are run across a dozen tools.<br className="hidden md:inline"/> EvenX collapses them into one.</>}
      intro="Spreadsheets, inboxes, chat threads, decks, docs — event teams spend more time reconciling tools than running the event. EvenX replaces the stack with a workspace built for how events actually run."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
        {/* Old way */}
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
              The way it works today
            </span>
          </div>
          <div className="relative h-[360px] rounded-2xl bg-surface-muted/60 border border-surface-border overflow-hidden">
            {OLD_TOOLS.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20, rotate: t.rotate }}
                whileInView={{ opacity: 1, y: t.y, rotate: t.rotate }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 * i }}
                style={{ transformOrigin: "center" }}
                className="absolute left-1/2 top-8 -translate-x-1/2 w-[280px] rounded-xl border border-surface-border bg-white shadow-card p-3 flex items-center gap-3"
              >
                <div className={`h-8 w-8 rounded-lg grid place-items-center ${t.tone}`}>
                  <t.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-content-strong truncate">{t.label}</div>
                  <div className="text-[11px] text-content-subtle truncate">{t.meta}</div>
                </div>
              </motion.div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-content-muted">
            <span>Fragmented</span>
            <span>·</span>
            <span>Reactive</span>
            <span>·</span>
            <span>Manual</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="lg:col-span-2 flex lg:flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="rounded-full bg-brand-blue-soft text-brand-blue-strong h-10 w-10 grid place-items-center rotate-90 lg:rotate-0"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </motion.div>
        </div>

        {/* EvenX way */}
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue-strong">
              With EvenX
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
            className="relative h-[360px] rounded-2xl border border-surface-border bg-white shadow-card p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <span className="text-[11px] text-content-subtle">Leadership Summit 2026</span>
            </div>
            <div className="mt-4 rounded-xl bg-ink-900 text-content-onDark p-4">
              <div className="flex items-center gap-2 text-[12px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Eva · orchestrating your event
              </div>
              <p className="mt-2 text-[13px] leading-snug text-content-onDark-muted">
                Plan, tasks, vendors, budget and comms — all live in one workspace,
                updated as your team works.
              </p>
            </div>
            <ul className="mt-4 space-y-2 text-[13px]">
              {[
                "Timeline synced across owners",
                "Budget reconciled with each PO",
                "Vendor replies triaged automatically",
                "Approvals routed to the right person",
              ].map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, ease: EASE, delay: 0.35 + i * 0.06 }}
                  className="flex items-center gap-2 text-content-strong"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2.4} />
                  {line}
                </motion.li>
              ))}
            </ul>
          </motion.div>
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
