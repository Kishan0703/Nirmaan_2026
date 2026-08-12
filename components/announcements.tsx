"use client";

import { announcements } from "@/lib/data";

export function Announcements() {
  return (
    <section id="overview" className="my-gap grid gap-gap" data-reveal>
      <div className="flex flex-col rounded-brand p-4 sm:p-box bg-paper clay-card">
        <h2 className="font-display text-section uppercase tracking-tight text-ink font-black">
          Announcements & Field Updates
        </h2>
        <p className="mt-2 text-body-xl font-semibold text-ink/80 leading-snug">
          Real-time updates, timeline milestones, and build floor announcements from the Nirmaan 2026 organizing team.
        </p>

        <div className="mt-8 grid gap-gap lg:grid-cols-5 items-center">
          {/* Left Side: Announcement Bulletins */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-[18px] p-4 clay-card bg-paper shadow-xs border border-white/60"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <span className="text-[10px] font-display uppercase bg-blue text-white px-2.5 py-1 rounded-[8px] font-black tracking-wider text-center min-w-[75px] shadow-xs">
                    {item.tag}
                  </span>
                </div>
                <span className="text-xs text-ink/70 font-display font-bold uppercase tracking-tight whitespace-nowrap">
                  {item.date}
                </span>
                <p className="text-xs sm:text-sm font-bold text-ink leading-snug">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
          
          {/* Right Side: Announcement Video Player (Original 9:16 portrait reel ratio properly enlarged) */}
          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[400px] aspect-[9/16] rounded-[24px] overflow-hidden border-2 border-white/60 shadow-2xl bg-black relative flex items-center justify-center">
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
