Update the existing RailForce application UI/UX. DO NOT rebuild the application from scratch and DO NOT remove the existing core screens or functionality. Preserve the current visual identity, branding, navigation structure, and working components wherever possible, but make the interface significantly more professional, operational, secure, and production-ready.

PROJECT:
RailForce — Position-Aware Railway Personnel, Duty Management & Operational Security Platform

TAGLINE:
“Connecting Railway Personnel. Securing Railway Operations.”

SOURCE OF TRUTH:
The RailForce architecture is based on these core modules:
1. Personnel Management
2. Position-Aware Access Control (PAAC)
3. Smart Duty & Rostering
4. Dynamic Leave Management
5. Duty-Scoped Secure Communication
6. Emergency SOS & Incident Response
7. Evidence Desk
8. SOC Command Center
9. Access Risk Scoring
10. Security & Immutable Audit
11. Offline Operational Continuity

IMPORTANT PRODUCT PRINCIPLE:
RailForce is a Human-in-Command decision-support platform. It must NEVER visually imply that AI or automation independently makes disciplinary, deployment, or command decisions. Automated systems provide recommendations, scores, alerts, and conflict detection. Authorized human supervisors make final decisions.

==================================================
1. OVERALL UI DIRECTION
==================================================

Make the interface look like a serious mission-critical operational platform rather than a generic SaaS/admin dashboard.

Design language:
- Professional railway/security operations environment
- Clean enterprise interface
- High information density but excellent readability
- Desktop command-center experience
- Responsive field/mobile experience
- Clear hierarchy between operational information and security information
- Use restrained colors and strong status indicators
- Avoid excessive gradients, excessive rounded cards, decorative illustrations, or consumer-app styling
- Maintain the existing RailForce branding

Use clear operational states:
- NORMAL
- WARNING
- CRITICAL
- OFFLINE
- DEGRADED
- RESOLVED

Use confirmation dialogs for consequential actions.

==================================================
2. ROLE-AWARE EXPERIENCE
==================================================

RailForce uses Position-Aware Access Control (PAAC).

The interface must adapt according to:

- Field Staff
- Supervisor
- Command Officer
- SOC Analyst
- Audit Lead

Access should conceptually depend on:
Role + Unit + Responsibility + Shift Status + Operational Need-to-Know

Do not merely hide buttons visually. The UI should communicate that access is restricted by authorization.

Add a small contextual security indicator where appropriate:

“Operational Scope: Post / Unit / Shift”

Examples:
- Active Duty
- Assigned Post
- Current Shift
- Authorized Area

==================================================
3. COMMAND / OPERATIONS DASHBOARD
==================================================

Improve the main dashboard into an operational command overview.

Include:

TOP SUMMARY:
- Active Personnel
- Personnel On Duty
- Current Shift
- Open Incidents
- Active SOS Alerts
- Manpower Deficits
- Security Alerts
- System Connectivity

MAIN OPERATIONS MAP:
Create an operations map showing synthetic railway locations/posts.

Map markers should represent:
- Personnel
- Active incidents
- SOS alerts
- Posts
- Manpower shortages

Clicking a marker should open a contextual panel.

Do NOT use real railway operational data.

Use clearly synthetic/demo data.

==================================================
4. INCIDENT COMMAND CENTER
==================================================

Add a dedicated Incident Command module.

Incident lifecycle:

ACTIVE
↓
ACKNOWLEDGED
↓
RESPONDING
↓
RESOLVED
↓
CLOSED

Create an incident detail screen containing:

- Incident ID
- Severity
- Time
- Location
- Reporting officer
- Assigned post
- Current status
- Responding team
- Timeline
- Communications
- Evidence
- Audit history

Add a visual incident timeline.

Example:

14:32:05 — SOS ACTIVATED
14:32:07 — ALERT RECEIVED
14:32:18 — SUPERVISOR ACKNOWLEDGED
14:33:10 — RESPONSE TEAM ASSIGNED
14:41:20 — INCIDENT RESOLVED

Human actions must be clearly distinguished from automated system events.

==================================================
5. 3-SECOND SOS EXPERIENCE
==================================================

Create/improve the field SOS interface.

The emergency button must use a deliberate 3-second press-and-hold interaction.

Before activation:
“PRESS & HOLD FOR 3 SECONDS”

During activation:
Show a visible countdown:
3 → 2 → 1

