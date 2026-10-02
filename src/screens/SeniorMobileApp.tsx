import { useState } from "react";
import { Badge, Card, Timeline, AlertBanner } from "../components/ui";
import {
  INCIDENTS, PERSONNEL_LIST, LEAVE_REQUESTS, NOTIFICATIONS,
  MESSAGES, DUTY_POSTS, SHIFTS, MANPOWER_STATS, CURRENT_USERS, ROLES,
} from "../data/mock";

const user = CURRENT_USERS[ROLES.SUPERVISOR];

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ active, onChange, sosAlert }: { active: string; onChange: (s: string) => void; sosAlert: boolean }) {
  const tabs = [
    { id: "dashboard", label: "Command", icon: "🏠" },
    { id: "personnel", label: "Personnel", icon: "👥" },
    { id: "duty", label: "Duty", icon: "📋" },
    { id: "incidents", label: "Incidents", icon: "⚠️" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];
  return (
    <div className="flex border-t border-slate-200 bg-white relative">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors relative ${active === t.id ? "text-blue-700 font-semibold" : "text-slate-400"}`}>
          <span className="text-base relative">
            {t.icon}
            {t.id === "incidents" && sosAlert && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </span>
          <span>{t.label}</span>
        </button>
      ))}
      {/* Floating SOS monitor button */}
      <button onClick={() => onChange("sos")}
        className={`absolute -top-7 right-1/2 translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all ${
          sosAlert ? "bg-red-600 animate-pulse" : "bg-slate-700"
        }`}>
        <div className="text-center">
          <span className="text-lg">🚨</span>
        </div>
      </button>
    </div>
  );
}

// ─── Command Dashboard ─────────────────────────────────────────────────────────
function CommandDashboard({ onNav, sosAlert }: { onNav: (s: string) => void; sosAlert: boolean }) {
  const stats = MANPOWER_STATS.inspector;
  const activeIncidents = INCIDENTS.filter(i => !["Closed", "Resolved"].includes(i.status));
  const pendingLeave = LEAVE_REQUESTS.filter(l => l.status === "Pending");
  const onDutyPersonnel = PERSONNEL_LIST.filter(p => p.status === "On Duty");

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 px-4 pt-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">Command Dashboard</p>
            <h2 className="text-white font-display font-bold text-lg">{user.name}</h2>
            <p className="text-slate-400 text-xs">{user.rank} · {user.unit}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">{user.avatar}</div>
            <span className="text-emerald-400 text-xs font-mono">● ONLINE</span>
          </div>
        </div>
        {/* Scope indicator */}
        <div className="bg-blue-900/50 border border-blue-800 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-blue-400 text-xs">🔐</span>
          <p className="text-blue-200 text-xs font-mono">SCOPE: {user.unit} · {user.scopeCount} Personnel</p>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        {/* SOS Alert Banner */}
        {sosAlert && (
          <button onClick={() => onNav("sos")}
            className="w-full bg-red-600 text-white rounded-xl p-3 flex items-center gap-3 animate-pulse">
            <span className="text-2xl">🚨</span>
            <div className="flex-1 text-left">
              <p className="font-bold text-sm">ACTIVE SOS ALERT</p>
              <p className="text-red-200 text-xs">RF-2847 · Platform 3 · Tap to respond</p>
            </div>
            <span className="text-white">→</span>
          </button>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Total Personnel", value: user.scopeCount, icon: "👥", color: "bg-blue-50 text-blue-700" },
            { label: "On Duty Now", value: onDutyPersonnel.length, icon: "🟢", color: "bg-emerald-50 text-emerald-700" },
            { label: "Active Incidents", value: activeIncidents.length, icon: "⚠️", color: "bg-orange-50 text-orange-700" },
            { label: "Leave Pending", value: pendingLeave.length, icon: "🗓️", color: "bg-amber-50 text-amber-700" },
          ].map(s => (
            <Card key={s.label} className="p-3 flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-xs text-slate-500 leading-tight">{s.label}</p>
                <p className="font-display font-black text-slate-900 text-xl leading-tight">{s.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Shift Status */}
        <Card className="p-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Current Shift Status</p>
          <div className="space-y-2">
            {SHIFTS.map(s => {
              const pct = Math.round((s.personnel / 18) * 100);
              const isCurrent = s.id === "B";
              return (
                <div key={s.id} className={`rounded-lg p-2.5 ${isCurrent ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${s.id === "A" ? "bg-blue-100 text-blue-700" : s.id === "B" ? "bg-purple-100 text-purple-700" : "bg-slate-200 text-slate-600"}`}>{s.id}</span>
                      <span className="text-xs font-medium text-slate-800">{s.time}</span>
                      {isCurrent && <span className="text-xs text-blue-600 font-semibold">CURRENT</span>}
                    </div>
                    <span className="text-xs text-slate-600 font-semibold">{s.personnel}/18</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div className={`h-1 rounded-full ${pct >= 90 ? "bg-emerald-500" : pct >= 70 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Active Incidents */}
        <Card className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Active Incidents</p>
            <button onClick={() => onNav("incidents")} className="text-xs text-blue-600 font-semibold">View All →</button>
          </div>
          {activeIncidents.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-3">No active incidents</p>
          ) : (
            <div className="space-y-1.5">
              {activeIncidents.slice(0, 3).map(inc => (
                <div key={inc.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Badge label={inc.priority as any} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{inc.type}</p>
                    <p className="text-xs text-slate-500 truncate">{inc.location}</p>
                  </div>
                  <Badge label={inc.status as any} />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Notifications */}
        <Card className="p-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Recent Notifications</p>
          <div className="space-y-2">
            {NOTIFICATIONS.filter(n => !n.read).slice(0, 3).map(n => (
              <div key={n.id} className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100">
                <span className="text-base mt-0.5">
                  {n.category === "Emergency" ? "🚨" : n.category === "Duty" ? "📋" : n.category === "Security" ? "🔐" : "📢"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Duty Post Status */}
        <Card className="p-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Duty Post Coverage</p>
          <div className="space-y-1.5">
            {DUTY_POSTS.map(p => (
              <div key={p.name} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.status === "Full" ? "bg-emerald-500" : "bg-red-500"}`} />
                <span className="text-xs text-slate-700 flex-1">{p.name}</span>
                <span className="text-xs font-mono text-slate-600">{p.assigned}/{p.required}</span>
                <Badge label={p.status as any} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Personnel ─────────────────────────────────────────────────────────────────
function SeniorPersonnel() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filters = ["All", "On Duty", "Available", "On Leave", "Training"];
  const filtered = PERSONNEL_LIST.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search);
    const matchFilter = filter === "All" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const selectedPerson = PERSONNEL_LIST.find(p => p.id === selected);

  if (selectedPerson) {
    return (
      <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
        <div className="bg-slate-900 px-4 pt-4 pb-4">
          <button onClick={() => setSelected(null)} className="text-slate-400 text-sm mb-2">← Back</button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">{selectedPerson.avatar}</div>
            <div>
              <h2 className="text-white font-display font-bold text-lg">{selectedPerson.name}</h2>
              <p className="text-slate-400 text-xs">{selectedPerson.id} · {selectedPerson.rank}</p>
            </div>
          </div>
        </div>
        <div className="px-3 py-3 space-y-3">
          <Card className="p-3 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Operational Status</p>
            {[
              { label: "Status", value: <Badge label={selectedPerson.status as any} /> },
              { label: "Unit", value: selectedPerson.unit },
              { label: "Current Duty", value: selectedPerson.duty || "—" },
              { label: "Current Shift", value: selectedPerson.shift || "—" },
              { label: "Last Duty", value: selectedPerson.lastDuty },
              { label: "Workload", value: selectedPerson.workload },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 text-sm">
                <span className="text-slate-500 text-xs">{label}</span>
                <span className="font-medium text-slate-800 text-xs">{value}</span>
              </div>
            ))}
          </Card>

          <Card className="p-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Qualifications</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedPerson.qualified.map(q => (
                <span key={q} className="bg-blue-50 border border-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">{q}</span>
              ))}
            </div>
          </Card>

          <Card className="p-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Duty History</p>
            <div className="space-y-1.5">
              {[
                { date: "13 Aug", shift: "B", type: "Platform Patrol", status: "Current" },
                { date: "12 Aug", shift: "A", type: "Gate Duty", status: "Completed" },
                { date: "11 Aug", shift: "C", type: "Reserve", status: "Completed" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0 text-xs">
                  <span className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center flex-shrink-0 ${d.shift === "A" ? "bg-blue-100 text-blue-700" : d.shift === "B" ? "bg-purple-100 text-purple-700" : "bg-slate-200 text-slate-600"}`}>{d.shift}</span>
                  <span className="flex-1 text-slate-700">{d.date} · {d.type}</span>
                  <Badge label={d.status === "Current" ? "On Duty" : "Active"} />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl">Assign Duty</button>
            <button className="flex-1 border border-slate-200 text-slate-600 text-xs font-semibold py-2.5 rounded-xl">Send Message</button>
          </div>

          <div className="bg-slate-100 rounded-xl p-3">
            <p className="text-xs text-slate-500 font-mono">Authorization Scope: {user.unit} personnel only. Additional details require Inspector authorization.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-slate-900 px-4 pt-4 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Personnel</h2>
        <p className="text-slate-400 text-xs">{user.unit} · {user.scopeCount} authorized personnel</p>
        <div className="mt-3">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-8 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none"
            placeholder="Search by name or ID..."
          />
          <span className="absolute ml-2 mt-2.5 text-slate-500 text-sm">🔍</span>
        </div>
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${filter === f ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-3xl mb-2">👥</p>
            <p className="text-sm">No personnel found</p>
          </div>
        ) : filtered.map(p => (
          <button key={p.id} onClick={() => setSelected(p.id)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 text-left transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${p.status === "On Duty" ? "bg-blue-700" : p.status === "On Leave" ? "bg-amber-600" : "bg-slate-600"}`}>
              {p.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
              <p className="text-xs text-slate-500">{p.id} · {p.rank}</p>
              <p className="text-xs text-slate-400 mt-0.5">{p.duty || "No active duty"}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge label={p.status as any} />
              <span className="text-xs text-slate-400">{p.shift !== "—" ? `Shift ${p.shift}` : "—"}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Duty Management ───────────────────────────────────────────────────────────
function SeniorDuty() {
  const [view, setView] = useState<"roster" | "assign">("roster");
  const [assigned, setAssigned] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-slate-900 px-4 pt-4 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Duty Management</h2>
        <p className="text-slate-400 text-xs">{user.unit} · Supervisor access</p>
        <div className="flex gap-2 mt-3">
          {[{ id: "roster", label: "Roster" }, { id: "assign", label: "Assign Duty" }].map(t => (
            <button key={t.id} onClick={() => setView(t.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${view === t.id ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll px-3 py-3 space-y-3">
        {view === "roster" ? (
          <>
            {/* Current shift */}
            <Card className="p-3">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Active: Shift B · 14:00–22:00</p>
                <Badge label="On Duty" dot />
              </div>
              <div className="space-y-2">
                {PERSONNEL_LIST.filter(p => p.status === "On Duty").map(p => (
                  <div key={p.id} className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{p.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.duty}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Shift {p.shift}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Post coverage */}
            <Card className="p-3">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Post Coverage</p>
              {DUTY_POSTS.map(p => (
                <div key={p.name} className="flex items-center gap-2 py-2 border-b border-slate-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.status === "Full" ? "bg-emerald-500" : "bg-red-500"}`} />
                  <span className="flex-1 text-xs text-slate-700">{p.name}</span>
                  <span className="text-xs font-mono text-slate-600">{p.assigned}/{p.required}</span>
                  {p.status === "Short" && (
                    <span className="text-xs text-red-600 font-semibold">DEFICIT</span>
                  )}
                </div>
              ))}
            </Card>

            {/* Pending leave impact */}
            <Card className="p-3">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Pending Leave Requests</p>
              <div className="space-y-2">
                {LEAVE_REQUESTS.filter(l => l.status === "Pending").map(lr => (
                  <div key={lr.id} className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-slate-800">{lr.personnel}</p>
                      <Badge label={lr.type as any} />
                    </div>
                    <p className="text-xs text-slate-600">{lr.from} → {lr.to} ({lr.days} days)</p>
                    {lr.dutyImpact > 0 && <p className="text-xs text-amber-700 mt-1 font-semibold">⚡ Duty impact: {lr.dutyImpact} post(s) affected</p>}
                    <div className="flex gap-1.5 mt-2">
                      <button className="flex-1 bg-emerald-100 text-emerald-800 text-xs font-semibold py-1 rounded-lg">Approve</button>
                      <button className="flex-1 bg-red-100 text-red-800 text-xs font-semibold py-1 rounded-lg">Reject</button>
                    </div>
                  </div>
                ))}
                {LEAVE_REQUESTS.filter(l => l.status === "Pending").length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-2">No pending leave requests</p>
                )}
              </div>
            </Card>
          </>
        ) : (
          <>
            {assigned ? (
              <Card className="p-5 text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-display font-bold text-slate-900">Duty Assigned</p>
                <p className="text-sm text-slate-500 mt-1">Assignment submitted for roster. Inspector review required to publish.</p>
                <div className="mt-4 bg-slate-50 rounded-lg p-3 text-left space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Reference</span><span className="font-mono">DUTY-8830</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="text-amber-700 font-semibold">Pending Inspector Approval</span></div>
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800 text-left">
                  <p className="font-semibold">Supervisor Review Required</p>
                  <p className="mt-0.5">Duty assignments require Inspector authorization before publication. This is a recommendation, not a final assignment.</p>
                </div>
                <button onClick={() => setAssigned(false)} className="mt-4 text-xs text-blue-600 font-semibold">+ New Assignment</button>
              </Card>
            ) : (
              <Card className="p-3 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-slate-600 text-sm">📋</span>
                  <h3 className="font-semibold text-slate-900 text-sm">Create Duty Assignment</h3>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800">
                  ⚠️ Duty assignments require Inspector authorization before publication. Your submission will be reviewed.
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Personnel</label>
                  <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {PERSONNEL_LIST.filter(p => p.available).map(p => (
                      <option key={p.id}>{p.name} ({p.id}) · {p.status}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Duty Post</label>
                  <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {DUTY_POSTS.map(p => <option key={p.name}>{p.name} ({p.assigned}/{p.required})</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Shift</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {SHIFTS.map(s => (
                      <button key={s.id} className={`py-2 rounded-lg text-xs font-semibold border text-center ${s.id === "B" ? "bg-blue-700 text-white border-blue-700" : "border-slate-200 text-slate-600"}`}>
                        <div className="font-bold">{s.label}</div>
                        <div className="text-xs opacity-70">{s.id === "A" ? "06–14" : s.id === "B" ? "14–22" : "22–06"}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Date</label>
                  <input type="date" defaultValue="2026-08-14" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Notes</label>
                  <textarea rows={2} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Operational notes..." />
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-500 space-y-0.5">
                  <p>📊 <strong>Rest constraint:</strong> 16-hour minimum rest required between shifts.</p>
                  <p>🔍 System will check for conflicts before submission.</p>
                </div>
                <button onClick={() => setAssigned(true)} className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">
                  Submit for Inspector Review
                </button>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Live SOS Monitor ──────────────────────────────────────────────────────────
function SeniorSOS({ sosAlert, onAcknowledge }: { sosAlert: boolean; onAcknowledge: () => void }) {
  const [actionTaken, setActionTaken] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleAction = (action: string) => {
    setActionTaken(action);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    onAcknowledge();
  };

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className={`px-4 pt-4 pb-4 ${sosAlert && !confirmed ? "bg-red-900" : "bg-slate-900"}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-2 h-2 rounded-full ${sosAlert && !confirmed ? "bg-red-300 animate-pulse" : "bg-slate-500"}`} />
          <p className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">
            {sosAlert && !confirmed ? "EMERGENCY MONITORING" : "SOS MONITORING"}
          </p>
        </div>
        <h2 className="text-white font-display font-bold text-xl">Live SOS</h2>
        <p className="text-slate-400 text-xs">Supervisor emergency response · {user.unit}</p>
      </div>

      <div className="px-3 py-3 space-y-3">
        {sosAlert && !confirmed ? (
          <>
            {/* Active SOS Card */}
            <Card className="p-4 border-red-200 border-l-4 border-l-red-600">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-600 font-bold text-xs uppercase tracking-wide">Active SOS Alert</span>
              </div>
              <div className="space-y-2 mb-4">
                {[
                  { label: "Officer", value: "RF-2847 Aarav Sharma" },
                  { label: "Post", value: "Platform 3, Station Alpha" },
                  { label: "Duty", value: "Platform Patrol · Shift B" },
                  { label: "Activated", value: "13 Aug 2026 · 10:22:14" },
                  { label: "Connection", value: "ONLINE · 4G" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center text-sm">
                    <span className="text-slate-500 text-xs w-24">{label}</span>
                    <span className="font-medium text-slate-800 text-xs">{value}</span>
                  </div>
                ))}
              </div>

              {/* Simulated location grid */}
              <div className="bg-slate-100 rounded-xl relative overflow-hidden mb-3" style={{ height: 100 }}>
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-4">
                  {Array.from({ length: 32 }).map((_, i) => <div key={i} className="border border-slate-200/50" />)}
                </div>
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs animate-pulse">!</div>
                  <div className="absolute -inset-3 border-2 border-red-400 rounded-full opacity-60 animate-ping" />
                </div>
                <div className="absolute bottom-1 right-2 bg-white rounded px-1.5 py-0.5 text-xs text-slate-400 shadow">Platform 3 · Synthetic</div>
              </div>

              {actionTaken ? (
                <div className="space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-blue-800">Action: {actionTaken}</p>
                    <p className="text-xs text-blue-600 mt-0.5">Action logged with timestamp and your identity. Confirm to update emergency record.</p>
                  </div>
                  <button onClick={handleConfirm} className="w-full bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm">Confirm & Submit</button>
                  <button onClick={() => setActionTaken(null)} className="w-full border border-slate-200 text-slate-600 font-semibold py-2 rounded-xl text-sm">← Cancel</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button onClick={() => handleAction("Acknowledged")} className="w-full bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm">✓ Acknowledge</button>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleAction("Response Assigned")} className="bg-amber-500 text-white font-semibold py-2 rounded-xl text-xs">👥 Assign Response</button>
                    <button onClick={() => handleAction("Escalated to Inspector")} className="bg-slate-700 text-white font-semibold py-2 rounded-xl text-xs">⬆️ Escalate</button>
                  </div>
                  <p className="text-xs text-slate-400 text-center">All actions create an audit record</p>
                </div>
              )}
            </Card>

            {/* Timeline */}
            <Card className="p-3">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Incident Timeline</p>
              <div className="text-xs space-y-2">
                {[
                  { time: "10:22:14", event: "SOS ACTIVATED", detail: "RF-2847 · Platform 3", type: "alert" },
                  { time: "10:22:16", event: "ALERT RECEIVED", detail: "System · Supervisor notified", type: "system" },
                ].map((e, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-mono text-slate-400 flex-shrink-0 w-16">{e.time}</span>
                    <div>
                      <span className={`font-bold ${e.type === "alert" ? "text-red-600" : "text-blue-700"}`}>{e.event}</span>
                      <span className="text-slate-500"> — {e.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        ) : (
          <>
            {confirmed && (
              <Card className="p-4 border-emerald-200 border-l-4 border-l-emerald-500">
                <p className="font-semibold text-emerald-700 text-sm">✓ SOS Acknowledged</p>
                <p className="text-xs text-slate-500 mt-1">Emergency EMERG-0089 has been acknowledged. Audit record created.</p>
              </Card>
            )}
            <Card className="p-4 text-center">
              <div className="text-3xl mb-2">📡</div>
              <p className="font-semibold text-slate-700 text-sm">No Active SOS Alerts</p>
              <p className="text-xs text-slate-400 mt-1">{user.unit} · All clear</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">SOS History · Last 30 Days</p>
              <div className="space-y-2">
                {[
                  { id: "EMERG-0088", personnel: "Kiran Das", type: "Medical Emergency", time: "10 Aug · 15:44", status: "Resolved" },
                  { id: "EMERG-0085", personnel: "Sanjay Rao", type: "Security Threat", time: "05 Aug · 22:11", status: "Resolved" },
                ].map(e => (
                  <div key={e.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-400">🚨</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800">{e.id} · {e.type}</p>
                      <p className="text-xs text-slate-500">{e.personnel} · {e.time}</p>
                    </div>
                    <Badge label="Active" />
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Incident Management ───────────────────────────────────────────────────────
function SeniorIncidents() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? INCIDENTS :
    filter === "Active" ? INCIDENTS.filter(i => !["Closed", "Resolved"].includes(i.status)) :
    INCIDENTS.filter(i => i.status === filter);

  const selectedInc = INCIDENTS.find(i => i.id === selected);

  if (selectedInc) {
    return (
      <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
        <div className={`px-4 pt-4 pb-4 ${selectedInc.priority === "Critical" ? "bg-red-900" : "bg-slate-900"}`}>
          <button onClick={() => setSelected(null)} className="text-slate-400 text-sm mb-2">← Incidents</button>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display font-black text-white text-xl">{selectedInc.id}</p>
              <p className="text-slate-400 text-xs">{selectedInc.type}</p>
            </div>
            <Badge label={selectedInc.priority as any} />
          </div>
        </div>
        <div className="px-3 py-3 space-y-3">
          <Card className="p-3">
            <div className="space-y-2">
              {[
                { label: "Status", value: <Badge label={selectedInc.status as any} /> },
                { label: "Location", value: selectedInc.location },
                { label: "Reported By", value: selectedInc.reportedBy },
                { label: "Assigned To", value: selectedInc.assignedTo },
                { label: "Created", value: selectedInc.created },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-500 text-xs w-24">{label}</span>
                  <span className="font-medium text-slate-800 text-xs">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-3">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Incident Timeline</p>
            <Timeline steps={[
              { label: "INC Reported", time: selectedInc.created, done: true },
              { label: "Acknowledged", time: selectedInc.acknowledged ? "Within 5 min" : undefined, done: selectedInc.acknowledged },
              { label: "Under Review", done: selectedInc.status === "Under Review" || selectedInc.status === "Resolved" || selectedInc.status === "Closed" },
              { label: "Resolved / Closed", done: selectedInc.status === "Resolved" || selectedInc.status === "Closed" },
            ]} />
          </Card>

          {!["Resolved", "Closed"].includes(selectedInc.status) && (
            <Card className="p-3 space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Actions</p>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white">
                <option>Under Review</option>
                <option>Acknowledged</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <textarea rows={2} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add note (required for status change)..." />
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg">Update Status</button>
                <button className="flex-1 bg-amber-500 text-white text-xs font-semibold py-2 rounded-lg">↑ Escalate</button>
              </div>
              <p className="text-xs text-slate-400">All status changes are audited with your identity and timestamp.</p>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-slate-900 px-4 pt-4 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Incidents</h2>
        <p className="text-slate-400 text-xs">{user.unit} · Supervisor view</p>
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
          {["All", "Active", "Under Review", "Resolved"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${filter === f ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-3xl mb-2">✅</p>
            <p className="text-sm">No incidents</p>
          </div>
        ) : filtered.map(inc => (
          <button key={inc.id} onClick={() => setSelected(inc.id)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 text-left transition-colors">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
              inc.priority === "Critical" ? "bg-red-50" :
              inc.priority === "High" ? "bg-orange-50" :
              "bg-slate-50"
            }`}>
              {inc.priority === "Critical" ? "🚨" : inc.priority === "High" ? "⚠️" : "📋"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-slate-500">{inc.id}</span>
                <Badge label={inc.priority as any} />
              </div>
              <p className="text-sm font-semibold text-slate-900 mt-0.5">{inc.type}</p>
              <p className="text-xs text-slate-500 truncate">{inc.location}</p>
            </div>
            <Badge label={inc.status as any} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Secure Messages ───────────────────────────────────────────────────────────
function SeniorMessages() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const supervisorChannels = [
    { id: "sc-1", channel: "Unit Beta Command", type: "unit", avatar: "UB", lastMessage: "Duty roster updated for 15 Aug.", time: "10:45", unread: 2, scope: "Active · Unit Beta authorized personnel" },
    { id: "sc-2", channel: "Inspector R. Singh", type: "direct", avatar: "RS", lastMessage: "Leave requests have been forwarded.", time: "09:30", unread: 0, scope: "Direct · Authorized reporting channel" },
    { id: "sc-3", channel: "Shift B Coordination", type: "shift", avatar: "SB", lastMessage: "Post coverage confirmed.", time: "Yesterday", unread: 0, scope: "Expires: Shift B end · 22:00" },
    { id: "sc-4", channel: "Incident INC-2047", type: "incident", avatar: "IC", lastMessage: "Monitoring in progress.", time: "Yesterday", unread: 0, scope: "Incident channel · Restricted" },
  ];

  if (activeChannel) {
    const ch = supervisorChannels.find(c => c.id === activeChannel);
    if (!ch) return null;
    return (
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="bg-slate-900 px-4 pt-4 pb-3">
          <button onClick={() => setActiveChannel(null)} className="text-slate-400 text-xs mb-1">← Back</button>
          <h3 className="text-white font-semibold">{ch.channel}</h3>
          <p className="text-slate-400 text-xs">{ch.scope}</p>
          {ch.type === "shift" && (
            <p className="text-amber-400 text-xs mt-0.5 font-mono">⏱ Access expires at shift end</p>
          )}
        </div>
        <div className="flex-1 overflow-y-auto phone-scroll px-3 py-3 space-y-2">
          {[
            { sender: "System", text: "Secure channel opened. All messages are logged and audited.", time: "10:30", system: true },
            { sender: "Inspector R. Singh", text: "Roster updated. Please verify post coverage for Platform area.", time: "10:42", system: false },
            { sender: "Priya Nair", text: "Platform patrol coverage confirmed — 5 of 6 posts filled. Reserve assigned to gap.", time: "10:45", system: false, self: true },
            { sender: "System", text: "Message delivered to 8 authorized recipients.", time: "10:45", system: true },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.self ? "justify-end" : "justify-start"}`}>
              {m.system ? (
                <div className="text-center w-full">
                  <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-3 py-1">{m.text}</span>
                </div>
              ) : (
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.self ? "bg-blue-700 text-white" : "bg-white border border-slate-200 text-slate-800"}`}>
                  {!m.self && <p className="text-xs font-semibold mb-0.5 text-slate-500">{m.sender}</p>}
                  <p className="text-xs">{m.text}</p>
                  <p className={`text-xs mt-1 ${m.self ? "text-blue-200" : "text-slate-400"}`}>{m.time}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Priority broadcast notice */}
        {!ch.type.includes("incident") && (
          <div className="px-3 pb-1">
            <button onClick={() => { setBroadcastSent(true); setTimeout(() => setBroadcastSent(false), 3000); }}
              className="w-full bg-amber-500 text-white text-xs font-semibold py-1.5 rounded-lg mb-1.5">
              {broadcastSent ? "✓ Priority Directive Sent" : "📢 Send Priority Directive"}
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 pb-3">
          <input value={newMsg} onChange={e => setNewMsg(e.target.value)}
            className="flex-1 border border-slate-200 rounded-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..." />
          <button onClick={() => setNewMsg("")}
            className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white flex-shrink-0">↑</button>
        </div>
        <p className="text-center text-xs text-slate-400 pb-2">All messages are recorded and audited</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-slate-900 px-4 pt-4 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Secure Messages</h2>
        <p className="text-slate-400 text-xs">Duty-scoped · Access expires with assignment</p>
      </div>
      <div className="flex-1 overflow-y-auto phone-scroll divide-y divide-slate-100 bg-white">
        {supervisorChannels.map(ch => (
          <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
              ch.type === "incident" ? "bg-red-700" :
              ch.type === "unit" ? "bg-blue-800" :
              ch.type === "shift" ? "bg-purple-700" :
              "bg-slate-700"
            }`}>{ch.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 text-sm">{ch.channel}</p>
                <span className="text-xs text-slate-400">{ch.time}</span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">{ch.lastMessage}</p>
              <p className="text-xs text-slate-400 mt-0.5">{
                ch.type === "unit" ? "🏢 Unit channel" :
                ch.type === "shift" ? "⏱ Shift channel · Expires 22:00" :
                ch.type === "incident" ? "🚨 Incident · Restricted" :
                "💬 Direct"
              }</p>
            </div>
            {ch.unread > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">{ch.unread}</span>
            )}
          </button>
        ))}
        {/* Locked channel */}
        <div className="flex items-center gap-3 px-4 py-3 opacity-50">
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">🔒</div>
          <div>
            <p className="font-semibold text-slate-600 text-sm">Division Command Channel</p>
            <p className="text-xs text-slate-400">Inspector authorization required</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile ───────────────────────────────────────────────────────────────────
function SeniorProfile() {
  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className="bg-slate-900 px-4 pt-4 pb-6 text-center">
        <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">{user.avatar}</div>
        <h2 className="text-white font-display font-bold text-xl">{user.name}</h2>
        <p className="text-slate-400 text-xs">{user.id} · {user.rank}</p>
        <p className="text-slate-400 text-xs">{user.unit}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-emerald-400 text-xs">● MFA VERIFIED</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 text-xs">DEVICE TRUSTED</span>
        </div>
      </div>

      <div className="px-3 py-3 space-y-3">
        <Card className="p-3 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Profile</p>
          {[
            { label: "ID", value: user.id },
            { label: "Rank", value: user.rank },
            { label: "Unit", value: user.unit },
            { label: "Email", value: user.email || "p.nair@railforce.internal" },
            { label: "Auth Scope", value: user.scope },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-500 text-xs w-24">{label}</span>
              <span className="font-medium text-slate-800 text-xs">{value}</span>
            </div>
          ))}
        </Card>

        <Card className="p-3 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Session Security</p>
          {[
            { label: "MFA Status", value: "✓ Verified" },
            { label: "Device", value: "Trusted · Enrolled" },
            { label: "Session", value: "47:23 remaining" },
            { label: "Network", value: "ONLINE · Secure" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-500 text-xs w-24">{label}</span>
              <span className="font-medium text-emerald-700 text-xs">{value}</span>
            </div>
          ))}
        </Card>

        <Card className="p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Authorization Scope</p>
          <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-600 space-y-1 font-mono">
            <p>ROLE: Supervisor</p>
            <p>UNIT: {user.unit}</p>
            <p>PERSONNEL: {user.scopeCount}</p>
            <p>DUTY: View + Limited Approval</p>
            <p>LEAVE: Approve (CL ≤2 days)</p>
            <p>INCIDENTS: View + Update + Escalate</p>
            <p>AUDIT: View (own unit only)</p>
          </div>
        </Card>

        <Card className="p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Data Notice</p>
          <p className="text-xs text-slate-500 leading-relaxed">This is a demonstration prototype using synthetic data only. All personnel names, IDs, incidents, and operational data shown are fictional. This application does not connect to any real railway security system.</p>
          <p className="text-xs text-blue-600 mt-2 font-semibold">DEMO / SYNTHETIC DATA</p>
        </Card>

        <button className="w-full bg-red-50 border border-red-200 text-red-700 text-sm font-semibold py-2.5 rounded-xl">
          Sign Out Securely
        </button>
      </div>
    </div>
  );
}

// ─── Main Senior Mobile App ────────────────────────────────────────────────────
export function SeniorMobileApp() {
  const [screen, setScreen] = useState("dashboard");
  const [sosAlert, setSosAlert] = useState(true);

  const handleAcknowledge = () => setSosAlert(false);

  const getScreen = () => {
    switch (screen) {
      case "dashboard": return <CommandDashboard onNav={setScreen} sosAlert={sosAlert} />;
      case "personnel": return <SeniorPersonnel />;
      case "duty": return <SeniorDuty />;
      case "sos": return <SeniorSOS sosAlert={sosAlert} onAcknowledge={handleAcknowledge} />;
      case "incidents": return <SeniorIncidents />;
      case "messages": return <SeniorMessages />;
      case "profile": return <SeniorProfile />;
      default: return <CommandDashboard onNav={setScreen} sosAlert={sosAlert} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Command mode indicator */}
      <div className="bg-blue-900 px-3 py-1 flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-mono text-blue-300">COMMAND VIEW</span>
        <span className="text-blue-700">·</span>
        <span className="text-xs text-blue-400">{user.name} · {user.unit}</span>
        <span className="ml-auto text-emerald-400 text-xs">● LIVE</span>
      </div>

      {/* Screen content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {getScreen()}
      </div>

      {/* Bottom nav */}
      <BottomNav active={screen} onChange={setScreen} sosAlert={sosAlert} />
    </div>
  );
}
