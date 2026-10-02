import { useState } from "react";
import {
  Card, StatCard, Badge, SectionHeader, DesktopSidebar, SecurityBanner,
  TopNav, Button, TabBar, Divider, PermissionLock, AccessDecisionCard,
} from "../components/ui";
import {
  MANPOWER_STATS, UNIT_DATA, DUTY_COVERAGE_DATA, INCIDENT_TREND,
  COMMAND_HIERARCHY, CURRENT_USERS, ROLES, INCIDENTS,
} from "../data/mock";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,
} from "recharts";
import {
  DesktopMessages, RoleReports, RoleZeroTrust,
  UnitOverview, CommandIncidents,
} from "./SharedScreens";

const COMMAND_NAV = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "units", label: "Unit Overview", icon: "🏢" },
  { id: "incidents", label: "Incidents", icon: "⚠️", badge: 3 },
  { id: "emergency", label: "Emergency Command", icon: "🚨" },
  { id: "hierarchy", label: "Command Hierarchy", icon: "🌲" },
  { id: "reports", label: "Reports", icon: "📊" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "zerotrust", label: "Access Engine", icon: "🔐" },
  { id: "scope", label: "Command Scope", icon: "🗺️" },
];

const HIGHER_NAV = [
  { id: "dashboard", label: "Executive Overview", icon: "🏠" },
  { id: "units", label: "Organization View", icon: "🏢" },
  { id: "incidents", label: "Critical Incidents", icon: "⚠️" },
  { id: "emergency", label: "Emergency Overview", icon: "🚨" },
  { id: "hierarchy", label: "Command Hierarchy", icon: "🌲" },
  { id: "reports", label: "Analytics", icon: "📊" },
];

// ─── Synthetic Operations Map ─────────────────────────────────────────────────
const MAP_MARKERS = [
  { id: "P1", type: "personnel", label: "RF-2847", detail: "Platform 3 · On Duty", x: 22, y: 30, color: "bg-blue-600" },
  { id: "P2", type: "personnel", label: "RF-3091", detail: "Gate A · On Duty", x: 60, y: 20, color: "bg-blue-600" },
  { id: "P3", type: "personnel", label: "RF-1155", detail: "Control Room · Reserve", x: 75, y: 55, color: "bg-sky-500" },
  { id: "P4", type: "personnel", label: "RF-2201", detail: "Platform 1 · On Duty", x: 40, y: 65, color: "bg-blue-600" },
  { id: "I1", type: "incident", label: "INC-2049", detail: "Suspicious Activity · High", x: 25, y: 60, color: "bg-orange-500" },
  { id: "S1", type: "sos", label: "EMERG-0089", detail: "SOS Active · RF-2847", x: 22, y: 30, color: "bg-red-600" },
  { id: "PT1", type: "post", label: "POST-17", detail: "Platform 3 Gate", x: 18, y: 35, color: "bg-slate-600" },
  { id: "PT2", type: "post", label: "POST-08", detail: "Main Entrance", x: 55, y: 15, color: "bg-slate-600" },
  { id: "DEF1", type: "deficit", label: "DEFICIT", detail: "Platform 4 · Understaffed", x: 65, y: 70, color: "bg-amber-500" },
];

