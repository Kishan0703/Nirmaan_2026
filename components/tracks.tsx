"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCards, TrackCard, TrackType } from "@/lib/data";
import { Code2, Cpu, CheckCircle2, Sparkles, Layers, Target, X, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { REGISTRATION_URL } from "@/lib/config";

export function Tracks({ onBook }: { onBook: () => void }) {
  const [activeCategory, setActiveCategory] = useState<"all" | TrackType>("all");
  const [selectedPs, setSelectedPs] = useState<TrackCard | null>(null);

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
              Nirmaan 2026 problem statements are split into 2 primary innovation tracks: <strong className="text-blue">Software Systems</strong> and <strong className="text-green">Hardware Innovation</strong>. Click any card to inspect full PS objectives and deliverables.
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

        {/* Uniform Problem Statements Cards Grid */}
        <div className="mt-8 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTracks.map((track) => {
            const isSoftware = track.category === "software";

            return (
              <div
                key={track.id}
                onClick={() => setSelectedPs(track)}
                className="group cursor-pointer clay-card bg-white p-5 rounded-[22px] border-2 border-white/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill Tag & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display text-[10px] uppercase font-black shadow-sm ${
                        isSoftware ? "bg-blue text-white" : "bg-green text-ink"
                      }`}
                    >
                      {isSoftware ? <Code2 size={12} /> : <Cpu size={12} />}
                      <span>{isSoftware ? "Software Track" : "Hardware Track"}</span>
                    </span>

                    <span className="text-[10px] font-display uppercase font-black text-blue group-hover:underline flex items-center gap-0.5">
                      Inspect PS <ArrowUpRight size={12} />
                    </span>
                  </div>

                  {/* PS Title */}
                  <h3 className="font-display text-lg uppercase text-ink font-black leading-tight group-hover:text-blue transition-colors">
                    {track.title}
                  </h3>

                  {/* PS Brief Preview */}
                  <p className="mt-2 text-xs text-ink/75 font-bold leading-snug line-clamp-3">
                    {track.description}
                  </p>
                </div>

                {/* Card Bottom: Tech Tags + Inspect Action */}
                <div className="mt-4 pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {track.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-paper border border-ink/15 text-ink/80 px-2 py-0.5 rounded-full font-display text-[9px] uppercase font-black"
                      >
                        {tag}
                      </span>
                    ))}
                    {track.tags.length > 3 && (
                      <span className="text-[9px] font-display font-black text-ink/50">
                        +{track.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Interactive PS Details Popup Modal ── */}
        <AnimatePresence>
          {selectedPs && (
            <div
              onClick={() => setSelectedPs(null)}
              className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full bg-paper p-5 sm:p-8 rounded-brand border-2 border-white/50 shadow-2xl clay-card my-auto max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setSelectedPs(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-red text-white flex items-center justify-center font-black shadow-lg hover:scale-110 transition-transform z-20"
                >
                  <X size={18} />
                </button>

                {/* Modal Header */}
                <div className="border-b border-ink/15 pb-4 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-display text-xs uppercase font-black shadow-sm ${
                        selectedPs.category === "software" ? "bg-blue text-white" : "bg-green text-ink"
                      }`}
                    >
                      {selectedPs.category === "software" ? <Code2 size={14} /> : <Cpu size={14} />}
                      <span>{selectedPs.category === "software" ? "Software Track" : "Hardware Track"}</span>
                    </span>

                    <span className="font-display text-xs uppercase font-black text-ink/60">
                      PS DETAILS // NIRMAAN 2026
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl uppercase font-black text-ink leading-tight">
                    {selectedPs.title}
                  </h3>
                </div>

                {/* Modal Body */}
                <div className="space-y-5">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-wider font-black text-ink/60 mb-1 flex items-center gap-1.5">
                      <Zap size={14} className="text-yellow" /> Problem Statement Overview
                    </h4>
                    <p className="text-xs sm:text-body-xl font-semibold text-ink leading-relaxed bg-white/80 p-4 rounded-[16px] border border-ink/10 shadow-sm">
                      {selectedPs.description}
                    </p>
                  </div>

                  {/* Objectives Checklist */}
                  <div>
                    <h4 className="font-display text-xs uppercase tracking-wider font-black text-ink/60 mb-2 flex items-center gap-1.5">
                      <Target size={14} className="text-orange" /> Track Objectives & Core Requirements
                    </h4>
                    <div className="bg-white/80 p-4 rounded-[16px] border border-ink/10 shadow-sm space-y-2.5">
                      {selectedPs.objectives.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-ink leading-snug">
                          <CheckCircle2 size={16} className="text-green shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Deliverables & Stack */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="bg-white/80 p-4 rounded-[16px] border border-ink/10 shadow-sm">
                      <h5 className="font-display text-[11px] uppercase font-black text-ink/60 mb-1 flex items-center gap-1">
                        <ShieldCheck size={13} className="text-blue" /> Expected Deliverables
                      </h5>
                      <p className="text-xs font-semibold text-ink/90 leading-snug">
                        Working prototype demo, project GitHub repo / CAD files, and Round 1 pitch slides.
                      </p>
                    </div>

                    <div className="bg-white/80 p-4 rounded-[16px] border border-ink/10 shadow-sm">
                      <h5 className="font-display text-[11px] uppercase font-black text-ink/60 mb-1.5">
                        Recommended Tech Stack
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedPs.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-yellow/30 border border-yellow/60 text-ink px-2 py-0.5 rounded-full font-display text-[9px] uppercase font-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="mt-6 pt-4 border-t border-ink/15 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedPs(null)}
                    className="px-4 py-2.5 rounded-full font-display text-xs uppercase font-black text-ink/70 hover:text-ink"
                  >
                    Close Preview
                  </button>

                  {REGISTRATION_URL ? (
                    <a
                      href={REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-card rounded-pill bg-yellow text-ink px-6 py-3 text-xs sm:text-sm font-display uppercase font-black hover:scale-105 transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>Register for this Track</span>
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPs(null);
                        onBook();
                      }}
                      className="clay-card rounded-pill bg-yellow text-ink px-6 py-3 text-xs sm:text-sm font-display uppercase font-black hover:scale-105 transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>Register for this Track</span>
                      <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
