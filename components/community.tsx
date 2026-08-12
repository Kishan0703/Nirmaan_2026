"use client";

import Image from "next/image";
import Link from "next/link";

export function Community() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-12 items-stretch" data-reveal>
      {/* Left Box: Round 3 Team Photo (5 cols) - NO text overlay */}
      <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-brand border-2 border-white/30 shadow-soft bg-paper">
        <Image
          src="/assets/images/nirmaan-team-round3.jpg"
          alt="Nirmaan 2026 Organizing Team and Round-3 Participants"
          fill
          className="object-cover object-center filter saturate-110 contrast-105"
          sizes="(min-width: 1024px) 42vw, 100vw"
          priority
        />
      </div>

      {/* Center Box: Red Community Lobby Card (3 cols) */}
      <div className="lg:col-span-3 flex flex-col justify-end min-h-[360px] sm:min-h-[420px] rounded-brand bg-red p-6 sm:p-7 clay-card text-white shadow-soft">
        <div>
          <h2 className="font-display text-section uppercase text-white font-black leading-none">
            Community Lobby
          </h2>
          <p className="mt-4 text-body font-semibold text-white/95 leading-snug">
            Connect with builders, claim support items, test arpeggios, and check achievements in our co-op lobby feed.
          </p>
          <div className="mt-6">
            <Link
              href="/lobby"
              className="inline-block clay-card rounded-pill bg-yellow px-5 py-3 text-sm font-display uppercase font-black text-ink hover:scale-105 transition-all active:scale-95 shadow-md"
            >
              Open Lobby
            </Link>
          </div>
        </div>
      </div>

      {/* Right Box: Team Collage Photo (4 cols) - NO text overlay */}
      <div className="lg:col-span-4 relative min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-brand border-2 border-white/30 shadow-soft bg-paper">
        <Image
          src="/assets/images/nirmaan-team-collage.jpg"
          alt="Nirmaan Organizing Team Collage"
          fill
          className="object-cover object-top filter contrast-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>
    </section>
  );
}
