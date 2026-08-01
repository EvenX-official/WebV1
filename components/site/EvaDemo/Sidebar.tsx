"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  CalendarDays,
  CheckSquare,
  ShieldCheck,
  Users,
  Store,
  Wallet,
  MessageSquare,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { EASE } from "@/lib/motion";
import type { Beat } from "./useSequence";

type Item = {
  label: string;
  icon: typeof Home;
  active?: boolean;
  /** the beat at which this item's count becomes visible */
  countAt?: Beat;
  /** the count to show once countAt fires */
  count?: number;
};

const items: Item[] = [
  { label: "Home",     icon: Home, active: true },
  { label: "My Events", icon: CalendarDays, countAt: "structure", count: 1 },
  { label: "Tasks",     icon: CheckSquare,  countAt: "tasks",     count: 34 },
  { label: "Approvals", icon: ShieldCheck,  countAt: "ready",     count: 3 },
  { label: "Teams",     icon: Users },
  { label: "Vendors",   icon: Store,        countAt: "vendors",   count: 7 },
  { label: "Budgets",   icon: Wallet,       countAt: "budget",    count: 1 },
  { label: "Messages",  icon: MessageSquare },
];

export function Sidebar({ at }: { at?: (b: Beat) => boolean }) {
  return (
    <aside className="hidden md:flex md:w-[188px] shrink-0 flex-col border-r border-surface-border bg-white">
      <div className="px-4 h-14 flex items-center border-b border-surface-border">
        <Logo />
      </div>
      <nav className="px-2 py-3 space-y-0.5">
        {items.map(({ label, icon: Icon, active, countAt, count }) => {
          const showCount = count !== undefined && (!at || !countAt || at(countAt));
          return (
            <div
              key={label}
              className={[
                "flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-[13px]",
                active
                  ? "bg-brand-blue-soft text-brand-blue-strong font-medium"
                  : "text-content-muted hover:bg-surface-muted",
              ].join(" ")}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.4 : 2} />
              <span className="flex-1 truncate">{label}</span>
              <AnimatePresence>
                {showCount && (
                  <motion.span
                    key={count}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="text-[10px] text-content-subtle tabular-nums"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
