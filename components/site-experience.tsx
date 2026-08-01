"use client";

import Image from "next/image";
import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Gamepad2, Coins, Trophy, Terminal, Users, Flame, Volume2, VolumeX, Swords, Heart, Sparkles, Radio } from "lucide-react";
import {
  eventStats,
  eventFlowCards,
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

// 8-bit retro sound synthesiser
function playRetroSound(type: "coin" | "bleep" | "laser" | "confirm" | "select", isMuted: boolean) {
  if (isMuted || typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === "coin") {
      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now); // B5
      gain.gain.setValueAtTime(0.08, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === "bleep") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, now); // E5
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "laser") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "confirm") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.18); // C6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "select") {
      osc.type = "square";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    // Fail silently if browser blocks audio autoplay/permissions
  }
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

// Side Rail Navigation
function Rail({ onBook, isMuted, toggleMute }: { onBook: () => void; isMuted: boolean; toggleMute: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[calc(theme(spacing.rail)+25px)] flex-col px-[22px] py-[30px] lg:flex">
      <Logo className="mb-[20px]" sizeClass="text-[clamp(26px,1.8vw,34px)]" />
      
      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        onMouseEnter={() => playRetroSound("bleep", isMuted)}
        className="mb-[14px] flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-ink text-white transition-all hover:bg-purple"
        title={isMuted ? "Unmute Retro Sounds" : "Mute Retro Sounds"}
      >
        {isMuted ? (
          <>
            <VolumeX size={18} />
            <span className="font-aeonik text-xs uppercase font-bold">Muted</span>
          </>
        ) : (
          <>
            <Volume2 size={18} className="animate-pulse" />
            <span className="font-aeonik text-xs uppercase font-bold text-green-light">Audio ON</span>
          </>
        )}
      </button>

      <nav aria-label="Main navigation" className="flex flex-col gap-[10px]">
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            onMouseEnter={() => playRetroSound("bleep", isMuted)}
            onClick={() => playRetroSound("select", isMuted)}
            className={`${item.color} group arcade-panel flex h-[clamp(110px,8vw,140px)] flex-col justify-between rounded-[10px] px-[16px] py-[14px] text-ink`}
          >
            <span className="flex items-center justify-between font-aeonik text-rail">
              {item.index}
              <ArrowUpRight className="h-[16px] w-[16px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="max-w-[120px] font-aeonik text-rail uppercase font-bold tracking-tight">{item.label}</span>
          </a>
        ))}
      </nav>
      
      <button
        type="button"
        onClick={() => {
          playRetroSound("coin", isMuted);
          onBook();
        }}
        onMouseEnter={() => playRetroSound("bleep", isMuted)}
        className="mt-[10px] min-h-[70px] arcade-panel rounded-[10px] bg-purple px-4 text-center font-display text-lg uppercase text-white hover:bg-purple-light hover:text-ink focus:outline-none"
      >
        Insert Coin
      </button>

      <a
        href="#top"
        onMouseEnter={() => playRetroSound("bleep", isMuted)}
        onClick={() => playRetroSound("select", isMuted)}
        className="mt-[10px] flex h-[50px] items-center justify-between rounded-[10px] bg-ink px-[18px] text-white"
      >
        <span className="font-aeonik text-[11px] uppercase tracking-wider font-bold text-gray">Nirmaan 2026</span>
        <GlobeIcon />
      </a>
      
      <div className="mt-[10px] flex h-[50px] items-center justify-around rounded-[10px] bg-ink text-white" aria-label="Social links">
        <a href="#overview" onClick={() => playRetroSound("select", isMuted)} className="hover:text-green-light transition-colors"><Gamepad2 size={16} /></a>
        <a href="#tracks" onClick={() => playRetroSound("select", isMuted)} className="hover:text-yellow transition-colors"><Swords size={16} /></a>
        <a href="#contact" onClick={() => playRetroSound("select", isMuted)} className="hover:text-pink transition-colors"><Coins size={16} /></a>
      </div>
    </header>
  );
}

