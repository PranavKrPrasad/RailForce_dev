import { useState, useEffect } from "react";
import { SplashScreen, LoginScreen, MFAScreen, DeviceVerification, LoginSuccess } from "./screens/AuthFlow";
import { PersonnelApp } from "./screens/PersonnelApp";
import { SeniorMobileApp } from "./screens/SeniorMobileApp";
import { InspectorView } from "./screens/InspectorView";
import { SupervisorView } from "./screens/SupervisorView";
import { CommandView } from "./screens/CommandView";
import { AdminView } from "./screens/AdminView";
import { ROLES, type RoleType, CURRENT_USERS } from "./data/mock";
import { supabase } from "./lib/supabase";

type AppState = "splash" | "login" | "mfa" | "device" | "success" | "app";

const PHONE_ROLES: RoleType[] = [ROLES.PERSONNEL, ROLES.SUPERVISOR];
const DESKTOP_ROLES: RoleType[] = [ROLES.INSPECTOR, ROLES.COMMAND_OFFICER, ROLES.HIGHER_AUTHORITY, ROLES.ADMIN];

export default function App() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [selectedRole, setSelectedRole] = useState<RoleType>(ROLES.INSPECTOR);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const isPhoneRole = PHONE_ROLES.includes(selectedRole);

  const advance = (next: AppState) => setAppState(next);

  const handleRoleSwitch = (role: RoleType) => {
    setSelectedRole(role);
    setDemoMenuOpen(false);
    setAppState("splash");
  };

  const renderApp = () => {
    if (selectedRole === ROLES.SUPERVISOR) {
      return <SupervisorView />;
    }
    if (selectedRole === ROLES.INSPECTOR) {
      return <InspectorView />;
    }
    if (selectedRole === ROLES.COMMAND_OFFICER || selectedRole === ROLES.HIGHER_AUTHORITY) {
      return <CommandView role={selectedRole} />;
    }
    if (selectedRole === ROLES.ADMIN) {
      return <AdminView />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col">
      {/* Demo control bar */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">RF</span>
          </div>
          <span className="text-white font-display font-bold text-sm">RAILFORCE</span>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-slate-400 text-xs font-mono">ACADEMIC PROTOTYPE · FICTIONAL DEMONSTRATION ENVIRONMENT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-xs">Demo Role:</span>
          <div className="relative">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>
                {selectedRole === ROLES.PERSONNEL && "👤"}
                {selectedRole === ROLES.SUPERVISOR && "👥"}
                {selectedRole === ROLES.INSPECTOR && "🔍"}
                {selectedRole === ROLES.COMMAND_OFFICER && "🏢"}
                {selectedRole === ROLES.HIGHER_AUTHORITY && "⭐"}
                {selectedRole === ROLES.ADMIN && "⚙️"}
              </span>
              {selectedRole}
              <span className="text-blue-200">▾</span>
            </button>
            {demoMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 fade-in">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Switch Demo Role</p>
                </div>
                {Object.values(ROLES).map(role => {
                  const u = CURRENT_USERS[role];
                  const icons: Record<string, string> = {
                    [ROLES.PERSONNEL]: "👤", [ROLES.SUPERVISOR]: "👥",
                    [ROLES.INSPECTOR]: "🔍", [ROLES.COMMAND_OFFICER]: "🏢",
                    [ROLES.HIGHER_AUTHORITY]: "⭐", [ROLES.ADMIN]: "⚙️",
                  };
                  const isMobile = PHONE_ROLES.includes(role);
                  return (
                    <button
                      key={role}
                      onClick={() => handleRoleSwitch(role)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left ${selectedRole === role ? "bg-blue-50" : ""}`}
                    >
                      <span className="text-base flex-shrink-0">{icons[role]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{role}</p>
                        <p className="text-xs text-slate-400 truncate">{u?.name} · {u?.id}</p>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        {role === ROLES.SUPERVISOR && <span className="text-xs text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">Command Mobile</span>}
                        {role === ROLES.PERSONNEL && <span className="text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-semibold">Field Mobile</span>}
                        {selectedRole === role && <span className="text-blue-600 text-xs">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {appState === "app" && (
            <button
              onClick={() => setAppState("splash")}
              className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 px-2 py-1.5 rounded-lg transition-colors"
            >
              ← Restart Auth Flow
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        {appState === "splash" && (
          <FullScreen>
            <SplashScreen onContinue={() => advance("login")} />
          </FullScreen>
        )}

        {appState === "login" && (
          <FullScreen>
            <LoginScreen onLogin={() => advance("mfa")} />
          </FullScreen>
        )}

        {appState === "mfa" && (
          <FullScreen>
            <MFAScreen onVerify={() => advance("device")} />
          </FullScreen>
        )}

        {appState === "device" && (
          <FullScreen>
            <DeviceVerification onApprove={() => advance("success")} />
          </FullScreen>
        )}

        {appState === "success" && (
          <FullScreen>
            <LoginSuccess role={selectedRole} onComplete={() => advance("app")} />
          </FullScreen>
        )}

        {appState === "app" && (
          isPhoneRole ? (
            <PhoneFrame role={selectedRole}>
              {selectedRole === ROLES.SUPERVISOR ? <SeniorMobileApp /> : <PersonnelApp />}
            </PhoneFrame>
          ) : (
            <DesktopFrame>
              {renderApp()}
            </DesktopFrame>
          )
        )}
      </div>

      {/* Click outside to close demo menu */}
      {demoMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDemoMenuOpen(false)} />
      )}
    </div>
  );
}

// ─── Layout wrappers ─────────────────────────────────────────────────────────
function FullScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-6xl h-[calc(100vh-60px)] rounded-2xl overflow-hidden shadow-2xl border border-slate-300">
      {children}
    </div>
  );
}

function PhoneFrame({ children, role }: { children: React.ReactNode; role: string }) {
  const isCommand = role === ROLES.SUPERVISOR;
  return (
    <div className="flex items-center justify-center h-full">
      {/* Phone hardware */}
      <div className={`rounded-[3rem] p-3 shadow-2xl border-4 ${isCommand ? "bg-slate-900 border-blue-900" : "bg-slate-800 border-slate-700"}`}>
        {/* Screen */}
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden" style={{ width: 390, height: 760 }}>
          {/* Status bar */}
          <div className="bg-slate-900 flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
            <span className="text-white text-xs font-semibold font-mono">10:41</span>
            <div className="w-24 h-5 bg-slate-900 rounded-full" />
            <div className="flex items-center gap-1">
              <div className="text-white text-xs">▲</div>
              <span className="text-white text-xs">●●●●</span>
            </div>
          </div>
          {/* Phone content */}
          <div className="relative" style={{ height: 720 }}>
            {children}
          </div>
        </div>
      </div>
      {/* Helper text */}
      <div className="absolute bottom-4 text-xs text-slate-400 text-center">
        {isCommand ? "📲 Supervisor Command Mobile Application · Role: Supervisor" : "📱 Personnel Mobile Application · Role: Personnel"}
      </div>
    </div>
  );
}

function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1400px] h-[calc(100vh-80px)] rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white">
      {children}
    </div>
  );
}
