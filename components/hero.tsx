"use client";

import { ArrowUpRight } from "@/components/icons";
import { InteractiveTiltCard } from "./helpers";
import { REGISTRATION_URL } from "@/lib/config";
import { liveMetrics } from "@/lib/data";

export function Hero({ onBook }: { onBook?: () => void }) {
  const registerCtaClassName =
    "clay-card rounded-pill bg-yellow text-ink px-6 py-3.5 text-base sm:text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30 flex items-center gap-2 shadow-xl";

  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-60px)] sm:min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft bg-paper clay-grid">
      
      {/* Decorative Gradient Highlights */}
      <div className="absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-purple/20 blur-[100px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-[380px] w-[380px] rounded-full bg-yellow/20 blur-[100px] pointer-events-none" />

      {/* Hero Main Content */}
      <div className="relative z-10 grid min-h-[calc(100dvh-60px)] sm:min-h-[calc(100dvh-50px)] content-between gap-6 px-4 py-6 text-ink sm:px-8 sm:py-8">
        
        {/* Top Header Row & Live Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          {/* Main Hero Branding Box */}
          <div className="max-w-[720px] flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-yellow border-2 border-ink/20 px-3.5 py-1 text-ink font-display text-xs uppercase font-black tracking-wider shadow-xs">
                Reskill15 × Coding Club × Alterino
              </span>
              <span className="rounded-full bg-purple text-white px-3.5 py-1 font-display text-xs uppercase font-black tracking-wider shadow-xs">
                24-Hour Hackathon
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-ink tracking-tight leading-[0.95] drop-shadow-sm">
              NIRMAAN <span className="text-purple">2026</span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-gray-800 leading-snug max-w-[620px]">
              Build, innovate, and impact the future. Join 420+ top builders in a high-stakes 24-hour national hackathon.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-[12px] bg-red/15 text-red font-display text-xs uppercase font-black border border-red/30">
                BUILD
              </span>
              <span className="px-3.5 py-1.5 rounded-[12px] bg-blue/15 text-blue font-display text-xs uppercase font-black border border-blue/30">
                INNOVATE
              </span>
              <span className="px-3.5 py-1.5 rounded-[12px] bg-green/15 text-green font-display text-xs uppercase font-black border border-green/30">
                IMPACT
              </span>
            </div>
          </div>

          {/* Live Event Metrics Box */}
          <InteractiveTiltCard className="w-full max-w-[340px] sm:max-w-[380px] shrink-0">
            <div className="clay-card p-4 sm:p-5 text-ink bg-white/90 backdrop-blur-md rounded-[20px] sm:rounded-[24px] border-2 border-white/80 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-green-light border border-white/30 px-3 py-1 text-ink font-display text-[10px] uppercase font-black flex items-center gap-1.5 shadow-sm">
                  Live event
                </span>
                <span className="pulse-dot" aria-hidden="true" />
              </div>
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                {liveMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-[12px] sm:rounded-[14px] bg-paper px-3 py-2.5 sm:px-4 sm:py-3 text-ink shadow-sm border border-white/40">
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-ink/60">{label}</p>
                    <p className="mt-0.5 sm:mt-1 font-display text-base sm:text-[18px] leading-none uppercase font-black text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </InteractiveTiltCard>
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="max-w-[1180px] flex flex-wrap items-center gap-3 sm:gap-4">
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
            Explore Domain Tracks
          </a>
        </div>
      </div>
    </section>
  );
}
