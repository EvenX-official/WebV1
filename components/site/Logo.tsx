let logoIdCounter = 0;

export function Logo({ className = "" }: { className?: string }) {
  const gid = `evenx-emblem-${++logoIdCounter}`;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#1E40AF" />
            <stop offset="0.55" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="2"
        />
        {/* E: vertical spine + three short horizontal bars, rounded */}
        <rect x="10.5" y="12" width="2.4" height="16" rx="1.2" fill={`url(#${gid})`} />
        <rect x="10.5" y="12" width="7.2" height="2.4" rx="1.2" fill={`url(#${gid})`} />
        <rect x="10.5" y="18.8" width="6" height="2.4" rx="1.2" fill={`url(#${gid})`} />
        <rect x="10.5" y="25.6" width="7.2" height="2.4" rx="1.2" fill={`url(#${gid})`} />
        {/* X: two diagonals crossing at the right-hand side */}
        <path
          d="M20.5 12 L29 28 M29 12 L20.5 28"
          stroke={`url(#${gid})`}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-tight text-content-strong">
        Even<span className="text-brand-blue">X</span>
      </span>
    </div>
  );
}
