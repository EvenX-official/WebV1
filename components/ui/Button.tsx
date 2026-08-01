import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-strong shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-10px_rgba(37,99,235,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_18px_36px_-12px_rgba(37,99,235,0.65)] hover:-translate-y-[1px] active:translate-y-0",
  outline:
    "bg-white text-content border border-surface-border hover:border-surface-border-strong hover:-translate-y-[1px]",
  ghost: "text-content hover:bg-surface-muted",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
  xl: "h-[54px] px-7 text-[16px] font-semibold tracking-tight",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
