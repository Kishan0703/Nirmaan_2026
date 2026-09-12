"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Trophy,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  RotateCcw,
  User,
} from "lucide-react";

export type ProjectSubmission = {
  id: string;
  team: string;
  leader?: string;
  track?: string;
  status: string;
  score?: string;
};

const AVATAR_PALETTES = [
  "bg-yellow text-ink",
  "bg-purple text-white",
  "bg-blue text-white",
  "bg-green text-ink",
  "bg-orange text-white",
];

function getAvatarColor(teamName: string) {
  const clean = (teamName || "").trim();
  if (!clean) return AVATAR_PALETTES[0];
  const charCode = clean.charCodeAt(0);
  return AVATAR_PALETTES[charCode % AVATAR_PALETTES.length];
}

function getInitialAvatar(teamName: string) {
  const trimmed = (teamName || "").trim();
  return trimmed.charAt(0).toUpperCase() || "#";
}

export function SubmissionBoard() {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<"finalist" | "waitlist">("finalist");
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  const finalistsCount = useMemo(() => {
    return submissions.filter((s) => !s.status.toLowerCase().includes("waitlist")).length;
  }, [submissions]);

  const waitlistCount = useMemo(() => {
    return submissions.filter((s) => s.status.toLowerCase().includes("waitlist")).length;
  }, [submissions]);

  // Filtered list: Finalists sorted alphabetically (numbers at top); Waitlist preserved in exact Drive order
  const filteredSubmissions = useMemo(() => {
    let categoryFiltered: ProjectSubmission[] = [];

    if (category === "waitlist") {
      // Keep waitlist teams in the exact sequence as in the Google Drive sheet
      categoryFiltered = submissions.filter((item) =>
        item.status.toLowerCase().includes("waitlist")
      );
    } else {
      // Finalists: alphabetical order with numbers at the top
      categoryFiltered = submissions
        .filter((item) => !item.status.toLowerCase().includes("waitlist"))
        .sort((a, b) =>
          a.team.localeCompare(b.team, undefined, { numeric: true, sensitivity: "base" })
        );
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return categoryFiltered;

    return categoryFiltered.filter((item) => {
      return (
        item.team.toLowerCase().includes(q) ||
        (item.leader && item.leader.toLowerCase().includes(q)) ||
        item.status.toLowerCase().includes(q)
      );
    });
  }, [submissions, category, searchQuery]);

  return (
    <section id="round1-results" className="my-gap grid gap-gap lg:grid-cols-[1.12fr_.88fr]" data-reveal>
      {/* Left Column: Round 1 Results Board */}
      <div className="rounded-brand p-4 sm:p-box bg-white/85 backdrop-blur-md clay-card text-ink flex flex-col justify-between">
        <div>
          {/* Header Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-yellow text-ink text-[10px] sm:text-xs font-display uppercase font-black px-3.5 py-1.5 rounded-full border-2 border-ink shadow-[2px_2px_0px_0px_#18181b]">
              <Trophy size={13} className="text-ink shrink-0" />
              Round 1 Shortlist
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-section uppercase tracking-tight text-ink font-black leading-tight">
            Round 1 Results
          </h2>
          <p className="mt-2 max-w-[680px] text-xs sm:text-body-xl text-ink/80 font-semibold leading-relaxed">
            Official shortlist of qualified teams advancing from Round 1 nationwide PPT submissions to the 24-hour Grand Finale in Bangalore.
          </p>

          {submissions.length > 0 ? (
            <>
              {/* Category Buttons: Finalist & Waitlist */}
              <div className="mt-4 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCategory("finalist")}
                  className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-display text-xs sm:text-sm font-black uppercase transition-all border-2 border-ink ${
                    category === "finalist"
                      ? "bg-yellow text-ink shadow-[3px_3px_0px_0px_#18181b] -translate-y-0.5"
                      : "bg-paper/80 hover:bg-white text-ink/70 hover:text-ink shadow-2xs"
                  }`}
                >
                  <Trophy size={14} className={category === "finalist" ? "text-ink" : "text-ink/50"} />
                  <span>Finalist</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      category === "finalist" ? "bg-ink text-yellow" : "bg-ink/10 text-ink/70"
                    }`}
                  >
                    {finalistsCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory("waitlist")}
                  className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-display text-xs sm:text-sm font-black uppercase transition-all border-2 border-ink ${
                    category === "waitlist"
                      ? "bg-yellow text-ink shadow-[3px_3px_0px_0px_#18181b] -translate-y-0.5"
                      : "bg-paper/80 hover:bg-white text-ink/70 hover:text-ink shadow-2xs"
                  }`}
                >
                  <Clock size={14} className={category === "waitlist" ? "text-ink" : "text-ink/50"} />
                  <span>Waitlist</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      category === "waitlist" ? "bg-ink text-yellow" : "bg-ink/10 text-ink/70"
                    }`}
                  >
                    {waitlistCount}
                  </span>
                </button>
              </div>

              {/* Search Control */}
              <div className="mt-3.5 space-y-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${category === "finalist" ? "finalists" : "waitlist"} by team name or leader...`}
                    className="w-full pl-9 pr-8 py-2.5 text-xs font-bold rounded-xl border-2 border-ink/20 bg-paper/50 focus:bg-white focus:border-ink outline-none transition-all placeholder:text-ink/40"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-ink/40 hover:text-ink"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Filtered Results List */}
              <div className="mt-4 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub) => {
                    const avatarColor = getAvatarColor(sub.team);
                    const avatarLetter = getInitialAvatar(sub.team);

                    return (
                      <div
                        key={sub.id}
                        className="group relative rounded-2xl border-2 border-ink bg-paper/90 hover:bg-white p-3 sm:p-3.5 transition-all shadow-xs hover:shadow-md flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Initial Avatar (Numbers & Letters) */}
                          <div
                            className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center font-display font-black text-xs sm:text-sm uppercase shrink-0 border-2 border-ink shadow-[2px_2px_0px_0px_#18181b] ${avatarColor}`}
                          >
                            {avatarLetter}
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-display text-sm sm:text-base font-black uppercase text-ink tracking-tight truncate">
                              {sub.team}
                            </h4>
                            {sub.leader && (
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink/75 mt-0.5">
                                <User size={12} className="text-purple shrink-0" />
                                <span>Leader: <strong className="text-ink font-black">{sub.leader}</strong></span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          {sub.status.toLowerCase().includes("waitlist") ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-display text-[10px] sm:text-[11px] font-black uppercase shadow-2xs">
                              <Clock size={12} className="text-amber-700 shrink-0" />
                              <span>{sub.status || "Waitlisted"}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green/15 text-green border border-green/30 font-display text-[10px] sm:text-[11px] font-black uppercase shadow-2xs">
                              <CheckCircle2 size={12} className="text-green shrink-0" />
                              <span>{sub.status || "Qualified"}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : category === "waitlist" && !searchQuery ? (
                  /* Empty Waitlist State */
                  <div className="p-8 rounded-2xl border-2 border-dashed border-ink/20 text-center flex flex-col items-center justify-center bg-paper/40">
                    <Clock size={28} className="text-ink/40 mb-2" />
                    <p className="font-display text-xs sm:text-sm font-black uppercase text-ink/70">
                      No teams currently on waitlist
                    </p>
                    <p className="text-xs text-ink/60 font-semibold mt-1 max-w-xs">
                      All announced teams are confirmed finalists. Waitlisted teams will be posted here if positions open up.
                    </p>
                  </div>
                ) : (
                  /* No Matching Query State */
                  <div className="p-6 rounded-2xl border-2 border-dashed border-ink/20 text-center flex flex-col items-center justify-center bg-paper/40">
                    <p className="font-display text-xs sm:text-sm font-black uppercase text-ink/70">
                      No {category === "waitlist" ? "waitlisted" : "finalist"} teams found
                    </p>
                    <p className="text-xs text-ink/60 font-semibold mt-1 max-w-xs">
                      No results matched your search query.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-ink bg-white font-display text-[11px] font-black uppercase shadow-xs hover:bg-yellow transition-all"
                    >
                      <RotateCcw size={12} />
                      Reset Search
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty State: PPT Evaluations In Progress */
            <div className="mt-5 sm:mt-6 p-6 sm:p-7 rounded-[24px] border-2 border-white/60 bg-gradient-to-br from-paper via-white to-yellow/15 clay-card text-center flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-[22px] bg-purple text-white border-2 border-white flex items-center justify-center shadow-xl mb-4 transform -rotate-3">
                <Clock size={36} className="text-yellow animate-spin" style={{ animationDuration: "8s" }} />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-ink text-yellow text-[10px] sm:text-xs font-display uppercase font-black px-3.5 py-1.5 rounded-full shadow-md mb-3">
                <Sparkles size={13} />
                <span>EVALUATIONS UNDERWAY</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl uppercase font-black text-ink leading-tight tracking-tight">
                Round 1 Results Dropping Soon
              </h3>

              <p className="mt-2 max-w-md text-xs sm:text-sm text-ink/80 font-bold leading-relaxed">
                Our national jury is reviewing all Round 1 online PPT submissions across innovation, feasibility, architecture, and real-world impact. Verified qualified finalists will go live here immediately!
              </p>

              {/* Rubric Criteria Chips */}
              <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-sm text-left">
                <div className="p-2.5 rounded-xl bg-white border border-ink/10 shadow-2xs">
                  <p className="font-display text-[10px] font-black uppercase text-purple">30% Innovation</p>
                  <p className="text-[10px] text-ink/70 font-bold">Novelty of problem solution</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-ink/10 shadow-2xs">
                  <p className="font-display text-[10px] font-black uppercase text-blue">30% Feasibility</p>
                  <p className="text-[10px] text-ink/70 font-bold">Tech stack & execution plan</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-ink/10 shadow-2xs">
                  <p className="font-display text-[10px] font-black uppercase text-green">20% Prototype</p>
                  <p className="text-[10px] text-ink/70 font-bold">Demo readiness & architecture</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-ink/10 shadow-2xs">
                  <p className="font-display text-[10px] font-black uppercase text-orange">20% Impact</p>
                  <p className="text-[10px] text-ink/70 font-bold">Market viability & SDGs</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Grand Finale Finalist Showcase Card */}
      <div className="relative min-h-[320px] sm:min-h-[520px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft flex flex-col justify-between p-4 sm:p-6">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Bangalore Grand Finale Stage"
          fill
          className="object-cover filter contrast-125 saturate-50 -z-10"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/60 -z-10" />

        {/* Top Floating Badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 bg-yellow text-ink text-[10px] sm:text-xs font-display uppercase font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-ink">
            <Sparkles size={13} />
            Stage 02 · Grand Finale
          </span>
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-display uppercase font-black px-3 py-1.5 rounded-full border border-white/30">
            Sep 25 & 26, 2026
          </span>
        </div>

        {/* Bottom Content Card */}
        <div className="rounded-[20px] sm:rounded-[24px] bg-paper/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl clay-card text-ink border-2 border-white/60">
          <p className="font-display text-base sm:text-xl leading-none uppercase text-ink flex items-center gap-2 font-black">
            <Trophy size={18} className="text-yellow shrink-0" /> Finalist Showcase
          </p>
          <p className="mt-2 text-xs sm:text-sm text-gray-800 font-bold leading-relaxed">
            Shortlisted teams from Round 1 will present live prototypes on the Bangalore Grand Finale stage at BMSIT.
          </p>

          {/* Perks Grid for Qualifiers */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-ink/10 pt-3 text-[11px] font-bold text-ink">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow font-black">🏆</span>
              <span>₹1,00,000+ Prize Pool</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-blue font-black">⚡</span>
              <span>24h Rapid Build</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-green font-black">🍕</span>
              <span>Meals & Swag Kit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-purple font-black">🤝</span>
              <span>Mentor & VC Jury</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

