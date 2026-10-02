export const ROLES = {
  PERSONNEL: "Personnel",
  SUPERVISOR: "Supervisor",
  INSPECTOR: "Inspector",
  COMMAND_OFFICER: "Command Officer",
  HIGHER_AUTHORITY: "Higher Authority",
  ADMIN: "System Administrator",
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];

export const CURRENT_USERS: Record<RoleType, any> = {
  [ROLES.PERSONNEL]: {
    id: "RF-2847",
    name: "Aarav Sharma",
    rank: "Constable",
    unit: "Unit Alpha",
    role: ROLES.PERSONNEL,
    avatar: "AS",
    email: "a.sharma@railforce.internal",
    scope: "Self",
    reportingOfficer: "Inspector R. Singh",
    reportingOfficerId: "RF-1023",
    joinDate: "15 Mar 2022",
    phone: "+91-XXXXXXXXXX",
    station: "Station Alpha, Platform 2",
  },
  [ROLES.SUPERVISOR]: {
    id: "RF-1847",
    name: "Priya Nair",
    rank: "Sub-Inspector",
    unit: "Unit Beta",
    role: ROLES.SUPERVISOR,
    avatar: "PN",
    email: "p.nair@railforce.internal",
    scope: "Unit Beta Personnel",
    scopeCount: 18,
  },
  [ROLES.INSPECTOR]: {
    id: "RF-1023",
    name: "Rajesh Singh",
    rank: "Inspector",
    unit: "Unit Alpha",
    role: ROLES.INSPECTOR,
    avatar: "RS",
    email: "r.singh@railforce.internal",
    scope: "Unit Alpha",
    scopeCount: 48,
    commandedBy: "Command Officer D. Mehta",
  },
  [ROLES.COMMAND_OFFICER]: {
    id: "RF-0412",
    name: "Deepak Mehta",
    rank: "Deputy Commandant",
    unit: "Division North",
    role: ROLES.COMMAND_OFFICER,
    avatar: "DM",
    email: "d.mehta@railforce.internal",
    scope: "Division North (Units A, B, C, D)",
    scopeCount: 250,
  },
  [ROLES.HIGHER_AUTHORITY]: {
    id: "RF-0101",
    name: "Sunita Verma",
    rank: "Commandant",
    unit: "HQ",
    role: ROLES.HIGHER_AUTHORITY,
    avatar: "SV",
    email: "s.verma@railforce.internal",
    scope: "All Divisions (Authorized View)",
    scopeCount: 1200,
  },
  [ROLES.ADMIN]: {
    id: "RF-ADMIN-01",
    name: "Ankit Bose",
    rank: "System Administrator",
    unit: "IT Security Division",
    role: ROLES.ADMIN,
    avatar: "AB",
    email: "a.bose@railforce.internal",
    scope: "System-Wide (Technical)",
    scopeCount: null,
  },
};

