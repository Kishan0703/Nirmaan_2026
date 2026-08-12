"use client";

import { useState } from "react";
import { announcements } from "@/lib/data";

export function Announcements() {
  const [showAll, setShowAll] = useState(false);
  const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 3);

  return (
    <section id="overview" className="my-gap grid gap-gap" data-reveal>
      <div className="flex flex-col rounded-brand p-4 sm:p-box bg-paper clay-card">
        <h2 className="font-display text-section uppercase tracking-tight text-ink font-black">
          Announcements & Field Updates
        </h2>
        <p className="mt-2 text-body-xl font-semibold text-ink/80 leading-snug">
          Real-time updates, timeline milestones, and build floor announcements from the Nirmaan 2026 organizing team.
        </p>

        <div className="mt-4 sm:mt-8 grid gap-gap lg:grid-cols-5 items-center">
          {/* Left Side: Announcement Bulletins (Enlarged size & text) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 sm:gap-4">
            {/* Desktop: Render all 6; Mobile: Render visible subset */}
            <div className="hidden lg:flex flex-col gap-4">
              {announcements.map((item) => (
                <div
                  key={`desktop-${item.id}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-[22px] p-3 sm:p-5 clay-card bg-paper shadow-md border-2 border-white/60 hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center w-full sm:w-auto shrink-0">
                    <span className="text-xs sm:text-sm font-display uppercase bg-blue text-white px-3.5 py-1.5 rounded-[10px] font-black tracking-wider text-center min-w-[95px] shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-ink/80 font-display font-black uppercase tracking-tight whitespace-nowrap shrink-0">
                    {item.date}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-ink leading-snug">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:hidden flex flex-col gap-2.5">
              {visibleAnnouncements.map((item) => (
                <div
                  key={`mobile-${item.id}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 rounded-[22px] p-3 sm:p-5 clay-card bg-paper shadow-md border-2 border-white/60"
                >
                  <div className="flex items-center w-full sm:w-auto shrink-0">
                    <span className="text-xs sm:text-sm font-display uppercase bg-blue text-white px-3 py-1 rounded-[10px] font-black tracking-wider text-center min-w-[85px] shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs text-ink/80 font-display font-black uppercase tracking-tight whitespace-nowrap shrink-0">
                    {item.date}
                  </span>
                  <p className="text-xs sm:text-base font-bold text-ink leading-snug">
                    {item.content}
                  </p>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="mt-1 self-center rounded-full bg-blue text-white px-4 py-2 font-display text-xs uppercase font-black clay-card active:translate-y-0.5 shadow-sm"
              >
                {showAll ? "Show Less −" : `Show All ${announcements.length} Updates ↓`}
              </button>
            </div>
          </div>
          
          {/* Right Side: Announcement Video Player (Original 9:16 portrait reel ratio properly enlarged) */}
          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="w-full max-w-[220px] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[400px] aspect-[9/16] rounded-[24px] overflow-hidden border-2 border-white/60 shadow-2xl bg-black relative flex items-center justify-center">
              <video
                src="/announcement.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover bg-black"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
