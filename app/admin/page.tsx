"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LogOut,
  Gamepad2,
  BarChart3,
  Trophy,
  FolderGit2,
  Save,
  Trash2,
  Edit2,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  X,
} from "lucide-react";
import type { GameConfig } from "@/lib/game-config";

type LeaderboardItem = {
  id: string;
  name: string;
  score: number;
  date: string;
};

type ProjectSubmission = {
  id: string;
  team: string;
  track: string;
  status: string;
  score: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "game" | "stats" | "leaderboard" | "submissions">("overview");

  // Notifications state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({ open: false, title: "", message: "", action: () => {} });

  // Data Loading states
  const [loading, setLoading] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);

  // Config Form State
  const [config, setConfig] = useState<GameConfig>({
    gameDuration: 30,
    pointsPerBug: 10,
    spawnIntervalMs: 700,
    bugLifetimeMs: 2000,
    prizePoolTotal: "₹8L",
    buildDurationHours: "24 hrs",
    builderCapacity: "420",
    mentorsCount: "18+",
    registrationsCount: "1,240+",
    teamsFormedCount: "310+",
    submissionsCount: "85 drafts",
    judgesAssignedCount: "24",
  });

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [newScoreName, setNewScoreName] = useState("");
  const [newScoreVal, setNewScoreVal] = useState("");
  const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
  const [editScoreName, setEditScoreName] = useState("");
  const [editScoreVal, setEditScoreVal] = useState("");

  // Submissions State
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submissionForm, setSubmissionForm] = useState<{
    id?: string;
    team: string;
    track: string;
    status: string;
    score: string;
  }>({ team: "", track: "Embedded Systems", status: "Prototype live", score: "85" });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch initial data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Game Config
      const configRes = await fetch("/api/game-settings");
      if (configRes.ok) {
        const configData = await configRes.json();
        if (configData.config) setConfig(configData.config);
      }

      // 2. Fetch Leaderboard
      const lbRes = await fetch("/api/leaderboard");
      if (lbRes.ok) {
        const lbData = await lbRes.json();
        if (lbData.leaderboard) setLeaderboard(lbData.leaderboard);
      }

      // 3. Fetch Submissions
      const subRes = await fetch("/api/submissions");
      if (subRes.ok) {
        const subData = await subRes.json();
        if (subData.submissions) setSubmissions(subData.submissions);
      }
    } catch (err) {
      showToast("Error connecting to server database.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await fetch("/api/admin/me");
        if (!meRes.ok) {
          router.replace("/admin/login");
          return;
        }
      } catch {
        router.replace("/admin/login");
        return;
      }
      loadDashboardData();
    };
    init();
  }, []);

  // Admin Logout Handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      router.push("/admin/login");
    }
  };

  // Save Game Parameters & Numerical Stats
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      const res = await fetch("/api/admin/game-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.config) setConfig(data.config);
        showToast("Game settings and numerical stats updated live!");
      } else {
        showToast(data.error || "Failed to update configuration.", "error");
      }
    } catch (err) {
      showToast("Network error saving game configuration.", "error");
    } finally {
      setSavingConfig(false);
    }
  };

  // ── LEADERBOARD ACTIONS ──

  const handleAddLeaderboardScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScoreName.trim() || !newScoreVal.trim()) return;

    try {
      const res = await fetch("/api/admin/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newScoreName.trim(),
          score: Number.parseInt(newScoreVal, 10) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Leaderboard score entry added!");
        setNewScoreName("");
        setNewScoreVal("");
        loadDashboardData();
      } else {
        showToast(data.error || "Failed to add score.", "error");
      }
    } catch (err) {
      showToast("Error adding score entry.", "error");
    }
  };

  const handleUpdateLeaderboardScore = async (id: string) => {
    try {
      const res = await fetch("/api/admin/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: editScoreName.trim(),
          score: Number.parseInt(editScoreVal, 10) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Leaderboard score entry updated!");
        setEditingScoreId(null);
        loadDashboardData();
      } else {
        showToast(data.error || "Failed to update score.", "error");
      }
    } catch (err) {
      showToast("Error updating score.", "error");
    }
  };

  const handleDeleteLeaderboardEntry = (id: string, name: string) => {
    setConfirmModal({
      open: true,
      title: "Delete Score Entry",
      message: `Are you sure you want to delete leaderboard score entry for "${name}"?`,
      action: async () => {
        setConfirmModal((prev) => ({ ...prev, open: false }));
        try {
          const res = await fetch(`/api/admin/leaderboard?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok && data.success) {
            showToast("Leaderboard entry deleted.");
            loadDashboardData();
          } else {
            showToast(data.error || "Failed to delete entry.", "error");
          }
        } catch (err) {
          showToast("Error deleting entry.", "error");
        }
      },
    });
  };

  const handleClearAllLeaderboard = () => {
    setConfirmModal({
      open: true,
      title: "Clear Entire Leaderboard",
      message: "WARNING: This will permanently delete ALL global leaderboard scores stored in the database! Are you absolutely sure?",
      action: async () => {
        setConfirmModal((prev) => ({ ...prev, open: false }));
        try {
          const res = await fetch("/api/admin/leaderboard?id=all", { method: "DELETE" });
          const data = await res.json();
          if (res.ok && data.success) {
            showToast("Global leaderboard cleared.");
            loadDashboardData();
          } else {
            showToast(data.error || "Failed to clear leaderboard.", "error");
          }
        } catch (err) {
          showToast("Error clearing leaderboard.", "error");
        }
      },
    });
  };

  // ── SUBMISSIONS ACTIONS ──

  const handleSaveSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Project submission saved!");
        setSubmissionModalOpen(false);
        setSubmissionForm({ team: "", track: "Embedded Systems", status: "Prototype live", score: "85" });
        if (data.submissions) setSubmissions(data.submissions);
      } else {
        showToast(data.error || "Failed to save submission.", "error");
      }
    } catch (err) {
      showToast("Error saving project submission.", "error");
    }
  };

  const handleDeleteSubmission = (id: string, team: string) => {
    setConfirmModal({
      open: true,
      title: "Delete Project Submission",
      message: `Are you sure you want to delete project submission for "${team}"?`,
      action: async () => {
        setConfirmModal((prev) => ({ ...prev, open: false }));
        try {
          const res = await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok && data.success) {
            showToast("Project submission deleted.");
            if (data.submissions) setSubmissions(data.submissions);
          } else {
            showToast(data.error || "Failed to delete submission.", "error");
          }
        } catch (err) {
          showToast("Error deleting submission.", "error");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col justify-between p-3 sm:p-6 relative overflow-x-hidden">
      {/* Background Dots Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#18181b 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Toast Notification Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 rounded-2xl border-3 border-ink p-4 text-xs font-black uppercase flex items-center gap-3 shadow-[5px_5px_0px_0px_#18181b] animate-bounce ${
            toast.type === "success" ? "bg-green text-white" : "bg-red text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border-4 border-ink p-6 shadow-[8px_8px_0px_0px_#18181b] flex flex-col gap-4 text-ink">
            <h3 className="font-display text-xl uppercase font-black text-red">{confirmModal.title}</h3>
            <p className="font-sans text-xs font-bold leading-relaxed">{confirmModal.message}</p>
            <div className="flex items-center justify-end gap-3 pt-2 border-t-2 border-ink/10">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, open: false }))}
                className="px-4 py-2 rounded-xl border-2 border-ink font-display text-xs uppercase font-black hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.action}
                className="px-5 py-2 rounded-xl border-2 border-ink bg-red text-white font-display text-xs uppercase font-black shadow-[3px_3px_0px_0px_#18181b] active:translate-y-0.5"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl w-full mx-auto relative z-10 my-auto flex flex-col gap-6">
        {/* Top Navbar */}
        <header className="rounded-3xl border-4 border-ink bg-yellow p-4 sm:p-5 shadow-[8px_8px_0px_0px_#18181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-ink text-white flex items-center justify-center font-display text-xl font-black shrink-0 border-2 border-ink">
              <ShieldCheck size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl uppercase font-black text-ink">
                  NIRMAAN ADMIN PANEL
                </h1>
                <span className="rounded-full bg-green text-white px-2.5 py-0.5 font-display text-[10px] uppercase font-black border border-ink">
                  AUTHENTICATED
                </span>
              </div>
              <p className="font-sans text-xs font-bold text-ink/80">
                Live Game Controls & Event Numerical Statistics Management
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-2xl border-3 border-ink bg-white px-3.5 py-2 font-display text-xs uppercase font-black hover:bg-amber-100 transition-all shadow-[3px_3px_0px_0px_#18181b] active:translate-y-0.5"
            >
              <span>View Main Site</span>
              <ExternalLink size={14} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-2xl border-3 border-ink bg-red text-white px-3.5 py-2 font-display text-xs uppercase font-black hover:bg-red-light transition-all shadow-[3px_3px_0px_0px_#18181b] active:translate-y-0.5"
            >
              <span>Logout</span>
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-2xl border-3 border-ink font-display text-xs uppercase font-black flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_#18181b] ${
              activeTab === "overview" ? "bg-purple text-white" : "bg-white text-ink hover:bg-amber-50"
            }`}
          >
            <BarChart3 size={16} />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("game")}
            className={`px-4 py-2.5 rounded-2xl border-3 border-ink font-display text-xs uppercase font-black flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_#18181b] ${
              activeTab === "game" ? "bg-red text-white" : "bg-white text-ink hover:bg-amber-50"
            }`}
          >
            <Gamepad2 size={16} />
            <span>Game Parameters</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2.5 rounded-2xl border-3 border-ink font-display text-xs uppercase font-black flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_#18181b] ${
              activeTab === "stats" ? "bg-blue text-white" : "bg-white text-ink hover:bg-amber-50"
            }`}
          >
            <BarChart3 size={16} />
            <span>Numerical Stats</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2.5 rounded-2xl border-3 border-ink font-display text-xs uppercase font-black flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_#18181b] ${
              activeTab === "leaderboard" ? "bg-yellow text-ink" : "bg-white text-ink hover:bg-amber-50"
            }`}
          >
            <Trophy size={16} />
            <span>Leaderboard ({leaderboard.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("submissions")}
            className={`px-4 py-2.5 rounded-2xl border-3 border-ink font-display text-xs uppercase font-black flex items-center gap-2 transition-all shadow-[4px_4px_0px_0px_#18181b] ${
              activeTab === "submissions" ? "bg-green text-white" : "bg-white text-ink hover:bg-amber-50"
            }`}
          >
            <FolderGit2 size={16} />
            <span>Submissions ({submissions.length})</span>
          </button>
        </div>

        {/* ── MAIN DASHBOARD CONTENT AREA ── */}
        <div className="rounded-3xl border-4 border-ink bg-white shadow-[8px_8px_0px_0px_#18181b] p-5 sm:p-8">
          {loading ? (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
              <RefreshCw size={32} className="animate-spin text-purple" />
              <p className="font-display text-sm uppercase font-black">Loading Database State...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="font-display text-2xl uppercase font-black">Dashboard Overview</h2>
                    <p className="font-sans text-xs font-bold text-ink/70">
                      Summary of live game parameters, event counters, and database records.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-2xl border-3 border-ink bg-red/10 p-4 shadow-[4px_4px_0px_0px_#18181b]">
                      <div className="flex items-center justify-between text-red mb-2">
                        <span className="font-display text-xs uppercase font-black">Game Duration</span>
                        <Gamepad2 size={18} />
                      </div>
                      <p className="font-display text-2xl font-black text-ink">{config.gameDuration}s</p>
                      <p className="text-[11px] font-bold text-ink/60 mt-1">
                        Score per bug: +{config.pointsPerBug} pts
                      </p>
                    </div>

                    <div className="rounded-2xl border-3 border-ink bg-blue/10 p-4 shadow-[4px_4px_0px_0px_#18181b]">
                      <div className="flex items-center justify-between text-blue mb-2">
                        <span className="font-display text-xs uppercase font-black">Total Prize Pool</span>
                        <Trophy size={18} />
                      </div>
                      <p className="font-display text-2xl font-black text-ink">{config.prizePoolTotal}</p>
                      <p className="text-[11px] font-bold text-ink/60 mt-1">
                        Build time: {config.buildDurationHours}
                      </p>
                    </div>

                    <div className="rounded-2xl border-3 border-ink bg-yellow/20 p-4 shadow-[4px_4px_0px_0px_#18181b]">
                      <div className="flex items-center justify-between text-amber-700 mb-2">
                        <span className="font-display text-xs uppercase font-black">Leaderboard Entries</span>
                        <Trophy size={18} />
                      </div>
                      <p className="font-display text-2xl font-black text-ink">{leaderboard.length} Players</p>
                      <p className="text-[11px] font-bold text-ink/60 mt-1">
                        Top score: {leaderboard[0]?.score || 0} pts
                      </p>
                    </div>

                    <div className="rounded-2xl border-3 border-ink bg-green/10 p-4 shadow-[4px_4px_0px_0px_#18181b]">
                      <div className="flex items-center justify-between text-green mb-2">
                        <span className="font-display text-xs uppercase font-black">Project Submissions</span>
                        <FolderGit2 size={18} />
                      </div>
                      <p className="font-display text-2xl font-black text-ink">{submissions.length} Projects</p>
                      <p className="text-[11px] font-bold text-ink/60 mt-1">
                        Active tracks configured
                      </p>
                    </div>
                  </div>

                  {/* Live Metrics Overview Table */}
                  <div className="rounded-2xl border-3 border-ink bg-amber-50/50 p-5 shadow-[4px_4px_0px_0px_#18181b] mt-2">
                    <h3 className="font-display text-base uppercase font-black mb-3">Live Event Metrics Banner</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                      <div className="bg-white p-3 rounded-xl border-2 border-ink">
                        <span className="text-ink/60 uppercase text-[10px] font-black block">Registrations</span>
                        <span className="font-display text-lg font-black text-purple">{config.registrationsCount}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border-2 border-ink">
                        <span className="text-ink/60 uppercase text-[10px] font-black block">Teams Formed</span>
                        <span className="font-display text-lg font-black text-blue">{config.teamsFormedCount}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border-2 border-ink">
                        <span className="text-ink/60 uppercase text-[10px] font-black block">Submissions</span>
                        <span className="font-display text-lg font-black text-green">{config.submissionsCount}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border-2 border-ink">
                        <span className="text-ink/60 uppercase text-[10px] font-black block">Judges Assigned</span>
                        <span className="font-display text-lg font-black text-red">{config.judgesAssignedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GAME PARAMETERS */}
              {activeTab === "game" && (
                <form onSubmit={handleSaveConfig} className="flex flex-col gap-6">
                  <div>
                    <h2 className="font-display text-2xl uppercase font-black">Bug Squasher Game Parameters</h2>
                    <p className="font-sans text-xs font-bold text-ink/70">
                      Edit game mechanics, timing, and point calculations. Saved changes immediately apply to the main app game canvas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Game Duration (Seconds)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={config.gameDuration}
                        onChange={(e) => setConfig({ ...config, gameDuration: Number(e.target.value) })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                      <span className="text-[11px] font-bold text-ink/60">Length of round in seconds (default: 30)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Points Per Bug Squashed
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={config.pointsPerBug}
                        onChange={(e) => setConfig({ ...config, pointsPerBug: Number(e.target.value) })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                      <span className="text-[11px] font-bold text-ink/60">Score added per successful click (default: 10)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Bug Spawn Interval (ms)
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="5000"
                        value={config.spawnIntervalMs}
                        onChange={(e) => setConfig({ ...config, spawnIntervalMs: Number(e.target.value) })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                      <span className="text-[11px] font-bold text-ink/60">Speed of bug spawning in milliseconds (default: 700)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Bug Lifetime On Board (ms)
                      </label>
                      <input
                        type="number"
                        min="200"
                        max="10000"
                        value={config.bugLifetimeMs}
                        onChange={(e) => setConfig({ ...config, bugLifetimeMs: Number(e.target.value) })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                      <span className="text-[11px] font-bold text-ink/60">How long a bug stays before despawning (default: 2000)</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-ink/10 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingConfig}
                      className="px-6 py-3 rounded-2xl border-3 border-ink bg-red text-white font-display text-xs uppercase font-black shadow-[4px_4px_0px_0px_#18181b] hover:bg-green transition-all active:translate-y-0.5 flex items-center gap-2"
                    >
                      <Save size={16} />
                      <span>{savingConfig ? "Saving Changes..." : "Save Game Parameters"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: NUMERICAL STATS */}
              {activeTab === "stats" && (
                <form onSubmit={handleSaveConfig} className="flex flex-col gap-6">
                  <div>
                    <h2 className="font-display text-2xl uppercase font-black">Event Numerical Statistics</h2>
                    <p className="font-sans text-xs font-bold text-ink/70">
                      Manage all numerical badges, counters, and statistics displayed across the main application pages.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Total Prize Pool Display
                      </label>
                      <input
                        type="text"
                        value={config.prizePoolTotal}
                        onChange={(e) => setConfig({ ...config, prizePoolTotal: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                      <span className="text-[11px] font-bold text-ink/60">Displayed on Hero & Prize Pool (e.g. ₹8L or ₹10 Lakhs)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Build Duration Label
                      </label>
                      <input
                        type="text"
                        value={config.buildDurationHours}
                        onChange={(e) => setConfig({ ...config, buildDurationHours: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                      <span className="text-[11px] font-bold text-ink/60">Displayed in stats cards (e.g. 24 hrs)</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Builders Capacity Count
                      </label>
                      <input
                        type="text"
                        value={config.builderCapacity}
                        onChange={(e) => setConfig({ ...config, builderCapacity: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Mentors On Call Count
                      </label>
                      <input
                        type="text"
                        value={config.mentorsCount}
                        onChange={(e) => setConfig({ ...config, mentorsCount: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Live Registrations Counter
                      </label>
                      <input
                        type="text"
                        value={config.registrationsCount}
                        onChange={(e) => setConfig({ ...config, registrationsCount: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Live Teams Formed Counter
                      </label>
                      <input
                        type="text"
                        value={config.teamsFormedCount}
                        onChange={(e) => setConfig({ ...config, teamsFormedCount: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Live Submissions Counter
                      </label>
                      <input
                        type="text"
                        value={config.submissionsCount}
                        onChange={(e) => setConfig({ ...config, submissionsCount: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-display text-xs uppercase font-black text-ink">
                        Judges Assigned Counter
                      </label>
                      <input
                        type="text"
                        value={config.judgesAssignedCount}
                        onChange={(e) => setConfig({ ...config, judgesAssignedCount: e.target.value })}
                        required
                        className="bg-white text-ink font-sans font-bold text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none shadow-[3px_3px_0px_0px_#18181b]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-ink/10 flex justify-end">
                    <button
                      type="submit"
                      disabled={savingConfig}
                      className="px-6 py-3 rounded-2xl border-3 border-ink bg-blue text-white font-display text-xs uppercase font-black shadow-[4px_4px_0px_0px_#18181b] hover:bg-green transition-all active:translate-y-0.5 flex items-center gap-2"
                    >
                      <Save size={16} />
                      <span>{savingConfig ? "Saving Stats..." : "Save Numerical Stats"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: LEADERBOARD MANAGEMENT */}
              {activeTab === "leaderboard" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl uppercase font-black">Global Leaderboard Scores</h2>
                      <p className="font-sans text-xs font-bold text-ink/70">
                        View, edit, add, or clear player high scores in the game database.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearAllLeaderboard}
                      className="px-4 py-2.5 rounded-2xl border-3 border-ink bg-red text-white font-display text-xs uppercase font-black shadow-[3px_3px_0px_0px_#18181b] hover:bg-red-light transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      <span>Clear All Scores</span>
                    </button>
                  </div>

                  {/* Add New Score Entry Form */}
                  <form onSubmit={handleAddLeaderboardScore} className="rounded-2xl border-3 border-ink bg-yellow/20 p-4 shadow-[4px_4px_0px_0px_#18181b] flex flex-col sm:flex-row items-end gap-3">
                    <div className="flex-1 flex flex-col gap-1 w-full">
                      <label className="font-display text-xs uppercase font-black text-ink">Player Name</label>
                      <input
                        type="text"
                        value={newScoreName}
                        onChange={(e) => setNewScoreName(e.target.value)}
                        placeholder="e.g. MasterSquasher"
                        required
                        className="bg-white text-ink font-sans font-bold text-xs px-3 py-2.5 border-2 border-ink rounded-xl outline-none"
                      />
                    </div>
                    <div className="w-full sm:w-36 flex flex-col gap-1">
                      <label className="font-display text-xs uppercase font-black text-ink">Score</label>
                      <input
                        type="number"
                        value={newScoreVal}
                        onChange={(e) => setNewScoreVal(e.target.value)}
                        placeholder="e.g. 240"
                        required
                        className="bg-white text-ink font-sans font-bold text-xs px-3 py-2.5 border-2 border-ink rounded-xl outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-ink bg-ink text-white font-display text-xs uppercase font-black shadow-[2px_2px_0px_0px_#18181b] hover:bg-purple transition-all shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>Add Score</span>
                    </button>
                  </form>

                  {/* Leaderboard Table */}
                  <div className="overflow-x-auto rounded-2xl border-3 border-ink shadow-[4px_4px_0px_0px_#18181b]">
                    <table className="w-full text-left text-xs font-bold">
                      <thead className="bg-ink text-white font-display text-xs uppercase font-black border-b-3 border-ink">
                        <tr>
                          <th className="p-3 w-12 text-center">Rank</th>
                          <th className="p-3">Player Name</th>
                          <th className="p-3">Score</th>
                          <th className="p-3">Date</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-ink/10 bg-white">
                        {leaderboard.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-500 font-bold">
                              No leaderboard entries found in database.
                            </td>
                          </tr>
                        ) : (
                          leaderboard.map((item, idx) => {
                            const isEditing = editingScoreId === item.id;
                            return (
                              <tr key={item.id || idx} className="hover:bg-amber-50/50">
                                <td className="p-3 text-center font-display font-black text-yellow text-sm bg-ink/5">
                                  #{idx + 1}
                                </td>
                                <td className="p-3">
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={editScoreName}
                                      onChange={(e) => setEditScoreName(e.target.value)}
                                      className="border-2 border-ink p-1 rounded font-bold text-xs w-full max-w-[150px]"
                                    />
                                  ) : (
                                    <span className="font-display font-black text-ink">{item.name}</span>
                                  )}
                                </td>
                                <td className="p-3">
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={editScoreVal}
                                      onChange={(e) => setEditScoreVal(e.target.value)}
                                      className="border-2 border-ink p-1 rounded font-bold text-xs w-20"
                                    />
                                  ) : (
                                    <span className="font-display font-black text-purple">{item.score} pts</span>
                                  )}
                                </td>
                                <td className="p-3 text-gray-500">{item.date || "Today"}</td>
                                <td className="p-3 text-right">
                                  {isEditing ? (
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => handleUpdateLeaderboardScore(item.id)}
                                        className="px-2.5 py-1 rounded bg-green text-white font-display text-[10px] uppercase font-black border border-ink"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingScoreId(null)}
                                        className="px-2 py-1 rounded bg-gray-200 text-ink font-display text-[10px] uppercase font-black border border-ink"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        onClick={() => {
                                          setEditingScoreId(item.id);
                                          setEditScoreName(item.name);
                                          setEditScoreVal(String(item.score));
                                        }}
                                        className="p-1.5 rounded-lg border border-ink bg-amber-100 hover:bg-yellow text-ink transition-all"
                                        title="Edit Entry"
                                      >
                                        <Edit2 size={13} />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteLeaderboardEntry(item.id, item.name)}
                                        className="p-1.5 rounded-lg border border-ink bg-red/10 hover:bg-red hover:text-white text-red transition-all"
                                        title="Delete Entry"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: PROJECT SUBMISSIONS */}
              {activeTab === "submissions" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl uppercase font-black">Project Submissions Board</h2>
                      <p className="font-sans text-xs font-bold text-ink/70">
                        Manage submitted hackathon projects, tracks, status indicators, and scores.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionForm({ team: "", track: "Embedded Systems", status: "Prototype live", score: "85" });
                        setSubmissionModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-2xl border-3 border-ink bg-green text-white font-display text-xs uppercase font-black shadow-[3px_3px_0px_0px_#18181b] hover:bg-green-light transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <Plus size={16} />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Submissions Table */}
                  <div className="overflow-x-auto rounded-2xl border-3 border-ink shadow-[4px_4px_0px_0px_#18181b]">
                    <table className="w-full text-left text-xs font-bold">
                      <thead className="bg-ink text-white font-display text-xs uppercase font-black border-b-3 border-ink">
                        <tr>
                          <th className="p-3">Team Name</th>
                          <th className="p-3">Challenge Track</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Judge Score</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-ink/10 bg-white">
                        {submissions.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-6 text-center text-gray-500 font-bold">
                              No project submissions configured yet.
                            </td>
                          </tr>
                        ) : (
                          submissions.map((item) => (
                            <tr key={item.id} className="hover:bg-amber-50/50">
                              <td className="p-3 font-display font-black text-ink text-sm">{item.team}</td>
                              <td className="p-3 text-gray-700">{item.track}</td>
                              <td className="p-3">
                                <span className="inline-block px-2.5 py-1 rounded-full bg-blue/10 border border-blue text-blue font-display text-[10px] font-black uppercase">
                                  {item.status}
                                </span>
                              </td>
                              <td className="p-3 font-display font-black text-purple">{item.score} / 100</td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      setSubmissionForm(item);
                                      setSubmissionModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg border border-ink bg-amber-100 hover:bg-yellow text-ink transition-all"
                                    title="Edit Submission"
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubmission(item.id, item.team)}
                                    className="p-1.5 rounded-lg border border-ink bg-red/10 hover:bg-red hover:text-white text-red transition-all"
                                    title="Delete Submission"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Submission Edit/Add Modal */}
      {submissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border-4 border-ink p-6 shadow-[8px_8px_0px_0px_#18181b] flex flex-col gap-4 text-ink relative">
            <button
              onClick={() => setSubmissionModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-ink text-white hover:bg-red"
            >
              <X size={16} />
            </button>

            <h3 className="font-display text-xl uppercase font-black">
              {submissionForm.id ? "Edit Submission" : "Add Project Submission"}
            </h3>

            <form onSubmit={handleSaveSubmission} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-display text-xs uppercase font-black">Team Name</label>
                <input
                  type="text"
                  value={submissionForm.team}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, team: e.target.value })}
                  placeholder="e.g. Team Cantilever"
                  required
                  className="bg-white text-ink font-sans font-bold text-xs p-3 border-2 border-ink rounded-xl outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-xs uppercase font-black">Challenge Track</label>
                <input
                  type="text"
                  value={submissionForm.track}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, track: e.target.value })}
                  placeholder="e.g. Embedded Systems"
                  required
                  className="bg-white text-ink font-sans font-bold text-xs p-3 border-2 border-ink rounded-xl outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-xs uppercase font-black">Status Indicator</label>
                <input
                  type="text"
                  value={submissionForm.status}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, status: e.target.value })}
                  placeholder="e.g. Prototype live / Judge review"
                  required
                  className="bg-white text-ink font-sans font-bold text-xs p-3 border-2 border-ink rounded-xl outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-display text-xs uppercase font-black">Score (Out of 100)</label>
                <input
                  type="text"
                  value={submissionForm.score}
                  onChange={(e) => setSubmissionForm({ ...submissionForm, score: e.target.value })}
                  placeholder="e.g. 92"
                  required
                  className="bg-white text-ink font-sans font-bold text-xs p-3 border-2 border-ink rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t-2 border-ink/10">
                <button
                  type="button"
                  onClick={() => setSubmissionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border-2 border-ink font-display text-xs uppercase font-black hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl border-2 border-ink bg-green text-white font-display text-xs uppercase font-black shadow-[3px_3px_0px_0px_#18181b] active:translate-y-0.5"
                >
                  Save Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
