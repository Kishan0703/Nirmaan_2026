"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, ChevronRight, ArrowUpRight, ChevronDown } from "lucide-react";

type Member = {
  name: string;
  role: string;
  tag: string;
  avatar: string;
  initials: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
};

type Department = {
  id: string;
  name: string;
  badgeColor: string;
  tabColor: string;
  folderBg: string;
  accentColor: string;
  textColor: string;
  description: string;
  members: Member[];
};

const DEPARTMENTS: Department[] = [
  {
    id: "core",
    name: "Core Team",
    badgeColor: "bg-red text-white",
    tabColor: "bg-red text-white",
    folderBg: "bg-red",
    accentColor: "#ef333a",
    textColor: "text-red",
    description: "The core architects and overall organizers steering Nirmaan 2026.",
    members: [
      { name: "Arnav Paniya", role: "Overall Lead & Organizer", tag: "Architecture", initials: "AP", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Kishan Kumar", role: "Co-Lead & Operations", tag: "Strategy", initials: "KK", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", github: "https://github.com", linkedin: "https://linkedin.com" },
      { name: "Ananya Sharma", role: "Event Lead", tag: "Execution", initials: "AS", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
      { name: "Rohan Varma", role: "Community Lead", tag: "Partnerships", initials: "RV", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80", twitter: "https://twitter.com" },
    ],
  },
  {
    id: "technical",
    name: "Technical Team",
    badgeColor: "bg-blue text-white",
    tabColor: "bg-blue text-white",
    folderBg: "bg-blue",
    accentColor: "#0055ff",
    textColor: "text-blue",
    description: "Engineering the digital platform, hackathon portals, and judge scoreboards.",
    members: [
      { name: "Devansh Patel", role: "Tech Lead", tag: "Fullstack", initials: "DP", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80", github: "https://github.com" },
      { name: "Siddharth Rao", role: "Backend Architect", tag: "Node & Go", initials: "SR", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80", github: "https://github.com" },
      { name: "Priya Nair", role: "Frontend Engineer", tag: "Next.js & 3D", initials: "PN", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80", github: "https://github.com" },
      { name: "Aarav Gupta", role: "Cloud & DevOps", tag: "Infrastructure", initials: "AG", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80", github: "https://github.com" },
    ],
  },
  {
    id: "design",
    name: "Design Team",
    badgeColor: "bg-purple text-white",
    tabColor: "bg-purple text-white",
    folderBg: "bg-purple",
    accentColor: "#a855f7",
    textColor: "text-purple",
    description: "Crafting visual identities, 3D web experiences, and brand aesthetics.",
    members: [
      { name: "Meera Iyer", role: "Design Lead", tag: "UI / UX", initials: "MI", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
      { name: "Vikram Malhotra", role: "3D & Motion Designer", tag: "Three.js & Blender", initials: "VM", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80", twitter: "https://twitter.com" },
      { name: "Sneha Reddy", role: "Visual Brand Designer", tag: "Typography & Assets", initials: "SR", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "outreach",
    name: "Outreach Team",
    badgeColor: "bg-orange text-white",
    tabColor: "bg-orange text-white",
    folderBg: "bg-orange",
    accentColor: "#ff6b00",
    textColor: "text-orange",
    description: "Connecting Nirmaan with tech guilds, sponsors, and campus ambassadors.",
    members: [
      { name: "Aditya Joshi", role: "Sponsorship Lead", tag: "Corporate Relations", initials: "AJ", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
      { name: "Kavya Menon", role: "Public Relations", tag: "Media & Press", initials: "KM", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80", twitter: "https://twitter.com" },
      { name: "Rahul Deshmukh", role: "Campus Ambassador Lead", tag: "Student Guilds", initials: "RD", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "event",
    name: "Event & Ops Team",
    badgeColor: "bg-yellow text-ink",
    tabColor: "bg-yellow text-ink",
    folderBg: "bg-yellow",
    accentColor: "#ffc83b",
    textColor: "text-yellow",
    description: "Managing campus logistics, hackathon stages, mentor rooms, and judge flow.",
    members: [
      { name: "Tanvi Saxena", role: "Operations Lead", tag: "On-site Ops", initials: "TS", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
      { name: "Varun Mehta", role: "Stage Master", tag: "Live Demos", initials: "VM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80", twitter: "https://twitter.com" },
      { name: "Diya Roy", role: "Logistics Coordinator", tag: "Hardware & Rigs", initials: "DR", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing Team",
    badgeColor: "bg-green text-ink",
    tabColor: "bg-green text-ink",
    folderBg: "bg-green",
    accentColor: "#00c853",
    textColor: "text-green",
    description: "Driving campaign hype, social content, hacker stories, and live updates.",
    members: [
      { name: "Yash Agarwal", role: "Growth & Content Lead", tag: "Campaigns", initials: "YA", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80", twitter: "https://twitter.com" },
      { name: "Ishita Kapoor", role: "Social Media Strategist", tag: "Instagram & X", initials: "IK", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", linkedin: "https://linkedin.com" },
      { name: "Nikhil Bhat", role: "Video & Livestream Manager", tag: "Production", initials: "NB", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80", twitter: "https://twitter.com" },
    ],
  },
];

function MemberAvatar({ member }: { member: Member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-[14px] overflow-hidden border-2 border-ink/20 shadow-md bg-gradient-to-br from-ink to-gray-800 flex items-center justify-center text-white">
      {!imgError ? (
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          unoptimized
          onError={() => setImgError(true)}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <span className="font-display text-xs sm:text-sm uppercase font-black tracking-wider text-yellow">
          {member.initials}
        </span>
      )}
    </div>
  );
}

export function TeamSection() {
  const [activeDeptId, setActiveDeptId] = useState<string>("core");

  const activeDept = DEPARTMENTS.find((d) => d.id === activeDeptId) || DEPARTMENTS[0];

  return (
    <section id="team" className="my-gap space-y-gap" data-reveal>
      {/* ── Co-Organizer Club Cards ── */}
      <div className="grid gap-gap md:grid-cols-2">
        {/* Coding Club BMSIT */}
        <div className="clay-card bg-blue rounded-brand p-box text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-[16px] overflow-hidden border-2 border-white/20 bg-black flex items-center justify-center p-1 shadow-md">
                <Image 
                  src="/assets/images/codingclub-logo.png" 
                  alt="Coding Club BMSIT Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <a 
                href="https://www.instagram.com/codingclub_bmsit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-display uppercase tracking-wider bg-white/20 text-white hover:bg-white/35 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-black border border-white/10 transition-transform active:translate-y-0.5"
              >
                Instagram ↗
              </a>
            </div>
            <h3 className="font-display text-card uppercase text-white font-black leading-tight">BMSIT Coding Club</h3>
            <p className="mt-3 text-body-xl text-white font-semibold leading-snug">
              BMSIT Coding Club is a premier student-run tech community driving software craftsmanship, hardware engineering, and innovation hubs across Bangalore campus platforms.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-6 sm:mt-8">Coding Club BMSIT // Co-Organizer</span>
        </div>

        {/* Alterino Club BMSIT */}
        <div className="clay-card bg-yellow rounded-brand p-box text-ink flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-[16px] overflow-hidden border-2 border-ink/10 bg-[#0f1b29] flex items-center justify-center p-1 shadow-md">
                <Image 
                  src="/assets/images/alterino-logo.png" 
                  alt="Alterino Club BMSIT Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <a 
                href="https://www.instagram.com/alterino_bmsit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-display uppercase tracking-wider bg-ink/10 text-ink hover:bg-ink/20 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-black border border-ink/5 transition-transform active:translate-y-0.5"
              >
                Instagram ↗
              </a>
            </div>
            <h3 className="font-display text-card uppercase text-ink font-black leading-tight">BMSIT Alterino Club</h3>
            <p className="mt-3 text-body-xl text-ink/90 font-semibold leading-snug">
              BMSIT Alterino Club is a premier student-run technology group hosting workshops, hackathons, and bootcamps to build a community of modern engineering builders at BMSIT.
            </p>
          </div>
          <span className="text-[10px] font-display uppercase tracking-widest font-black text-purple mt-6 sm:mt-8">Alterino Club BMSIT // Co-Organizer</span>
        </div>
      </div>

      {/* ── Interactive Department Filing Cabinet Section ── */}
      <div>
        {/* Header Section */}
        <div className="mb-6">
          <span className="font-display text-xs uppercase tracking-widest text-ink/60 font-black">
            NIRMAAN TEAMS
          </span>
          <h2 className="font-display text-section uppercase text-ink font-black mt-1">
            Meet the Builders Behind Nirmaan
          </h2>
        </div>

        {/* Main Cuboid File Box Layout */}
        <div className="grid gap-gap lg:grid-cols-[360px_1fr]">
          
          {/* LEFT SIDE: Organizer Box (DESKTOP ONLY - Hidden on Mobile) */}
          <div className="hidden lg:flex relative flex-col justify-between p-5 bg-ink border-2 border-white/20 rounded-brand shadow-xl clay-card min-h-[480px]">
            
            {/* Header Label Plate */}
            <div className="relative z-20 mb-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-yellow" />
                  <span className="font-display text-xs uppercase tracking-wider font-black text-white">
                    TEAM DIRECTORY
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Folder File Stack */}
            <div className="space-y-3 relative z-10 my-1">
              {DEPARTMENTS.map((dept) => {
                const isActive = dept.id === activeDeptId;

                return (
                  <motion.div
                    key={dept.id}
                    className="relative"
                    initial={false}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setActiveDeptId(dept.id)}
                      animate={{
                        y: isActive ? -6 : 0,
                        x: isActive ? 12 : 0,
                        scale: isActive ? 1.02 : 1,
                      }}
                      whileHover={{
                        y: isActive ? -6 : -4,
                        x: isActive ? 12 : 6,
                        scale: 1.01,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`w-full relative flex items-center justify-between p-3.5 rounded-[16px] text-left transition-all border-2 ${
                        isActive
                          ? `${dept.tabColor} border-white shadow-lg z-30 ring-2 ring-white/50`
                          : "bg-white/10 border-white/15 text-white hover:bg-white/20 z-10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${dept.tabColor.split(" ")[0]} border border-white/40 shadow-sm shrink-0`} />

                        <span className="block font-display text-sm uppercase font-black tracking-wide leading-none">
                          {dept.name}
                        </span>
                      </div>

                      <ChevronRight size={18} className={`transition-transform ${isActive ? "translate-x-1 rotate-90" : "opacity-60"}`} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Bar Details */}
            <div className="relative z-20 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] font-display uppercase tracking-widest text-gray-400 font-black">
              <span>BMSIT ORGANIZERS</span>
              <span>2026</span>
            </div>
          </div>

          {/* RIGHT SIDE: Opened File Sheet */}
          <div className="relative min-h-0 lg:min-h-[480px]">
            
            {/* MOBILE ONLY: Ultra-Fast Sticky/Embedded Horizontal Department Bar */}
            <div className="lg:hidden mb-4 bg-ink p-3 rounded-[20px] border-2 border-white/20 shadow-lg flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Folder size={16} className="text-yellow" />
                  <span className="font-display text-[10px] uppercase font-black text-white tracking-wider">
                    SELECT DEPARTMENT
                  </span>
                </div>
                <span className="text-[10px] font-display font-black text-yellow uppercase">
                  {activeDept.name}
                </span>
              </div>

              {/* Horizontal Scroll Pill Selector */}
              <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {DEPARTMENTS.map((dept) => {
                  const isActive = dept.id === activeDeptId;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setActiveDeptId(dept.id)}
                      className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full font-display text-xs uppercase font-black transition-all border ${
                        isActive
                          ? `${dept.tabColor} border-white shadow-md scale-105 ring-2 ring-white/40`
                          : "bg-white/10 border-white/15 text-white hover:bg-white/20"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${dept.tabColor.split(" ")[0]} border border-white/40 shrink-0`} />
                      <span>{dept.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className={`h-full rounded-brand border-2 border-white/40 ${activeDept.folderBg} p-4 sm:p-box clay-card flex flex-col justify-between shadow-xl relative overflow-hidden`}
              >
                <div>
                  {/* Folder Top Header Sheet */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 pb-3 sm:pb-4 mb-4 sm:mb-6 relative z-10">
                    <div>
                      <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-wider font-black text-ink/70">
                        NIRMAAN 2026 // DEPARTMENT
                      </span>
                      <h3 className="font-display text-card uppercase text-ink font-black leading-tight mt-0.5">
                        {activeDept.name}
                      </h3>
                    </div>

                    <span className={`rounded-full px-3.5 py-1 font-display text-[11px] sm:text-xs uppercase font-black shadow-sm ${activeDept.badgeColor}`}>
                      {activeDept.members.length} Members
                    </span>
                  </div>

                  <p className="text-body-xl text-ink font-semibold leading-relaxed mb-5 sm:mb-6 max-w-xl relative z-10">
                    {activeDept.description}
                  </p>

                  {/* Member Dossier ID Cards Grid */}
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 relative z-10">
                    {activeDept.members.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 + 0.1 }}
                        className="group rounded-[18px] sm:rounded-[20px] bg-white/95 backdrop-blur-md p-3.5 sm:p-4 border-2 border-white/80 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                      >
                        {/* Member Card Top Row */}
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <MemberAvatar member={member} />

                          {/* Info Column */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-sm sm:text-base uppercase text-ink font-black truncate leading-tight">
                              {member.name}
                            </h4>

                            <p className="text-[11px] sm:text-xs font-black text-ink/75 mt-0.5">
                              {member.role}
                            </p>

                            {/* Skill Tag Pill */}
                            <span className="mt-1.5 inline-block rounded-full bg-ink text-yellow px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black tracking-wider shadow-sm">
                              {member.tag}
                            </span>
                          </div>
                        </div>

                        {/* Social Buttons Bottom Bar */}
                        <div className="mt-3 pt-2.5 border-t border-ink/10 flex items-center justify-end">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2.5 py-1 font-display text-[9px] uppercase font-black hover:bg-red transition-all flex items-center gap-1 shadow-sm active:translate-y-0.5"
                              >
                                GitHub <ArrowUpRight size={10} />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2.5 py-1 font-display text-[9px] uppercase font-black hover:bg-blue transition-all flex items-center gap-1 shadow-sm active:translate-y-0.5"
                              >
                                LinkedIn <ArrowUpRight size={10} />
                              </a>
                            )}
                            {member.twitter && (
                              <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2.5 py-1 font-display text-[9px] uppercase font-black hover:bg-orange transition-all flex items-center gap-1 shadow-sm active:translate-y-0.5"
                              >
                                X / Twitter <ArrowUpRight size={10} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Folder Bottom Stamp */}
                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-display uppercase font-black text-ink/70 relative z-10">
                  <span>NIRMAAN 2026 ORGANIZERS</span>
                  <span>BMSIT</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
