"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export function Community() {
  return (
    <section id="community" className="my-gap" data-reveal>
      <div className="flex flex-col gap-gap">
        
        {/* 1x2 Matrix of Team Images (Top Row: 2 Equal Columns Side-by-Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gap items-stretch">
          
          {/* Image 1: Round 3 Team Photo (Col 1 of 2) */}
          <div className="relative aspect-[4/3] w-full rounded-brand border-2 border-white/60 shadow-soft overflow-hidden bg-paper clay-card group">
            <Image
              src="/assets/images/nirmaan-team-round3.jpg"
              alt="Nirmaan 2026 Organizing Team and Round-3 Participants"
              fill
              className="object-cover object-top filter saturate-105 contrast-105 transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Image 2: Organizing Team Collage Photo (Col 2 of 2) */}
          <div className="relative aspect-[4/3] w-full rounded-brand border-2 border-white/60 shadow-soft overflow-hidden bg-paper clay-card group">
            <Image
              src="/assets/images/nirmaan-team-collage.jpg"
              alt="Nirmaan Organizing Team Collage"
              fill
              className="object-cover object-top filter saturate-105 contrast-105 transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

        </div>

        {/* Community Lobby Card Underneath (Full Width, Compact Horizontal Layout) */}
        <div className="rounded-brand bg-red p-5 sm:p-7 clay-card text-white shadow-soft relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          <div className="flex flex-col gap-1.5 max-w-3xl z-10">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl uppercase text-white font-black leading-tight tracking-tight">
                Community Lobby
              </h2>
              <span className="pulse-dot shrink-0" aria-hidden="true" />
            </div>
            <p className="text-sm sm:text-base text-white/95 font-semibold leading-snug">
              Broadcast event announcements, ask participant questions, connect with builders, and get live answers from the organizing roster in our funky cartoon lobby feed.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <Link
              href="/lobby"
              className="clay-card rounded-pill bg-yellow px-6 py-3.5 text-sm sm:text-base font-display uppercase font-black text-ink hover:scale-105 transition-all active:scale-95 shadow-xl inline-flex items-center gap-2 border-2 border-white/40"
            >
              <span>Open Community Lobby</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
