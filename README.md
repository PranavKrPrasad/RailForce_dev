# RailForce

> **Cybersecurity-First Integrated Personnel, Duty Management and
> Operational Coordination Platform for Railway Security Forces**

RailForce is designed as a secure, role-aware operational platform
combining personnel management, duty and roster management, incident
response, emergency SOS, secure communication, digital evidence
handling, auditability, security monitoring, analytics, and AI-assisted
operational planning.

> **Project status:** This repository contains the RailForce UI/UX
> foundation and Supabase integration work. The architecture and
> workflows below describe the intended final application. Production
> deployment requires completion of backend workflows, authorization/RLS
> validation, security testing, infrastructure hardening, monitoring,
> backup/recovery, and independent security assessment.

## Table of Contents

-   [Vision](#vision)
-   [Final Application Scope](#final-application-scope)
-   [Role and Access Model](#role-and-access-model)
-   [Application Flow](#application-flow)
-   [Authentication and Device
    Verification](#authentication-and-device-verification)
-   [Duty and Roster Flow](#duty-and-roster-flow)
-   [Incident Management Flow](#incident-management-flow)
-   [Emergency SOS Flow](#emergency-sos-flow)
-   [Evidence and Chain of Custody](#evidence-and-chain-of-custody)
-   [Secure Messaging](#secure-messaging)
-   [Leave and Availability](#leave-and-availability)
-   [Audit and Accountability](#audit-and-accountability)
-   [Zero Trust Authorization](#zero-trust-authorization)
-   [AI-Assisted Duty Recommendation](#ai-assisted-duty-recommendation)
-   [Offline Mode](#offline-mode)
-   [System Architecture](#system-architecture)
-   [Data Model](#data-model)
-   [Final Interface Structure](#final-interface-structure)
-   [Technology Stack](#technology-stack)
-   [Security Controls](#security-controls)
-   [Deployment Architecture](#deployment-architecture)
-   [Development Roadmap](#development-roadmap)
-   [Production Readiness Checklist](#production-readiness-checklist)

## Vision

RailForce provides a controlled operational layer for railway security
personnel and command structures.

Core design principles:

-   **Position-Aware Access Control (PAAC)**
-   **Role-Based Access Control (RBAC)**
-   **Attribute-Based Access Control (ABAC)**
-   **Zero Trust**
-   **Duty-scoped communication**
-   **Constraint-based duty planning**
-   **Emergency SOS workflows**
-   **Evidence integrity and chain of custody**
-   **Tamper-evident auditability**
-   **Controlled offline operation**
-   **Explainable AI assistance with human approval**

The platform should expose only information and actions required by a
user's role, unit, duty assignment, organizational scope, and
authorization.

## Final Application Scope

  -----------------------------------------------------------------------
  Module                              Purpose
  ----------------------------------- -----------------------------------
  Authentication                      Employee/User ID, password,
                                      OTP/MFA, sessions and device
                                      verification

  Personnel                           Personnel directory, profiles,
                                      rank, role, unit and availability

  Duty Management                     Duty posts, shifts, assignments,
                                      coverage and roster

  Leave                               Leave requests, approvals and
                                      manpower impact

  Incidents                           Reporting, classification,
                                      assignment, escalation and closure

  SOS                                 Emergency alerts, acknowledgement,
                                      response and closure

  Messaging                           Secure operational communication

  Evidence                            Upload, integrity verification and
                                      chain of custody

  Notifications                       Operational and security
                                      notifications

  Audit                               Tamper-evident activity history

  Zero Trust                          Context-aware authorization and
                                      session/device controls

  Security/SOC                        Sessions, devices, security events
                                      and permissions

  Reports                             Operational, manpower, incident and
                                      audit reporting

  Analytics                           Coverage, trends, manpower and
                                      response metrics

  AI Assistant                        Duty recommendations and
                                      explainable operational suggestions

  Offline Mode                        Controlled field operation during
                                      connectivity loss

  Administration                      Users, roles, permissions, units,
                                      devices and configuration
  -----------------------------------------------------------------------

## Role and Access Model

``` text
PERSONNEL
   |
SUPERVISOR
   |
INSPECTOR
   |
COMMAND OFFICER
   |
HIGHER AUTHORITY
   |
ADMIN
```

### Personnel

Personal profile, assigned duty, shifts, leave requests, incident
reporting, SOS, permitted messaging, evidence and notifications.

### Supervisor

Assigned personnel, duty coverage, leave review, duty coordination,
incidents and operational communication.

### Inspector

Unit-level personnel, duty/roster, incidents, reports, audit and
security visibility within authorized scope.

### Command Officer

Division-level operations, cross-unit coordination, major incidents,
manpower, coverage, analytics and reports.

### Higher Authority

Higher-level operational oversight, strategic analytics, major
incidents, manpower, coverage and reports.

### Admin

Identity/access administration, roles, permissions, units, devices,
sessions, security monitoring and system configuration.

> Exact permissions must be enforced server-side/database-side. Hiding a
> UI button is not authorization.

## Application Flow

``` mermaid
flowchart TD
    A[Open RailForce] --> B[Authentication]
    B --> C{Credentials Valid?}
    C -- No --> B
    C -- Yes --> D[OTP / MFA]
    D --> E{OTP Valid?}
    E -- No --> D
    E -- Yes --> F[Device Verification]
    F --> G{Device Authorized?}
    G -- No --> H[Pending Device Approval]
    H --> I{Approved?}
    I -- No --> H
    I -- Yes --> J[Secure Session]
    G -- Yes --> J
    J --> K[Load Profile]
    K --> L[Resolve Role + Unit + Scope]
    L --> M[Server-Side Authorization]
    M --> N[Role Dashboard]
    N --> O[Operational Modules]
```

## Authentication and Device Verification

``` mermaid
sequenceDiagram
    participant U as User
    participant A as RailForce App
    participant S as Supabase Auth
    participant P as Profiles
    participant D as Device Registry

    U->>A: Employee ID + Password
    A->>S: Authenticate
    S-->>A: Session
    A->>S: OTP/MFA challenge
    S-->>U: OTP
    U->>A: OTP
    A->>S: Verify OTP
    S-->>A: MFA verified
    A->>D: Check device
    D-->>A: Approved / Pending / Revoked
    alt Approved
        A->>P: Load authorized profile
        P-->>A: Role + Rank + Unit
        A-->>U: Authorized dashboard
    else Pending
        A-->>U: Device approval required
    else Revoked
        A-->>U: Access denied
    end
```

The final implementation should use a cryptographically random
application-generated device identifier rather than unreliable browser
hardware fingerprinting.

## Duty and Roster Flow

``` mermaid
flowchart TD
    A[Manpower Requirements] --> B[Available Personnel]
    B --> C[Leave / Training / Restrictions]
    C --> D[Duty Posts]
    D --> E[Shift Requirements]
    E --> F[Constraint-Based Planner]
    F --> G[AI Recommendation]
    G --> H{Human Approval}
    H -- Reject --> F
    H -- Approve --> I[Publish Roster]
    I --> J[Notify Personnel]
    J --> K[Duty Execution]
    K --> L[Coverage Analytics]
```

Relevant constraints can include availability, rank/role, post
requirements, shift timing, unit scope, leave/training, assignment
limits, manpower requirements and existing assignments.

AI recommendations remain subject to authorized human approval.

## Incident Management Flow

``` mermaid
flowchart TD
    A[Incident Detected] --> B[Create Incident]
    B --> C[Classify]
    C --> D[Capture Time / Location / Details]
    D --> E[Attach Evidence]
    E --> F[Calculate Hash]
    F --> G[Assign Authority]
    G --> H{Escalation Required?}
    H -- No --> I[Unit Handling]
    H -- Yes --> J[Command Escalation]
    I --> K[Investigation / Action]
    J --> K
    K --> L[Status Updates]
    L --> M[Resolution]
    M --> N[Closure Review]
    N --> O[Audit Trail]
```

Suggested lifecycle:

``` text
OPEN -> ACKNOWLEDGED -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED
                         |
                         +-> ESCALATED when required
```

## Emergency SOS Flow

``` mermaid
flowchart TD
    A[Personnel Triggers SOS] --> B[Create Emergency Event]
    B --> C[Record User + Time + Context]
    C --> D[Notify Authorized Responders]
    D --> E[Notify Appropriate Command]
    E --> F[Responder Acknowledgement]
    F --> G{Response Active?}
    G -- Yes --> H[Coordinate Response]
    H --> I[Update Status]
    I --> G
    G -- No --> J[Close Emergency]
    J --> K[Audit Record]
```

The final implementation should define recipient rules, escalation
timeouts, acknowledgement, false-alarm handling, incident conversion,
evidence attachment, retention and offline behavior.

## Evidence and Chain of Custody

``` mermaid
flowchart TD
    A[Capture Evidence] --> B[Evidence ID]
    B --> C[Metadata]
    C --> D[SHA-256 Hash]
    D --> E[Encrypt Evidence]
    E --> F[Secure Storage]
    F --> G[Chain-of-Custody Event]
    G --> H[Authorized Access]
    H --> I[Integrity Verification]
    I --> J{Hash Matches?}
    J -- Yes --> K[Integrity Confirmed]
    J -- No --> L[Integrity Alert]
    K --> M[Audit]
    L --> M
```

Evidence metadata should include evidence ID, incident ID, uploader,
timestamp, filename, MIME type, size, cryptographic hash, storage
reference and access/chain-of-custody history.

**SHA-256 provides integrity verification; it is not encryption.**

## Secure Messaging

``` mermaid
flowchart LR
    A[Sender] --> B[Authorization Check]
    B --> C[Conversation Scope]
    C --> D[Create Message]
    D --> E[TLS Transport]
    E --> F[Secure Backend]
    F --> G[Recipient Authorization]
    G --> H[Recipient]
    F --> I[Audit / Security Events]
```

Supported scopes can include personnel-supervisor, unit, duty, incident
and command communication.

## Leave and Availability

``` mermaid
flowchart TD
    A[Personnel Requests Leave] --> B[Validate]
    B --> C[Check Existing Duties]
    C --> D[Calculate Manpower Impact]
    D --> E[Supervisor Review]
    E --> F{Decision}
    F -- Reject --> G[Notify Personnel]
    F -- Approve --> H[Update Availability]
    H --> I[Update Duty Coverage]
    I --> J[Notify Affected Users]
    J --> K[Audit]
```

## Audit and Accountability

``` mermaid
flowchart TD
    A[User / System Action] --> B[Authorization]
    B --> C[Perform Action]
    C --> D[Audit Event]
    D --> E[Actor + Action + Resource]
    E --> F[Timestamp + Context]
    F --> G[Tamper-Evident Storage]
    G --> H[Security / Compliance Review]
```

Important events include authentication, MFA, devices, permissions, user
lifecycle, duties, incidents, evidence, SOS, administrative changes and
security events.

## Zero Trust Authorization

``` mermaid
flowchart TD
    A[Request] --> B[Authenticate Identity]
    B --> C[Verify Session]
    C --> D[Verify Device]
    D --> E[Resolve Role]
    E --> F[Resolve Unit / Scope]
    F --> G[Resolve Resource]
    G --> H[Evaluate RBAC / ABAC / PAAC]
    H --> I{Authorized?}
    I -- No --> J[Deny + Security Event]
    I -- Yes --> K[Minimum Required Access]
    K --> L[Audit Sensitive Action]
```

## AI-Assisted Duty Recommendation

``` mermaid
flowchart TD
    A[Operational Data] --> B[Validate Data]
    B --> C[Personnel Availability]
    B --> D[Duty Requirements]
    B --> E[Coverage Requirements]
    B --> F[Restrictions]
    C --> G[Recommendation Engine]
    D --> G
    E --> G
    F --> G
    G --> H[Candidate Plan]
    H --> I[Explain Recommendation]
    I --> J[Human Review]
    J --> K{Approve?}
    K -- No --> L[Modify / Regenerate]
    L --> G
    K -- Yes --> M[Publish Plan]
    M --> N[Notify Personnel]
```

AI should assist authorized decision-makers rather than independently
making high-impact operational decisions.

## Offline Mode

``` mermaid
flowchart TD
    A[Network Available?] -->|Yes| B[Normal Operation]
    A -->|No| C[Controlled Offline Mode]
    C --> D[Cached Authorized Data]
    D --> E[Queue Permitted Actions]
    E --> F[Encrypt Local Sensitive Data]
    F --> G[Network Restored]
    G --> H[Secure Synchronization]
    H --> I[Server Validation]
    I --> J{Accepted?}
    J -- Yes --> K[Commit + Audit]
    J -- No --> L[Conflict / Security Review]
```

Offline mode must be deliberately limited. Operations requiring
authoritative server state may remain unavailable until connectivity
returns.

## System Architecture

``` mermaid
flowchart LR
    subgraph Client
        WEB[Web Dashboard]
        MOBILE1[Junior / Field Interface]
        MOBILE2[Senior / Supervisor Interface]
    end

    subgraph Security
        AUTH[Authentication + MFA]
        DEVICE[Device Verification]
        POLICY[RBAC + ABAC + PAAC]
    end

    subgraph Backend
        API[Application Services]
        DB[(PostgreSQL)]
        STORAGE[Evidence Storage]
        REALTIME[Realtime]
        AUDIT[Audit Service]
    end

    subgraph Intelligence
        AI[AI Recommendation Engine]
        ANALYTICS[Analytics]
    end

    WEB --> AUTH
    MOBILE1 --> AUTH
    MOBILE2 --> AUTH
    AUTH --> DEVICE
    DEVICE --> POLICY
    POLICY --> API
    API --> DB
    API --> STORAGE
    API --> REALTIME
    API --> AUDIT
    DB --> ANALYTICS
    DB --> AI
```

## Data Model

``` mermaid
erDiagram
    AUTH_USERS ||--|| PROFILES : has
    PROFILES }o--|| UNITS : belongs_to
    PROFILES ||--o{ DUTIES : assigned
    PROFILES ||--o{ INCIDENTS : reports
    PROFILES ||--o{ SOS_EVENTS : triggers
    PROFILES ||--o{ MESSAGES : sends
    PROFILES ||--o{ NOTIFICATIONS : receives
    PROFILES ||--o{ AUDIT_LOGS : performs
    INCIDENTS ||--o{ EVIDENCE : contains
    PROFILES ||--o{ DEVICES : owns

    PROFILES {
        uuid id PK
        text employee_id
        text full_name
        text role
        text rank
        text unit
        boolean active
    }

    UNITS {
        uuid id PK
        text name
        text code
        boolean active
    }

    DUTIES {
        uuid id PK
        uuid personnel_id FK
        text post
        text shift
        timestamptz start_time
        timestamptz end_time
        text status
    }

    INCIDENTS {
        uuid id PK
        uuid reporter_id FK
        text title
        text severity
        text status
        text description
        timestamptz created_at
    }

    SOS_EVENTS {
        uuid id PK
        uuid user_id FK
        text status
        text location
        timestamptz created_at
    }

    EVIDENCE {
        uuid id PK
        uuid incident_id FK
        text file_name
        text sha256
        text storage_path
        timestamptz created_at
    }

    MESSAGES {
        uuid id PK
        uuid sender_id FK
        uuid recipient_id FK
        text content
        timestamptz created_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        text type
        text title
        boolean read
        timestamptz created_at
    }

    AUDIT_LOGS {
        uuid id PK
        uuid actor_id FK
        text action
        text resource_type
        uuid resource_id
        timestamptz created_at
    }

    DEVICES {
        uuid id PK
        uuid user_id FK
        text device_identifier
        text status
        timestamptz first_seen
        timestamptz last_seen
    }
```

> The repository's actual migrations/schema are authoritative for exact
> columns and relationships.

## Final Interface Structure

### Junior / Field Mobile

Home, My Duty, Shift, Incident Report, SOS, Messages, Evidence,
Notifications, Profile and Offline Status.

### Senior / Supervisor Mobile

Operational Overview, Personnel, Duty/Roster, Leave, Incidents, SOS,
Messages, Evidence, Notifications and Reports.

### Inspector Dashboard

Unit Dashboard, Personnel, Duty Coverage, Roster, Incidents, Emergency
Events, Messages, Reports, Audit and Zero Trust/Security.

### Command Dashboard

Division Overview, Unit Status, Manpower, Duty Coverage, Major
Incidents, Emergency Events, Analytics, Reports and Command
Communication.

### Higher Authority Dashboard

Regional/organization overview, strategic analytics, major incidents,
manpower, coverage, reports and security overview.

### Admin Dashboard

Users, Roles, Permissions, Units, Devices, Sessions, Security Events,
Audit Logs and System Configuration.

## Technology Stack

-   React
-   TypeScript
-   Vite
-   Tailwind CSS / UI components
-   Supabase
-   PostgreSQL
-   Supabase Authentication
-   Realtime services
-   Secure object storage for evidence
-   AI service layer for assisted recommendations

## Security Controls

### Identity

-   Employee/User ID
-   Strong passwords
-   MFA/OTP
-   Secure sessions
-   Device approval/revocation
-   Account activation/deactivation

### Authorization

-   RBAC
-   ABAC
-   PAAC
-   RLS
-   Resource-level authorization
-   Least privilege

### Data Protection

-   HTTPS/TLS
-   Encryption at rest
-   AES-256-GCM where application-level encryption is required
-   Secure secret management
-   Evidence hashes
-   Controlled file storage

### Application Security

-   Input validation
-   XSS protection
-   CSRF protections where applicable
-   Secure headers
-   Rate limiting
-   Brute-force protection
-   Secure error handling
-   Dependency scanning
-   SAST/DAST
-   OWASP testing

### Monitoring and Resilience

-   Audit logs
-   Authentication monitoring
-   Device events
-   Permission-change monitoring
-   Security alerts
-   Backups
-   Recovery procedures
-   Disaster recovery
-   Offline synchronization controls

### Cryptography Readiness

The architecture should remain post-quantum-cryptography ready where
practical. PQC is separate from ordinary encryption and hashing and
should be introduced according to production standards and
infrastructure requirements.

## Deployment Architecture

``` mermaid
flowchart TB
    USER[Authorized User] --> CDN[Secure Web Delivery]
    CDN --> APP[RailForce Application]
    APP --> AUTH[Supabase Auth]
    APP --> API[Application Data Layer]
    API --> DB[(PostgreSQL)]
    API --> STORAGE[Evidence Storage]
    API --> REALTIME[Realtime]
    API --> AUDIT[Audit Logs]
    API --> AI[AI Services]
    MON[Monitoring] --> APP
    MON --> API
    MON --> DB
```

Production should use HTTPS, environment-specific secrets, restricted
database access, backups, monitoring, CI/CD, security scanning and
separate staging/production environments.

## Development Roadmap

### Phase 1 --- Foundation

UI/UX, project structure, Supabase, database schema, authentication,
profiles and test environment.

### Phase 2 --- Real Data

Replace mock personnel, units, duties, incidents, notifications,
messages and audit records with real backend operations.

### Phase 3 --- Authorization

RLS, role policies, unit policies, resource authorization, device
authorization and session controls.

### Phase 4 --- Operational Workflows

Duty, leave, incident, SOS, messaging, evidence and chain of custody.

### Phase 5 --- Security

Security dashboard, devices, sessions, security events, audit hardening,
file security and testing.

### Phase 6 --- Intelligence

Coverage analytics, AI-assisted duty recommendations, explainability and
human approval.

### Phase 7 --- Resilience

Offline mode, secure queues, synchronization and conflict handling.

### Phase 8 --- Production

Staging, production deployment, monitoring, CI/CD, penetration testing,
security review and operational acceptance.

## Production Readiness Checklist

### Authentication

-   [ ] Employee/User ID login
-   [ ] Strong password policy
-   [ ] OTP/MFA
-   [ ] Session timeout
-   [ ] Rate limiting / brute-force protection
-   [ ] Device verification
-   [ ] Device revocation

### Authorization

-   [ ] RBAC
-   [ ] ABAC
-   [ ] PAAC
-   [ ] RLS policies
-   [ ] Resource-level authorization
-   [ ] Least privilege validation
-   [ ] Admin access protection

### Operations

-   [ ] Personnel
-   [ ] Units
-   [ ] Duties
-   [ ] Roster
-   [ ] Leave
-   [ ] Incidents
-   [ ] SOS
-   [ ] Messaging
-   [ ] Notifications
-   [ ] Evidence
-   [ ] Reports
-   [ ] Audit

### Security

-   [ ] HTTPS
-   [ ] Secure headers
-   [ ] Secret management
-   [ ] File upload controls
-   [ ] Dependency scanning
-   [ ] SAST
-   [ ] DAST
-   [ ] Penetration testing
-   [ ] Security monitoring

### Reliability

-   [ ] Backups
-   [ ] Restore test
-   [ ] Monitoring
-   [ ] Error tracking
-   [ ] Offline behavior
-   [ ] Synchronization
-   [ ] Disaster recovery plan

### AI

-   [ ] Explainable recommendations
-   [ ] Human approval
-   [ ] No autonomous high-impact decisions
-   [ ] Input validation
-   [ ] AI logging
-   [ ] Recommendation audit trail

## Important Security Notes

RailForce is intended for a security-sensitive operational environment.
UI restrictions must never be treated as the primary security boundary.

Production security should use authenticated identities, server-side
authorization, database policies, secure storage rules, trusted backend
operations and comprehensive auditing.

**Never place Supabase secret/service-role keys in frontend code or
`VITE_*` environment variables.**

Development/test accounts and synthetic data must remain separated from
production personnel data.

No software system should be described as "100% secure." Production
readiness requires continuous monitoring, patching, security testing,
incident response, backup/recovery validation and periodic independent
assessment.

## Repository

**RailForce_dev**

The repository contains the evolving RailForce application and
supporting development configuration.

## License

Licensing and distribution terms should be defined before public or
third-party distribution.

## Disclaimer

RailForce is a software prototype/development project intended to
demonstrate a cybersecurity-first operational platform architecture. Any
real-world deployment in railway security or other critical
infrastructure must undergo organizational approval, legal/compliance
review, infrastructure security review, privacy assessment, penetration
testing, operational acceptance testing and appropriate independent
security assessment.
