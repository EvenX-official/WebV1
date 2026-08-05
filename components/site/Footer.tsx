import Link from "next/link";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-3.414-1.28 5.122 5.122 0 0 1-1.7-3.234h-3.28v12.98c0 1.13-.9 2.05-2.03 2.05a2.05 2.05 0 0 1-2.05-2.05c0-1.13.92-2.05 2.05-2.05.21 0 .41.03.6.09v-3.34a5.36 5.36 0 0 0-.6-.04A5.39 5.39 0 0 0 3.5 14.02a5.39 5.39 0 0 0 5.39 5.4 5.39 5.39 0 0 0 5.4-5.4V8.62a8.36 8.36 0 0 0 5.03 1.68V7.02a5.13 5.13 0 0 1-0-.02z" />
    </svg>
  );
}

const socials: { label: string; href: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/evenxuk/", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/evenx_official", Icon: Instagram },
  { label: "TikTok",    href: "https://www.tiktok.com/@evenx_official",   Icon: TikTokIcon },
  { label: "Facebook",  href: "https://www.facebook.com/share/198hi1eqEn/", Icon: Facebook },
];

const cols: { heading: string; links: { l: string; h: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { l: "Workspace", h: "/platform" },
      { l: "Eva", h: "/eva" },
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
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 grid place-items-center rounded-lg border border-surface-border text-content-muted hover:text-content-strong hover:border-surface-border-strong transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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
