import { useState, useEffect } from "react";
import { Button } from "../components/ui";
import { supabase } from "../lib/supabase";

// ─── Splash Screen ────────────────────────────────────────────────────────────
export function SplashScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Glow */}
      <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 fade-in">
        {/* Logo mark */}
        <div className="w-20 h-20 bg-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
          <span className="text-white font-display font-black text-3xl">RF</span>
        </div>
        <h1 className="text-5xl font-black text-white font-display tracking-tight mb-2">RAILFORCE</h1>
        <p className="text-blue-400 text-lg font-medium font-display mb-1">Secure Personnel & Operational Coordination</p>
        <p className="text-slate-600 text-sm mb-10">Cybersecurity-First Integrated Platform</p>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-slate-800 rounded-full mb-10 overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: "70%" }} />
        </div>

        {/* Security indicators */}
        <div className="flex gap-4 mb-10">
          {["Zero-Trust", "E2E Encrypted", "RBAC Enabled"].map(t => (
            <div key={t} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {t}
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm tracking-wide"
        >
          Proceed to Secure Login →
        </button>

        <div className="mt-8 border border-slate-800 rounded-lg px-5 py-2.5">
          <p className="text-xs text-slate-600 font-mono">ACADEMIC PROTOTYPE · FICTIONAL DEMONSTRATION ENVIRONMENT</p>
          <p className="text-xs text-slate-700 text-center mt-0.5">Not an official government or railway application</p>
        </div>
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim()) {
      setError("Enter your registered email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw error;
      localStorage.setItem("railforce_otp_email", email.trim());
      onLogin();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-4 fade-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-display font-black text-xl">RF</span>
          </div>

          <h1 className="text-white font-display font-bold text-2xl">
            RAILFORCE
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Secure Sign In
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-2xl">

          <div className="bg-blue-900/40 border border-blue-800 rounded-lg px-3 py-2 mb-5 flex items-center gap-2">
            <span className="text-blue-400 text-sm">🔐</span>
            <p className="text-xs text-blue-300">
              A secure verification code will be sent to your registered email.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Personnel ID / Email
              </label>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-600 rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter registered email"
              />
            </div>

            {error && (
              <div className="bg-red-950/50 border border-red-800 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "📧 Send Verification OTP"}
            </button>
          </div>

          <div className="mt-5 border-t border-slate-700 pt-4 text-center">
            <p className="text-xs text-slate-600">
              Academic Prototype · Fictional Demonstration Environment
            </p>
            <p className="text-xs text-slate-700 mt-0.5">
              Not an official application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MFA Screen ───────────────────────────────────────────────────────────────
export function MFAScreen({ onVerify }: { onVerify: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("railforce_otp_email") || "";
    setEmail(savedEmail);

    if (!savedEmail) {
      setError("No login email found. Please return to login.");
    }
  }, []);

  const handleInput = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Enter the complete 6-digit OTP.");
      return;
    }

    if (!email) {
      setError("No email address found.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) throw error;

      onVerify();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid or expired OTP."
      );
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setResending(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw error;

      alert("A new verification code has been sent to your email.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="text-4xl mb-4">🔐</div>

          <h1 className="text-2xl font-bold text-white">
            Verify Your Email
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Enter the 6-digit verification code sent to
          </p>

          <p className="text-sm text-white font-medium mt-1">
            {email}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleInput(e.target.value, index)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !otp[index] &&
                    index > 0
                  ) {
                    document
                      .getElementById(`otp-${index - 1}`)
                      ?.focus();
                  }
                }}
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="w-11 h-14 text-center text-xl font-bold bg-black border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleVerify}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          RailForce · Email OTP Verification
        </p>
      </div>
    </div>
  );
}

// ─── Device Verification ──────────────────────────────────────────────────────
export function DeviceVerification({ onApprove }: { onApprove: () => void }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm fade-in">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-amber-900/40 border border-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🖥️</span>
          </div>
          <h2 className="text-white font-display font-bold text-2xl">Device Verification</h2>
          <p className="text-slate-400 text-sm mt-1">Confirm this is your authorized session</p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-3 mb-4">
          {[
            { label: "Device", value: "Station Alpha Terminal #04" },
            { label: "Browser", value: "Chrome 127 · Secure Mode" },
            { label: "Location", value: "Station Alpha, North Zone" },
            { label: "Login Time", value: "13 Aug 2026 · 10:41:32 IST" },
            { label: "IP Address", value: "192.168.10.44 (Internal Network)" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-slate-500 w-24 flex-shrink-0">{label}</span>
              <span className="text-white text-right font-medium">{value}</span>
            </div>
          ))}

          <div className="border-t border-slate-700 pt-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span>✓</span>
              <span>Network matches authorized subnet</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mt-1">
              <span>✓</span>
              <span>Device certificate valid</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm">
            🚫 Reject Session
          </button>
          <button
            onClick={onApprove}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
          >
            ✓ Approve
          </button>
        </div>

        <p className="text-center text-xs text-slate-600 mt-4 font-mono">Session ID: SES-20260813-10414492</p>
      </div>
    </div>
  );
}

// ─── Login Success ────────────────────────────────────────────────────────────
export function LoginSuccess({ role, onComplete }: { role: string; onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    "Identity Verified",
    "Role Identified",
    "Hierarchy Checked",
    "Command Scope Loaded",
    "Permissions Applied",
    "Environment Ready",
  ];

  const roleDetails: Record<string, { unit: string; scope: string }> = {
    "Personnel": { unit: "Unit Alpha", scope: "Self — Personal records only" },
    "Supervisor": { unit: "Unit Beta", scope: "Unit Beta Personnel (18 records)" },
    "Inspector": { unit: "Unit Alpha", scope: "Unit Alpha (48 Personnel)" },
    "Command Officer": { unit: "Division North", scope: "Division North — Units A, B, C, D" },
    "Higher Authority": { unit: "HQ", scope: "All Divisions (Read-Only, Authorized Scope)" },
    "System Administrator": { unit: "IT Security Division", scope: "System-Wide Technical Access" },
  };

  const detail = roleDetails[role] || roleDetails["Inspector"];

  useState(() => {
    const interval = setInterval(() => {
      setStep(s => {
        if (s >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
        }
        return s + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-900/40 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-white font-display font-bold text-2xl">Identity Verified</h2>
          <p className="text-slate-400 text-sm mt-1">Retrieving authorized environment...</p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 shadow-2xl mb-4">
          <div className="space-y-2">
            {steps.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 text-sm transition-all duration-300 ${i <= step ? "opacity-100" : "opacity-20"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${i <= step ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-500"}`}>
                  {i <= step ? "✓" : "○"}
                </span>
                <span className={i <= step ? "text-emerald-300" : "text-slate-500"}>{s}</span>
                {i === step && i < steps.length - 1 && (
                  <svg className="animate-spin h-3 w-3 text-emerald-400 ml-auto" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {step >= steps.length - 1 && (
            <div className="mt-4 border-t border-slate-700 pt-4 space-y-2 fade-in">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Role</span>
                <span className="text-blue-400 font-semibold">{role}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Unit</span>
                <span className="text-white font-medium">{detail.unit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Scope</span>
                <span className="text-white font-medium text-right max-w-[180px]">{detail.scope}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
