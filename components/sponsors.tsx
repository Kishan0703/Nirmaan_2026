"use client";

import Image from "next/image";

/* Sponsor data — Unstop is confirmed, rest are placeholder slots */
const sponsors = [
  { name: "Unstop", logo: "/assets/images/unstop-logo.png", tier: "Powered by" },
  { name: "Title Sponsor", logo: null, tier: "Title" },
  { name: "Gold Sponsor 1", logo: null, tier: "Gold" },
  { name: "Gold Sponsor 2", logo: null, tier: "Gold" },
  { name: "Silver Sponsor 1", logo: null, tier: "Silver" },
  { name: "Silver Sponsor 2", logo: null, tier: "Silver" },
  { name: "Silver Sponsor 3", logo: null, tier: "Silver" },
  { name: "Community Partner 1", logo: null, tier: "Community" },
  { name: "Community Partner 2", logo: null, tier: "Community" },
  { name: "Community Partner 3", logo: null, tier: "Community" },
  { name: "Community Partner 4", logo: null, tier: "Community" },
];

function SponsorCard({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <div className="shrink-0 w-[140px] h-[100px] rounded-[16px] bg-paper clay-card border border-white/40 flex flex-col items-center justify-center gap-2 px-3 select-none">
      {sponsor.logo ? (
        <>
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image src={sponsor.logo} alt={sponsor.name} fill className="object-cover" />
          </div>
          <span className="text-[9px] font-display uppercase font-black text-ink tracking-wider text-center leading-tight">
            {sponsor.name}
          </span>
        </>
      ) : (
        <>
          <div className="h-10 w-10 rounded-full border-2 border-dashed border-ink/15 flex items-center justify-center">
            <span className="text-[14px] text-ink/15 font-black">?</span>
          </div>
          <span className="text-[8px] font-display uppercase font-black text-ink/25 tracking-wider text-center leading-tight">
            {sponsor.tier} Sponsor
          </span>
        </>
      )}
    </div>
  );
}

export function SponsorWall() {
  // Duplicate the list for seamless infinite loop
  const repeated = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-ink p-box clay-card overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-6 mb-8">
          <h2 className="font-display text-section uppercase text-white font-black">Event Sponsors</h2>
          <p className="max-w-[480px] text-body-xl font-bold text-white/70">
            Sponsors shape the build floor. Challenge prompts, API briefs, and developer recruitment slots.
          </p>
        </div>

        {/* Powered by Unstop — compact hero */}
        <div className="flex items-center gap-4 mb-8 bg-white/[0.06] border border-white/10 rounded-[16px] px-5 py-4 w-fit">
          <span className="text-[9px] font-display uppercase tracking-[0.2em] font-black text-white/40">
            Powered by
          </span>
          <div className="relative h-9 w-9 rounded-full overflow-hidden shadow-md">
            <Image
              src="/assets/images/unstop-logo.png"
              alt="Unstop"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-display text-[16px] uppercase font-black text-white tracking-tight">
            Unstop
          </span>
        </div>

        {/* Sliding sponsor ticker — row 1 (left to right) */}
        <div className="overflow-hidden mb-4">
          <div className="flex w-max animate-marquee items-center gap-4">
            {repeated.map((sponsor, i) => (
              <SponsorCard key={`r1-${i}`} sponsor={sponsor} />
            ))}
          </div>
        </div>

        {/* Sliding sponsor ticker — row 2 (right to left, reversed) */}
        <div className="overflow-hidden">
          <div
            className="flex w-max items-center gap-4"
            style={{
              animation: "marquee 26s linear infinite reverse",
            }}
          >
            {[...repeated].reverse().map((sponsor, i) => (
              <SponsorCard key={`r2-${i}`} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
