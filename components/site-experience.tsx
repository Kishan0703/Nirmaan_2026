"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, MutableRefObject } from "react";
import { ArrowUpRight, CloseIcon, DownArrows, SocialInstagram, SocialLinkedin } from "@/components/icons";
import { Logo } from "@/components/logo";
import { menuItems } from "@/lib/data";
import { Sparkles } from "lucide-react";
import { REGISTRATION_URL } from "@/lib/config";

// Section imports
import { Hero } from "./hero";
import { ReverseCountdownClock } from "./reverse-countdown-clock";
import { Announcements } from "./announcements";
import { EventFlow } from "./flow";
import { ScheduleBoard } from "./schedule";
import { Tracks } from "./tracks";
import { PrizePoolSection } from "./prize-pool";
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
import { LobbyNotificationListener } from "./lobby-notification";
import { WhatsappFloatingButton } from "./whatsapp-floating-button";

const MARQUEE_ONE_ITEMS = ["Matchmaking Lobby", "Spawn quest brief", "Speedrun build", "Game Master rating", "Loot distribution", "Hall of Fame"];
const MARQUEE_TWO_ITEMS = ["Campus Rigs", "Online Lobby", "Hybrid Hub", "Game rules", "Retro scoreboards", "Claim achievement badges"];

// Side Rail Navigation (Compact sleek tabs)
function Rail({ onBook }: { onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[165px] xl:w-[180px] flex-col px-[8px] py-[10px] lg:flex justify-between bg-paper/20 backdrop-blur-md overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Top Header Section with Logo Block */}
      <div className="flex flex-col items-start gap-1 pb-1 px-1 shrink-0">
        <Logo />
      </div>

      {/* Main Navigation Stack (Compact Sleek Tabs) */}
      <nav aria-label="Main navigation" className="flex-1 flex flex-col gap-1.5 my-2 w-full justify-between">
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            className={`${item.color} group clay-card relative flex flex-1 min-h-[42px] xl:min-h-[46px] w-full flex-col justify-between rounded-[12px] p-2 xl:p-2.5 transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
          >

            <div className="flex items-center justify-between w-full">
              <span className="font-aeonik text-[10px] xl:text-[11px] font-normal opacity-75 leading-none">
                {item.index}
              </span>
              <ArrowUpRight className="h-[12px] w-[12px] opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <span className="font-aeonik text-xs xl:text-[13px] font-bold leading-snug text-left truncate">
              {item.label}
            </span>
          </a>
        ))}

        {/* Join Nirmaan Action Box */}
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group clay-card relative flex flex-1 min-h-[42px] xl:min-h-[46px] w-full flex-col justify-between rounded-[12px] bg-purple p-2 xl:p-2.5 text-white transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-paper text-left"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-aeonik text-[10px] xl:text-[11px] font-normal opacity-75 leading-none">
              07
            </span>
            <ArrowUpRight className="h-[12px] w-[12px] opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <span className="font-aeonik text-xs xl:text-[13px] font-bold leading-snug truncate">
            Join Nirmaan
          </span>
        </a>
      </nav>

      {/* Bottom Legal / Year Box & Social Icons */}
      <div className="flex flex-col gap-1.5 pt-1.5 border-t border-ink/10 shrink-0">
        <a
          href="#top"
          className="group clay-card flex w-full items-center justify-center rounded-[10px] bg-paper py-1 transition-all hover:scale-[1.02]"
        >
          <span className="font-aeonik text-[10px] uppercase tracking-wider font-bold text-gray-700">Nirmaan 2026</span>
        </a>

        {/* Social Media Icons Row */}
        <div className="flex items-center justify-center gap-2.5 px-1">
          <a
            href="https://www.instagram.com/codingclub_bmsit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-7 w-7 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-red hover:scale-110 transition-all shadow-sm"
          >
            <SocialInstagram className="w-3 h-3" />
          </a>
          <a
            href="https://www.linkedin.com/in/codingclub-bmsit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-7 w-7 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-blue hover:scale-110 transition-all shadow-sm"
          >
            <SocialLinkedin className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
}

// Mobile Header (Claymorphic)
function MobileHeader({ open, setOpen, onBook }: { open: boolean; setOpen: (value: boolean) => void; onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-paper/90 backdrop-blur-md border-b border-ink/10 px-4 sm:px-5 py-2.5 sm:py-3 lg:hidden shadow-sm h-[64px]">
      <Logo />
      <div className="flex items-center gap-2">
        <a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="clay-card rounded-pill bg-purple px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-display uppercase text-white font-black active:scale-95 transition-transform"
        >
          Join Nirmaan
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-9 w-9 sm:h-10 sm:w-10 place-content-center rounded-full bg-ink text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-95 transition-transform"
        >
          <span className="hamburger" />
        </button>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""} border-b border-ink/5 flex flex-col gap-3 p-4`} aria-hidden={!open}>
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className={`${item.color} clay-card rounded-[12px] p-4 font-display text-lg uppercase flex items-center justify-between`}
          >
            <span className="flex items-center gap-2">
              <span>{item.label}</span>
              <ArrowUpRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="font-aeonik text-xs opacity-75 font-normal">{item.index}</span>
          </a>
        ))}

        {/* Mobile Social Bar */}
        <div className="flex items-center justify-center gap-4 pt-3 border-t border-ink/10">
          <a
            href="https://www.instagram.com/codingclub_bmsit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-red transition-all"
          >
            <SocialInstagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/codingclub-bmsit/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full clay-card bg-ink text-white hover:bg-blue transition-all"
          >
            <SocialLinkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

