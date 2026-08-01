"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────── */

const consoleLines = [
  "$ initializing nirmaan kernel...",
  "$ loading challenge tracks [██████████] done",
  "$ spawning mentor graph nodes...",
  "$ compiling submission engine...",
  "$ connecting to builder lobby...",
  "$ syncing judging rubrics...",
  "$ deploying demo stage...",
  "$ hackathon environment ready ✓",
];

const letters = "nirmaan".split("");

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 6 + 3,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 2,
  color: ["#ef333a", "#f6c62e", "#2563eb", "#22c55e", "#f97316", "#a855f7"][i % 6],
}));

/* ─── Sub-components ───────────────────────────────────── */

/** SVG circular progress ring */
function ProgressRing({ progress }: { progress: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="140" height="140" viewBox="0 0 120 120" className="absolute -z-0">
      {/* Track */}
      <circle
        cx="60" cy="60" r={radius}
        fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4"
      />
      {/* Progress arc */}
      <motion.circle
        cx="60" cy="60" r={radius}
        fill="none"
        stroke="url(#progressGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
      />
      {/* Glow dot at progress tip */}
      <defs>
        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef333a" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#f6c62e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Retro console typing block */
function ConsoleBlock({ lineIndex }: { lineIndex: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const text = consoleLines[lineIndex] || "";

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="inline-block w-[6px] h-[11px] bg-green ml-0.5 align-middle rounded-[1px]"
      />
    </span>
  );
}

/* ─── Main Preloader ───────────────────────────────────── */

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Progress ticker — calm, organic increments
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.random() < 0.3 ? 1 : 2;
        return Math.min(prev + step, 100);
      });
    }, 95);
    return () => clearInterval(interval);
  }, []);

  // Console line sync + completion trigger
  useEffect(() => {
    const step = Math.ceil(100 / consoleLines.length);
    setLineIdx(Math.min(Math.floor(progress / step), consoleLines.length - 1));

    if (progress === 100) {
      const t = setTimeout(handleComplete, 800);
      return () => clearTimeout(t);
    }
  }, [progress, handleComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.92,
        filter: "blur(16px)",
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#f4e9e1" }}
    >
      {/* ── Ambient floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0, scale: 0 }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 20}vh`, `${p.y}vh`],
            x: [`${p.x}vw`, `${p.x + (Math.random() > 0.5 ? 8 : -8)}vw`, `${p.x}vw`],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* ── Subtle grid overlay ── */}
      <div className="absolute inset-0 clay-grid opacity-30 pointer-events-none" />

      {/* ── Ambient gradient wash ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(239,51,58,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 70% 60%, rgba(37,99,235,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Central composition ── */}
      <div className="relative flex flex-col items-center z-10">

        {/* ── Staggered letter cascade: "nirmaan" ── */}
        <div className="flex gap-[2px] mb-8" aria-label="Nirmaan">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 60, rotateX: -90, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                delay: 0.3 + i * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="font-display text-[clamp(36px,6vw,52px)] leading-none text-ink tracking-tight font-black lowercase inline-block"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {char}
            </motion.span>
          ))}
          {/* Period with bounce */}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 400, damping: 10 }}
            className="font-display text-[clamp(36px,6vw,52px)] leading-none text-red font-black inline-block"
          >
            .
          </motion.span>
        </div>

        {/* ── Counter + Ring composite ── */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 16 }}
          className="relative flex items-center justify-center mb-8"
          style={{ width: 140, height: 140 }}
        >
          <ProgressRing progress={progress} />

          {/* Kinetic counter */}
          <div className="relative z-10 flex items-baseline select-none">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={progress}
                initial={{ y: 18, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -14, opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="font-display text-[48px] leading-none font-black text-ink tabular-nums"
                style={{ willChange: "transform, opacity" }}
              >
                {progress}
              </motion.span>
            </AnimatePresence>
            <span className="text-[16px] font-bold text-ink/40 ml-1 font-aeonik">%</span>
          </div>
        </motion.div>

        {/* ── Horizontal progress bar ── */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 220, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-[3px] bg-ink/8 rounded-full overflow-hidden mb-8 relative"
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #ef333a, #f97316, #f6c62e)",
              transition: "width 0.12s ease-out",
            }}
          />
        </motion.div>

        {/* ── Console output block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="w-[min(340px,85vw)] bg-ink/[0.04] backdrop-blur-sm border border-ink/[0.08] rounded-[14px] p-4 font-mono text-[10px] leading-[1.6] text-ink/60 overflow-hidden"
          style={{ minHeight: 80 }}
        >
          {/* Rendered console history (last 3 lines) */}
          {consoleLines.slice(Math.max(0, lineIdx - 2), lineIdx).map((line, i) => (
            <span key={`history-${lineIdx}-${i}`} className="block text-ink/30">
              {line}
            </span>
          ))}
          {/* Active typing line */}
          <ConsoleBlock lineIndex={lineIdx} />
        </motion.div>

        {/* ── Floating accent pills ── */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute -top-4 -right-16 md:-right-24 bg-yellow text-ink text-[8px] font-display font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
        >
          BUILD
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[30%] -left-14 md:-left-20 bg-blue text-white text-[8px] font-display font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
        >
          CODE
        </motion.div>
        <motion.div
          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] -right-12 md:-right-20 bg-green text-white text-[8px] font-display font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm"
        >
          HACK
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute -bottom-2 -left-10 md:-left-16 w-7 h-7 bg-orange rounded-[8px] shadow-sm flex items-center justify-center text-white text-xs font-black"
        >
          +
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-6 -left-8 md:-left-14 w-6 h-6 bg-purple rounded-full shadow-sm flex items-center justify-center text-yellow text-[10px]"
        >
          ✦
        </motion.div>
      </div>

      {/* ── Bottom branding ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-[9px] font-display uppercase tracking-[0.25em] font-black text-ink text-center"
      >
        © 2026 Nirmaan // Stage Zero
      </motion.p>
    </motion.div>
  );
}
