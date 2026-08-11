"use client";

import { AlertTriangle } from "lucide-react";
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
          Select your challenge track. Prompts are split into Software Tracks (AI, Web Apps, Cloud & Cyber Tech) and Hardware Tracks (Embedded Systems, IoT, Robotics & Health Devices), supported by technical domain experts and industry mentors.
        </p>

        {/* Separated Columns */}
        <div className="mt-8 grid gap-gap md:grid-cols-2">
          {/* Software Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-card uppercase text-blue font-black border-b border-ink/10 pb-2">Software Tracks</h3>
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
            <h3 className="font-display text-card uppercase text-green font-black border-b border-ink/10 pb-2">Hardware Tracks</h3>
            
            {/* Hardware Note Alert */}
            <div className="rounded-[16px] bg-red/10 border-2 border-red/40 p-3.5 flex items-start gap-2.5 text-ink shadow-xs">
              <AlertTriangle size={18} className="text-red shrink-0 mt-0.5" />
              <div className="text-xs font-bold leading-relaxed">
                <span className="font-black uppercase text-red block mb-0.5">Important Notice for Hardware Teams:</span>
                No hardware components, microcontrollers, sensors, or dev kits will be provided on-site. Participating teams in Hardware tracks must bring all their own hardware components and tools.
              </div>
            </div>

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
