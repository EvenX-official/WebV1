import type { Metadata } from "next";
import { Sparkles, Clock, ShieldCheck, PlayCircle, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DemoForm } from "./DemoForm";

export const metadata: Metadata = {
  title: "Book a demo. EvenX",
  description:
    "See EvenX plan a real event live. A 20-minute walkthrough with our team, tailored to how you run events today.",
};

const bullets = [
  "Watch Eva build a full plan from a single brief, in real time.",
  "See how timeline, budget, tasks, vendors and approvals stay in sync.",
  "Get a plain-English answer on security, pricing and pilot options.",
  "Leave with a workspace pre-loaded with your first event, if useful.",
];

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[520px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.09),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.07),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 pt-20 md:pt-24 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: pitch */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
                  <Sparkles className="h-3 w-3 text-brand-blue" /> Book a demo
                </div>
                <h1 className="mt-6 font-display text-[42px] sm:text-[52px] md:text-[58px] leading-[1.02] tracking-tightest font-semibold text-content-strong">
                  See EvenX plan a real event, live.
                </h1>
                <p className="mt-5 text-[17px] leading-[1.55] text-content-muted max-w-[520px]">
                  Twenty minutes with our team. We'll take a brief you actually run, feed it to Eva,
                  and walk you through how EvenX would handle it end to end.
                </p>

                <ul className="mt-8 space-y-3">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] text-content leading-snug">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.4} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    { icon: Clock, l: "20 min", h: "Walkthrough" },
                    { icon: PlayCircle, l: "Live", h: "No slides" },
                    { icon: ShieldCheck, l: "UK-hosted", h: "GDPR-ready" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-xl border border-surface-border bg-white p-3"
                    >
                      <s.icon className="h-4 w-4 text-brand-blue" />
                      <div className="mt-2 text-[13px] font-semibold text-content-strong">{s.l}</div>
                      <div className="text-[11px] text-content-subtle">{s.h}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-surface-border bg-surface-muted/50 p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-2">
                    Prefer to just talk?
                  </div>
                  <a
                    href="mailto:info@evenx.co.uk?subject=Demo%20request"
                    className="text-[14px] font-medium text-brand-blue-strong hover:underline break-words"
                  >
                    info@evenx.co.uk
                  </a>
                  <p className="mt-1 text-[12px] text-content-muted">
                    We reply to every message within one business day.
                  </p>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-surface-border bg-white shadow-card-lg p-6 md:p-8">
                  <DemoForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
