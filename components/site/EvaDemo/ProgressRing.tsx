"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function ProgressRing({ value, size = 42 }: { value: number; size?: number }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const mv = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mv, value, {
      duration: value === 0 ? 0.3 : 0.7,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return () => controls.stop();
  }, [value, mv]);
  const offset = useTransform(mv, (v) => c - (v / 100) * c);
  const label = useTransform(mv, (v) => `${Math.round(v)}%`);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#E6E8EE"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#2563EB"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <motion.span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-content-strong">
        {label}
      </motion.span>
    </div>
  );
}
