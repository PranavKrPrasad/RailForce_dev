Update the existing RailForce project.

IMPORTANT:
Do NOT rebuild or delete the existing Junior/Field mobile application.
Do NOT use mock data, fake authentication, hardcoded credentials, or placeholder security.
Do NOT break the existing authentication, API, database, or role system.
Use the existing architecture and database wherever possible.

FIGMA UI REFERENCE:
https://railforce.figma.site

Use this Figma project as the visual and UX reference for RailForce. Recreate the relevant design language, layouts, colors, typography, cards, navigation, spacing, icons, and overall professional appearance. Do not simply embed the Figma website.

==================================================
1. CREATE A SEPARATE SENIOR MOBILE APPLICATION
==================================================

Create a dedicated mobile experience for Senior/Supervisor personnel.

The existing Junior/Field mobile app must remain available.

The application should determine the authenticated user's role from the backend and open the correct mobile experience.

Roles:

JUNIOR / FIELD:
- Existing Junior mobile interface
- My Dashboard
- My Duty
- SOS
- Report Incident
- Messages
- Notifications
- Profile

SENIOR / SUPERVISOR:
Create a completely separate Senior mobile interface with:

1. Command Dashboard
2. Personnel
3. Duty Management
4. Live SOS
5. Incident Management
6. Secure Messages
7. Notifications
8. Reports
9. Analytics
10. Profile
11. Security / Audit access where permitted

Do not merely change the labels of the Junior interface.
The Senior interface must have a command/supervisory workflow and different information architecture.

==================================================
2. SENIOR COMMAND DASHBOARD
==================================================

Create a professional operational dashboard showing real backend data.

Include:

- Total active personnel
- Personnel currently on duty
- Personnel off duty
- Active incidents
- Open incidents
- Active SOS/emergency alerts
- Pending reports
- Recent operational activity
- Duty/shift overview
- Important security alerts

Use clear cards, charts and lists.

Do not generate fake numbers.
If the database has no records, display an appropriate empty state such as:
"No active incidents"
"No personnel assigned"
instead of invented data.

==================================================
3. PERSONNEL MANAGEMENT
==================================================

Senior users should be able to view personnel they are authorized to access.

Include:

- Personnel list
- Search
- Filters
- Personnel profile
- Rank/role
- Status
- Current duty
- Assigned location/unit
- Contact/action options where authorized
- Duty history where authorized

Enforce authorization on the backend.

Never rely only on hiding buttons in the UI.

==================================================
4. DUTY MANAGEMENT
==================================================

Create Senior duty-management functionality.

Include:

- Current roster
- Create duty assignment
- Assign personnel
- Shift management
- Duty status
- Location/unit
- Start/end time
- Conflict detection
- Personnel availability
- Duty history

All modifications must go through authenticated backend APIs.

==================================================
5. LIVE SOS
==================================================

Create a Senior emergency monitoring screen.

Show:

- Active SOS alerts
- Personnel who triggered SOS
- Time
- Location if available and authorized
- Status
- Acknowledge
- Escalate
- Resolve

Create a clear emergency UI but do not use unnecessary flashy animations.

Every SOS action must generate an audit event.

==================================================
6. INCIDENT MANAGEMENT
==================================================

Senior users should be able to:

- View incidents
- Search/filter incidents
- Open incident details
- Change authorized status
- Assign personnel
- Add authorized notes
- View evidence
- View incident timeline
- Escalate incidents
- Close incidents when authorized

Implement proper authorization checks.

==================================================
7. DIGITAL EVIDENCE
==================================================

Integrate evidence handling with the existing backend architecture.

Evidence should support:

- Evidence ID
- Incident association
- Original filename
- MIME type
- Size
- Timestamp
- Uploader
- SHA-256 integrity hash
- Secure storage reference
- Chain-of-custody events

Do not expose sensitive files to unauthorized users.

Do not describe SHA-256 as encryption.

Sensitive evidence must be protected using appropriate encryption and access controls.

==================================================
8. SECURE MESSAGING
==================================================

Create a Senior messaging interface.

Include:

- Conversations
- Authorized personnel
- Message history
- Send message
- Read/unread state
- Notifications

Use the existing authentication/session architecture.

Do not store credentials or secrets in the mobile application.

==================================================
9. REPORTS AND ANALYTICS
==================================================

Create Senior reports and analytics screens.

Use actual database data.

Include useful operational statistics such as:

- Incidents by status
- Incident trends
- Duty statistics
- SOS statistics
- Personnel activity
- Response times where data exists

If insufficient data exists, show an empty state rather than fabricated statistics.

==================================================
10. SECURITY
==================================================

Preserve and strengthen the existing security architecture.

Requirements:

- Backend-enforced RBAC
- Resource-level authorization
- Least privilege
- Secure authentication
- Secure session handling
- Secure token storage
- Input validation
- Rate limiting
- Secure API communication
- HTTPS in production
- Audit logging
- Secure error handling
- Security headers where applicable
- No secrets in source code
- No hardcoded credentials
- Secure file upload validation
- Proper logout/session invalidation

A Senior account must NOT automatically receive Admin privileges.

Use the existing role/access-control tables.

==================================================
11. DATABASE AND API
==================================================

Inspect the existing database schema and APIs before making changes.

Reuse existing tables and endpoints where appropriate.

Only create migrations when required.

Do not delete existing production data.

Add proper relationships for:

- users/personnel
- roles
- duties
- incidents
- SOS
- messages
- evidence
- audit logs
- notifications

All important operations must happen through the backend.

==================================================
12. MOBILE UX
==================================================

Make the Senior application feel like a real operational command application.

Use:

- Professional dark RailForce design
- Clear hierarchy
- Large readable information
- Touch-friendly controls
- Bottom navigation where appropriate
- Command dashboard cards
- Status indicators
- Empty/loading/error states
- Confirmation dialogs for destructive actions
- Accessible typography
- Consistent icons

Follow the Figma reference:
https://railforce.figma.site

Do not copy branding or assets that are not available for use. Recreate the interface using the application's own components.

==================================================
13. EXISTING APPLICATION
==================================================

Before making changes:

1. Inspect the current project structure.
2. Identify the existing authentication system.
3. Identify the existing database.
4. Identify existing Junior/Field navigation.
5. Identify existing Senior/Supervisor role support.
6. Reuse existing components and APIs where safe.

Then implement the Senior mobile experience without breaking the existing application.

==================================================
14. TESTING
==================================================

After implementation:

- Run TypeScript checks
- Run linting
- Run the production build
- Test authentication
- Test Junior role access
- Test Senior role access
- Test unauthorized access
- Test logout
- Test API authorization
- Test mobile navigation
- Test empty database states
- Test error states

Fix all errors you find.

Do not claim a feature works unless you actually verify it.

==================================================
15. IMPORTANT
==================================================

Do not create fake/demo backend data just to make the dashboard look populated.

Do not remove working features.

Do not replace the existing authentication system without a strong technical reason.

Do not expose Admin/SOC functionality to Senior/Supervisor users unless explicitly authorized by the backend role system.

Keep the code modular and production-ready.

At the end, give me a concise summary of:
- What was changed
- What database migrations were added
- What APIs were added/changed
- What Senior screens were created
- What tests passed
- Any remaining issues