export const PERSONNEL_LIST = [
  { id: "RF-2847", name: "Aarav Sharma", rank: "Constable", unit: "Unit Alpha", status: "On Duty", duty: "Platform Patrol", avatar: "AS", shift: "B", lastDuty: "Shift A", workload: "Medium", qualified: ["Patrol", "Escort"], available: true },
  { id: "RF-2901", name: "Rahul Kumar", rank: "Constable", unit: "Unit Alpha", status: "Available", duty: "—", avatar: "RK", shift: "—", lastDuty: "Shift C", workload: "Low", qualified: ["Patrol", "Control Room"], available: true },
  { id: "RF-2734", name: "Vikram Singh", rank: "Constable", unit: "Unit Alpha", status: "On Leave", duty: "—", avatar: "VS", shift: "—", lastDuty: "Shift B", workload: "Low", qualified: ["Patrol"], available: false },
  { id: "RF-2655", name: "Manoj Das", rank: "Constable", unit: "Unit Alpha", status: "Training", duty: "—", avatar: "MD", shift: "—", lastDuty: "Shift A", workload: "Low", qualified: ["Patrol", "First Aid"], available: false },
  { id: "RF-2788", name: "Sanjay Rao", rank: "Head Constable", unit: "Unit Alpha", status: "Available", duty: "—", avatar: "SR", shift: "—", lastDuty: "Shift B", workload: "Medium", qualified: ["Patrol", "Escort", "Control Room"], available: true },
  { id: "RF-2912", name: "Meena Pillai", rank: "Constable", unit: "Unit Alpha", status: "Available", duty: "—", avatar: "MP", shift: "—", lastDuty: "Shift C", workload: "Low", qualified: ["Patrol"], available: true },
  { id: "RF-2444", name: "Arun Joshi", rank: "Head Constable", unit: "Unit Alpha", status: "Reserve", duty: "—", avatar: "AJ", shift: "—", lastDuty: "Shift A", workload: "Low", qualified: ["Patrol", "Escort"], available: true },
  { id: "RF-2601", name: "Deepa Thomas", rank: "Constable", unit: "Unit Alpha", status: "On Duty", duty: "Gate Duty", avatar: "DT", shift: "A", lastDuty: "Shift C", workload: "High", qualified: ["Patrol"], available: false },
  { id: "RF-2519", name: "Rohan Patil", rank: "Constable", unit: "Unit Alpha", status: "Available", duty: "—", avatar: "RP", shift: "—", lastDuty: "Shift B", workload: "Medium", qualified: ["Patrol", "Control Room"], available: true },
  { id: "RF-2333", name: "Kavya Menon", rank: "Constable", unit: "Unit Alpha", status: "Available", duty: "—", avatar: "KM", shift: "—", lastDuty: "Shift A", workload: "Low", qualified: ["Patrol", "Escort"], available: true },
];

export const DUTY_POSTS = [
  { name: "Station Gate", required: 4, assigned: 4, status: "Full" },
  { name: "Platform Patrol", required: 6, assigned: 5, status: "Short" },
  { name: "Control Room", required: 2, assigned: 2, status: "Full" },
  { name: "Escort Duty", required: 3, assigned: 3, status: "Full" },
  { name: "Reserve", required: 4, assigned: 2, status: "Short" },
];

export const SHIFTS = [
  { id: "A", label: "Shift A", time: "06:00 – 14:00", personnel: 18, posts: 5 },
  { id: "B", label: "Shift B", time: "14:00 – 22:00", personnel: 16, posts: 5 },
  { id: "C", label: "Shift C", time: "22:00 – 06:00", personnel: 14, posts: 5 },
];

export const LEAVE_REQUESTS = [
  { id: "LR-8821", personnel: "Vikram Singh", personnelId: "RF-2734", type: "Casual Leave", from: "14 Aug 2026", to: "17 Aug 2026", days: 4, reason: "Family function", status: "Pending", submitted: "12 Aug 2026", avatar: "VS", dutyImpact: 2 },
  { id: "LR-8819", personnel: "Meena Pillai", personnelId: "RF-2912", type: "Medical Leave", from: "13 Aug 2026", to: "15 Aug 2026", days: 3, reason: "Medical treatment", status: "Approved", submitted: "11 Aug 2026", avatar: "MP", dutyImpact: 1 },
  { id: "LR-8814", personnel: "Arun Joshi", personnelId: "RF-2444", type: "Earned Leave", from: "20 Aug 2026", to: "25 Aug 2026", days: 6, reason: "Annual vacation", status: "Pending", submitted: "10 Aug 2026", avatar: "AJ", dutyImpact: 0 },
  { id: "LR-8807", personnel: "Sanjay Rao", personnelId: "RF-2788", type: "Casual Leave", from: "16 Aug 2026", to: "16 Aug 2026", days: 1, reason: "Personal work", status: "Rejected", submitted: "09 Aug 2026", avatar: "SR", dutyImpact: 0 },
];

