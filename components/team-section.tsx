"use client";

export function TeamSection() {
  return (
    <section id="team" className="my-gap" data-reveal>
      <div className="grid gap-gap md:grid-cols-3">
        {/* Coding Club */}
        <div className="clay-card bg-blue rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <h3 className="font-display text-card uppercase text-white font-black">BMSIT Coding Club</h3>
            <p className="mt-4 text-body-xl text-white font-semibold leading-snug">
              BMSIT Coding Club is a premier student-run tech community driving software craftsmanship, hardware engineering, and innovation hubs across Bangalore campus platforms.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-8">Coding Club BMSIT // Co-Organizer</span>
        </div>

        {/* Alterino */}
        <div className="clay-card bg-yellow rounded-brand p-box text-ink flex flex-col justify-between">
          <div>
            <h3 className="font-display text-card uppercase text-ink font-black">BMSIT Alterino Club</h3>
            <p className="mt-4 text-body-xl text-ink/90 font-semibold leading-snug">
              BMSIT Alterino Club is a premier student-run technology group hosting workshops, hackathons, and bootcamps to build a community of modern engineering builders at BMSIT.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-purple mt-8">Alterino Club BMSIT // Co-Organizer</span>
        </div>

        {/* Confirmed Judge */}
        <div className="clay-card bg-purple rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <h3 className="font-display text-card uppercase text-white font-black">Confirmed Judge</h3>
            <div className="mt-4">
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
