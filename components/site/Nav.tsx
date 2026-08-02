import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

const items = [
  { label: "Platform", href: "/#product" },
  { label: "Eva", href: "/#eva" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="EvenX home">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-sm text-content-muted hover:text-content transition-colors"
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="#login"
            className="hidden md:inline text-sm text-content-muted hover:text-content px-3"
          >
            Log in
          </Link>
          <Button size="md">Book a demo</Button>
        </div>
      </div>
    </header>
  );
}
