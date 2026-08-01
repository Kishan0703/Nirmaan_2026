"use client";

import { announcements } from "@/lib/data";

export function Announcements() {
  return (
    <section className="my-gap" data-reveal>
      <div className="clay-card bg-paper p-box rounded-brand border-2 border-white/40">
        <span className="label bg-orange border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Bulletin</span>
        <h2 className="mt-4 font-display text-section uppercase tracking-tight text-ink font-black">Live Announcements</h2>
        <div className="mt-6 grid gap-4">
          {announcements.map((item) => (
            <div key={item.id} className="clay-card rounded-[16px] bg-white/60 p-4 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-display uppercase bg-blue text-white px-2 py-0.5 rounded-[6px] font-black">{item.tag}</span>
                <span className="text-xs text-gray-500 font-bold">{item.date}</span>
              </div>
              <p className="text-sm font-bold text-ink leading-relaxed flex-1 md:px-4">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
