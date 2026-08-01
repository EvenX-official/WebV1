export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="none" stroke="#2563EB" strokeWidth="1.6" />
        <path
          d="M10.5 10.5L21.5 21.5M21.5 10.5L10.5 21.5"
          stroke="#2563EB"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-content-strong">
        Even<span className="text-brand-blue">X</span>
      </span>
    </div>
  );
}
