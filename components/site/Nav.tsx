"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

const items = [
  { label: "Platform", href: "/#product" },
  { label: "Eva", href: "/#eva" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-surface-border/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="EvenX home" onClick={() => setOpen(false)}>
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
              href="https://app.evenx.co.uk/login"
              className="hidden md:inline text-sm text-content-muted hover:text-content px-3"
            >
              Log in
            </Link>
            <Link href="/demo" className="hidden md:block">
              <Button size="md">Book a demo</Button>
            </Link>
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden h-10 w-10 grid place-items-center rounded-lg text-content-strong hover:bg-surface-muted transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.nav
              id="mobile-menu"
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: EASE }}
              className="fixed inset-x-0 top-16 z-30 md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-white border-b border-surface-border shadow-card-lg"
            >
              <ul className="px-5 pt-4 pb-2 space-y-1">
                {items.map((i, idx) => (
                  <motion.li
                    key={i.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, ease: EASE, delay: 0.04 + idx * 0.035 }}
                  >
                    <Link
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-3 text-[17px] font-medium text-content-strong rounded-lg hover:bg-surface-muted transition-colors"
                    >
                      {i.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="border-t border-surface-border px-5 py-4 space-y-3">
                <Link
                  href="https://app.evenx.co.uk/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-[15px] text-content-muted"
                >
                  Log in
                </Link>
                <Link href="/demo" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full">
                    Book a demo <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
