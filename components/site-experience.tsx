"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  eventStats,
  hostingCards,
  liveMetrics,
  menuItems,
  projectSubmissions,
  scheduleItems,
  sponsorTiers,
  trackCards,
  values
} from "@/lib/data";
import { ArrowUpRight, CloseIcon, DownArrows, GlobeIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Rail({ onBook }: { onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[calc(theme(spacing.rail)+25px)] flex-col px-[22px] py-[40px] lg:flex">
      <Logo className="mb-[27px]" />
      <nav aria-label="Main navigation" className="flex flex-col gap-[14px]">
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            className={`${item.color} group flex h-[clamp(150px,9.48vw,182px)] flex-col justify-between rounded-[10px] px-[20px] py-[18px] text-ink transition-colors duration-500 hover:bg-paper hover:ring-1 hover:ring-ink`}
          >
            <span className="flex items-center justify-between font-aeonik text-rail">
              {item.index}
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="max-w-[120px] font-aeonik text-rail">{item.label}</span>
          </a>
        ))}
      </nav>
      <button
        type="button"
        onClick={onBook}
        className="mt-[14px] min-h-[86px] rounded-[10px] bg-purple px-4 text-center font-aeonik text-rail transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ink"
      >
        Start Hosting
      </button>
      <a href="#top" className="mt-[14px] flex h-[58px] items-center justify-between rounded-[10px] bg-ink px-[22px] text-white">
        <span className="font-aeonik text-rail">Nirmaan 2026</span>
        <GlobeIcon />
      </a>
      <div className="mt-[14px] flex h-[58px] items-center justify-around rounded-[10px] bg-ink text-white" aria-label="Social links">
        <a href="#host" aria-label="Hosting" className="social-icon">h</a>
        <a href="#tracks" aria-label="Tracks" className="social-icon">t</a>
        <a href="#contact" aria-label="Contact" className="social-icon">c</a>
      </div>
    </header>
  );
}

