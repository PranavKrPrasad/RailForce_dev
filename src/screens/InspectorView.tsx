import { useEffect, useState } from "react";
import {
  Card, Badge, StatCard, Avatar, Button, SectionHeader, Timeline,
  TabBar, AlertBanner, AccessDecisionCard, Input, Select,
  DesktopSidebar, TopNav, SecurityBanner, PermissionLock, Divider,
} from "../components/ui";
import {
  PERSONNEL_LIST, SHIFTS, LEAVE_REQUESTS, INCIDENTS, DUTY_POSTS,
  ROSTER_DATA, CURRENT_USERS, ROLES,
} from "../data/mock";
import {
  getMyProfile,
  getUnitPersonnel,
  getIncidents,
  getDuties,
  getNotifications,
} from "../lib/railforceData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  DesktopMessages, RoleReports, RoleAuditLog, RoleZeroTrust,
  InspectorEmergency,
} from "./SharedScreens";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "personnel", label: "Personnel", icon: "👥" },
  { id: "duty", label: "Duty Management", icon: "📋" },
  { id: "roster", label: "Shift Roster", icon: "📅" },
  { id: "leave", label: "Leave Management", icon: "🗓️", badge: 2 },
  { id: "incidents", label: "Incidents", icon: "⚠️", badge: 1 },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "emergency", label: "Emergency", icon: "🚨" },
  { id: "reports", label: "Reports", icon: "📊" },
  { id: "audit", label: "Audit Activity", icon: "🔍" },
  { id: "zerotrust", label: "Access Engine", icon: "🔐" },
];

