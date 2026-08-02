import * as React from "react";
import { cn } from "@/lib/cn";

const inputBase =
  "block w-full rounded-xl border border-surface-border bg-white px-4 h-11 text-[14px] text-content placeholder:text-content-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/25 focus:border-brand-blue/60";

export function Field({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[13px] font-medium text-content-strong">{label}</span>
        {optional && <span className="text-[11px] text-content-subtle">Optional</span>}
      </div>
      {children}
      {hint && <div className="mt-1 text-[11px] text-content-subtle">{hint}</div>}
    </label>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(inputBase, className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(inputBase, "h-auto py-3 leading-[1.5] resize-y", className)}
        {...props}
      />
    );
  },
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(inputBase, "appearance-none pr-10 cursor-pointer", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-content-subtle"
        >
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    );
  },
);
