"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Clock, Sparkles, FolderGit2 } from "lucide-react";

type ProjectSubmission = {
  id: string;
  team: string;
  track: string;
  status: string;
  score: string;
};

export function SubmissionBoard() {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch("/api/submissions");
        if (res.ok) {
          const data = await res.json();
          if (data.submissions) setSubmissions(data.submissions);
        }
      } catch {
        // Fallback
      }
    }
    fetchSubmissions();
  }, []);

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

          {submissions.length > 0 ? (
            <div className="mt-5 space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-2xl border-2 border-ink bg-paper p-3.5 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple text-white shrink-0">
                      <FolderGit2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-black uppercase text-ink">{sub.team}</h4>
                      <p className="text-[11px] font-bold text-ink/60">{sub.track}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-green/15 text-green border border-green/30 font-display text-[10px] font-black uppercase mb-0.5">
                      {sub.status}
                    </span>
                    <p className="font-display text-xs font-black text-purple">{sub.score} / 100</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Arcade "Coming Soon After Round 1" Banner */
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
          )}
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