function OpsMap() {
  const [selected, setSelected] = useState<typeof MAP_MARKERS[0] | null>(null);

  const typeIcon = (type: string) => {
    if (type === "personnel") return "👤";
    if (type === "incident") return "⚠️";
    if (type === "sos") return "🚨";
    if (type === "post") return "📍";
    if (type === "deficit") return "⚡";
    return "●";
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-slate-900">Operations Map</h3>
          <p className="text-xs text-slate-400">Division North · Station Alpha · Synthetic / Demo Data</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {[
            { color: "bg-blue-600", label: "Personnel" },
            { color: "bg-orange-500", label: "Incident" },
            { color: "bg-red-600", label: "SOS" },
            { color: "bg-amber-500", label: "Deficit" },
            { color: "bg-slate-600", label: "Post" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1">
              <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
              <span className="text-slate-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {/* Map area */}
        <div className="flex-1 relative bg-slate-100 rounded-xl overflow-hidden" style={{ height: 220 }}>
          {/* Grid background */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-6">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="border border-slate-200/60" />
            ))}
          </div>
          {/* Synthetic track lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="10" y1="40" x2="90" y2="40" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 2" />
            <line x1="10" y1="55" x2="90" y2="55" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 2" />
            <rect x="20" y="10" width="20" height="25" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
            <rect x="55" y="60" width="25" height="20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
            <text x="28" y="24" fontSize="3" fill="#94a3b8" textAnchor="middle">STATION A</text>
            <text x="67" y="71" fontSize="3" fill="#94a3b8" textAnchor="middle">DEPOT</text>
          </svg>
          {/* Markers */}
          {MAP_MARKERS.map(m => (
            <button
              key={m.id}
              onClick={() => setSelected(selected?.id === m.id ? null : m)}
              className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg transition-all hover:scale-110 ${m.color} ${
                m.type === "sos" ? "animate-pulse z-20" : "z-10"
              } ${selected?.id === m.id ? "ring-2 ring-white scale-125" : ""}`}
              style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
              title={m.label}
            >
              <span style={{ fontSize: 10 }}>{typeIcon(m.type)}</span>
            </button>
          ))}
          <div className="absolute bottom-2 right-2 bg-white/90 rounded px-2 py-0.5 text-xs text-slate-400 shadow">
            SYNTHETIC · DEMO ONLY
          </div>
        </div>

        {/* Panel */}
        <div className="w-52 flex-shrink-0">
          {selected ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 h-full">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-full ${selected.color} flex items-center justify-center text-white text-xs`}>
                  {typeIcon(selected.type)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{selected.label}</p>
                  <p className="text-xs text-slate-400 capitalize">{selected.type}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-3">{selected.detail}</p>
              {selected.type === "sos" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                  <p className="text-xs text-red-700 font-semibold">ACTIVE EMERGENCY</p>
                  <p className="text-xs text-red-600">Requires immediate acknowledgement</p>
                </div>
              )}
              {selected.type === "deficit" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
                  <p className="text-xs text-amber-700 font-semibold">MANPOWER DEFICIT</p>
                  <p className="text-xs text-amber-600">Required: 3 · Available: 1</p>
                </div>
              )}
              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex justify-between"><span>Updated</span><span className="font-mono">10:22:14</span></div>
                <div className="flex justify-between"><span>Source</span><span>Synthetic data</span></div>
              </div>
              <button className="mt-3 w-full text-xs bg-blue-700 text-white py-1.5 rounded-lg font-semibold">View Details</button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 h-full flex flex-col items-center justify-center text-center">
              <p className="text-2xl mb-2">🗺️</p>
              <p className="text-xs text-slate-500">Click a marker to view contextual details</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

// ─── Command Officer Dashboard ─────────────────────────────────────────────────
function CommandDashboard() {
  const stats = MANPOWER_STATS.command;

  const pieData = [
    { name: "On Duty", value: stats.onDuty, color: "#1d4ed8" },
    { name: "Available", value: stats.available, color: "#16a34a" },
    { name: "On Leave", value: stats.onLeave, color: "#d97706" },
    { name: "Training", value: stats.training, color: "#7c3aed" },
    { name: "Reserve", value: stats.reserve, color: "#0284c7" },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Command Dashboard</p>
          <h2 className="font-display font-black text-2xl text-slate-900">Deputy Commandant Deepak Mehta</h2>
          <p className="text-slate-500 text-sm">Division North · Units Alpha, Beta, Gamma, Delta</p>
        </div>
        <Badge label="On Duty" dot />
      </div>

      <div className="bg-blue-900/10 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
        <span>🔐</span>
        <p className="text-sm text-blue-900"><strong>Authorized Scope:</strong> Division North — 250 Personnel, 4 Units. Actions restricted to authorized scope. All access audited.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-6 gap-3">
        <StatCard label="Total Personnel" value={stats.total} icon="👥" color="blue" sub="Division North" />
        <StatCard label="On Duty" value={stats.onDuty} icon="🟢" color="green" sub="All units" />
        <StatCard label="Available" value={stats.available} icon="⚪" color="slate" sub="Ready" />
        <StatCard label="On Leave" value={stats.onLeave} icon="🏖️" color="amber" sub="Approved" />
        <StatCard label="Training" value={stats.training} icon="📚" color="purple" sub="Off roster" />
        <StatCard label="Reserve" value={stats.reserve} icon="🔄" color="sky" sub="Standby" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Unit-wise manpower */}
        <Card className="p-4 col-span-2">
          <SectionHeader title="Unit-Wise Manpower" sub="Division North · Active strength" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={UNIT_DATA} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="unit" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="strength" name="Total Strength" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="onDuty" name="On Duty" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Distribution pie */}
        <Card className="p-4">
          <SectionHeader title="Personnel Distribution" />
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value" stroke="none">
                {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="flex-1 text-slate-600">{d.name}</span>
                <span className="font-semibold text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Operations Map */}
      <OpsMap />

      <div className="grid grid-cols-2 gap-4">
        {/* Duty coverage */}
        <Card className="p-4">
          <SectionHeader title="Duty Coverage (7 Days)" sub="Target: 95%" />
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={DUTY_COVERAGE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [`${v}%`]} />
              <Line type="monotone" dataKey="covered" stroke="#1d4ed8" strokeWidth={2} dot={{ fill: "#1d4ed8", r: 3 }} name="Coverage" />
              <Line type="monotone" dataKey="target" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Active incidents */}
        <Card className="p-4">
          <SectionHeader title="Active Incidents" sub="Division North" />
          <div className="space-y-2">
            {INCIDENTS.filter(i => !["Closed", "Resolved"].includes(i.status)).map(inc => (
              <div key={inc.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <Badge label={inc.priority} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{inc.type}</p>
                  <p className="text-xs text-slate-500 truncate">{inc.location}</p>
                </div>
                <Badge label={inc.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Command Hierarchy Tree ────────────────────────────────────────────────────
function CommandHierarchyView() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["RF-0101", "RF-0412", "RF-1023", "RF-1047"]));

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const renderNode = (node: any, depth = 0) => {
    const hasChildren = node.children?.length > 0;
    const isExpanded = expanded.has(node.id);
    const isLeaf = !node.role;
    return (
      <div key={node.id} className={`${depth > 0 ? "ml-8" : ""}`}>
        <div className={`flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer transition-all hover:bg-slate-100 ${isLeaf ? "opacity-80" : ""}`}>
          {hasChildren ? (
            <button onClick={() => toggle(node.id)} className="w-5 h-5 rounded flex items-center justify-center text-xs text-slate-500 hover:text-slate-700 flex-shrink-0">
              {isExpanded ? "▼" : "▶"}
            </button>
          ) : (
            <div className="w-5 h-5 flex-shrink-0" />
          )}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
            node.role === "Higher Authority" ? "bg-slate-900" :
            node.role === "Command Officer" ? "bg-blue-800" :
            node.role === "Inspector" ? "bg-blue-600" :
            "bg-blue-400"
          }`}>{node.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">{node.name}</p>
              {node.role && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                node.role === "Higher Authority" ? "bg-slate-200 text-slate-700" :
                node.role === "Command Officer" ? "bg-blue-100 text-blue-800" :
                "bg-sky-100 text-sky-800"
              }`}>{node.role}</span>}
              {node.status && <Badge label={node.status} />}
            </div>
            <p className="text-xs text-slate-500">{node.rank} {node.unit ? `· ${node.unit}` : ""} · {node.id}</p>
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-800">View Profile</button>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4 border-l-2 border-slate-200 pl-2">
            {node.children.map((child: any) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Command Hierarchy" sub="Interactive organizational structure · Your authorized view" />
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-sm text-slate-600">
        <span>ℹ️</span>
        <span>Expand or collapse nodes. Click profile to view details. Scope is limited to your authorized command chain.</span>
      </div>
      {/* Legend */}
      <div className="flex gap-4">
        {[
          { label: "Higher Authority", color: "bg-slate-900" },
          { label: "Command Officer", color: "bg-blue-800" },
          { label: "Inspector", color: "bg-blue-600" },
          { label: "Personnel", color: "bg-blue-400" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-600">
            <div className={`w-3 h-3 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>
      <Card className="p-4">
        {renderNode(COMMAND_HIERARCHY)}
      </Card>
    </div>
  );
}

// ─── Emergency Command Center ──────────────────────────────────────────────────
function EmergencyCenter() {
  const [sosState, setSosState] = useState("Acknowledged");

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <SectionHeader title="Emergency Command Center" sub="Active emergencies · Division North" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full pulse-dot" />
          <span className="text-red-600 font-semibold text-sm">1 ACTIVE</span>
        </div>
      </div>

      {/* Active emergency card */}
      <Card className="p-5 border-red-200 border-l-4 border-l-red-600">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full pulse-dot" />
              <span className="text-red-600 font-bold text-xs uppercase tracking-wide">Active Emergency</span>
            </div>
            <h3 className="font-display font-black text-slate-900 text-xl">EMERG-0089</h3>
            <p className="text-slate-500 text-sm mt-0.5">SOS Alert · Personnel Emergency</p>
          </div>
          <Badge label="Acknowledged" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2 text-sm">
            {[
              { label: "Personnel", value: "RF-2847 Aarav Sharma" },
              { label: "Rank", value: "Constable · Unit Alpha" },
              { label: "Reporting To", value: "Inspector R. Singh" },
              { label: "SOS Time", value: "13 Aug 2026 · 10:22:14" },
              { label: "Location", value: "Platform 3, Station Alpha" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="text-slate-500 w-28">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>
          {/* Simulated map */}
          <div className="bg-slate-100 rounded-xl relative overflow-hidden h-40">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-slate-200/50" />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs animate-pulse">!</div>
              <div className="absolute -inset-3 border-2 border-red-400 rounded-full opacity-60 animate-ping" />
            </div>
            <div className="absolute bottom-2 right-2 bg-white rounded px-2 py-0.5 text-xs text-slate-500 shadow">Station Alpha · Simulated</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-slate-200 pt-4 mb-4">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { event: "SOS Activated", time: "10:22:14", done: true },
              { event: "Acknowledged", time: "10:22:41", done: true },
              { event: "Response Assigned", time: "10:24:05", done: true },
              { event: "Responding", time: "10:26:18", done: false },
              { event: "Resolved", time: "—", done: false },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-max">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step.done ? "bg-blue-700 border-blue-700 text-white" : "bg-white border-slate-300 text-slate-400"}`}>
                  {step.done ? "✓" : i + 1}
                </div>
                <p className="text-xs font-medium text-slate-700">{step.event}</p>
                <p className="text-xs text-slate-400 font-mono">{step.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="primary" size="sm">✓ Acknowledge</Button>
          <Button variant="warning" size="sm">👥 Assign Response</Button>
          <Button variant="outline" size="sm">📞 Contact Officer</Button>
          <Button variant="secondary" size="sm">✓ Mark Resolved</Button>
        </div>
      </Card>

      {/* Past emergencies */}
      <Card className="p-4">
        <SectionHeader title="Recent Emergency History" sub="Last 30 days" />
        <div className="space-y-2">
          {[
            { id: "EMERG-0088", personnel: "Kiran Das", type: "Medical Emergency", time: "10 Aug · 15:44", status: "Resolved" },
            { id: "EMERG-0085", personnel: "Sanjay Rao", type: "Security Threat", time: "05 Aug · 22:11", status: "Resolved" },
            { id: "EMERG-0082", personnel: "Meena Pillai", type: "SOS Alert", time: "28 Jul · 08:33", status: "Resolved" },
          ].map(e => (
            <div key={e.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm">🚨</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{e.id} · {e.type}</p>
                <p className="text-xs text-slate-500">{e.personnel} · {e.time}</p>
              </div>
              <Badge label={e.status === "Resolved" ? "Active" : "Offline"} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Higher Authority Dashboard ────────────────────────────────────────────────
function HigherAuthDashboard() {
  const stats = MANPOWER_STATS.higher;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Executive Command Overview</p>
          <h2 className="font-display font-black text-2xl text-slate-900">Commandant Sunita Verma</h2>
          <p className="text-slate-500 text-sm">Headquarters · All Divisions (Authorized Read-Only View)</p>
        </div>
        <Badge label="Active" dot />
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl">🔐</span>
        <div>
          <p className="font-semibold">Read-Only Executive Scope</p>
          <p className="text-slate-400 text-sm">You are viewing high-level organization data. Sensitive personnel data requires additional authorization.</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        <StatCard label="Total Strength" value={stats.total} icon="👥" color="blue" sub="All Divisions" />
        <StatCard label="On Duty" value={stats.onDuty} icon="🟢" color="green" sub="Active" />
        <StatCard label="Available" value={stats.available} icon="⚪" color="slate" sub="Ready" />
        <StatCard label="On Leave" value={stats.onLeave} icon="🏖️" color="amber" sub="Approved" />
        <StatCard label="Training" value={stats.training} icon="📚" color="purple" sub="Off-roster" />
        <StatCard label="Reserve" value={stats.reserve} icon="🔄" color="sky" sub="Standby" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <SectionHeader title="Division Readiness" />
          <div className="space-y-3">
            {[
              { name: "Division North", coverage: 87, strength: 250 },
              { name: "Division South", coverage: 92, strength: 220 },
              { name: "Division East", coverage: 78, strength: 190 },
              { name: "Division West", coverage: 84, strength: 210 },
              { name: "Division Central", coverage: 95, strength: 330 },
            ].map(d => (
              <div key={d.name} className="flex items-center gap-3">
                <span className="text-sm text-slate-700 w-36">{d.name}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-slate-500 mb-0.5">
                    <span>Coverage</span>
                    <span className={`font-semibold ${d.coverage >= 90 ? "text-emerald-600" : d.coverage >= 80 ? "text-amber-600" : "text-red-600"}`}>{d.coverage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${d.coverage >= 90 ? "bg-emerald-500" : d.coverage >= 80 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${d.coverage}%` }} />
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-12 text-right">{d.strength}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeader title="Critical Incidents" sub="Last 7 days · All Divisions" />
          <div className="space-y-2">
            {INCIDENTS.slice(0, 4).map(inc => (
              <div key={inc.id} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
                <Badge label={inc.priority} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{inc.type}</p>
                  <p className="text-xs text-slate-400 truncate">{inc.location}</p>
                </div>
                <Badge label={inc.status} />
              </div>
            ))}
          </div>
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center gap-2">
            <span>🔒</span>
            <p className="text-xs text-slate-500">Full incident details require additional scope authorization.</p>
          </div>
        </Card>
      </div>

      {/* Authorization required examples */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 opacity-75">
          <div className="flex items-center gap-2 mb-2 text-slate-500">
            <span>🔒</span>
            <p className="text-sm font-semibold">Individual Personnel Data</p>
          </div>
          <p className="text-xs text-slate-400">Sensitive personnel records require explicit scope authorization and need-to-know clearance.</p>
          <button className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold">Request Authorization →</button>
        </Card>
        <Card className="p-4 opacity-75">
          <div className="flex items-center gap-2 mb-2 text-slate-500">
            <span>🔒</span>
            <p className="text-sm font-semibold">Internal Audit Logs</p>
          </div>
          <p className="text-xs text-slate-400">Detailed audit trails are restricted to System Administrators and authorized compliance officers.</p>
        </Card>
        <Card className="p-4 opacity-75">
          <div className="flex items-center gap-2 mb-2 text-slate-500">
            <span>🔒</span>
            <p className="text-sm font-semibold">Operational Media Files</p>
          </div>
          <p className="text-xs text-slate-400">Media classified as Restricted or Sensitive requires per-file authorization from the originating unit.</p>
        </Card>
      </div>
    </div>
  );
}

// ─── Scope Management ──────────────────────────────────────────────────────────
function ScopeManagement() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Command Scope Management" sub="Assign temporary or permanent command scope" />
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-bold text-slate-900 mb-4">Current Scope Assignments</h3>
          <div className="space-y-4">
            {[
              { officer: "Inspector R. Singh", id: "RF-1023", permanent: "Unit Alpha", temp: "Unit Bravo", tempFrom: "01 Sep 2026", tempTo: "07 Sep 2026", status: "Active", active: true },
              { officer: "Inspector P. Nair", id: "RF-1047", permanent: "Unit Beta", temp: null, status: "Permanent Only", active: false },
              { officer: "Inspector G. Mishra", id: "RF-1098", permanent: "Unit Gamma", temp: "Unit Delta", tempFrom: "10 Sep 2026", tempTo: "12 Sep 2026", status: "Scheduled", active: false },
            ].map(s => (
              <div key={s.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-slate-900">{s.officer}</p>
                  <Badge label={s.active ? "Active" : s.status === "Scheduled" ? "Pending" : "Off Duty"} />
                </div>
                <p className="text-xs text-slate-400 font-mono mb-3">{s.id}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-3">
                    <span className="text-slate-500 w-28">Permanent Scope</span>
                    <span className="font-medium text-slate-800">{s.permanent}</span>
                  </div>
                  {s.temp && (
                    <>
                      <div className="flex gap-3">
                        <span className="text-slate-500 w-28">Temporary Scope</span>
                        <span className="font-medium text-blue-700">{s.temp}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-slate-500 w-28">Valid From</span>
                        <span className="font-medium text-slate-800">{s.tempFrom}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-slate-500 w-28">Valid Until</span>
                        <span className="font-medium text-slate-800">{s.tempTo}</span>
                      </div>
                    </>
                  )}
                </div>
                {s.temp && <p className="text-xs text-slate-400 mt-2">⏱ Scope automatically expires on {s.tempTo} at 23:59</p>}
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">Edit Scope</Button>
                  {s.temp && <Button variant="danger" size="sm">Revoke Temp</Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-bold text-slate-900 mb-4">Assign Temporary Scope</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Officer</label>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Inspector R. Singh (RF-1023)</option>
                <option>Inspector P. Nair (RF-1047)</option>
                <option>Inspector G. Mishra (RF-1098)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Temporary Unit/Scope</label>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Unit Bravo</option>
                <option>Unit Delta</option>
                <option>Unit Echo</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Valid From</label>
                <input type="date" defaultValue="2026-09-01" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Valid Until</label>
                <input type="date" defaultValue="2026-09-07" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Justification</label>
              <textarea rows={3} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Operational reason for scope extension..." />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              ⚠️ Scope assignment is audited. Temporary scope automatically expires at the end date. All access under this scope will be logged.
            </div>
            <Button variant="primary" className="w-full">Assign Temporary Scope</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Zero Trust Access Engine ──────────────────────────────────────────────────
export function ZeroTrustView() {
  const [scenario, setScenario] = useState<"granted" | "denied">("granted");

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Zero-Trust Access Engine" sub="Real-time access decision demonstration" />
      <div className="flex gap-2 mb-4">
        <Button variant={scenario === "granted" ? "primary" : "secondary"} size="sm" onClick={() => setScenario("granted")}>✓ Access Granted Example</Button>
        <Button variant={scenario === "denied" ? "danger" : "secondary"} size="sm" onClick={() => setScenario("denied")}>✗ Access Denied Example</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {scenario === "granted" ? (
          <AccessDecisionCard
            user="Inspector R. Singh (RF-1023)"
            resource="Personnel Profile RF-2847 (Unit Alpha)"
            checks={[
              { label: "Identity verified (MFA passed)", pass: true },
              { label: "Role permission: personnel.view", pass: true },
              { label: "Command scope: Unit Alpha ✓", pass: true },
              { label: "Reporting hierarchy: Direct report ✓", pass: true },
              { label: "Need-to-know: Duty officer ✓", pass: true },
              { label: "Security context: Trusted device ✓", pass: true },
            ]}
            result="GRANTED"
          />
        ) : (
          <AccessDecisionCard
            user="Constable V. Singh (RF-2734)"
            resource="Personnel Profile RF-0412 (Command Officer)"
            checks={[
              { label: "Identity verified (MFA passed)", pass: true },
              { label: "Role permission: personnel.view", pass: true },
              { label: "Command scope: Unit Alpha only ✕", pass: false },
              { label: "Reporting hierarchy: Not in chain ✕", pass: false },
              { label: "Need-to-know: No operational basis ✕", pass: false },
              { label: "Security context: Trusted device ✓", pass: true },
            ]}
            result="DENIED"
            reason="Personnel RF-0412 is outside your authorized command scope. This access attempt has been logged."
          />
        )}

        <Card className="p-5">
          <h3 className="font-display font-bold text-slate-900 mb-4">Security Principles Applied</h3>
          <div className="space-y-4">
            {[
              { icon: "🔐", title: "Zero-Trust", desc: "Never trust, always verify. Every access decision is evaluated independently regardless of network location or user." },
              { icon: "👤", title: "Least Privilege", desc: "Users only receive the minimum permissions required for their specific role, unit, and operational context." },
              { icon: "🗺️", title: "Scope-Based Access", desc: "Access is bounded by command scope — even high-ranked officers cannot access personnel outside their chain of command." },
              { icon: "🔍", title: "Need-to-Know", desc: "Sensitive data is only accessible when there is a legitimate operational reason, regardless of rank or role." },
              { icon: "📋", title: "Complete Audit Trail", desc: "Every access decision — granted or denied — creates an immutable audit record with full context." },
            ].map(p => (
              <div key={p.title} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{p.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Main Command View ─────────────────────────────────────────────────────────
export function CommandView({ role }: { role: string }) {
  const [screen, setScreen] = useState("dashboard");
  const isHigherAuth = role === ROLES.HIGHER_AUTHORITY;
  const user = CURRENT_USERS[role as keyof typeof CURRENT_USERS] || CURRENT_USERS[ROLES.COMMAND_OFFICER];
  const nav = isHigherAuth ? HIGHER_NAV : COMMAND_NAV;

  const getScreen = () => {
    switch (screen) {
      case "dashboard": return isHigherAuth ? <HigherAuthDashboard /> : <CommandDashboard />;
      case "hierarchy": return <CommandHierarchyView />;
      case "emergency": return <EmergencyCenter />;
      case "zerotrust": return <ZeroTrustView />;
      case "scope": return <ScopeManagement />;
      case "units": return <UnitOverview scope={user.scope} />;
      case "incidents": return <CommandIncidents scope={user.scope} />;
      case "reports": return <RoleReports role={role} scope={user.scope} />;
      case "messages": return <DesktopMessages role={role} scope={user.scope} />;
      default: return isHigherAuth ? <HigherAuthDashboard /> : <CommandDashboard />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <SecurityBanner scope={`${user.scope} · ${user.name}`} />
      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar
          items={nav}
          active={screen}
          onSelect={setScreen}
          user={{ name: user.name, rank: user.rank, avatar: user.avatar, id: user.id }}
        />
        <main className="flex-1 overflow-hidden">
          {getScreen()}
        </main>
      </div>
    </div>
  );
}
