"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export function Community() {
  return (
    <section id="community" className="my-gap" data-reveal>
      <div className="grid gap-gap lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Community Lobby Callout (5 cols on laptop) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-brand bg-red p-6 sm:p-box clay-card text-white shadow-soft relative overflow-hidden min-h-[340px]">
          <div className="flex items-center justify-between z-10">
            <span className="rounded-pill bg-white/20 backdrop-blur-md px-3 py-1 text-white font-display text-[10px] sm:text-xs uppercase font-black tracking-wider flex items-center gap-1.5 border border-white/30">
              Co-Op Hub
            </span>
            <span className="pulse-dot" aria-hidden="true" />
          </div>

          <div className="mt-8 sm:mt-12 z-10">
            <h2 className="font-display text-2xl sm:text-section uppercase text-white font-black leading-tight tracking-tight">
              Community Lobby
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-body-xl text-white/95 font-semibold leading-snug">
              Connect with builders, claim support items, test arpeggios, and check real-time achievements in our live community feed.
            </p>
            
            <div className="mt-6 sm:mt-8">
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

        {/* Right Column: 2 Team Photo Cards Grid (7 cols on laptop) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-gap items-center">
          
          {/* Card 1: Round 3 Team Photo */}
          <div className="relative aspect-[4/3] w-full rounded-brand border-2 border-white/40 shadow-soft overflow-hidden bg-paper clay-card">
            <Image
              src="/assets/images/nirmaan-team-round3.jpg"
              alt="Nirmaan 2026 Organizing Team and Round-3 Participants"
              fill
              className="object-cover object-center filter saturate-110 contrast-105 transition-transform duration-500 hover:scale-105"
              sizes="(min-width: 1024px) 35vw, 100vw"
            />
          </div>

          {/* Card 2: Organizing Team Collage Photo */}
          <div className="relative aspect-[4/3] w-full rounded-brand border-2 border-white/40 shadow-soft overflow-hidden bg-[#f8f5ef] clay-card">
            <Image
              src="/assets/images/nirmaan-team-collage.jpg"
              alt="Nirmaan Organizing Team Collage"
              fill
              className="object-cover object-center filter contrast-105 transition-transform duration-500 hover:scale-105"
              sizes="(min-width: 1024px) 35vw, 100vw"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
