"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { EASE, useReducedMotion } from "@/lib/motion";

const LINES = [
  "Reconciling vendor quotes across four categories…",
  "Flagging catering cost 12% over benchmark",
  "Rescheduling AV walkthrough to avoid the keynote conflict",
  "Drafting sponsor update — ready for your review",
  "All good. Nothing else needs you right now.",
];

export function EvaExperience() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const [visible, setVisible] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= LINES.length) clearInterval(id);
    }, 700);
    return () => clearInterval(id);
  }, [inView, reduced]);

  return (
    <section id="eva" ref={ref} className="relative overflow-hidden bg-ink-950 text-content-onDark py-28 md:py-36">
      {/* aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 40% at 30% 30%, rgba(124,92,250,0.32), transparent 70%), radial-gradient(50% 40% at 75% 20%, rgba(37,99,235,0.32), transparent 70%), radial-gradient(40% 30% at 50% 90%, rgba(37,99,235,0.20), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[820px] px-5 md:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-content-onDark-muted">
          <Sparkles className="h-3 w-3 text-brand-purple" /> Meet Eva
        </div>
        <h2 className="mt-6 font-display text-[38px] sm:text-[46px] md:text-[56px] leading-[1.05] tracking-tightest font-semibold">
          Not a chatbot.<br className="hidden sm:inline" /> The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">operator</span> behind your event.
        </h2>
        <p className="mt-5 text-[16px] leading-[1.6] text-content-onDark-muted max-w-[620px] mx-auto">
          Eva watches every surface of your event workspace and works ahead of your team —
          reconciling budgets, chasing vendors, flagging risks, drafting communications.
          Your team stays in control. Eva keeps things moving.
        </p>

        {/* Monologue */}
        <div className="mt-12 mx-auto max-w-[560px] text-left">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[12px] font-medium">Eva · working</span>
            </div>
            <ul className="space-y-2.5">
              {LINES.map((l, i) => (
                <motion.li
                  key={l}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={i < visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="flex items-start gap-2 text-[13px] leading-snug text-content-onDark-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-purple" />
                  <span className={i === LINES.length - 1 && i < visible ? "text-emerald-300" : ""}>
                    {l}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
