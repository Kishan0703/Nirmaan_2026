"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "@/components/icons";
import { InteractiveTiltCard } from "./helpers";
import { REGISTRATION_URL } from "@/lib/config";
import { liveMetrics } from "@/lib/data";

export function Hero({ onBook }: { onBook?: () => void }) {
  const registerCtaClassName =
    "clay-card rounded-pill bg-yellow text-ink px-6 py-3.5 text-base sm:text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30 flex items-center gap-2 shadow-xl";

  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-60px)] sm:min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft bg-paper">
      
      {/* Background Hero Image */}
      <Image
        src="/assets/images/nirmaan-hero.png"
        alt="Hackathon teams building prototypes in a design studio"
        fill
        priority
        className="object-cover opacity-75 filter saturate-110 contrast-110"
        sizes="(min-width: 1024px) 88vw, 100vw"
      />

      <div className="clay-grid absolute inset-0 mix-blend-multiply opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      
      <div className="relative z-10 grid min-h-[calc(100dvh-60px)] sm:min-h-[calc(100dvh-50px)] content-between gap-6 px-4 py-6 text-white sm:px-8 sm:py-8">
        
        {/* Top bar details (Live Event Metrics) */}
        <div className="flex flex-wrap items-start justify-end gap-5">
          <InteractiveTiltCard className="w-full max-w-[340px] sm:max-w-[380px]">
            <div className="clay-card p-4 sm:p-5 text-ink bg-paper/90 backdrop-blur-md rounded-[20px] sm:rounded-[24px] border-2 border-white/60 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-green-light border border-white/30 px-3 py-1 text-ink font-display text-[10px] uppercase font-black flex items-center gap-1.5 shadow-sm">
                  Live event
                </span>
                <span className="pulse-dot" aria-hidden="true" />
              </div>
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                {liveMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-[12px] sm:rounded-[14px] bg-white/70 px-3 py-2.5 sm:px-4 sm:py-3 text-ink shadow-sm border border-white/40">
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-ink/60">{label}</p>
                    <p className="mt-0.5 sm:mt-1 font-display text-base sm:text-[18px] leading-none uppercase font-black text-ink">{value}</p>
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
                    className={`drop-shadow-md ${colors[index] || "text-white"}`}
                    style={{ "--word-index": index } as CSSProperties}
                  >
                    {word}
                  </span>
                );
              })}
          </h1>
          <p className="mt-5 max-w-[900px] font-aeonik text-[clamp(20px,1.5vw,28px)] font-bold leading-[1.15] text-white drop-shadow">
            National-level 24-hour innovation challenge for student builders across India. Run an intense sprint from idea to working prototype with real-world impact.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {REGISTRATION_URL ? (
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={registerCtaClassName}
              >
                <span>Register on MastryHub</span>
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </a>
            ) : (
              <button
                type="button"
                onClick={onBook}
                className={registerCtaClassName}
              >
                <span>Register on MastryHub</span>
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </button>
            )}
            <a
              href="#tracks"
              className="clay-card rounded-pill bg-paper text-ink px-6 py-3.5 text-base sm:text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30 shadow-xl"
            >
              Explore Tracks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
