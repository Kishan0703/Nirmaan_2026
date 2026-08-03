"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { projectSubmissions } from "@/lib/data";

export function SubmissionBoard() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[1.05fr_.95fr]" data-reveal>
      <div className="rounded-brand p-4 sm:p-box bg-white/80 backdrop-blur-md clay-card text-ink">
        <h2 className="font-display text-2xl sm:text-section uppercase tracking-tight text-ink font-black leading-tight">
          Active Room Leaderboard
        </h2>
        <p className="mt-2 sm:mt-4 max-w-[680px] text-xs sm:text-body-xl text-ink/80 font-medium">
          Check live submissions. Live build scores are graded dynamically by mentors based on core design metrics.
        </p>
        
        <div className="mt-5 sm:mt-8 overflow-hidden rounded-[18px] border-2 border-white/45 bg-paper/50">
          {projectSubmissions.map((project, idx) => (
            <div
              key={project.team}
              className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[40px_1fr_140px_120px_60px] gap-2 sm:gap-4 items-center border-b border-white/20 bg-white/25 p-3 sm:p-4 last:border-b-0 text-ink font-aeonik text-xs sm:text-sm"
            >
              <span className="opacity-60 font-display text-xs font-black">#{idx + 1}</span>
              <div className="min-w-0">
                <strong className="uppercase block font-bold truncate">{project.team}</strong>
                <span className="opacity-75 text-[10px] sm:text-xs block sm:inline truncate">{project.track}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1">
                <span className="text-[9px] sm:text-[10px] uppercase bg-white border border-white/45 px-2 py-0.5 rounded text-center font-bold">
                  {project.status}
                </span>
                <span className="font-display text-base sm:text-[18px] text-right text-orange font-black">
                  {project.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative min-h-[340px] sm:min-h-[520px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
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
            Public arpeggio showroom maps top projects for loot deployment post-hackathon.
          </p>
        </div>
      </div>
    </section>
  );
}
