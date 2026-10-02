import { useState } from "react";
import {
  Card, Badge, StatCard, SectionHeader, DesktopSidebar, SecurityBanner,
  Button, TabBar, Divider, AlertBanner,
} from "../components/ui";
import {
  AUDIT_EVENTS, SESSION_DATA, PERMISSIONS, CURRENT_USERS, ROLES, MEDIA_FILES,
} from "../data/mock";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const ADMIN_NAV = [
  { id: "security", label: "Security Monitoring", icon: "🛡️" },
  { id: "audit", label: "Audit Log", icon: "📋" },
  { id: "permissions", label: "Permission Management", icon: "🔑" },
  { id: "roles", label: "Role Management", icon: "👥" },
  { id: "sessions", label: "Active Sessions", icon: "🖥️" },
  { id: "media", label: "Media Center", icon: "🖼️" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "reports", label: "Reports & Analytics", icon: "📊" },
  { id: "search", label: "Global Search", icon: "🔍" },
];

// ─── SOC Command Center ────────────────────────────────────────────────────────
const LIVE_EVENTS = [
  { time: "10:38:44", type: "ALERT", event: "Failed Authentication", detail: "Unknown user · RF-9999 · 3 attempts · Station Beta terminal", severity: "Warning" },
  { time: "10:36:11", type: "ANOMALY", event: "Unrecognized Device", detail: "RF-1023 · Device fingerprint mismatch · New browser", severity: "Warning" },
  { time: "10:35:02", type: "DENIED", event: "Out-of-Scope Access", detail: "RF-2734 attempted RF-0412 profile · Not in command chain", severity: "Warning" },
  { time: "10:30:17", type: "CRITICAL", event: "Permission Change", detail: "Admin A. Bose modified Inspector role permissions · AUD-002390", severity: "Critical" },
  { time: "10:22:14", type: "ALERT", event: "SOS Emergency Activated", detail: "RF-2847 activated emergency protocol · Platform 3 Station Alpha", severity: "Critical" },
  { time: "10:18:55", type: "ANOMALY", event: "Off-Hours Access Attempt", detail: "RF-3201 accessed system at 02:18 local time · Outside duty hours", severity: "Warning" },
  { time: "09:55:08", type: "OVERRIDE", event: "Duty Override", detail: "RF-1023 duty override with documented reason · AUD-002383", severity: "Info" },
  { time: "09:41:30", type: "ANOMALY", event: "Bulk Record Access", detail: "RF-2201 accessed 47 records in 2 minutes · Anomaly threshold exceeded", severity: "Warning" },
  { time: "09:11:22", type: "INFO", event: "Concurrent Sessions", detail: "RF-1023 logged in from 2 different terminals simultaneously", severity: "Info" },
  { time: "08:52:04", type: "INFO", event: "Privilege Probing", detail: "RF-3091 attempted 4 unauthorized resource accesses · Logged", severity: "Warning" },
];

