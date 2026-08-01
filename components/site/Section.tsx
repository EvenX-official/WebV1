import * as React from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  children: React.ReactNode;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {(eyebrow || title || intro) && (
          <header className={cn("max-w-[720px]", align === "center" && "mx-auto")}>
            {eyebrow && (
              <div
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue-strong",
                  alignCls,
                )}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className={cn(
                  "mt-3 font-display text-[34px] sm:text-[42px] md:text-[52px] leading-[1.05] tracking-tightest font-semibold text-content-strong",
                  alignCls,
                )}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className={cn("mt-4 text-[17px] leading-[1.55] text-content-muted", alignCls)}>
                {intro}
              </p>
            )}
          </header>
        )}
        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
