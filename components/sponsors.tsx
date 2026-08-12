"use client";

import Image from "next/image";

export function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green p-box clay-card overflow-hidden text-ink">
        
        {/* Powered by Mastryhub & Reskill — prominent hero section above sponsors */}
        <div className="mb-10 bg-paper border-2 border-ink/15 rounded-[24px] p-6 shadow-md clay-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink text-paper text-[11px] font-display uppercase tracking-[0.2em] font-black mb-2">
                <span>Powered By</span>
              </div>
              <p className="text-body-lg font-bold text-ink/80">
                Driven by industry leaders empowering student builders and skill transformation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Mastryhub Card */}
              <div className="flex items-center gap-3 bg-white border-2 border-ink/15 rounded-[18px] px-5 py-3 shadow-sm hover:scale-[1.02] transition-transform">
                <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-md bg-black border border-white/20 shrink-0">
                  <Image
                    src="/assets/images/mastryhub-logo.png"
                    alt="Mastryhub Logo"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="font-display text-[20px] uppercase font-black text-ink tracking-tight">
                  Mastryhub
                </span>
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
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/15 pb-6 mb-8">
          <div>
            <span className="text-[12px] font-display uppercase tracking-[0.25em] font-black text-ink/60 block mb-1">
              Official Partners & Bounties
            </span>
            <h2 className="font-display text-section uppercase text-ink font-black">
              Event Collaborators
            </h2>
          </div>
          <p className="max-w-[480px] text-body-xl font-bold text-ink/90">
            Collaborators shape the build floor. Challenge prompts, API briefs, cloud credits, and developer recruitment slots.
          </p>
        </div>

        {/* To Be Announced Hero Box */}
        <div className="bg-paper/90 border-2 border-dashed border-ink/30 rounded-[24px] p-8 text-center clay-card relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <span className="px-4 py-1.5 rounded-full bg-yellow text-ink font-display text-[12px] uppercase font-black tracking-widest mb-3 border border-ink/10 shadow-sm">
              Collaborator Lineup
            </span>
            <h3 className="font-display text-[28px] sm:text-[36px] uppercase font-black text-ink tracking-tight mb-2">
              To Be Announced
            </h3>
            <p className="text-body-lg font-bold text-ink/70 max-w-md">
              We are finalizing headline track collaborators, bounty partners, and recruitment slots. Full collaborator reveal dropping soon!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}


