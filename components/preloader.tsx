"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingPhrases = [
  "INITIALIZING NIRMAAN...",
  "CONNECTING TO BMSIT LOBBY...",
  "SPAWNING CHALLENGE TRACKS...",
  "LOADING GAME MODULES...",
  "RESOLVING COMPILATION BUGS...",
  "LAUNCHING QUEST GRIDS...",
  "READY TO BUILD!"
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    // Ticking progress counter from 0 to 100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random incremental steps for custom feel
        const diff = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + diff, 100);
      });
    }, 90);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Cycle loading phrases based on current progress percentage
    const step = Math.ceil(100 / loadingPhrases.length);
    const targetIdx = Math.min(Math.floor(progress / step), loadingPhrases.length - 1);
    setPhraseIdx(targetIdx);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 700); // Small delay to let user see "READY" state
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4e9e1] clay-grid"
    >
      <div className="relative flex flex-col items-center max-w-sm w-full px-6">
        
        {/* Animated 3D claymorphic card container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full clay-card bg-paper p-8 rounded-[32px] flex flex-col items-center text-ink border-2 border-white/50"
        >
          {/* Animated 3D geometric loading rings */}
          <div className="relative h-24 w-24 mb-8 flex items-center justify-center">
            {/* Outer spinning ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-dashed border-orange opacity-80"
            />
            {/* Inner counter-spinning ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute h-16 w-16 rounded-full border-4 border-dotted border-blue opacity-70"
            />
            {/* Pulsing center sphere */}
            <motion.div 
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-8 w-8 rounded-full bg-purple clay-card border-none"
            />
          </div>

          {/* Big Lowercase Branding */}
          <h1 className="font-display text-[42px] leading-none text-ink tracking-tight font-black lowercase mb-2">
            nirmaan.
          </h1>

          {/* Large dynamic counter */}
          <div className="font-display text-[56px] leading-none font-black text-ink mb-6 select-none relative">
            <motion.span
              key={progress}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-block"
            >
              {String(progress).padStart(2, "0")}
            </motion.span>
            <span className="text-xl font-bold ml-1 text-gray-500 font-aeonik">%</span>
          </div>

          {/* Pulsing track progress bar */}
          <div className="w-full h-3 bg-white/60 border border-white/40 rounded-full overflow-hidden mb-6 shadow-inner relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange to-yellow rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          {/* Phrase status logger */}
          <div className="h-6 flex items-center justify-center">
            <motion.p
              key={phraseIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-display uppercase tracking-widest font-black text-gray-800 text-center"
            >
              {loadingPhrases[phraseIdx]}
            </motion.p>
          </div>
        </motion.div>

        {/* Small copyright footer */}
        <p className="absolute -bottom-16 text-[9px] font-display uppercase tracking-widest font-black text-ink/40 text-center">
          © 2026 NIRMAAN // STAGE ZERO
        </p>
      </div>
    </motion.div>
  );
}
