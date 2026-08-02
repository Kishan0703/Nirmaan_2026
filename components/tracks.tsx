"use client";

import { trackCards, TrackType } from "@/lib/data";

const getTracksByType = (type: TrackType) => trackCards.filter((track) => track.type === type);
const softwareTracks = getTracksByType("software");
const hardwareTracks = getTracksByType("hardware");

export function Tracks({ onBook }: { onBook: () => void }) {
  return (
    <section id="tracks" className="my-gap grid gap-gap" data-reveal>
      <div className="flex flex-col rounded-brand p-box bg-paper clay-card">
        <h2 className="font-display text-section uppercase tracking-tight text-ink font-black">Problem Statements & Tracks</h2>
        <p className="mt-4 max-w-[800px] text-body-xl font-semibold text-ink/80 leading-snug">
          Select your challenge track. Prompts are divided into Embedded Systems / IoT (Multidisciplinary) and Hardware-Based Innovation fields, loaded with custom devkits and industry mentors.
        </p>

        {/* Separated Columns */}
        <div className="mt-8 grid gap-gap md:grid-cols-2">
          {/* Software Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-card uppercase text-blue font-black border-b border-ink/10 pb-2">Embedded Systems & IoT</h3>
            <div className="grid gap-3">
              {softwareTracks.map((track) => (
                <div key={track.title} className="rounded-[20px] p-5 clay-card bg-paper shadow-sm border border-white/40">
                  <h4 className="font-display text-lg uppercase font-black text-ink">{track.title}</h4>
                  <p className="mt-1 text-xs text-gray-700 font-bold">{track.prompt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-card uppercase text-green font-black border-b border-ink/10 pb-2">Hardware Innovation</h3>
            <div className="grid gap-3">
              {hardwareTracks.map((track) => (
                <div key={track.title} className="rounded-[20px] p-5 clay-card bg-paper shadow-sm border border-white/40">
                  <h4 className="font-display text-lg uppercase font-black text-ink">{track.title}</h4>
                  <p className="mt-1 text-xs text-gray-700 font-bold">{track.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onBook}
            className="clay-card rounded-pill bg-purple px-6 py-4 text-sm font-display uppercase font-black text-white hover:bg-purple-light"
          >
            Register for a Track
          </button>
        </div>
      </div>
    </section>
  );
}
