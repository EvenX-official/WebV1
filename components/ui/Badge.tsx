import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "blue" | "green" | "amber" | "purple" | "red";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-content-muted border-surface-border",
  blue: "bg-brand-blue-soft text-brand-blue-strong border-brand-blue/15",
  green: "bg-brand-green-soft text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-800 border-amber-200",
  purple: "bg-brand-purple-soft text-violet-700 border-violet-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

export function Badge({
  tone = "neutral",
  dot,
  className,
  children,
}: {
  tone?: Tone;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const dotColor = {
    neutral: "bg-content-subtle",
    blue: "bg-brand-blue",
    green: "bg-brand-green",
    amber: "bg-amber-500",
    purple: "bg-brand-purple",
    red: "bg-red-500",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />}
      {children}
    </span>
  );
}
