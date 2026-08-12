"use client";

import Image from "next/image";
import Link from "next/link";

export function Community() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-12 items-stretch" data-reveal>
      {/* Left Box: Full 4:3 Team Photo un-cropped showing all 18+ members (7 cols out of 12) */}
      <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] aspect-[4/3] sm:aspect-auto overflow-hidden rounded-brand border-2 border-white/30 shadow-soft bg-paper">
        <Image
          src="/assets/images/nirmaan-team-round3.jpg"
          alt="Nirmaan 2026 Organizing Team and Round-3 Participants"
          fill
          className="object-cover object-center filter saturate-110 contrast-105"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
        />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 rounded-[16px] bg-ink/80 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 text-white border border-white/20 shadow-xl max-w-fit">
          <p className="text-xs sm:text-sm font-display uppercase font-black tracking-wider text-yellow">
            Round 3 — Core Organizing Team & Participants
          </p>
        </div>
      </div>

      {/* Right Column: Community Lobby Red Card + Team Collage Photo stacked (5 cols out of 12) */}
      <div className="lg:col-span-5 flex flex-col gap-gap">
        {/* Red Community Lobby Card */}
        <div className="flex-1 flex flex-col justify-end min-h-[240px] sm:min-h-[260px] rounded-brand bg-red p-6 sm:p-7 clay-card text-white shadow-soft">
          <div>
            <h2 className="font-display text-section uppercase text-white font-black leading-none">
              Community Lobby
            </h2>
            <p className="mt-3 sm:mt-4 text-body font-semibold text-white/95 leading-snug">
              Connect with builders, claim support items, test arpeggios, and check achievements in our co-op lobby feed.
            </p>
            <div className="mt-5">
              <Link
                href="/lobby"
                className="inline-block clay-card rounded-pill bg-yellow px-5 py-3 text-sm font-display uppercase font-black text-ink hover:scale-105 transition-all active:scale-95 shadow-md"
              >
                Open Lobby
              </Link>
            </div>
          </div>
        </div>

        {/* Team Collage Photo */}
        <div className="relative h-[220px] sm:h-[240px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft bg-paper">
          <Image
            src="/assets/images/nirmaan-team-collage.jpg"
            alt="Nirmaan Organizing Team Collage"
            fill
            className="object-cover object-top filter contrast-105"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
