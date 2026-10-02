import { type ReactNode, type ButtonHTMLAttributes } from "react";

// ─── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "warning";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none cursor-pointer";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-500 shadow-sm",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm",
    outline: "border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 focus:ring-slate-400",
    ghost: "hover:bg-slate-100 text-slate-600 focus:ring-slate-400",
    warning: "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400 shadow-sm",
  };
  const disabledStyle = (disabled || loading) ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabledStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, string> = {
  "On Duty": "bg-blue-100 text-blue-800 border-blue-200",
  "Available": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Off Duty": "bg-slate-100 text-slate-600 border-slate-200",
  "On Leave": "bg-amber-100 text-amber-800 border-amber-200",
  "Training": "bg-purple-100 text-purple-800 border-purple-200",
  "Reserve": "bg-sky-100 text-sky-800 border-sky-200",
  "Pending": "bg-amber-100 text-amber-800 border-amber-200",
  "Approved": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Rejected": "bg-red-100 text-red-800 border-red-200",
  "Active": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Critical": "bg-red-100 text-red-800 border-red-200",
  "High": "bg-orange-100 text-orange-800 border-orange-200",
  "Medium": "bg-amber-100 text-amber-800 border-amber-200",
  "Low": "bg-slate-100 text-slate-600 border-slate-200",
  "Resolved": "bg-slate-100 text-slate-600 border-slate-200",
  "Closed": "bg-slate-100 text-slate-500 border-slate-200",
  "Under Review": "bg-blue-100 text-blue-800 border-blue-200",
  "Acknowledged": "bg-blue-100 text-blue-700 border-blue-200",
  "Emergency": "bg-red-600 text-white border-red-700",
  "Offline": "bg-slate-200 text-slate-600 border-slate-300",
  "AUTHORIZED": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "DENIED": "bg-red-100 text-red-800 border-red-200",
  "DENIED – Out of Scope": "bg-red-100 text-red-800 border-red-200",
  "AUTHORIZED with Reason": "bg-amber-100 text-amber-800 border-amber-200",
  "Draft": "bg-slate-100 text-slate-600 border-slate-200",
  "Submitted": "bg-blue-100 text-blue-700 border-blue-200",
  "Operational": "bg-blue-100 text-blue-800 border-blue-200",
  "Restricted": "bg-amber-100 text-amber-800 border-amber-200",
  "Sensitive": "bg-red-100 text-red-800 border-red-200",
  "Full": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Short": "bg-red-100 text-red-800 border-red-200",
  "Assigned": "bg-blue-100 text-blue-800 border-blue-200",
};

