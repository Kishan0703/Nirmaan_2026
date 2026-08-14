import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "@/components/icons";
import { InteractiveTiltCard } from "./helpers";
import { REGISTRATION_URL } from "@/lib/config";
import { liveMetrics as defaultLiveMetrics } from "@/lib/data";

export function Hero({ onBook }: { onBook?: () => void }) {
  const [metrics, setMetrics] = useState<[string, string][]>(defaultLiveMetrics as [string, string][]);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/game-settings");
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setMetrics([
              ["Registrations", data.config.registrationsCount || "0"],
              ["Teams formed", data.config.teamsFormedCount || "0"],
              ["Submissions", data.config.submissionsCount || "0 drafts"],
              ["Judges assigned", data.config.judgesAssignedCount || "0"],
            ]);
          }
        }
      } catch {
        // Fallback
      }
    }
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  const registerCtaClassName =
    "clay-card rounded-pill bg-yellow text-ink px-6 py-3.5 text-base sm:text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30 flex items-center gap-2 shadow-xl";

  return (
    <>
      {/* ── MOBILE HERO VIEW (< 768px): Matches target design screenshot ── */}
      <section id="top" className="md:hidden relative rounded-brand border-2 border-white/40 shadow-soft bg-paper p-5 text-ink clay-card overflow-hidden">
        {/* Subtle Background Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,0.12) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative z-10 flex flex-col items-start">
          {/* Top Badges Stack */}
          <div className="flex flex-col items-start gap-1.5 mb-4">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-yellow text-ink font-display text-[10px] uppercase font-black tracking-wider border border-ink/10 shadow-xs">
              MASTRYHUB × CODING CLUB × ALTERINO
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-purple text-white font-display text-[10px] uppercase font-black tracking-wider shadow-xs">
              24-HOUR HACKATHON
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="font-display text-4xl uppercase font-black tracking-tight text-ink leading-none mb-3">
            NIRMAAN <span className="text-purple">2026</span>
          </h1>

          {/* Description */}
          <p className="font-aeonik text-sm font-bold text-ink/90 leading-snug mb-4">
            Build, innovate, and impact the future. Join 420+ top builders in a high-stakes 24-hour national hackathon.
          </p>

          {/* Action Tag Pills */}
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3.5 py-1.5 rounded-full bg-red/15 border border-red/30 text-red font-display text-[10px] uppercase font-black">
              BUILD
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-blue/15 border border-blue/30 text-blue font-display text-[10px] uppercase font-black">
              INNOVATE
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-green/15 border border-green/30 text-green font-display text-[10px] uppercase font-black">
              IMPACT
            </span>
          </div>

          {/* Live Metrics Card */}
          <div className="w-full clay-card rounded-[22px] bg-white p-4 text-ink shadow-md border-2 border-white/60 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="rounded-full bg-green-light px-3 py-1 text-ink font-display text-[10px] uppercase font-black shadow-xs">
                Live event
              </span>
              <span className="pulse-dot" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {metrics.map(([label, value]) => (
                <div key={label} className="rounded-[14px] bg-[#f4e9e1]/70 p-3 text-ink shadow-xs border border-ink/5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-ink/60">{label}</p>
                  <p className="mt-0.5 font-display text-sm font-black leading-none text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full clay-card rounded-pill bg-yellow text-ink px-6 py-3.5 text-sm font-display uppercase font-black text-center border-2 border-white/40 flex items-center justify-center gap-2 shadow-lg mb-3"
          >
            <span>Register on MastryHub</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a
            href="#tracks"
            className="w-full clay-card rounded-pill bg-paper text-ink px-6 py-3.5 text-sm font-display uppercase font-black text-center border-2 border-white/40 shadow-md flex items-center justify-center"
          >
            Explore Domain Tracks
          </a>
        </div>
      </section>

      {/* ── DESKTOP HERO VIEW (>= 768px): Original Video Layout ── */}
      <section id="top-desktop" className="hidden md:grid relative min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft bg-black">
        {/* Background Hero Video */}
        <video
          src="/assets/videos/nirmaan-hero-merged.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div className="relative z-10 grid min-h-[calc(100dvh-50px)] content-between gap-6 px-8 py-8 text-white">
          {/* Top bar details (Live Event Metrics) */}
          <div className="flex flex-wrap items-start justify-end gap-5">
            <InteractiveTiltCard className="w-full max-w-[380px]">
              <div className="clay-card p-5 text-ink bg-paper/90 backdrop-blur-md rounded-[24px] border-2 border-white/60 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-pill bg-green-light border border-white/30 px-3 py-1 text-ink font-display text-[10px] uppercase font-black flex items-center gap-1.5 shadow-sm">
                    Live event
                  </span>
                  <span className="pulse-dot" aria-hidden="true" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {metrics.map(([label, value]) => (
                    <div key={label} className="rounded-[14px] bg-white/70 px-4 py-3 text-ink shadow-sm border border-white/40">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ink/60">{label}</p>
                      <p className="mt-1 font-display text-[18px] leading-none uppercase font-black text-ink">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </InteractiveTiltCard>
          </div>

          {/* Big visual statement */}
          <div className="max-w-[1180px]">
            <h1 className="hero-title justify-start text-left font-display text-hero text-white tracking-tighter uppercase">
              {"Build. Innovate. Impact."
                .split(" ")
                .map((word, index) => {
                  const colors = ["text-yellow font-black", "text-white", "text-green-light font-black"];
                  return (
                    <span
                      key={`${word}-${index}`}
                      className={`drop-shadow-lg ${colors[index] || "text-white"}`}
                      style={{ "--word-index": index } as CSSProperties}
                    >
                      {word}
                    </span>
                  );
                })}
            </h1>
            <p className="mt-5 max-w-[900px] font-aeonik text-[clamp(20px,1.5vw,28px)] font-bold leading-[1.15] text-white drop-shadow-md">
              National-level 24-hour innovation challenge for student builders across India. Run an intense sprint from idea to working prototype with real-world impact.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {REGISTRATION_URL ? (
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={registerCtaClassName}
                >
                  <span>Register on MastryHub</span>
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onBook}
                  className={registerCtaClassName}
                >
                  <span>Register on MastryHub</span>
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </button>
              )}
              <a
                href="#tracks"
                className="clay-card rounded-pill bg-paper text-ink px-6 py-3.5 text-base sm:text-body-xl font-display uppercase font-black transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30 shadow-xl"
              >
                Explore Tracks
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
