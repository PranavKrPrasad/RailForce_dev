/**
 * Shared desktop screens reused across Inspector, Command, Supervisor, and Admin roles.
 * Each component accepts a `role` string and `scope` string to filter/label data
 * appropriately for the current user's authorized environment.
 */
import { useState } from "react";
import {
  Card, Badge, StatCard, SectionHeader, Button, TabBar, AlertBanner,
  AccessDecisionCard, Divider, Timeline, Avatar,
} from "../components/ui";
import {
  AUDIT_EVENTS, MESSAGES, INCIDENTS, DUTY_COVERAGE_DATA,
  INCIDENT_TREND, PERMISSIONS, NOTIFICATIONS,
} from "../data/mock";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from "recharts";

// ─── Desktop Messages ────────────────────────────────────────────────────────
export function DesktopMessages({ role, scope }: { role: string; scope: string }) {
  const [activeChannel, setActiveChannel] = useState<string | null>("ch-1");
  const [newMsg, setNewMsg] = useState("");

  const channel = MESSAGES.find((m) => m.id === activeChannel);

  // Role-based channel access: Personnel cannot see Division channels; Inspector cannot see HQ
  const accessibleChannels = MESSAGES.filter((m) => {
    if (role === "Personnel" || role === "Supervisor") return m.type !== "incident" || m.id !== "ch-3";
    return true;
  });

  const lockedChannels = [
    { id: "div-cmd", label: "Division Command Channel", reason: "Command Officer+ required" },
    ...(role === "Inspector" ? [{ id: "hq-ops", label: "HQ Operations Channel", reason: "Higher Authority scope required" }] : []),
  ];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-200 flex flex-col bg-slate-50 flex-shrink-0">
        <div className="px-4 py-4 border-b border-slate-200">
          <h2 className="font-display font-bold text-slate-900">Messages</h2>
          <p className="text-xs text-slate-500 mt-0.5">Scope: {scope}</p>
          <div className="mt-3 relative">
            <input
              placeholder="Search conversations..."
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide px-1 mb-1">
              Authorized Channels
            </p>
            {accessibleChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left mb-0.5 ${
                  activeChannel === ch.id ? "bg-blue-700 text-white" : "hover:bg-white text-slate-700"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    ch.type === "incident"
                      ? "bg-red-600 text-white"
                      : activeChannel === ch.id
                      ? "bg-blue-500 text-white"
                      : "bg-blue-700 text-white"
                  }`}
                >
                  {ch.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold truncate ${activeChannel === ch.id ? "text-white" : ""}`}>
                      {ch.channel}
                    </p>
                    <span className={`text-xs flex-shrink-0 ml-1 ${activeChannel === ch.id ? "text-blue-200" : "text-slate-400"}`}>
                      {ch.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${activeChannel === ch.id ? "text-blue-200" : "text-slate-500"}`}>
                    {ch.lastMessage}
                  </p>
                  <p className={`text-xs mt-0.5 ${activeChannel === ch.id ? "text-blue-300" : "text-slate-400"}`}>
                    {ch.type === "group" ? "👥 Group" : ch.type === "incident" ? "🚨 Incident · Restricted" : "💬 Direct"}
                  </p>
                </div>
                {ch.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">
                    {ch.unread}
                  </span>
                )}
              </button>
            ))}

            {/* Locked channels */}
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide px-1 mb-1 mt-3">
              Restricted (Unauthorized)
            </p>
            {lockedChannels.map((lch) => (
              <div
                key={lch.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-50 cursor-not-allowed"
              >
                <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 flex-shrink-0">
                  🔒
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{lch.label}</p>
                  <p className="text-xs text-slate-400">{lch.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-slate-200">
          <Button variant="primary" size="sm" className="w-full">+ New Message</Button>
        </div>
      </div>

      {/* Chat area */}
      {channel ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center gap-3 flex-shrink-0">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                channel.type === "incident" ? "bg-red-700" : "bg-blue-700"
              }`}
            >
              {channel.avatar}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{channel.channel}</p>
              <p className="text-xs text-slate-500">
                {channel.type === "group"
                  ? "👥 Group channel · Authorized personnel only"
                  : channel.type === "incident"
                  ? "🚨 Incident channel · Restricted access · All messages audited"
                  : "💬 Direct message · Secure internal channel"}
              </p>
            </div>
            {channel.type === "incident" && (
              <span className="bg-red-100 border border-red-200 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                🔒 Restricted
              </span>
            )}
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 text-sm">📌</button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 text-sm">🔍</button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 text-sm">⋮</button>
            </div>
          </div>

          {/* Audit notice for incident channels */}
          {channel.type === "incident" && (
            <div className="px-5 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2 text-xs text-amber-700 flex-shrink-0">
              <span>⚠️</span>
              <span>
                This is a restricted incident channel. All messages are end-to-end encrypted and
                permanently audited. Unauthorized disclosure is a security violation.
              </span>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            {channel.messages.map((m, i) => (
              <div key={i} className={`flex ${m.self ? "justify-end" : "justify-start"}`}>
                {m.system ? (
                  <div className="bg-slate-200/80 rounded-full px-5 py-1.5 text-xs text-slate-500 text-center max-w-sm">
                    {m.text}
                  </div>
                ) : (
                  <div
                    className={`max-w-[65%] flex flex-col gap-1 ${m.self ? "items-end" : "items-start"}`}
                  >
                    {!m.self && (
                      <p className="text-xs text-slate-500 ml-1">{m.sender}</p>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm ${
                        m.self
                          ? "bg-blue-700 text-white rounded-br-sm"
                          : "bg-white text-slate-900 shadow-sm rounded-bl-sm border border-slate-200"
                      }`}
                    >
                      {m.text}
                    </div>
                    <p className="text-xs text-slate-400 font-mono mx-1">{m.time}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center gap-3 flex-shrink-0">
            <div className="flex gap-1.5">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">📎</button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">🖼️</button>
            </div>
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type a secure message..."
              className="flex-1 border border-slate-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => { if (e.key === "Enter") setNewMsg(""); }}
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => setNewMsg("")}
              icon={<span>↑</span>}
            >
              Send
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          Select a conversation to begin
        </div>
      )}
    </div>
  );
}

// ─── Role-Scoped Reports ──────────────────────────────────────────────────────
export function RoleReports({
  role,
  scope,
}: {
  role: string;
  scope: string;
}) {
  const [period, setPeriod] = useState("Weekly");

  const leaveData = [
    { month: "Mar", casual: 8, medical: 3, earned: 5 },
    { month: "Apr", casual: 6, medical: 5, earned: 3 },
    { month: "May", casual: 10, medical: 2, earned: 7 },
    { month: "Jun", casual: 7, medical: 4, earned: 4 },
    { month: "Jul", casual: 9, medical: 3, earned: 6 },
    { month: "Aug", casual: 5, medical: 2, earned: 3 },
  ];

  const workloadData = [
    { name: "Aarav Sharma", shifts: 18, hours: 144 },
    { name: "Sanjay Rao", shifts: 16, hours: 128 },
    { name: "Rahul Kumar", shifts: 14, hours: 112 },
    { name: "Meena Pillai", shifts: 13, hours: 104 },
    { name: "Kavya Menon", shifts: 12, hours: 96 },
  ];

  const isHigher = role === "Higher Authority" || role === "Command Officer";

  return (
    <div className="p-6 space-y-5 overflow-y-auto h-full">
      <SectionHeader
        title="Reports & Analytics"
        sub={`Authorized scope: ${scope}`}
        action={
          <div className="flex gap-1.5">
            {["Daily", "Weekly", "Monthly", "Custom"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  period === p
                    ? "bg-blue-700 text-white border-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                }`}
              >
                {p}
              </button>
            ))}
            <Button variant="outline" size="sm">⬇ Export</Button>
          </div>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Avg Duty Coverage" value="87%" icon="📊" color="blue" sub={period} />
        <StatCard label="Leave Requests" value="14" icon="🗓️" color="amber" sub="This month" />
        <StatCard label="Incidents Filed" value="7" icon="⚠️" color="red" sub="This week" />
        <StatCard label="Avg Response Time" value="9m 30s" icon="⏱️" color="green" sub="Emergency" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Duty coverage */}
        <Card className="p-4">
          <SectionHeader title="Duty Coverage" sub="7-day trend vs. 95% target" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={DUTY_COVERAGE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#64748b" }} unit="%" />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v: any) => [`${v}%`]}
              />
              <Line
                type="monotone"
                dataKey="covered"
                stroke="#1d4ed8"
                strokeWidth={2}
                dot={{ fill: "#1d4ed8", r: 3 }}
                name="Coverage"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#dc2626"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
                name="Target (95%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Leave breakdown */}
        <Card className="p-4">
          <SectionHeader title="Leave Trends" sub="6 months · By type" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leaveData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="casual" name="Casual" fill="#f97316" radius={[2, 2, 0, 0]} stackId="a" />
              <Bar dataKey="medical" name="Medical" fill="#dc2626" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="earned" name="Earned" fill="#1d4ed8" radius={[2, 2, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Incident trend */}
        <Card className="p-4">
          <SectionHeader title="Incident Trend" sub="6 months · All types" />
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={INCIDENT_TREND} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Workload distribution */}
        <Card className="p-4">
          <SectionHeader title="Workload Distribution" sub={`Top 5 personnel · ${scope}`} />
          <div className="space-y-3 mt-1">
            {workloadData.map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {w.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="font-medium text-slate-700">{w.name}</span>
                    <span className="text-slate-500">{w.shifts} shifts · {w.hours}h</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        w.shifts >= 17 ? "bg-red-500" : w.shifts >= 14 ? "bg-amber-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${(w.shifts / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Shift distribution */}
      <Card className="p-4">
        <SectionHeader title="Shift Distribution Summary" sub={`All shifts · ${scope}`} />
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Shift A (06:00–14:00)", assigned: 18, required: 20, pct: 90 },
            { label: "Shift B (14:00–22:00)", assigned: 16, required: 20, pct: 80 },
            { label: "Shift C (22:00–06:00)", assigned: 14, required: 20, pct: 70 },
          ].map((s) => (
            <div key={s.label} className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold text-slate-600 mb-2">{s.label}</p>
              <p className="text-2xl font-display font-bold text-slate-900">
                {s.assigned}
                <span className="text-sm font-normal text-slate-400"> / {s.required}</span>
              </p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${
                    s.pct >= 90 ? "bg-emerald-500" : s.pct >= 75 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <p
                className={`text-xs font-semibold mt-1 ${
                  s.pct >= 90 ? "text-emerald-600" : s.pct >= 75 ? "text-amber-600" : "text-red-600"
                }`}
              >
                {s.pct}% coverage
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Authorization gate for higher analytics */}
      {!isHigher && (
        <Card className="p-4 opacity-70">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold text-slate-700">Cross-Unit Analytics</p>
              <p className="text-sm text-slate-400">
                Comparison across multiple units requires Command Officer scope or higher.
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Request Access
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Role-Scoped Audit Log ───────────────────────────────────────────────────
export function RoleAuditLog({ scope, canExport = false }: { scope: string; canExport?: boolean }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "AUTHORIZED", "DENIED", "Warning", "Critical"];

  const visible = AUDIT_EVENTS.filter((ev) => {
    if (filter === "AUTHORIZED") return ev.outcome.startsWith("AUTHORIZED");
    if (filter === "DENIED") return ev.outcome.startsWith("DENIED");
    if (filter === "Warning" || filter === "Critical") return ev.severity === filter;
    return true;
  });

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Audit Activity Log" sub={`Scope: ${scope} · Immutable records`} />

      <AlertBanner
        type="info"
        message="Audit records are read-only and immutable. Viewing this log creates its own audit entry."
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <input
            type="text"
            placeholder="Search by user, resource, event..."
            className="border border-slate-200 rounded-lg py-1.5 px-3 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            defaultValue="2026-08-13"
            className="border border-slate-200 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {canExport && <Button variant="outline" size="sm">⬇ Export</Button>}
          {!canExport && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 px-2 py-1 bg-slate-100 rounded-lg">
              🔒 Export requires Admin role
            </div>
          )}
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              {["Audit ID", "Time", "User", "Action", "Resource", "Outcome", "Severity"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((ev) => (
              <tr
                key={ev.id}
                className={`hover:bg-slate-50 transition-colors text-sm ${
                  ev.outcome.startsWith("DENIED")
                    ? "bg-red-50/40"
                    : ev.severity === "Critical"
                    ? "bg-amber-50/30"
                    : ""
                }`}
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{ev.id}</td>
                <td className="px-4 py-3 text-xs text-slate-500 font-mono whitespace-nowrap">
                  {ev.time}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800 text-sm">{ev.user}</p>
                  <p className="text-xs text-slate-400">{ev.userId}</p>
                </td>
                <td className="px-4 py-3 text-slate-700 text-sm">{ev.action}</td>
                <td className="px-4 py-3 text-slate-600 font-mono text-xs">{ev.resource}</td>
                <td className="px-4 py-3">
                  <Badge label={ev.outcome as any} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold ${
                      ev.severity === "Critical"
                        ? "text-red-600"
                        : ev.severity === "Warning"
                        ? "text-amber-600"
                        : "text-slate-500"
                    }`}
                  >
                    {ev.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 bg-slate-50">
          <span>
            Showing {visible.length} of {AUDIT_EVENTS.length} records · Page 1 of 248
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">← Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">Next →</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Role-Scoped Zero-Trust View ─────────────────────────────────────────────
export function RoleZeroTrust({ role, scope }: { role: string; scope: string }) {
  const [scenario, setScenario] = useState<"granted" | "denied">("granted");

  const grantedChecks = [
    { label: "Identity verified (MFA + session token)", pass: true },
    { label: `Role permission: personnel.view (${role})`, pass: true },
    { label: `Command scope: Unit Alpha ✓ (within ${scope})`, pass: true },
    { label: "Reporting hierarchy: Direct reporting chain ✓", pass: true },
    { label: "Need-to-know: Operational duty assignment basis ✓", pass: true },
    { label: "Security context: Trusted device + authorized subnet ✓", pass: true },
  ];

  const deniedChecks = [
    { label: "Identity verified (MFA + session token)", pass: true },
    { label: `Role permission: personnel.view (${role})`, pass: true },
    { label: "Command scope: RF-0412 is outside authorized scope ✕", pass: false },
    { label: "Reporting hierarchy: Not in authorized command chain ✕", pass: false },
    { label: "Need-to-know: No operational basis established ✕", pass: false },
    { label: "Security context: Trusted device + authorized subnet ✓", pass: true },
  ];

  return (
    <div className="p-6 space-y-5 overflow-y-auto h-full">
      <SectionHeader
        title="Zero-Trust Access Engine"
        sub="Real-time access decision framework · Every request is independently evaluated"
      />

      {/* Principle explanation */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 grid grid-cols-3 gap-4">
        {[
          {
            icon: "🔐",
            title: "Never Trust, Always Verify",
            desc: "No implicit trust based on network location, role alone, or prior sessions. Every request is evaluated from zero.",
          },
          {
            icon: "🗺️",
            title: "Scope-Bound Access",
            desc: `Your authorized scope is: ${scope}. Access to resources outside this boundary is denied regardless of rank.`,
          },
          {
            icon: "📋",
            title: "Every Decision Is Logged",
            desc: "Granted and denied decisions both create permanent, tamper-proof audit records with full context and timestamp.",
          },
        ].map((p) => (
          <div key={p.title} className="flex flex-col gap-2">
            <span className="text-2xl">{p.icon}</span>
            <p className="font-display font-bold text-white text-sm">{p.title}</p>
            <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive demonstration */}
      <div>
        <div className="flex gap-2 mb-4">
          <Button
            variant={scenario === "granted" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setScenario("granted")}
          >
            ✓ Access Granted Scenario
          </Button>
          <Button
            variant={scenario === "denied" ? "danger" : "secondary"}
            size="sm"
            onClick={() => setScenario("denied")}
          >
            ✗ Access Denied Scenario
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AccessDecisionCard
            user={`${role} (RF-1023) — ${scope}`}
            resource={
              scenario === "granted"
                ? "Personnel Profile RF-2847 (Unit Alpha)"
                : "Personnel Profile RF-0412 (HQ Command Officer)"
            }
            checks={scenario === "granted" ? grantedChecks : deniedChecks}
            result={scenario === "granted" ? "GRANTED" : "DENIED"}
            reason={
              scenario === "denied"
                ? `RF-0412 is outside authorized scope (${scope}). This attempt has been logged as AUD-DENY-${Date.now().toString().slice(-6)}.`
                : undefined
            }
          />

          <Card className="p-5">
            <h3 className="font-display font-bold text-slate-900 mb-4">
              Access Control Layers Applied
            </h3>
            <div className="space-y-4">
              {[
                {
                  layer: "1. Identity",
                  desc: "MFA-verified session token with device fingerprint and IP validation.",
                  pass: true,
                },
                {
                  layer: "2. Role (RBAC)",
                  desc: `Role "${role}" grants personnel.view permission within authorized scope.`,
                  pass: true,
                },
                {
                  layer: "3. Scope",
                  desc: `Authorized scope: ${scope}. Resources outside this are invisible.`,
                  pass: scenario === "granted",
                },
                {
                  layer: "4. Hierarchy",
                  desc: "Resource must be within the authenticated user's reporting chain.",
                  pass: scenario === "granted",
                },
                {
                  layer: "5. Need-to-Know",
                  desc: "Operational justification must exist (duty assignment, incident, etc.).",
                  pass: scenario === "granted",
                },
                {
                  layer: "6. Context",
                  desc: "Device, time-of-day, network location, and session health checks.",
                  pass: true,
                },
              ].map((l) => (
                <div key={l.layer} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      l.pass ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {l.pass ? "✓" : "✕"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{l.layer}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Inspector Emergency Alerts ──────────────────────────────────────────────
export function InspectorEmergency({ scope }: { scope: string }) {
  const [sosState, setSosState] = useState<"active" | "acknowledged" | "responding" | "resolved">(
    "active"
  );

  const advance = () => {
    if (sosState === "active") setSosState("acknowledged");
    else if (sosState === "acknowledged") setSosState("responding");
    else if (sosState === "responding") setSosState("resolved");
  };

  const stateConfig = {
    active: { color: "border-red-500 bg-red-50", badge: "Emergency", label: "SOS ACTIVE", icon: "🚨" },
    acknowledged: { color: "border-amber-400 bg-amber-50", badge: "Acknowledged", label: "ACKNOWLEDGED", icon: "📡" },
    responding: { color: "border-blue-500 bg-blue-50", badge: "Active", label: "RESPONDING", icon: "🏃" },
    resolved: { color: "border-emerald-500 bg-emerald-50", badge: "Active", label: "RESOLVED", icon: "✅" },
  };

  const cfg = stateConfig[sosState];

  return (
    <div className="p-6 space-y-5 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <SectionHeader title="Emergency Command" sub={`Scope: ${scope} · All SOS events in your command chain`} />
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${sosState !== "resolved" ? "bg-red-500 pulse-dot" : "bg-emerald-500"}`} />
          <span className={`font-bold text-sm ${sosState !== "resolved" ? "text-red-600" : "text-emerald-600"}`}>
            {sosState !== "resolved" ? "1 ACTIVE EMERGENCY" : "ALL CLEAR"}
          </span>
        </div>
      </div>

      {/* Active SOS card */}
      <Card className={`p-5 border-l-4 ${cfg.color}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xl ${sosState === "active" ? "animate-pulse" : ""}`}>{cfg.icon}</span>
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                  sosState === "active"
                    ? "bg-red-100 text-red-800"
                    : sosState === "resolved"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {cfg.label}
              </span>
            </div>
            <h3 className="font-display font-black text-slate-900 text-xl">EMERG-0089</h3>
            <p className="text-slate-500 text-sm">SOS Emergency · Personnel Alert</p>
          </div>
          <Badge label={cfg.badge as any} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2 text-sm">
            {[
              { label: "Personnel", value: "RF-2847 Aarav Sharma" },
              { label: "Rank & Unit", value: "Constable · Unit Alpha" },
              { label: "Current Duty", value: "Platform Patrol · Shift B" },
              { label: "SOS Activated", value: "13 Aug 2026 · 10:22:14" },
              { label: "Location", value: "Platform 3, Station Alpha" },
              { label: "Your Scope", value: scope },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="text-slate-500 w-28 flex-shrink-0">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Simulated map */}
          <div className="bg-slate-800 rounded-xl relative overflow-hidden h-44">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Station outline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-8 border border-slate-500 rounded bg-slate-700/50 flex items-center justify-center mb-2">
                <span className="text-slate-300 text-xs">Station Alpha</span>
              </div>
              {/* Platforms */}
              {[1, 2, 3, 4].map((p) => (
                <div
                  key={p}
                  className={`w-32 h-3 border-b border-slate-600 ${p === 3 ? "bg-red-500/30 border-red-500" : ""}`}
                />
              ))}
            </div>
            {/* Marker */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs shadow-lg z-10 relative">
                !
              </div>
              <div className="absolute -inset-3 border-2 border-red-400 rounded-full opacity-70 animate-ping" />
            </div>
            <div className="absolute bottom-2 right-2 bg-slate-900/80 rounded px-2 py-0.5 text-xs text-slate-300">
              Simulated · Not real GPS
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-slate-200 mt-4 pt-4 mb-4">
          <div className="flex items-center gap-6 overflow-x-auto pb-1">
            {[
              { label: "SOS Activated", time: "10:22:14", done: true },
              { label: "Acknowledged", time: sosState !== "active" ? "10:22:41" : "—", done: sosState !== "active" },
              { label: "Response Assigned", time: ["responding", "resolved"].includes(sosState) ? "10:24:05" : "—", done: ["responding", "resolved"].includes(sosState) },
              { label: "Responding", time: sosState === "resolved" ? "10:26:18" : "—", done: sosState === "resolved" },
              { label: "Resolved", time: sosState === "resolved" ? "10:31:44" : "—", done: sosState === "resolved" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-max">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    step.done
                      ? "bg-blue-700 border-blue-700 text-white"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {step.done ? "✓" : i + 1}
                </div>
                <p className="text-xs font-medium text-slate-700">{step.label}</p>
                <p className="text-xs text-slate-400 font-mono">{step.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          {sosState === "active" && (
            <Button variant="primary" onClick={advance}>✓ Acknowledge SOS</Button>
          )}
          {sosState === "acknowledged" && (
            <Button variant="warning" onClick={advance}>👥 Assign Response Team</Button>
          )}
          {sosState === "responding" && (
            <Button variant="primary" onClick={advance}>✓ Mark Resolved</Button>
          )}
          {sosState === "resolved" && (
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <span>✅</span> Emergency resolved at 10:31:44
            </div>
          )}
          <Button variant="outline" size="sm">📞 Contact Personnel</Button>
          <Button variant="outline" size="sm">📋 View Duty Info</Button>
          <Button variant="secondary" size="sm">📝 Add to Incident Log</Button>
        </div>
      </Card>

      {/* Recent emergency history */}
      <Card className="p-4">
        <SectionHeader title="Emergency History" sub="Last 30 days · Your authorized scope" />
        <div className="space-y-2">
          {[
            { id: "EMERG-0088", personnel: "RF-3012 Suresh Yadav", type: "Medical Emergency", time: "10 Aug · 15:44", resolvedIn: "8m 12s", status: "Resolved" },
            { id: "EMERG-0085", personnel: "RF-2788 Sanjay Rao", type: "Security Threat Alert", time: "05 Aug · 22:11", resolvedIn: "14m 03s", status: "Resolved" },
            { id: "EMERG-0081", personnel: "RF-2912 Meena Pillai", type: "SOS Alert", time: "28 Jul · 08:33", resolvedIn: "11m 55s", status: "Resolved" },
          ].map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0"
            >
              <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 flex-shrink-0">
                🚨
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">
                  {e.id} · {e.type}
                </p>
                <p className="text-xs text-slate-500">
                  {e.personnel} · {e.time} · Resolved in {e.resolvedIn}
                </p>
              </div>
              <Badge label="Active" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Unit Overview (Command level) ───────────────────────────────────────────
export function UnitOverview({ scope }: { scope: string }) {
  const units = [
    { name: "Unit Alpha", inspector: "Inspector R. Singh", strength: 48, onDuty: 26, available: 12, onLeave: 5, training: 2, reserve: 3, coverage: 87, incidents: 2 },
    { name: "Unit Beta", inspector: "Inspector P. Nair", strength: 52, onDuty: 30, available: 10, onLeave: 6, training: 3, reserve: 3, coverage: 92, incidents: 1 },
    { name: "Unit Gamma", inspector: "Inspector G. Mishra", strength: 45, onDuty: 28, available: 8, onLeave: 4, training: 2, reserve: 3, coverage: 78, incidents: 3 },
    { name: "Unit Delta", inspector: "Inspector A. Kumar", strength: 55, onDuty: 34, available: 12, onLeave: 5, training: 2, reserve: 2, coverage: 89, incidents: 0 },
  ];

  const [selected, setSelected] = useState<string | null>(null);
  const selectedUnit = units.find((u) => u.name === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="Unit Overview"
        sub={`Authorized scope: ${scope} · Drill down into individual units`}
      />

      <div className="grid grid-cols-2 gap-4">
        {units.map((u) => (
          <Card
            key={u.name}
            className={`p-4 cursor-pointer transition-all ${
              selected === u.name ? "border-blue-400 ring-2 ring-blue-100" : "hover:border-slate-300"
            }`}
            onClick={() => setSelected(selected === u.name ? null : u.name)}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-slate-900">{u.name}</h3>
                <p className="text-xs text-slate-500">{u.inspector}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    u.coverage >= 90
                      ? "text-emerald-600"
                      : u.coverage >= 80
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {u.coverage}% coverage
                </p>
                {u.incidents > 0 && (
                  <p className="text-xs text-orange-600 font-semibold">{u.incidents} active incident{u.incidents > 1 ? "s" : ""}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              {[
                { label: "On Duty", value: u.onDuty, color: "text-blue-700 bg-blue-50" },
                { label: "Available", value: u.available, color: "text-emerald-700 bg-emerald-50" },
                { label: "On Leave", value: u.onLeave, color: "text-amber-700 bg-amber-50" },
              ].map((s) => (
                <div key={s.label} className={`rounded-lg py-2 ${s.color}`}>
                  <p className="text-lg font-display font-bold">{s.value}</p>
                  <p className="text-xs font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  u.coverage >= 90 ? "bg-emerald-500" : u.coverage >= 80 ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${u.coverage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{u.onDuty} / {u.strength} personnel active</span>
              <span>{u.training} training · {u.reserve} reserve</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Unit drill-down */}
      {selectedUnit && (
        <Card className="p-5 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-slate-900 text-lg">
              {selectedUnit.name} — Detailed View
            </h3>
            <button
              onClick={() => setSelected(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-6 gap-3 mb-4">
            <StatCard label="Total Strength" value={selectedUnit.strength} icon="👥" color="blue" />
            <StatCard label="On Duty" value={selectedUnit.onDuty} icon="🟢" color="green" />
            <StatCard label="Available" value={selectedUnit.available} icon="⚪" color="slate" />
            <StatCard label="On Leave" value={selectedUnit.onLeave} icon="🏖️" color="amber" />
            <StatCard label="Training" value={selectedUnit.training} icon="📚" color="purple" />
            <StatCard label="Reserve" value={selectedUnit.reserve} icon="🔄" color="sky" />
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm">
            <span className="text-slate-500">Commanding Inspector:</span>
            <span className="font-semibold text-slate-800">{selectedUnit.inspector}</span>
            <Button variant="outline" size="sm" className="ml-auto">View Unit Roster</Button>
            <Button variant="outline" size="sm">View Incidents</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Command Incidents View ──────────────────────────────────────────────────
export function CommandIncidents({ scope }: { scope: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedInc = INCIDENTS.find((i) => i.id === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Incident Management" sub={`Authorized scope: ${scope}`} />

      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Total Active", count: 2, color: "border-l-blue-600" },
          { label: "Critical", count: 0, color: "border-l-red-600" },
          { label: "High Priority", count: 1, color: "border-l-orange-500" },
          { label: "Under Review", count: 1, color: "border-l-amber-500" },
          { label: "Resolved (7d)", count: 4, color: "border-l-emerald-500" },
        ].map((c) => (
          <Card key={c.label} className={`p-3 border-l-4 ${c.color}`}>
            <p className="text-2xl font-display font-bold text-slate-900">{c.count}</p>
            <p className="text-xs text-slate-500">{c.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Incidents table */}
        <Card className="overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-sm">All Incidents</h3>
            <div className="flex gap-2">
              <select className="border border-slate-200 rounded-lg py-1 px-2 text-xs bg-white focus:outline-none">
                <option>All Priority</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
              </select>
              <select className="border border-slate-200 rounded-lg py-1 px-2 text-xs bg-white focus:outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["ID", "Type", "Priority", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INCIDENTS.map((inc) => (
                <tr
                  key={inc.id}
                  className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                    selected === inc.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelected(inc.id)}
                >
                  <td className="px-3 py-2.5 text-xs font-mono text-slate-600">{inc.id}</td>
                  <td className="px-3 py-2.5 text-sm font-medium text-slate-800 max-w-[120px] truncate">{inc.type}</td>
                  <td className="px-3 py-2.5"><Badge label={inc.priority} /></td>
                  <td className="px-3 py-2.5"><Badge label={inc.status} /></td>
                  <td className="px-3 py-2.5 text-xs text-slate-400 font-mono">
                    {inc.created.split(" ")[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Detail panel */}
        {selectedInc ? (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-slate-900">{selectedInc.id}</h3>
              <Badge label={selectedInc.priority} />
            </div>
            <div className="space-y-2 text-sm mb-4">
              {[
                { label: "Type", value: selectedInc.type },
                { label: "Location", value: selectedInc.location },
                { label: "Reported By", value: selectedInc.reportedBy },
                { label: "Assigned To", value: selectedInc.assignedTo },
                { label: "Created", value: selectedInc.created },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-500 w-24">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            <Divider />
            <div className="mb-4">
              <Timeline
                steps={[
                  { label: "Submitted", done: true, time: selectedInc.created.split(" ")[1] },
                  { label: "Acknowledged", done: selectedInc.acknowledged },
                  { label: "Under Review", done: ["Under Review", "Resolved", "Closed"].includes(selectedInc.status) },
                  { label: "Resolved", done: ["Resolved", "Closed"].includes(selectedInc.status) },
                  { label: "Closed", done: selectedInc.status === "Closed" },
                ]}
              />
            </div>
            {selectedInc.status !== "Closed" && (
              <div className="flex flex-wrap gap-2">
                {["Acknowledge", "Escalate", "Assign", "Resolve"].map((a) => (
                  <Button
                    key={a}
                    variant={a === "Resolve" ? "primary" : a === "Escalate" ? "warning" : "outline"}
                    size="sm"
                  >
                    {a}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        ) : (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Select an incident to review
          </div>
        )}
      </div>
    </div>
  );
}
