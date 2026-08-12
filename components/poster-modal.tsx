"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
            onClick={(e) => {
              // Clicking inside the poster card also closes it as requested ("as we click here and there it should go")
              handleClose();
            }}
            className="relative max-w-[92vw] max-h-[88vh] w-[950px] aspect-[16/9] rounded-brand overflow-hidden clay-card border-4 border-white/60 shadow-2xl bg-[#0d0b14] flex items-center justify-center group"
          >
            {/* Close Button Top-Right */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close poster"
              className="absolute top-3 right-3 z-20 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-red text-white flex items-center justify-center clay-card shadow-lg hover:scale-110 active:scale-95 transition-transform border-2 border-white"
            >
              <X size={22} />
            </button>

            {/* Hint Badge at Bottom */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-ink/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-white text-[11px] sm:text-xs font-display uppercase font-bold tracking-wider pointer-events-none shadow-md">
              Click anywhere to continue to site ✨
            </div>

            {/* Poster Image */}
            <Image
              src="/assets/images/nirmaan-hero-banner.jpg"
              alt="Nirmaan 2026 Official Hackathon Banner Poster"
              fill
              priority
              className="object-contain filter saturate-105 contrast-105"
              sizes="(min-width: 1024px) 900px, 92vw"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
