"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

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
  color: ["#ef333a", "#ffb200", "#0072e3", "#00aa3c", "#ff6100", "#ab54f7"][i % 6],
}));

/* ─── High-Res 22x22 Pixel Matrix Generator ─────────────── */

const GRID_SIZE = 22;

function buildMatrix(stage: number): number[][] {
  const m: number[][] = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );

  const fillBox = (r1: number, r2: number, c1: number, c2: number, val = 1) => {
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          m[r][c] = val;
        }
      }
    }
  };

  if (stage === 0) {
    // Stage 0: Single pixel block at dead center (2x2 center)
    fillBox(10, 11, 10, 11);
  } else if (stage === 1) {
    // Stage 1: Small 4x4 square at center
    fillBox(9, 12, 9, 12);
  } else if (stage === 2) {
    // Stage 2: Plus / Cross shape
    fillBox(9, 12, 9, 12);
    fillBox(4, 17, 10, 11);
    fillBox(10, 11, 4, 17);
  } else if (stage === 3) {
    // Stage 3: Stepped solid square / Octagon (14x14)
    fillBox(4, 17, 4, 17);
    fillBox(4, 5, 4, 5, 0);
    fillBox(4, 5, 16, 17, 0);
    fillBox(16, 17, 4, 5, 0);
    fillBox(16, 17, 16, 17, 0);
  } else if (stage >= 4) {
    // Stage 4: Full Pixel Circle Silhouette (22x22)
    const circleProfile = [
      { r: 0, c1: 8, c2: 13 },
      { r: 1, c1: 6, c2: 15 },
      { r: 2, c1: 4, c2: 17 },
      { r: 3, c1: 3, c2: 18 },
      { r: 4, c1: 2, c2: 19 },
      { r: 5, c1: 2, c2: 19 },
      { r: 6, c1: 1, c2: 20 },
      { r: 7, c1: 1, c2: 20 },
      { r: 8, c1: 1, c2: 20 },
      { r: 9, c1: 1, c2: 20 },
      { r: 10, c1: 1, c2: 20 },
      { r: 11, c1: 1, c2: 20 },
      { r: 12, c1: 1, c2: 20 },
      { r: 13, c1: 1, c2: 20 },
      { r: 14, c1: 1, c2: 20 },
      { r: 15, c1: 1, c2: 20 },
      { r: 16, c1: 2, c2: 19 },
      { r: 17, c1: 2, c2: 19 },
      { r: 18, c1: 3, c2: 18 },
      { r: 19, c1: 4, c2: 17 },
      { r: 20, c1: 6, c2: 15 },
      { r: 21, c1: 8, c2: 13 },
    ];

    circleProfile.forEach(({ r, c1, c2 }) => {
      fillBox(r, r, c1, c2, 1);
    });

    if (stage === 5) {
      // Stage 5: Punch out Eyes and Smile Cutouts
      // Left eye cutout (2 wide x 4 tall)
      fillBox(6, 9, 6, 7, 0);

      // Right eye cutout (2 wide x 4 tall)
      fillBox(6, 9, 14, 15, 0);

      // Curved smile cutout (U-shape arc)
      fillBox(12, 13, 5, 5, 0);
      fillBox(12, 13, 16, 16, 0);
      fillBox(14, 14, 6, 6, 0);
      fillBox(14, 14, 15, 15, 0);
      fillBox(15, 15, 7, 7, 0);
      fillBox(15, 15, 14, 14, 0);
      fillBox(16, 16, 8, 13, 0);
    }
  }

  return m;
}

