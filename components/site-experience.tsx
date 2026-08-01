"use client";

import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import { ArrowUpRight, CloseIcon, DownArrows } from "@/components/icons";
import { Logo } from "@/components/logo";
import { menuItems } from "@/lib/data";
import { Sparkles } from "lucide-react";

// Section imports
import { Hero } from "./hero";
import { EventOverview } from "./overview";
import { Announcements } from "./announcements";
import { EventFlow } from "./flow";
import { ScheduleBoard } from "./schedule";
import { Tracks } from "./tracks";
import { BugSquasherGame } from "./game";
import { SubmissionBoard } from "./submissions";
import { GallerySection } from "./gallery";
import { LocationMap } from "./map";
import { FAQSection } from "./faq";
import { SponsorWall } from "./sponsors";
import { Community } from "./community";
import { Values } from "./values";
import { TeamSection } from "./team-section";
import { Footer } from "./footer";
import { Marquee, SectionTitle } from "./helpers";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./preloader";

// Side Rail Navigation (Claymorphic & Compact to prevent vertical overflow)
function Rail({ onBook }: { onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[calc(theme(spacing.rail)+25px)] flex-col px-[22px] py-[25px] lg:flex justify-between bg-paper/20 backdrop-blur-md">
      
      {/* Top Header Section */}
      <div className="flex flex-col gap-4">
        <Logo className="w-full" />
      </div>

      {/* Main compact Navigation stack */}
      <nav aria-label="Main navigation" className="flex flex-col gap-[8px] my-auto">
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            className={`${item.color} group clay-card flex h-[52px] items-center justify-between rounded-[12px] px-[16px] py-[8px] text-ink`}
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-xs opacity-60">{item.index}</span>
              <span className="font-display text-[13px] uppercase font-black tracking-wider">{item.label}</span>
            </div>
            <ArrowUpRight className="h-[14px] w-[14px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </nav>
      
      {/* Bottom controls */}
      <div className="flex flex-col gap-[8px]">
        <a
          href="#tracks"
          className="h-[52px] clay-card rounded-[12px] bg-yellow px-4 flex items-center justify-center text-center font-display text-[13px] uppercase font-black text-ink hover:bg-yellow-light focus:outline-none"
        >
          Problem Statements
        </a>

        <button
          type="button"
          onClick={onBook}
          className="h-[52px] clay-card rounded-[12px] bg-purple px-4 text-center font-display text-[14px] uppercase font-black text-white hover:bg-purple-light hover:text-ink focus:outline-none"
        >
          Join Nirmaan
        </button>

        <a
          href="#top"
          className="flex h-[44px] items-center justify-center rounded-[12px] clay-card bg-paper text-ink px-[18px]"
        >
          <span className="font-aeonik text-[10px] uppercase tracking-wider font-bold text-gray-700">Nirmaan 2026</span>
        </a>
      </div>
    </header>
  );
}

