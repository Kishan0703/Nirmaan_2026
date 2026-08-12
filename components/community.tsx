"use client";

import Image from "next/image";
import Link from "next/link";

export function Community() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[1.1fr_0.75fr_1.1fr]" data-reveal>
      <div className="relative min-h-[400px] sm:min-h-[430px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-team-round3.jpg"
          alt="Nirmaan 2026 Organizing Team and Round-3 Participants"
          fill
          className="object-cover filter saturate-110 contrast-105"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </div>
      <div className="flex min-h-[400px] sm:min-h-[430px] flex-col justify-end rounded-brand bg-red p-6 sm:p-7 clay-card text-white">
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
      <div className="relative min-h-[400px] sm:min-h-[430px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Hackathon team presenting a demo to judges"
          fill
          className="object-cover filter contrast-125 grayscale"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </div>
    </section>
  );
}
