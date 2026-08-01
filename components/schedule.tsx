"use client";

import { motion } from "framer-motion";
import { scheduleItems } from "@/lib/data";

export function ScheduleBoard() {
  return (
    <section id="schedule" className="my-gap grid gap-gap lg:grid-cols-[.9fr_1.1fr]" data-reveal>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange p-box clay-card"
      >
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Schedule</span>
        <h2 className="mt-[60px] font-display text-section uppercase text-ink">A run-of-show for builders</h2>
        <p className="mt-4 max-w-[620px] text-body-xl text-ink font-semibold leading-snug">
          The Nirmaan schedule keeps the hackathon moving: check-in, launch brief, team lock, mentor checkpoints, submission freeze, judging, and demo day.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5">
          {["36h sprint", "2 checkpoints", "5 mentor rooms", "1 demo stage"].map((item) => (
            <div key={item} className="rounded-[12px] bg-paper px-4 py-3 font-display text-xs uppercase text-ink font-black clay-card">{item}</div>
          ))}
        </div>
      </motion.div>

      <div className="rounded-brand bg-paper p-4 clay-card">
        <div className="grid gap-3">
          {scheduleItems.map((item) => (
            <article
              key={`${item.time}-${item.title}`}
              className="schedule-row grid gap-4 rounded-[18px] bg-white/60 p-4 shadow-sm hover:translate-x-1 transition-transform md:grid-cols-[100px_1fr_130px] border border-white/40"
            >
              <div className={`grid min-h-[66px] place-content-center rounded-[12px] ${item.color} clay-card`}>
                <span className="font-display text-[22px] leading-none uppercase font-black">{item.time}</span>
              </div>
              <div className="self-center">
                <h3 className="font-display text-[18px] uppercase leading-none text-ink font-black">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-800 font-bold leading-normal">{item.detail}</p>
              </div>
              <div className="self-center rounded-pill bg-ink text-yellow px-4 py-2.5 text-center text-[10px] font-display uppercase tracking-widest animate-pulse font-black shadow-sm">
                AUTO NOTIFY
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