// Mobile Header (Claymorphic)
function MobileHeader({ open, setOpen, onBook }: { open: boolean; setOpen: (value: boolean) => void; onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-paper/80 backdrop-blur-md border-b border-ink/5 px-5 py-3 lg:hidden">
      <Logo />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBook}
          className="clay-card rounded-pill bg-purple px-4 py-2 text-xs font-display uppercase text-white font-black"
        >
          Join Nirmaan
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-content-center rounded-full bg-ink text-white"
        >
          <span className="hamburger" />
        </button>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""} border-b border-ink/5`}>
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`${item.color} clay-card rounded-[12px] p-4 font-display text-lg uppercase`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

// Onboarding Modal (Claymorphic)
function ParticipationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const initialFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    initialFocusRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
    onClose();
  };

  return (
    <aside aria-hidden={!open} className={`modal-shell ${open ? "open" : ""}`}>
      <button type="button" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" aria-label="Close form" onClick={onClose} />
      
      <div role="dialog" aria-modal="true" aria-labelledby="participation-title" className="modal-panel border-l border-white/20">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 z-20 grid h-12 w-12 place-content-center rounded-full bg-ink text-white hover:bg-red"
        >
          <CloseIcon />
        </button>
        
        <div className="flex items-center justify-between bg-orange border-b border-white/20 px-6 py-[22px] text-yellow">
          <DownArrows />
          <h2 id="participation-title" className="font-display text-section uppercase tracking-tight text-ink font-black">Register for Nirmaan</h2>
          <DownArrows />
        </div>
        
        <form onSubmit={handleSubmit} className="grid gap-4 p-box bg-paper">
          
          <div className="flex items-center gap-4 bg-[#fcedde] border border-white/40 rounded-[14px] p-4 mb-2 shadow-sm">
            <Sparkles size={36} className="text-yellow animate-bounce" />
            <div>
              <p className="font-display text-sm uppercase text-ink font-black">INITIATE MATCHMAKING</p>
              <p className="text-xs text-gray-700 font-bold">Register as a builder, mentor, or sponsor for Nirmaan 2026.</p>
            </div>
          </div>

          <label className="field">
            <span className="text-xs tracking-wide">Player Name</span>
            <input ref={initialFocusRef} name="name" placeholder="eg. Player_One" required className="border-2 border-white/40 bg-white/45 focus:bg-white" />
          </label>
          
          <label className="field">
            <span className="text-xs tracking-wide">Guild / College / Organisation</span>
            <input name="organization" placeholder="eg. Zero_Junction" required className="border-2 border-white/40 bg-white/45 focus:bg-white" />
          </label>
          
          <label className="field">
            <span className="text-xs tracking-wide">Comms Email</span>
            <input name="email" type="email" placeholder="eg. player@lobby.gg" required className="border-2 border-white/40 bg-white/45 focus:bg-white" />
          </label>
          
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field">
              <span className="text-xs tracking-wide">Expected Party Size</span>
              <input name="participants" type="number" min="1" defaultValue="1" required className="border-2 border-white/40 bg-white/45 focus:bg-white" />
            </label>
            <label className="field">
              <span className="text-xs tracking-wide">Spawn Date</span>
              <input name="targetMonth" type="month" required className="border-2 border-white/40 bg-white/45 focus:bg-white" />
            </label>
          </div>
          
          <label className="field">
            <span className="text-xs tracking-wide">Choose Lobby Role</span>
            <select name="role" defaultValue="Builder" className="border-2 border-white/40 bg-white/45 p-4 rounded-[18px]">
              <option>Builder</option>
              <option>Mentor / Game Master</option>
              <option>Sponsor Guild</option>
              <option>Volunteer</option>
            </select>
          </label>
          
          <label className="field">
            <span className="text-xs tracking-wide">Player Objectives & Notes</span>
            <textarea name="notes" rows={3} placeholder="Describe your tracks, tech gear, or how you want to support Nirmaan." className="border-2 border-white/40 bg-white/45 focus:bg-white" />
          </label>
          
          <button
            className="mt-2 rounded-pill bg-green px-8 py-4 font-display text-lg uppercase text-ink hover:bg-white active:translate-y-1 clay-card font-black"
            type="submit"
          >
            START QUEST
          </button>
        </form>
      </div>
    </aside>
  );
}

export function SiteExperience() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const marqueeOne = useMemo(() => ["Matchmaking Lobby", "Spawn quest brief", "Speedrun build", "Game Master rating", "Loot distribution", "Hall of Fame"], []);
  const marqueeTwo = useMemo(() => ["Campus Rigs", "Online Lobby", "Hybrid Hub", "Game rules", "Retro scoreboards", "Claim achievement badges"], []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Rail onBook={() => setModalOpen(true)} />
      <MobileHeader open={menuOpen} setOpen={setMenuOpen} onBook={() => setModalOpen(true)} />
      
      <main className="relative ml-0 overflow-hidden px-0 pt-[75px] lg:ml-[calc(theme(spacing.rail)+25px)] lg:px-0 lg:pr-5 lg:pt-[30px]">
        <article className="home">
          <Hero onBook={() => setModalOpen(true)} />
          <EventOverview />
          <Marquee color="bg-red" textColor="text-yellow" items={marqueeOne} />
          
          <Announcements />
          
          <EventFlow />
          <ScheduleBoard />
          <Marquee color="bg-blue" textColor="text-green-light" items={marqueeTwo} />
          
          <Tracks onBook={() => setModalOpen(true)} />
          <BugSquasherGame />
          
          <SubmissionBoard />
          <GallerySection />
          
          <LocationMap />
          <FAQSection />
          
          <SponsorWall />
          <Community onBook={() => setModalOpen(true)} />
          
          <SectionTitle>Judging Criteria</SectionTitle>
          <Values />
          
          <TeamSection />
          
          <Footer />
        </article>
      </main>
      
      <ParticipationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
