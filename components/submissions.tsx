"use client";

import Image from "next/image";
import { Trophy, Clock, Sparkles } from "lucide-react";

export function SubmissionBoard() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[1.05fr_.95fr]" data-reveal>
      <div className="rounded-brand p-4 sm:p-box bg-white/80 backdrop-blur-md clay-card text-ink flex flex-col justify-between">
        <div>
          <h2 className="font-display text-2xl sm:text-section uppercase tracking-tight text-ink font-black leading-tight">
            Active Room Leaderboard
          </h2>
          <p className="mt-2 max-w-[680px] text-xs sm:text-body-xl text-ink/80 font-semibold">
            Live build scores and room rankings are dynamically updated during the 24-hour Grand Finale.
          </p>

          {/* Arcade "Coming Soon After Round 1" Banner */}
          <div className="mt-5 sm:mt-8 p-6 sm:p-8 rounded-[24px] border-2 border-white/60 bg-gradient-to-br from-paper via-white to-yellow/15 clay-card text-center flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            {/* Pulsing Clock Badge */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-[22px] bg-purple text-white border-2 border-white flex items-center justify-center shadow-xl mb-4 transform -rotate-3">
              <Clock size={36} className="text-yellow animate-spin" style={{ animationDuration: "8s" }} />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-ink text-yellow text-[10px] sm:text-xs font-display uppercase font-black px-3.5 py-1.5 rounded-full shadow-md mb-3">
              <Sparkles size={13} />
              <span>ROUND 1 IN PROGRESS</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl uppercase font-black text-ink leading-tight tracking-tight">
              Coming Soon After Round 1
            </h3>

            <p className="mt-2 max-w-md text-xs sm:text-sm text-ink/80 font-bold leading-relaxed">
              Grand Finale 24-hour room scoreboards and mentor grading rubrics will unlock immediately once Round 1 online PPT evaluations are completed.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Side Image Card */}
      <div className="relative min-h-[220px] sm:min-h-[520px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Demo day project presentation"
          fill
          className="object-cover filter contrast-125 saturate-50"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-[18px] sm:rounded-[22px] bg-paper p-3.5 sm:p-5 shadow-lg clay-card text-ink">
          <p className="font-display text-lg sm:text-[26px] leading-none uppercase text-ink flex items-center gap-2 font-black">
            <Trophy size={18} className="text-yellow shrink-0" /> Finalist Showcase
          </p>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-800 font-bold leading-normal">
            Shortlisted teams from Round 1 will present live prototypes on the Bangalore Grand Finale stage.
          </p>
        </div>
      </div>
    </section>
  );
}
