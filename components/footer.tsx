"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contact" className="mt-gap pb-5" data-reveal>
      {/* Grid workspace container matching units.gr layout */}
      <div
        className="relative h-[180px] sm:h-[240px] lg:h-[320px] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft bg-[#f2eae1] clay-card"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      >
        {/* Animated scattered grid block snap-elements */}
        <motion.div
          animate={{
            y: [0, -12, 0, 10, 0],
            rotate: [0, 8, -6, 4, 0],
            scale: [1, 1.08, 0.96, 1.04, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.25, rotate: 15 }}
          className="absolute left-[20%] top-[10%] h-9 w-9 bg-purple border border-white/20 shadow-sm rounded-[4px] cursor-pointer"
        />

        <motion.div
          animate={{
            y: [0, 14, -8, 12, 0],
            rotate: [0, -10, 8, -4, 0],
            scale: [1, 0.95, 1.1, 0.98, 1],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          whileHover={{ scale: 1.25, rotate: -15 }}
          className="absolute left-[70%] top-[20%] h-9 w-9 bg-blue border border-white/20 shadow-sm rounded-[4px] cursor-pointer"
        />

        <motion.div
          animate={{
            y: [0, -16, 10, -6, 0],
            rotate: [0, 12, -12, 6, 0],
            scale: [1, 1.12, 0.92, 1.05, 1],
          }}
          transition={{
            duration: 5.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          whileHover={{ scale: 1.25, rotate: 20 }}
          className="absolute left-[50%] top-[40%] h-9 w-9 bg-yellow border border-white/20 shadow-sm rounded-[4px] cursor-pointer"
        />

        <motion.div
          animate={{
            y: [0, 10, -14, 8, 0],
            rotate: [0, -8, 10, -5, 0],
            scale: [1, 0.96, 1.09, 0.97, 1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          whileHover={{ scale: 1.25, rotate: -20 }}
          className="absolute left-[33%] top-[45%] h-9 w-9 bg-orange border border-white/20 shadow-sm rounded-[4px] cursor-pointer"
        />

        {/* Giant branding typography with snapped accents */}
        <div className="absolute bottom-6 left-8 z-10 select-none">
          <h2 className="font-display text-[clamp(60px,10vw,120px)] leading-none text-ink tracking-tighter font-black lowercase relative">
            nirmaan.
            {/* Embedded custom color spots overlapping letters */}
            <motion.span
              animate={{ rotate: [45, 90, 45], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[16px] bottom-0 h-4 w-4 bg-red z-20 rounded-[2px] inline-block"
            />
            <motion.span
              animate={{ y: [0, -4, 0], scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[105px] bottom-[18px] h-6 w-2.5 bg-green z-20 rounded-[2px] inline-block"
            />
          </h2>
        </div>
      </div>

      {/* Footer bottom details & navigation links */}
      <div className="mt-6 flex flex-wrap justify-between gap-5 items-end">
        <div className="flex flex-col gap-1 text-left">
          <p className="font-display text-[14px] uppercase tracking-tight text-ink font-black">
            © 2026 NIRMAAN 2026
          </p>
        </div>

        {/* Outline Pill navigation items */}
        <div className="flex flex-wrap gap-2.5" aria-label="Footer links">
          <a
            href="#faq"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            FAQs
          </a>
          <Link
            href="/privacy"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Cookies Policy
          </Link>
          <span className="w-[1px] h-6 bg-ink/20 self-center hidden md:inline-block" />
        </div>
      </div>
    </footer>
  );
}
