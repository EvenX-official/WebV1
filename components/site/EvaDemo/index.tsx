"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/lib/motion";
import { AppFrame } from "./AppFrame";
import { Sidebar } from "./Sidebar";
import { EvaCard } from "./EvaCard";
import { EventCard } from "./EventCard";
import { TimelineBar } from "./TimelineBar";
import { StatTiles } from "./StatTiles";
import { TaskAndVendors } from "./TaskAndVendors";
import { useSequence } from "./useSequence";

export function EvaDemo() {
  const reduced = useReducedMotion();
  const [playKey, setPlayKey] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Start the sequence the first time the demo scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !inView) {
            setInView(true);
            setPlayKey((k) => k + 1);
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  const { beat, at } = useSequence({ reduced, playKey });

  return (
    <div ref={rootRef} className="relative">
      <AppFrame className="min-h-[520px]">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0 bg-surface-muted/40 p-3 md:p-4 space-y-2.5">
            <EvaCard beat={beat} at={at} reduced={reduced} />
            <EventCard at={at} reduced={reduced} />
            <TimelineBar at={at} reduced={reduced} />
            <StatTiles at={at} reduced={reduced} />
            <TaskAndVendors at={at} reduced={reduced} />
          </div>
        </div>
      </AppFrame>

      {/* Replay control — small, unobtrusive, honours reduced motion */}
      {!reduced && (
        <button
          onClick={() => setPlayKey((k) => k + 1)}
          className="absolute -bottom-3 right-4 inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1.5 text-[11px] font-medium text-content-muted shadow-card hover:text-content-strong transition-colors"
          aria-label="Replay demo"
        >
          <RotateCcw className="h-3 w-3" /> Replay
        </button>
      )}
    </div>
  );
}