export const INCIDENTS = [
  { id: "INC-2047", type: "Suspicious Activity", priority: "High", location: "Platform 3, Station Alpha", reportedBy: "RF-2847 Aarav Sharma", status: "Under Review", created: "13 Aug 2026 09:15", acknowledged: true, assignedTo: "Inspector R. Singh" },
  { id: "INC-2046", type: "Lost Property", priority: "Low", location: "Waiting Hall, Station Alpha", reportedBy: "RF-2901 Rahul Kumar", status: "Resolved", created: "13 Aug 2026 07:42", acknowledged: true, assignedTo: "SI P. Nair" },
  { id: "INC-2044", type: "Medical Emergency", priority: "Critical", location: "Platform 1, Station Alpha", reportedBy: "RF-2788 Sanjay Rao", status: "Resolved", created: "12 Aug 2026 18:33", acknowledged: true, assignedTo: "Inspector R. Singh" },
  { id: "INC-2043", type: "Unauthorized Access", priority: "Medium", location: "Control Room Corridor", reportedBy: "RF-2601 Deepa Thomas", status: "Acknowledged", created: "12 Aug 2026 15:10", acknowledged: true, assignedTo: "—" },
  { id: "INC-2041", type: "Vandalism", priority: "Medium", location: "Platform 5, Station Beta", reportedBy: "RF-3001 Kiran Das", status: "Closed", created: "11 Aug 2026 11:22", acknowledged: true, assignedTo: "SI P. Nair" },
];

export const AUDIT_EVENTS = [
  { id: "AUD-002391", time: "10:52 AM", user: "Inspector R. Singh", userId: "RF-1023", action: "Viewed Personnel Profile", resource: "RF-2847", outcome: "AUTHORIZED", severity: "Info" },
  { id: "AUD-002390", time: "10:48 AM", user: "Constable A. Sharma", userId: "RF-2847", action: "Submitted Incident Report", resource: "INC-2047", outcome: "AUTHORIZED", severity: "Info" },
  { id: "AUD-002389", time: "10:45 AM", user: "Inspector R. Singh", userId: "RF-1023", action: "Published Duty Roster", resource: "ROSTER-2026-08-14", outcome: "AUTHORIZED", severity: "Info" },
  { id: "AUD-002388", time: "10:42 AM", user: "Inspector R. Singh", userId: "RF-1023", action: "Accessed Media File", resource: "MED-00441", outcome: "AUTHORIZED", severity: "Info" },
  { id: "AUD-002387", time: "10:38 AM", user: "Unknown", userId: "—", action: "Failed Login Attempt", resource: "Login Portal", outcome: "DENIED", severity: "Warning" },
  { id: "AUD-002386", time: "10:35 AM", user: "Constable V. Singh", userId: "RF-2734", action: "Attempted Profile Access", resource: "RF-0412", outcome: "DENIED – Out of Scope", severity: "Warning" },
  { id: "AUD-002385", time: "10:30 AM", user: "Deputy Commandant D. Mehta", userId: "RF-0412", action: "Approved Command Scope Extension", resource: "RF-1023 → Unit Bravo", outcome: "AUTHORIZED", severity: "Critical" },
  { id: "AUD-002384", time: "10:15 AM", user: "Admin A. Bose", userId: "RF-ADMIN-01", action: "Modified Role Permission", resource: "ROLE: Inspector", outcome: "AUTHORIZED", severity: "Critical" },
  { id: "AUD-002383", time: "10:08 AM", user: "Inspector R. Singh", userId: "RF-1023", action: "Override Duty Conflict", resource: "RF-2847 Shift A/B", outcome: "AUTHORIZED with Reason", severity: "Warning" },
  { id: "AUD-002382", time: "09:55 AM", user: "Constable A. Sharma", userId: "RF-2847", action: "SOS Emergency Activated", resource: "EMERG-0089", outcome: "AUTHORIZED", severity: "Critical" },
];

