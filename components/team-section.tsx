"use client";

export function TeamSection() {
  return (
    <section id="team" className="my-gap" data-reveal>
      <div className="grid gap-gap md:grid-cols-2">
        {/* Coding Club */}
        <div className="clay-card bg-blue rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <h3 className="font-display text-card uppercase text-white font-black">BMSIT Coding Club</h3>
            <p className="mt-4 text-body-xl text-white font-semibold leading-snug">
              BMSIT Coding Club is a premier student-run tech community driving software craftsmanship, hardware engineering, and innovation hubs across Bangalore campus platforms.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-8">BMSIT CC // Platform Operations</span>
        </div>

        {/* Alterino */}
        <div className="clay-card bg-yellow rounded-brand p-box text-ink flex flex-col justify-between">
          <div>
            <h3 className="font-display text-card uppercase text-ink font-black">Alterino Ecosystem</h3>
            <p className="mt-4 text-body-xl text-ink/90 font-semibold leading-snug">
              Alterino is our strategic technology partner powering developer pipelines, logistics grids, and event infrastructures to ensure every build event runs with zero friction.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-purple mt-8">Alterino // Logistics Grid Partner</span>
        </div>
      </div>
    </section>
  );
}
