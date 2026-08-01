"use client";

import Image from "next/image";

const placeholderSponsors = [
  { tier: "Title Sponsor", slots: 1 },
  { tier: "Gold Sponsor", slots: 2 },
  { tier: "Silver Sponsor", slots: 3 },
  { tier: "Community Partner", slots: 4 },
];

export function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green p-box clay-card">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/10 pb-6">
          <h2 className="font-display text-section uppercase text-ink font-black">Event Sponsors</h2>
          <p className="max-w-[560px] text-body-xl font-bold text-ink">
            Sponsors shape the build floor. Challenge prompts, API briefs, and developer recruitment slots.
          </p>
        </div>

        {/* Powered by Unstop — hero slot */}
        <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] bg-paper p-8 clay-card">
          <span className="text-[10px] font-display uppercase tracking-[0.3em] font-black text-ink/50 mb-4">
            Powered by
          </span>
          <div className="relative h-20 w-20 rounded-full overflow-hidden shadow-md">
            <Image
              src="/assets/images/unstop-logo.png"
              alt="Unstop"
              fill
              className="object-cover"
            />
          </div>
          <span className="mt-3 font-display text-[22px] uppercase font-black text-ink tracking-tight">
            Unstop
          </span>
        </div>

        {/* Sponsor tier grids — placeholder logo slots */}
        <div className="mt-6 grid gap-gap">
          {placeholderSponsors.map((tier) => (
            <div key={tier.tier} className="rounded-[24px] bg-paper p-6 clay-card">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-5">
                <h3 className="font-display text-[18px] uppercase font-black text-ink">{tier.tier}</h3>
                <span className="rounded-pill bg-yellow border border-white/20 px-3 py-1 text-[10px] font-bold uppercase">
                  {tier.slots} {tier.slots === 1 ? "slot" : "slots"}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: tier.slots }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[72px] w-[140px] rounded-[16px] border-2 border-dashed border-ink/10 bg-white/30 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-display uppercase font-black text-ink/20 tracking-wider">
                      Your Logo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
