import { useState } from "react";
import { Badge, Card, Avatar, Timeline, AlertBanner } from "../components/ui";
import { NOTIFICATIONS, MESSAGES, LEAVE_REQUESTS } from "../data/mock";

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function BottomNav({ active, onChange }: { active: string; onChange: (s: string) => void }) {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "duty", label: "Duty", icon: "📋" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "reports", label: "Reports", icon: "📁" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];
  return (
    <div className="flex border-t border-slate-200 bg-white">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors ${active === t.id ? "text-blue-700 font-semibold" : "text-slate-400"}`}>
          <span className="text-base">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Personnel Home ────────────────────────────────────────────────────────────
function PersonnelHome({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 px-4 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-xs">Good Morning</p>
            <h2 className="text-white font-display font-bold text-xl">Aarav Sharma</h2>
            <p className="text-slate-400 text-xs mt-0.5">RF-2847 · Constable · Unit Alpha</p>
          </div>
          <div className="relative">
            <div className="w-11 h-11 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">AS</div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
        </div>
        {/* Status */}
        <div className="bg-blue-700 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs font-medium">Current Status</p>
              <p className="text-white font-display font-bold text-lg">ON DUTY</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-xs">Shift B</p>
              <p className="text-white font-mono text-sm font-bold">14:00–22:00</p>
            </div>
          </div>
          <div className="mt-2 border-t border-blue-600 pt-2">
            <p className="text-blue-200 text-xs">Platform Patrol · Station Alpha</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Next Duty */}
        <Card className="p-4">
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Next Duty</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-slate-900">Shift C</p>
              <p className="text-sm text-slate-600">22:00 PM – 06:00 AM</p>
              <p className="text-xs text-slate-400 mt-0.5">Station Gate · Platform Area</p>
            </div>
            <div className="text-right">
              <Badge label="Assigned" />
              <p className="text-xs text-slate-400 mt-1">14 Aug 2026</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => onNav("duty")} className="flex-1 bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg">View Duty</button>
            <button className="flex-1 border border-slate-200 text-slate-600 text-xs font-semibold py-2 rounded-lg">Details</button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: "📝", label: "Submit Report", id: "incident", color: "bg-blue-50 border-blue-100 text-blue-700" },
              { icon: "📷", label: "Upload Media", id: "media", color: "bg-purple-50 border-purple-100 text-purple-700" },
              { icon: "🗓️", label: "Request Leave", id: "leave", color: "bg-amber-50 border-amber-100 text-amber-700" },
              { icon: "🚨", label: "Emergency SOS", id: "sos", color: "bg-red-50 border-red-100 text-red-700" },
            ].map(a => (
              <button key={a.id} onClick={() => onNav(a.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border ${a.color} text-sm font-semibold transition-all active:scale-95`}>
                <span className="text-lg">{a.icon}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Recent Notifications</p>
          <div className="space-y-2">
            {NOTIFICATIONS.slice(0, 3).map(n => (
              <Card key={n.id} className={`p-3 ${!n.read ? "border-blue-200 bg-blue-50/30" : ""}`}>
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    {n.category === "Duty" && <span>📋</span>}
                    {n.category === "Leave" && <span>🗓️</span>}
                    {n.category === "Emergency" && <span>🚨</span>}
                    {n.category === "Security" && <span>🔐</span>}
                    {n.category === "Incident" && <span>⚠️</span>}
                    {n.category === "System" && <span>⚙️</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                      {!n.read && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── My Duty ──────────────────────────────────────────────────────────────────
function MyDuty() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className="bg-slate-900 px-4 pt-6 pb-4">
        <h2 className="text-white font-display font-bold text-xl">My Duty</h2>
        <div className="flex gap-2 mt-3">
          {["today", "history"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeTab === t ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400"}`}>
              {t === "today" ? "Today" : "History"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "today" ? (
        <div className="px-4 py-4 space-y-3">
          {/* Today's duty card */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Today's Duty</p>
                <p className="font-display font-bold text-slate-900 text-xl">Shift B</p>
              </div>
              <Badge label={acknowledged ? "Acknowledged" : "Assigned"} />
            </div>
            {[
              { label: "Time", value: "02:00 PM – 10:00 PM" },
              { label: "Duty Type", value: "Platform Patrol" },
              { label: "Duty Point", value: "Platform 2–4, Station Alpha" },
              { label: "Reporting Officer", value: "Inspector R. Singh" },
              { label: "Date", value: "13 Aug 2026, Wednesday" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-xs text-slate-500 w-36">{label}</span>
                <span className="text-sm font-medium text-slate-800">{value}</span>
              </div>
            ))}
            <button
              onClick={() => setAcknowledged(true)}
              disabled={acknowledged}
              className={`w-full mt-4 py-3 rounded-xl font-bold text-sm transition-all ${
                acknowledged
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default"
                  : "bg-blue-700 hover:bg-blue-600 text-white shadow-sm active:scale-95"
              }`}
            >
              {acknowledged ? "✓ Acknowledged" : "ACKNOWLEDGE DUTY"}
            </button>
          </Card>

          {/* Location sharing */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Location Status</p>
                <p className="text-xs text-slate-500 mt-0.5">Active during duty hours only</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot" />
                <span className="text-xs text-emerald-700 font-semibold">ACTIVE</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2 bg-slate-50 rounded-lg p-2">Location sharing is enabled for authorized operational purposes during active duty. It will automatically disable at shift end.</p>
          </Card>
        </div>
      ) : (
        // Duty History
        <div className="px-4 py-4">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {["This Week", "This Month", "Custom"].map(f => (
              <button key={f} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border ${f === "This Week" ? "bg-blue-700 text-white border-blue-700" : "bg-white text-slate-600 border-slate-200"}`}>{f}</button>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { date: "12 Aug", shift: "A", type: "Gate Duty", location: "Station Alpha Gate", status: "Completed" },
              { date: "11 Aug", shift: "B", type: "Platform Patrol", location: "Platform 1–3", status: "Completed" },
              { date: "10 Aug", shift: "C", type: "Reserve", location: "Control Room", status: "Completed" },
              { date: "09 Aug", shift: "A", type: "Escort Duty", location: "Station Alpha → Beta", status: "Completed" },
              { date: "08 Aug", shift: "OFF", type: "—", location: "—", status: "Off Duty" },
            ].map((d, i) => (
              <Card key={i} className="p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  d.shift === "A" ? "bg-blue-100 text-blue-800" :
                  d.shift === "B" ? "bg-purple-100 text-purple-800" :
                  d.shift === "C" ? "bg-slate-100 text-slate-700" :
                  "bg-slate-100 text-slate-400"
                }`}>
                  {d.shift}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{d.type}</p>
                  <p className="text-xs text-slate-500">{d.date} · {d.location}</p>
                </div>
                <Badge label={d.status === "Completed" ? "Active" : "Off Duty"} />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Leave ────────────────────────────────────────────────────────────────────
function LeaveScreen() {
  const [view, setView] = useState<"request" | "status">("status");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className="bg-slate-900 px-4 pt-6 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Leave</h2>
        <div className="flex gap-2 mt-3">
          {[{ id: "status", label: "My Requests" }, { id: "request", label: "New Request" }].map(t => (
            <button key={t.id} onClick={() => { setView(t.id as any); setSubmitted(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold ${view === t.id ? "bg-blue-700 text-white" : "bg-slate-800 text-slate-400"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {view === "request" ? (
          submitted ? (
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-display font-bold text-slate-900 text-lg">Request Submitted</p>
              <p className="text-sm text-slate-500 mt-1">Your leave request has been submitted for review by your reporting officer.</p>
              <div className="mt-4 bg-slate-50 rounded-lg p-3 text-left">
                <p className="text-xs text-slate-500 font-mono">Reference: LR-8825</p>
                <p className="text-xs text-slate-500 font-mono">Submitted: 13 Aug 2026 · 11:02 AM</p>
              </div>
            </Card>
          ) : (
            <Card className="p-4 space-y-4">
              <h3 className="font-display font-bold text-slate-900">Leave Request</h3>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Leave Type</label>
                <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Casual Leave</option>
                  <option>Medical Leave</option>
                  <option>Earned Leave</option>
                  <option>Compensatory Off</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">From Date</label>
                  <input type="date" defaultValue="2026-08-20" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">To Date</label>
                  <input type="date" defaultValue="2026-08-21" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Reason</label>
                <textarea rows={3} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Briefly describe the reason..." />
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400">📎 Attach supporting document (optional)</p>
              </div>
              <button onClick={() => setSubmitted(true)} className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">Submit Request</button>
            </Card>
          )
        ) : (
          <div className="space-y-3">
            {[
              { id: "LR-8819", type: "Medical Leave", dates: "13–15 Aug 2026", days: 3, status: "Approved" },
              { id: "LR-8812", type: "Casual Leave", dates: "05–06 Aug 2026", days: 2, status: "Approved" },
              { id: "LR-8801", type: "Earned Leave", dates: "10–11 Jul 2026", days: 2, status: "Rejected" },
              { id: "LR-8788", type: "Casual Leave", dates: "20 Jun 2026", days: 1, status: "Approved" },
            ].map(lr => (
              <Card key={lr.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{lr.type}</p>
                    <p className="text-xs text-slate-500">{lr.dates} · {lr.days} day{lr.days > 1 ? "s" : ""}</p>
                  </div>
                  <Badge label={lr.status} />
                </div>
                <p className="text-xs text-slate-400 font-mono">{lr.id}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Messages ─────────────────────────────────────────────────────────────────
function MessagesScreen() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState("");

  const channel = MESSAGES.find(m => m.id === activeChannel);

  if (activeChannel && channel) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="bg-slate-900 px-4 pt-5 pb-4 flex items-center gap-3">
          <button onClick={() => setActiveChannel(null)} className="text-slate-400 hover:text-white mr-1">←</button>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white ${channel.type === "incident" ? "bg-red-700" : "bg-blue-700"}`}>
            {channel.avatar}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{channel.channel}</p>
            <p className="text-slate-400 text-xs">{channel.type === "group" ? "Group · Authorized access" : channel.type === "incident" ? "Incident Channel · Restricted" : "Direct Message"}</p>
          </div>
          {channel.type === "incident" && (
            <span className="ml-auto bg-red-900/60 border border-red-700 text-red-300 text-xs px-2 py-0.5 rounded-full">🔒 Restricted</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-3 bg-slate-50">
          {channel.messages.map((m, i) => (
            <div key={i} className={`flex ${m.self ? "justify-end" : "justify-start"}`}>
              {m.system ? (
                <div className="bg-slate-200/70 rounded-full px-4 py-1.5 text-xs text-slate-500 text-center">{m.text}</div>
              ) : (
                <div className={`max-w-[80%] ${m.self ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                  {!m.self && <p className="text-xs text-slate-500 ml-1">{m.sender}</p>}
                  <div className={`rounded-2xl px-3 py-2 text-sm ${m.self ? "bg-blue-700 text-white rounded-br-sm" : "bg-white text-slate-900 shadow-sm rounded-bl-sm"}`}>
                    {m.text}
                  </div>
                  <p className="text-xs text-slate-400 font-mono mx-1">{m.time}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-white border-t border-slate-200 flex gap-2 items-center">
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-slate-200 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setNewMsg("")}
            className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white"
          >
            ↑
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="bg-slate-900 px-4 pt-6 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Messages</h2>
        <div className="mt-2 relative">
          <input className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-8 pr-3 text-sm text-white placeholder-slate-500 focus:outline-none" placeholder="Search authorized conversations..." />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto phone-scroll divide-y divide-slate-100">
        {MESSAGES.map(m => (
          <button key={m.id} onClick={() => setActiveChannel(m.id)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white bg-white transition-colors text-left">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 ${m.type === "incident" ? "bg-red-700" : "bg-blue-700"}`}>
              {m.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900 text-sm">{m.channel}</p>
                <span className="text-xs text-slate-400">{m.time}</span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">{m.lastMessage}</p>
              <p className="text-xs text-slate-400 mt-0.5">{m.type === "group" ? "👥 Group" : m.type === "incident" ? "🚨 Incident · Restricted" : "💬 Direct"}</p>
            </div>
            {m.unread > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">{m.unread}</span>
            )}
          </button>
        ))}
        {/* Locked group example */}
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 opacity-60">
          <div className="w-11 h-11 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 flex-shrink-0">🔒</div>
          <div>
            <p className="font-semibold text-slate-600 text-sm">Division Command Channel</p>
            <p className="text-xs text-slate-400">Not authorized for your role</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Incident Report ──────────────────────────────────────────────────────────
function IncidentReport() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  if (submitted) {
    return (
      <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
        <div className="bg-slate-900 px-4 pt-6 pb-4">
          <h2 className="text-white font-display font-bold text-xl">Incident Report</h2>
        </div>
        <div className="px-4 py-6">
          <Card className="p-6 text-center">
            <div className="text-5xl mb-3">📋</div>
            <p className="font-display font-bold text-slate-900 text-xl">Report Submitted</p>
            <p className="text-sm text-slate-500 mt-1">Your incident report has been submitted to your reporting officer.</p>
            <div className="mt-4 bg-blue-50 rounded-xl p-4 text-left">
              <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Reference ID</span><span className="font-mono font-bold text-blue-700">INC-2048</span></div>
              <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Submitted</span><span className="font-mono text-slate-700">13 Aug · 11:15 AM</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Status</span><span className="text-amber-700 font-semibold">Under Review</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Timeline steps={[
                { label: "Submitted", time: "11:15 AM", done: true },
                { label: "Acknowledged", done: false },
                { label: "Under Review", done: false },
                { label: "Resolved", done: false },
              ]} />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className="bg-slate-900 px-4 pt-6 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Incident Report</h2>
        <p className="text-slate-400 text-xs mt-1">All reports are recorded and audited</p>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-blue-700 text-white" : "bg-slate-200 text-slate-400"}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-0.5 w-8 ${step > s ? "bg-blue-700" : "bg-slate-200"}`} />}
            </div>
          ))}
          <span className="text-xs text-slate-500 ml-1">{step === 1 ? "Details" : step === 2 ? "Attach Media" : "Review"}</span>
        </div>

        {step === 1 && (
          <Card className="p-4 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Incident Type</label>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Suspicious Activity</option>
                <option>Medical Emergency</option>
                <option>Vandalism</option>
                <option>Unauthorized Access</option>
                <option>Lost Property</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Priority</label>
              <div className="grid grid-cols-4 gap-1.5">
                {["Low", "Medium", "High", "Critical"].map(p => (
                  <button key={p} className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    p === "High" ? "bg-orange-100 border-orange-200 text-orange-800" :
                    p === "Critical" ? "bg-red-100 border-red-200 text-red-800" :
                    "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>{p}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <textarea rows={4} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" defaultValue="Suspicious individual observed near Platform 3 cargo area. Subject was photographing restricted equipment." />
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">📍 Location: Platform 3, Station Alpha</p>
              <p className="text-xs text-slate-400 mt-0.5">Auto-captured from your current duty assignment</p>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">Next →</button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-slate-900">Attach Media</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-xl gap-2 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all">
                <span className="text-2xl">📷</span>
                <span className="text-xs font-medium">Capture Photo</span>
              </button>
              <button className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-xl gap-2 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all">
                <span className="text-2xl">🖼️</span>
                <span className="text-xs font-medium">Select Photo</span>
              </button>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
              <strong>Upload Policy:</strong> All media is end-to-end encrypted and stored securely. Uploading creates an immutable audit record.
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm">← Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">Next →</button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-slate-900">Review & Submit</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Type", value: "Suspicious Activity" },
                { label: "Priority", value: "High" },
                { label: "Location", value: "Platform 3, Station Alpha" },
                { label: "Reported By", value: "RF-2847 Aarav Sharma" },
                { label: "Time", value: "13 Aug 2026 · 11:12 AM" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            <AlertBanner type="info" message="Submitting this report creates a permanent audit record." />
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-sm">← Back</button>
              <button onClick={() => setSubmitted(true)} className="flex-1 bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">Submit Incident</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── SOS Emergency ────────────────────────────────────────────────────────────
function SOSScreen() {
  const [sosState, setSosState] = useState<"idle" | "active" | "acknowledged" | "responding" | "resolved">("idle");
  const [holding, setHolding] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const holdTimerRef = { current: null as ReturnType<typeof setTimeout> | null };
  const countdownRef = { current: null as ReturnType<typeof setInterval> | null };

  const startHold = () => {
    setHolding(true);
    setCountdown(3);
    let count = 3;
    countdownRef.current = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownRef.current!);
      }
    }, 1000);
    holdTimerRef.current = setTimeout(() => {
      setHolding(false);
      setSosState("active");
      setTimeout(() => setSosState("acknowledged"), 3000);
      setTimeout(() => setSosState("responding"), 5500);
      setTimeout(() => setSosState("resolved"), 9000);
    }, 3000);
  };

  const cancelHold = () => {
    if (!holding) return;
    setHolding(false);
    setCountdown(3);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  return (
    <div className={`flex-1 flex flex-col items-center justify-center px-6 transition-colors duration-500 ${
      sosState === "idle" ? "bg-slate-900" :
      sosState === "resolved" ? "bg-emerald-900" :
      "bg-red-950"
    }`}>
      {sosState === "idle" ? (
        <>
          <div className="text-center mb-8">
            <p className="text-slate-400 text-xs font-mono mb-1 tracking-widest">EMERGENCY ALERT SYSTEM</p>
            <h2 className="text-white font-display font-black text-3xl tracking-wide">EMERGENCY SOS</h2>
            <p className="text-slate-400 text-sm mt-2">
              {holding ? `Activating in ${countdown}...` : "PRESS & HOLD FOR 3 SECONDS"}
            </p>
          </div>

          {/* Countdown ring */}
          <div className="relative mb-8">
            {holding && (
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="72" fill="none" stroke="#dc2626" strokeWidth="6" strokeDasharray="452" strokeDashoffset={452 - (452 * (3 - countdown) / 3)} className="transition-all duration-1000" />
              </svg>
            )}
            <button
              onPointerDown={startHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              className={`w-40 h-40 rounded-full flex items-center justify-center border-4 transition-all duration-200 select-none touch-none ${
                holding
                  ? "bg-red-600 border-red-400 scale-95"
                  : "bg-red-800/50 border-red-600 hover:bg-red-800/70"
              }`}
            >
              <div className="text-center pointer-events-none">
                {holding ? (
                  <>
                    <p className="text-red-100 font-display font-black text-6xl leading-none">{countdown}</p>
                    <p className="text-red-300 text-xs mt-1 font-mono">HOLD...</p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl">🚨</span>
                    <p className="text-white font-bold text-sm mt-2">SOS</p>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Broadcast info */}
          <div className="w-full max-w-xs bg-slate-800/60 border border-slate-700 rounded-xl p-4 space-y-2 text-xs">
            <p className="text-slate-400 font-mono uppercase tracking-wide mb-2">Will Broadcast:</p>
            {[
              { label: "Officer", value: "RF-2847 Aarav Sharma" },
              { label: "Post", value: "Platform Patrol · Station Alpha" },
              { label: "Duty", value: "DUTY-8821 · Shift B" },
              { label: "Location", value: "Platform 3, Station Alpha (Synthetic)" },
              { label: "Battery", value: "74%" },
              { label: "Network", value: "ONLINE · 4G" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-200 font-mono">{value}</span>
              </div>
            ))}
          </div>

          <p className="text-slate-600 text-xs text-center mt-6 max-w-xs">
            Activating SOS will immediately notify your reporting officer and command chain. Your verified identity and authorized location will be shared.
          </p>
        </>
      ) : (
        <div className="w-full text-center fade-in">
          <div className={`text-5xl mb-4 ${sosState === "resolved" ? "" : "animate-pulse"}`}>
            {sosState === "active" && "🚨"}
            {sosState === "acknowledged" && "📡"}
            {sosState === "responding" && "🏃"}
            {sosState === "resolved" && "✅"}
          </div>
          <h2 className="text-white font-display font-black text-2xl mb-1">
            {sosState === "active" && "SOS ACTIVE"}
            {sosState === "acknowledged" && "ACKNOWLEDGED"}
            {sosState === "responding" && "RESPONDING"}
            {sosState === "resolved" && "RESOLVED"}
          </h2>

          <div className={`rounded-2xl p-5 mt-5 text-left space-y-2.5 ${sosState === "resolved" ? "bg-emerald-800/60 border border-emerald-600" : "bg-red-900/60 border border-red-700"}`}>
            {[
              { label: "Officer ID", value: "RF-2847 Aarav Sharma" },
              { label: "Assigned Post", value: "Platform 3, Station Alpha" },
              { label: "Current Duty", value: "Platform Patrol · Shift B" },
              { label: "Location", value: "Platform 3, Station Alpha (Synthetic)" },
              { label: "Battery", value: "74%" },
              { label: "Time", value: "13 Aug 2026 · 10:22:14" },
              { label: "Connection", value: "ONLINE · 4G" },
              { label: "Status", value: sosState === "active" ? "⏳ Awaiting acknowledgement" : sosState === "acknowledged" ? "✓ Acknowledged by Inspector R. Singh" : sosState === "responding" ? "🏃 QRT-Alpha-2 dispatched" : "✅ Resolved · 10:31:44" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 text-sm">
                <span className={`w-24 flex-shrink-0 text-xs font-mono ${sosState === "resolved" ? "text-emerald-300" : "text-red-300"}`}>{label}</span>
                <span className="text-white font-medium text-xs">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <Timeline steps={[
              { label: "SOS Activated", time: "10:22:14", done: true },
              { label: "Alert Received", time: "10:22:16", done: true },
              { label: "Supervisor Acknowledged", time: ["acknowledged", "responding", "resolved"].includes(sosState) ? "10:22:41" : undefined, done: ["acknowledged", "responding", "resolved"].includes(sosState) },
              { label: "Response Team Assigned", time: ["responding", "resolved"].includes(sosState) ? "10:24:05" : undefined, done: ["responding", "resolved"].includes(sosState) },
              { label: "Incident Resolved", time: sosState === "resolved" ? "10:31:44" : undefined, done: sosState === "resolved" },
            ]} />
          </div>

          {sosState === "resolved" && (
            <button onClick={() => setSosState("idle")} className="mt-6 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl text-sm">
              Return to Home
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Media Upload ─────────────────────────────────────────────────────────────
function MediaUpload() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className="bg-slate-900 px-4 pt-6 pb-4">
        <h2 className="text-white font-display font-bold text-xl">Media Upload</h2>
        <p className="text-slate-400 text-xs mt-1">Secure · Encrypted · Audited</p>
      </div>
      <div className="px-4 py-4 space-y-4">
        {uploaded ? (
          <Card className="p-5">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🔒</div>
              <p className="font-display font-bold text-slate-900 text-lg">Upload Secured</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">INTEGRITY VERIFIED</p>
            </div>
            {/* Evidence pipeline */}
            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wide mb-2">Evidence Intake Pipeline</p>
              {[
                { stage: "UPLOAD", detail: "File received · 2.4 MB", done: true },
                { stage: "MIME VALIDATION", detail: "image/jpeg · Allowed", done: true },
                { stage: "METADATA SANITIZATION", detail: "EXIF data stripped", done: true },
                { stage: "SHA-256 HASH", detail: "a3f9c1...b7e204", done: true },
                { stage: "ENCRYPTED STORAGE", detail: "AES-256 · Stored", done: true },
                { stage: "AUDIT RECORD", detail: "AUD-002392 · Created", done: true },
              ].map(({ stage, detail, done }) => (
                <div key={stage} className="flex items-center gap-3 py-1.5 border-b border-slate-100 last:border-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                    {done ? "✓" : "—"}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700 flex-1">{stage}</span>
                  <span className="text-xs text-slate-400">{detail}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs">
              {[
                { label: "Evidence ID", value: "MED-00442" },
                { label: "Uploaded By", value: "RF-2847 Aarav Sharma" },
                { label: "Timestamp", value: "13 Aug 2026 · 11:05:33" },
                { label: "SHA-256", value: "a3f9c1b2...b7e204" },
                { label: "Case / Incident", value: "INC-2047" },
                { label: "Integrity Status", value: "✓ VERIFIED" },
                { label: "Access Scope", value: "Inspector R. Singh + above" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-mono text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📷", label: "Capture Photo" },
                { icon: "🖼️", label: "Select Photo" },
                { icon: "📄", label: "Attach Document" },
                { icon: "🎥", label: "Record Video" },
              ].map(a => (
                <button key={a.label} className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-slate-200 rounded-xl gap-2 text-slate-500 hover:border-blue-400 hover:text-blue-600 transition-all">
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-xs font-medium">{a.label}</span>
                </button>
              ))}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Related Duty</label>
              <select className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>DUTY-8821 · Shift B · 13 Aug · Platform Patrol</option>
                <option>DUTY-8810 · Shift A · 12 Aug</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Incident Reference (optional)</label>
              <input type="text" placeholder="e.g. INC-2047" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <textarea rows={3} className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe what is being uploaded..." />
            </div>
            <div className="bg-slate-50 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-slate-400 text-xs">🕒</span>
              <span className="text-xs text-slate-500">Timestamp: 13 Aug 2026 · 11:04:18 IST · Auto-captured</span>
            </div>
            <button onClick={() => setUploaded(true)} className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">
              🔒 Secure Upload
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Offline Mode ─────────────────────────────────────────────────────────────
function OfflineMode() {
  const [restored, setRestored] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleRestore = () => {
    setRestored(true);
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setSynced(true); }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      {!restored ? (
        <>
          <div className="bg-slate-700 px-4 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full" />
              <p className="text-slate-300 text-xs font-mono font-semibold">OFFLINE MODE</p>
            </div>
            <h2 className="text-white font-display font-bold text-xl">Network Unavailable</h2>
            <p className="text-slate-400 text-xs mt-1">Internet connection lost · Limited functionality</p>
          </div>
          <div className="px-4 py-4 space-y-4">
            <AlertBanner type="warning" message="You are working offline. Some features are unavailable." />
            <div>
              <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Available Offline</p>
              <div className="space-y-2">
                {[
                  { icon: "📋", label: "View cached duty assignments", available: true },
                  { icon: "📝", label: "Create incident draft", available: true },
                  { icon: "📄", label: "Prepare report (offline)", available: true },
                  { icon: "📷", label: "Queue media upload", available: true },
                  { icon: "🚨", label: "Emergency event queue", available: true },
                  { icon: "💬", label: "Send messages", available: false },
                  { icon: "🗓️", label: "Submit leave request", available: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.available ? "bg-white" : "bg-slate-100 opacity-60"}`}>
                    <span className="text-lg">{item.icon}</span>
                    <span className={`text-sm flex-1 ${item.available ? "text-slate-800 font-medium" : "text-slate-400 line-through"}`}>{item.label}</span>
                    <span className={`text-xs ${item.available ? "text-emerald-600" : "text-slate-400"}`}>{item.available ? "✓" : "—"}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-4">
              <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Pending Synchronization</p>
              <p className="text-2xl font-display font-bold text-slate-900">3 items</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-slate-500">• INC-DRAFT-001 · Incident draft</p>
                <p className="text-xs text-slate-500">• MED-QUEUE-002 · Photo upload pending</p>
                <p className="text-xs text-slate-500">• RPT-QUEUE-003 · Duty report queued</p>
              </div>
            </Card>
            <button onClick={handleRestore} className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm">Simulate Connection Restored →</button>
          </div>
        </>
      ) : (
        <div className="px-4 py-10 text-center">
          {syncing ? (
            <>
              <div className="text-4xl mb-4 animate-pulse">🔄</div>
              <p className="font-display font-bold text-slate-900 text-xl">Synchronizing...</p>
              <p className="text-sm text-slate-500 mt-1">Uploading 3 queued items</p>
              <div className="mt-6 w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: "60%" }} />
              </div>
              <p className="text-xs text-slate-400 mt-2 font-mono">2 of 3 items uploaded...</p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-4">✅</div>
              <p className="font-display font-bold text-slate-900 text-xl">Synchronization Complete</p>
              <p className="text-sm text-slate-500 mt-1">All 3 items uploaded successfully</p>
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left">
                {["INC-DRAFT-001 → INC-2048 · Submitted", "MED-QUEUE-002 → MED-00442 · Uploaded", "RPT-QUEUE-003 → RPT-1205 · Submitted"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 py-1">
                    <span className="text-emerald-600">✓</span>{t}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function PersonnelProfile() {
  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-slate-50">
      <div className="bg-slate-900 px-4 pt-6 pb-8 text-center">
        <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">AS</div>
        <h2 className="text-white font-display font-bold text-xl">Aarav Sharma</h2>
        <p className="text-slate-400 text-sm">RF-2847 · Constable · Unit Alpha</p>
        <Badge label="On Duty" />
      </div>
      <div className="px-4 -mt-2 pb-6 space-y-3">
        <Card className="p-4">
          <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wide">Basic Profile</p>
          {[
            { label: "Personnel ID", value: "RF-2847" },
            { label: "Full Name", value: "Aarav Sharma" },
            { label: "Rank", value: "Constable" },
            { label: "Unit", value: "Unit Alpha" },
            { label: "Reporting Officer", value: "Inspector R. Singh" },
            { label: "Station", value: "Station Alpha" },
            { label: "Join Date", value: "15 Mar 2022" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0 text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium text-slate-800">{value}</span>
            </div>
          ))}
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wide">Qualifications</p>
          {["Patrol Operations", "Escort Duty", "Basic First Aid", "Traffic Management"].map(q => (
            <div key={q} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
              <span className="text-emerald-500 text-xs">✓</span>
              <span className="text-sm text-slate-700">{q}</span>
            </div>
          ))}
        </Card>
        <Card className="p-4 opacity-75">
          <div className="flex items-center gap-2 mb-2">
            <span>🔒</span>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Restricted Personal Data</p>
          </div>
          <p className="text-xs text-slate-400">Additional authorization required to view home address, emergency contacts, and medical records.</p>
        </Card>
      </div>
    </div>
  );
}

// ─── Main Personnel App ───────────────────────────────────────────────────────
export function PersonnelApp({ onNav }: { onNav?: (s: string) => void }) {
  const [screen, setScreen] = useState("home");

  const getScreen = () => {
    switch (screen) {
      case "home": return <PersonnelHome onNav={setScreen} />;
      case "duty": return <MyDuty />;
      case "leave": return <LeaveScreen />;
      case "messages": return <MessagesScreen />;
      case "incident": return <IncidentReport />;
      case "sos": return <SOSScreen />;
      case "media": return <MediaUpload />;
      case "offline": return <OfflineMode />;
      case "profile": return <PersonnelProfile />;
      default: return <PersonnelHome onNav={setScreen} />;
    }
  };

  const bottomNavScreen = ["home", "duty", "messages", "reports", "profile"].includes(screen) ? screen : "home";

  const handleBottomNav = (s: string) => {
    if (s === "reports") setScreen("incident");
    else setScreen(s);
  };

  return (
    <div className="flex flex-col h-full">
      {screen === "sos" ? (
        getScreen()
      ) : (
        <>
          {getScreen()}
          {/* Floating SOS */}
          {screen !== "sos" && (
            <button
              onClick={() => setScreen("sos")}
              className="absolute bottom-16 right-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors z-10 sos-pulse"
            >
              <span className="text-white text-lg">🚨</span>
            </button>
          )}
          <BottomNav active={bottomNavScreen} onChange={handleBottomNav} />
        </>
      )}
    </div>
  );
}
