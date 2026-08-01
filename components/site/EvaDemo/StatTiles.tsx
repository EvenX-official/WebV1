"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Wallet, CheckSquare, Store, ShieldAlert } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { Beat } from "./useSequence";

function CountUp({
  to,
  prefix = "",
  suffix = "",
  active,
  reduced,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
  reduced: boolean;
}) {
  const mv = useMotionValue(reduced ? to : 0);
  useEffect(() => {
    if (reduced) {
      mv.set(to);
      return;
    }
    if (!active) {
      mv.set(0);
      return;
    }
    const c = animate(mv, to, { duration: 0.9, ease: EASE });
    return () => c.stop();
  }, [active, to, mv, reduced]);
  const rounded = useTransform(mv, (v) =>
    to >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString(),
  );
  return (
    <span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  hint,
  visible,
  hintTone = "muted",
}: {
  icon: typeof Wallet;
  label: string;
  value: React.ReactNode;
  hint: string;
  visible: boolean;
  hintTone?: "muted" | "amber" | "green";
}) {
  const hintColor = {
    muted: "text-content-subtle",
    amber: "text-amber-600",
    green: "text-emerald-600",
  }[hintTone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="rounded-xl border border-surface-border bg-white p-3"
    >
      <div className="flex items-center gap-1.5 text-content-subtle">
        <Icon className="h-3 w-3" />
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-1 text-[18px] font-semibold text-content-strong tabular-nums">
        {value}
      </div>
      <div className={`mt-0.5 text-[10px] ${hintColor}`}>{hint}</div>
    </motion.div>
  );
}

export function StatTiles({
  at,
  reduced,
}: {
  at: (b: Beat) => boolean;
  reduced: boolean;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <Tile
        icon={Wallet}
        label="Budget"
        visible={at("budget")}
        value={<CountUp to={248400} prefix="£" active={at("budget")} reduced={reduced} />}
        hint="73% committed"
      />
      <Tile
        icon={CheckSquare}
        label="Tasks"
        visible={at("tasks")}
        value={
          <>
            <CountUp to={5} active={at("tasks")} reduced={reduced} />
            <span className="text-content-subtle">/34</span>
          </>
        }
        hint="Assigned to 7 owners"
      />
      <Tile
        icon={Store}
        label="Vendors"
        visible={at("vendors")}
        value={
          <>
            <CountUp to={7} active={at("vendors")} reduced={reduced} />
            <span className="text-content-subtle"> shortlisted</span>
          </>
        }
        hint="2 confirmed"
        hintTone="green"
      />
      <Tile
        icon={ShieldAlert}
        label="Risks"
        visible={at("risks")}
        value={
          <>
            <CountUp to={1} active={at("risks")} reduced={reduced} />
            <span className="text-content-subtle"> flag</span>
          </>
        }
        hint="AV walkthrough window"
        hintTone="amber"
      />
    </div>
  );
}
