/* eslint-disable @next/next/no-img-element */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.svg" alt="EvenX event operations platform logo" className="h-7 w-auto" />
      <span className="font-display text-[17px] font-semibold tracking-tight text-content-strong">
        Even<span className="text-brand-blue">X</span>
      </span>
    </div>
  );
}
