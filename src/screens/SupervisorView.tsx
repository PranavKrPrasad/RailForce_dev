/**
 * SupervisorView — dedicated environment for the Supervisor role.
 * Narrower scope than Inspector: can see own unit's personnel and approve
 * limited leaves, but cannot create/publish duty rosters or manage incidents
 * at the Inspector level. Demonstrates least-privilege differentiation.
 */
import { useState } from "react";
import {
  Card, Badge, StatCard, SectionHeader, Button, TabBar, AlertBanner,
  DesktopSidebar, SecurityBanner, Timeline, PermissionLock, Divider,
} from "../components/ui";
import {
  PERSONNEL_LIST, LEAVE_REQUESTS, INCIDENTS, CURRENT_USERS, ROLES,
} from "../data/mock";
import {
  DesktopMessages, RoleReports, RoleAuditLog, RoleZeroTrust,
  InspectorEmergency,
} from "./SharedScreens";

const SUP_NAV = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "personnel", label: "My Personnel", icon: "👥" },
  { id: "duty", label: "Duty Overview", icon: "📋" },
  { id: "leave", label: "Leave Requests", icon: "🗓️", badge: 1 },
  { id: "incidents", label: "Incidents", icon: "⚠️" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "emergency", label: "Emergency", icon: "🚨" },
  { id: "reports", label: "Reports", icon: "📊" },
  { id: "audit", label: "Audit Activity", icon: "🔍" },
  { id: "zerotrust", label: "Access Engine", icon: "🔐" },
];