export const NOTIFICATIONS = [
  { id: 1, category: "Duty", title: "New Duty Assigned", message: "Shift B · 14 Aug · 14:00–22:00 · Platform Patrol, Station Alpha", time: "2 min ago", read: false, priority: "normal" },
  { id: 2, category: "Leave", title: "Leave Request Approved", message: "Your Casual Leave request (LR-8801) for 10–11 Aug has been approved.", time: "1 hr ago", read: false, priority: "normal" },
  { id: 3, category: "Emergency", title: "Emergency Resolved", message: "Emergency INC-2044 at Platform 1 has been marked Resolved.", time: "3 hr ago", read: true, priority: "high" },
  { id: 4, category: "Security", title: "New Login Detected", message: "Your account was accessed from a new device. Location: Station Alpha Terminal.", time: "5 hr ago", read: true, priority: "high" },
  { id: 5, category: "Incident", title: "Incident Assigned", message: "INC-2047 (Suspicious Activity) has been assigned to your unit for review.", time: "6 hr ago", read: true, priority: "normal" },
  { id: 6, category: "System", title: "System Maintenance Window", message: "Scheduled maintenance on 15 Aug 2026 02:00–04:00. Plan offline workflows.", time: "1 day ago", read: true, priority: "low" },
];

export const MESSAGES = [
  {
    id: "ch-1",
    channel: "Unit Alpha Duty Team",
    type: "group",
    avatar: "UA",
    lastMessage: "Roster for 15 Aug has been published.",
    time: "10:45",
    unread: 2,
    messages: [
      { sender: "Inspector R. Singh", text: "Roster for 15 Aug has been published. Please acknowledge.", time: "10:45", system: false },
      { sender: "Aarav Sharma", text: "Acknowledged. Noted.", time: "10:47", system: false, self: true },
      { sender: "System", text: "Duty acknowledgement recorded for RF-2847.", time: "10:47", system: true },
      { sender: "Rahul Kumar", text: "Acknowledged.", time: "10:48", system: false },
    ],
  },
  {
    id: "ch-2",
    channel: "Inspector R. Singh",
    type: "direct",
    avatar: "RS",
    lastMessage: "Report to Platform 2 at 13:45.",
    time: "09:30",
    unread: 0,
    messages: [
      { sender: "Inspector R. Singh", text: "Report to Platform 2 at 13:45 for briefing before Shift B.", time: "09:30", system: false },
      { sender: "Aarav Sharma", text: "Yes sir, noted.", time: "09:32", system: false, self: true },
    ],
  },
  {
    id: "ch-3",
    channel: "Incident INC-2047",
    type: "incident",
    avatar: "IC",
    lastMessage: "Situation under control. Monitoring continues.",
    time: "Yesterday",
    unread: 0,
    messages: [
      { sender: "System", text: "Incident INC-2047 channel created. Authorized participants only.", time: "09:15", system: true },
      { sender: "Aarav Sharma", text: "Suspicious individual observed near Platform 3 cargo area. Approaching for check.", time: "09:17", system: false, self: true },
      { sender: "Inspector R. Singh", text: "Proceed with caution. Backup en route.", time: "09:18", system: false },
      { sender: "Aarav Sharma", text: "Situation under control. Monitoring continues.", time: "09:35", system: false, self: true },
    ],
  },
];

export const MANPOWER_STATS = {
  inspector: { total: 48, onDuty: 26, available: 12, onLeave: 5, training: 2, reserve: 3 },
  command: { total: 250, onDuty: 142, available: 38, onLeave: 31, training: 20, reserve: 19 },
  higher: { total: 1200, onDuty: 680, available: 195, onLeave: 145, training: 98, reserve: 82 },
};

