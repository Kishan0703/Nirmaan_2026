"use client";

import Image from "next/image";
import Link from "next/link";

export function Community() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[.78fr_1fr_.78fr]" data-reveal>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-mentors.png"
          alt="Hackathon team discussing a prototype with mentors"
          fill
          className="object-cover filter contrast-125 grayscale"
          sizes="(min-width: 1024px) 25vw, 100vw"
        />
      </div>
      <div className="flex min-h-[430px] flex-col rounded-brand bg-red p-box clay-card text-white">
        <div className="mt-auto">
          <h2 className="font-display text-section uppercase text-white font-black">
            Community Lobby
          </h2>
          <p className="mt-[20px] text-body-xl text-white font-semibold leading-snug">
            Connect with builders, claim support items, test arpeggios, and check achievements in our co-op lobby feed.
          </p>
          <div className="mt-6">
            <Link
              href="/lobby"
              className="inline-block clay-card rounded-pill bg-yellow px-6 py-3.5 text-sm font-display uppercase font-black text-ink hover:scale-105 transition-all active:scale-95 shadow-md"
            >
              Open Lobby
            </Link>
          </div>
        </div>
      </div>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Hackathon team presenting a demo to judges"
          fill
          className="object-cover filter contrast-125 grayscale"
          sizes="(min-width: 1024px) 25vw, 100vw"
        />
      </div>
    </section>
  );
}
