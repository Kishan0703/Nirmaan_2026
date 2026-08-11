"use client";

import { motion } from "framer-motion";
import { scheduleItems } from "@/lib/data";
import { Trophy3D } from "./trophy-3d";

export function ScheduleBoard() {
  return (
    <section id="schedule" className="my-gap grid gap-gap lg:grid-cols-[.9fr_1.1fr]" data-reveal>
      {/* Left 3D Trophy Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange p-4 sm:p-box clay-card flex flex-col justify-between min-h-0 lg:min-h-[560px] overflow-hidden"
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
        <div className="my-3 sm:my-2 flex items-center justify-center h-[200px] sm:h-[260px] lg:h-[300px]">
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

      {/* Right Schedule Items List */}
      <div className="rounded-brand bg-paper p-3 sm:p-4 clay-card overflow-hidden">
        <div className="grid gap-3">
          {scheduleItems.map((item) => (
            <article
              key={`${item.time}-${item.title}`}
              className="schedule-row flex flex-col sm:grid sm:grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_130px] gap-2.5 sm:gap-4 rounded-[18px] bg-white/70 p-3 sm:p-4 shadow-sm hover:translate-x-1 transition-transform border border-white/50 overflow-hidden"
            >
              {/* Time Badge Box */}
              <div className={`flex sm:grid items-center justify-between sm:justify-center px-3.5 py-2 sm:p-0 min-h-0 sm:min-h-[66px] rounded-[12px] ${item.color} clay-card shadow-sm`}>
                <span className="font-display text-xs sm:text-[20px] lg:text-[22px] leading-none uppercase font-black text-ink">
                  {item.time}
                </span>
                <span className="sm:hidden font-display text-[9px] uppercase font-black text-ink/70 tracking-wider">
                  {item.day}
                </span>
              </div>

              {/* Title & Description */}
              <div className="self-center min-w-0">
                <div className="hidden sm:inline-block mb-1 px-2 py-0.5 rounded-[6px] bg-ink/10 font-display text-[10px] uppercase font-black text-ink/70">
                  {item.day}
                </div>
                <h3 className="font-display text-sm sm:text-[18px] uppercase leading-snug text-ink font-black break-words">
                  {item.title}
                </h3>
                <p className="mt-0.5 sm:mt-1 text-xs text-gray-800 font-bold leading-normal break-words">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
