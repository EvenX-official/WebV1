export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <circle
          cx="16"
          cy="16"
          r="14.25"
          fill="none"
          stroke="#2563EB"
          strokeWidth="1.5"
        />
        <path
          d="M9 9 L23 23 M23 9 L9 23"
          stroke="#2563EB"
          strokeWidth="2.9"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-tight text-content-strong">
        Even<span className="text-brand-blue">X</span>
      </span>
    </div>
  );
}