After activation:
“SOS ACTIVE”

Show:
- Officer ID
- Assigned Post
- Current duty
- Synthetic location
- Battery level
- Timestamp
- Connection status

Supervisor dashboard should immediately display:
- Critical SOS banner
- Location
- Officer
- Time
- Acknowledge button

Include a clear confirmation state after the supervisor acknowledges it.

==================================================
6. SMART DUTY / ROSTERING
==================================================

Improve the Smart Duty module.

Show:
- 3 shift cycles
- Personnel assignment
- Duty duration
- Previous duty
- Rest duration
- Leave status
- Qualification match
- Workload
- Conflict status
- DSS score

Shifts:
A: 06:00–14:00
B: 14:00–22:00
C: 22:00–06:00

Implement a visual 16-hour minimum rest constraint.

When a conflict occurs, clearly show:

“REST CONSTRAINT VIOLATION”

or

“DUTY CONFLICT”

The DSS should be displayed as an explainable recommendation, not an autonomous decision.

Example:

Duty Suitability Score: 87/100

Breakdown:
Availability: 30%
Qualification: 25%
Rest: 25%
Workload Balance: 20%

Then:

“Supervisor Review Required”

Add:
- Generate roster
- Review recommendations
- Resolve conflicts
- Supervisor approval
- Publish roster

The roster must NOT appear automatically finalized without human approval.

==================================================
7. DYNAMIC LEAVE MANAGEMENT
==================================================

Improve Leave Management.

When a supervisor approves leave:

1. Availability updates
2. Roster recalculates
3. Manpower requirement is checked
4. If below baseline, generate:

“MANPOWER DEFICIT ALERT”

Show:
- Affected post
- Required personnel
- Available personnel
- Deficit
- Suggested reserve personnel

Make the supervisor explicitly approve any replacement assignment.

==================================================
8. DUTY-SCOPED SECURE COMMUNICATION
==================================================

Create/improve a secure operational messaging interface.

Channels should be contextual:

Post Channel
Shift Channel
Train Escort Channel
Unit Command Channel

Show:
“Access expires when active duty assignment ends.”

When the shift ends, the UI should transition the channel to:

“READ-ONLY ARCHIVED”

Add supervisor priority broadcast capability.

Clearly differentiate:
- Normal message
- Priority directive
- System event
- Emergency message

Do not make it look like WhatsApp or a consumer chat application.

==================================================
9. EVIDENCE DESK
==================================================

Create a professional Evidence Management interface.

Evidence intake pipeline:

UPLOAD
↓
MIME VALIDATION
↓
METADATA SANITIZATION
↓
SHA-256 HASH
↓
ENCRYPTED STORAGE
↓
AUDIT RECORD

Show these verification states visually.

For each evidence item show:
- Evidence ID
- File type
- Upload timestamp
- Case/Incident ID
- SHA-256 hash
- Integrity status
- Uploaded by
- Access scope

Add:

“INTEGRITY VERIFIED”

and

“INTEGRITY CHECK FAILED”

states.

Do not display sensitive real-world data. Use synthetic data.

==================================================
10. SOC COMMAND CENTER
==================================================

Create a dedicated SOC interface that feels clearly separated from normal operational dashboards.

SOC should be accessible only to SOC Analyst / authorized security roles.

Include:

SECURITY OVERVIEW:
- Current Risk Level
- Authentication Events
- Failed Login Attempts
- Active Security Alerts
- Suspicious Sessions
- Anomalies
- Audit Integrity

LIVE SECURITY EVENT STREAM:
Show simulated events such as:
- Failed authentication
- Unrecognized device
- Off-hours access
- Privilege probing
- Bulk record access
- Impossible-travel anomaly

Use synthetic data only.

==================================================
11. ACCESS RISK SCORING
==================================================

Create an Access Risk Score visualization from 0–100.

Risk levels:

0–29 = LOW
30–59 = MEDIUM
60–84 = HIGH
85–100 = CRITICAL

Show WHY the score was generated.

Example:

Risk Score: 72

Factors:
Unrecognized Device
Off-Hours Access
Multiple Authentication Failures

Recommended action:
“Step-up verification / SOC review”

IMPORTANT:
Never display the score as proof that an individual committed misconduct.

Use wording such as:

“Decision-support signal”
“Requires human investigation”

==================================================
12. SECURITY AUDIT / HASH LEDGER
==================================================