function SecurityMonitoring() {
  const [paused, setPaused] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const failedLoginData = [
    { time: "00:00", count: 0 }, { time: "03:00", count: 1 }, { time: "06:00", count: 2 },
    { time: "09:00", count: 5 }, { time: "10:00", count: 12 }, { time: "12:00", count: 3 },
    { time: "15:00", count: 1 }, { time: "18:00", count: 2 }, { time: "21:00", count: 0 },
  ];

  const riskSubjects = [
    { id: "RF-3201", score: 72, level: "HIGH", factors: ["Off-Hours Access", "Unrecognized Device", "Multiple Auth Failures"], action: "Step-up verification / SOC review" },
    { id: "RF-2734", score: 44, level: "MEDIUM", factors: ["Out-of-Scope Access Attempts", "New Device Registered"], action: "Monitor · No immediate action required" },
    { id: "RF-9999", score: 91, level: "CRITICAL", factors: ["Unknown User ID", "Repeated Auth Failures", "Suspicious IP Range"], action: "Account lockout · Immediate SOC review" },
  ];

  const selected = riskSubjects.find(r => r.id === selectedRisk);

  return (
    <div className="p-6 space-y-5 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-0.5">SOC Command Center</p>
          <h2 className="font-display font-black text-2xl text-slate-900">Security Operations Center</h2>
          <p className="text-slate-500 text-sm">System Administrator Access · All Divisions · Live Monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full pulse-dot" />
          <span className="text-red-600 font-semibold text-sm font-mono">LIVE</span>
        </div>
      </div>

      <AlertBanner type="error" message="CRITICAL: 2 high-priority security events require immediate SOC review." />

      {/* Security stats */}
      <div className="grid grid-cols-5 gap-3">
        <StatCard label="Active Sessions" value={SESSION_DATA.activeSessions} icon="🖥️" color="blue" sub="Right now" />
        <StatCard label="Failed Logins" value={SESSION_DATA.failedLogins} icon="🔴" color="red" sub="Today" />
        <StatCard label="Access Denials" value={SESSION_DATA.accessDenials} icon="🚫" color="amber" sub="Today" />
        <StatCard label="Security Alerts" value={SESSION_DATA.securityAlerts} icon="⚠️" color="red" sub="Active" />
        <StatCard label="Anomalies Detected" value={4} icon="🔍" color="purple" sub="Today" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Failed logins chart */}
        <Card className="p-4">
          <SectionHeader title="Authentication Events" sub="Failed logins by hour · Today" />
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={failedLoginData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} name="Failed Attempts" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Access Risk Scoring */}
        <Card className="p-4">
          <SectionHeader title="Access Risk Signals" sub="Decision-support · Requires human review" />
          <div className="space-y-2 mb-2">
            {riskSubjects.map(r => (
              <button key={r.id} onClick={() => setSelectedRisk(selectedRisk === r.id ? null : r.id)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${selectedRisk === r.id ? "border-blue-300 bg-blue-50" : "border-slate-100 bg-slate-50 hover:bg-slate-100"}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold text-slate-800">{r.id}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${
                      r.level === "CRITICAL" ? "bg-red-100 text-red-700" :
                      r.level === "HIGH" ? "bg-orange-100 text-orange-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>{r.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${r.score >= 85 ? "bg-red-600" : r.score >= 60 ? "bg-orange-500" : "bg-amber-500"}`} style={{ width: `${r.score}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700">{r.score}/100</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {selected && (
            <div className="bg-slate-900 text-white rounded-lg p-3 text-xs space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold">{selected.id} · Risk Score: {selected.score}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${selected.level === "CRITICAL" ? "bg-red-600" : "bg-orange-600"}`}>{selected.level}</span>
              </div>
              <p className="text-slate-300 font-semibold text-xs">Risk Factors:</p>
              {selected.factors.map(f => <p key={f} className="text-slate-400">· {f}</p>)}
              <div className="border-t border-slate-700 pt-2 mt-1">
                <p className="text-amber-300 font-semibold">Decision-support signal · Requires human investigation</p>
                <p className="text-slate-400 mt-0.5">Recommended: {selected.action}</p>
              </div>
              <p className="text-slate-600 text-xs">Score does not constitute evidence of misconduct.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Live Security Event Stream */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3 bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot" />
            <span className="text-white font-mono text-sm font-semibold">LIVE SECURITY EVENT STREAM</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPaused(!paused)} className="text-xs text-slate-400 hover:text-white font-mono border border-slate-700 px-2 py-0.5 rounded">
              {paused ? "▶ RESUME" : "⏸ PAUSE"}
            </button>
            <span className="text-slate-500 text-xs font-mono">SYNTHETIC DATA</span>
          </div>
        </div>
        <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
          {LIVE_EVENTS.map((e, i) => (
            <div key={i} className={`flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors ${
              e.severity === "Critical" ? "border-l-2 border-l-red-500" :
              e.severity === "Warning" ? "border-l-2 border-l-amber-400" :
              "border-l-2 border-l-transparent"
            }`}>
              <span className="text-xs font-mono text-slate-400 w-20 flex-shrink-0 pt-0.5">{e.time}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-mono font-bold mt-0.5 flex-shrink-0 ${
                e.type === "CRITICAL" ? "bg-red-100 text-red-700" :
                e.type === "ALERT" ? "bg-red-50 text-red-600" :
                e.type === "ANOMALY" ? "bg-orange-100 text-orange-700" :
                e.type === "DENIED" ? "bg-amber-100 text-amber-700" :
                e.type === "OVERRIDE" ? "bg-purple-100 text-purple-700" :
                "bg-slate-100 text-slate-600"
              }`}>{e.type}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{e.event}</p>
                <p className="text-xs text-slate-500 truncate">{e.detail}</p>
              </div>
              <span className={`text-xs font-semibold mt-0.5 flex-shrink-0 ${
                e.severity === "Critical" ? "text-red-600" :
                e.severity === "Warning" ? "text-amber-600" :
                "text-slate-400"
              }`}>{e.severity}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Audit Log ─────────────────────────────────────────────────────────────────
const HASH_CHAIN = [
  { block: 10419, hash: "a3f9c1b2d5e7f8a4", prevHash: "8c2e4f6a1b3d5e7f", ts: "10:18:32", verified: true },
  { block: 10420, hash: "b7e2041c9f3a6d8e", prevHash: "a3f9c1b2d5e7f8a4", ts: "10:22:14", verified: true },
  { block: 10421, hash: "c4d8f2a7b1e3c5d9", prevHash: "b7e2041c9f3a6d8e", ts: "10:30:17", verified: true },
  { block: 10422, hash: "d1e5b9c3a8f7e2b4", prevHash: "c4d8f2a7b1e3c5d9", ts: "10:35:02", verified: true },
  { block: 10423, hash: "e6a2d4f8c1b7e3a9", prevHash: "d1e5b9c3a8f7e2b4", ts: "10:38:44", verified: true },
];

function AuditLog() {
  const [filter, setFilter] = useState("All");
  const [showChain, setShowChain] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const filters = ["All", "AUTHORIZED", "DENIED", "Critical", "Warning"];

  const filtered = filter === "All" ? AUDIT_EVENTS :
    filter === "AUTHORIZED" ? AUDIT_EVENTS.filter(e => e.outcome === "AUTHORIZED" || e.outcome === "AUTHORIZED with Reason") :
    filter === "DENIED" ? AUDIT_EVENTS.filter(e => e.outcome.startsWith("DENIED")) :
    AUDIT_EVENTS.filter(e => e.severity === filter);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); }, 2000);
  };

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Audit Ledger" sub="Cryptographically Hash-Chained Audit Ledger · Immutable" />
      <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-400">🔗</span>
          <span className="text-slate-300"><strong className="text-white">Cryptographically Hash-Chained Audit Ledger.</strong> Every record is linked to the previous via SHA-256. Administrators can view but cannot modify.</span>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => setShowChain(!showChain)} className="text-xs text-blue-400 border border-slate-700 px-3 py-1 rounded font-mono hover:bg-slate-800">
            {showChain ? "Hide Chain" : "Show Chain"}
          </button>
          <button onClick={handleVerify} disabled={verifying} className="text-xs bg-blue-700 text-white px-3 py-1 rounded font-mono hover:bg-blue-600 disabled:opacity-60">
            {verifying ? "Verifying..." : "Verify Integrity"}
          </button>
        </div>
      </div>

      {verified && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
          <span className="text-emerald-600 text-xl">✓</span>
          <div>
            <p className="font-semibold text-emerald-800">AUDIT CHAIN VALID</p>
            <p className="text-xs text-emerald-600">All 10,423 blocks verified · No tampering detected · Last check: just now</p>
          </div>
        </div>
      )}

      {/* Hash chain visualization */}
      {showChain && (
        <Card className="p-4 bg-slate-950 border-slate-800">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">Cryptographic Hash Chain (Recent Blocks)</p>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {HASH_CHAIN.map((b, i) => (
              <div key={b.block} className="flex items-center gap-1 flex-shrink-0">
                <div className="bg-slate-800 border border-slate-600 rounded-lg p-2.5 min-w-[130px]">
                  <p className="text-slate-400 text-xs font-mono">Block #{b.block}</p>
                  <p className="text-emerald-400 text-xs font-mono mt-1 truncate">{b.hash.slice(0, 8)}...</p>
                  <p className="text-slate-600 text-xs font-mono mt-0.5 truncate">← {b.prevHash.slice(0, 8)}...</p>
                  <p className="text-slate-500 text-xs font-mono mt-1">{b.ts}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-emerald-400 text-xs">✓</span>
                    <span className="text-emerald-400 text-xs font-mono">VERIFIED</span>
                  </div>
                </div>
                {i < HASH_CHAIN.length - 1 && (
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-6 h-px bg-slate-600" />
                    <span className="text-slate-500 text-xs font-mono">SHA</span>
                    <div className="w-6 h-px bg-slate-600" />
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-6 h-px bg-slate-600" />
              <div className="bg-slate-800 border border-slate-700 border-dashed rounded-lg p-2.5 min-w-[100px] text-center">
                <p className="text-slate-600 text-xs font-mono">Next block</p>
                <p className="text-slate-700 text-xs font-mono mt-1">Pending...</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <input type="text" placeholder="Search by user, resource, ID..." className="border border-slate-200 rounded-lg py-1.5 px-3 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="date" defaultValue="2026-08-13" className="border border-slate-200 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              {["Audit ID", "Time", "User", "Action", "Resource", "Outcome", "Severity"].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(ev => (
              <tr key={ev.id} className={`hover:bg-slate-50 transition-colors text-sm ${ev.outcome.startsWith("DENIED") ? "bg-red-50/30" : ev.severity === "Critical" ? "bg-amber-50/20" : ""}`}>
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{ev.id}</td>
                <td className="px-4 py-3 text-xs text-slate-600 font-mono whitespace-nowrap">{ev.time}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{ev.user}</p>
                  <p className="text-xs text-slate-400">{ev.userId}</p>
                </td>
                <td className="px-4 py-3 text-slate-700">{ev.action}</td>
                <td className="px-4 py-3 text-slate-600 font-mono text-xs">{ev.resource}</td>
                <td className="px-4 py-3">
                  <Badge label={ev.outcome as any} />
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold ${ev.severity === "Critical" ? "text-red-600" : ev.severity === "Warning" ? "text-amber-600" : "text-slate-500"}`}>
                    {ev.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 bg-slate-50">
          <span>Showing {filtered.length} of {AUDIT_EVENTS.length} records · Page 1 of 248</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">← Prev</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white">Next →</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Permission Management ─────────────────────────────────────────────────────
function PermissionManagement() {
  const roles = Object.keys(PERMISSIONS);
  const allPermissions = [
    "duty.view", "duty.create", "duty.assign", "duty.publish",
    "leave.request", "leave.approve", "leave.approve_limited",
    "personnel.view_unit", "personnel.view_division",
    "incident.report", "incident.view", "incident.manage", "incident.escalate",
    "media.upload", "media.view", "media.download",
    "emergency.respond", "emergency.command",
    "reports.view", "reports.view_all",
    "system.configure", "roles.manage", "permissions.manage", "audit.view", "scope.assign",
  ];

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Permission Management" sub="Role-based access control matrix" />
      <AlertBanner type="warning" message="Permission changes are sensitive operations. All modifications create critical audit events." />

      <Card className="overflow-x-auto">
        <div className="min-w-max">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide w-52 bg-slate-50 sticky left-0">Permission</th>
                {roles.map(role => (
                  <th key={role} className="px-3 py-3 text-xs font-semibold text-slate-700 text-center whitespace-nowrap">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {role.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                      <span>{role}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allPermissions.map(perm => {
                const [category] = perm.split(".");
                return (
                  <tr key={perm} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 bg-white sticky left-0 border-r border-slate-200">
                      <div>
                        <span className="text-xs bg-slate-100 text-slate-600 rounded px-1.5 py-0.5 mr-2 font-mono">{category}</span>
                        <span className="text-sm text-slate-700">{perm}</span>
                      </div>
                    </td>
                    {roles.map(role => {
                      const has = (PERMISSIONS as any)[role]?.includes(perm);
                      return (
                        <td key={role} className="px-3 py-2.5 text-center">
                          <div className={`w-6 h-6 rounded mx-auto flex items-center justify-center text-xs font-bold ${has ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-300"}`}>
                            {has ? "✓" : "—"}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <SectionHeader title="Modify Role Permissions" sub="System Administrator only" />
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Select Role</label>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Permission</label>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {allPermissions.slice(0, 10).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Action</label>
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-100 text-emerald-800 rounded-lg py-2 text-sm font-semibold hover:bg-emerald-200">Grant</button>
                <button className="flex-1 bg-red-100 text-red-800 rounded-lg py-2 text-sm font-semibold hover:bg-red-200">Revoke</button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Reason (required)</label>
              <textarea rows={2} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Document the reason for this change..." />
            </div>
            <AlertBanner type="warning" message="This will create a CRITICAL audit event." />
            <Button variant="primary" className="w-full">Apply Permission Change</Button>
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeader title="Recent Permission Changes" />
          <div className="space-y-3">
            {[
              { time: "10:30 AM", admin: "Admin A. Bose", action: "GRANTED", perm: "duty.publish", role: "Inspector", reason: "Operational requirement" },
              { time: "Yesterday", admin: "Admin A. Bose", action: "REVOKED", perm: "media.download", role: "Personnel", reason: "Policy update 2026-08" },
              { time: "12 Aug", admin: "Admin A. Bose", action: "GRANTED", perm: "leave.approve_limited", role: "Supervisor", reason: "Delegation of authority" },
            ].map((c, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.action === "GRANTED" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{c.action}</span>
                  <span className="font-mono text-xs text-slate-600">{c.perm}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-xs text-slate-600">{c.role}</span>
                </div>
                <p className="text-xs text-slate-500">By {c.admin} · {c.time}</p>
                <p className="text-xs text-slate-400 mt-0.5">Reason: {c.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Media Center ──────────────────────────────────────────────────────────────
function MediaCenter() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const sm = MEDIA_FILES.find(m => m.id === selectedMedia);

  if (sm) {
    return (
      <div className="p-6 space-y-4 overflow-y-auto h-full">
        <button onClick={() => setSelectedMedia(null)} className="text-sm text-blue-600 hover:text-blue-800">← Back to Media Center</button>
        <Card className="p-5 max-w-xl">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-sm text-amber-800">
            <span>⚠️</span>
            <span>Viewing this media creates an audit record. Access is logged with your identity and timestamp.</span>
          </div>
          {/* Secure preview area */}
          <div className={`w-full h-48 rounded-xl flex items-center justify-center mb-4 ${
            sm.classification === "Operational" ? "bg-blue-50 border border-blue-200" :
            sm.classification === "Restricted" ? "bg-amber-50 border border-amber-200" :
            "bg-red-50 border border-red-200"
          }`}>
            <div className="text-center">
              <span className="text-5xl">{sm.type === "image" ? "🖼️" : "📄"}</span>
              <p className="text-sm font-medium text-slate-600 mt-2">Secure Preview Mode</p>
              <p className="text-xs text-slate-400 mt-0.5">Watermarked · Non-downloadable preview</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { label: "Reference ID", value: sm.id },
              { label: "File Name", value: sm.name },
              { label: "Uploaded By", value: sm.uploader },
              { label: "Date", value: sm.uploaded },
              { label: "Related Incident", value: sm.incident },
              { label: "Classification", value: sm.classification },
              { label: "Size", value: sm.size },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 py-1.5 border-b border-slate-100 last:border-0">
                <span className="text-slate-500 w-32">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="primary" size="sm">👁 View Full</Button>
            {sm.classification === "Operational" && <Button variant="outline" size="sm">⬇ Download</Button>}
            {sm.classification !== "Operational" && (
              <Button variant="secondary" size="sm">🔒 Request Access</Button>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-3 font-mono">Access logged · AUD-VIEW-{sm.id}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="Secure Media Center"
        sub="All media is encrypted, access-controlled, and audited"
        action={
          <div className="flex gap-2">
            <button onClick={() => setView("grid")} className={`p-2 rounded-lg ${view === "grid" ? "bg-slate-200" : "hover:bg-slate-100"}`}>⊞</button>
            <button onClick={() => setView("list")} className={`p-2 rounded-lg ${view === "list" ? "bg-slate-200" : "hover:bg-slate-100"}`}>☰</button>
          </div>
        }
      />
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input placeholder="Search by reference, uploader, incident..." className="w-full border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        </div>
        <select className="border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none w-36">
          <option>All Types</option>
          <option>Images</option>
          <option>Documents</option>
        </select>
        <select className="border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none w-40">
          <option>All Classifications</option>
          <option>Operational</option>
          <option>Restricted</option>
          <option>Sensitive</option>
        </select>
      </div>

      {view === "list" ? (
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Reference ID", "File", "Type", "Uploaded By", "Date", "Incident", "Classification", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MEDIA_FILES.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-slate-600">{m.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{m.type === "image" ? "🖼️" : "📄"}</span>
                      <span className="text-sm font-medium text-slate-800 max-w-[140px] truncate">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 capitalize">{m.type}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{m.uploader}</td>
                  <td className="px-4 py-3 text-xs text-slate-400 font-mono">{m.uploaded}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{m.incident}</td>
                  <td className="px-4 py-3"><Badge label={m.classification as any} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedMedia(m.id)} className="text-xs text-blue-600 hover:text-blue-800 font-medium">View</button>
                      {m.classification === "Operational" && <button className="text-xs text-slate-500 hover:text-slate-700 ml-2">↓</button>}
                      {m.classification !== "Operational" && <span className="text-xs text-slate-300 ml-2">🔒</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {MEDIA_FILES.map(m => (
            <Card key={m.id} className="p-3 cursor-pointer hover:border-blue-300 transition-all" onClick={() => setSelectedMedia(m.id)}>
              <div className={`w-full h-28 rounded-lg flex items-center justify-center mb-3 ${
                m.classification === "Operational" ? "bg-blue-50" :
                m.classification === "Restricted" ? "bg-amber-50" : "bg-red-50"
              }`}>
                <span className="text-4xl">{m.type === "image" ? "🖼️" : "📄"}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">{m.name}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{m.id}</p>
              <div className="mt-2 flex items-center justify-between">
                <Badge label={m.classification as any} />
                {m.classification !== "Operational" && <span className="text-slate-400">🔒</span>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Notifications ─────────────────────────────────────────────────────────────
function NotificationCenter() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Duty", "Leave", "Incident", "Emergency", "Security", "System"];

  const allNotifs = [
    { id: 1, cat: "Duty", title: "Duty Roster Published", msg: "Roster for 14 Aug 2026 published by Inspector R. Singh", time: "10:45 AM", read: false, priority: "normal" },
    { id: 2, cat: "Security", title: "Failed Login Attempt", msg: "3 failed login attempts detected from IP 192.168.10.99", time: "10:38 AM", read: false, priority: "high" },
    { id: 3, cat: "Emergency", title: "SOS Activated", msg: "Personnel RF-2847 activated SOS at Platform 3, Station Alpha", time: "10:22 AM", read: true, priority: "critical" },
    { id: 4, cat: "Security", title: "Permission Change", msg: "Admin A. Bose modified Inspector role permissions", time: "10:30 AM", read: true, priority: "high" },
    { id: 5, cat: "Leave", title: "Leave Request Pending", msg: "LR-8821: Vikram Singh (RF-2734) requesting 4 days Casual Leave", time: "09:00 AM", read: true, priority: "normal" },
    { id: 6, cat: "Incident", title: "New Incident Reported", msg: "INC-2047: Suspicious Activity at Platform 3 by RF-2847", time: "09:15 AM", read: true, priority: "high" },
    { id: 7, cat: "System", title: "Maintenance Scheduled", msg: "System maintenance on 15 Aug 2026 02:00–04:00. Plan offline workflows.", time: "Yesterday", read: true, priority: "low" },
  ];

  const filtered = filter === "All" ? allNotifs : allNotifs.filter(n => n.cat === filter);
  const unread = allNotifs.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Notification Center" sub={`${unread} unread notifications`} />
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === c ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Mark All Read</Button>
          <Button variant="ghost" size="sm">Clear All</Button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(n => (
          <Card key={n.id} className={`p-4 ${!n.read ? "border-blue-200 bg-blue-50/30" : ""}`}>
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? "bg-blue-600" : "bg-transparent"}`} />
              <div className="flex-shrink-0 text-xl">
                {n.cat === "Duty" && "📋"}{n.cat === "Leave" && "🗓️"}{n.cat === "Incident" && "⚠️"}
                {n.cat === "Emergency" && "🚨"}{n.cat === "Security" && "🔐"}{n.cat === "System" && "⚙️"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-slate-900 text-sm">{n.title}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    n.priority === "critical" ? "bg-red-100 text-red-700" :
                    n.priority === "high" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-500"
                  }`}>{n.priority}</span>
                  {!n.read && <span className="text-xs text-blue-600 font-semibold">NEW</span>}
                </div>
                <p className="text-sm text-slate-600">{n.msg}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
              <div className="flex gap-1">
                <button className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded hover:bg-slate-100">Mark Read</button>
                <button className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded hover:bg-slate-100">✕</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Reports & Analytics ───────────────────────────────────────────────────────
function ReportsAnalytics() {
  const [period, setPeriod] = useState("Weekly");
  const { DUTY_COVERAGE_DATA: dcData, INCIDENT_TREND: itData } = { DUTY_COVERAGE_DATA, INCIDENT_TREND };

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="Reports & Analytics"
        sub="Operational metrics · All data within authorized scope"
        action={
          <div className="flex gap-1.5">
            {["Daily", "Weekly", "Monthly", "Custom"].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${period === p ? "bg-blue-700 text-white border-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>{p}</button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Avg Duty Coverage" value="87%" icon="📊" color="blue" sub={period} />
        <StatCard label="Incidents" value="7" icon="⚠️" color="amber" sub="This week" />
        <StatCard label="SOS Events" value="1" icon="🚨" color="red" sub="This week" />
        <StatCard label="Avg Response Time" value="9m 30s" icon="⏱️" color="green" sub="Emergency" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <SectionHeader title="Duty Coverage %" sub="7 days · Target 95%" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DUTY_COVERAGE_DATA} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#64748b" }} unit="%" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: any) => [`${v}%`]} />
              <Bar dataKey="covered" fill="#1d4ed8" radius={[4, 4, 0, 0]} name="Coverage %" />
              <Bar dataKey="target" fill="#dc2626" radius={[4, 4, 0, 0]} name="Target" opacity={0.2} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <SectionHeader title="Incident Trend" sub="6 months" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={INCIDENT_TREND} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <SectionHeader title="Shift Distribution" sub="Personnel by shift" />
          <div className="space-y-3">
            {[
              { shift: "Shift A (06:00–14:00)", count: 18, total: 48 },
              { shift: "Shift B (14:00–22:00)", count: 16, total: 48 },
              { shift: "Shift C (22:00–06:00)", count: 14, total: 48 },
            ].map(s => (
              <div key={s.shift} className="flex items-center gap-3 text-sm">
                <span className="text-slate-600 w-48">{s.shift}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${(s.count / s.total) * 100}%` }} />
                </div>
                <span className="font-semibold text-slate-800 w-8 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeader title="Leave Trends" sub="By type · This month" />
          <div className="space-y-2">
            {[
              { type: "Casual Leave", count: 12, color: "bg-amber-500" },
              { type: "Medical Leave", count: 5, color: "bg-red-500" },
              { type: "Earned Leave", count: 8, color: "bg-blue-500" },
              { type: "Compensatory Off", count: 3, color: "bg-purple-500" },
            ].map(l => (
              <div key={l.type} className="flex items-center gap-3 text-sm">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${l.color}`} />
                <span className="flex-1 text-slate-600">{l.type}</span>
                <div className="w-32 bg-slate-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${l.color}`} style={{ width: `${(l.count / 28) * 100}%` }} />
                </div>
                <span className="font-semibold text-slate-800 w-6 text-right">{l.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// re-import for reports
import { DUTY_COVERAGE_DATA, INCIDENT_TREND } from "../data/mock";

// ─── Role Management ──────────────────────────────────────────────────────────
function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<string | null>("Inspector");
  const roles = [
    {
      name: "Personnel",
      users: 890,
      desc: "Field officers performing patrol and duty assignments.",
      permCount: 6,
      color: "bg-slate-100 text-slate-700",
    },
    {
      name: "Supervisor",
      users: 120,
      desc: "Unit supervisors with limited approval authority.",
      permCount: 10,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Inspector",
      users: 48,
      desc: "Unit commanding officers. Duty creation, leave approval, incident management.",
      permCount: 16,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      name: "Command Officer",
      users: 12,
      desc: "Division-level command. Broad operational oversight within authorized scope.",
      permCount: 12,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Higher Authority",
      users: 4,
      desc: "Executive read-only oversight. Cannot directly modify operational data.",
      permCount: 7,
      color: "bg-amber-100 text-amber-800",
    },
    {
      name: "System Administrator",
      users: 3,
      desc: "Technical system access. Cannot access operational classified data.",
      permCount: 6,
      color: "bg-red-100 text-red-800",
    },
  ];

  const sel = roles.find((r) => r.name === selectedRole);

  return (
    <div className="p-6 space-y-5 overflow-y-auto h-full">
      <SectionHeader
        title="Role Management"
        sub="System roles define the permission baseline for every user. Changes are audited."
      />
      <AlertBanner
        type="warning"
        message="Modifying roles affects all users assigned to that role. Every change creates a CRITICAL audit event."
      />

      <div className="grid grid-cols-3 gap-4">
        {/* Role list */}
        <div className="space-y-2">
          {roles.map((r) => (
            <button
              key={r.name}
              onClick={() => setSelectedRole(r.name)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedRole === r.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.color}`}>
                  {r.name}
                </span>
                <span className="text-xs text-slate-400">{r.users} users</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.desc}</p>
              <p className="text-xs text-slate-400 mt-1">{r.permCount} permissions</p>
            </button>
          ))}
        </div>

        {/* Role detail */}
        {sel && (
          <div className="col-span-2 space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-xl">{sel.name}</h3>
                  <p className="text-slate-500 text-sm mt-0.5">{sel.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-slate-900">{sel.users}</p>
                  <p className="text-xs text-slate-400">active users</p>
                </div>
              </div>

              <Divider label="Assigned Permissions" />
              <div className="grid grid-cols-2 gap-2">
                {(PERMISSIONS as any)[sel.name]?.map((perm: string) => (
                  <div
                    key={perm}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg text-xs"
                  >
                    <span className="text-emerald-600">✓</span>
                    <span className="font-mono text-slate-700">{perm}</span>
                  </div>
                ))}
              </div>

              <Divider label="Manage Role" />
              <div className="flex gap-3">
                <Button variant="outline" size="sm">✏️ Edit Role Name</Button>
                <Button variant="warning" size="sm">+ Add Permission</Button>
                <Button variant="danger" size="sm">− Remove Permission</Button>
                <Button variant="secondary" size="sm">👥 View Users</Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                ⚠️ All role modifications create CRITICAL audit events and may affect {sel.users} active users.
              </p>
            </Card>

            <Card className="p-4">
              <SectionHeader title="Recent Role Changes" sub="Last 30 days" />
              <div className="space-y-2">
                {[
                  { time: "13 Aug · 10:30 AM", action: "GRANTED duty.publish → Inspector", admin: "Admin A. Bose" },
                  { time: "12 Aug · 15:22 PM", action: "GRANTED leave.approve_limited → Supervisor", admin: "Admin A. Bose" },
                  { time: "10 Aug · 09:11 AM", action: "REVOKED media.download → Personnel", admin: "Admin A. Bose" },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 text-sm"
                  >
                    <span className="text-xs font-mono text-slate-400 w-40 flex-shrink-0">{c.time}</span>
                    <span className="flex-1 text-slate-700">{c.action}</span>
                    <span className="text-xs text-slate-500">{c.admin}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Active Sessions ──────────────────────────────────────────────────────────
function ActiveSessions() {
  const [terminating, setTerminating] = useState<string | null>(null);

  const sessions = [
    { id: "SES-2026081310414492", user: "Inspector R. Singh", userId: "RF-1023", device: "Station Alpha Terminal #04", browser: "Chrome 127", network: "192.168.10.44 (Internal)", location: "Station Alpha, North Zone", started: "13 Aug · 10:41 AM", duration: "12m 33s", mfa: true, trusted: true, risk: "Low" },
    { id: "SES-2026081310335201", user: "Constable A. Sharma", userId: "RF-2847", device: "Mobile RF-2847 (Android)", browser: "RailForce Mobile App v2.4", network: "192.168.10.51 (Internal WiFi)", location: "Platform 3, Station Alpha", started: "13 Aug · 10:33 AM", duration: "20m 11s", mfa: true, trusted: true, risk: "Low" },
    { id: "SES-2026081310282847", user: "Admin A. Bose", userId: "RF-ADMIN-01", device: "IT Security Workstation #01", browser: "Firefox 128 · Hardened", network: "10.0.0.5 (Admin VLAN)", location: "IT Security Division", started: "13 Aug · 10:28 AM", duration: "25m 04s", mfa: true, trusted: true, risk: "Low" },
    { id: "SES-2026081310114782", user: "Constable V. Singh", userId: "RF-2734", device: "Unknown Mobile Device", browser: "Chrome Mobile 124", network: "103.45.67.89 (External)", location: "External Network", started: "13 Aug · 10:11 AM", duration: "41m 55s", mfa: false, trusted: false, risk: "High" },
    { id: "SES-2026081309554901", user: "SI P. Nair", userId: "RF-1847", device: "Station Beta Terminal #02", browser: "Chrome 127", network: "192.168.20.12 (Internal)", location: "Station Beta", started: "13 Aug · 09:55 AM", duration: "57m 12s", mfa: true, trusted: true, risk: "Low" },
    { id: "SES-2026081309422367", user: "Dep. Cmdnt D. Mehta", userId: "RF-0412", device: "Division HQ Terminal #01", browser: "Edge 127", network: "192.168.5.3 (HQ Internal)", location: "Division North HQ", started: "13 Aug · 09:42 AM", duration: "70m 04s", mfa: true, trusted: true, risk: "Low" },
  ];

  return (
    <div className="p-6 space-y-5 overflow-y-auto h-full">
      <SectionHeader
        title="Active Sessions"
        sub={`${sessions.length} active sessions · ${new Date().toLocaleTimeString()}`}
      />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="Total Sessions" value={sessions.length} icon="🖥️" color="blue" sub="Right now" />
        <StatCard label="High Risk" value={sessions.filter(s => s.risk === "High").length} icon="⚠️" color="red" sub="Require review" />
        <StatCard label="External" value={sessions.filter(s => !s.trusted).length} icon="🌐" color="amber" sub="Outside perimeter" />
        <StatCard label="MFA Verified" value={sessions.filter(s => s.mfa).length} icon="🔐" color="green" sub={`${Math.round(sessions.filter(s => s.mfa).length / sessions.length * 100)}% of sessions`} />
      </div>

      {/* High-risk alert */}
      {sessions.some(s => s.risk === "High") && (
        <AlertBanner
          type="error"
          message="1 high-risk session detected: RF-2734 connected from external network without MFA. Review immediately."
        />
      )}

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              {["User", "Session ID", "Device / Browser", "Network", "Location", "Started", "Duration", "MFA", "Risk", "Actions"].map(h => (
                <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sessions.map(s => (
              <tr
                key={s.id}
                className={`hover:bg-slate-50 transition-colors text-sm ${s.risk === "High" ? "bg-red-50/50" : ""}`}
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {s.user.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 whitespace-nowrap">{s.user}</p>
                      <p className="text-xs text-slate-400">{s.userId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs font-mono text-slate-500 max-w-[120px] truncate">
                  {s.id.slice(-8)}
                </td>
                <td className="px-3 py-3">
                  <p className="text-xs text-slate-700 whitespace-nowrap">{s.device}</p>
                  <p className="text-xs text-slate-400">{s.browser}</p>
                </td>
                <td className="px-3 py-3 text-xs text-slate-600 whitespace-nowrap">{s.network}</td>
                <td className="px-3 py-3 text-xs text-slate-600 whitespace-nowrap">{s.location}</td>
                <td className="px-3 py-3 text-xs font-mono text-slate-500 whitespace-nowrap">{s.started}</td>
                <td className="px-3 py-3 text-xs text-slate-500 font-mono whitespace-nowrap">{s.duration}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`text-xs font-bold ${s.mfa ? "text-emerald-600" : "text-red-600"}`}>
                    {s.mfa ? "✓" : "✗"}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      s.risk === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {s.risk}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap">
                      Details
                    </button>
                    {terminating === s.id ? (
                      <span className="text-xs text-red-600 font-medium ml-2">Terminating...</span>
                    ) : (
                      <button
                        onClick={() => setTerminating(s.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium ml-2 whitespace-nowrap"
                      >
                        Terminate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Live data · Auto-refreshes every 30s</span>
          <div className="flex gap-2">
            <Button variant="danger" size="sm">🚫 Terminate All External</Button>
            <Button variant="outline" size="sm">⬇ Export Session Report</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Global Search ─────────────────────────────────────────────────────────────
function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const results = query.toLowerCase().includes("rf-04") ? [] : [
    { type: "Personnel", id: "RF-2847", label: "Aarav Sharma", sub: "Constable · Unit Alpha · On Duty", authorized: true },
    { type: "Duty", id: "DUTY-8821", label: "Shift B · 13 Aug · Platform Patrol", sub: "Station Alpha · Assigned", authorized: true },
    { type: "Incident", id: "INC-2047", label: "Suspicious Activity · High Priority", sub: "Platform 3 · Under Review", authorized: true },
  ];

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Global Search" sub="Search within your authorized scope only" />
      <div className="max-w-2xl">
        <div className="relative">
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setSearched(false); }}
            onKeyDown={e => { if (e.key === "Enter") setSearched(true); }}
            placeholder="Search authorized personnel, duties, incidents, records..."
            className="w-full border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          {query && <button onClick={() => { setSearched(true); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-700 text-white text-xs px-3 py-1 rounded-lg">Search</button>}
        </div>
        <p className="text-xs text-slate-500 mt-2">Try "RF-2847", "INC-2047", or "Platform Patrol". Unauthorized records will not be shown.</p>

        {searched && query && (
          <div className="mt-4 space-y-2 fade-in">
            {results.length > 0 ? results.map((r, i) => (
              <Card key={i} className="p-4 flex items-center gap-3 hover:border-blue-300 cursor-pointer transition-all">
                <div className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${r.type === "Personnel" ? "bg-blue-100 text-blue-800" : r.type === "Duty" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"}`}>{r.type}</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{r.label}</p>
                  <p className="text-xs text-slate-500">{r.sub} · {r.id}</p>
                </div>
                {r.authorized && <span className="text-xs text-emerald-600 font-semibold">✓ Authorized</span>}
              </Card>
            )) : (
              <Card className="p-6 text-center">
                <div className="text-3xl mb-2">🔒</div>
                <p className="font-semibold text-slate-700">No authorized results found</p>
                <p className="text-sm text-slate-400 mt-1">The search returned no results within your authorized scope. Restricted records are not disclosed.</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin View Main ───────────────────────────────────────────────────────────
export function AdminView() {
  const [screen, setScreen] = useState("security");
  const user = CURRENT_USERS[ROLES.ADMIN];

  const getScreen = () => {
    switch (screen) {
      case "security": return <SecurityMonitoring />;
      case "audit": return <AuditLog />;
      case "permissions": return <PermissionManagement />;
      case "roles": return <RoleManagement />;
      case "sessions": return <ActiveSessions />;
      case "media": return <MediaCenter />;
      case "notifications": return <NotificationCenter />;
      case "reports": return <ReportsAnalytics />;
      case "search": return <GlobalSearch />;
      default: return <SecurityMonitoring />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <SecurityBanner scope="System-Wide Technical Access · Admin A. Bose" />
      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar
          items={ADMIN_NAV}
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
