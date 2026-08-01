"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingPhrases = [
  "spawning main lobby... very demure 💅",
  "summoning based mentors... coding check 💻",
  "squashing nasty bugs... absolute cinema 🎬",
  "injecting claymorphic colors... no cap 🎨",
  "allocating build resources... we cookin 🍳",
  "compiling codebases... let them cook 🧑‍🍳",
  "nirmaan active... let's gooo! 🚀"
];

const letters = "nirmaan.".split("");

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    // Ticking progress counter from 0 to 100 with varying speeds for kinetic rhythm
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Custom incremental steps for organic build feel
        const diff = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + diff, 100);
      });
    }, 85);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Sync phrase index with percentage step intervals
    const step = Math.ceil(100 / loadingPhrases.length);
    const targetIdx = Math.min(Math.floor(progress / step), loadingPhrases.length - 1);
    setPhraseIdx(targetIdx);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4e9e1] clay-grid"
    >
      <div className="relative flex flex-col items-center max-w-sm w-full px-6">
        
        {/* Orbiting Kinetic Shapes */}
        
        {/* Floating shape 1 (Yellow pill rotating) */}
        <motion.div
          animate={{ rotate: 360, y: [0, -15, 0] }}
          transition={{ rotate: { repeat: Infinity, duration: 4, ease: "linear" }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
          className="absolute -top-10 -left-12 h-10 w-16 bg-yellow rounded-full clay-card border-none opacity-90 shadow-md flex items-center justify-center font-display text-[9px] font-black text-ink"
        >
          BUILD
        </motion.div>

        {/* Floating shape 2 (Orange cross spinning) */}
        <motion.div
          animate={{ rotate: -360, scale: [0.95, 1.1, 0.95] }}
          transition={{ rotate: { repeat: Infinity, duration: 3, ease: "linear" }, scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
          className="absolute -bottom-8 -right-10 h-11 w-11 bg-orange rounded-[12px] clay-card border-none opacity-95 shadow-md flex items-center justify-center text-white text-md font-black"
        >
          +
        </motion.div>

        {/* Floating shape 3 (Purple star shape pulsing) */}
        <motion.div
          animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute -top-8 -right-12 h-9 w-9 bg-purple rounded-full clay-card border-none opacity-90 shadow-md flex items-center justify-center text-yellow text-sm font-bold"
        >
          ✦
        </motion.div>
        
        {/* Main 3D Container Card */}
        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }} // Elastic spring reveal
          className="w-full clay-card bg-paper p-8 rounded-[36px] flex flex-col items-center text-ink border-2 border-white/50 relative overflow-hidden"
        >
          {/* Subtle background ambient mesh */}
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow/5 via-transparent to-purple/5 pointer-events-none" />

          {/* Letter-Staggered Kinetic Header */}
          <div className="flex gap-0.5 mb-6">
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 25, rotate: -25, opacity: 0 }}
                animate={{ y: [25, -6, 0], rotate: [-25, 5, 0], opacity: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 12
                }}
                className="font-display text-[38px] leading-none text-ink tracking-tight font-black lowercase inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Large elastic percentage indicator */}
          <div className="h-20 flex items-center justify-center mb-6">
            <motion.div 
              key={progress}
              initial={{ scale: 0.7, y: 15, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 12 }}
              className="font-display text-[62px] leading-none font-black text-ink select-none flex items-baseline"
            >
              <span>{progress}</span>
              <span className="text-xl font-bold ml-1 text-gray-500 font-aeonik">%</span>
            </motion.div>
          </div>

          {/* Interactive progress track bar */}
          <div className="w-full h-3 bg-white/60 border border-white/40 rounded-full overflow-hidden mb-6 shadow-inner relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange to-yellow rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          {/* Dynamic slang status message */}
          <div className="h-6 flex items-center justify-center">
            <motion.p
              key={phraseIdx}
              initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
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
