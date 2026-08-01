"use client";

import Image from "next/image";

export function TeamSection() {
  return (
    <section id="team" className="my-gap" data-reveal>
      <div className="grid gap-gap md:grid-cols-3">
        
        {/* Coding Club BMSIT */}
        <div className="clay-card bg-blue rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-white/20 bg-black flex items-center justify-center p-1 shadow-md">
                <Image 
                  src="/assets/images/codingclub-logo.png" 
                  alt="Coding Club BMSIT Logo" 
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <a 
                href="https://www.instagram.com/codingclub_bmsit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-display uppercase tracking-wider bg-white/20 text-white hover:bg-white/35 px-4 py-2 rounded-full font-black border border-white/10 transition-transform active:translate-y-0.5"
              >
                Instagram ↗
              </a>
            </div>
            <h3 className="font-display text-card uppercase text-white font-black leading-tight">BMSIT Coding Club</h3>
            <p className="mt-3 text-body-xl text-white font-semibold leading-snug">
              BMSIT Coding Club is a premier student-run tech community driving software craftsmanship, hardware engineering, and innovation hubs across Bangalore campus platforms.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-8">Coding Club BMSIT // Co-Organizer</span>
        </div>

        {/* Alterino Club BMSIT */}
        <div className="clay-card bg-yellow rounded-brand p-box text-ink flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-ink/10 bg-[#0f1b29] flex items-center justify-center p-1 shadow-md">
                <Image 
                  src="/assets/images/alterino-logo.png" 
                  alt="Alterino Club BMSIT Logo" 
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <a 
                href="https://www.instagram.com/alterino_bmsit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-display uppercase tracking-wider bg-ink/10 text-ink hover:bg-ink/20 px-4 py-2 rounded-full font-black border border-ink/5 transition-transform active:translate-y-0.5"
              >
                Instagram ↗
              </a>
            </div>
            <h3 className="font-display text-card uppercase text-ink font-black leading-tight">BMSIT Alterino Club</h3>
            <p className="mt-3 text-body-xl text-ink/90 font-semibold leading-snug">
              BMSIT Alterino Club is a premier student-run technology group hosting workshops, hackathons, and bootcamps to build a community of modern engineering builders at BMSIT.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-purple mt-8">Alterino Club BMSIT // Co-Organizer</span>
        </div>

        {/* Confirmed Judge */}
        <div className="clay-card bg-purple rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="h-14 w-14 rounded-full bg-white/20 border-2 border-white/25 flex items-center justify-center text-yellow font-display text-[24px] font-black shadow-md">
                評
              </div>
            </div>
            <h3 className="font-display text-card uppercase text-white font-black leading-tight">Confirmed Judge</h3>
            <div className="mt-3">
              <h4 className="text-lg font-black text-yellow uppercase leading-tight font-display">D Santhosh Kumar (Sandy)</h4>
              <p className="text-[10px] uppercase font-bold text-white/70 mb-2">Data Engineer at Walmart</p>
              <p className="text-xs font-semibold leading-snug text-white/90">
                13x Hackathon Champion, 13+ Conference Speaker, Microsoft Certified Trainer, Azure Certified x6 (Python, Spark, Hive, SQL).
              </p>
            </div>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-8">Evaluation Panel // Grand Finale</span>
        </div>
      </div>
    </section>
  );
}
