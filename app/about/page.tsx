import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About. EvenX",
  description:
    "Built by people who have been in the room. Meet the team behind EvenX and the story of why we started.",
};

type Person = {
  name: string;
  role: string;
  bio: string;
  /** Optional image file placed at /public/team/{slug}.jpg or .png */
  image?: string;
};

/** Deterministic soft gradient for the initial avatars, keyed by name. */
function avatarGradient(name: string) {
  const palettes: [string, string][] = [
    ["#2563EB", "#7C5CFA"], // blue → purple
    ["#7C5CFA", "#EC4899"], // purple → pink
    ["#0EA5E9", "#2563EB"], // sky → blue
    ["#10B981", "#0EA5E9"], // emerald → sky
    ["#F59E0B", "#EF4444"], // amber → red
  ];
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

function Avatar({ name, image }: { name: string; image?: string }) {
  const [a, b] = avatarGradient(name);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (image) {
    return (
      <div className="relative h-20 w-20 rounded-full overflow-hidden ring-4 ring-white shadow-card">
        <Image src={image} alt={name} fill sizes="80px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="relative h-20 w-20 rounded-full grid place-items-center text-white font-display font-semibold text-[26px] tracking-tight ring-4 ring-white shadow-card"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

const TEAM: Person[] = [
  {
    name: "Halm Murungi",
    role: "Founder & CEO",
    bio: "Entrepreneur and business leader with over a decade of experience building and scaling businesses across technology, education, travel and professional services. He previously founded a business that was successfully acquired and later led high-performing regional operations across multiple markets. Halm founded EvenX after experiencing first-hand the challenges of coordinating events across fragmented tools, teams, vendors and workflows.",
  },
  {
    name: "Phiona Murungi",
    role: "Operations and Events Coordination",
    bio: "Phiona has extensive experience coordinating events, managing stakeholders, and ensuring smooth operational delivery across a variety of functions. Her background includes event planning, logistics coordination, customer engagement, scheduling and vendor management. At EvenX, she helps shape the customer experience and operational workflows, ensuring the platform reflects the realities of how events are planned and executed in practice.",
  },
  {
    name: "Neils van Elteren",
    role: "Go-to-market Advisor",
    bio: "Neils advises EvenX on go-to-market strategy, commercial positioning, customer acquisition and growth. He brings experience supporting technology businesses through product launches, market expansion and commercial scaling. His role is focused on helping EvenX refine its market positioning, validate customer demand, and develop a scalable path to adoption and revenue growth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[500px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.09),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.07),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1120px] px-5 md:px-8 pt-20 md:pt-24 pb-6 text-center">
            <div className="inline-flex items-center rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              About Us
            </div>
            <h1 className="mt-6 font-display text-[42px] sm:text-[54px] md:text-[64px] leading-[1.02] tracking-tightest font-semibold text-content-strong max-w-[860px] mx-auto">
              Built by people who have been in the room.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.55] text-content-muted max-w-[640px] mx-auto">
              EvenX was founded because we saw the same problem at every company we worked with:
              talented people wasting hours coordinating events across scattered tools.
            </p>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-6 md:p-8">
                <Badge tone="green">Our Mission</Badge>
                <h2 className="mt-5 font-display text-[24px] md:text-[28px] leading-[1.15] font-semibold text-content-strong">
                  Give every events team one place to plan, coordinate and deliver.
                </h2>
                <p className="mt-4 text-[15px] leading-[1.65] text-content-muted">
                  Corporate events should not require five different tools and a dozen email
                  threads. EvenX brings everything into one workspace so teams can focus on
                  delivering great events instead of chasing updates.
                </p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-6 md:p-8">
                <Badge tone="purple">Our Vision</Badge>
                <h2 className="mt-5 font-display text-[24px] md:text-[28px] leading-[1.15] font-semibold text-content-strong">
                  The operating system for corporate events.
                </h2>
                <p className="mt-4 text-[15px] leading-[1.65] text-content-muted">
                  We are building the platform that every mid-size company reaches for when they
                  need to run an event. Not an agency marketplace. Not a ticketing tool. The
                  workspace where execution happens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* People */}
        <section className="pb-16">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8">
            <div className="text-center max-w-[720px] mx-auto">
              <h2 className="font-display text-[32px] md:text-[42px] leading-[1.05] tracking-tightest font-semibold text-content-strong">
                The people behind EvenX
              </h2>
              <p className="mt-4 text-[16px] leading-[1.55] text-content-muted">
                A small, focused team with experience across finance, operations, marketing and
                enterprise go-to-market.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {TEAM.map((p) => (
                <article
                  key={p.name}
                  className="rounded-2xl border border-surface-border bg-white shadow-card p-6 md:p-7 flex flex-col"
                >
                  <Avatar name={p.name} image={p.image} />
                  <div className="mt-5">
                    <h3 className="text-[17px] font-semibold text-content-strong">{p.name}</h3>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-blue-strong">
                      {p.role}
                    </div>
                  </div>
                  <p className="mt-4 text-[13.5px] leading-[1.65] text-content-muted">{p.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-surface-muted/60 border-y border-surface-border py-24 md:py-32">
          <div className="mx-auto max-w-[820px] px-5 md:px-8 text-center">
            <div className="inline-flex items-center rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              Our Story
            </div>
            <h2 className="mt-6 font-display text-[32px] md:text-[46px] leading-[1.05] tracking-tightest font-semibold text-content-strong">
              From frustration to foundation.
            </h2>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.7] text-content-muted">
              <p>
                Every company runs events. Team away days, client dinners, leadership summits,
                celebrations. But almost none of them have a proper system for it. The budget sits
                in a spreadsheet. Vendor quotes live in someone's inbox. Approvals happen over
                Slack or WhatsApp. And the person coordinating it all spends more time chasing
                people than planning the event.
              </p>
              <p>
                EvenX was built to fix that. One workspace where the entire event lives: budget,
                vendors, tasks, approvals, timeline and team communication. We are starting with
                mid-size UK companies and growing from there, guided by the people who actually use
                the product every day.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
