"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { AppFrame } from "./EvaDemo/AppFrame";
import { EASE, useReducedMotion } from "@/lib/motion";
import {
  TimelinePanel,
  BudgetPanel,
  TasksPanel,
  VendorsPanel,
  ApprovalsPanel,
} from "./workspace/panels";

const TABS = [
  { id: "timeline",  label: "Timeline",  Panel: TimelinePanel  },
  { id: "budget",    label: "Budget",    Panel: BudgetPanel    },
  { id: "tasks",     label: "Tasks",     Panel: TasksPanel     },
  { id: "vendors",   label: "Vendors",   Panel: VendorsPanel   },
  { id: "approvals", label: "Approvals", Panel: ApprovalsPanel },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** How long each panel stays before advancing to the next. */
const AUTO_MS = 4200;
/** How long to pause auto-cycling after the user manually clicks a tab. */
const USER_PAUSE_MS = 12000;

export function Workspace() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<TabId>("timeline");
  const [paused, setPaused] = useState(false);
  const userPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-cycle through tabs when not paused (hover or recent user click).
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((prev) => {
        const idx = TABS.findIndex((t) => t.id === prev);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  const onTabClick = (id: TabId) => {
    setActive(id);
    // temporarily pause auto-cycle so the user's choice isn't fought
    setPaused(true);
    if (userPauseTimer.current) clearTimeout(userPauseTimer.current);
    userPauseTimer.current = setTimeout(() => setPaused(false), USER_PAUSE_MS);
  };

  useEffect(
    () => () => {
      if (userPauseTimer.current) clearTimeout(userPauseTimer.current);
    },
    [],
  );

  const Panel = TABS.find((t) => t.id === active)!.Panel;

  return (
    <Section
      id="product"
      eyebrow="One workspace"
      title="Every surface of your event, on one canvas."
      intro="Switch between timeline, budget, tasks, vendors and approvals without changing tabs, tools or context. Eva keeps every surface in sync as your team works."
    >
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (userPauseTimer.current) return; // user just clicked, leave the click-pause in charge
          setPaused(false);
        }}
      >
        <AppFrame>
          {/* Tab bar */}
          <div className="border-b border-surface-border bg-white flex overflow-x-auto no-scrollbar">
            {TABS.map((t) => {
              const on = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => onTabClick(t.id)}
                  aria-current={on}
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
            {/* subtle auto-cycle progress bar under the active tab */}
            {!reduced && !paused && (
              <motion.span
                key={active}
                aria-hidden
                className="ml-auto self-end h-0.5 bg-brand-blue/40 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
              />
            )}
          </div>

          {/* Panel */}
          <div className="bg-surface-muted/30 min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                <Panel />
              </motion.div>
            </AnimatePresence>
          </div>
        </AppFrame>
      </div>
    </Section>
  );
}
