"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function PosterModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Dismiss modal on any key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/80 backdrop-blur-md cursor-pointer select-none"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={handleClose}
            className="relative max-w-[92vw] max-h-[88vh] w-[950px] aspect-[16/9] rounded-brand overflow-hidden clay-card border-4 border-white/60 shadow-2xl bg-[#0d0b14] flex items-center justify-center cursor-pointer"
          >
            {/* Poster Image Only (No text pill, no X close button) */}
            <Image
              src="/assets/images/nirmaan-hero-banner.jpg"
              alt="Nirmaan 2026 Official Hackathon Banner Poster"
              fill
              priority
              className="object-contain filter saturate-105 contrast-105 pointer-events-none"
              sizes="(min-width: 1024px) 900px, 92vw"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
