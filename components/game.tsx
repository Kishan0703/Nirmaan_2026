"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const GAME_DURATION_SECONDS = 30;
const HIGH_SCORE_STORAGE_KEY = "nirmaan_high_score";
const BUG_SIZE = 40;
const BUG_LIFETIME_MS = 2000;
const BUG_SPAWN_INTERVAL_MS = 700;

type Bug = {
  id: number;
  x: number;
  y: number;
};

export function BugSquasherGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const bugTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearBugTimeouts = useCallback(() => {
    bugTimeoutsRef.current.forEach(clearTimeout);
    bugTimeoutsRef.current = [];
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
    const parsedScore = saved ? Number.parseInt(saved, 10) : 0;
    if (Number.isFinite(parsedScore)) {
      setHighScore(parsedScore);
    }

    return clearBugTimeouts;
  }, [clearBugTimeouts]);

  const startGame = () => {
    clearBugTimeouts();
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setBugs([]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      clearBugTimeouts();
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(HIGH_SCORE_STORAGE_KEY, score.toString());
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, score, highScore, clearBugTimeouts]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const spawnInterval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * Math.max(0, rect.width - BUG_SIZE);
      const y = Math.random() * Math.max(0, rect.height - BUG_SIZE);
      const id = Date.now() + Math.random();

      setBugs((b) => [...b, { id, x, y }]);

      const removalTimeout = setTimeout(() => {
        setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== id));
        bugTimeoutsRef.current = bugTimeoutsRef.current.filter((timeout) => timeout !== removalTimeout);
      }, BUG_LIFETIME_MS);

      bugTimeoutsRef.current.push(removalTimeout);
    }, BUG_SPAWN_INTERVAL_MS);

    return () => {
      clearInterval(spawnInterval);
      clearBugTimeouts();
    };
  }, [isPlaying, clearBugTimeouts]);

  const squashBug = (id: number) => {
    setScore((s) => s + 10);
    setBugs((b) => b.filter((bug) => bug.id !== id));
  };

  return (
    <section id="game" className="my-gap" data-reveal>
      <div className="rounded-brand bg-red-light p-box clay-card text-white flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/20 pb-4">
          <div>
            <h2 className="font-display text-section uppercase text-white font-black">Bug Squasher</h2>
          </div>
          <div className="flex gap-4">
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
          Quickly click or tap the red bugs as they spawn on the board below to resolve compilation issues! 30 seconds speedrun.
        </p>

        {/* Game play area */}
        <div
          ref={containerRef}
          className="relative h-[300px] w-full bg-ink/40 border border-white/10 rounded-[18px] overflow-hidden flex items-center justify-center cursor-crosshair shadow-inner"
        >
          {!isPlaying && (
            <div className="text-center z-10 flex flex-col items-center gap-3">
              <Trophy size={40} className="text-yellow animate-bounce" />
              <h3 className="font-display text-xl uppercase font-black">Ready to Debug?</h3>
              <button
                onClick={startGame}
                className="clay-card rounded-pill bg-yellow px-8 py-3.5 text-sm font-display uppercase font-black text-ink"
              >
                Start Lobby Game
              </button>
            </div>
          )}

          {isPlaying && bugs.map((bug) => (
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
    </section>
  );
}
