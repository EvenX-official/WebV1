import type { Metadata } from "next";
import { Mail, MessageCircle, Building2, MapPin } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact. EvenX",
  description:
    "Talk to the EvenX team about pilots, partnerships, security questionnaires, or anything else.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[420px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.06),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1120px] px-5 md:px-8 pt-20 md:pt-24 pb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              <MessageCircle className="h-3 w-3 text-brand-blue" /> Talk to us
            </div>
            <h1 className="mt-6 font-display text-[42px] sm:text-[54px] md:text-[62px] leading-[1.02] tracking-tightest font-semibold text-content-strong max-w-[760px]">
              We reply to every message within one business day.
            </h1>
            <p className="mt-5 text-[17px] text-content-muted max-w-[560px]">
              Whether you want a walkthrough, a pilot, or a straight answer on security or pricing,
              start here.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle">
                  <Mail className="h-3.5 w-3.5 text-brand-blue" /> Email
                </div>
                <a
                  href="mailto:info@evenx.co.uk"
                  className="mt-2 block text-[15px] font-medium text-brand-blue-strong hover:underline break-words"
                >
                  info@evenx.co.uk
                </a>
                <p className="mt-1 text-[13px] text-content-muted">
                  For general questions, pilots and partnerships.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle">
                  <Building2 className="h-3.5 w-3.5 text-brand-blue" /> Company
                </div>
                <div className="mt-2 text-[14px] text-content-strong font-medium">EvenX Ltd</div>
                <div className="mt-0.5 text-[13px] text-content-muted">
                  Company No. 16776145 (England &amp; Wales)
                </div>
                <div className="text-[13px] text-content-muted">ICO No. ZC170755</div>
              </div>

              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle">
                  <MapPin className="h-3.5 w-3.5 text-brand-blue" /> Where we're based
                </div>
                <div className="mt-2 text-[14px] text-content-strong">United Kingdom</div>
                <p className="mt-1 text-[13px] text-content-muted">Remote-first, UK-hosted.</p>
              </div>
            </div>

            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="rounded-2xl border border-surface-border bg-white shadow-card p-6 md:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
