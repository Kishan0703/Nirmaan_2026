"use client";

import { motion } from "framer-motion";
import { scheduleTimeline } from "@/lib/data";
import { Trophy3D } from "./trophy-3d";

export function ScheduleBoard() {
  return (
    <section id="schedule" className="my-gap grid gap-gap lg:grid-cols-[0.80fr_1.20fr]" data-reveal>
      {/* Left 3D Trophy Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange p-4 sm:p-box clay-card flex flex-col justify-between min-h-0 lg:min-h-[520px] overflow-hidden"
      >
        <div>
          <h2 className="font-display text-2xl sm:text-section uppercase text-ink font-black leading-tight break-words">
            A run-of-show for builders
          </h2>
          <p className="mt-3 sm:mt-4 max-w-[620px] text-sm sm:text-body-xl text-ink font-semibold leading-snug break-words">
            The Nirmaan 2026 Grand Finale schedule on Sep 25 & Sep 26: check-in, launch sprint, submission freeze, judging, and award ceremony.
          </p>
        </div>

        {/* 3D Metallic Trophy Cup */}
        <div className="my-2 sm:my-3 relative h-[220px] sm:h-[270px] lg:h-[290px] w-full flex items-center justify-center overflow-hidden">
          <Trophy3D />
        </div>

        {/* Bottom Feature Badges */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 border-t border-ink/10 pt-3 sm:pt-4">
          {["24h build", "Sep 25 - Sep 26", "5 mentor rooms", "Grand Finale Stage"].map((item) => (
            <div
              key={item}
              className="rounded-[12px] bg-paper px-2.5 sm:px-4 py-2 sm:py-2.5 font-display text-[10px] sm:text-xs uppercase text-ink font-black clay-card text-center truncate"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Schedule Items - Dedicated Sep 25 & Sep 26 Grand Finale Schedule */}
      <div className="rounded-brand bg-paper p-4 sm:p-6 clay-card flex flex-col justify-between overflow-hidden">
        <div>
          {/* Header Label */}
          <div className="flex items-center justify-between px-1 mb-5 border-b border-ink/10 pb-3">
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-widest font-black text-ink/70">
              NIRMAAN 2026 // GRAND FINALE SCHEDULE
            </span>
            <span className="font-display text-[10px] sm:text-xs uppercase font-black text-ink bg-yellow px-3.5 py-1 rounded-full shadow-xs">
              SEP 25 & SEP 26 📅
            </span>
          </div>

          {/* 2-Day Schedule Columns (Sep 25 & Sep 26) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {scheduleTimeline.map((group) => (
              <div key={group.date} className="flex flex-col gap-3 rounded-[20px] bg-white/60 p-4 border border-white/60 clay-card shadow-xs">
                {/* Date Header Badge */}
                <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-2.5">
                  <span className="rounded-[10px] bg-ink text-paper px-3.5 py-1 font-display text-xs sm:text-sm uppercase font-black tracking-wider clay-card shadow-sm">
                    🗓 {group.date}
                  </span>
                  <span className="font-display text-[10px] uppercase font-black text-ink/60">
                    {group.date === "Sep 25" ? "DAY 1 · BUILD LAUNCH" : "DAY 2 · DEMO & PRIZES"}
                  </span>
                </div>

                {/* Event Items under this Day */}
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <article
                      key={`${group.date}-${item.time}-${item.title}`}
                      className="schedule-row flex flex-col gap-2 rounded-[14px] bg-white/90 p-3.5 shadow-xs hover:scale-[1.02] transition-all border border-white/80 overflow-hidden clay-card"
                    >
                      {/* Time Pill */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-[8px] ${item.color} clay-card shadow-xs w-fit`}>
                        <span className="font-display text-[10px] sm:text-xs uppercase font-black tracking-tight">
                          {item.time}
                        </span>
                      </div>

                      {/* Title & Detail */}
                      <div className="min-w-0">
                        <h3 className="font-display text-xs sm:text-sm uppercase leading-snug text-ink font-black break-words">
                          {item.title}
                        </h3>
                        {item.detail && (
                          <p className="mt-1 text-[11px] text-gray-700 font-bold leading-normal break-words">
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
