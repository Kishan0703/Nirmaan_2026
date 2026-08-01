"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";

export default function CookiesPolicy() {
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
            Cookies Policy
          </h1>
          <p className="text-xs text-gray-500 font-bold mb-8 uppercase tracking-widest">
            Last Updated: August 1, 2026
          </p>

          <div className="prose prose-ink space-y-6 text-sm font-semibold text-gray-800 leading-relaxed">
            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">1. What are Cookies in our Lobby?</h2>
              <p>
                Cookies are small files written to your browser. Nirmaan uses these files to preserve your local configurations, such as high scores in the Bug Squasher mini-game or active navigation states across pages.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">2. Functional & Essential Badges</h2>
              <p>
                Essential cookie parameters are set to map active room registrations and temporary forms. These parameters ensure your input is saved as you navigate between fields inside the matchmaking drawer.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">3. Bug Squasher High Scores</h2>
              <p>
                We use your browser&apos;s LocalStorage to store high score records (`nirmaan_high_score`) so you can track your competitive debugging performance. This data stays entirely local to your device.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">4. Third-Party Integrations</h2>
              <p>
                Our maps embed relies on third-party Google Maps widgets which may write geolocation and browser preferences to verify standard map delivery components.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg uppercase text-ink font-black mb-2">5. Disabling Tracking</h2>
              <p>
                You can block cookie files inside your browser preferences. Note that doing so will reset your game achievements and form wizard memory fields on page refresh.
              </p>
            </section>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center mt-12 text-[10px] font-display uppercase tracking-widest font-black text-ink/40">
        © 2026 NIRMAAN // COOKIE GRID
      </footer>
    </main>
  );
}