/** Pixel Art Display (Directly on preloader background, no card wrapper, zero pixel gaps) */
function PixelGridDisplay({ stage }: { stage: number }) {
  const matrix = useMemo(() => buildMatrix(stage), [stage]);

  return (
    <div
      className="relative w-[min(460px,78vw)] aspect-square flex items-center justify-center pointer-events-none"
    >
      <div
        className="w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(22, minmax(0, 1fr))",
          gap: 0,
        }}
      >
        {matrix.map((row, rIdx) =>
          row.map((active, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={active ? "bg-yellow" : "bg-transparent"}
            />
          ))
        )}
      </div>
    </div>
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
    <span className="block font-mono">
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
  const [stage, setStage] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Main 5-second timeline driver
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4800; // 4.8s to reach 100%, 5s completion

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      // Determine pixel animation stage based on elapsed time (grow -> face -> hold -> shrink)
      if (elapsed < 400) {
        setStage(0); // Single pixel center
      } else if (elapsed < 800) {
        setStage(1); // Small square
      } else if (elapsed < 1200) {
        setStage(2); // Cross
      } else if (elapsed < 1600) {
        setStage(3); // Octagon square
      } else if (elapsed < 2000) {
        setStage(4); // Full pixel circle
      } else if (elapsed < 3400) {
        setStage(5); // Smiley face with eyes + smile (HOLD for 1.4s)
      } else if (elapsed < 3700) {
        setStage(4); // Shrink to circle
      } else if (elapsed < 4000) {
        setStage(3); // Shrink to octagon square
      } else if (elapsed < 4300) {
        setStage(2); // Shrink to cross
      } else if (elapsed < 4600) {
        setStage(1); // Shrink to small square
      } else {
        setStage(0); // Shrink to center pixel
      }

      if (elapsed >= 5000) {
        clearInterval(interval);
        handleComplete();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [handleComplete]);

  // Sync console line index with progress percentage
  useEffect(() => {
    const step = Math.ceil(100 / consoleLines.length);
    setLineIdx(Math.min(Math.floor(progress / step), consoleLines.length - 1));
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.94,
        filter: "blur(16px)",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-6 px-4 overflow-hidden"
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

      {/* ── Top Section: Title & Floating Accent Pills ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[600px] pt-2">
        <div className="flex gap-[2px]" aria-label="Nirmaan">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 60, rotateX: -90, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{
                delay: 0.2 + i * 0.06,
                duration: 0.5,
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="font-display text-[clamp(32px,5vw,46px)] leading-none text-ink tracking-tight font-black lowercase inline-block"
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 10 }}
            className="font-display text-[clamp(32px,5vw,46px)] leading-none text-red font-black inline-block"
          >
            .
          </motion.span>
        </div>

        {/* ── Floating accent pills ── */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-0 right-4 md:-right-8 bg-yellow text-ink text-[8px] font-display font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
        >
          BUILD
        </motion.div>
        <motion.div
          animate={{ y: [0, 5, 0], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-10 left-4 md:-left-8 bg-blue text-white text-[8px] font-display font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
        >
          CODE
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0], x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-2 md:-right-10 bg-green text-white text-[8px] font-display font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
        >
          HACK
        </motion.div>
      </div>

      {/* ── Center: Dominant Pixel Art Animation (No Box Wrapper, Zero Gaps) ── */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <PixelGridDisplay stage={stage} />
      </div>

      {/* ── Bottom Section: Progress Bar & Console ── */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-[360px] pb-2">
        <div className="flex items-center gap-1.5 font-display text-sm font-black text-ink">
          <span>{progress}%</span>
        </div>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="h-[3.5px] bg-ink/10 rounded-full overflow-hidden w-full relative"
        >
          <motion.div
            className="h-full rounded-full bg-yellow"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s ease-out",
            }}
          />
        </motion.div>

        {/* Console output block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="w-full bg-ink/[0.04] backdrop-blur-sm border border-ink/[0.08] rounded-[14px] p-3.5 font-mono text-[10px] leading-[1.5] text-ink/60 overflow-hidden"
          style={{ minHeight: 72 }}
        >
          {consoleLines.slice(Math.max(0, lineIdx - 2), lineIdx).map((line, i) => (
            <span key={`history-${lineIdx}-${i}`} className="block text-ink/30">
              {line}
            </span>
          ))}
          <ConsoleBlock lineIndex={lineIdx} />
        </motion.div>

        <p className="text-[9px] font-display uppercase tracking-[0.25em] font-black text-ink/35 text-center mt-1">
          © 2026 NIRMAAN // STAGE ZERO
        </p>
      </div>
    </motion.div>
  );
}
