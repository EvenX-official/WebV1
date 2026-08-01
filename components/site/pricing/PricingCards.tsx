"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Plan = {
  id: "starter" | "core" | "pro";
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  save: number;
  cta: string;
  ribbon?: string;
  featured?: boolean;
  titleTone: string;
  gains: string[];
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get structured planning without the complexity.",
    monthly: 299,
    yearly: 2990,
    save: 598,
    cta: "Start with Starter",
    titleTone: "text-emerald-600",
    gains: [
      "Save time organising events",
      "Bring structure to event planning",
      "Start using AI-assisted event setup",
      "Eliminate scattered spreadsheets and email chains",
    ],
    features: [
      "Up to 3 team members",
      "3 active events",
      "Basic event planning workflow",
      "Vendor discovery",
      "Basic budget tracking",
      "Limited AI planner usage",
      "Task management",
      "Email support",
    ],
  },
  {
    id: "core",
    name: "Core",
    tagline: "Full control for teams running regular events.",
    monthly: 499,
    yearly: 4990,
    save: 998,
    cta: "Go Core",
    ribbon: "Most popular",
    featured: true,
    titleTone: "text-brand-blue-strong",
    gains: [
      "Save 10 to 20+ hours per event",
      "Avoid £1,000 to £3,000 in planning inefficiencies",
      "Keep events on time and within budget",
      "Improve collaboration across teams and stakeholders",
    ],
    features: [
      "Up to 10 team members",
      "10 active events",
      "Full planning workflows",
      "Vendor coordination",
      "Advanced budget tracking",
      "Task assignment and collaboration",
      "AI planner (full access)",
      "Email and standard support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Manage complex events without costly mistakes.",
    monthly: 799,
    yearly: 7990,
    save: 1598,
    cta: "Go Pro",
    ribbon: "For high-budget events",
    titleTone: "text-violet-600",
    gains: [
      "Prevent £5,000 to £10,000+ budget overruns",
      "Manage multiple stakeholders and vendors",
      "Replace spreadsheets and fragmented tools",
      "Standardise event operations across the organisation",
    ],
    features: [
      "Up to 25 team members",
      "Up to 15 active events",
      "Advanced workflows and automation",
      "Full vendor lifecycle management",
      "Budget controls and variance tracking",
      "Team roles and permissions",
      "Reporting and exports",
      "Priority support",
    ],
  },
];

function Toggle({
  cycle,
  onChange,
}: {
  cycle: "monthly" | "yearly";
  onChange: (c: "monthly" | "yearly") => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-surface-border bg-white p-1 text-[13px] font-medium shadow-card">
      {(["monthly", "yearly"] as const).map((c) => {
        const on = cycle === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="relative px-4 py-1.5 rounded-full transition-colors"
          >
            {on && (
              <motion.span
                layoutId="cycle-pill"
                transition={{ duration: 0.28, ease: EASE }}
                className="absolute inset-0 rounded-full bg-content-strong"
              />
            )}
            <span className={cn("relative", on ? "text-white" : "text-content-muted")}>
              {c === "monthly" ? "Monthly" : "Annual"}
              {c === "yearly" && (
                <span
                  className={cn(
                    "ml-1.5 text-[10px] font-semibold rounded-full px-1.5 py-0.5",
                    on ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700",
                  )}
                >
                  save 2 months
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PricingCards() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  return (
    <>
      <div className="flex justify-center mb-10">
        <Toggle cycle={cycle} onChange={setCycle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {PLANS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-white",
              p.featured
                ? "border-brand-blue/30 shadow-card-lg lg:-my-3"
                : "border-surface-border shadow-card",
            )}
          >
            {p.ribbon && (
              <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold bg-white",
                    p.featured
                      ? "border-brand-blue/30 text-brand-blue-strong"
                      : "border-surface-border text-content-muted",
                  )}
                >
                  {p.ribbon}
                </span>
              </div>
            )}

            <div className="p-6 md:p-7 pt-8">
              <h3 className={cn("font-display text-[22px] font-semibold", p.titleTone)}>
                {p.name}
              </h3>
              <p className="mt-1.5 text-[13px] text-content-muted leading-snug min-h-[38px]">
                {p.tagline}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-[44px] font-semibold text-content-strong tabular-nums leading-none">
                  £{cycle === "monthly" ? p.monthly : Math.round(p.yearly / 12)}
                </span>
                <span className="text-[13px] text-content-subtle">/month</span>
              </div>
              <div className="mt-1.5 text-[12px] text-content-subtle">
                {cycle === "monthly"
                  ? `or £${p.yearly.toLocaleString()}/year (save £${p.save})`
                  : `billed £${p.yearly.toLocaleString()} annually`}
              </div>

              <div className="mt-6">
                {p.featured ? (
                  <Button className="w-full" size="lg">
                    {p.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" variant="outline">
                    {p.cta}
                  </Button>
                )}
              </div>

              <div className="mt-6 rounded-xl border border-surface-border bg-surface-muted/50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-3">
                  What you gain
                </div>
                <ul className="space-y-2">
                  {p.gains.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-[13px] text-content-strong leading-snug">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-content-subtle shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto border-t border-surface-border px-6 md:px-7 py-6">
              <ul className="space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-content leading-snug">
                    <Check className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}
