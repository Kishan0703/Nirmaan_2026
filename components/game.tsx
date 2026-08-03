"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, User, Edit2, Check, RefreshCw } from "lucide-react";

const GAME_DURATION_SECONDS = 30;
const HIGH_SCORE_STORAGE_KEY = "nirmaan_high_score";
const PLAYER_NAME_KEY = "nirmaan_player_name";
const PLAYER_ID_KEY = "nirmaan_player_id";
const BUG_SIZE = 40;
const BUG_LIFETIME_MS = 2000;
const BUG_SPAWN_INTERVAL_MS = 700;

type Bug = {
  id: number;
  x: number;
  y: number;
};

type LeaderboardItem = {
  id: string;
  name: string;
  score: number;
  date: string;
};

export function BugSquasherGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const bugTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // User identity state
  const [playerName, setPlayerName] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempNameInput, setTempNameInput] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const [lastSubmittedRank, setLastSubmittedRank] = useState<number | null>(null);

  const clearBugTimeouts = useCallback(() => {
    bugTimeoutsRef.current.forEach(clearTimeout);
    bugTimeoutsRef.current = [];
  }, []);

  // Initialize player profile & high score
  useEffect(() => {
    const savedScore = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
    const parsedScore = savedScore ? Number.parseInt(savedScore, 10) : 0;
    if (Number.isFinite(parsedScore)) {
      setHighScore(parsedScore);
    }

    let savedId = localStorage.getItem(PLAYER_ID_KEY);
    if (!savedId) {
      savedId = `player_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
      localStorage.setItem(PLAYER_ID_KEY, savedId);
    }
    setPlayerId(savedId);

    const savedName = localStorage.getItem(PLAYER_NAME_KEY) || "";
    setPlayerName(savedName);
    setTempNameInput(savedName);

    fetchLeaderboard();

    return clearBugTimeouts;
  }, [clearBugTimeouts]);

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    try {
      const res = await fetch("/api/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch {
      // Fallback silent
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const savePlayerName = (name: string) => {
    const clean = name.trim().slice(0, 20) || "Anonymous Bug Squasher";
    setPlayerName(clean);
    localStorage.setItem(PLAYER_NAME_KEY, clean);
    setIsEditingName(false);
    setShowNameModal(false);
  };

  const submitScoreToLeaderboard = useCallback(async (finalScore: number) => {
    if (finalScore <= 0) return;
    const currentName = playerName.trim() || "Anonymous Bug Squasher";

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentName,
          score: finalScore,
          userId: playerId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
        if (data.userRank) {
          setLastSubmittedRank(data.userRank);
        }
      }
    } catch {
      // Fallback
    }
  }, [playerName, playerId]);

  const startGame = () => {
    if (!playerName.trim()) {
      setShowNameModal(true);
      return;
    }

    clearBugTimeouts();
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setBugs([]);
    setLastSubmittedRank(null);
  };

  // Game timer loop
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      clearBugTimeouts();

      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(HIGH_SCORE_STORAGE_KEY, score.toString());
      }

      submitScoreToLeaderboard(score);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, score, highScore, clearBugTimeouts, submitScoreToLeaderboard]);

  // Dynamic spawn interval based on remaining time:
  // Starts slow (~1400ms at 30s) and speeds up to (~380ms at 0s)
  const currentSpawnInterval = Math.max(
    380,
    Math.round(380 + (timeLeft / GAME_DURATION_SECONDS) * 1020)
  );

  // Bug spawning loop
  useEffect(() => {
    if (!isPlaying) return;

    const spawnNextBug = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * Math.max(0, rect.width - BUG_SIZE);
      const y = Math.random() * Math.max(0, rect.height - BUG_SIZE);
      const id = Date.now() + Math.random();

      setBugs((b) => [...b, { id, x, y }]);

      const removalTimeout = setTimeout(() => {
        setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== id));
        bugTimeoutsRef.current = bugTimeoutsRef.current.filter((t) => t !== removalTimeout);
      }, BUG_LIFETIME_MS);

      bugTimeoutsRef.current.push(removalTimeout);
    };

    const timer = setInterval(spawnNextBug, currentSpawnInterval);

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, currentSpawnInterval]);

  const squashBug = (id: number) => {
    setScore((s) => s + 10);
    setBugs((b) => b.filter((bug) => bug.id !== id));
  };

  return (
    <section id="game" className="my-gap" data-reveal>
      <div className="rounded-brand bg-red-light p-box clay-card text-white flex flex-col gap-6">

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/20 pb-4">
          <div>
            <h2 className="font-display text-section uppercase text-white font-black">Bug Squasher</h2>
          </div>

          {/* User Profile + Stats */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Player Tag Profile */}
            <div className="clay-card rounded-[12px] bg-paper px-3 py-1.5 text-ink flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempNameInput}
                    onChange={(e) => setTempNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && savePlayerName(tempNameInput)}
                    className="w-24 rounded border border-ink/20 px-1.5 py-0.5 text-xs font-bold text-ink"
                    placeholder="Enter name"
                    autoFocus
                  />
                  <button
                    onClick={() => savePlayerName(tempNameInput)}
                    className="rounded bg-green-600 p-1 text-white hover:bg-green-700"
                  >
                    <Check size={12} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm font-black text-ink">
                    {playerName || "Anonymous"}
                  </span>
                  <button
                    onClick={() => {
                      setTempNameInput(playerName);
                      setIsEditingName(true);
                    }}
                    className="text-gray-400 hover:text-ink transition-colors"
                    title="Change Player Name"
                  >
                    <Edit2 size={12} />
                  </button>
                </div>
              )}
            </div>

            <div className="clay-card rounded-[12px] bg-paper px-4 py-2 text-ink text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Time Left</p>
              <p className="font-display text-lg font-black">{timeLeft}s</p>
            </div>
            <div className="clay-card rounded-[12px] bg-paper px-4 py-2 text-ink text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Score</p>
              <p className="font-display text-lg font-black">{score}</p>
            </div>
            <div className="clay-card rounded-[12px] bg-paper px-4 py-2 text-ink text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">High Score</p>
              <p className="font-display text-lg font-black">{highScore}</p>
            </div>
          </div>
        </div>

        <p className="text-body-xl text-white/90 font-medium">
          Quickly click or tap the red bugs as they spawn on the board below! Compete on the global leaderboard.
        </p>

        {/* Main Section Grid: Game Area + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Game Canvas (2 Cols on LG) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div
              ref={containerRef}
              className="relative h-[320px] w-full bg-ink/40 border border-white/10 rounded-[18px] overflow-hidden flex items-center justify-center cursor-crosshair shadow-inner"
            >
              {!isPlaying && (
                <div className="text-center z-10 flex flex-col items-center gap-3 p-4">
                  <Trophy size={44} className="text-yellow animate-bounce" />
                  <h3 className="font-display text-xl uppercase font-black">Ready to Debug?</h3>

                  {lastSubmittedRank && (
                    <div className="rounded-pill bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-yellow border border-yellow/30 animate-pulse">
                      🎉 Ranked #{lastSubmittedRank} on the Global Leaderboard!
                    </div>
                  )}

                  <button
                    onClick={startGame}
                    className="clay-card rounded-pill bg-yellow px-8 py-3.5 text-sm font-display uppercase font-black text-ink hover:scale-105 transition-transform"
                  >
                    {playerName ? "Start Lobby Game" : "Set Name & Play"}
                  </button>
                </div>
              )}

              {isPlaying &&
                bugs.map((bug) => (
                  <motion.button
                    key={bug.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={() => squashBug(bug.id)}
                    style={{ left: bug.x, top: bug.y }}
                    className="absolute h-9 w-9 bg-red border-2 border-white rounded-full flex items-center justify-center text-white shadow-md active:scale-95"
                  >
                    🐞
                  </motion.button>
                ))}
            </div>
          </div>

          {/* Global Leaderboard Panel (1 Col on LG) */}
          <div className="clay-card rounded-[18px] bg-paper/95 p-5 text-ink flex flex-col gap-4 shadow-lg border border-white/40">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div className="flex items-center gap-2">
                <Medal size={20} className="text-yellow" />
                <h3 className="font-display text-lg uppercase font-black">Global Top 10</h3>
              </div>
              <button
                onClick={fetchLeaderboard}
                className="text-gray-500 hover:text-ink transition-colors p-1"
                title="Refresh Leaderboard"
              >
                <RefreshCw size={14} className={isLoadingLeaderboard ? "animate-spin" : ""} />
              </button>
            </div>

            {/* Leaderboard Entries List */}
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
              {isLoadingLeaderboard && leaderboard.length === 0 ? (
                <p className="text-xs text-center py-6 text-gray-500 font-medium">Loading scores...</p>
              ) : leaderboard.length === 0 ? (
                <p className="text-xs text-center py-6 text-gray-500 font-medium">No scores submitted yet. Be the first!</p>
              ) : (
                leaderboard.map((item, idx) => {
                  const isCurrentPlayer = item.id === playerId || item.name.toLowerCase() === playerName.toLowerCase();
                  const rankNum = idx + 1;
                  const rankBadge =
                    rankNum === 1 ? "🥇" : rankNum === 2 ? "🥈" : rankNum === 3 ? "🥉" : `#${rankNum}`;

                  return (
                    <div
                      key={item.id || idx}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isCurrentPlayer
                          ? "bg-yellow/30 border border-yellow/60 text-ink font-bold"
                          : "bg-black/5 hover:bg-black/10 text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-6 text-center font-display font-black text-sm">{rankBadge}</span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm text-ink">{item.score}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modal: Set Name Prompt (if not set before first game) */}
        <AnimatePresence>
          {showNameModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="clay-card rounded-[24px] bg-paper p-6 text-ink max-w-sm w-full flex flex-col gap-4 shadow-2xl border border-white"
              >
                <div className="flex items-center gap-2 text-red font-display uppercase font-black text-lg">
                  <User size={22} />
                  <span>Choose Your Player Tag</span>
                </div>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  Enter your handle so your high scores can be saved to the Global Bug Squasher Leaderboard!
                </p>

                <input
                  type="text"
                  value={tempNameInput}
                  onChange={(e) => setTempNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tempNameInput.trim()) {
                      savePlayerName(tempNameInput);
                      startGame();
                    }
                  }}
                  placeholder="e.g. CodeNinja, BugSlayer"
                  className="rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm font-bold text-ink focus:outline-none focus:ring-2 focus:ring-red"
                  maxLength={20}
                  autoFocus
                />

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => {
                      savePlayerName(tempNameInput || "Anonymous Bug Squasher");
                      startGame();
                    }}
                    className="clay-card rounded-pill bg-yellow px-6 py-2.5 text-xs font-display uppercase font-black text-ink"
                  >
                    Save & Play!
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
