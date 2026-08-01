"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { projectSubmissions } from "@/lib/data";

export function SubmissionBoard() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[1.05fr_.95fr]" data-reveal>
      <div className="rounded-brand p-box bg-white/80 backdrop-blur-md clay-card text-ink">
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">
          Submissions
        </span>
        
        <h2 className="mt-[30px] font-display text-section uppercase tracking-tight text-ink font-black">Active Room Leaderboard</h2>
        <p className="mt-4 max-w-[680px] text-body-xl text-ink/80 font-medium">
          Check live submissions. Live build scores are graded dynamically by mentors based on core design metrics.
        </p>
        
        <div className="mt-8 overflow-hidden rounded-[18px] border-2 border-white/45 bg-paper/50">
          {projectSubmissions.map((project, idx) => (
            <div
              key={project.team}
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/20 bg-white/25 p-4 last:border-b-0 md:grid-cols-[40px_1fr_140px_120px_60px] text-ink font-aeonik text-sm"
            >
              <span className="opacity-60">#{idx + 1}</span>
              <strong className="uppercase">{project.team}</strong>
              <span className="opacity-75">{project.track}</span>
              <span className="text-[10px] uppercase bg-white border border-white/45 px-2 py-0.5 rounded text-center self-center">{project.status}</span>
              <span className="font-display text-[18px] text-right text-orange self-center font-black">{project.score}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative min-h-[520px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Demo day project presentation"
          fill
          className="object-cover filter contrast-125 saturate-50"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-6 left-6 right-6 rounded-[22px] bg-paper p-5 shadow-lg clay-card text-ink">
          <p className="font-display text-[26px] leading-none uppercase text-ink flex items-center gap-2 font-black">
            <Trophy size={20} className="text-yellow" /> Finalist Showcase
          </p>
          <p className="mt-2 text-sm text-gray-800 font-bold">Public arpeggio showroom maps top projects for loot deployment post-hackathon.</p>
        </div>
      </div>
    </section>
  );
}
