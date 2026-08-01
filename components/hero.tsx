"use client";

import Image from "next/image";
import { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { ArrowUpRight } from "@/components/icons";
import { CountdownTimer } from "./countdown-timer";
import { InteractiveTiltCard } from "./helpers";
import { liveMetrics } from "@/lib/data";

export function Hero({ onBook }: { onBook: () => void }) {
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
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex flex-col gap-3 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-pill border border-white/20 bg-ink/75 px-5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-yellow shadow-md"
            >
              <Radio size={14} className="animate-pulse text-red" />
              Nirmaan 2026 // Builder sprint
            </motion.div>
            <CountdownTimer />
          </div>

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
            {"Nirmaan builds hackathons that build back."
              .split(" ")
              .map((word, index) => {
                const colors = ["text-white", "text-yellow font-black", "text-white", "text-white", "text-green-light font-black", "text-green-light font-black"];
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
            Run a 36-hour design-led hackathon with tracks, teams, mentor rooms, live submissions, judging, sponsor booths, and demo day in one clean hosting flow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onBook}
              className="clay-card rounded-pill bg-ink px-[30px] py-[15px] text-white font-display text-lg uppercase font-black flex items-center gap-2 border-2 border-white/10"
            >
              <span>Start Hosting</span>
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </button>
            <a
              href="#schedule"
              className="clay-card rounded-pill bg-paper text-ink px-[30px] py-[15px] text-body-xl font-bold transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30"
            >
              View Playbook
            </a>
            <a
              href="/nirmaan_brochure.pdf"
              download="nirmaan_brochure.pdf"
              className="clay-card rounded-pill bg-paper text-ink px-[30px] py-[15px] text-body-xl font-bold transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30"
            >
              Brochure (PDF)
            </a>
          </div>
        </div>

        {/* bottom info board */}
        <div className="grid gap-3 lg:grid-cols-4">
          {[
            { value: "36 hrs", label: "Build sprint", bg: "bg-blue text-white hover:border-yellow", text: "text-yellow group-hover:text-green-light" },
            { value: "420", label: "Builders capacity", bg: "bg-yellow text-ink hover:border-blue", text: "text-purple group-hover:text-blue" },
            { value: "18", label: "Mentors on call", bg: "bg-orange text-white hover:border-yellow", text: "text-yellow group-hover:text-green-light" },
            { value: "₹8L", label: "Prize pool", bg: "bg-green text-ink hover:border-purple", text: "text-white group-hover:text-yellow" }
          ].map((stat, idx) => (
            <div key={stat.label} className={`clay-card rounded-[18px] ${stat.bg} px-5 py-4 border-2 border-white/20 transition-colors group`}>
              <p className={`font-display text-[clamp(28px,2vw,36px)] leading-none ${stat.text} uppercase font-black`}>{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-85">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
