"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EvaDemo } from "./EvaDemo";
import { fadeUp, stagger, EASE } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft ambient wash — light and cool, not a rainbow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] h-[520px]
                   bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%),radial-gradient(40%_40%_at_80%_10%,rgba(124,92,250,0.07),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 pt-14 md:pt-20 pb-24 md:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={stagger(0.08, 0.05)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-5 lg:pr-4">
            <motion.div variants={fadeUp(0)}>
              <Badge tone="green" dot>
                Now in pilot with select event teams
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp(0.05)}
              className="mt-6 font-display text-[44px] leading-[1.02] tracking-tightest sm:text-[56px] md:text-[64px] lg:text-[68px] font-semibold text-content-strong"
            >
              The <span className="brand-underline">intelligent</span> workspace
              <br className="hidden md:inline" /> for corporate events.
            </motion.h1>

            <motion.p
              variants={fadeUp(0.1)}
              className="mt-6 max-w-[520px] text-[17px] leading-[1.55] text-content-muted"
            >
              EvenX orchestrates planning, coordination and delivery from a single
              workspace. Describe your event. Eva builds the plan — your team runs it.
            </motion.p>

            <motion.div variants={fadeUp(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <PlayCircle className="h-4 w-4" /> Watch how it works
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp(0.2)}
              className="mt-6 flex items-center gap-2 text-xs text-content-subtle"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
              Live demo — watch Eva plan a summit in real time.
            </motion.p>
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
