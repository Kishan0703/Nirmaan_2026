"use client";

import { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

function EventCommandBoard() {
  const nodes = [
    { label: "Plan", className: "left-[10%] top-[30%] bg-yellow border-white/20 shadow-md" },
    { label: "Launch", className: "left-[32%] top-[15%] bg-blue text-white border-white/20 shadow-md" },
    { label: "Run", className: "left-[50%] top-[60%] bg-red text-white border-white/20 shadow-md" },
    { label: "Judge", className: "left-[70%] top-[25%] bg-orange border-white/20 shadow-md" },
    { label: "Showcase", className: "left-[86%] top-[65%] bg-green-light border-white/20 shadow-md" }
  ];

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-brand border-2 border-white/40 bg-[#e3dcd6] clay-card">
      <div className="clay-grid absolute inset-0 opacity-45" />
      
      {/* Route line */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 120 220 Q 250 80 340 100 T 520 340 T 720 180 T 880 380" fill="none" stroke="#ef333a" strokeWidth="4" strokeDasharray="8, 6" />
      </svg>
      
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
          className={`clay-card absolute ${node.className} cursor-pointer px-4 py-2.5 rounded-full`}
          style={{ "--node-index": index } as CSSProperties}
        >
          <span className="block text-[11px] font-display uppercase leading-none font-black text-ink">{node.label}</span>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-8 rounded-[12px] clay-card bg-paper px-5 py-4 text-ink">
        <p className="font-display text-[14px] leading-tight uppercase flex items-center gap-1.5 font-black">
          <Terminal size={14} /> EVENT PATH
        </p>
        <span className="text-xs text-gray-700">Explore the event stages from plan to demo</span>
      </div>
    </div>
  );
}

export function EventOverview() {
  return (
    <section id="overview" className="grid gap-gap lg:grid-cols-[.7fr_1fr]" data-reveal>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex min-h-[520px] flex-col rounded-brand bg-yellow p-box clay-card"
      >
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Overview</span>
        <div className="mt-auto">
          <h2 className="font-display text-section uppercase tracking-tight text-ink">From idea to demo day</h2>
          <p className="mt-[20px] max-w-[620px] text-body-xl text-ink font-semibold leading-snug">
            Nirmaan brings builders through registration, team formation, challenge tracks, mentor rooms, submissions, judging, and final demos in one packed hackathon journey.
          </p>
        </div>
        <div className="mt-[30px] border-t border-ink/10 pt-5">
          <p className="text-sm font-bold uppercase tracking-wider text-ink/70">Event format</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-[10px] bg-blue px-4 py-2 font-display text-xs uppercase text-white clay-card">Campus</span>
            <span className="rounded-[10px] bg-orange px-4 py-2 font-display text-xs uppercase text-ink clay-card">Online</span>
            <span className="rounded-[10px] bg-green px-4 py-2 font-display text-xs uppercase text-ink clay-card">Hybrid</span>
          </div>
        </div>
      </motion.div>
      <EventCommandBoard />
    </section>
  );
}