// ─── Inspector Dashboard ───────────────────────────────────────────────────────
function InspectorDashboard() {
  const stats = { total: 48, onDuty: 26, available: 12, onLeave: 5, training: 2, reserve: 3 };
  const shiftData = [
    { shift: "Shift A", count: 18, full: false },
    { shift: "Shift B", count: 16, full: true },
    { shift: "Shift C", count: 14, full: false },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Good Morning</p>
          <h2 className="font-display font-black text-2xl text-slate-900">Inspector Rajesh Singh</h2>
          <p className="text-slate-500 text-sm">Unit Alpha · {new Date().toDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge label="On Duty" dot />
          <span className="text-xs text-slate-400 font-mono">RF-1023</span>
        </div>
      </div>

      {/* Scope banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
        <span className="text-blue-600">🔐</span>
        <p className="text-sm text-blue-800"><strong>Authorized Scope:</strong> Unit Alpha — 48 Personnel · All actions are audited</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Personnel" value={stats.total} icon="👥" color="blue" sub="Unit Alpha" />
        <StatCard label="On Duty" value={stats.onDuty} icon="🟢" color="green" sub="Across all shifts" />
        <StatCard label="Available" value={stats.available} icon="⚪" color="slate" sub="Ready to assign" />
        <StatCard label="On Leave" value={stats.onLeave} icon="🏖️" color="amber" sub="Approved" />
        <StatCard label="In Training" value={stats.training} icon="📚" color="purple" sub="Off roster" />
        <StatCard label="Reserve" value={stats.reserve} icon="🔄" color="sky" sub="Standby" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Shift overview */}
        <Card className="p-4">
          <SectionHeader title="Today's Shift Overview" />
          <div className="space-y-3">
            {SHIFTS.map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  s.id === "A" ? "bg-blue-100 text-blue-800" :
                  s.id === "B" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"
                }`}>{s.id}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.personnel} / 20</p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${s.personnel / 20 >= 0.9 ? "bg-emerald-500" : s.personnel / 20 >= 0.7 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${(s.personnel / 20) * 100}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action items */}
        <Card className="p-4">
          <SectionHeader title="Pending Actions" />
          <div className="space-y-2">
            {[
              { label: "Leave Requests", count: 2, color: "amber", icon: "🗓️" },
              { label: "Duty Acknowledgements", count: 4, color: "blue", icon: "📋" },
              { label: "Active Incidents", count: 1, color: "orange", icon: "⚠️" },
              { label: "Emergency Alerts", count: 0, color: "red", icon: "🚨" },
            ].map(a => (
              <div key={a.label} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <span>{a.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{a.label}</span>
                </div>
                {a.count > 0 ? (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.count > 0 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-500"}`}>{a.count}</span>
                ) : <span className="text-xs text-slate-400">Clear</span>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Duty Management ───────────────────────────────────────────────────────────
function DutyManagement({ onCreateDuty }: { onCreateDuty: () => void }) {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="Duty Management"
        sub="Unit Alpha · Authorized Scope"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">📅 View Calendar</Button>
            <Button variant="primary" size="sm" onClick={onCreateDuty}>+ Create Duty</Button>
          </div>
        }
      />
      {/* Controls */}
      <Card className="p-4 flex gap-4 items-end">
        <Input label="Select Date" type="date" defaultValue="2026-08-14" className="w-44" />
        <Select label="Unit" options={["Unit Alpha", "Unit Beta", "Unit Gamma"]} className="w-40" />
        <Button variant="secondary" size="sm">🔍 Filter</Button>
        <Button variant="outline" size="sm">⚡ Auto-Suggest</Button>
        <Button variant="primary" size="sm">📤 Publish Roster</Button>
      </Card>

      {/* Duty Posts Table */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Duty Posts · 14 Aug 2026</h3>
          <Badge label="Shift B" />
        </div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {["Duty Post", "Required", "Assigned", "Status", "Personnel", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DUTY_POSTS.map(p => (
              <tr key={p.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.required}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{p.assigned}</td>
                <td className="px-4 py-3"><Badge label={p.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex -space-x-1">
                    {Array.from({ length: Math.min(p.assigned, 4) }).map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{String.fromCharCode(65 + i)}</div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Acknowledgements */}
      <Card className="p-4">
        <SectionHeader title="Duty Acknowledgements · Shift B" sub="4 pending" />
        <div className="space-y-2">
          {PERSONNEL_LIST.slice(0, 6).map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">{p.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{p.name}</p>
                <p className="text-xs text-slate-500">{p.id} · {p.rank}</p>
              </div>
              {i < 2 ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />✓ Acknowledged
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-600 font-semibold">⏳ Pending</span>
                  <button className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 px-2 py-0.5 rounded">Remind</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Create Duty Wizard ────────────────────────────────────────────────────────
function CreateDutyWizard({ onPublish }: { onPublish: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedShift, setSelectedShift] = useState("B");
  const [showConflict, setShowConflict] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  if (showConflict) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <button onClick={() => setShowConflict(false)} className="text-sm text-blue-600 hover:text-blue-800 mb-4">← Back to Personnel Selection</button>
        <div className="max-w-md mx-auto">
          <Card className="p-5 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-display font-bold text-slate-900 text-lg">Duty Conflict Detected</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-slate-600">A conflict has been detected for the following assignment:</p>
              <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                <p className="font-semibold text-slate-800">Personnel: RF-2734 · Vikram Singh</p>
                <div className="flex gap-4 mt-2">
                  <div className="flex-1 bg-white rounded p-2 border border-slate-200">
                    <p className="text-xs text-slate-500">Existing Duty</p>
                    <p className="font-semibold text-slate-800 text-sm">Shift C · 14 Aug</p>
                    <p className="text-xs text-slate-500">10:00 PM – 06:00 AM</p>
                  </div>
                  <div className="flex items-center text-red-500 font-bold">↔</div>
                  <div className="flex-1 bg-red-50 rounded p-2 border border-red-200">
                    <p className="text-xs text-red-500">New Assignment</p>
                    <p className="font-semibold text-red-800 text-sm">Shift A · 15 Aug</p>
                    <p className="text-xs text-red-500">06:00 AM – 02:00 PM</p>
                  </div>
                </div>
              </div>
              <AlertBanner type="warning" message="Potential insufficient rest interval between shifts (< 8 hours)" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowConflict(false)}>Cancel</Button>
              <Button variant="secondary" size="sm">Choose Another</Button>
              <Button variant="danger" size="sm" onClick={() => { setShowConflict(false); setStep(4); }}>Override w/ Reason</Button>
            </div>
            <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-700 font-semibold mb-1">Override Reason Required</p>
              <textarea rows={2} className="w-full text-xs border border-red-200 rounded p-2 resize-none focus:outline-none focus:ring-1 focus:ring-red-400" placeholder="State operational reason for override..." />
              <p className="text-xs text-red-600 mt-1">⚠️ Override will create an audit event (AUD-OVERRIDE)</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (showRecommend) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <button onClick={() => setShowRecommend(false)} className="text-sm text-blue-600 hover:text-blue-800 mb-4">← Back</button>
        <div className="max-w-2xl">
          <SectionHeader
            title="AI-Assisted Duty Recommendation"
            sub="System provides recommendations. The authorized officer makes the final decision."
          />
          <AlertBanner type="info" message="The system provides recommendations only. The authorized officer makes the final assignment decision." />
          <div className="mt-4 space-y-3">
            {[
              { name: "Aarav Sharma", id: "RF-2847", suit: 96, reasons: ["Available", "No duty overlap", "Patrol qualified", "Lower recent workload"] },
              { name: "Sanjay Rao", id: "RF-2788", suit: 91, reasons: ["Available", "No duty overlap", "Head Constable experience", "Patrol & Escort qualified"] },
              { name: "Rahul Kumar", id: "RF-2901", suit: 84, reasons: ["Available", "No duty overlap", "Patrol qualified"], warnings: ["Higher recent workload"] },
              { name: "Kavya Menon", id: "RF-2333", suit: 79, reasons: ["Available", "Patrol qualified"], warnings: ["Last duty was 2 days ago — workload low", "No Escort qualification"] },
            ].map((r, i) => (
              <Card key={i} className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{r.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-display font-bold text-blue-700">{r.suit}%</p>
                      <p className="text-xs text-slate-400">Suitability</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 mb-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${r.suit}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {r.reasons.map(reason => <span key={reason} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">✓ {reason}</span>)}
                    {r.warnings?.map(w => <span key={w} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">⚠ {w}</span>)}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => { setSelected(prev => [...prev, r.id]); }}>
                  {selected.includes(r.id) ? "✓ Selected" : "Select"}
                </Button>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="primary" onClick={() => { setShowRecommend(false); setStep(4); }}>Accept Selections →</Button>
            <Button variant="secondary" onClick={() => setShowRecommend(false)}>Modify Manually</Button>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            ⚠️ Recommendations are algorithmic suggestions only. Final duty assignment authority rests with the authorized officer.
          </p>
        </div>
      </div>
    );
  }

  const steps = ["Select Date & Shift", "Add Duty Posts", "Select Personnel", "Review & Publish"];

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <button onClick={onPublish} className="text-sm text-blue-600 hover:text-blue-800 mb-2">← Back to Duty Management</button>
      <SectionHeader title="Create Duty Roster" sub="Step-by-step duty assignment wizard" />

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${step === i + 1 ? "bg-blue-700 text-white" : step > i + 1 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
              <span>{step > i + 1 ? "✓" : i + 1}</span>
              <span>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 w-6 ${step > i + 1 ? "bg-emerald-400" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="p-5 max-w-md">
          <h3 className="font-display font-bold text-slate-900 mb-4">Step 1: Select Date & Shift</h3>
          <div className="space-y-4">
            <Input label="Duty Date" type="date" defaultValue="2026-08-14" />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Shift</label>
              <div className="grid grid-cols-3 gap-2">
                {SHIFTS.map(s => (
                  <button key={s.id} onClick={() => setSelectedShift(s.id)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${selectedShift === s.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <p className="font-bold text-slate-900">Shift {s.id}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.time}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">Shift times are configurable by System Administrator</p>
            </div>
            <Button variant="primary" onClick={() => setStep(2)}>Next: Add Duty Posts →</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-5 max-w-xl">
          <h3 className="font-display font-bold text-slate-900 mb-4">Step 2: Add Duty Posts</h3>
          <div className="space-y-2 mb-4">
            {DUTY_POSTS.map(p => (
              <div key={p.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-500">Required: {p.required} personnel</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={p.status} />
                  <button className="text-xs text-blue-600">Edit</button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full border-2 border-dashed border-slate-200 rounded-lg py-2.5 text-sm text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all">+ Add Duty Post</button>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="primary" onClick={() => setStep(3)}>Next: Select Personnel →</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <div className="max-w-4xl space-y-3">
          <Card className="p-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-slate-900">Step 3: Select Personnel</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowConflict(true)}>⚠ Conflict Check</Button>
              <Button variant="secondary" size="sm" onClick={() => setShowRecommend(true)}>⚡ Smart Recommendations</Button>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {["", "Personnel", "Rank", "Status", "Last Shift", "Workload", "Qualified", "Availability"].map(h => (
                    <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PERSONNEL_LIST.map(p => (
                  <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${!p.available ? "opacity-50" : ""}`}>
                    <td className="px-3 py-3">
                      <input type="checkbox" disabled={!p.available} checked={selected.includes(p.id)} onChange={e => {
                        if (e.target.checked) setSelected(prev => [...prev, p.id]);
                        else setSelected(prev => prev.filter(id => id !== p.id));
                      }} className="rounded border-slate-300" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">{p.avatar}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-600">{p.rank}</td>
                    <td className="px-3 py-3"><Badge label={p.status} /></td>
                    <td className="px-3 py-3 text-xs text-slate-600">{p.lastDuty}</td>
                    <td className="px-3 py-3 text-xs">
                      <span className={`font-semibold ${p.workload === "High" ? "text-red-600" : p.workload === "Medium" ? "text-amber-600" : "text-emerald-600"}`}>{p.workload}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.qualified.map(q => <span key={q} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{q}</span>)}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {p.available ? (
                        <span className="text-xs text-emerald-600 font-semibold">✓ Available</span>
                      ) : (
                        <span className={`text-xs font-semibold ${p.status === "On Leave" ? "text-amber-600" : p.status === "Training" ? "text-purple-600" : "text-red-600"}`}>
                          {p.status === "On Leave" ? "ON LEAVE" : p.status === "Training" ? "TRAINING" : "ON DUTY"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setStep(2)}>← Back</Button>
            <Button variant="primary" onClick={() => setStep(4)}>Review & Publish →</Button>
            <span className="text-sm text-slate-500 self-center ml-2">{selected.length} personnel selected</span>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="max-w-2xl space-y-4">
          <Card className="p-5">
            <h3 className="font-display font-bold text-slate-900 mb-4">Step 4: Review & Publish Roster</h3>
            {SHIFTS.map(s => (
              <div key={s.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${s.id === "A" ? "bg-blue-100 text-blue-800" : s.id === "B" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"}`}>{s.id}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.time} · {s.personnel} assigned</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 ml-10">
                  {PERSONNEL_LIST.slice(0, s.personnel / 2).map(p => (
                    <span key={p.id} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">{p.name.split(" ")[0]}</span>
                  ))}
                </div>
              </div>
            ))}
            <Divider />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-emerald-700"><span>✓</span> No leave conflicts detected</div>
              <div className="flex items-center gap-2 text-xs text-emerald-700"><span>✓</span> No overlapping duty assignments</div>
              <div className="flex items-center gap-2 text-xs text-amber-700"><span>⚠</span> 1 workload warning (Deepa Thomas: High workload this week)</div>
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800">Publishing this roster will notify all assigned personnel immediately and create audit records.</p>
            </div>
            <Button variant="primary" className="mt-4 w-full" onClick={onPublish}>📤 Publish Duty Roster</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Shift Roster Calendar ─────────────────────────────────────────────────────
function ShiftRosterCalendar() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const shiftColor = (s: string) => {
    if (s === "A") return "bg-blue-100 text-blue-800";
    if (s === "B") return "bg-purple-100 text-purple-800";
    if (s === "C") return "bg-slate-200 text-slate-700";
    if (s === "OFF") return "bg-slate-50 text-slate-400";
    if (s === "LEAVE") return "bg-amber-100 text-amber-700";
    if (s === "TRAIN") return "bg-emerald-100 text-emerald-700";
    return "bg-slate-100 text-slate-500";
  };

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="Shift Roster Calendar"
        sub="Unit Alpha · Week of 11–17 Aug 2026"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">← Prev Week</Button>
            <Button variant="outline" size="sm">Next Week →</Button>
            <Button variant="primary" size="sm">Month View</Button>
          </div>
        }
      />
      {/* Legend */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: "Shift A", color: "bg-blue-100 text-blue-800" },
          { label: "Shift B", color: "bg-purple-100 text-purple-800" },
          { label: "Shift C", color: "bg-slate-200 text-slate-700" },
          { label: "Off", color: "bg-slate-50 text-slate-400 border border-slate-200" },
          { label: "Leave", color: "bg-amber-100 text-amber-700" },
          { label: "Training", color: "bg-emerald-100 text-emerald-700" },
        ].map(l => <span key={l.label} className={`text-xs px-2 py-0.5 rounded-full font-semibold ${l.color}`}>{l.label}</span>)}
      </div>
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold w-40">Personnel</th>
              {days.map(d => <th key={d} className="px-3 py-3 text-xs font-semibold text-center">{d}<br /><span className="text-slate-400 font-normal">{11 + days.indexOf(d)} Aug</span></th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Object.entries(ROSTER_DATA).map(([name, schedule]) => (
              <tr key={name} className="hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">{name.split(" ").map(n => n[0]).join("")}</div>
                    <span className="text-sm font-medium text-slate-800">{name}</span>
                  </div>
                </td>
                {days.map(d => {
                  const shift = schedule[d] || "OFF";
                  return (
                    <td key={d} className="px-3 py-3 text-center">
                      <div className={`inline-flex items-center justify-center rounded-lg px-2 py-1.5 text-xs font-bold min-w-[40px] cursor-pointer hover:scale-105 transition-transform ${shiftColor(shift)}`}>
                        {shift}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── Leave Management ──────────────────────────────────────────────────────────
function LeaveManagement() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLR = LEAVE_REQUESTS.find(l => l.id === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Leave Management" sub="Pending approval · Unit Alpha" />
      <div className="grid grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {LEAVE_REQUESTS.map(lr => (
            <Card key={lr.id} className={`p-4 cursor-pointer transition-all ${selected === lr.id ? "border-blue-400 ring-2 ring-blue-200" : "hover:border-slate-300"}`} onClick={() => setSelected(lr.id)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">{lr.avatar}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{lr.personnel}</p>
                    <p className="text-xs text-slate-500">{lr.personnelId}</p>
                  </div>
                </div>
                <Badge label={lr.status} />
              </div>
              <div className="space-y-1 text-xs text-slate-500">
                <p><strong className="text-slate-700">Type:</strong> {lr.type}</p>
                <p><strong className="text-slate-700">Dates:</strong> {lr.from} – {lr.to} ({lr.days} days)</p>
                <p className="font-mono text-slate-400">{lr.id}</p>
              </div>
              {lr.dutyImpact > 0 && (
                <div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">⚠ {lr.dutyImpact} duty position{lr.dutyImpact > 1 ? "s" : ""} may be affected</div>
              )}
            </Card>
          ))}
        </div>

        {/* Detail Panel */}
        {selectedLR ? (
          <Card className="p-5 h-fit">
            <h3 className="font-display font-bold text-slate-900 mb-4">Leave Review</h3>
            {/* Personnel summary */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-11 h-11 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">{selectedLR.avatar}</div>
              <div>
                <p className="font-semibold text-slate-900">{selectedLR.personnel}</p>
                <p className="text-xs text-slate-500">{selectedLR.personnelId} · Constable · Unit Alpha</p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              {[
                { label: "Leave Type", value: selectedLR.type },
                { label: "From", value: selectedLR.from },
                { label: "To", value: selectedLR.to },
                { label: "Duration", value: `${selectedLR.days} days` },
                { label: "Reason", value: selectedLR.reason },
                { label: "Submitted", value: selectedLR.submitted },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-500 w-24">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            {selectedLR.dutyImpact > 0 && (
              <AlertBanner type="warning" message={`Potential duty shortage: ${selectedLR.dutyImpact} personnel position(s) affected during requested dates.`} />
            )}
            {selectedLR.status === "Pending" ? (
              <div className="mt-4 space-y-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Remarks (optional)</label>
                  <textarea rows={2} className="w-full border border-slate-200 rounded-lg py-1.5 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add remarks..." />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="danger" size="sm">✗ Reject</Button>
                  <Button variant="primary" size="sm">✓ Approve</Button>
                </div>
                <p className="text-xs text-slate-400 text-center">Approval will automatically update availability and duty roster.</p>
              </div>
            ) : (
              <div className="mt-4">
                <Badge label={selectedLR.status} />
                <p className="text-xs text-slate-400 mt-2">This request has already been {selectedLR.status.toLowerCase()}.</p>
              </div>
            )}
          </Card>
        ) : (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">Select a request to review</div>
        )}
      </div>
    </div>
  );
}

// ─── Personnel Directory ───────────────────────────────────────────────────────
function PersonnelDirectory() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");
  const filtered = PERSONNEL_LIST.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toLowerCase().includes(query.toLowerCase())
  );
  const selectedP = PERSONNEL_LIST.find(p => p.id === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Personnel Directory" sub="Showing personnel within authorized scope: Unit Alpha" />
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
        <span>🔐</span>
        <p className="text-sm text-amber-800">Only personnel within your authorized command scope (Unit Alpha) are visible. Accessing profiles creates audit records.</p>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search authorized personnel, ID, rank..."
            className="w-full border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        </div>
        <Select options={["All Units", "Unit Alpha"]} className="w-36" />
        <Select options={["All Ranks", "Constable", "Head Constable"]} className="w-40" />
        <Select options={["All Status", "On Duty", "Available", "On Leave"]} className="w-36" />
      </div>
      {selected && selectedP ? (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-blue-600 hover:text-blue-800 mb-4">← Back to Directory</button>
          <div className="grid grid-cols-3 gap-4">
            {/* Left: Profile summary */}
            <Card className="p-5 col-span-1 h-fit">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">{selectedP.avatar}</div>
                <h3 className="font-display font-bold text-slate-900 text-lg">{selectedP.name}</h3>
                <p className="text-slate-500 text-sm">{selectedP.rank}</p>
                <p className="text-slate-400 text-xs mt-0.5">{selectedP.id}</p>
                <div className="mt-2"><Badge label={selectedP.status} dot /></div>
              </div>
              {[
                { label: "Unit", value: selectedP.unit },
                { label: "Current Duty", value: selectedP.duty || "—" },
                { label: "Workload", value: selectedP.workload },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </Card>
            {/* Right: Tabs */}
            <Card className="p-4 col-span-2">
              <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-3 flex items-center gap-2 text-xs text-slate-500">
                <span>🔐</span> Profile access logged · AUD-002392 created
              </div>
              <TabBar tabs={["Overview", "Duty History", "Leave", "Qualifications", "Activity"]} active={tab} onChange={setTab} />
              <div className="mt-4">
                {tab === "Overview" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        { label: "Personnel ID", value: selectedP.id },
                        { label: "Full Name", value: selectedP.name },
                        { label: "Rank", value: selectedP.rank },
                        { label: "Unit", value: selectedP.unit },
                        { label: "Station", value: "Station Alpha" },
                        { label: "Join Date", value: "15 Mar 2022" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-400">{label}</span>
                          <span className="font-medium text-slate-800">{value}</span>
                        </div>
                      ))}
                    </div>
                    <PermissionLock label="Restricted Personal Data" />
                  </div>
                )}
                {tab === "Duty History" && (
                  <div className="space-y-2">
                    {[
                      { date: "13 Aug", shift: "B", type: "Platform Patrol", status: "On Duty" },
                      { date: "12 Aug", shift: "A", type: "Gate Duty", status: "Completed" },
                      { date: "11 Aug", shift: "OFF", type: "—", status: "Off Duty" },
                      { date: "10 Aug", shift: "C", type: "Reserve", status: "Completed" },
                    ].map((d, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 text-sm">
                        <div className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${d.shift === "A" ? "bg-blue-100 text-blue-800" : d.shift === "B" ? "bg-purple-100 text-purple-800" : d.shift === "OFF" ? "bg-slate-100 text-slate-400" : "bg-slate-200 text-slate-700"}`}>{d.shift}</div>
                        <span className="flex-1">{d.date} · {d.type}</span>
                        <Badge label={d.status === "Completed" ? "Active" : "Off Duty"} />
                      </div>
                    ))}
                  </div>
                )}
                {tab === "Qualifications" && (
                  <div className="space-y-2">
                    {selectedP.qualified.map(q => (
                      <div key={q} className="flex items-center gap-2 text-sm py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-emerald-500">✓</span>
                        <span className="text-slate-700">{q}</span>
                        <span className="ml-auto text-xs text-slate-400">Verified</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Photo", "Name", "Personnel ID", "Rank", "Unit", "Status", "Current Duty", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelected(p.id)}>
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">{p.avatar}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{p.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.rank}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.unit}</td>
                  <td className="px-4 py-3"><Badge label={p.status} dot /></td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.duty || "—"}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View Profile →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ─── Incident Management ───────────────────────────────────────────────────────
function IncidentManagement() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedInc = INCIDENTS.find(i => i.id === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Incident Management" sub="Unit Alpha · Active and recent incidents" />
      <div className="grid grid-cols-4 gap-3 mb-2">
        {[
          { label: "Active", count: 2, color: "border-l-blue-600" },
          { label: "Critical", count: 0, color: "border-l-red-600" },
          { label: "High", count: 1, color: "border-l-orange-500" },
          { label: "Resolved Today", count: 2, color: "border-l-emerald-500" },
        ].map(c => (
          <Card key={c.label} className={`p-3 border-l-4 ${c.color}`}>
            <p className="text-2xl font-display font-bold text-slate-900">{c.count}</p>
            <p className="text-xs text-slate-500">{c.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["ID", "Type", "Priority", "Status", "Time"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INCIDENTS.map(inc => (
                <tr key={inc.id} className={`hover:bg-slate-50 cursor-pointer transition-colors ${selected === inc.id ? "bg-blue-50" : ""}`} onClick={() => setSelected(inc.id)}>
                  <td className="px-3 py-2.5 text-xs font-mono text-slate-600">{inc.id}</td>
                  <td className="px-3 py-2.5 text-sm font-medium text-slate-800">{inc.type}</td>
                  <td className="px-3 py-2.5"><Badge label={inc.priority} /></td>
                  <td className="px-3 py-2.5"><Badge label={inc.status} /></td>
                  <td className="px-3 py-2.5 text-xs text-slate-400 font-mono">{inc.created.split(" ")[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {selectedInc && (
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
                { label: "Status", value: selectedInc.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-500 w-24">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            <Divider />
            <div className="mb-4">
              <Timeline steps={[
                { label: "Submitted", done: true, time: selectedInc.created.split(" ")[1] },
                { label: "Acknowledged", done: selectedInc.acknowledged },
                { label: "Under Review", done: ["Under Review", "Resolved", "Closed"].includes(selectedInc.status) },
                { label: "Resolved", done: ["Resolved", "Closed"].includes(selectedInc.status) },
                { label: "Closed", done: selectedInc.status === "Closed" },
              ]} />
            </div>
            {selectedInc.status !== "Closed" && (
              <div className="flex flex-wrap gap-2">
                {["Acknowledge", "Assign", "Escalate", "Update", "Resolve"].map(a => (
                  <Button key={a} variant={a === "Resolve" ? "primary" : a === "Escalate" ? "warning" : "outline"} size="sm">{a}</Button>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Inspector View Main ───────────────────────────────────────────────────────
export function InspectorView() {
  const [profile, setProfile] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  }

  loadProfile();
}, []);
  const [screen, setScreen] = useState("dashboard");
  if (loading) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-slate-500">Loading RailForce profile...</div>
    </div>
  );
}

if (!profile) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-red-500">Unable to load your RailForce profile.</div>
    </div>
  );
}

const user = {
  id: profile.employee_id,
  name: profile.full_name,
  rank: profile.rank,
  unit: profile.unit,
  role: profile.role,
  avatar: profile.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
};

  const getScreen = () => {
    switch (screen) {
      case "dashboard": return <InspectorDashboard />;
      case "duty": return <DutyManagement onCreateDuty={() => setScreen("create-duty")} />;
      case "create-duty": return <CreateDutyWizard onPublish={() => setScreen("duty")} />;
      case "roster": return <ShiftRosterCalendar />;
      case "leave": return <LeaveManagement />;
      case "personnel": return <PersonnelDirectory />;
      case "incidents": return <IncidentManagement />;
      case "messages": return <DesktopMessages role="Inspector" scope="Unit Alpha" />;
      case "emergency": return <InspectorEmergency scope="Unit Alpha (48 Personnel)" />;
      case "reports": return <RoleReports role="Inspector" scope="Unit Alpha" />;
      case "audit": return <RoleAuditLog scope="Unit Alpha" canExport={false} />;
      case "zerotrust": return <RoleZeroTrust role="Inspector" scope="Unit Alpha" />;
      default: return <InspectorDashboard />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <SecurityBanner scope="Unit Alpha · Inspector R. Singh" />
      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar
          items={NAV_ITEMS}
          active={screen === "create-duty" ? "duty" : screen}
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
