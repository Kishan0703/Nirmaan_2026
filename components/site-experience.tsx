"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, MutableRefObject } from "react";
import { ArrowUpRight, CloseIcon, DownArrows, SocialInstagram, SocialTwitter, SocialLinkedin, SocialGithub } from "@/components/icons";
import { Logo } from "@/components/logo";
import { menuItems } from "@/lib/data";
import { Sparkles } from "lucide-react";

// Section imports
import { Hero } from "./hero";
import { ReverseCountdownClock } from "./reverse-countdown-clock";
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

const MARQUEE_ONE_ITEMS = ["Matchmaking Lobby", "Spawn quest brief", "Speedrun build", "Game Master rating", "Loot distribution", "Hall of Fame"];
const MARQUEE_TWO_ITEMS = ["Campus Rigs", "Online Lobby", "Hybrid Hub", "Game rules", "Retro scoreboards", "Claim achievement badges"];

// Side Rail Navigation (Matching reference style)
function Rail({ onBook }: { onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[200px] flex-col px-[10px] py-[12px] lg:flex justify-between bg-paper/20 backdrop-blur-md overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Top Header Section with Logo Block */}
      <div className="flex flex-col items-start gap-1 pb-1 px-1">
        <Logo />
      </div>

      {/* Main Navigation Stack (Compact Height) */}
      <nav aria-label="Main navigation" className="flex flex-col gap-[6px] my-auto w-full">
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            className={`${item.color} group clay-card relative flex h-[58px] w-full shrink-0 flex-col justify-between rounded-[12px] p-[10px] transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-aeonik text-[11px] font-normal opacity-75 leading-none">
                {item.index}
              </span>
              {item.external && (
                <ArrowUpRight className="h-[12px] w-[12px] opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </div>
            <span className="font-aeonik text-[13px] font-bold leading-tight text-left">
              {item.label}
            </span>
          </a>
        ))}

        {/* Join Nirmaan Action Box */}
        <button
          type="button"
          onClick={onBook}
          className="group clay-card relative flex h-[58px] w-full shrink-0 flex-col justify-between rounded-[12px] bg-purple p-[10px] text-white transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-paper text-left"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-aeonik text-[11px] font-normal opacity-75 leading-none">
              07
            </span>
            <ArrowUpRight className="h-[12px] w-[12px] opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <span className="font-aeonik text-[13px] font-bold leading-tight">
            Join Nirmaan
          </span>
        </button>
      </nav>
      
      {/* Bottom Section: Nirmaan 2026 Tag + Social Media Icons */}
      <div className="pt-1 flex flex-col gap-2">
        <a
          href="#top"
          className="flex h-[34px] w-full items-center justify-center rounded-[10px] clay-card bg-paper text-ink px-3 transition-transform hover:scale-[1.01]"
        >
          <span className="font-aeonik text-[11px] uppercase tracking-wider font-bold text-gray-700">Nirmaan 2026</span>
        </a>

        {/* Social Media Icons Row */}
        <div className="flex items-center justify-between px-1">
          <a
            href="https://www.instagram.com/codingclub_bmsit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-8 w-8 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-red hover:scale-110 transition-all shadow-sm"
          >
            <SocialInstagram className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="flex h-8 w-8 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-blue hover:scale-110 transition-all shadow-sm"
          >
            <SocialTwitter className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-purple hover:scale-110 transition-all shadow-sm"
          >
            <SocialLinkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-orange hover:scale-110 transition-all shadow-sm"
          >
            <SocialGithub className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

// Mobile Header (Claymorphic)
function MobileHeader({ open, setOpen, onBook }: { open: boolean; setOpen: (value: boolean) => void; onBook: () => void }) {
  const handleBook = () => {
    setOpen(false);
    onBook();
  };

  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-paper/80 backdrop-blur-md border-b border-ink/5 px-5 py-3 lg:hidden">
      <Logo />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleBook}
          className="clay-card rounded-pill bg-purple px-4 py-2 text-xs font-display uppercase text-white font-black"
        >
          Join Nirmaan
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-content-center rounded-full bg-ink text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <span className="hamburger" />
        </button>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""} border-b border-ink/5`} aria-hidden={!open}>
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
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
function ParticipationModal({ open, onClose, returnFocusRef }: { open: boolean; onClose: () => void; returnFocusRef: MutableRefObject<HTMLElement | null> }) {
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const returnFocusElement = returnFocusRef.current;
    setSubmitted(false);
    initialFocusRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const focusable = Array.from(focusableElements ?? []);

      if (!focusable.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      returnFocusElement?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  };

  return (
    <aside aria-hidden={!open} className={`modal-shell ${open ? "open" : ""}`}>
      <button type="button" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" aria-label="Close form" onClick={onClose} />
      
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="participation-title" className="modal-panel border-l border-white/20">
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
              <p className="font-display text-sm uppercase text-ink font-black">
                {submitted ? "REQUEST RECEIVED" : "INITIATE MATCHMAKING"}
              </p>
              <p className="text-xs text-gray-700 font-bold" aria-live="polite">
                {submitted
                  ? "Your details are ready for organizer follow-up. No data was sent from this preview form."
                  : "Register as a builder, mentor, or sponsor for Nirmaan 2026."}
              </p>
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
  const lastModalTriggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((trigger?: HTMLElement | null) => {
    if (trigger) {
      lastModalTriggerRef.current = trigger;
    }
    setModalOpen(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Rail onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
      <MobileHeader open={menuOpen} setOpen={setMenuOpen} onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
      
      <main className="relative ml-0 overflow-x-clip px-0 pt-[75px] lg:ml-[200px] lg:px-0 lg:pr-5 lg:pt-[30px]">
        <article className="home">
          {/* Hero & Countdown */}
          <Hero onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
          <ReverseCountdownClock />
          <Marquee color="bg-red" textColor="text-yellow" items={MARQUEE_ONE_ITEMS} />
          
          {/* 01. Overview & Announcements */}
          <Announcements />
          
          {/* 02. Problem Statements & Tracks */}
          <Tracks onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
          
          {/* Judging Criteria */}
          <SectionTitle>Judging Criteria</SectionTitle>
          <Values />

          {/* 03. Timeline & Event Flow */}
          <ScheduleBoard />
          <EventFlow />
          
          <Marquee color="bg-blue" textColor="text-green-light" items={MARQUEE_TWO_ITEMS} />
          
          {/* 04. Bug Squasher Game & Submissions */}
          <BugSquasherGame />
          <SubmissionBoard />
          
          {/* Sponsors & Gallery */}
          <SponsorWall />
          <GallerySection />
          
          {/* 05. Location Map */}
          <LocationMap />
          
          {/* 06. FAQ & Team Directory */}
          <FAQSection />
          <TeamSection />
          
          {/* Community Join CTA */}
          <Community onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
          
          {/* Footer */}
          <Footer />
        </article>
      </main>
      
      <ParticipationModal open={modalOpen} onClose={() => setModalOpen(false)} returnFocusRef={lastModalTriggerRef} />
    </>
  );
}
