"use client";

import { useState } from "react";
import { trackCards, TrackType } from "@/lib/data";
import { Code2, Cpu, CheckCircle2, Sparkles, Layers, Target } from "lucide-react";

export function Tracks({ onBook }: { onBook: () => void }) {
  const [activeCategory, setActiveCategory] = useState<"all" | TrackType>("all");

  const filteredTracks = activeCategory === "all"
    ? trackCards
    : trackCards.filter((t) => t.category === activeCategory);

  return (
    <section id="tracks" className="my-gap grid gap-gap" data-reveal>
      <div className="flex flex-col rounded-brand p-4 sm:p-box bg-paper clay-card relative overflow-hidden">
        
        {/* Top Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-yellow animate-spin" />
              <span className="font-display text-xs uppercase tracking-widest text-ink/60 font-black">
                CHALLENGE ARENAS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-section uppercase tracking-tight text-ink font-black mt-1">
              Problem Statements & Track Objectives
            </h2>
            <p className="mt-2 max-w-[800px] text-xs sm:text-body-xl font-semibold text-ink/80 leading-snug">
              Nirmaan 2026 problem statements are split into 2 primary innovation tracks: <strong className="text-blue">Software Systems</strong> and <strong className="text-green">Hardware Innovation</strong>. Each track defines key technical objectives for final evaluation.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/60 p-1.5 rounded-full border border-ink/15 shadow-sm">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-display text-xs uppercase font-black transition-all flex items-center gap-1.5 ${
                activeCategory === "all"
                  ? "bg-ink text-yellow shadow-md scale-105"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              <Layers size={14} />
              <span>All Tracks ({trackCards.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory("software")}
              className={`px-4 py-2 rounded-full font-display text-xs uppercase font-black transition-all flex items-center gap-1.5 ${
                activeCategory === "software"
                  ? "bg-blue text-white shadow-md scale-105"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              <Code2 size={14} />
              <span>Software</span>
            </button>

            <button
              onClick={() => setActiveCategory("hardware")}
              className={`px-4 py-2 rounded-full font-display text-xs uppercase font-black transition-all flex items-center gap-1.5 ${
                activeCategory === "hardware"
                  ? "bg-green text-ink shadow-md scale-105"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              <Cpu size={14} />
              <span>Hardware</span>
            </button>
          </div>
        </div>

        {/* Problem Statements Grid */}
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
          {filteredTracks.map((track) => {
            const isSoftware = track.category === "software";

            return (
              <div
                key={track.id}
                className="clay-card bg-white p-5 sm:p-6 rounded-[24px] border-2 border-white/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill Tag & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display text-[10px] sm:text-xs uppercase font-black shadow-sm ${
                        isSoftware ? "bg-blue text-white" : "bg-green text-ink"
                      }`}
                    >
                      {isSoftware ? <Code2 size={13} /> : <Cpu size={13} />}
                      <span>{isSoftware ? "Software Track" : "Hardware Track"}</span>
                    </span>

                    <span className="font-display text-[10px] uppercase font-black text-ink/40 tracking-wider">
                      NIRMAAN 2026
                    </span>
                  </div>

                  {/* PS Title */}
                  <h3 className="font-display text-xl sm:text-2xl uppercase text-ink font-black leading-tight">
                    {track.title}
                  </h3>

                  {/* PS Overview Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-ink/80 font-bold leading-relaxed">
                    {track.description}
                  </p>

                  {/* Objectives Checklist Section */}
                  <div className="mt-4 pt-4 border-t border-ink/10 space-y-2.5">
                    <div className="flex items-center gap-1.5 font-display text-xs uppercase font-black text-ink/70 tracking-wider">
                      <Target size={14} className="text-orange" />
                      <span>Key Track Objectives:</span>
                    </div>

                    <ul className="space-y-2">
                      {track.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-ink/90 leading-snug">
                          <CheckCircle2 size={15} className="text-green shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-5 pt-4 border-t border-ink/10 flex flex-wrap items-center gap-1.5">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-paper border border-ink/15 text-ink/80 px-2.5 py-1 rounded-full font-display text-[9px] sm:text-[10px] uppercase font-black shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-bold text-ink/70">
            Have a custom idea? Open Innovation software and hardware builds are welcome within these 2 main categories.
          </p>

          <button
            onClick={onBook}
            className="clay-card rounded-pill bg-purple px-8 py-4 text-sm font-display uppercase font-black text-white hover:scale-105 transition-all shadow-lg active:translate-y-0.5"
          >
            Register for Nirmaan
          </button>
        </div>
      </div>
    </section>
  );
}
