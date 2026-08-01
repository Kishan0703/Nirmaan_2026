"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export function BugSquasherGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nirmaan_high_score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setBugs([]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("nirmaan_high_score", score.toString());
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const spawnInterval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * (rect.width - 40);
      const y = Math.random() * (rect.height - 40);
      const id = Date.now() + Math.random();

      setBugs((b) => [...b, { id, x, y }]);

      setTimeout(() => {
        setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== id));
      }, 2000);

    }, 700);

    return () => clearInterval(spawnInterval);
  }, [isPlaying]);

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
