"use client";

import { motion } from "framer-motion";
import { scheduleTimeline } from "@/lib/data";
import { Trophy3D } from "./trophy-3d";

export function ScheduleBoard() {
  return (
    <section id="schedule" className="my-gap grid gap-gap lg:grid-cols-[0.85fr_1.15fr]" data-reveal>
      {/* Left 3D Trophy Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange p-4 sm:p-box clay-card flex flex-col justify-between min-h-0 lg:min-h-[620px] overflow-hidden"
      >
        <div>
          <h2 className="font-display text-2xl sm:text-section uppercase text-ink font-black leading-tight break-words">
            A run-of-show for builders
          </h2>
          <p className="mt-3 sm:mt-4 max-w-[620px] text-sm sm:text-body-xl text-ink font-semibold leading-snug break-words">
            The Nirmaan schedule keeps the hackathon moving: check-in, launch brief, team lock, mentor checkpoints, submission freeze, judging, and demo day.
          </p>
        </div>

        {/* 3D Metallic Trophy Cup (Enlarged) */}
        <div className="my-2 sm:my-3 relative h-[280px] sm:h-[340px] lg:h-[380px] w-full flex items-center justify-center overflow-hidden">
          <Trophy3D />
        </div>

        {/* Bottom Feature Badges */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 border-t border-ink/10 pt-3 sm:pt-5">
          {["24h build", "2 checkpoints", "5 mentor rooms", "1 demo stage"].map((item) => (
            <div
              key={item}
              className="rounded-[12px] bg-paper px-2.5 sm:px-4 py-2 sm:py-3 font-display text-[10px] sm:text-xs uppercase text-ink font-black clay-card text-center truncate"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Schedule Items List - Responsive Grid (Row & Column Layout) */}
      <div className="rounded-brand bg-paper p-4 sm:p-6 clay-card overflow-hidden max-h-[680px] sm:max-h-[760px] overflow-y-auto no-scrollbar flex flex-col justify-between">
        <div>
          {/* Header Label */}
          <div className="flex items-center justify-between px-1 mb-5 border-b border-ink/10 pb-3">
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-widest font-black text-ink/70">
              NIRMAAN 2026 // EVENT CALENDAR
            </span>
            <span className="font-display text-[10px] sm:text-xs uppercase font-black text-ink bg-yellow px-3.5 py-1 rounded-full shadow-xs">
              GRID TIMELINE 📅
            </span>
          </div>

          {/* Schedule Timeline Grouped by Date in Rows and Columns */}
          <div className="space-y-6">
            {scheduleTimeline.map((group) => (
              <div key={group.date} className="flex flex-col gap-3">
                {/* Date Header Badge */}
                <div className="flex items-center gap-2">
                  <span className="rounded-[10px] bg-ink text-paper px-3.5 py-1 font-display text-xs sm:text-sm uppercase font-black tracking-wider clay-card shadow-sm">
                    🗓 {group.date}
                  </span>
                  <div className="h-[2px] flex-1 bg-ink/15 rounded-full" />
                </div>

                {/* Event Cards Grid (2 Columns on MD+ screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {group.items.map((item) => (
                    <article
                      key={`${group.date}-${item.time}-${item.title}`}
                      className="schedule-row flex flex-col justify-between gap-3 rounded-[18px] bg-white/80 p-4 shadow-sm hover:scale-[1.02] transition-transform border border-white/60 overflow-hidden clay-card"
                    >
                      {/* Time Badge Box */}
                      <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-[12px] ${item.color} clay-card shadow-sm`}>
                        <span className="font-display text-xs sm:text-sm uppercase font-black text-ink tracking-tight truncate">
                          {item.time}
                        </span>
                        <span className="font-display text-[9px] uppercase font-black text-ink/70 tracking-wider shrink-0">
                          {group.date}
                        </span>
                      </div>

                      {/* Title & Detail */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xs sm:text-sm uppercase leading-snug text-ink font-black break-words">
                          {item.title}
                        </h3>
                        {item.detail && (
                          <p className="mt-1 text-[11px] text-gray-800 font-bold leading-normal break-words">
                            {item.detail}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
