import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * The macOS-style app window chrome used across the marketing site.
 * The address bar mirrors the existing evenx-website-v4 hero mock.
 */
export function AppFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-surface-border bg-white shadow-card-lg overflow-hidden",
        className,
      )}
    >
      {/* traffic lights + address bar — hidden on mobile to keep the frame tall + focused */}
      <div className="hidden md:flex h-9 items-center border-b border-surface-border/70 bg-surface-muted/70 px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-6 text-[12px] text-content-subtle font-mono tracking-tight">
          app.evenx.co.uk
        </div>
      </div>
      {children}
    </div>
  );
}
