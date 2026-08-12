"use client";

import { motion } from "framer-motion";
import { scheduleItems } from "@/lib/data";
import { Trophy3D } from "./trophy-3d";

export function ScheduleBoard() {
  return (
    <section id="schedule" className="my-gap grid gap-gap lg:grid-cols-[0.80fr_1.20fr]" data-reveal>
      {/* Left 3D Trophy Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange p-4 sm:p-box clay-card flex flex-col justify-between min-h-0 lg:min-h-[580px] overflow-hidden"
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
        <div className="my-2 sm:my-3 relative h-[250px] sm:h-[290px] lg:h-[310px] w-full flex items-center justify-center overflow-hidden">
          <Trophy3D />
        </div>

        {/* Bottom Feature Badges */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 border-t border-ink/10 pt-3 sm:pt-4">
          {["24h build", "2 checkpoints", "5 mentor rooms", "1 demo stage"].map((item) => (
            <div
              key={item}
              className="rounded-[12px] bg-paper px-2.5 sm:px-4 py-2 sm:py-2.5 font-display text-[10px] sm:text-xs uppercase text-ink font-black clay-card text-center truncate"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Schedule Items - Compact Small Box Tiles Grid (Zero Scroll) */}
      <div className="rounded-brand bg-paper p-3.5 sm:p-5 clay-card flex flex-col justify-between overflow-hidden">
        <div>
          {/* Header Label */}
          <div className="flex items-center justify-between px-1 mb-3 sm:mb-4 border-b border-ink/10 pb-2">
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-widest font-black text-ink/70">
              NIRMAAN 2026 // EVENT CALENDAR
            </span>
            <span className="font-display text-[10px] sm:text-xs uppercase font-black text-ink bg-yellow px-3 py-1 rounded-full shadow-xs">
              FULL TIMELINE 📅
            </span>
          </div>

          {/* 11 Small Box Cards Grid (3 Columns Desktop, 2 Columns Mobile - Zero Scroll) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {scheduleItems.map((item) => (
              <article
                key={`${item.date}-${item.time}-${item.title}`}
                className="schedule-row flex flex-col justify-between gap-1.5 rounded-[12px] sm:rounded-[14px] bg-white/90 p-2 sm:p-2.5 shadow-xs hover:scale-[1.03] transition-all border border-white/80 overflow-hidden clay-card min-h-[84px] sm:min-h-[92px]"
              >
                {/* Date & Time Header Badge */}
                <div className={`flex items-center justify-between gap-1 px-2 py-1 rounded-[8px] ${item.color} clay-card shadow-xs`}>
                  <span className="font-display text-[9px] sm:text-[10px] uppercase font-black text-ink tracking-wider truncate">
                    🗓 {item.date}
                  </span>
                  <span className="font-display text-[8.5px] sm:text-[9.5px] uppercase font-black text-ink/90 tracking-tight shrink-0">
                    {item.time}
                  </span>
                </div>

                {/* Title & Detail */}
                <div className="min-w-0 flex-1 flex flex-col justify-center my-0.5">
                  <h3 className="font-display text-[10px] sm:text-[11px] uppercase leading-snug text-ink font-black break-words line-clamp-2">
                    {item.title}
                  </h3>
                  {item.detail && (
                    <p className="mt-0.5 text-[8px] sm:text-[9px] text-gray-700 font-bold leading-tight break-words line-clamp-1">
                      {item.detail}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