export const UNIT_DATA = [
  { unit: "Unit Alpha", strength: 48, onDuty: 26, coverage: 87 },
  { unit: "Unit Beta", strength: 52, onDuty: 30, coverage: 92 },
  { unit: "Unit Gamma", strength: 45, onDuty: 28, coverage: 78 },
  { unit: "Unit Delta", strength: 55, onDuty: 34, coverage: 89 },
  { unit: "Unit Echo", strength: 50, onDuty: 24, coverage: 74 },
];

export const DUTY_COVERAGE_DATA = [
  { day: "Mon", covered: 94, target: 95 },
  { day: "Tue", covered: 88, target: 95 },
  { day: "Wed", covered: 96, target: 95 },
  { day: "Thu", covered: 91, target: 95 },
  { day: "Fri", covered: 87, target: 95 },
  { day: "Sat", covered: 79, target: 95 },
  { day: "Sun", covered: 82, target: 95 },
];

export const INCIDENT_TREND = [
  { month: "Mar", count: 12 },
  { month: "Apr", count: 8 },
  { month: "May", count: 15 },
  { month: "Jun", count: 11 },
  { month: "Jul", count: 9 },
  { month: "Aug", count: 7 },
];

export const PERMISSIONS = {
  Personnel: ["duty.view", "duty.acknowledge", "leave.request", "incident.report", "media.upload", "message.send"],
  Supervisor: ["duty.view", "duty.acknowledge", "leave.request", "leave.approve_limited", "incident.report", "incident.view_unit", "media.upload", "media.view_unit", "message.send", "personnel.view_unit"],
  Inspector: ["duty.view", "duty.create", "duty.assign", "duty.publish", "leave.approve", "incident.view", "incident.manage", "media.view", "media.download", "emergency.respond", "personnel.view_unit", "message.send"],
  "Command Officer": ["duty.view", "duty.create", "duty.publish", "leave.approve", "incident.view", "incident.escalate", "media.view", "emergency.command", "personnel.view_division", "reports.view", "message.send"],
  "Higher Authority": ["duty.view_all", "incident.view_all", "emergency.view_all", "personnel.view_authorized", "reports.view_all", "message.send"],
  "System Administrator": ["system.configure", "roles.manage", "permissions.manage", "audit.view", "users.manage", "scope.assign"],
};

export const COMMAND_HIERARCHY = {
  id: "RF-0101",
  name: "Sunita Verma",
  rank: "Commandant",
  role: "Higher Authority",
  avatar: "SV",
  expanded: true,
  children: [
    {
      id: "RF-0412",
      name: "Deepak Mehta",
      rank: "Deputy Commandant",
      role: "Command Officer",
      avatar: "DM",
      unit: "Division North",
      expanded: true,
      children: [
        {
          id: "RF-1023",
          name: "Rajesh Singh",
          rank: "Inspector",
          role: "Inspector",
          avatar: "RS",
          unit: "Unit Alpha",
          expanded: true,
          children: [
            { id: "RF-2847", name: "Aarav Sharma", rank: "Constable", avatar: "AS", status: "On Duty" },
            { id: "RF-2901", name: "Rahul Kumar", rank: "Constable", avatar: "RK", status: "Available" },
            { id: "RF-2788", name: "Sanjay Rao", rank: "Head Constable", avatar: "SR", status: "Available" },
          ],
        },
        {
          id: "RF-1047",
          name: "Priya Nair",
          rank: "Inspector",
          role: "Inspector",
          avatar: "PN",
          unit: "Unit Beta",
          children: [
            { id: "RF-3001", name: "Kiran Das", rank: "Constable", avatar: "KD", status: "On Duty" },
            { id: "RF-3012", name: "Suresh Yadav", rank: "Head Constable", avatar: "SY", status: "On Leave" },
          ],
        },
      ],
    },
    {
      id: "RF-0315",
      name: "Arvind Kulkarni",
      rank: "Deputy Commandant",
      role: "Command Officer",
      avatar: "AK",
      unit: "Division South",
      children: [
        {
          id: "RF-1098",
          name: "Geeta Mishra",
          rank: "Inspector",
          role: "Inspector",
          avatar: "GM",
          unit: "Unit Gamma",
          children: [
            { id: "RF-3201", name: "Ramesh Babu", rank: "Constable", avatar: "RB", status: "Training" },
          ],
        },
      ],
    },
  ],
};

