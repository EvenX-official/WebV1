import type { Metadata } from "next";
import { Sparkles, Rocket, Target, HeartHandshake, Users } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CareersForm } from "./CareersForm";

export const metadata: Metadata = {
  title: "Careers. EvenX",
  description:
    "Come build EvenX, the Event Operating System for corporate teams. We're hiring across engineering, product, sales, marketing and operations.",
};

const values = [
  {
    icon: Target,
    title: "Own the outcome",
    body: "Every person here owns problems, not tickets. You'll pick the right thing to work on and see it through with customers.",
  },
  {
    icon: Rocket,
    title: "Ship weekly",
    body: "We move in short loops. Small, careful releases in front of real event teams beat six-month roadmaps.",
  },
  {
    icon: Users,
    title: "One team, one room",
    body: "We work together in Leeds. Being in the room together is how we ship fast and keep the craft bar high.",
  },
  {
    icon: HeartHandshake,
    title: "Craft matters",
    body: "We hold the bar high on product, design and code. Speed doesn't excuse sloppiness. The two compound each other.",
  },
];

const openings = [
  { role: "Founding Engineer", team: "Engineering" },
  { role: "Product Designer",  team: "Product & Design" },
  { role: "Growth Lead",       team: "Marketing" },
  { role: "Account Executive", team: "Sales" },
];

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[460px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.09),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.07),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1120px] px-5 md:px-8 pt-20 md:pt-24 pb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              <Sparkles className="h-3 w-3 text-brand-blue" /> Careers
            </div>
            <h1 className="mt-6 font-display text-[42px] sm:text-[54px] md:text-[62px] leading-[1.02] tracking-tightest font-semibold text-content-strong max-w-[820px]">
              Come build the Event Operating System with us.
            </h1>
            <p className="mt-5 text-[17px] text-content-muted max-w-[620px]">
              We're a small team building the workspace every corporate event team quietly wishes
              existed. If you want to make something real people rely on, keep reading.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-14">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-surface-border bg-white p-5"
                >
                  <div className="h-9 w-9 rounded-lg bg-brand-blue-soft text-brand-blue-strong grid place-items-center">
                    <v.icon className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-content-strong">{v.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-content-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Openings */}
        <section className="pb-16">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-[26px] md:text-[32px] font-semibold tracking-tightest text-content-strong">
                Currently hiring
              </h2>
              <span className="text-[13px] text-content-subtle">
                We hire when we find the right person, in every function.
              </span>
            </div>
            <div className="rounded-2xl border border-surface-border bg-white shadow-card divide-y divide-surface-border">
              {openings.map((o) => (
                <div
                  key={o.role}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-5 py-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-content-strong">{o.role}</div>
                    <div className="text-[12.5px] text-content-muted">{o.team}</div>
                  </div>
                  <a
                    href="#apply"
                    className="text-[13px] font-medium text-brand-blue-strong hover:underline"
                  >
                    Apply below →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="apply" className="scroll-mt-24 pb-24">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-display text-[26px] md:text-[32px] font-semibold tracking-tightest text-content-strong leading-tight">
                Apply to join the team
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-content-muted">
                Don't see a title that matches? Apply anyway. Pick the department that fits best
                and tell us what you'd want to build. We read every application and reply within a
                week.
              </p>
              <ul className="mt-6 space-y-2 text-[13.5px] text-content-muted">
                <li>· One thoughtful paragraph beats a five-page CV</li>
                <li>· A link to something you've shipped or built helps</li>
                <li>· We're based in Leeds and work together in person</li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-6 md:p-8">
                <CareersForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
