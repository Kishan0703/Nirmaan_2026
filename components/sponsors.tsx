"use client";

import Image from "next/image";
import { Zap, Sparkles } from "lucide-react";

export function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green p-box clay-card overflow-hidden text-ink">
        
        {/* Powered by Mastryhub & Reskill — prominent hero section above sponsors */}
        <div className="mb-5 sm:mb-10 bg-paper border-2 border-ink/15 rounded-[24px] p-4 sm:p-6 shadow-md clay-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink text-paper text-[11px] font-display uppercase tracking-[0.2em] font-black mb-2">
                <span>Powered By</span>
              </div>
              <p className="text-body-lg font-bold text-ink/80">
                Driven by industry leaders empowering student builders and skill transformation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Mastry Hub Card */}
              <div className="flex items-center bg-white border-2 border-ink/15 rounded-[18px] px-5 py-3 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="relative h-10 w-36 sm:w-44 shrink-0">
                  <Image
                    src="/assets/images/mastryhub-logo.png"
                    alt="Mastry Hub Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Connector */}
              <span className="text-ink/40 font-black text-xl font-display">&amp;</span>

              {/* Reskill Card */}
              <div className="flex items-center gap-3 bg-black border-2 border-ink/15 rounded-[18px] px-5 py-3 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="relative h-9 w-32 sm:w-36 shrink-0">
                  <Image
                    src="/assets/images/reskill-logo.png"
                    alt="Reskill Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collaborator Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-5 border-b border-ink/15 pb-4 sm:pb-6 mb-4 sm:mb-8">
          <div>
            <span className="text-[12px] font-display uppercase tracking-[0.25em] font-black text-ink/60 block mb-1">
              Official Partners & Bounties
            </span>
            <h2 className="font-display text-section uppercase text-ink font-black">
              Event Collaborators
            </h2>
          </div>
          <p className="max-w-[480px] text-body-xl font-bold text-ink/90">
            Collaborators shape the build floor. Fueling developers, challenge prompts, API briefs, cloud credits, and recruitment slots.
          </p>
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Monster Energy - Drinks Partner Card */}
          <div className="lg:col-span-7 rounded-[26px] border-3 border-ink bg-[#0c0e12] text-white p-5 sm:p-7 shadow-[5px_5px_0px_0px_#18181b] relative overflow-hidden flex flex-col justify-between group transition-all hover:-translate-y-0.5">
            {/* Green Neon Ambient Glow */}
            <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#74d600]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-[#74d600]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Badge Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#74d600] text-ink font-display text-[11px] uppercase font-black tracking-wider border-2 border-ink shadow-[2px_2px_0px_0px_#18181b]">
                  <Zap size={13} className="fill-ink text-ink" />
                  Official Drinks Partner
                </span>
                <span className="text-[10px] sm:text-[11px] font-display font-black text-white/60 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  24H Sprint Fuel
                </span>
              </div>

              {/* Logo Presentation Stage */}
              <div className="relative my-3 sm:my-4 py-6 px-6 rounded-2xl bg-white/[0.06] border-2 border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:border-[#74d600]/50 group-hover:bg-white/[0.09] transition-all min-h-[110px] sm:min-h-[130px]">
                <Image
                  src="/assets/images/monster-energy-logo.png"
                  alt="Monster Energy - Official Drinks Partner"
                  width={802}
                  height={363}
                  className="h-20 sm:h-28 w-auto max-w-[90%] object-contain drop-shadow-[0_0_20px_rgba(116,214,0,0.55)]"
                  priority
                />
              </div>

              {/* Text / Copy */}
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase font-black text-white tracking-tight">
                    Monster Energy
                  </h3>
                  <span className="text-xs text-[#74d600] font-black uppercase font-display border border-[#74d600]/30 px-2 py-0.5 rounded-md">
                    Energy Partner
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-white/80 leading-relaxed">
                  Fueling 420+ builders, hackers, and mentors through 24 hours of non-stop rapid prototyping, intense problem solving, and high-octane innovation at BMSIT.
                </p>
              </div>
            </div>

            {/* Perks / Features Row */}
            <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-white/10">
                ⚡ 24H Energy Stations
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-white/10">
                🥫 Chilled Refreshments
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#74d600]/15 text-[#74d600] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-[#74d600]/30">
                🔥 Maximum Focus &amp; Stamina
              </span>
            </div>
          </div>

          {/* More Collaborators Slot */}
          <div className="lg:col-span-5 rounded-[26px] border-3 border-dashed border-ink/30 bg-paper/95 p-5 sm:p-7 text-ink flex flex-col justify-between relative overflow-hidden clay-card transition-all hover:bg-paper">
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-yellow/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow text-ink font-display text-[11px] uppercase font-black tracking-wider border border-ink/20 shadow-2xs">
                  <Sparkles size={13} className="text-ink" />
                  Upcoming Collaborators
                </span>
                <span className="text-[10px] sm:text-[11px] font-display font-black text-ink/50 uppercase tracking-widest">
                  Reveal Soon
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl uppercase font-black text-ink tracking-tight mt-3 mb-2">
                More Partners Joining the Lineup
              </h3>
              <p className="text-xs sm:text-sm font-bold text-ink/75 leading-relaxed">
                We are locking in headline track collaborators, API bounty briefs, cloud infrastructure credits, and developer recruitment partners.
              </p>
            </div>

            {/* Category tags */}
            <div className="mt-6 pt-4 border-t border-ink/10 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-ink/5 text-ink/80 text-[10px] font-bold uppercase tracking-wider border border-ink/10">
                Cloud Credits
              </span>
              <span className="px-3 py-1 rounded-full bg-ink/5 text-ink/80 text-[10px] font-bold uppercase tracking-wider border border-ink/10">
                API Bounties
              </span>
              <span className="px-3 py-1 rounded-full bg-ink/5 text-ink/80 text-[10px] font-bold uppercase tracking-wider border border-ink/10">
                Hiring Slots
              </span>
              <span className="px-3 py-1 rounded-full bg-ink/5 text-ink/80 text-[10px] font-bold uppercase tracking-wider border border-ink/10">
                Hardware Toolkits
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


