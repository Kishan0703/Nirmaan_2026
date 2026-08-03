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

  const submitScoreToLeaderboard = async (finalScore: number) => {
    if (finalScore <= 0) return;

    try {
      const activeName = playerName || "Anonymous Bug Squasher";
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: playerId,
          name: activeName,
          score: finalScore,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
        if (data.rank) {
          setLastSubmittedRank(data.rank);
        }
      }
    } catch {
      // Silent error fallback
    }
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    clearBugTimeouts();
    setBugs([]);

    setScore((finalScore) => {
      setHighScore((currentHigh) => {
        if (finalScore > currentHigh) {
          localStorage.setItem(HIGH_SCORE_STORAGE_KEY, finalScore.toString());
          return finalScore;
        }
        return currentHigh;
      });

      submitScoreToLeaderboard(finalScore);
      return finalScore;
    });
  }, [clearBugTimeouts]);

  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft <= 0) {
      endGame();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, endGame]);

  const spawnBug = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth - BUG_SIZE;
    const height = container.clientHeight - BUG_SIZE;

    if (width <= 0 || height <= 0) return;

    const newBug: Bug = {
      id: Date.now() + Math.random(),
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    setBugs((current) => [...current.slice(-5), newBug]);

    const timeout = setTimeout(() => {
      setBugs((current) => current.filter((b) => b.id !== newBug.id));
    }, BUG_LIFETIME_MS);

    bugTimeoutsRef.current.push(timeout);
  }, []);

  const currentSpawnInterval = Math.max(300, BUG_SPAWN_INTERVAL_MS - Math.floor(score / 50) * 50);

  useEffect(() => {
    if (!isPlaying) return;

    spawnBug();
    const interval = setInterval(spawnBug, currentSpawnInterval);

    return () => clearInterval(interval);
  }, [isPlaying, currentSpawnInterval, spawnBug]);

  const squashBug = (id: number) => {
    setScore((s) => s + 10);
    setBugs((b) => b.filter((bug) => bug.id !== id));
  };

  const startGame = () => {
    if (!playerName) {
      setShowNameModal(true);
      return;
    }
    clearBugTimeouts();
    setBugs([]);
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setLastSubmittedRank(null);
    setIsPlaying(true);
  };

  return (
    <section id="game" className="my-gap" data-reveal>
      <div className="rounded-brand bg-red-light p-4 sm:p-box clay-card text-white flex flex-col gap-4 sm:gap-6 overflow-hidden">

        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-3 sm:pb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-section uppercase text-white font-black leading-tight">
              Bug Squasher
            </h2>
          </div>

          {/* User Profile + Stats */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            {/* Player Tag Profile */}
            <div className="clay-card rounded-[12px] bg-paper px-2.5 py-1 sm:px-3 sm:py-1.5 text-ink flex items-center gap-1.5 shadow-sm">
              <User size={14} className="text-gray-500 shrink-0" />
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempNameInput}
                    onChange={(e) => setTempNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && savePlayerName(tempNameInput)}
                    className="w-20 sm:w-24 rounded border border-ink/20 px-1 py-0.5 text-xs font-bold text-ink"
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
                <div className="flex items-center gap-1">
                  <span className="font-display text-xs sm:text-sm font-black text-ink truncate max-w-[90px] sm:max-w-none">
                    {playerName || "Anonymous"}
                  </span>
                  <button
                    onClick={() => {
                      setTempNameInput(playerName);
                      setIsEditingName(true);
                    }}
                    className="text-gray-400 hover:text-ink transition-colors p-0.5"
                    title="Change Player Name"
                  >
                    <Edit2 size={11} />
                  </button>
                </div>
              )}
            </div>

            <div className="clay-card rounded-[12px] bg-paper px-2.5 py-1 sm:px-4 sm:py-2 text-ink text-center shadow-sm">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-700">Time Left</p>
              <p className="font-display text-sm sm:text-lg font-black">{timeLeft}s</p>
            </div>
            <div className="clay-card rounded-[12px] bg-paper px-2.5 py-1 sm:px-4 sm:py-2 text-ink text-center shadow-sm">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-700">Score</p>
              <p className="font-display text-sm sm:text-lg font-black">{score}</p>
            </div>
            <div className="clay-card rounded-[12px] bg-paper px-2.5 py-1 sm:px-4 sm:py-2 text-ink text-center shadow-sm">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-700">High Score</p>
              <p className="font-display text-sm sm:text-lg font-black">{highScore}</p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-body-xl text-white/95 font-medium leading-snug">
          Quickly click or tap the red bugs as they spawn on the board below! Compete on the global leaderboard.
        </p>

        {/* Main Section Grid: Game Area + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Game Canvas (2 Cols on LG) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div
              ref={containerRef}
              className="relative h-[250px] sm:h-[320px] w-full bg-ink/40 border border-white/10 rounded-[18px] overflow-hidden flex items-center justify-center cursor-crosshair shadow-inner"
            >
              {!isPlaying && (
                <div className="text-center z-10 flex flex-col items-center gap-2.5 p-4">
                  <Trophy size={36} className="text-yellow animate-bounce" />
                  <h3 className="font-display text-lg sm:text-xl uppercase font-black">Ready to Debug?</h3>

                  {lastSubmittedRank && (
                    <div className="rounded-pill bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-yellow border border-yellow/30 animate-pulse">
                      🎉 Ranked #{lastSubmittedRank} on the Global Leaderboard!
                    </div>
                  )}

                  <button
                    onClick={startGame}
                    className="clay-card rounded-pill bg-yellow px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-display uppercase font-black text-ink hover:scale-105 transition-transform shadow-md"
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

          {/* Leaderboard Column */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="rounded-[18px] bg-ink/60 border border-white/15 p-3.5 sm:p-4 flex flex-col gap-3 h-[250px] sm:h-[320px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <Medal size={16} className="text-yellow" />
                  <span className="font-display text-xs uppercase font-black text-white">Global Leaderboard</span>
                </div>
                <button
                  onClick={fetchLeaderboard}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Refresh Leaderboard"
                >
                  <RefreshCw size={12} className={isLoadingLeaderboard ? "animate-spin" : ""} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {isLoadingLeaderboard && (
                  <div className="text-center py-8 text-xs text-gray-400 font-medium">Loading rankings...</div>
                )}

                {!isLoadingLeaderboard && leaderboard.length === 0 && (
                  <div className="text-center py-8 text-xs text-gray-400 font-medium">No scores yet. Be the first!</div>
                )}

                {!isLoadingLeaderboard &&
                  leaderboard.map((item, idx) => {
                    const isCurrentPlayer = item.id === playerId;
                    return (
                      <div
                        key={item.id || idx}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-[10px] text-xs font-bold ${
                          isCurrentPlayer ? "bg-yellow/20 text-yellow border border-yellow/30" : "bg-white/5 text-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-display text-[10px] opacity-70 w-4">#{idx + 1}</span>
                          <span className="truncate max-w-[110px]">{item.name}</span>
                        </div>
                        <span className="font-display text-xs font-black text-yellow ml-2">{item.score}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Name Input Modal */}
      <AnimatePresence>
        {showNameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-[24px] bg-paper p-6 clay-card text-ink shadow-2xl border-2 border-white/60"
            >
              <h3 className="font-display text-xl uppercase font-black text-ink mb-1">Enter Player Name</h3>
              <p className="text-xs text-gray-600 font-bold mb-4">Set your display name to submit scores to the global leaderboard.</p>

              <input
                type="text"
                value={tempNameInput}
                onChange={(e) => setTempNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && savePlayerName(tempNameInput)}
                className="w-full rounded-[12px] border-2 border-ink/20 p-3 font-display text-sm font-bold text-ink mb-4 focus:outline-none focus:border-red"
                placeholder="e.g. MasterDebugger"
                autoFocus
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    savePlayerName(tempNameInput);
                    startGame();
                  }}
                  className="rounded-pill bg-yellow px-5 py-2 text-xs font-display uppercase font-black text-ink shadow-md"
                >
                  Save & Play
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
