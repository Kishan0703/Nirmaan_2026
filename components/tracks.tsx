"use client";

import { AlertTriangle, Info, ShieldAlert, Cpu, HeartPulse, Zap, Sprout, Sparkles } from "lucide-react";
import { trackCards } from "@/lib/data";
import { REGISTRATION_URL } from "@/lib/config";

const TRACK_ICONS = [ShieldAlert, Cpu, HeartPulse, Zap, Sprout, Sparkles];

export function Tracks({ onBook }: { onBook?: () => void }) {
  return (
    <section id="tracks" className="my-gap grid gap-gap" data-reveal>
      <div className="flex flex-col rounded-brand p-4 sm:p-box bg-paper clay-card">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink/15 pb-6">
          <div>
            <span className="text-xs font-display uppercase tracking-[0.25em] font-black text-ink/60 block mb-1">
              CHALLENGE DOMAINS & TRACKS
            </span>
            <h2 className="font-display text-section uppercase tracking-tight text-ink font-black">
              Domain Tracks
            </h2>
          </div>
          <p className="max-w-[580px] text-sm sm:text-body-xl font-semibold text-ink/80 leading-snug">
            Choose your innovation domain. 6 specialized tracks spanning Cyber-Physical Security, Smart Mobility, HealthTech, Deep Tech & Edge AI, AgriTech, and Open Innovation.
          </p>
        </div>

        {/* Notice Banner for Hardware Teams */}
        <div className="mt-6 rounded-[18px] bg-red/10 border-2 border-red/30 p-4 flex items-start sm:items-center gap-3 text-ink shadow-xs">
          <div className="h-9 w-9 rounded-[12px] bg-red text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle size={20} />
          </div>
          <div className="text-xs sm:text-sm font-bold leading-relaxed">
            <span className="font-black uppercase text-red font-display tracking-wide mr-1.5">Notice for Hardware Teams:</span>
            No hardware components, microcontrollers, sensors, or dev kits will be provided on-site. Participating teams in Hardware & Physical-World tracks must bring all their own components and tools.
          </div>
        </div>

        {/* 6 Official Domain Tracks Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trackCards.map((track, idx) => {
            const TrackIcon = TRACK_ICONS[idx % TRACK_ICONS.length];

            return (
              <div
                key={track.title}
                className="rounded-[24px] p-5 sm:p-6 clay-card bg-paper shadow-md border-2 border-white/60 flex flex-col justify-between hover:scale-[1.02] transition-transform relative overflow-hidden"
              >
                <div>
                  {/* Top Badge + Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full font-display text-[10px] uppercase font-black tracking-wider text-ink ${track.color} border border-ink/10 shadow-xs`}>
                      {track.badge}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-ink/10 flex items-center justify-center text-ink shrink-0">
                      <TrackIcon size={16} />
                    </div>
                  </div>

                  {/* Track Title */}
                  <h3 className="font-display text-lg sm:text-xl uppercase font-black text-ink leading-snug mb-2">
                    {track.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-bold text-gray-800 leading-relaxed">
                    {track.prompt}
                  </p>
                </div>

                {/* Track Note (If applicable) */}
                {track.note && (
                  <div className="mt-4 pt-3 border-t border-ink/10">
                    <div className="rounded-[14px] bg-yellow/20 border-l-4 border-yellow p-3 flex items-start gap-2 shadow-xs">
                      <Info size={16} className="text-ink shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs font-bold text-ink leading-snug">
                        {track.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Registration CTA */}
        <div className="mt-8 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-bold text-ink/70">
            Ready to build? Lock in your track choice and start shaping your prototype brief.
          </p>

          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-card inline-flex items-center justify-center rounded-pill bg-purple px-6 py-3.5 text-sm font-display uppercase font-black text-white hover:bg-purple-light transition-transform hover:-translate-y-0.5 shadow-lg"
          >
            Register for Domain Tracks
          </a>
        </div>

      </div>
    </section>
  );
}
