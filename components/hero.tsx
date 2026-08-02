"use client";

import Image from "next/image";
import { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { ArrowUpRight } from "@/components/icons";
import { InteractiveTiltCard } from "./helpers";
import { liveMetrics } from "@/lib/data";

export function Hero({ onBook }: { onBook?: () => void }) {
  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft lg:min-h-[calc(100dvh-50px)] bg-paper">
      <Image
        src="/assets/images/nirmaan-hero.png"
        alt="Hackathon teams building prototypes in a design studio"
        fill
        priority
        className="object-cover opacity-70 filter saturate-100 contrast-110"
        sizes="(min-width: 1024px) 88vw, 100vw"
      />
      <div className="clay-grid absolute inset-0 mix-blend-multiply opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      
      <div className="relative z-10 grid min-h-[calc(100dvh-50px)] content-between gap-8 px-6 py-8 text-white lg:px-10 lg:py-10">
        
        {/* Top bar details */}
        <div className="flex flex-wrap items-start justify-end gap-5">
          {/* Interactive 3D Live score panel (Claymorphic) */}
          <InteractiveTiltCard className="w-full max-w-[390px]">
            <div className="clay-card p-5 text-ink bg-paper/90 backdrop-blur-md rounded-[24px] border-2 border-white/60">
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-green-light border border-white/30 px-3 py-1.5 text-ink font-display text-[10px] uppercase font-black flex items-center gap-1.5 shadow-sm">
                  Live event
                </span>
                <span className="pulse-dot" aria-hidden="true" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {liveMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-[14px] bg-white/60 px-4 py-3 text-ink shadow-sm border border-white/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink/60">{label}</p>
                    <p className="mt-1 font-display text-[18px] leading-none uppercase font-black text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </InteractiveTiltCard>
        </div>

        {/* Big visual statement */}
        <div className="max-w-[1180px]">
          <h1 className="hero-title justify-start text-left font-display text-hero text-white tracking-tighter uppercase">
            {"Build. Innovate. Impact."
              .split(" ")
              .map((word, index) => {
                const colors = ["text-yellow font-black", "text-white", "text-green-light font-black"];
                return (
                  <span
                    key={`${word}-${index}`}
                    className={`drop-shadow-sm ${colors[index] || "text-white"}`}
                    style={{ "--word-index": index } as CSSProperties}
                  >
                    {word}
                  </span>
                );
              })}
          </h1>
          <p className="mt-5 max-w-[900px] font-aeonik text-[clamp(20px,1.5vw,28px)] font-bold leading-[1.15] text-white">
            National-level 24-hour innovation challenge for student builders across India. Run an intense sprint from idea to working prototype with real-world impact.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="clay-card rounded-pill bg-yellow text-ink px-[30px] py-[15px] text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30 flex items-center gap-2"
            >
              <span>Register on Unstop</span>
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#tracks"
              className="clay-card rounded-pill bg-paper text-ink px-[30px] py-[15px] text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30"
            >
              Explore Tracks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