// Mobile Top Bar
function MobileHeader({ open, setOpen, onBook, isMuted, toggleMute }: { open: boolean; setOpen: (value: boolean) => void; onBook: () => void; isMuted: boolean; toggleMute: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-paper border-b-4 border-ink px-5 py-4 lg:hidden">
      <Logo />
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="rounded-full bg-ink p-2 text-white"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          type="button"
          onClick={() => {
            playRetroSound("coin", isMuted);
            onBook();
          }}
          className="arcade-panel rounded-pill bg-purple px-4 py-2 text-xs font-bold uppercase text-white active:translate-y-0.5"
        >
          Insert Coin
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => {
            playRetroSound("select", isMuted);
            setOpen(!open);
          }}
          className="grid h-10 w-10 place-content-center rounded-full bg-ink text-white"
        >
          <span className="hamburger" />
        </button>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""} border-b-4 border-ink`}>
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            onClick={() => {
              playRetroSound("select", isMuted);
              setOpen(false);
            }}
            className={`${item.color} border-2 border-ink rounded-[10px] p-4 font-display text-xl uppercase`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

// Interactive Hero section with Joysticks and 3D Tilt panel
function Hero({ onBook, isMuted }: { onBook: () => void; isMuted: boolean }) {
  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-50px)] overflow-hidden rounded-brand border-4 border-ink lg:min-h-[calc(100dvh-50px)]">
      <Image
        src="/assets/images/nirmaan-hero.png"
        alt="Hackathon teams building prototypes in a design studio"
        fill
        priority
        className="object-cover opacity-60 filter grayscale contrast-125"
        sizes="(min-width: 1024px) 88vw, 100vw"
      />
      <div className="arcade-grid absolute inset-0 mix-blend-multiply opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      
      {/* Scanline overlay for retro effect */}
      <div className="crt-scanline" />
      
      <div className="relative z-10 grid min-h-[calc(100dvh-50px)] content-between gap-8 px-6 py-8 text-white lg:px-10 lg:py-10">
        
        {/* Top bar details */}
        <div className="flex flex-wrap items-start justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-pill border-2 border-white bg-ink px-5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-yellow"
          >
            <Radio size={14} className="animate-pulse text-red" />
            Nirmaan 2026 // Lobby Open
          </motion.div>

          {/* Interactive 3D Live score panel */}
          <InteractiveTiltCard className="w-full max-w-[390px]">
            <div className="crt-screen crt-flicker p-5 text-ink shadow-soft border-2 border-ink bg-[#051c09]">
              {/* Scanline inside CRT */}
              <div className="crt-scanline" />
              
              <div className="flex items-center justify-between">
                <span className="label bg-green-light border-2 border-ink text-ink font-bold text-xs uppercase flex items-center gap-1.5 shadow-none">
                  <Gamepad2 size={12} className="animate-bounce" /> Live Stats
                </span>
                <span className="pulse-dot border-2 border-ink" aria-hidden="true" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {liveMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-[10px] border-2 border-ink bg-[#0e3b16] p-3 text-green-light">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-green-light/75">{label}</p>
                    <p className="mt-1 font-display text-[20px] leading-none glow-green tracking-tighter uppercase">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </InteractiveTiltCard>
        </div>

        {/* Big visual statement (Units.gr large typography) */}
        <div className="max-w-[1180px]">
          <h1 className="hero-title justify-start text-left font-display text-hero text-yellow tracking-tighter uppercase">
            {"Insert coin. Build future."
              .split(" ")
              .map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="glow-pink"
                  style={{ "--word-index": index } as CSSProperties}
                >
                  {word}
                </span>
              ))}
          </h1>
          <p className="mt-5 max-w-[900px] font-aeonik text-[clamp(20px,1.5vw,28px)] font-bold leading-[1.15] text-white">
            A 36-hour continuous co-op build sprint. Match, design, code, rig hardware, and battle for the high score on final demo day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                playRetroSound("coin", isMuted);
                onBook();
              }}
              onMouseEnter={() => playRetroSound("bleep", isMuted)}
              className="arcade-panel group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-pill bg-purple px-[30px] py-[15px] text-white font-display text-lg uppercase active:translate-y-1"
            >
              <Coins size={20} className="animate-spin" />
              <span>Insert Coin</span>
            </button>
            <a
              href="#schedule"
              onClick={() => playRetroSound("select", isMuted)}
              className="rounded-pill border-2 border-white bg-paper/10 hover:bg-paper/25 backdrop-blur px-[30px] py-[15px] text-body-xl font-bold text-white transition-transform hover:-translate-y-0.5 text-center"
            >
              View Quests
            </a>
          </div>
        </div>

        {/* bottom info board */}
        <div className="grid gap-3 lg:grid-cols-4">
          {eventStats.map((stat) => (
            <div key={stat.label} className="rounded-[18px] border-2 border-white/60 bg-ink/75 px-5 py-4 backdrop-blur hover:border-yellow transition-colors group">
              <p className="font-display text-[clamp(28px,2vw,36px)] leading-none text-yellow group-hover:text-green-light transition-colors">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simulated map / command board styled like an arcade dungeon route
function EventCommandBoard() {
  const nodes = [
    { label: "Spawn", className: "left-[10%] top-[30%] bg-yellow border-2 border-ink shadow-[4px_4px_0_#000]" },
    { label: "Lobby", className: "left-[32%] top-[15%] bg-blue text-white border-2 border-ink shadow-[4px_4px_0_#000]" },
    { label: "Speedrun", className: "left-[50%] top-[60%] bg-red text-white border-2 border-ink shadow-[4px_4px_0_#000]" },
    { label: "Boss fight", className: "left-[70%] top-[25%] bg-orange border-2 border-ink shadow-[4px_4px_0_#000]" },
    { label: "Victory", className: "left-[86%] top-[65%] bg-green-light border-2 border-ink shadow-[4px_4px_0_#000]" }
  ];

  return (
    <div className="crt-screen crt-flicker relative min-h-[520px] overflow-hidden rounded-brand border-4 border-ink bg-[#0c180f]">
      {/* CRT scanline and grid */}
      <div className="crt-scanline" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)]" style={{ backgroundSize: "100% 8px" }} />
      <div className="map-grid absolute inset-0 opacity-25 mix-blend-screen" />
      
      {/* Route line */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 120 220 Q 250 80 340 100 T 520 340 T 720 180 T 880 380" fill="none" stroke="#ef333a" strokeWidth="6" strokeDasharray="10, 8" className="animate-pulse" />
      </svg>
      
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          className={`event-node absolute ${node.className} cursor-pointer`}
          style={{ "--node-index": index } as CSSProperties}
        >
          <span className="block text-[11px] font-display uppercase leading-none font-bold text-ink">{node.label}</span>
        </motion.div>
      ))}

      {/* Retro joystick visual detail */}
      <div className="absolute top-6 right-6 flex items-center gap-3 rounded-[12px] bg-[#142818] p-3 border-2 border-ink">
        <div className="relative h-10 w-10 rounded-full bg-[#1b3320] border-2 border-ink">
          <motion.div
            animate={{
              x: [0, 8, -8, 4, -4, 0],
              y: [0, -8, 8, -4, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -mt-3.5 -ml-3.5 h-7 w-7 rounded-full bg-red border-2 border-ink shadow-md cursor-grab active:scale-95"
          />
        </div>
        <span className="font-display text-[10px] text-green-light tracking-wide uppercase">Dungeon Map</span>
      </div>

      <div className="absolute bottom-8 left-8 rounded-[12px] border-2 border-ink bg-paper px-5 py-4 text-ink shadow-soft">
        <p className="font-display text-[14px] leading-tight uppercase flex items-center gap-1.5">
          <Terminal size={14} /> LIVE BOARD
        </p>
        <span className="text-xs text-gray-700">Explore the game stages to qualify</span>
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
        className="flex min-h-[520px] flex-col rounded-brand bg-yellow border-4 border-ink p-box shadow-[8px_8px_0_#000]"
      >
        <span className="label bg-paper border-2 border-ink font-bold text-xs uppercase">Campaign</span>
        <div className="mt-auto">
          <h2 className="font-display text-section uppercase tracking-tight text-ink">From spawn to victory</h2>
          <p className="mt-[20px] max-w-[620px] text-body-xl text-ink font-medium">
            Nirmaan maps out the entire build cycle. Level up your team from lobby matchmakers to final arena pitchers.
          </p>
        </div>
        <div className="mt-[30px]">
          <p className="text-sm font-bold uppercase tracking-wider text-ink/70">Console formats</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-[10px] border-2 border-ink bg-blue px-4 py-2 font-display text-xs uppercase text-white shadow-[2px_2px_0_#000]">Campus</span>
            <span className="rounded-[10px] border-2 border-ink bg-orange px-4 py-2 font-display text-xs uppercase text-ink shadow-[2px_2px_0_#000]">Online</span>
            <span className="rounded-[10px] border-2 border-ink bg-green px-4 py-2 font-display text-xs uppercase text-ink shadow-[2px_2px_0_#000]">Hybrid</span>
          </div>
        </div>
      </motion.div>
      <EventCommandBoard />
    </section>
  );
}

// Text marquee loop
function Marquee({ color, textColor, items }: { color: string; textColor: string; items: string[] }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className={`my-gap overflow-hidden border-y-4 border-ink rounded-none ${color}`} aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee items-center gap-8 py-[18px]">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className={`flex items-center gap-8 font-display text-[18px] uppercase font-bold leading-none ${textColor}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="h-[12px] w-[12px] rotate-45 bg-current" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Redesigned sliding card carousel using framer-motion drag gestures
function EventFlow() {
  const [active, setActive] = useState(0);
  const card = eventFlowCards[active];

  return (
    <section id="schedule" className="my-gap overflow-hidden" data-reveal>
      <div className="flex min-h-[calc(100dvh-125px)] gap-gap max-lg:flex-col">
        <div className="flex w-full flex-col rounded-brand bg-red-light border-4 border-ink p-box lg:w-[29.688vw] lg:flex-none shadow-[8px_8px_0_#000]">
          <div className="flex items-start justify-between">
            <span className="label bg-paper border-2 border-ink font-bold text-xs uppercase">Quest Log</span>
            <div className="construction-mark" aria-hidden="true" />
          </div>
          <div className="mt-auto max-lg:mt-10">
            <h2 className="font-display text-section uppercase text-white">Event flow layers</h2>
            <p className="mt-[15px] text-lg font-bold text-yellow uppercase">Level {active + 1}: {card.title}</p>
            <p className="mt-[10px] text-body-xl text-white">
              Each campaign phase unlocks new milestones, side-quests, and tools to ensure your build qualifies for final grading.
            </p>
          </div>
        </div>
        
        {/* Sliding card window */}
        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div className="relative overflow-hidden h-full flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex h-full gap-[15px] max-lg:flex-col"
              >
                <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-brand border-4 border-ink shadow-[4px_4px_0_#000]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover filter contrast-125 saturate-50"
                    sizes="(min-width: 1024px) 28vw, 100vw"
                  />
                  <div className="crt-scanline" />
                </div>
                
                <div className="rounded-brand bg-yellow border-4 border-ink p-box flex-1 flex flex-col justify-between shadow-[4px_4px_0_#000]">
                  <div>
                    <span className="font-display text-xs text-ink/70 uppercase">Mission Objective</span>
                    <h3 className="font-display text-[26px] leading-[1.1] uppercase text-ink mt-2">{card.title}</h3>
                    <p className="mt-1 text-sm font-bold text-ink/80 uppercase">{card.subtitle}</p>
                  </div>
                  <ul className="mt-5 list-none p-0 space-y-2 border-t-2 border-ink/20 pt-4">
                    {card.details.map((detail) => (
                      <li key={detail} className="text-body-lg text-ink font-medium flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-ink" />
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
              className="grid h-12 w-12 place-content-center rounded-full border-2 border-ink bg-white hover:bg-yellow shadow-[2px_2px_0_#000] active:translate-y-0.5"
              onClick={() => setActive((active - 1 + eventFlowCards.length) % eventFlowCards.length)}
            >
              ←
            </button>
            <button
              aria-label="Next card"
              className="grid h-12 w-12 place-content-center rounded-full border-2 border-ink bg-white hover:bg-yellow shadow-[2px_2px_0_#000] active:translate-y-0.5"
              onClick={() => setActive((active + 1) % eventFlowCards.length)}
            >
              →
            </button>
            <span className="ml-4 font-display text-xs text-gray-700 uppercase tracking-widest">
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
          whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
          className={`track-tile border-4 border-ink rounded-[20px] p-6 shadow-[6px_6px_0_#000] ${track.color}`}
        >
          <span className="text-[10px] font-display uppercase tracking-wider text-ink/75">Quest Path {String((index % trackCards.length) + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-display text-[22px] leading-tight uppercase text-ink">{track.title}</h3>
          <p className="mt-2 text-xs font-bold leading-normal text-ink/90">{track.prompt}</p>
        </motion.article>
      ))}
    </div>
  );
}

// Tracks/Quests screen
function Tracks({ onBook, isMuted }: { onBook: () => void; isMuted: boolean }) {
  return (
    <section id="tracks" className="my-gap grid min-h-[830px] gap-gap lg:grid-cols-[35.938vw_1fr]" data-reveal>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col rounded-brand border-4 border-ink p-box bg-paper shadow-[8px_8px_0_#000]"
      >
        <span className="label bg-yellow border-2 border-ink font-bold text-xs uppercase">Quest Matrix</span>
        <div className="mt-auto max-lg:mt-[30px]">
          <h2 className="font-display text-section uppercase tracking-tight text-ink">Choose your adventure</h2>
          <p className="mt-5 text-body-xl font-medium text-ink/80">
            Build parameters are mapped per challenge. Team up to hack specific problem tracks loaded with GMs, APIs, and bounties.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t-2 border-ink/10 pt-6">
            {trackCards.slice(0, 8).map((track) => (
              <div key={track.title} className="flex items-center gap-[10px]">
                <span className={`h-4 w-4 rounded-full border-2 border-ink ${track.color}`} />
                <span className="text-sm font-bold uppercase tracking-tight text-ink">{track.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-[35px]">
            <button
              onClick={() => {
                playRetroSound("laser", isMuted);
                onBook();
              }}
              className="arcade-panel rounded-pill bg-purple px-6 py-4 text-sm font-display uppercase text-white hover:bg-purple-light"
            >
              Explore Quests
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="relative min-h-[350px] overflow-hidden rounded-brand border-4 border-ink shadow-[8px_8px_0_#000] bg-paper-light">
        <TrackWall />
        <div className="absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-content-center border-4 border-ink bg-yellow text-center font-display text-[16px] leading-none uppercase shadow-md rotate-3 hover:rotate-0 transition-transform">
          QUEST<br />BOARD
        </div>
      </div>
    </section>
  );
}

// Schedule timeline
function ScheduleBoard({ isMuted }: { isMuted: boolean }) {
  return (
    <section className="my-gap grid gap-gap lg:grid-cols-[.9fr_1.1fr]" data-reveal>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-brand bg-orange border-4 border-ink p-box shadow-[8px_8px_0_#000]"
      >
        <span className="label bg-paper border-2 border-ink font-bold text-xs uppercase">Time Block</span>
        <h2 className="mt-[60px] font-display text-section uppercase text-ink">Run of Playbook</h2>
        <p className="mt-4 max-w-[620px] text-body-xl text-ink font-medium">
          Timing is everything. Sync your schedule clock to match checkpoints, code freeze slots, and arpeggio tests.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {["36h Build", "2 Save points", "5 Guild rooms", "1 Arena stage"].map((item) => (
            <div key={item} className="rounded-[12px] border-2 border-ink bg-paper px-4 py-3 font-display text-xs uppercase text-ink font-bold shadow-[2px_2px_0_#000]">{item}</div>
          ))}
        </div>
      </motion.div>

      <div className="rounded-brand border-4 border-ink bg-paper p-4 shadow-[8px_8px_0_#000]">
        <div className="grid gap-3">
          {scheduleItems.map((item) => (
            <article
              key={`${item.time}-${item.title}`}
              onMouseEnter={() => playRetroSound("bleep", isMuted)}
              className="schedule-row grid gap-4 rounded-[16px] border-2 border-ink bg-white/60 p-4 md:grid-cols-[100px_1fr_130px]"
            >
              <div className={`grid min-h-[66px] place-content-center rounded-[10px] border-2 border-ink ${item.color} shadow-[2px_2px_0_#000]`}>
                <span className="font-display text-[22px] leading-none uppercase">{item.time}</span>
              </div>
              <div className="self-center">
                <h3 className="font-display text-[18px] uppercase leading-none text-ink">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-800 font-bold">{item.detail}</p>
              </div>
              <div className="self-center rounded-pill bg-ink border-2 border-ink text-yellow px-4 py-2 text-center text-[10px] font-display uppercase tracking-widest animate-pulse">
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
      <div className="crt-screen crt-flicker rounded-brand border-4 border-ink p-box text-white bg-[#031305] shadow-[8px_8px_0_#000]">
        {/* Scanline CRT */}
        <div className="crt-scanline" />
        
        <span className="label border-glow-green bg-[#07240c] text-green-light font-display text-[11px] uppercase tracking-wider shadow-none">
          Leaderboard
        </span>
        
        <h2 className="mt-[40px] font-display text-section uppercase glow-green text-green-light tracking-tight">Active Room High Scores</h2>
        <p className="mt-4 max-w-[680px] text-body-xl text-green-light/80">
          Check live submissions. Live build scores are graded dynamically by Game Masters based on core design metrics.
        </p>
        
        <div className="mt-8 overflow-hidden rounded-[14px] border-2 border-green-light/40 bg-[#020b04]">
          {projectSubmissions.map((project, idx) => (
            <div
              key={project.team}
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-green-light/20 bg-[#031305]/50 p-4 last:border-b-0 md:grid-cols-[40px_1fr_140px_120px_60px] text-green-light font-mono text-sm"
            >
              <span className="opacity-65">#{idx + 1}</span>
              <strong className="uppercase glow-green">{project.team}</strong>
              <span className="opacity-75">{project.track}</span>
              <span className="text-xs uppercase bg-[#092911] border border-green-light/30 px-2 py-0.5 rounded text-center self-center">{project.status}</span>
              <span className="font-display text-[18px] text-right text-yellow-500 glow-pink self-center">{project.score}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative min-h-[520px] overflow-hidden rounded-brand border-4 border-ink shadow-[8px_8px_0_#000]">
        <Image
          src="/assets/images/nirmaan-demo-day.png"
          alt="Demo day project presentation"
          fill
          className="object-cover filter contrast-125 saturate-50"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute bottom-6 left-6 right-6 rounded-[18px] border-4 border-ink bg-paper p-5 shadow-lg">
          <p className="font-display text-[26px] leading-none uppercase text-ink flex items-center gap-2">
            <Trophy size={20} className="text-yellow" /> Finalist Showcase
          </p>
          <p className="mt-2 text-sm text-gray-800 font-bold">Public arpeggio showroom maps top projects for loot deployment post-hackathon.</p>
        </div>
      </div>
    </section>
  );
}

// Sponsors Section
function SponsorWall() {
  return (
    <section id="sponsors" className="my-gap" data-reveal>
      <div className="rounded-brand bg-green border-4 border-ink p-box shadow-[8px_8px_0_#000]">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b-2 border-ink pb-6">
          <div>
            <span className="label bg-paper border-2 border-ink font-bold text-xs uppercase">Allies</span>
            <h2 className="mt-4 font-display text-section uppercase text-ink">Guild Sponsors</h2>
          </div>
          <p className="max-w-[560px] text-body-xl font-bold text-ink">
            Guild partners shape the sandbox: custom bounties, devkits, sandbox modules, and active recruiting seats.
          </p>
        </div>
        <div className="mt-8 grid gap-gap lg:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <article key={tier.name} className="rounded-[20px] border-4 border-ink bg-paper p-6 shadow-[4px_4px_0_#000] hover:translate-y-[-4px] transition-transform">
              <div className="flex items-center justify-between gap-4 border-b-2 border-ink/10 pb-4">
                <h3 className="font-display text-[22px] uppercase leading-none text-ink">{tier.name}</h3>
                <span className="rounded-pill bg-yellow border-2 border-ink px-3 py-1 text-xs font-bold uppercase">{tier.slots}</span>
              </div>
              <ul className="mt-6 grid gap-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="rounded-[10px] border-2 border-ink bg-white/40 px-4 py-2 text-xs font-bold uppercase text-ink">{perk}</li>
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
      <div className="relative min-h-[430px] overflow-hidden rounded-brand border-4 border-ink shadow-[4px_4px_0_#000]">
        <Image src="/assets/images/nirmaan-mentors.png" alt="Hackathon team discussing a prototype with mentors" fill className="object-cover filter contrast-125 grayscale" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
      <div className="flex min-h-[430px] flex-col rounded-brand bg-red border-4 border-ink p-box shadow-[8px_8px_0_#000]">
        <span className="label bg-paper border-2 border-ink font-bold text-xs uppercase">Community</span>
        <div className="mt-auto">
          <h2 className="font-display text-section uppercase text-white">Party Hub</h2>
          <p className="mt-[20px] text-body-xl text-white font-medium">
            Connect with builders, claim support items, test arpeggios, and check achievements in our co-op lobby feed.
          </p>
          <div className="mt-6">
            <button
              onClick={onBook}
              className="arcade-panel rounded-pill bg-yellow px-6 py-3.5 text-sm font-display uppercase text-ink hover:bg-white"
            >
              Open Lobby
            </button>
          </div>
        </div>
      </div>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand border-4 border-ink shadow-[4px_4px_0_#000]">
        <Image src="/assets/images/nirmaan-demo-day.png" alt="Hackathon team presenting a demo to judges" fill className="object-cover filter contrast-125 grayscale" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
    </section>
  );
}

// Middle separator
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-gap flex items-center justify-between border-y-4 border-ink bg-blue px-box py-[22px] text-yellow" data-reveal>
      <DownArrows />
      <h2 className="text-center font-display text-[26px] uppercase tracking-tight text-ink">{children}</h2>
      <DownArrows />
    </section>
  );
}

// Core values / perks
function Values() {
  return (
    <section className="flex gap-gap max-lg:flex-col" data-reveal>
      {values.map((item) => (
        <article key={item.title} className="flex-1 rounded-brand bg-blue border-4 border-ink px-box py-[50px] text-center shadow-[6px_6px_0_#000]">
          <div className="mx-auto grid h-20 w-20 place-content-center rounded-full border-4 border-ink bg-yellow font-display text-[28px] leading-none text-ink shadow-[2px_2px_0_#000]">{item.mark}</div>
          <h3 className="mt-[25px] font-display text-card uppercase text-ink">{item.title}</h3>
          <p className="mt-4 text-body-xl text-ink font-semibold">{item.copy}</p>
        </article>
      ))}
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer id="contact" className="mt-gap pb-5" data-reveal>
      <div className="relative h-[320px] overflow-hidden rounded-brand border-4 border-ink bg-[#051c09]">
        {/* Grid patterns */}
        <div className="footer-grid absolute inset-0 opacity-40" />
        <Logo className="absolute bottom-[35px] left-[30px] scale-[2.2] origin-bottom-left max-lg:bottom-[15px] max-lg:left-[10px] max-lg:scale-[1.6] text-green-light glow-green" />
      </div>
      <div className="mt-[25px] flex justify-between gap-5 max-lg:flex-col items-center">
        <div>
          <p className="font-display text-[18px] uppercase tracking-tight text-ink">© 2026 Nirmaan Cabinet</p>
          <p className="mt-[5px] text-xs font-bold text-gray-700">A Gen-Z retro-arcade workspace built for developers, designers, and game creators.</p>
        </div>
        <ul className="flex list-none flex-wrap gap-[10px] p-0">
          {["Overview", "Quests", "Timeline"].map((item) => (
            <li key={item}>
              <a className="block rounded-pill border-2 border-ink bg-paper hover:bg-ink hover:text-white px-3 py-2 text-xs font-bold uppercase transition-all" href="#top">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

// Redesigned "Insert Coin" modal (Onboarding register form)
function ParticipationModal({ open, onClose, isMuted }: { open: boolean; onClose: () => void; isMuted: boolean }) {
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
    playRetroSound("confirm", isMuted);
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
    onClose();
  };

  return (
    <aside aria-hidden={!open} className={`modal-shell ${open ? "open" : ""}`}>
      <button type="button" className="absolute inset-0 bg-ink/65 backdrop-blur-sm" aria-label="Close form" onClick={onClose} />
      
      <div role="dialog" aria-modal="true" aria-labelledby="participation-title" className="modal-panel border-l-4 border-ink">
        <button
          type="button"
          onClick={() => {
            playRetroSound("laser", isMuted);
            onClose();
          }}
          aria-label="Close"
          className="absolute right-6 top-6 z-20 grid h-12 w-12 place-content-center rounded-full border-2 border-ink bg-ink text-white hover:bg-red"
        >
          <CloseIcon />
        </button>
        
        {/* Header section as arcade panel */}
        <div className="flex items-center justify-between bg-orange border-b-4 border-ink px-6 py-[22px] text-yellow">
          <DownArrows />
          <h2 id="participation-title" className="font-display text-section uppercase tracking-tight text-ink">Insert Coin / Enter Lobby</h2>
          <DownArrows />
        </div>
        
        {/* Onboarding registration inputs */}
        <form onSubmit={handleSubmit} className="grid gap-4 p-box bg-paper">
          
          <div className="flex items-center gap-4 bg-[#fcedde] border-2 border-ink rounded-[12px] p-4 mb-2">
            <Coins size={36} className="text-yellow animate-bounce" />
            <div>
              <p className="font-display text-sm uppercase text-ink">INSERT 1 COIN TO INITIATE MATCHMAKING</p>
              <p className="text-xs text-gray-700 font-bold">Register as a builder, mentor, or sponsor for Nirmaan 2026.</p>
            </div>
          </div>

          <label className="field">
            <span className="text-xs tracking-wide">Player Name</span>
            <input ref={initialFocusRef} name="name" placeholder="eg. Player_One" required className="border-2 border-ink" />
          </label>
          
          <label className="field">
            <span className="text-xs tracking-wide">Guild / College / Organisation</span>
            <input name="organization" placeholder="eg. Zero_Junction" required className="border-2 border-ink" />
          </label>
          
          <label className="field">
            <span className="text-xs tracking-wide">Comms Email</span>
            <input name="email" type="email" placeholder="eg. player@lobby.gg" required className="border-2 border-ink" />
          </label>
          
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field">
              <span className="text-xs tracking-wide">Expected Party Size</span>
              <input name="participants" type="number" min="1" defaultValue="1" required className="border-2 border-ink" />
            </label>
            <label className="field">
              <span className="text-xs tracking-wide">Spawn Date</span>
              <input name="targetMonth" type="month" required className="border-2 border-ink" />
            </label>
          </div>
          
          <label className="field">
            <span className="text-xs tracking-wide">Choose Lobby Role</span>
            <select name="role" defaultValue="Builder" className="border-2 border-ink bg-transparent p-4 rounded-[18px]">
              <option>Builder</option>
              <option>Mentor / Game Master</option>
              <option>Sponsor Guild</option>
              <option>Volunteer</option>
            </select>
          </label>
          
          <label className="field">
            <span className="text-xs tracking-wide">Player Objectives & Notes</span>
            <textarea name="notes" rows={3} placeholder="Describe your tracks, tech gear, or how you want to support Nirmaan." className="border-2 border-ink" />
          </label>
          
          <button
            className="mt-2 arcade-panel rounded-pill bg-green px-8 py-4 font-display text-lg uppercase text-ink hover:bg-white active:translate-y-1"
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
  const [isMuted, setIsMuted] = useState(false);

  const marqueeOne = useMemo(() => ["Matchmaking Lobby", "Spawn quest brief", "Speedrun build", "Game Master rating", "Loot distribution", "Hall of Fame"], []);
  const marqueeTwo = useMemo(() => ["Campus Rigs", "Online Lobby", "Hybrid Hub", "Game rules", "Retro scoreboards", "Claim achievement badges"], []);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    playRetroSound("coin", nextMute);
  };

  return (
    <>
      <Rail onBook={() => setModalOpen(true)} isMuted={isMuted} toggleMute={toggleMute} />
      <MobileHeader open={menuOpen} setOpen={setMenuOpen} onBook={() => setModalOpen(true)} isMuted={isMuted} toggleMute={toggleMute} />
      
      <main className="relative ml-0 overflow-hidden px-0 pt-[75px] lg:ml-[calc(theme(spacing.rail)+25px)] lg:px-0 lg:pr-5 lg:pt-[30px]">
        <article className="home">
          <Hero onBook={() => setModalOpen(true)} isMuted={isMuted} />
          <EventOverview />
          <Marquee color="bg-red" textColor="text-yellow" items={marqueeOne} />
          <EventFlow />
          <ScheduleBoard isMuted={isMuted} />
          <Marquee color="bg-blue" textColor="text-green-light" items={marqueeTwo} />
          <Tracks onBook={() => setModalOpen(true)} isMuted={isMuted} />
          <SubmissionBoard />
          <SponsorWall />
          <Community onBook={() => setModalOpen(true)} />
          <SectionTitle>Engine Mechanics</SectionTitle>
          <Values />
          <Footer />
        </article>
      </main>
      
      <ParticipationModal open={modalOpen} onClose={() => setModalOpen(false)} isMuted={isMuted} />
    </>
  );
}
