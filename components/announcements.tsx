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
          <div className="lg:col-span-3 flex flex-col gap-4">
            {announcements.map((item) => (
              <div 
                key={item.id} 
                className="clay-card rounded-[20px] bg-white/60 p-5 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-display uppercase bg-blue text-white px-2.5 py-1 rounded-[8px] font-black tracking-wide">
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-500 font-bold">{item.date}</span>
                </div>
                <p className="text-sm font-bold text-ink leading-relaxed flex-1 md:px-4">{item.content}</p>
              </div>
            ))}
          </div>
          
          {/* Right Side: Announcement Video Player (2 columns wide on large screen) */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-full max-w-[320px] aspect-[9/16] rounded-[20px] overflow-hidden border-2 border-white/40 shadow-md bg-black">
              <video
                src="/announcement.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
