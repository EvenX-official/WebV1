"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "./Section";

export function CTA() {
  return (
    <Section id="cta" className="py-24 md:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-white shadow-card-lg px-6 py-14 md:px-14 md:py-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, rgba(37,99,235,0.08), transparent 70%), radial-gradient(40% 50% at 90% 50%, rgba(124,92,250,0.08), transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05] tracking-tightest font-semibold text-content-strong max-w-[720px] mx-auto">
            Run your next event on <span className="brand-underline">EvenX</span>.
          </h2>
          <p className="mt-4 text-[16px] text-content-muted max-w-[520px] mx-auto">
            Book a 20-minute walkthrough with our team. See Eva plan a real event in your own workspace.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Book a demo <ArrowRight className="h-4 w-4" /></Button>
            <Link
              href="#eva"
              className="inline-flex items-center gap-2 h-12 px-4 text-[15px] text-content-muted hover:text-content transition-colors"
            >
              <PlayCircle className="h-4 w-4" /> Watch the 90-second tour
            </Link>
          </div>
          <p className="mt-6 text-[12px] text-content-subtle">
            No credit card. Live pilot with real event data.
          </p>
        </div>
      </div>
    </Section>
  );
}
