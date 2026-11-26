"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, LogIn, Store } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { VENDOR_REGISTER_URL, VENDOR_SIGN_IN_URL } from "@/lib/links";

const items = [
  { label: "Platform", href: "/#product" },
  { label: "Eva", href: "/#eva" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const vendorLinks = [
  { label: "Vendor sign in", hint: "Go to your vendor workspace", href: VENDOR_SIGN_IN_URL, Icon: LogIn },
  { label: "Register as a vendor", hint: "List your business on EvenX, free", href: VENDOR_REGISTER_URL, Icon: Store },
];

/** "For vendors" in the header: sign in or register, in a small menu. */
function VendorMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="vendor-menu"
        className="inline-flex items-center gap-1 text-sm text-content-muted hover:text-content px-3 transition-colors"
      >
        For vendors
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="vendor-menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute right-0 top-full mt-3 w-[280px] rounded-2xl border border-surface-border bg-white p-2 shadow-card-lg"
          >
            {vendorLinks.map(({ label, hint, href, Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-muted transition-colors"
              >
                <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg bg-brand-blue/10 text-brand-blue" aria-hidden>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-content-strong">{label}</span>
                  <span className="block text-[12.5px] text-content-muted">{hint}</span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
            <VendorMenu />
            <Link
              href="https://app.evenx.co.uk/login"
              className="hidden md:inline text-sm text-content-muted hover:text-content px-3"
            >
              Log in
            </Link>
            <Link href="https://app.evenx.co.uk/signup" className="hidden md:block">
              <Button size="md">Start free trial</Button>
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

              <div className="border-t border-surface-border px-5 pt-4 pb-2">
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-subtle">
                  For vendors
                </div>
                {vendorLinks.map(({ label, href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-[15px] text-content-strong rounded-lg hover:bg-surface-muted transition-colors"
                  >
                    <Icon className="h-4 w-4 text-brand-blue" aria-hidden />
                    {label}
                  </a>
                ))}
              </div>

              <div className="border-t border-surface-border px-5 py-4 space-y-3">
                <Link
                  href="https://app.evenx.co.uk/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-[15px] text-content-muted"
                >
                  Log in
                </Link>
                <Link href="https://app.evenx.co.uk/signup" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full">
                    Start free trial <ArrowRight className="h-4 w-4" />
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
