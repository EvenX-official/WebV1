"use client";

import { useEffect, useRef, useState } from "react";
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

  const { beat, at, runKey } = useSequence({ reduced, playKey });

  return (
    <div ref={rootRef} className="relative">
      <AppFrame className="min-h-[520px]">
        <div className="flex">
          <Sidebar at={at} />
          <div className="flex-1 min-w-0 bg-surface-muted/40 p-3 md:p-4 space-y-2.5">
            <EvaCard beat={beat} at={at} reduced={reduced} runKey={runKey} />
            <EventCard at={at} reduced={reduced} />
            <TimelineBar at={at} reduced={reduced} />
            <StatTiles at={at} reduced={reduced} />
            <TaskAndVendors at={at} reduced={reduced} />
          </div>
        </div>
      </AppFrame>
    </div>
  );
}