Add a dedicated Audit Integrity page.

Show chronological audit events.

Create a visual cryptographic chain:

Block #10421
↓
SHA-256
↓
Block #10422
↓
SHA-256
↓
Block #10423

Display:

✓ AUDIT CHAIN VALID

For each event show:
- Timestamp
- User/role
- Action
- Resource
- Unit scope
- Previous hash
- Current hash
- Verification status

Add a “Verify Integrity” action.

Do not claim that the ledger is blockchain unless blockchain is actually implemented.

Call it:
“Cryptographically Hash-Chained Audit Ledger”

==================================================
13. OFFLINE / DEGRADED MODE
==================================================

Make connectivity status highly visible throughout the application.

States:

🟢 NORMAL — ONLINE
🟡 DEGRADED — LIMITED CONNECTIVITY
🔴 OFFLINE — LOCAL MODE
⚫ MANUAL SOP

In offline mode show:

“Offline Mode Active”
“Last synchronized: 2 minutes ago”

Show:
- Locally available roster
- Queued transactions
- Pending synchronization
- Last successful sync

When connectivity returns:

QUEUED
→ SYNCING
→ VERIFIED
→ SYNCHRONIZED

Use simulated data for this prototype.

==================================================
14. SECURITY STATUS BAR
==================================================

Add a subtle global security/status area where appropriate.

Show:
- MFA Status
- Session Expiry
- Device Status
- Operational Scope
- Network Status

Example:

MFA ✓
DEVICE VERIFIED ✓
SCOPE: POST-17
SESSION: 12:42 REMAINING
ONLINE ✓

Do not expose sensitive tokens or cryptographic secrets.

==================================================
15. PERSONNEL PROFILE
==================================================

Improve personnel profiles.

Show only information permitted by the current role.

Include:
- Personnel ID
- Rank/Cadre
- Unit
- Assigned Post
- Current Duty
- Certifications
- Duty history
- Rest status
- Leave status
- Authorization scope

Separate operational information from security information.

==================================================
16. HUMAN-IN-COMMAND UX
==================================================

Every high-impact automated recommendation must have a human review step.

Use buttons such as:

“Review Recommendation”
“Approve”
“Reject”
“Assign”
“Confirm”
“Escalate”

Avoid wording such as:
“AI has decided”
“Automatically disciplined”
“Automatically suspended”

Instead use:
“System Recommendation”
“Risk Signal”
“Supervisor Review Required”

==================================================
17. DEMO / SYNTHETIC DATA
==================================================

The prototype must clearly indicate:

“DEMO / SYNTHETIC DATA”

Do NOT use real railway personnel information, real officer identities, real credentials, real incident data, or real operational locations.

Use fictional railway posts and fictional personnel.

==================================================
18. NAVIGATION STRUCTURE
==================================================

Organize the application approximately as:

COMMAND
- Operations Overview
- Live Map
- Incidents
- Alerts

PERSONNEL
- Personnel
- Duty & Rostering
- Leave Management

FIELD
- Secure Communications
- SOS
- Evidence Desk

SECURITY
- SOC Command Center
- Risk Scoring
- Security Events
- Audit Ledger

SYSTEM
- Connectivity
- Access Control
- System Settings

The exact navigation can be adapted to the existing design if a better structure already exists.

==================================================
19. RESPONSIVE DESIGN
==================================================

Desktop:
Optimized for command/supervisor/SOC users.

Mobile:
Optimized for field personnel.

Field mobile interface must prioritize:
1. Current Duty
2. SOS
3. Communications
4. Incident reporting
5. Evidence upload

Avoid overcrowding the mobile interface.

==================================================
20. FINAL DESIGN REQUIREMENT
==================================================

Do not add random features.

The goal is NOT to make RailForce look like a generic enterprise dashboard.

The goal is to make it visually communicate:

PERSONNEL
→ POSITION-AWARE AUTHORIZATION
→ DUTY
→ COMMUNICATION
→ EMERGENCY RESPONSE
→ EVIDENCE
→ SECURITY MONITORING
→ AUDIT

The final application should look credible as a serious railway security and operational decision-support platform while remaining clearly an academic/sandbox prototype using synthetic data.

Preserve existing working UI components and improve them rather than replacing everything.

Prioritize usability, security visibility, role separation, operational clarity, and realistic workflows over decorative design.