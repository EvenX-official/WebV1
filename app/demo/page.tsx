import type { Metadata } from "next";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  PlayCircle,
  CheckCircle2,
  TagIcon,
  Route,
  Handshake,
  Rocket,
  MessageSquareHeart,
  Trophy,
  ArrowRight,
} from "lucide-react";
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
        <section id="top" className="relative overflow-hidden scroll-mt-24">
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

        <FoundingPartners />
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Founding Partner Program                                                    */
/* -------------------------------------------------------------------------- */

const PERKS = [
  {
    icon: TagIcon,
    title: "Founding pricing, locked",
    body: "50% off for your first 12 months, and a price that never rises for as long as you stay with us. Grandfathered through every future plan change.",
  },
  {
    icon: Route,
    title: "A seat on the roadmap",
    body: "Direct input on what we build next. Your top three requests go into planning ahead of general feedback, with clear timelines back.",
  },
  {
    icon: MessageSquareHeart,
    title: "A private line to the team",
    body: "Shared channel with the founders, product and engineering. Not a support queue — actual conversations, same day.",
  },
  {
    icon: Rocket,
    title: "White-glove onboarding",
    body: "We migrate one full event into EvenX with you, live. Templates, integrations and vendor library set up before your team logs in.",
  },
  {
    icon: Handshake,
    title: "Extended pilot terms",
    body: "Three months to prove value with your real events. Cancel any time in that window, keep every export you've made. No commitments.",
  },
  {
    icon: Trophy,
    title: "Named as a launch partner",
    body: "Optional. Recognised on our site, in launch communications, and as a reference for future customers. Only if it makes sense for you.",
  },
];

function FoundingPartners() {
  return (
    <section id="founding" className="relative overflow-hidden bg-ink-950 text-content-onDark py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 20%, rgba(37,99,235,0.30), transparent 70%), radial-gradient(50% 40% at 85% 30%, rgba(124,92,250,0.28), transparent 70%), radial-gradient(40% 30% at 55% 100%, rgba(37,99,235,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-5 md:px-8">
        <div className="max-w-[760px]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-content-onDark-muted">
            <Sparkles className="h-3 w-3 text-brand-purple" /> Founding Partner Program
          </div>
          <h2 className="mt-6 font-display text-[34px] sm:text-[42px] md:text-[52px] leading-[1.05] tracking-tightest font-semibold">
            Come with us early. Get more than a discount.
          </h2>
          <p className="mt-5 text-[16px] leading-[1.6] text-content-onDark-muted max-w-[620px]">
            We are taking on a small group of founding partners before launch, teams who will
            help shape EvenX and will be shaped, in return, by the terms below.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERKS.map((p) => (
            <div
              key={p.title}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 md:p-6"
            >
              <div className="h-9 w-9 rounded-lg grid place-items-center bg-brand-blue/20 border border-brand-blue/25 text-brand-blue">
                <p.icon className="h-4 w-4" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-content-onDark leading-snug">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.6] text-content-onDark-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-onDark-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Currently accepting
            </div>
            <div className="mt-2 text-[15px] font-semibold text-content-onDark">
              A small number of founding partners for the 2026 cohort.
            </div>
            <div className="mt-1 text-[13px] text-content-onDark-muted">
              Book a demo above and mention <em>founding partner</em> in your note — we'll take it
              from there.
            </div>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full bg-white text-ink-950 px-4 h-11 text-[13.5px] font-semibold hover:-translate-y-[1px] transition-transform"
          >
            Apply above <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
