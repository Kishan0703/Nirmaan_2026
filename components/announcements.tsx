"use client";

import { announcements } from "@/lib/data";

export function Announcements() {
  return (
    <section id="overview" className="my-gap" data-reveal>
      <div className="clay-card bg-paper p-box rounded-brand border-2 border-white/40">
        <h2 className="font-display text-section uppercase tracking-tight text-ink font-black mb-6">
          Live Announcements & Broadcast
        </h2>
        
        <div className="grid gap-gap lg:grid-cols-5 items-stretch">
          {/* Left Side: Bulletins (3 columns wide on large screen) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            {announcements.map((item) => (
              <div 
                key={item.id} 
                className="clay-card rounded-[18px] bg-white/70 p-3.5 sm:p-4 border border-white/50 flex flex-col sm:grid sm:grid-cols-[85px_210px_1fr] items-start sm:items-center gap-2 sm:gap-4 shadow-sm hover:translate-x-1 transition-transform"
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
          
          {/* Right Side: Announcement Video Player (9:16 on phone, 16:9 on laptop) */}
          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[540px] aspect-[9/16] lg:aspect-[16/9] rounded-[20px] overflow-hidden border-2 border-white/40 shadow-xl bg-black relative flex items-center justify-center">
              <video
                src="/announcement.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
