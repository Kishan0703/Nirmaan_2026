"use client";

import { sponsorTiers } from "@/lib/data";

export function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green p-box clay-card">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/10 pb-6">
          <div>
            <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Sponsors</span>
            <h2 className="mt-4 font-display text-section uppercase text-ink font-black">Guild Sponsors</h2>
          </div>
          <p className="max-w-[560px] text-body-xl font-bold text-ink">
            Sponsors shape the build floor. Challenge prompts, API briefs, and developer recruitment slots.
          </p>
        </div>
        <div className="mt-8 grid gap-gap lg:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <article key={tier.name} className="rounded-[24px] bg-paper p-6 clay-card">
              <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                <h3 className="font-display text-[22px] uppercase leading-none text-ink font-black">{tier.name}</h3>
                <span className="rounded-pill bg-yellow border border-white/20 px-3 py-1 text-xs font-bold uppercase">{tier.slots}</span>
              </div>
              <ul className="mt-6 grid gap-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="rounded-[12px] border border-white/40 bg-white/40 px-4 py-2 text-xs font-bold uppercase text-ink">{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
