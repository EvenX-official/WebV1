import {
  Home,
  CalendarDays,
  CheckSquare,
  ShieldCheck,
  Users,
  Store,
  Wallet,
  MessageSquare,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

const items = [
  { label: "Home", icon: Home, active: true },
  { label: "My Events", icon: CalendarDays },
  { label: "Tasks", icon: CheckSquare, count: 7 },
  { label: "Approvals", icon: ShieldCheck, count: 4 },
  { label: "Teams", icon: Users },
  { label: "Vendors", icon: Store },
  { label: "Budgets", icon: Wallet },
  { label: "Messages", icon: MessageSquare },
];

/** Compact app sidebar, hidden below md — mobile design gets a different treatment */
export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-[188px] shrink-0 flex-col border-r border-surface-border bg-white">
      <div className="px-4 h-14 flex items-center border-b border-surface-border">
        <Logo />
      </div>
      <nav className="px-2 py-3 space-y-0.5">
        {items.map(({ label, icon: Icon, active, count }) => (
          <div
            key={label}
            className={[
              "flex items-center gap-2.5 h-8 px-2.5 rounded-lg text-[13px]",
              active
                ? "bg-brand-blue-soft text-brand-blue-strong font-medium"
                : "text-content-muted hover:bg-surface-muted",
            ].join(" ")}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.4 : 2} />
            <span className="flex-1 truncate">{label}</span>
            {count !== undefined && (
              <span className="text-[10px] text-content-subtle">{count}</span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