export function Badge({ label, dot }: { label: string; dot?: boolean }) {
  const style = BADGE_STYLES[label] || "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${label === "On Duty" ? "bg-blue-600 pulse-dot" : label === "Emergency" ? "bg-white" : "bg-current opacity-60"}`} />}
      {label}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className} ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, color, sub }: { label: string; value: string | number; icon: string; color: string; sub?: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
    sky: "bg-sky-50 text-sky-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <Card className="p-4 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg ${colors[color]} flex items-center justify-center text-lg flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-slate-900 font-display leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </Card>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ initials, size = "md", color = "blue" }: { initials: string; size?: "sm" | "md" | "lg" | "xl"; color?: string }) {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-11 h-11 text-base", xl: "w-14 h-14 text-lg" };
  const colors: Record<string, string> = {
    blue: "bg-blue-700 text-white",
    navy: "bg-slate-800 text-white",
    green: "bg-emerald-700 text-white",
    amber: "bg-amber-600 text-white",
    purple: "bg-purple-700 text-white",
  };
  return (
    <div className={`${sizes[size]} ${colors[color] || colors.blue} rounded-full flex items-center justify-center font-bold font-display flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900 font-display">{title}</h2>
        {sub && <p className="text-sm text-slate-500">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ label, type = "text", placeholder, className = "", icon, ...props }: {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full border border-slate-300 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${icon ? "pl-9" : ""}`}
          {...props}
        />
      </div>
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select({ label, options, className = "" }: { label?: string; options: string[]; className?: string }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <select className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
export function Timeline({ steps, current }: { steps: { label: string; time?: string; done?: boolean }[]; current?: number }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const done = step.done !== undefined ? step.done : (current !== undefined ? i <= current : false);
        const active = current !== undefined && i === current;
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 ${
                done ? "bg-blue-700 border-blue-700 text-white" :
                active ? "bg-white border-blue-500 text-blue-600" :
                "bg-white border-slate-300 text-slate-400"
              }`}>
                {done && !active ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-0.5 flex-1 my-0.5 ${done ? "bg-blue-300" : "bg-slate-200"}`} style={{ minHeight: 20 }} />}
            </div>
            <div className="pb-4 pt-0.5">
              <p className={`text-sm font-semibold ${done ? "text-slate-900" : "text-slate-400"}`}>{step.label}</p>
              {step.time && <p className="text-xs text-slate-400 font-mono">{step.time}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, message }: { icon: string; title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-3 opacity-40">{icon}</div>
      <p className="font-semibold text-slate-700">{title}</p>
      <p className="text-sm text-slate-400 mt-1 max-w-xs">{message}</p>
    </div>
  );
}

// ─── Permission Lock ──────────────────────────────────────────────────────────
export function PermissionLock({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
      <span className="text-slate-400">🔒</span>
      <div>
        <p className="text-xs font-semibold text-slate-600">{label}</p>
        <p className="text-xs text-slate-400">Additional authorization required</p>
      </div>
    </div>
  );
}

// ─── Alert Banner ─────────────────────────────────────────────────────────────
export function AlertBanner({ type, message }: { type: "info" | "warning" | "error" | "success"; message: string }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };
  const icons = { info: "ℹ️", warning: "⚠️", error: "🚨", success: "✅" };
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${styles[type]}`}>
      <span>{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
export function DesktopSidebar({
  items,
  active,
  onSelect,
  user,
}: {
  items: { label: string; icon: string; id: string; badge?: number }[];
  active: string;
  onSelect: (id: string) => void;
  user: { name: string; rank: string; avatar: string; id: string };
}) {
  return (
    <aside className="w-60 bg-slate-900 text-slate-300 flex flex-col h-full flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold font-display">RF</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm font-display tracking-wide">RAILFORCE</p>
            <p className="text-slate-500 text-xs">Secure Platform</p>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto space-y-0.5 px-3">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium text-left ${
              active === item.id
                ? "bg-blue-700 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold">{item.badge}</span>
            ) : null}
          </button>
        ))}
      </nav>
      {/* User */}
      <div className="px-3 py-3 border-t border-slate-800">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{user.avatar}</div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user.name}</p>
            <p className="text-slate-500 text-xs truncate">{user.id} · {user.rank}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Desktop Top Nav ──────────────────────────────────────────────────────────
export function TopNav({ title, breadcrumb, actions }: { title: string; breadcrumb?: string[]; actions?: ReactNode }) {
  return (
    <div className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-4 flex-shrink-0">
      {breadcrumb && (
        <div className="flex items-center gap-1.5 text-sm text-slate-400 mr-2">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              <span className={i === breadcrumb.length - 1 ? "text-slate-700 font-medium" : ""}>{b}</span>
            </span>
          ))}
        </div>
      )}
      <h1 className="font-bold text-slate-900 font-display text-lg flex-1">{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">RS</div>
      </div>
    </div>
  );
}

// ─── Security Banner ──────────────────────────────────────────────────────────
export function SecurityBanner({ scope }: { scope: string }) {
  return (
    <div className="bg-slate-950 text-slate-400 text-xs px-4 py-1.5 flex items-center gap-4 border-b border-slate-800 flex-wrap">
      <div className="flex items-center gap-1.5">
        <span className="text-emerald-400">●</span>
        <span className="font-mono font-semibold text-emerald-400">MFA VERIFIED</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-emerald-400">●</span>
        <span className="font-mono font-semibold text-emerald-400">DEVICE TRUSTED</span>
      </div>
      <div className="flex items-center gap-1.5 text-blue-300">
        <span>SCOPE:</span>
        <strong className="text-white font-mono">{scope}</strong>
      </div>
      <div className="flex items-center gap-1.5">
        <span>SESSION:</span>
        <span className="font-mono text-amber-300">47:23 REMAINING</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-emerald-400">●</span>
        <span className="font-mono font-semibold text-emerald-400">ONLINE</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-slate-600 text-xs">ALL ACTIONS AUDITED</span>
        <span className="text-slate-600 font-mono">RAILFORCE v2.4 · DEMO / SYNTHETIC DATA</span>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
export function Skeleton({ h = 4, w = "full" }: { h?: number; w?: string }) {
  return <div className={`skeleton rounded h-${h} w-${w === "full" ? "full" : w}`} />;
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="border-t border-slate-200 my-4" />;
  return (
    <div className="relative my-4">
      <div className="border-t border-slate-200" />
      <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-3 text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
export function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex border-b border-slate-200 gap-1">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
            active === tab ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── Access Decision Card ─────────────────────────────────────────────────────
export function AccessDecisionCard({
  user, resource, checks, result, reason,
}: {
  user: string;
  resource: string;
  checks: { label: string; pass: boolean }[];
  result: "GRANTED" | "DENIED";
  reason?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🔐</span>
        <h3 className="font-bold text-slate-900 font-display">ACCESS DECISION ENGINE</h3>
      </div>
      <div className="space-y-2 text-sm mb-4">
        <div className="flex gap-2"><span className="text-slate-500 w-28">User:</span><span className="font-medium text-slate-800">{user}</span></div>
        <div className="flex gap-2"><span className="text-slate-500 w-28">Resource:</span><span className="font-medium text-slate-800">{resource}</span></div>
      </div>
      <div className="border-t border-slate-200 pt-4 space-y-2 mb-4">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className={c.pass ? "text-emerald-600" : "text-red-500"}>{c.pass ? "✓" : "✕"}</span>
            <span className={c.pass ? "text-slate-700" : "text-red-600 font-medium"}>{c.label}</span>
          </div>
        ))}
      </div>
      <div className={`rounded-lg px-4 py-3 flex items-center gap-3 ${result === "GRANTED" ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
        <span className="text-2xl">{result === "GRANTED" ? "✅" : "🚫"}</span>
        <div>
          <p className={`font-bold font-mono text-sm ${result === "GRANTED" ? "text-emerald-800" : "text-red-800"}`}>ACCESS {result}</p>
          {reason && <p className="text-xs text-slate-600 mt-0.5">{reason}</p>}
        </div>
      </div>
    </Card>
  );
}
