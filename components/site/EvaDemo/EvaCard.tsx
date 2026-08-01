"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUp } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { Beat } from "./useSequence";
import { useEffect, useState } from "react";

const PROMPT = "Plan a two-day leadership summit for 350 attendees in London.";

const STATUS: Record<Beat, string> = {
  idle: "Ready",
  typing: "Listening…",
  analysing: "Analysing your brief…",
  structure: "Creating event structure…",
  timeline: "Generating timeline…",
  budget: "Building budget…",
  tasks: "Creating tasks…",
  vendors: "Identifying vendors…",
  risks: "Reviewing risks…",
  ready: "Plan ready · 34 tasks · 7 vendors · 1 flag",
};

function useTypedPrompt(active: boolean, reduced: boolean, runKey: number) {
  const [text, setText] = useState(reduced ? PROMPT : "");
  useEffect(() => {
    if (reduced) {
      setText(PROMPT);
      return;
    }
    setText("");
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setText(PROMPT.slice(0, i));
      if (i >= PROMPT.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [active, reduced, runKey]);
  return text;
}

export function EvaCard({
  beat,
  at,
  reduced,
  runKey,
}: {
  beat: Beat;
  at: (b: Beat) => boolean;
  reduced: boolean;
  runKey: number;
}) {
  const typed = useTypedPrompt(at("typing"), reduced, runKey);
  const status = STATUS[beat];
  const thinking = beat !== "idle" && beat !== "typing" && beat !== "ready";

  return (
    <div className="relative isolate">
      {/* aurora bloom, only visible while Eva is thinking */}
      <motion.div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-3xl blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 30%, rgba(124,92,250,0.28), transparent 70%), radial-gradient(50% 50% at 85% 20%, rgba(37,99,235,0.32), transparent 70%)",
        }}
        animate={{ opacity: thinking ? 1 : 0.35 }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      <div className="relative rounded-2xl bg-ink-900 text-content-onDark shadow-eva ink-grid overflow-hidden">
        {/* header row */}
        <div className="flex items-center justify-between px-4 md:px-5 pt-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[13px] font-medium">Eva</span>
            <span className="text-[12px] text-content-onDark-muted">· Event Operating System</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-content-onDark-muted">
            <Sparkles className="h-3 w-3 text-brand-purple" /> AI
          </div>
        </div>

        {/* prompt input */}
        <div className="mx-4 md:mx-5 mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
          <span className="text-[12px] text-content-onDark-muted shrink-0">›</span>
          <p className="text-[13px] md:text-[14px] leading-snug text-content-onDark">
            {typed}
            {!reduced && typed.length < PROMPT.length && (
              <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-white/70 animate-pulse" />
            )}
          </p>
          <div className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-blue">
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.4} />
          </div>
        </div>

        {/* status monologue */}
        <div className="mx-4 md:mx-5 mt-3 mb-4 flex items-center gap-2 min-h-[22px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="flex items-center gap-2 text-[12px]"
            >
              {beat === "ready" ? (
                <span className="flex items-center gap-2 text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {status}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-content-onDark-muted">
                  {thinking && (
                    <span className="flex gap-1">
                      <span className="h-1 w-1 rounded-full bg-brand-purple animate-pulse" />
                      <span
                        className="h-1 w-1 rounded-full bg-brand-purple animate-pulse"
                        style={{ animationDelay: "160ms" }}
                      />
                      <span
                        className="h-1 w-1 rounded-full bg-brand-purple animate-pulse"
                        style={{ animationDelay: "320ms" }}
                      />
                    </span>
                  )}
                  {status}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
