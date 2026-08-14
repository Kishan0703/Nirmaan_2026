"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, KeyRound, AlertCircle, User } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both admin username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed. Incorrect username or password.");
      }
    } catch (err) {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background Dots Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#18181b 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-md w-full mx-auto relative z-10 my-auto flex flex-col gap-6">
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 font-display text-xs uppercase font-black hover:bg-red transition-all shadow-[3px_3px_0px_0px_#18181b] active:translate-y-0.5 border-2 border-ink"
          >
            <ArrowLeft size={16} />
            <span>Return to Site</span>
          </Link>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl border-4 border-ink bg-white shadow-[8px_8px_0px_0px_#18181b] overflow-hidden p-6 sm:p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-4 border-b-4 border-ink pb-5">
            <div className="h-14 w-14 rounded-2xl bg-yellow border-3 border-ink flex items-center justify-center text-ink shadow-[3px_3px_0px_0px_#18181b] shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="font-display text-2xl uppercase font-black tracking-tight text-ink">
                Admin Control Panel
              </h1>
              <p className="text-xs font-bold text-ink/70">
                Nirmaan 2026 Management System
              </p>
            </div>
          </div>

          {/* Form Instructions */}
          <p className="text-xs font-bold text-ink/80 leading-relaxed bg-amber-50 p-3 rounded-xl border-2 border-ink/20">
            🔐 Enter master admin credentials to access live game parameters, event stats, leaderboard scores, and submissions.
          </p>

          {/* Alert Message */}
          {error && (
            <div className="rounded-xl border-2 border-red bg-red/10 p-3 text-red flex items-center gap-2 font-bold text-xs">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-display text-xs uppercase font-black text-ink flex items-center gap-1.5">
                <User size={14} />
                <span>Admin Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username..."
                  required
                  className="w-full bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none placeholder:text-ink/40 shadow-[4px_4px_0px_0px_#18181b] focus:bg-amber-50 transition-all pr-10"
                />
                <User className="absolute right-3 top-3.5 text-ink/40" size={18} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-display text-xs uppercase font-black text-ink flex items-center gap-1.5">
                <Lock size={14} />
                <span>Admin Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  required
                  className="w-full bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none placeholder:text-ink/40 shadow-[4px_4px_0px_0px_#18181b] focus:bg-amber-50 transition-all pr-10"
                />
                <KeyRound className="absolute right-3 top-3.5 text-ink/40" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 w-full rounded-2xl border-3 border-ink bg-blue text-white py-3.5 font-display text-sm uppercase font-black shadow-[4px_4px_0px_0px_#18181b] transition-all hover:bg-green active:translate-y-0.5 flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Authenticate Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Security Footer Note */}
          <div className="text-[11px] font-bold text-ink/60 text-center pt-2 border-t-2 border-ink/10">
            Protected endpoint. Session cookies are HTTP-only and encrypted.
          </div>
        </div>
      </div>
    </div>
  );
}
