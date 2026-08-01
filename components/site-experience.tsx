"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Gamepad2, Coins, Trophy, Terminal, Users, Flame, Swords, Heart, Sparkles, Radio, ShieldAlert } from "lucide-react";
import {
  eventStats,
  eventFlowCards,
  liveMetrics,
  menuItems,
  projectSubmissions,
  scheduleItems,
  sponsorTiers,
  trackCards,
  values,
  announcements,
  galleryImages,
  faqs
} from "@/lib/data";
import { ArrowUpRight, CloseIcon, DownArrows, GlobeIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

// Social Icons SVGs (Clean, lightweight components to avoid Lucide version export issues)
function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function XIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function InstagramIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Custom 3D Tilt Component
function InteractiveTiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out tilt values using spring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateXSpring = useSpring(useTransform(y, [-200, 200], [10, -10]), springConfig);
  const rotateYSpring = useSpring(useTransform(x, [-200, 200], [-10, 10]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

// Countdown timer to Nov 6, 2026
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, active: true });

  useEffect(() => {
    const targetDate = new Date("2026-11-06T09:00:00+05:30").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, active: false });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, active: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft.active) {
    return (
      <div className="clay-card px-5 py-3 rounded-[12px] bg-green text-white text-center font-display text-sm uppercase font-black">
        Event is Active!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center text-ink max-w-[340px]">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hrs" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" }
      ].map((item, idx) => (
        <div key={idx} className="clay-card bg-white/70 backdrop-blur-md rounded-[12px] p-2 flex flex-col justify-center border border-white/40">
          <span className="font-display text-[20px] leading-none font-black text-ink">{String(item.value).padStart(2, "0")}</span>
          <span className="text-[8px] uppercase font-bold text-gray-700 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Side Rail Navigation (Claymorphic & Compact to prevent vertical overflow)
function Rail({ onBook }: { onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[calc(theme(spacing.rail)+25px)] flex-col px-[22px] py-[25px] lg:flex justify-between border-r border-ink/5 bg-paper/20 backdrop-blur-md">
      
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
        <button
          type="button"
          onClick={onBook}
          className="h-[52px] clay-card rounded-[12px] bg-purple px-4 text-center font-display text-[14px] uppercase font-black text-white hover:bg-purple-light hover:text-ink focus:outline-none"
        >
          Join Nirmaan
        </button>

        <a
          href="#top"
          className="flex h-[44px] items-center justify-between rounded-[12px] clay-card bg-paper text-ink px-[18px]"
        >
          <span className="font-aeonik text-[10px] uppercase tracking-wider font-bold text-gray-700">Nirmaan 2026</span>
          <GlobeIcon />
        </a>
        
        <div className="flex h-[44px] items-center justify-around rounded-[12px] clay-card bg-paper text-ink" aria-label="Social links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue transition-colors"><GithubIcon size={15} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow transition-colors"><XIcon size={15} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink transition-colors"><InstagramIcon size={15} /></a>
        </div>
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

// Hero section
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft lg:min-h-[calc(100dvh-50px)] bg-paper">
      <Image
        src="/assets/images/nirmaan-hero.png"
        alt="Hackathon teams building prototypes in a design studio"
        fill
        priority
        className="object-cover opacity-70 filter saturate-100 contrast-110"
        sizes="(min-width: 1024px) 88vw, 100vw"
      />
      <div className="clay-grid absolute inset-0 mix-blend-multiply opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      
      <div className="relative z-10 grid min-h-[calc(100dvh-50px)] content-between gap-8 px-6 py-8 text-white lg:px-10 lg:py-10">
        
        {/* Top bar details */}
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex flex-col gap-3 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-pill border border-white/20 bg-ink/75 px-5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-yellow shadow-md"
            >
              <Radio size={14} className="animate-pulse text-red" />
              Nirmaan 2026 // Builder sprint
            </motion.div>
            <CountdownTimer />
          </div>

          {/* Interactive 3D Live score panel (Claymorphic) */}
          <InteractiveTiltCard className="w-full max-w-[390px]">
            <div className="clay-card p-5 text-ink bg-paper/90 backdrop-blur-md rounded-[24px] border-2 border-white/60">
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-green-light border border-white/30 px-3 py-1.5 text-ink font-display text-[10px] uppercase font-black flex items-center gap-1.5 shadow-sm">
                  Live event
                </span>
                <span className="pulse-dot" aria-hidden="true" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {liveMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-[14px] bg-white/60 px-4 py-3 text-ink shadow-sm border border-white/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink/60">{label}</p>
                    <p className="mt-1 font-display text-[18px] leading-none uppercase font-black text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </InteractiveTiltCard>
        </div>

        {/* Big visual statement (Units.gr large typography) */}
        <div className="max-w-[1180px]">
          <h1 className="hero-title justify-start text-left font-display text-hero text-white tracking-tighter uppercase">
            {"Nirmaan builds hackathons that build back."
              .split(" ")
              .map((word, index) => {
                const colors = ["text-white", "text-yellow font-black", "text-white", "text-white", "text-green-light font-black", "text-green-light font-black"];
                return (
                  <span
                    key={`${word}-${index}`}
                    className={`drop-shadow-sm ${colors[index] || "text-white"}`}
                    style={{ "--word-index": index } as CSSProperties}
                  >
                    {word}
                  </span>
                );
              })}
          </h1>
          <p className="mt-5 max-w-[900px] font-aeonik text-[clamp(20px,1.5vw,28px)] font-bold leading-[1.15] text-white">
            Run a 36-hour design-led hackathon with tracks, teams, mentor rooms, live submissions, judging, sponsor booths, and demo day in one clean hosting flow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onBook}
              className="clay-card rounded-pill bg-ink px-[30px] py-[15px] text-white font-display text-lg uppercase font-black flex items-center gap-2 border-2 border-white/10"
            >
              <span>Start Hosting</span>
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </button>
            <a
              href="#schedule"
              className="clay-card rounded-pill bg-paper text-ink px-[30px] py-[15px] text-body-xl font-bold transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30"
            >
              View Playbook
            </a>
            <a
              href="/nirmaan_brochure.pdf"
              download="nirmaan_brochure.pdf"
              className="clay-card rounded-pill bg-paper text-ink px-[30px] py-[15px] text-body-xl font-bold transition-transform hover:-translate-y-0.5 text-center border-2 border-white/30"
            >
              Brochure (PDF)
            </a>
          </div>
        </div>

        {/* bottom info board */}
        <div className="grid gap-3 lg:grid-cols-4">
          {eventStats.map((stat, idx) => {
            const statColors = [
              "bg-blue text-white hover:border-yellow",
              "bg-yellow text-ink hover:border-blue",
              "bg-orange text-white hover:border-yellow",
              "bg-green text-ink hover:border-purple"
            ];
            const textColors = [
              "text-yellow group-hover:text-green-light",
              "text-purple group-hover:text-blue",
              "text-yellow group-hover:text-green-light",
              "text-white group-hover:text-yellow"
            ];
            return (
              <div key={stat.label} className={`clay-card rounded-[18px] ${statColors[idx]} px-5 py-4 border-2 border-white/20 transition-colors group`}>
                <p className={`font-display text-[clamp(28px,2vw,36px)] leading-none ${textColors[idx]} uppercase font-black`}>{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-85">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Simulated map / command board styled like a dashboard route
function EventCommandBoard() {
  const nodes = [
    { label: "Plan", className: "left-[10%] top-[30%] bg-yellow border-white/20 shadow-md" },
    { label: "Launch", className: "left-[32%] top-[15%] bg-blue text-white border-white/20 shadow-md" },
    { label: "Run", className: "left-[50%] top-[60%] bg-red text-white border-white/20 shadow-md" },
    { label: "Judge", className: "left-[70%] top-[25%] bg-orange border-white/20 shadow-md" },
    { label: "Showcase", className: "left-[86%] top-[65%] bg-green-light border-white/20 shadow-md" }
  ];

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-brand border-2 border-white/40 bg-[#e3dcd6] clay-card">
      <div className="clay-grid absolute inset-0 opacity-45" />
      
      {/* Route line */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 120 220 Q 250 80 340 100 T 520 340 T 720 180 T 880 380" fill="none" stroke="#ef333a" strokeWidth="4" strokeDasharray="8, 6" />
      </svg>
      
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
          className={`clay-card absolute ${node.className} cursor-pointer px-4 py-2.5 rounded-full`}
          style={{ "--node-index": index } as CSSProperties}
        >
          <span className="block text-[11px] font-display uppercase leading-none font-black text-ink">{node.label}</span>
        </motion.div>
      ))}

      <div className="absolute bottom-8 left-8 rounded-[12px] clay-card bg-paper px-5 py-4 text-ink">
        <p className="font-display text-[14px] leading-tight uppercase flex items-center gap-1.5 font-black">
          <Terminal size={14} /> EVENT PATH
        </p>
        <span className="text-xs text-gray-700">Explore the event stages from plan to demo</span>
      </div>
    </div>
  );
}

// Overview Section
function EventOverview() {
  return (
    <section id="overview" className="grid gap-gap lg:grid-cols-[.7fr_1fr]" data-reveal>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex min-h-[520px] flex-col rounded-brand bg-yellow p-box clay-card"
      >
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Overview</span>
        <div className="mt-auto">
          <h2 className="font-display text-section uppercase tracking-tight text-ink">From idea to demo day</h2>
          <p className="mt-[20px] max-w-[620px] text-body-xl text-ink font-semibold leading-snug">
            Nirmaan brings builders through registration, team formation, challenge tracks, mentor rooms, submissions, judging, and final demos in one packed hackathon journey.
          </p>
        </div>
        <div className="mt-[30px] border-t border-ink/10 pt-5">
          <p className="text-sm font-bold uppercase tracking-wider text-ink/70">Event format</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-[10px] bg-blue px-4 py-2 font-display text-xs uppercase text-white clay-card">Campus</span>
            <span className="rounded-[10px] bg-orange px-4 py-2 font-display text-xs uppercase text-ink clay-card">Online</span>
            <span className="rounded-[10px] bg-green px-4 py-2 font-display text-xs uppercase text-ink clay-card">Hybrid</span>
          </div>
        </div>
      </motion.div>
      <EventCommandBoard />
    </section>
  );
}

// Announcements Board
function Announcements() {
  return (
    <section className="my-gap" data-reveal>
      <div className="clay-card bg-paper p-box rounded-brand border-2 border-white/40">
        <span className="label bg-orange border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Bulletin</span>
        <h2 className="mt-4 font-display text-section uppercase tracking-tight text-ink font-black">Live Announcements</h2>
        <div className="mt-6 grid gap-4">
          {announcements.map((item) => (
            <div key={item.id} className="clay-card rounded-[16px] bg-white/60 p-4 border border-white/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-display uppercase bg-blue text-white px-2 py-0.5 rounded-[6px] font-black">{item.tag}</span>
                <span className="text-xs text-gray-500 font-bold">{item.date}</span>
              </div>
              <p className="text-sm font-bold text-ink leading-relaxed flex-1 md:px-4">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Text marquee loop
function Marquee({ color, textColor, items }: { color: string; textColor: string; items: string[] }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className={`my-gap overflow-hidden border-y border-ink/5 rounded-none ${color}`} aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee items-center gap-8 py-[18px]">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className={`flex items-center gap-8 font-display text-[16px] uppercase font-black leading-none ${textColor}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="h-[10px] w-[10px] rotate-45 bg-current opacity-70" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Redesigned sliding card carousel using claymorphism cards
function EventFlow() {
  const [active, setActive] = useState(0);
  const card = eventFlowCards[active];

  return (
    <section id="schedule" className="my-gap overflow-hidden" data-reveal>
      <div className="flex min-h-[calc(100dvh-125px)] gap-gap max-lg:flex-col">
        <div className="flex w-full flex-col rounded-brand bg-red-light p-box lg:w-[29.688vw] lg:flex-none clay-card text-white">
          <div className="flex items-start justify-between">
            <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Event Flow</span>
            <div className="construction-mark" aria-hidden="true" />
          </div>
          <div className="mt-auto max-lg:mt-10">
            <h2 className="font-display text-section uppercase text-white">One flow.</h2>
            <p className="mt-[15px] text-lg font-display uppercase font-black text-yellow">Stage {active + 1}: {card.title}</p>
            <p className="mt-[10px] text-body-xl text-white font-medium">
              Nirmaan moves from kickoff to demo day through clear event phases, live checkpoints, mentor support, judging rounds, and a final showcase.
            </p>
          </div>
        </div>
        
        {/* Sliding card window */}
        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div className="relative overflow-hidden h-full flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex h-full gap-[15px] max-lg:flex-col"
              >
                <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-brand border-2 border-white/20 shadow-md">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover filter contrast-125 saturate-50"
                    sizes="(min-width: 1024px) 28vw, 100vw"
                  />
                </div>
                
                <div className="rounded-brand bg-yellow p-box flex-1 flex flex-col justify-between clay-card text-ink">
                  <div>
                    <span className="font-display text-xs text-ink/75 uppercase font-bold">Objective</span>
                    <h3 className="font-display text-[26px] leading-[1.1] uppercase text-ink mt-2 font-black">{card.title}</h3>
                    <p className="mt-1 text-sm font-bold text-ink/80 uppercase">{card.subtitle}</p>
                  </div>
                  <ul className="mt-5 list-none p-0 space-y-2 border-t border-ink/10 pt-4">
                    {card.details.map((detail) => (
                      <li key={detail} className="text-body-lg text-ink font-semibold flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-ink" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 inline-flex gap-2 items-center">
            <button
              aria-label="Previous card"
              className="grid h-11 w-11 place-content-center rounded-full bg-white hover:bg-yellow clay-card"
              onClick={() => setActive((active - 1 + eventFlowCards.length) % eventFlowCards.length)}
            >
              ←
            </button>
            <button
              aria-label="Next card"
              className="grid h-11 w-11 place-content-center rounded-full bg-white hover:bg-yellow clay-card"
              onClick={() => setActive((active + 1) % eventFlowCards.length)}
            >
              →
            </button>
            <span className="ml-4 font-display text-xs text-gray-700 uppercase tracking-widest font-black">
              Stage {active + 1} / {eventFlowCards.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Redesigned Quest track tiles grid
function TrackWall() {
  return (
    <div className="track-wall">
      {[...trackCards, ...trackCards].map((track, index) => (
        <motion.article
          key={`${track.title}-${index}`}
          whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 0.5 : -0.5 }}
          className={`track-tile rounded-[24px] p-6 clay-card shadow-sm ${track.color}`}
        >
          <span className="text-[10px] font-display uppercase tracking-wider text-ink/75 font-bold">Track {String((index % trackCards.length) + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-display text-[22px] leading-tight uppercase text-ink font-black">{track.title}</h3>
          <p className="mt-2 text-xs font-bold leading-normal text-ink/90">{track.prompt}</p>
        </motion.article>
      ))}
    </div>
  );
}

// Separated Problem statements section
function Tracks({ onBook }: { onBook: () => void }) {
  const softwareTracks = useMemo(() => trackCards.filter((t) => t.type === "software"), []);
  const hardwareTracks = useMemo(() => trackCards.filter((t) => t.type === "hardware"), []);

  return (
    <section id="tracks" className="my-gap grid gap-gap" data-reveal>
      <div className="flex flex-col rounded-brand p-box bg-paper clay-card">
        <span className="label bg-yellow border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Quest Matrix</span>
        <h2 className="mt-4 font-display text-section uppercase tracking-tight text-ink font-black">Problem Statements & Tracks</h2>
        <p className="mt-4 max-w-[800px] text-body-xl font-semibold text-ink/80 leading-snug">
          Select your challenge track. Problem prompts are divided into Software (S/W) and Hardware (H/W) fields loaded with GMs, devkits, and dedicated bounties.
        </p>

        {/* Separated Columns */}
        <div className="mt-8 grid gap-gap md:grid-cols-2">
          {/* Software Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-card uppercase text-blue font-black border-b border-ink/10 pb-2">Software (S/W) Tracks</h3>
            <div className="grid gap-3">
              {softwareTracks.map((track, idx) => (
                <div key={idx} className={`rounded-[20px] p-5 clay-card bg-paper shadow-sm border border-white/40`}>
                  <h4 className="font-display text-lg uppercase font-black text-ink">{track.title}</h4>
                  <p className="mt-1 text-xs text-gray-700 font-bold">{track.prompt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-card uppercase text-green font-black border-b border-ink/10 pb-2">Hardware (H/W) Tracks</h3>
            <div className="grid gap-3">
              {hardwareTracks.map((track, idx) => (
                <div key={idx} className={`rounded-[20px] p-5 clay-card bg-paper shadow-sm border border-white/40`}>
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

// Student Mini-Game: Bug Squasher
function BugSquasherGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("nirmaan_high_score");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setBugs([]);
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("nirmaan_high_score", score.toString());
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const spawnInterval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * (rect.width - 40);
      const y = Math.random() * (rect.height - 40);
      const id = Date.now() + Math.random();

      setBugs((b) => [...b, { id, x, y }]);

      setTimeout(() => {
        setBugs((currentBugs) => currentBugs.filter((bug) => bug.id !== id));
      }, 2000);

    }, 700);

    return () => clearInterval(spawnInterval);
  }, [isPlaying]);

  const squashBug = (id: number) => {
    setScore((s) => s + 10);
    setBugs((b) => b.filter((bug) => bug.id !== id));
  };

  return (
    <section id="game" className="my-gap" data-reveal>
      <div className="rounded-brand bg-red-light p-box clay-card text-white flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/20 pb-4">
          <div>
            <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Mini-Game</span>
            <h2 className="mt-4 font-display text-section uppercase text-white font-black">Bug Squasher</h2>
          </div>
          <div className="flex gap-4">
            <div className="clay-card rounded-[12px] bg-paper px-4 py-2 text-ink text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Time Left</p>
              <p className="font-display text-lg font-black">{timeLeft}s</p>
            </div>
            <div className="clay-card rounded-[12px] bg-paper px-4 py-2 text-ink text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Score</p>
              <p className="font-display text-lg font-black">{score}</p>
            </div>
            <div className="clay-card rounded-[12px] bg-paper px-4 py-2 text-ink text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-700">High Score</p>
              <p className="font-display text-lg font-black">{highScore}</p>
            </div>
          </div>
        </div>

        <p className="text-body-xl text-white/90 font-medium">
          Quickly click or tap the red bugs as they spawn on the board below to resolve compilation issues! 30 seconds speedrun.
        </p>

        {/* Game play area */}
        <div
          ref={containerRef}
          className="relative h-[300px] w-full bg-ink/40 border border-white/10 rounded-[18px] overflow-hidden flex items-center justify-center cursor-crosshair shadow-inner"
        >
          {!isPlaying && (
            <div className="text-center z-10 flex flex-col items-center gap-3">
              <Trophy size={40} className="text-yellow animate-bounce" />
              <h3 className="font-display text-xl uppercase font-black">Ready to Debug?</h3>
              <button
                onClick={startGame}
                className="clay-card rounded-pill bg-yellow px-8 py-3.5 text-sm font-display uppercase font-black text-ink"
              >
                Start Lobby Game
              </button>
            </div>
          )}

          {isPlaying && bugs.map((bug) => (
            <motion.button
              key={bug.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => squashBug(bug.id)}
              style={{ left: bug.x, top: bug.y }}
              className="absolute h-9 w-9 bg-red border-2 border-white rounded-full flex items-center justify-center text-white shadow-md active:scale-95"
            >
              🐞
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Schedule timeline
function ScheduleBoard() {
  return (
    <section id="schedule" className="my-gap grid gap-gap lg:grid-cols-[.9fr_1.1fr]" data-reveal>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange p-box clay-card"
      >
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Schedule</span>
        <h2 className="mt-[60px] font-display text-section uppercase text-ink">A run-of-show for builders</h2>
        <p className="mt-4 max-w-[620px] text-body-xl text-ink font-semibold leading-snug">
          The Nirmaan schedule keeps the hackathon moving: check-in, launch brief, team lock, mentor checkpoints, submission freeze, judging, and demo day.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5">
          {["36h sprint", "2 checkpoints", "5 mentor rooms", "1 demo stage"].map((item) => (
            <div key={item} className="rounded-[12px] bg-paper px-4 py-3 font-display text-xs uppercase text-ink font-black clay-card">{item}</div>
          ))}
        </div>
      </motion.div>

      <div className="rounded-brand bg-paper p-4 clay-card">
        <div className="grid gap-3">
          {scheduleItems.map((item) => (
            <article
              key={`${item.time}-${item.title}`}
              className="schedule-row grid gap-4 rounded-[18px] bg-white/60 p-4 shadow-sm hover:translate-x-1 transition-transform md:grid-cols-[100px_1fr_130px] border border-white/40"
            >
              <div className={`grid min-h-[66px] place-content-center rounded-[12px] ${item.color} clay-card`}>
                <span className="font-display text-[22px] leading-none uppercase font-black">{item.time}</span>
              </div>
              <div className="self-center">
                <h3 className="font-display text-[18px] uppercase leading-none text-ink font-black">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-800 font-bold leading-normal">{item.detail}</p>
              </div>
              <div className="self-center rounded-pill bg-ink text-yellow px-4 py-2.5 text-center text-[10px] font-display uppercase tracking-widest animate-pulse font-black shadow-sm">
                AUTO NOTIFY
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Glowing Leaderboard style for Submissions
function SubmissionBoard() {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[1.05fr_.95fr]" data-reveal>
      <div className="rounded-brand p-box bg-white/80 backdrop-blur-md clay-card text-ink">
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">
          Submissions
        </span>
        
        <h2 className="mt-[30px] font-display text-section uppercase tracking-tight text-ink font-black">Active Room Leaderboard</h2>
        <p className="mt-4 max-w-[680px] text-body-xl text-ink/80 font-medium">
          Check live submissions. Live build scores are graded dynamically by mentors based on core design metrics.
        </p>
        
        <div className="mt-8 overflow-hidden rounded-[18px] border-2 border-white/45 bg-paper/50">
          {projectSubmissions.map((project, idx) => (
            <div
              key={project.team}
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/20 bg-white/25 p-4 last:border-b-0 md:grid-cols-[40px_1fr_140px_120px_60px] text-ink font-aeonik text-sm"
            >
              <span className="opacity-60">#{idx + 1}</span>
              <strong className="uppercase">{project.team}</strong>
              <span className="opacity-75">{project.track}</span>
              <span className="text-[10px] uppercase bg-white border border-white/45 px-2 py-0.5 rounded text-center self-center">{project.status}</span>
              <span className="font-display text-[18px] text-right text-orange self-center font-black">{project.score}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative min-h-[520px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Demo day project presentation"
          fill
          className="object-cover filter contrast-125 saturate-50"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-6 left-6 right-6 rounded-[22px] bg-paper p-5 shadow-lg clay-card text-ink">
          <p className="font-display text-[26px] leading-none uppercase text-ink flex items-center gap-2 font-black">
            <Trophy size={20} className="text-yellow" /> Finalist Showcase
          </p>
          <p className="mt-2 text-sm text-gray-800 font-bold">Public arpeggio showroom maps top projects for loot deployment post-hackathon.</p>
        </div>
      </div>
    </section>
  );
}

// Event Gallery
function GallerySection() {
  return (
    <section id="gallery" className="my-gap" data-reveal>
      <div className="clay-card bg-purple p-box rounded-brand border-2 border-white/20 text-white">
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Archive</span>
        <h2 className="mt-4 font-display text-section uppercase text-white font-black">Event Gallery</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="clay-card bg-paper p-3 rounded-[20px] text-ink border-2 border-white/40 shadow-sm flex flex-col gap-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-[14px] border border-white/30">
                <Image src={img.src} alt={img.alt} fill className="object-cover filter contrast-125 saturate-50" sizes="20vw" />
              </div>
              <p className="font-display text-xs uppercase font-black text-center mt-1">{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Location Map
function LocationMap() {
  return (
    <section id="location" className="my-gap" data-reveal>
      <div className="grid gap-gap lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-brand overflow-hidden h-[400px] border-2 border-white/30 shadow-soft clay-card relative">
          <iframe
            src="https://maps.google.com/maps?q=BMS%20Institute%20of%20Technology%20and%20Management&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-brand"
            title="BMSIT Campus Map"
          />
        </div>
        
        <div className="flex flex-col justify-center rounded-brand bg-green p-box clay-card">
          <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Venue</span>
          <h2 className="mt-6 font-display text-section uppercase tracking-tight text-ink font-black">BMSIT Campus</h2>
          <p className="mt-4 text-body-xl text-ink font-semibold leading-snug">
            Nirmaan 2026 is hosted offline at BMS Institute of Technology and Management, Yelahanka, Bengaluru.
          </p>
          <div className="mt-6 border-t border-ink/10 pt-5 text-ink/80 text-sm font-bold flex flex-col gap-2">
            <p>📍 Doddaballapur Main Road, Yelahanka, Bengaluru - 560064</p>
            <p>🗓 November 6-7, 2026</p>
            <a
              href="https://www.google.com/maps/place/BMS+Institute+of+Technology+and+Management/@13.133363,77.5648019,830m/data=!3m1!1e3!4m6!3m5!1s0x3bae18a5c54ece35:0x49c4c47a68a60b9c!8m2!3d13.1341876!4d77.5693927!16s%2Fm%2F03c38ys?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-pill bg-paper px-4 py-2.5 text-xs font-display uppercase font-black text-ink clay-card w-max border-2 border-white/30"
            >
              <span>Open in Google Maps</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="my-gap" data-reveal>
      <div className="clay-card bg-paper p-box rounded-brand border-2 border-white/40">
        <span className="label bg-yellow border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Help</span>
        <h2 className="mt-4 font-display text-section uppercase tracking-tight text-ink font-black">Frequently Asked Questions</h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="clay-card rounded-[18px] bg-white/60 border border-white/40 overflow-hidden">
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-display text-[16px] uppercase font-black text-ink focus:outline-none"
              >
                <span>{faq.question}</span>
                <span className="font-bold text-lg">{activeIndex === idx ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-xs text-gray-800 font-bold leading-relaxed border-t border-ink/5 pt-3 bg-white/20"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sponsors Section
function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green p-box clay-card">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/10 pb-6">
          <div>
            <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Sponsors</span>
            <h2 className="mt-4 font-display text-section uppercase text-ink font-black">Guild Sponsors</h2>
          </div>
          <p className="max-w-[560px] text-body-xl font-bold text-ink">
            Sponsors shape the build floor. Challenge prompts, API briefs, and developer recruitment slots.
          </p>
        </div>
        <div className="mt-8 grid gap-gap lg:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <article key={tier.name} className="rounded-[24px] bg-paper p-6 clay-card">
              <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
                <h3 className="font-display text-[22px] uppercase leading-none text-ink font-black">{tier.name}</h3>
                <span className="rounded-pill bg-yellow border border-white/20 px-3 py-1 text-xs font-bold uppercase">{tier.slots}</span>
              </div>
              <ul className="mt-6 grid gap-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="rounded-[12px] border border-white/40 bg-white/40 px-4 py-2 text-xs font-bold uppercase text-ink">{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Community section
function Community({ onBook }: { onBook: () => void }) {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[.78fr_1fr_.78fr]" data-reveal>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image src="/assets/images/nirmaan-mentors.png" alt="Hackathon team discussing a prototype with mentors" fill className="object-cover filter contrast-125 grayscale" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
      <div className="flex min-h-[430px] flex-col rounded-brand bg-red p-box clay-card text-white">
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Community</span>
        <div className="mt-auto">
          <h2 className="font-display text-section uppercase text-white font-black">Community Lobby</h2>
          <p className="mt-[20px] text-body-xl text-white font-semibold leading-snug">
            Connect with builders, claim support items, test arpeggios, and check achievements in our co-op lobby feed.
          </p>
          <div className="mt-6">
            <button
              onClick={onBook}
              className="clay-card rounded-pill bg-yellow px-6 py-3.5 text-sm font-display uppercase font-black text-ink"
            >
              Open Lobby
            </button>
          </div>
        </div>
      </div>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand border-2 border-white/20 shadow-soft">
        <Image src="/assets/images/nirmaan-demo-day.png" alt="Hackathon team presenting a demo to judges" fill className="object-cover filter contrast-125 grayscale" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
    </section>
  );
}

// Middle separator
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-gap flex items-center justify-between border-y border-ink/5 bg-blue px-box py-[22px] text-yellow" data-reveal>
      <DownArrows />
      <h2 className="text-center font-display text-[26px] uppercase tracking-tight text-ink font-black">{children}</h2>
      <DownArrows />
    </section>
  );
}

// Core values
function Values() {
  return (
    <section className="flex gap-gap max-lg:flex-col" data-reveal>
      {values.map((item) => (
        <article key={item.title} className="flex-1 rounded-brand bg-blue px-box py-[50px] text-center clay-card text-white">
          <div className="mx-auto grid h-20 w-20 place-content-center rounded-full bg-yellow font-display text-[28px] leading-none text-ink clay-card font-black">{item.mark}</div>
          <h3 className="mt-[25px] font-display text-card uppercase text-ink font-black">{item.title}</h3>
          <p className="mt-4 text-body-xl text-ink font-bold leading-snug">{item.copy}</p>
        </article>
      ))}
    </section>
  );
}

// About the Team
function TeamSection() {
  return (
    <section id="team" className="my-gap" data-reveal>
      <div className="grid gap-gap md:grid-cols-2">
        {/* Coding Club */}
        <div className="clay-card bg-blue rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Organizers</span>
            <h3 className="mt-6 font-display text-card uppercase text-white font-black">BMSIT Coding Club</h3>
            <p className="mt-4 text-body-xl text-white font-semibold leading-snug">
              BMSIT Coding Club is a premier student-run tech community driving software craftsmanship, hardware engineering, and innovation hubs across Bangalore campus platforms.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-8">BMSIT CC // Platform Operations</span>
        </div>

        {/* Alterino */}
        <div className="clay-card bg-yellow rounded-brand p-box text-ink flex flex-col justify-between">
          <div>
            <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase shadow-sm">Partners</span>
            <h3 className="mt-6 font-display text-card uppercase text-ink font-black">Alterino Ecosystem</h3>
            <p className="mt-4 text-body-xl text-ink/90 font-semibold leading-snug">
              Alterino is our strategic technology partner powering developer pipelines, logistics grids, and event infrastructures to ensure every build sprint runs with zero friction.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-purple mt-8">Alterino // Logistics Grid Partner</span>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer id="contact" className="mt-gap pb-5" data-reveal>
      {/* Grid workspace container matching units.gr layout */}
      <div
        className="relative h-[320px] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft bg-[#f2eae1] clay-card"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      >
        {/* Scattered grid block snap-elements */}
        <div className="absolute left-[20%] top-[10%] h-9 w-9 bg-purple border border-white/20 shadow-sm rounded-[4px]" />
        <div className="absolute left-[70%] top-[20%] h-9 w-9 bg-blue border border-white/20 shadow-sm rounded-[4px]" />
        <div className="absolute left-[50%] top-[40%] h-9 w-9 bg-yellow border border-white/20 shadow-sm rounded-[4px]" />
        <div className="absolute left-[33%] top-[45%] h-9 w-9 bg-orange border border-white/20 shadow-sm rounded-[4px]" />
        
        {/* Giant branding typography with snapped accents */}
        <div className="absolute bottom-6 left-8 z-10 select-none">
          <h2 className="font-display text-[clamp(60px,10vw,120px)] leading-none text-ink tracking-tighter font-black lowercase relative">
            nirmaan.
            {/* Embedded custom color spots overlapping letters */}
            <span className="absolute left-[16px] bottom-0 h-4 w-4 bg-red rotate-45 z-20 rounded-[2px]" />
            <span className="absolute left-[105px] bottom-[18px] h-6 w-2.5 bg-green z-20 rounded-[2px]" />
          </h2>
        </div>
      </div>

      {/* Footer bottom details & navigation links */}
      <div className="mt-6 flex flex-wrap justify-between gap-5 items-end">
        <div className="flex flex-col gap-1 text-left">
          <p className="font-display text-[14px] uppercase tracking-tight text-ink font-black">
            © 2026 NIRMAAN 2026
          </p>
          <p className="text-xs font-bold text-gray-700">
            Web design by Big Horror. Code by Lemonjelly
          </p>
        </div>

        {/* Outline Pill navigation items */}
        <div className="flex flex-wrap gap-2.5" aria-label="Footer links">
          <a
            href="#faq"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            FAQs
          </a>
          <a
            href="#overview"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#schedule"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Cookies Policy
          </a>
        </div>
      </div>
    </footer>
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
        
        {/* Header section as arcade panel */}
        <div className="flex items-center justify-between bg-orange border-b border-white/20 px-6 py-[22px] text-yellow">
          <DownArrows />
          <h2 id="participation-title" className="font-display text-section uppercase tracking-tight text-ink font-black">Register for Nirmaan</h2>
          <DownArrows />
        </div>
        
        {/* Onboarding registration inputs */}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const marqueeOne = useMemo(() => ["Matchmaking Lobby", "Spawn quest brief", "Speedrun build", "Game Master rating", "Loot distribution", "Hall of Fame"], []);
  const marqueeTwo = useMemo(() => ["Campus Rigs", "Online Lobby", "Hybrid Hub", "Game rules", "Retro scoreboards", "Claim achievement badges"], []);

  return (
    <>
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
          
          <SectionTitle>Engine Mechanics</SectionTitle>
          <Values />
          
          <TeamSection />
          
          <Footer />
        </article>
      </main>
      
      <ParticipationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