// ─── Supervisor Dashboard ─────────────────────────────────────────────────────
function SupervisorDashboard() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Good Morning</p>
          <h2 className="font-display font-black text-2xl text-slate-900">Sub-Inspector Priya Nair</h2>
          <p className="text-slate-500 text-sm">Unit Beta · {new Date().toDateString()}</p>
        </div>
        <Badge label="On Duty" dot />
      </div>

      {/* Scope boundary */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
        <span className="text-blue-600">🔐</span>
        <p className="text-sm text-blue-800">
          <strong>Authorized Scope:</strong> Unit Beta — 18 Personnel directly under your supervision.
          Higher-level functions require Inspector authorization.
        </p>
      </div>

      {/* Compact stats */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="My Personnel" value={18} icon="👥" color="blue" sub="Unit Beta" />
        <StatCard label="On Duty Now" value={10} icon="🟢" color="green" sub="3 shifts" />
        <StatCard label="Available" value={5} icon="⚪" color="slate" sub="Ready to assign" />
        <StatCard label="On Leave" value={2} icon="🏖️" color="amber" sub="1 pending approval" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Today's duty snapshot */}
        <Card className="p-4">
          <SectionHeader title="Duty Snapshot" sub="Unit Beta · Today" />
          <div className="space-y-3">
            {[
              { shift: "A", time: "06:00–14:00", count: 4, posts: "Gate Duty, Platform" },
              { shift: "B", time: "14:00–22:00", count: 4, posts: "Patrol, Control Room" },
              { shift: "C", time: "22:00–06:00", count: 2, posts: "Gate Duty, Reserve" },
            ].map((s) => (
              <div key={s.shift} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    s.shift === "A"
                      ? "bg-blue-100 text-blue-800"
                      : s.shift === "B"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {s.shift}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-0.5">
                    <span className="font-semibold text-slate-800">Shift {s.shift}</span>
                    <span className="text-slate-500">{s.count} personnel</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {s.time} · {s.posts}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Cannot create duties */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
            <span>🔒</span>
            <span>Duty creation and publishing require Inspector authorization.</span>
          </div>
        </Card>

        {/* Pending actions */}
        <Card className="p-4">
          <SectionHeader title="Pending Actions" />
          <div className="space-y-2">
            {[
              { icon: "🗓️", label: "Leave Request Pending", detail: "Kiran Das · 3 days Casual Leave", badge: "Pending", action: true },
              { icon: "⚠️", label: "Incident Update Required", detail: "INC-2043 · Unauthorized Access", badge: "Acknowledged", action: false },
              { icon: "📋", label: "Duty Acknowledgements", detail: "2 of 4 confirmed for Shift B", badge: "Pending", action: false },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                </div>
                <Badge label={item.badge as any} />
                {item.action && (
                  <Button variant="outline" size="sm">Review</Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card className="p-4">
        <SectionHeader title="Recent Activity" sub="Unit Beta · Today" />
        <div className="space-y-2">
          {[
            { time: "10:45 AM", event: "Duty roster published by Inspector P. Nair for 14 Aug", type: "duty" },
            { time: "10:22 AM", event: "Emergency SOS resolved — EMERG-0088 · Kiran Das", type: "emergency" },
            { time: "09:30 AM", event: "Leave request submitted by Kiran Das (LR-8824)", type: "leave" },
            { time: "08:15 AM", event: "Shift B handover completed · 10 personnel checked in", type: "duty" },
            { time: "Yesterday", event: "Incident INC-2043 acknowledged by SI Priya Nair", type: "incident" },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  a.type === "emergency"
                    ? "bg-red-500"
                    : a.type === "duty"
                    ? "bg-blue-500"
                    : a.type === "leave"
                    ? "bg-amber-500"
                    : "bg-orange-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{a.event}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Supervisor Personnel View ────────────────────────────────────────────────
function SupervisorPersonnel() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");

  // Supervisor only sees Unit Beta — a subset of PERSONNEL_LIST used as stand-in
  const myPersonnel = PERSONNEL_LIST.slice(0, 6).map((p) => ({
    ...p,
    unit: "Unit Beta",
  }));

  const selectedP = myPersonnel.find((p) => p.id === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="My Personnel"
        sub="Showing personnel within your authorized scope: Unit Beta (18 records)"
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 text-sm text-amber-800">
        <span>🔐</span>
        <span>
          You can view personnel profiles within Unit Beta only. Personnel outside your scope are
          not shown. All profile views are audited.
        </span>
      </div>

      {selected && selectedP ? (
        <div>
          <button
            onClick={() => setSelected(null)}
            className="text-sm text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Personnel List
          </button>
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-5 col-span-1 h-fit">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                  {selectedP.avatar}
                </div>
                <h3 className="font-display font-bold text-slate-900">{selectedP.name}</h3>
                <p className="text-slate-500 text-sm">{selectedP.rank}</p>
                <p className="text-slate-400 text-xs">{selectedP.id}</p>
                <div className="mt-2">
                  <Badge label={selectedP.status} dot />
                </div>
              </div>
              {[
                { label: "Unit", value: "Unit Beta" },
                { label: "Current Duty", value: selectedP.duty || "—" },
                { label: "Workload", value: selectedP.workload },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between text-sm py-1.5 border-b border-slate-100 last:border-0"
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </Card>

            <Card className="p-4 col-span-2">
              <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-3 flex items-center gap-2 text-xs text-slate-500">
                <span>🔐</span> Profile view audited · Access logged as authorized
              </div>
              <TabBar
                tabs={["Overview", "Duty History", "Leave", "Qualifications"]}
                active={tab}
                onChange={setTab}
              />
              <div className="mt-4">
                {tab === "Overview" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {[
                        { label: "Personnel ID", value: selectedP.id },
                        { label: "Full Name", value: selectedP.name },
                        { label: "Rank", value: selectedP.rank },
                        { label: "Unit", value: "Unit Beta" },
                        { label: "Qualifications", value: selectedP.qualified.join(", ") },
                        { label: "Workload", value: selectedP.workload },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-xs text-slate-400">{label}</p>
                          <p className="font-medium text-slate-800 mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                    <PermissionLock label="Restricted Personal Data (address, emergency contacts, medical)" />
                    <PermissionLock label="Disciplinary Records — Inspector authorization required" />
                  </div>
                )}
                {tab === "Duty History" && (
                  <div className="space-y-2">
                    {[
                      { date: "13 Aug", shift: "B", type: "Platform Patrol", status: "On Duty" },
                      { date: "12 Aug", shift: "A", type: "Gate Duty", status: "Completed" },
                      { date: "11 Aug", shift: "OFF", type: "—", status: "Off Duty" },
                    ].map((d, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 text-sm">
                        <div
                          className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${
                            d.shift === "A"
                              ? "bg-blue-100 text-blue-800"
                              : d.shift === "B"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {d.shift}
                        </div>
                        <span className="flex-1">
                          {d.date} · {d.type}
                        </span>
                        <Badge label={d.status === "Completed" ? "Active" : "Off Duty"} />
                      </div>
                    ))}
                  </div>
                )}
                {tab === "Qualifications" && (
                  <div className="space-y-2">
                    {selectedP.qualified.map((q) => (
                      <div
                        key={q}
                        className="flex items-center gap-2 text-sm py-1.5 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-emerald-500">✓</span>
                        <span className="text-slate-700">{q}</span>
                        <span className="ml-auto text-xs text-slate-400">Verified</span>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "Leave" && (
                  <div className="space-y-2">
                    {LEAVE_REQUESTS.slice(0, 3).map((lr) => (
                      <div key={lr.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{lr.type}</p>
                          <p className="text-xs text-slate-500">
                            {lr.from} – {lr.to} · {lr.days} days
                          </p>
                        </div>
                        <Badge label={lr.status} />
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
                {["Photo", "Name", "ID", "Rank", "Status", "Duty", "Workload", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myPersonnel.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelected(p.id)}
                >
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
                      {p.avatar}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{p.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.rank}</td>
                  <td className="px-4 py-3">
                    <Badge label={p.status} dot />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{p.duty || "—"}</td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={`font-semibold ${
                        p.workload === "High"
                          ? "text-red-600"
                          : p.workload === "Medium"
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {p.workload}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-blue-600 font-medium">View →</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ─── Supervisor Duty Overview (read-only) ────────────────────────────────────
function SupervisorDutyOverview() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Duty Overview" sub="Unit Beta · Read-only view" />

      <AlertBanner
        type="info"
        message="Duty creation and publishing is managed by your Inspector. You can view the roster and monitor acknowledgements."
      />

      {/* Current roster — read only */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-slate-900">Active Roster — 14 Aug 2026</h3>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-100 rounded-lg px-3 py-1.5">
            🔒 Published by Inspector P. Nair · Read-only
          </div>
        </div>

        {["A", "B", "C"].map((shift) => (
          <div key={shift} className="mb-5 last:mb-0">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold mb-3 ${
                shift === "A"
                  ? "bg-blue-100 text-blue-800"
                  : shift === "B"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Shift {shift} · {shift === "A" ? "06:00–14:00" : shift === "B" ? "14:00–22:00" : "22:00–06:00"}
            </div>
            <div className="space-y-1.5">
              {PERSONNEL_LIST.slice(0, shift === "A" ? 4 : shift === "B" ? 3 : 2).map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {p.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.id} · {shift === "A" ? "Gate Duty" : shift === "B" ? "Platform Patrol" : "Reserve"}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {shift === "A" || (shift === "B" && p === PERSONNEL_LIST[0]) ? (
                      <><span className="text-emerald-600">✓</span><span className="text-emerald-600 font-semibold">Acknowledged</span></>
                    ) : (
                      <><span className="text-amber-500">⏳</span><span className="text-amber-600 font-semibold">Pending</span></>
                    )}
                  </div>
                  {/* Supervisor can send reminders */}
                  {!(shift === "A" || (shift === "B" && p === PERSONNEL_LIST[0])) && (
                    <Button variant="ghost" size="sm">Remind</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>

      {/* Locked: Create Duty */}
      <Card className="p-4 opacity-70">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔒</span>
          <div className="flex-1">
            <p className="font-semibold text-slate-700">Create / Publish Duty Roster</p>
            <p className="text-sm text-slate-400">
              Duty creation, personnel assignment, and roster publishing require Inspector authorization.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Supervisor Leave (limited approve) ──────────────────────────────────────
function SupervisorLeave() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLR = LEAVE_REQUESTS.find((l) => l.id === selected);
  const pendingRequests = LEAVE_REQUESTS.filter((lr) => lr.status === "Pending").slice(0, 1);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader
        title="Leave Requests"
        sub="Unit Beta · Limited approval authority (Casual Leave up to 2 days)"
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
        <strong>Limited Authorization:</strong> As Supervisor, you may approve Casual Leave up to 2 days.
        Longer durations or other leave types require Inspector approval and will be forwarded automatically.
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          {LEAVE_REQUESTS.map((lr) => (
            <Card
              key={lr.id}
              className={`p-4 cursor-pointer transition-all ${
                selected === lr.id ? "border-blue-400 ring-2 ring-blue-200" : "hover:border-slate-300"
              }`}
              onClick={() => setSelected(lr.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {lr.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{lr.personnel}</p>
                    <p className="text-xs text-slate-500">{lr.personnelId}</p>
                  </div>
                </div>
                <Badge label={lr.status} />
              </div>
              <div className="space-y-0.5 text-xs text-slate-500">
                <p>
                  <strong className="text-slate-700">Type:</strong> {lr.type}
                </p>
                <p>
                  <strong className="text-slate-700">Dates:</strong> {lr.from} – {lr.to} ({lr.days} days)
                </p>
              </div>
              {lr.days > 2 && lr.status === "Pending" && (
                <div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">
                  ⚠ {lr.days} days — requires Inspector approval (above your authority limit)
                </div>
              )}
            </Card>
          ))}
        </div>

        {selectedLR ? (
          <Card className="p-5 h-fit">
            <h3 className="font-display font-bold text-slate-900 mb-4">Leave Review</h3>
            <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-11 h-11 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                {selectedLR.avatar}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{selectedLR.personnel}</p>
                <p className="text-xs text-slate-500">{selectedLR.personnelId} · Unit Beta</p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              {[
                { label: "Type", value: selectedLR.type },
                { label: "From", value: selectedLR.from },
                { label: "To", value: selectedLR.to },
                { label: "Duration", value: `${selectedLR.days} days` },
                { label: "Reason", value: selectedLR.reason },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-500 w-20">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            <Divider />
            {selectedLR.status === "Pending" ? (
              selectedLR.days <= 2 && selectedLR.type === "Casual Leave" ? (
                <div className="space-y-3">
                  <AlertBanner type="info" message="Within your approval authority (Casual Leave ≤ 2 days)." />
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Remarks (optional)</label>
                    <textarea
                      rows={2}
                      className="w-full border border-slate-200 rounded-lg py-1.5 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add remarks..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="danger" size="sm">✗ Reject</Button>
                    <Button variant="primary" size="sm">✓ Approve</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <AlertBanner
                    type="warning"
                    message={`${selectedLR.days > 2 ? "Duration exceeds your approval limit (2 days)." : "Leave type requires Inspector approval."} This request will be forwarded.`}
                  />
                  <Button variant="outline" className="w-full">
                    📤 Forward to Inspector for Approval
                  </Button>
                </div>
              )
            ) : (
              <div>
                <Badge label={selectedLR.status} />
                <p className="text-xs text-slate-400 mt-2">
                  This request has been {selectedLR.status.toLowerCase()}.
                </p>
              </div>
            )}
          </Card>
        ) : (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Select a request to review
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Supervisor Incidents (limited) ──────────────────────────────────────────
function SupervisorIncidents() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedInc = INCIDENTS.find((i) => i.id === selected);

  return (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <SectionHeader title="Incidents" sub="Unit Beta · You may view and update; escalation requires Inspector" />

      <AlertBanner
        type="info"
        message="You can view incidents from your unit personnel. Escalation and formal assignment require Inspector authorization."
      />

      <div className="grid grid-cols-2 gap-4">
        <Card className="overflow-hidden">
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
              {INCIDENTS.slice(0, 4).map((inc) => (
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
                  <td className="px-3 py-2.5 text-xs text-slate-400 font-mono">{inc.created.split(" ")[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {selectedInc ? (
          <Card className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display font-bold text-slate-900">{selectedInc.id}</h3>
              <Badge label={selectedInc.priority} />
            </div>
            <div className="space-y-2 text-sm mb-4">
              {[
                { label: "Type", value: selectedInc.type },
                { label: "Location", value: selectedInc.location },
                { label: "Reported By", value: selectedInc.reportedBy },
                { label: "Status", value: selectedInc.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-500 w-24">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            <Divider />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">📝 Add Update</Button>
              <Button variant="warning" size="sm">⬆ Escalate to Inspector</Button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
              <span>🔒</span>
              <span>Formal assignment and resolution require Inspector authorization.</span>
            </div>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            Select an incident to view
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Supervisor View Main ─────────────────────────────────────────────────────
export function SupervisorView() {
  const [screen, setScreen] = useState("dashboard");
  const user = CURRENT_USERS[ROLES.SUPERVISOR];

  const getScreen = () => {
    switch (screen) {
      case "dashboard":
        return <SupervisorDashboard />;
      case "personnel":
        return <SupervisorPersonnel />;
      case "duty":
        return <SupervisorDutyOverview />;
      case "leave":
        return <SupervisorLeave />;
      case "incidents":
        return <SupervisorIncidents />;
      case "messages":
        return <DesktopMessages role="Supervisor" scope="Unit Beta" />;
      case "emergency":
        return <InspectorEmergency scope="Unit Beta (18 Personnel)" />;
      case "reports":
        return <RoleReports role="Supervisor" scope="Unit Beta" />;
      case "audit":
        return <RoleAuditLog scope="Unit Beta" canExport={false} />;
      case "zerotrust":
        return <RoleZeroTrust role="Supervisor" scope="Unit Beta" />;
      default:
        return <SupervisorDashboard />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <SecurityBanner scope="Unit Beta · Sub-Inspector Priya Nair · Limited Authorization" />
      <div className="flex flex-1 overflow-hidden">
        <DesktopSidebar
          items={SUP_NAV}
          active={screen}
          onSelect={setScreen}
          user={{ name: user.name, rank: user.rank, avatar: user.avatar, id: user.id }}
        />
        <main className="flex-1 overflow-hidden">{getScreen()}</main>
      </div>
    </div>
  );
}
