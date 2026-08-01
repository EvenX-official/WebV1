"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { AppFrame } from "./EvaDemo/AppFrame";
import { EASE } from "@/lib/motion";
import {
  TimelinePanel,
  BudgetPanel,
  TasksPanel,
  VendorsPanel,
  ApprovalsPanel,
} from "./workspace/panels";

const TABS = [
  { id: "timeline", label: "Timeline", Panel: TimelinePanel },
  { id: "budget", label: "Budget", Panel: BudgetPanel },
  { id: "tasks", label: "Tasks", Panel: TasksPanel },
  { id: "vendors", label: "Vendors", Panel: VendorsPanel },
  { id: "approvals", label: "Approvals", Panel: ApprovalsPanel },
] as const;

export function Workspace() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("timeline");
  const Panel = TABS.find((t) => t.id === active)!.Panel;

  return (
    <Section
      id="product"
      eyebrow="One workspace"
      title="Every surface of your event, on one canvas."
      intro="Switch between timeline, budget, tasks, vendors and approvals without changing tabs, tools or context. Eva keeps every surface in sync as your team works."
    >
      <AppFrame>
        {/* Tab bar */}
        <div className="border-b border-surface-border bg-white flex overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative px-4 md:px-5 h-11 shrink-0 text-[13px] font-medium transition-colors ${
                  on ? "text-content-strong" : "text-content-muted hover:text-content"
                }`}
              >
                {t.label}
                {on && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-blue"
                    transition={{ duration: 0.28, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {/* Panel */}
        <div className="bg-surface-muted/30 min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </AppFrame>
    </Section>
  );
}
