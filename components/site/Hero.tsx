"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EvaDemo } from "./EvaDemo";
import { fadeUp, stagger, EASE } from "@/lib/motion";

/** Cursor-tracking glow behind the product mock. Subtle. Skipped on touch. */
function CursorGlow({ target }: { target: React.RefObject<HTMLDivElement | null> }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.4);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  const bg = useTransform(
    [sx, sy],
    ([nx, ny]: number[]) =>
      `radial-gradient(360px 260px at ${nx * 100}% ${ny * 100}%, rgba(37,99,235,0.18), transparent 70%), radial-gradient(300px 220px at ${(1 - nx) * 100}% ${ny * 100}%, rgba(124,92,250,0.12), transparent 70%)`,
  );

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width);
      y.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [target, x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      {/* Ambient wash — cool, restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] h-[560px]
                   bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.09),transparent_70%),radial-gradient(40%_40%_at_82%_10%,rgba(124,92,250,0.06),transparent_70%)]"
      />
      {/* Slow drifting grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-grid hero-grid-mask" />
      {/* Cursor glow */}
      <CursorGlow target={heroRef} />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 pt-16 md:pt-24 pb-24 md:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={stagger(0.08, 0.05)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-5 lg:pr-4">
            <motion.h1
              variants={fadeUp(0.05)}
              className="font-display text-[44px] leading-[1.02] tracking-tightest sm:text-[56px] md:text-[64px] lg:text-[68px] font-semibold text-content-strong"
            >
              The execution workspace
              <br className="hidden md:inline" /> for corporate events.
            </motion.h1>

            <motion.p
              variants={fadeUp(0.1)}
              className="mt-6 max-w-[520px] text-[17px] leading-[1.55] text-content-muted"
            >
              EvenX orchestrates planning, coordination and delivery from a single
              workspace. Describe your event. Eva builds the plan. Your team runs it.
            </motion.p>

            <motion.div variants={fadeUp(0.15)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/demo">
                <Button size="xl">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#eva">
                <Button size="lg" variant="outline">
                  <PlayCircle className="h-4 w-4" /> Watch how it works
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp(0.15)}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <EvaDemo />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
