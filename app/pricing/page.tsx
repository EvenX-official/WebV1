import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PricingCards } from "@/components/site/pricing/PricingCards";
import { FAQ } from "@/components/site/pricing/FAQ";
import { CTA } from "@/components/site/CTA";

export const metadata: Metadata = pageMeta(
  "Pricing — EvenX Event Operations Platform",
  "Transparent pricing for event teams of every size. Start free, upgrade when you are ready. No hidden fees.",
  "/pricing"
);

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[520px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.06),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 pt-20 md:pt-28 pb-4 text-center">
            <div className="inline-flex items-center rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              Pricing
            </div>
            <h1 className="mt-6 font-display text-[44px] sm:text-[54px] md:text-[64px] leading-[1.02] tracking-tightest font-semibold text-content-strong max-w-[820px] mx-auto">
              Simple pricing. No surprises.
            </h1>
            <p className="mt-5 text-[17px] text-content-muted max-w-[560px] mx-auto">
              Every plan includes two months free. No credit card required to start. Cancel any time.
            </p>
          </div>
        </section>

        <section className="pt-14 pb-24 md:pb-28">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <PricingCards />
            <p className="mt-10 text-center text-[13px] text-content-subtle">
              Prices in GBP, exclusive of VAT. Enterprise pricing available for organisations running 25+ events a year.
            </p>
          </div>
        </section>

        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
