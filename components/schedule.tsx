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

        {/* 3D Metallic Trophy Cup */}
        <div className="my-2 sm:my-3 relative h-[260px] sm:h-[300px] lg:h-[320px] w-full flex items-center justify-center overflow-hidden">
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

      {/* Right Schedule Items List - 2 Column Small Box Grid (Laptop + Mobile) */}
      <div className="rounded-brand bg-paper p-3 sm:p-6 clay-card overflow-hidden max-h-[680px] sm:max-h-[760px] overflow-y-auto no-scrollbar flex flex-col justify-between">
        <div>
          {/* Header Label */}
          <div className="flex items-center justify-between px-1 mb-4 border-b border-ink/10 pb-2.5">
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-widest font-black text-ink/70">
              NIRMAAN 2026 // EVENT CALENDAR
            </span>
            <span className="font-display text-[10px] sm:text-xs uppercase font-black text-ink bg-yellow px-3 py-1 rounded-full shadow-xs">
              GRID TIMELINE 📅
            </span>
          </div>

          {/* Schedule Timeline Grouped by Date - 2 Column Small Box Grid Everywhere */}
          <div className="space-y-5">
            {scheduleTimeline.map((group) => (
              <div key={group.date} className="flex flex-col gap-2.5">
                {/* Date Header Badge */}
                <div className="flex items-center gap-2">
                  <span className="rounded-[10px] bg-ink text-paper px-3 py-0.5 font-display text-[11px] sm:text-xs uppercase font-black tracking-wider clay-card shadow-sm">
                    🗓 {group.date}
                  </span>
                  <div className="h-[2px] flex-1 bg-ink/15 rounded-full" />
                </div>

                {/* Event Cards Grid - 2 Columns on Mobile & Laptop */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {group.items.map((item) => (
                    <article
                      key={`${group.date}-${item.time}-${item.title}`}
                      className="schedule-row flex flex-col justify-between gap-2 rounded-[14px] sm:rounded-[16px] bg-white/85 p-2.5 sm:p-3.5 shadow-sm hover:scale-[1.02] transition-transform border border-white/60 overflow-hidden clay-card"
                    >
                      {/* Time Badge Box */}
                      <div className={`flex items-center justify-center px-2 py-1.5 rounded-[10px] ${item.color} clay-card shadow-xs text-center`}>
                        <span className="font-display text-[10px] sm:text-xs uppercase font-black text-ink tracking-tight truncate">
                          {item.time}
                        </span>
                      </div>

                      {/* Title & Detail */}
                      <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <h3 className="font-display text-[11px] sm:text-xs uppercase leading-snug text-ink font-black break-words">
                          {item.title}
                        </h3>
                        {item.detail && (
                          <p className="mt-0.5 text-[9px] sm:text-[10px] text-gray-700 font-bold leading-tight break-words">
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
