"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f4e9e1] text-ink p-6 lg:p-12 relative flex flex-col justify-between">
      <div className="clay-grid absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-6 mb-8">
          <Logo />
          <Link
            href="/"
            className="clay-card rounded-full bg-ink text-white px-5 py-2.5 text-xs font-display uppercase font-black"
          >
            ← Back to Lobby
          </Link>
        </div>

        {/* Content Panel */}
        <div className="clay-card bg-paper p-8 md:p-12 rounded-[32px] border-2 border-white/50 shadow-soft">
          <h1 className="font-display text-[36px] md:text-[46px] leading-none uppercase font-black tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 font-bold mb-8 uppercase tracking-widest">
            Last Updated: August 1, 2026
          </p>

          <div className="prose prose-ink space-y-6 text-sm font-semibold text-gray-800 leading-relaxed">
            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">1. Spawn Protocol & Data Collection</h2>
              <p>
                When you initiate registration matchmaking for Nirmaan, we collect specific parameters including player names, comms emails, organizational affiliations, expected party sizes, and notes. This data is required to generate team pages, spawn lobby slots, and configure your participant profile.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">2. Processing & Quest Logging</h2>
              <p>
                Participant coordinates and team information are recorded inside our active room dashboard. Live build metrics, submission links, and scoreboards are shared publically to ensure open-source integrity and transparent scoring by game masters and mentors.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">3. Storage & Safe-Rooms</h2>
              <p>
                Your builder profile information is hosted securely. We employ administrative safeguards to prevent unauthorised modifications to database states or submission score records.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">4. Communications Grid</h2>
              <p>
                Comms email addresses will be used solely for critical quest notifications, schedule updates, team matching briefs, and certificate distributions. No advertising newsletters or sponsor trackers will access this line.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">5. Player Rights</h2>
              <p>
                Builders retain the right to query, alter, or terminate their registration profiles from our active rosters at any time. Simply ping active organizers at the BMSIT campus center to purge logs.
              </p>
            </section>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center mt-12 text-[10px] font-display uppercase tracking-widest font-black text-ink/40">
        © 2026 NIRMAAN // PRIVACY GRID
      </footer>
    </main>
  );
}