export const MEDIA_FILES = [
  { id: "MED-00441", name: "Platform_3_Incident.jpg", type: "image", uploaded: "13 Aug 09:17", uploader: "RF-2847 A. Sharma", incident: "INC-2047", duty: "DUTY-8821", classification: "Operational", size: "2.4 MB" },
  { id: "MED-00439", name: "Gate_Duty_Report.pdf", type: "document", uploaded: "12 Aug 14:30", uploader: "RF-2601 D. Thomas", incident: "—", duty: "DUTY-8810", classification: "Operational", size: "340 KB" },
  { id: "MED-00437", name: "Medical_Scene.jpg", type: "image", uploaded: "12 Aug 18:45", uploader: "RF-2788 S. Rao", incident: "INC-2044", duty: "DUTY-8805", classification: "Restricted", size: "1.8 MB" },
  { id: "MED-00434", name: "Vandalism_Evidence.jpg", type: "image", uploaded: "11 Aug 11:30", uploader: "RF-3001 K. Das", incident: "INC-2041", duty: "DUTY-8799", classification: "Sensitive", size: "3.1 MB" },
  { id: "MED-00430", name: "Roster_15Aug.pdf", type: "document", uploaded: "10 Aug 17:00", uploader: "RF-1023 R. Singh", incident: "—", duty: "—", classification: "Operational", size: "210 KB" },
];

export const ROSTER_DATA: Record<string, Record<string, string>> = {
  "Aarav Sharma": { Mon: "B", Tue: "B", Wed: "OFF", Thu: "C", Fri: "C", Sat: "A", Sun: "A" },
  "Rahul Kumar": { Mon: "A", Tue: "A", Wed: "B", Thu: "B", Wed2: "OFF", Fri: "OFF", Sat: "C", Sun: "C" },
  "Vikram Singh": { Mon: "LEAVE", Tue: "LEAVE", Wed: "LEAVE", Thu: "LEAVE", Fri: "C", Sat: "C", Sun: "OFF" },
  "Manoj Das": { Mon: "TRAIN", Tue: "TRAIN", Wed: "TRAIN", Thu: "A", Fri: "A", Sat: "B", Sun: "OFF" },
  "Sanjay Rao": { Mon: "C", Tue: "C", Wed: "A", Thu: "A", Fri: "B", Sat: "B", Sun: "OFF" },
  "Meena Pillai": { Mon: "B", Tue: "OFF", Wed: "B", Thu: "C", Fri: "C", Sat: "A", Sun: "A" },
};

export const EMERGENCY_EVENTS = [
  {
    id: "EMERG-0089",
    personnel: "Aarav Sharma",
    personnelId: "RF-2847",
    avatar: "AS",
    time: "10:22 AM",
    date: "13 Aug 2026",
    location: "Platform 3, Station Alpha",
    lat: 28.6139,
    lng: 77.2090,
    status: "Resolved",
    acknowledgedBy: "Inspector R. Singh",
    responseTeam: "QRT-Alpha-2",
    timeline: [
      { event: "SOS Activated", time: "10:22:14" },
      { event: "Acknowledged", time: "10:22:41" },
      { event: "Response Assigned", time: "10:24:05" },
      { event: "Responding", time: "10:26:18" },
      { event: "Resolved", time: "10:31:44" },
    ],
  },
];

export const SESSION_DATA = {
  activeSessions: 37,
  failedLogins: 12,
  accessDenials: 8,
  securityAlerts: 2,
  suspiciousActivity: 3,
  permissionChanges: 1,
};
