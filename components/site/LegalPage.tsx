import * as React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export type LegalToc = { id: string; label: string }[];

export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  toc: LegalToc;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[-10%] h-[380px]
                     bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.06),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1120px] px-5 md:px-8 pt-20 md:pt-24 pb-6">
            <div className="inline-flex items-center rounded-full border border-surface-border bg-white px-3 py-1 text-[11px] font-medium text-content-muted">
              {eyebrow}
            </div>
            <h1 className="mt-6 font-display text-[38px] sm:text-[46px] md:text-[54px] leading-[1.05] tracking-tightest font-semibold text-content-strong max-w-[820px]">
              {title}
            </h1>
            <p className="mt-4 text-[16px] leading-[1.55] text-content-muted max-w-[720px]">
              {intro}
            </p>
            <div className="mt-4 text-[12.5px] text-content-subtle">Last updated: {lastUpdated}</div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-[1120px] px-5 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-3">
              <nav className="lg:sticky lg:top-24">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-3">
                  On this page
                </div>
                <ul className="space-y-1.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="block text-[13px] text-content-muted hover:text-content-strong transition-colors py-1"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <div className="lg:col-span-9 max-w-[780px] prose-legal">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/**
 * Small helpers used by the legal pages. The `LegalSection` wraps a numbered
 * section with its heading + anchor. Body copy inside should use plain `<p>`
 * and `<ul>` elements; the global `.prose-legal` styles handle spacing.
 */
export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-12 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[13px] font-semibold text-content-subtle tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-display text-[22px] md:text-[26px] font-semibold tracking-tight text-content-strong">
          {title}
        </h2>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