function MobileHeader({ open, setOpen, onBook }: { open: boolean; setOpen: (value: boolean) => void; onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-paper px-5 py-4 lg:hidden">
      <Logo />
      <div className="flex items-center gap-2">
        <button type="button" onClick={onBook} className="rounded-pill bg-purple px-4 py-3 text-sm font-bold text-ink">
          Start
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-content-center rounded-full bg-ink text-white"
        >
          <span className="hamburger" />
        </button>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {menuItems.map((item) => (
          <a key={item.index} href={item.href} onClick={() => setOpen(false)} className={`${item.color} rounded-[20px] p-5 font-display text-3xl`}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

function CTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-pill bg-ink px-[34px] py-[17px] text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple"
    >
      <span className="relative z-10 text-body-xl">{children}</span>
      <ArrowUpRight className="relative z-10" />
      <span className="absolute inset-0 translate-y-full bg-purple transition-transform duration-500 group-hover:translate-y-0" />
    </button>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand lg:min-h-[calc(100dvh-50px)]" data-reveal>
      <Image src="/assets/images/nirmaan-hero.png" alt="Hackathon teams building prototypes in a design studio" fill priority className="object-cover" sizes="(min-width: 1024px) 88vw, 100vw" />
      <div className="hero-grid absolute inset-0" />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="relative z-10 grid min-h-[calc(100dvh-50px)] content-between gap-8 px-6 py-8 text-white lg:px-10 lg:py-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <p className="rounded-pill border border-white/80 bg-ink/30 px-5 py-2 text-sm font-bold uppercase">Nirmaan 2026 / Builder sprint</p>
          <div className="live-panel w-full max-w-[390px] rounded-[28px] border border-white/70 bg-paper p-5 text-ink shadow-soft">
            <div className="flex items-center justify-between">
              <span className="label bg-green-light">Live event</span>
              <span className="pulse-dot" aria-hidden="true" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {liveMetrics.map(([label, value]) => (
                <div key={label} className="rounded-[18px] border border-ink bg-white/60 p-3">
                  <p className="text-xs font-bold uppercase">{label}</p>
                  <p className="mt-2 font-display text-[26px] leading-none">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1180px]">
          <h1 className="hero-title justify-start text-left font-display text-hero">
            {"Nirmaan builds hackathons that build back.".split(" ").map((word, index) => (
              <span key={`${word}-${index}`} style={{ "--word-index": index } as CSSProperties}>{word}</span>
            ))}
          </h1>
          <p className="mt-[17px] max-w-[900px] font-aeonik text-[clamp(24px,1.667vw,32px)] font-bold leading-[1.1]">
            Run a 36-hour design-led hackathon with tracks, teams, mentor rooms, live submissions, judging, sponsor booths, and demo day in one clean hosting flow.
          </p>
          <div className="mt-[32px] flex flex-wrap items-center gap-4">
            <CTA onClick={onBook}>Start Hosting</CTA>
            <a href="#schedule" className="rounded-pill border border-white bg-paper px-[30px] py-[17px] text-body-xl font-bold text-ink transition-transform hover:-translate-y-0.5">View Playbook</a>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          {eventStats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-white/70 bg-ink/55 px-5 py-4 backdrop-blur">
              <p className="font-display text-[clamp(30px,2.2vw,42px)] leading-none">{stat.value}</p>
              <p className="mt-2 text-sm font-bold uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCommandBoard() {
  const nodes = [
    { label: "Setup", className: "left-[12%] top-[20%] bg-yellow" },
    { label: "Check-in", className: "left-[58%] top-[14%] bg-blue text-white" },
    { label: "Mentors", className: "left-[28%] top-[55%] bg-orange" },
    { label: "Submit", className: "left-[70%] top-[48%] bg-red text-white" },
    { label: "Demo", className: "left-[48%] top-[76%] bg-green-light" }
  ];

  return (
    <div className="event-board relative min-h-[520px] overflow-hidden rounded-brand bg-green">
      <div className="map-grid absolute inset-0" />
      <div className="event-route absolute inset-x-[12%] top-1/2 h-[3px] bg-ink" />
      {nodes.map((node, index) => (
        <div key={node.label} className={`event-node absolute ${node.className}`} style={{ "--node-index": index } as CSSProperties}>
          <span className="block text-[11px] font-bold uppercase leading-none">{node.label}</span>
        </div>
      ))}
      <div className="absolute bottom-8 left-8 rounded-[18px] border border-ink bg-paper px-5 py-4 font-bold shadow-soft">
        Live command board<br /><span className="text-sm font-normal">Campus, online, and hybrid flow</span>
      </div>
    </div>
  );
}

function HostingMap() {
  return (
    <section id="host" className="grid gap-gap lg:grid-cols-[.7fr_1fr]" data-reveal>
      <div className="flex min-h-[520px] flex-col rounded-brand bg-yellow p-box">
        <span className="label">Hosting</span>
        <div className="mt-auto">
          <h2 className="font-display text-section">From idea to<br />demo day</h2>
          <p className="mt-[30px] max-w-[620px] text-body-xl">
            Nirmaan handles event setup, tracks, registration, team formation, mentor flow, submissions, judging, and showcase so organizers can focus on the build floor.
          </p>
        </div>
        <div className="mt-[30px]">
          <p className="text-body-xl font-bold">Run it as</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="rounded-brand bg-blue px-4 py-2 font-bold text-white">Campus</span>
            <span className="rounded-brand bg-orange px-4 py-2 font-bold">Online</span>
            <span className="rounded-brand bg-green px-4 py-2 font-bold">Hybrid</span>
          </div>
        </div>
      </div>
      <EventCommandBoard />
    </section>
  );
}

function Marquee({ color, textColor, items }: { color: string; textColor: string; items: string[] }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className={`my-gap overflow-hidden rounded-none ${color}`} aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee items-center gap-8 py-[22px]">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className={`flex items-center gap-8 font-display text-[20px] font-black leading-none ${textColor}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="h-[14px] w-[14px] rotate-45 bg-current" />
          </div>
        ))}
      </div>
    </section>
  );
}

function HostingEngine() {
  const [active, setActive] = useState(0);
  const card = hostingCards[active];
  return (
    <section id="schedule" className="my-gap overflow-hidden" data-reveal>
      <div className="flex min-h-[calc(100dvh-125px)] gap-gap max-lg:flex-col">
        <div className="flex w-full flex-col rounded-brand bg-red-light p-box lg:w-[29.688vw] lg:flex-none">
          <div className="flex items-start justify-between">
            <span className="label">Hosting Engine</span>
            <div className="construction-mark" aria-hidden="true" />
          </div>
          <div className="mt-auto max-lg:mt-10">
            <h2 className="font-display text-section">One flow.<br />Every event layer.</h2>
            <p className="mt-[15px] text-body-xl font-bold">{card.title}: {card.subtitle}</p>
            <p className="mt-[15px] text-body-xl">
              Nirmaan gives organizers a repeatable operating system for planning, launching, running, judging, and showcasing a hackathon without losing the creative energy of the room.
            </p>
          </div>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
            {hostingCards.map((item) => (
              <article key={item.title} className="flex w-full flex-none flex-col gap-[15px] px-0 lg:w-[28.125vw] lg:pr-gap">
                <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-brand">
                  <Image src={item.image} alt={item.title} fill className={`object-cover ${item.speed === "fast" ? "animate-drift-up" : "animate-drift-down"}`} sizes="(min-width: 1024px) 28vw, 100vw" />
                </div>
                <div className="rounded-brand bg-yellow p-box">
                  <h3 className="font-display text-[clamp(24px,1.354vw,26px)] leading-[1.1]">{item.title}</h3>
                  <p className="mt-[10px] text-body-xl font-bold">{item.subtitle}</p>
                  <ul className="mt-5 list-none p-0">
                    {item.details.map((detail) => (
                      <li key={detail} className="text-body-lg">{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 inline-flex rounded-pill bg-green p-1">
            <button aria-label="Previous hosting card" className="grid h-12 w-12 place-content-center rounded-full hover:bg-white/30" onClick={() => setActive((active - 1 + hostingCards.length) % hostingCards.length)}>←</button>
            <button aria-label="Next hosting card" className="grid h-12 w-12 place-content-center rounded-full hover:bg-white/30" onClick={() => setActive((active + 1) % hostingCards.length)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrackWall() {
  return (
    <div className="track-wall">
      {[...trackCards, ...trackCards].map((track, index) => (
        <article key={`${track.title}-${index}`} className={`track-tile ${track.color}`}>
          <span className="text-[12px] font-bold uppercase">Track {String((index % trackCards.length) + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-[clamp(22px,1.6vw,30px)] leading-none">{track.title}</h3>
          <p className="mt-3 text-sm font-bold leading-[1.15]">{track.prompt}</p>
        </article>
      ))}
    </div>
  );
}

function Tracks({ onBook }: { onBook: () => void }) {
  return (
    <section id="tracks" className="my-gap grid min-h-[830px] gap-gap lg:grid-cols-[35.938vw_1fr]" data-reveal>
      <div className="flex flex-col rounded-brand border border-ink p-box">
        <span className="label">Tracks</span>
        <div className="mt-auto max-lg:mt-[30px]">
          <h2 className="font-display text-section">Challenges with<br />structure</h2>
          <p className="mt-10 text-body-xl">
            Host multiple challenge tracks with prompts, datasets or APIs, sponsor briefs, scoring criteria, and deliverables that keep every team aligned.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
            {trackCards.slice(0, 8).map((track) => (
              <div key={track.title} className="flex items-center gap-[10px]">
                <span className={`h-[18px] w-[18px] rounded-full border border-ink ${track.color}`} />
                <span className="text-[16px] font-bold leading-[1.2]">{track.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-[35px]">
            <CTA onClick={onBook}>Explore Tracks</CTA>
          </div>
        </div>
      </div>
      <div className="relative min-h-[350px] overflow-hidden rounded-brand border border-ink">
        <TrackWall />
        <div className="absolute left-1/2 top-1/2 z-10 grid h-[6.51vw] min-h-[96px] w-[7.031vw] min-w-[110px] -translate-x-1/2 -translate-y-1/2 place-content-center border border-ink bg-paper text-center font-display text-[20px] leading-none">
          Track<br />Wall
        </div>
      </div>
    </section>
  );
}

function ScheduleBoard() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[.9fr_1.1fr]" data-reveal>
      <div className="rounded-brand bg-orange p-box">
        <span className="label bg-paper">Schedule</span>
        <h2 className="mt-[90px] font-display text-section">A run-of-show<br />that hosts can trust</h2>
        <p className="mt-6 max-w-[620px] text-body-xl">
          Every Nirmaan event ships with a ready operating schedule: check-in, launch brief, team lock, mentor checkpoints, submission freeze, judging, and demo day.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {["36h sprint", "2 checkpoints", "5 mentor rooms", "1 demo stage"].map((item) => (
            <div key={item} className="rounded-[18px] border border-ink bg-paper px-4 py-3 font-bold">{item}</div>
          ))}
        </div>
      </div>
      <div className="rounded-brand border border-ink bg-paper p-4">
        <div className="grid gap-3">
          {scheduleItems.map((item) => (
            <article key={`${item.time}-${item.title}`} className="schedule-row grid gap-4 rounded-[22px] border border-ink bg-white/50 p-4 md:grid-cols-[110px_1fr_130px]">
              <div className={`grid min-h-[78px] place-content-center rounded-[18px] border border-ink ${item.color}`}>
                <span className="font-display text-[28px] leading-none">{item.time}</span>
              </div>
              <div>
                <h3 className="font-display text-[28px] leading-none">{item.title}</h3>
                <p className="mt-2 text-body-xl">{item.detail}</p>
              </div>
              <div className="self-center rounded-pill bg-ink px-4 py-2 text-center text-sm font-bold uppercase text-white">Auto notify</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmissionBoard() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[1.05fr_.95fr]" data-reveal>
      <div className="rounded-brand bg-blue p-box text-white">
        <span className="label border-white bg-paper text-ink">Submissions</span>
        <h2 className="mt-[90px] font-display text-section">Projects move from draft to demo without chaos.</h2>
        <p className="mt-6 max-w-[680px] text-body-xl">
          Teams upload repos, decks, videos, prototype links, and impact notes. Judges see rubric-ready work, hosts see the live event state.
        </p>
        <div className="mt-8 overflow-hidden rounded-[24px] border border-white/70">
          {projectSubmissions.map((project) => (
            <div key={project.team} className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/60 bg-ink/25 p-4 last:border-b-0 md:grid-cols-[1fr_160px_140px_80px]">
              <strong>{project.team}</strong>
              <span>{project.track}</span>
              <span>{project.status}</span>
              <span className="font-display text-[24px] leading-none">{project.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-h-[520px] overflow-hidden rounded-brand">
        <Image src="/assets/images/nirmaan-demo-day.png" alt="Demo day project presentation" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white bg-paper p-5">
          <p className="font-display text-[34px] leading-none">Finalist gallery</p>
          <p className="mt-2 text-body-xl">Public showcase pages for winners, sponsors, and post-event community.</p>
        </div>
      </div>
    </section>
  );
}

function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green p-box">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="label bg-paper">Sponsors</span>
            <h2 className="mt-10 font-display text-section">Sponsor modules ready before launch.</h2>
          </div>
          <p className="max-w-[560px] text-body-xl font-bold">
            Sponsor booths, challenge prompts, API/dataset briefs, prize pools, judging seats, and talent follow-up are packaged into reusable hosting modules.
          </p>
        </div>
        <div className="mt-10 grid gap-gap lg:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <article key={tier.name} className="rounded-[28px] border border-ink bg-paper p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-[32px] leading-none">{tier.name}</h3>
                <span className="rounded-pill bg-yellow px-4 py-2 text-sm font-bold">{tier.slots}</span>
              </div>
              <ul className="mt-8 grid gap-3">
                {tier.perks.map((perk) => (
                  <li key={perk} className="rounded-[16px] border border-ink bg-white/50 px-4 py-3 font-bold">{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community({ onBook }: { onBook: () => void }) {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[.78fr_1fr_.78fr]" data-reveal>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand">
        <Image src="/assets/images/nirmaan-mentors.png" alt="Hackathon team discussing a prototype with mentors" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
      <div className="flex min-h-[430px] flex-col rounded-brand bg-red p-box">
        <span className="label">Community</span>
        <div className="mt-auto">
          <h2 className="font-display text-section">Teams, mentors,<br />sponsors, one floor</h2>
          <p className="mt-[30px] text-body-xl">
            Participants find teammates, book mentor sessions, pass checkpoints, follow community updates, and move toward demo day with everyone seeing the same event truth.
          </p>
          <div className="mt-[30px]"><CTA onClick={onBook}>Open community flow</CTA></div>
        </div>
      </div>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand">
        <Image src="/assets/images/nirmaan-demo-day.png" alt="Hackathon team presenting a demo to judges" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-gap flex items-center justify-between rounded-none bg-blue px-box py-[30px] text-yellow" data-reveal>
      <DownArrows />
      <h2 className="text-center font-display text-section text-ink">{children}</h2>
      <DownArrows />
    </section>
  );
}

function Values() {
  return (
    <section className="flex gap-gap max-lg:flex-col" data-reveal>
      {values.map((item) => (
        <article key={item.title} className="flex-1 rounded-brand bg-blue px-box py-[clamp(30px,3.646vw,70px)] text-center">
          <div className="mx-auto grid h-[104px] w-[104px] place-content-center rounded-full border border-ink bg-yellow font-display text-[34px] leading-none">{item.mark}</div>
          <h3 className="mt-[30px] font-display text-card">{item.title}</h3>
          <p className="mt-5 text-body-xl">{item.copy}</p>
        </article>
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mt-gap pb-5" data-reveal>
      <div className="relative h-[430px] overflow-hidden">
        <div className="footer-grid absolute inset-0" />
        <Logo className="absolute bottom-[42px] left-[35px] scale-[2.5] origin-bottom-left max-lg:bottom-[15px] max-lg:left-[10px] max-lg:scale-[1.6]" />
      </div>
      <div className="mt-[30px] flex justify-between gap-5 max-lg:flex-col">
        <div>
          <p className="font-display text-[20px] font-black leading-[1.1]">© 2026 Nirmaan Hackathon Hosting</p>
          <p className="mt-[10px] text-sm font-bold">Design-led event infrastructure for colleges, clubs, communities, and sponsors.</p>
        </div>
        <ul className="flex list-none flex-wrap gap-[10px] p-0">
          {["Host", "Tracks", "Schedule"].map((item) => (
            <li key={item}><a className="block rounded-pill border border-ink px-3 py-2 text-sm transition-colors hover:bg-ink hover:text-white" href="#top">{item}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function HostingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close hosting form" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="hosting-title" className="modal-panel">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-6 top-6 z-20 grid h-14 w-14 place-content-center rounded-full bg-ink text-white">
          <CloseIcon />
        </button>
        <div className="flex items-center justify-between bg-orange px-6 py-[30px] text-yellow">
          <DownArrows />
          <h2 id="hosting-title" className="font-display text-section text-ink">Start hosting</h2>
          <DownArrows />
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 p-box">
          <label className="field">Organizer name<input ref={initialFocusRef} name="organizerName" required /></label>
          <label className="field">Organization / community<input name="organization" required /></label>
          <label className="field">Email<input name="email" type="email" required /></label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field">Expected participants<input name="participants" type="number" min="1" required /></label>
            <label className="field">Target month<input name="targetMonth" type="month" required /></label>
          </div>
          <label className="field">Mode<select name="mode" defaultValue="Campus"><option>Campus</option><option>Online</option><option>Hybrid</option></select></label>
          <label className="field">Notes<textarea name="notes" rows={4} placeholder="Tell us about your tracks, sponsors, or event goals." /></label>
          <button className="mt-2 rounded-pill bg-green px-8 py-4 text-body-xl font-bold text-ink transition-transform hover:-translate-y-0.5" type="submit">
            Request hosting setup
          </button>
        </form>
      </div>
    </aside>
  );
}

export function SiteExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const marqueeOne = useMemo(() => ["Registration", "Team formation", "Track pages", "Mentor rooms", "Live submissions", "Judging", "Demo day", "Sponsor booths"], []);
  const marqueeTwo = useMemo(() => ["Campus", "Online", "Hybrid", "Rubrics", "Scoreboards", "Project gallery", "Certificates", "Community archive"], []);
  useReveal();

  return (
    <>
      <Rail onBook={() => setModalOpen(true)} />
      <MobileHeader open={menuOpen} setOpen={setMenuOpen} onBook={() => setModalOpen(true)} />
      <main className="relative ml-0 overflow-hidden px-0 pt-[75px] lg:ml-[calc(theme(spacing.rail)+25px)] lg:px-0 lg:pr-5 lg:pt-[30px]">
        <article className="home">
          <Hero onBook={() => setModalOpen(true)} />
          <HostingMap />
          <Marquee color="bg-red" textColor="text-yellow" items={marqueeOne} />
          <HostingEngine />
          <ScheduleBoard />
          <Marquee color="bg-blue" textColor="text-green-light" items={marqueeTwo} />
          <Tracks onBook={() => setModalOpen(true)} />
          <SubmissionBoard />
          <SponsorWall />
          <Community onBook={() => setModalOpen(true)} />
          <SectionTitle>What makes Nirmaan work</SectionTitle>
          <Values />
          <Footer />
        </article>
      </main>
      <HostingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
