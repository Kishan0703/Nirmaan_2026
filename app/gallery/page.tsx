"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-paper text-ink p-4 sm:p-8 selection:bg-yellow selection:text-ink flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink/15 pb-6">
          <Link
            href="/"
            className="clay-card rounded-pill bg-ink px-5 py-2.5 text-xs sm:text-sm font-display uppercase font-black text-white hover:bg-red transition-all shadow-md flex items-center gap-2 active:translate-y-0.5"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 bg-yellow/40 px-4 py-2 rounded-full border border-yellow/60 shadow-sm">
            <Sparkles size={16} className="text-orange" />
            <span className="font-display text-xs uppercase font-black tracking-wider text-ink">
              NIRMAAN 2026 ARCHIVES
            </span>
          </div>
        </div>

        {/* Hero Section with Prominent "COMING SOON" Banner */}
        <div className="clay-card bg-purple p-8 sm:p-16 rounded-brand text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center my-8 border-2 border-white/30">
          {/* Floating Retro Icon */}
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-[28px] bg-yellow text-ink border-2 border-white flex items-center justify-center shadow-xl mb-6 transform -rotate-3 animate-bounce">
            <ImageIcon size={48} className="text-ink" />
          </div>

          {/* Coming Soon Pill */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full border-2 border-white/40 mb-4 shadow-md">
            <Clock size={16} className="text-yellow animate-spin" />
            <span className="font-display text-xs sm:text-sm uppercase font-black tracking-widest text-yellow">
              OFFICIAL ARCHIVES // STATUS
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-hero uppercase text-white font-black leading-none tracking-tight">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm sm:text-body-xl text-white/90 font-semibold leading-relaxed">
            The full high-resolution Nirmaan 2026 event photo gallery and video rewind reel will drop immediately following the Grand Finale!
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="clay-card rounded-pill bg-yellow px-8 py-4 text-sm font-display uppercase font-black text-ink hover:scale-105 transition-all shadow-xl inline-block active:translate-y-0.5"
            >
              Explore Homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Footer stamp */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-ink/15 flex items-center justify-between text-xs font-display uppercase font-black text-ink/60">
        <span>NIRMAAN 2026</span>
        <span>BMSIT BANGALORE</span>
      </div>
    </div>
  );
}