// Interactive Participation Modal Component
function ParticipationModal({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: MutableRefObject<HTMLElement | null>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusableElements || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <aside className="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef} className="dialog-content text-ink">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="clay-card rounded-full bg-ink p-2 text-white hover:bg-red focus:outline-none focus-visible:ring-2 focus-visible:ring-purple absolute top-4 right-4"
        >
          <CloseIcon />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-yellow p-3 text-ink clay-card">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 id="modal-title" className="font-display text-2xl uppercase tracking-tight text-ink font-black">
              JOIN NIRMAAN 2026
            </h2>
            <p className="text-xs font-bold text-gray-700">Official registrations are open on MastryHub.</p>
          </div>
        </div>

        <div className="mb-5 rounded-[18px] bg-purple/10 border-2 border-purple/30 p-3.5 text-ink flex items-center justify-between gap-3 shadow-xs">
          <div>
            <p className="text-xs font-black uppercase text-purple">Official Event Portal</p>
            <p className="text-[11px] font-bold text-ink/80">Registrations are hosted on MastryHub</p>
          </div>
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-purple text-white px-4 py-2 font-display text-xs uppercase font-black hover:bg-purple-light shrink-0 flex items-center gap-1 shadow-sm"
          >
            MastryHub <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {submitted ? (
          <div className="rounded-[20px] bg-green-light/30 border-2 border-green/40 p-6 text-center shadow-sm">
            <h3 className="font-display text-xl uppercase font-black text-ink mb-2">🎉 Quest Registered!</h3>
            <p className="text-sm font-semibold text-ink/90">
              Welcome to the Nirmaan lobby! Check your email inbox for Discord guild invites and check-in updates.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-pill bg-ink text-white px-6 py-2.5 font-display text-xs uppercase font-black hover:bg-purple shadow-md"
            >
              Back to Arena
            </button>
          </div>
        ) : (
          <form className="grid gap-4 text-ink" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field">
                <span className="text-xs tracking-wide">Player Name</span>
                <input name="fullName" type="text" required placeholder="Arnav Paniya" className="border-2 border-white/40 bg-white/45 focus:bg-white" />
              </label>
              <label className="field">
                <span className="text-xs tracking-wide">Email Handle</span>
                <input name="email" type="email" required placeholder="builder@nirmaan.tech" className="border-2 border-white/40 bg-white/45 focus:bg-white" />
              </label>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field">
                <span className="text-xs tracking-wide">Guild / Institution</span>
                <input name="teamName" type="text" required placeholder="BMSIT Bangalore" className="border-2 border-white/40 bg-white/45 focus:bg-white" />
              </label>
              <label className="field">
                <span className="text-xs tracking-wide">Target Month</span>
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
        )}
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
      
      <main className="relative ml-0 overflow-x-clip px-2.5 sm:px-0 pt-[68px] lg:ml-[170px] xl:ml-[185px] lg:px-0 lg:pr-5 lg:pt-[30px]">
        <article className="home">
          {/* Hero & Countdown */}
          <Hero onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
          <ReverseCountdownClock />
          <Marquee color="bg-red" textColor="text-yellow" items={MARQUEE_ONE_ITEMS} />
          
          {/* 01. Overview & Announcements */}
          <Announcements />
          
          {/* 02. Domain Tracks */}
          <Tracks onBook={() => openModal(document.activeElement instanceof HTMLElement ? document.activeElement : null)} />
          
          {/* Prize Pool Breakdown */}
          <PrizePoolSection />

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
          <Community />
          
          {/* Footer */}
          <Footer />
        </article>
      </main>
      
      <ParticipationModal open={modalOpen} onClose={() => setModalOpen(false)} returnFocusRef={lastModalTriggerRef} />
      <LobbyNotificationListener />
      {!loading && <WhatsappFloatingButton />}
    </>
  );
}
