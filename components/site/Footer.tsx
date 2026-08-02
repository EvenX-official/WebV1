import Link from "next/link";
import { Logo } from "./Logo";

const cols: { heading: string; links: { l: string; h: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { l: "Workspace", h: "/#product" },
      { l: "Eva", h: "/#eva" },
      { l: "Modules", h: "/#modules" },
      { l: "Pricing", h: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { l: "About", h: "/about" },
      { l: "Careers", h: "/careers" },
      { l: "Contact", h: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { l: "Privacy", h: "/privacy" },
      { l: "Terms", h: "/terms" },
      { l: "Cookie Policy", h: "/cookie-policy" },
      { l: "Security", h: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border mt-8">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-[13px] text-content-muted max-w-[280px] leading-relaxed">
              The intelligent workspace for corporate events. Plan, coordinate and deliver from
              one canvas.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.heading}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle mb-3">
                {c.heading}
              </div>
              <ul className="space-y-2">
                {c.links.map((li) => (
                  <li key={li.l}>
                    <Link href={li.h} className="text-[13px] text-content-muted hover:text-content transition-colors">
                      {li.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-surface-border/70 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[12px] text-content-subtle">
          <span>© {new Date().getFullYear()} EvenX Ltd. All rights reserved.</span>
          <span>
            EvenX Ltd · Company No. 16776145 (England &amp; Wales) · ICO No. ZC170755
          </span>
        </div>
      </div>
    </footer>
  );
}
