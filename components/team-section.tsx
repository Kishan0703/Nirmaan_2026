"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, ChevronRight, ArrowUpRight } from "lucide-react";

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
    description: "The core leadership and overall organizers steering Nirmaan 2026.",
    members: [
      { name: "Anmol Narayan", role: "President (Coding Club)", tag: "President", initials: "AN", avatar: "https://lh3.googleusercontent.com/d/13sVKpdiAgg2vJ4Z5vZbLR-z3WwQx2KU_", linkedin: "https://www.linkedin.com/in/anmol-narayan-8133a532a", github: "https://github.com/anmolnarayan" },
      { name: "Dheeksha N", role: "Vice President (Coding Club)", tag: "Vice President", initials: "DN", avatar: "https://lh3.googleusercontent.com/d/10DKueLQJbU-9gpz-rwP7WCfSeCrW2lzF", linkedin: "https://www.linkedin.com/in/dheekshanaveen/", github: "https://github.com/dheekshanaveen" },
      { name: "Arnav Paniya", role: "Overall Lead & Organizer", tag: "Architecture", initials: "AP", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", github: "https://github.com/arnavpaniya" },
      { name: "Kishan Kumar", role: "Co-Lead & Operations", tag: "Strategy", initials: "KK", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", github: "https://github.com/Kishan0703" },
      { name: "Shashikiran B S", role: "Core Tech Lead (Coding Club)", tag: "Core Tech", initials: "SB", avatar: "https://lh3.googleusercontent.com/d/1LuA9DgCAUfWujIEvEA_iyFJJqxgi4dSG", linkedin: "https://www.linkedin.com/in/shashikiran-bs/", github: "https://github.com/shashikiranbs2006" },
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
      { name: "Gaurav Nayak K", role: "Head - App Dev (Alterino)", tag: "Head (App Dev)", initials: "GN", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", linkedin: "https://www.linkedin.com/in/gauravnayakk", github: "https://gauravnayakk.netlify.app" },
      { name: "Swapnil Biswas", role: "Technical Associate (Coding Club)", tag: "Fullstack & AI", initials: "SB", avatar: "https://lh3.googleusercontent.com/d/1spnFPtFL7rHNHZ3xwfuJ0iutzmRNhXrs", linkedin: "https://www.linkedin.com/in/swapnil-biswas-b33b35399/", github: "https://github.com/Swapnil-Biswas" },
      { name: "Shashikiran B S", role: "Technical Core (Coding Club)", tag: "Fullstack", initials: "SB", avatar: "https://lh3.googleusercontent.com/d/1LuA9DgCAUfWujIEvEA_iyFJJqxgi4dSG", linkedin: "https://www.linkedin.com/in/shashikiran-bs/", github: "https://github.com/shashikiranbs2006" },
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
      { name: "Sakshi Sanjeev Jadhav", role: "Design Associate (Coding Club)", tag: "UI / UX", initials: "SJ", avatar: "https://lh3.googleusercontent.com/d/1VD209VQN0hT7epOoijKUDFsJ5oBRPSym", linkedin: "https://www.linkedin.com/in/sakshi-jadhav-aa5328387", github: "https://github.com/sakshisjadhav2708" },
      { name: "Archisha Gupta", role: "Design Associate (Coding Club)", tag: "Visual Design", initials: "AG", avatar: "https://lh3.googleusercontent.com/d/13A3ElGHqh4YKwWy27DPaKGJ2Jh0RhuWV", linkedin: "https://www.linkedin.com/in/archisha-gupta-4a6266385/", github: "https://github.com/Archish2007Gupta" },
      { name: "Madhusudhan C N", role: "Design & Marketing Associate (Alterino)", tag: "Brand Design", initials: "MC", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", linkedin: "https://www.linkedin.com/in/madhusudhan-c-n-a985a3337", github: "https://github.com/MadhusudhanCN" },
      { name: "Lakshaya Garg", role: "Design Associate (Coding Club)", tag: "UI Assets", initials: "LG", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
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
      { name: "Alok Verma", role: "Event & Ops Head (Coding Club)", tag: "Ops Head", initials: "AV", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80" },
      { name: "Rithika Shetty", role: "Event & Ops Associate (Coding Club)", tag: "Event Ops", initials: "RS", avatar: "https://lh3.googleusercontent.com/d/117vOViNG9gtX3CD4upfnxaSGpsu6rpTs", linkedin: "https://www.linkedin.com/in/rithika-shetty624", github: "https://github.com/RithikaShetty2025" },
      { name: "Likitha S", role: "Event & Ops Associate (Coding Club)", tag: "Logistics", initials: "LS", avatar: "https://lh3.googleusercontent.com/d/1FgHj_iJ3LimFLeLPPM4AymOWfY7OeZZ4", linkedin: "https://www.linkedin.com/in/likitha-siddabasappa-421774359/", github: "https://github.com/likithha500" },
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
      { name: "Sai Amrutha AS", role: "Marketing Associate (Coding Club)", tag: "Campaigns", initials: "SA", avatar: "https://lh3.googleusercontent.com/d/1wICOPf4tsrI3yE_JIxDzte3FoHbejSIn", linkedin: "https://www.linkedin.com/in/sai-amrutha-a-s-443671307/", github: "https://github.com/saiamruthaas-as" },
      { name: "Sneha Mudgal", role: "Marketing Associate (Coding Club)", tag: "Outreach", initials: "SM", avatar: "https://lh3.googleusercontent.com/d/1XuIV2l_cy-DWdLr9CBYGK8FDme0QfJDa", linkedin: "https://www.linkedin.com/in/sneha-mudgal0806/", github: "https://github.com/Sneham-06" },
      { name: "Madhusudhan C N", role: "Marketing & Design Associate (Alterino)", tag: "Media", initials: "MC", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", linkedin: "https://www.linkedin.com/in/madhusudhan-c-n-a985a3337", github: "https://github.com/MadhusudhanCN" },
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
    <section id="team" className="my-gap space-y-gap w-full h-auto overflow-hidden sm:overflow-visible" data-reveal>
      {/* ── Co-Organizer Club Cards ── */}
      <div className="grid gap-gap md:grid-cols-2">
        {/* Coding Club BMSIT */}
        <div className="clay-card bg-blue rounded-brand p-4 sm:p-box text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-[16px] overflow-hidden border-2 border-white/20 bg-black flex items-center justify-center p-1 shadow-md">
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
                className="text-[10px] font-display uppercase tracking-wider bg-white/20 text-white hover:bg-white/35 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-black border border-white/10 transition-transform active:translate-y-0.5"
              >
                Instagram ↗
              </a>
            </div>
            <h3 className="font-display text-xl sm:text-card uppercase text-white font-black leading-tight break-words">BMSIT Coding Club</h3>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-body-xl text-white font-semibold leading-snug break-words">
              BMSIT Coding Club is a premier student-run tech community driving software craftsmanship, hardware engineering, and innovation hubs across Bangalore campus platforms.
            </p>
          </div>
          <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-widest font-black text-yellow mt-5 sm:mt-8">Coding Club BMSIT // Co-Organizer</span>
        </div>

        {/* Alterino Club BMSIT */}
        <div className="clay-card bg-yellow rounded-brand p-4 sm:p-box text-ink flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-[16px] overflow-hidden border-2 border-ink/10 bg-[#0f1b29] flex items-center justify-center p-1 shadow-md">
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
                className="text-[10px] font-display uppercase tracking-wider bg-ink/10 text-ink hover:bg-ink/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-black border border-ink/5 transition-transform active:translate-y-0.5"
              >
                Instagram ↗
              </a>
            </div>
            <h3 className="font-display text-xl sm:text-card uppercase text-ink font-black leading-tight break-words">BMSIT Alterino Club</h3>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-body-xl text-ink/90 font-semibold leading-snug break-words">
              BMSIT Alterino Club is a premier student-run technology group hosting workshops, hackathons, and bootcamps to build a community of modern engineering builders at BMSIT.
            </p>
          </div>
          <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-widest font-black text-purple mt-5 sm:mt-8">Alterino Club BMSIT // Co-Organizer</span>
        </div>
      </div>

      {/* ── Interactive Department Filing Cabinet Section ── */}
      <div className="w-full">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <span className="font-display text-xs uppercase tracking-widest text-ink/60 font-black">
            NIRMAAN TEAMS
          </span>
          <h2 className="font-display text-2xl sm:text-section uppercase text-ink font-black mt-1 leading-tight break-words">
            Meet the Builders Behind Nirmaan
          </h2>
        </div>

        {/* Main Cuboid File Box Layout */}
        <div className="grid gap-gap lg:grid-cols-[360px_1fr] w-full">
          
          {/* LEFT SIDE: Organizer Box (DESKTOP ONLY - Vibrant Gradient Container) */}
          <div className="hidden lg:flex relative flex-col justify-between p-5 bg-gradient-to-br from-[#3b0764] via-[#7e22ce] to-[#c026d3] border-2 border-white/40 rounded-brand shadow-2xl clay-card min-h-[480px]">
            
            {/* Header Label Plate */}
            <div className="relative z-20 mb-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <Folder size={18} className="text-yellow animate-pulse" />
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
                          ? `${dept.tabColor} border-white shadow-xl z-30 ring-2 ring-white/60`
                          : "bg-white/15 backdrop-blur-md border-white/30 text-white hover:bg-white/25 z-10 font-black shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${dept.tabColor.split(" ")[0]} border border-white/40 shadow-sm shrink-0`} />

                        <span className="block font-display text-sm uppercase font-black tracking-wide leading-none">
                          {dept.name}
                        </span>
                      </div>

                      <ChevronRight size={18} className={`transition-transform ${isActive ? "translate-x-1 rotate-90" : "opacity-75"}`} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Bar Details */}
            <div className="relative z-20 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] font-display uppercase tracking-widest text-white/90 font-black">
              <span>BMSIT ORGANIZERS</span>
              <span>2026</span>
            </div>
          </div>

          {/* RIGHT SIDE: Opened File Sheet */}
          <div className="relative w-full h-auto">
            
            {/* MOBILE ONLY: Embedded Vibrant Gradient Horizontal Department Bar */}
            <div className="lg:hidden mb-3 bg-gradient-to-r from-[#3b0764] via-[#7e22ce] to-[#c026d3] p-3 rounded-[18px] border-2 border-white/40 shadow-xl flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Folder size={14} className="text-yellow" />
                  <span className="font-display text-[10px] uppercase font-black text-white tracking-wider">
                    SELECT DEPARTMENT
                  </span>
                </div>
                <span className="text-[10px] font-display font-black text-yellow uppercase">
                  {activeDept.name}
                </span>
              </div>

              {/* Horizontal Scroll Pill Selector */}
              <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
                {DEPARTMENTS.map((dept) => {
                  const isActive = dept.id === activeDeptId;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setActiveDeptId(dept.id)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display text-[11px] uppercase font-black transition-all border ${
                        isActive
                          ? `${dept.tabColor} border-white shadow-md ring-2 ring-white/40`
                          : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${dept.tabColor.split(" ")[0]} border border-white/40 shrink-0`} />
                      <span className="whitespace-nowrap">{dept.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className={`w-full h-auto rounded-brand border-2 border-white/40 ${activeDept.folderBg} p-3.5 sm:p-box clay-card flex flex-col justify-between shadow-xl relative overflow-hidden`}
              >
                <div>
                  {/* Folder Top Header Sheet */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 pb-3 sm:pb-4 mb-3 sm:mb-6 relative z-10">
                    <div>
                      <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-wider font-black text-ink/70">
                        NIRMAAN 2026 // DEPARTMENT
                      </span>
                      <h3 className="font-display text-xl sm:text-card uppercase text-ink font-black leading-tight mt-0.5 break-words">
                        {activeDept.name}
                      </h3>
                    </div>

                    <span className={`rounded-full px-3 py-1 font-display text-[10px] sm:text-xs uppercase font-black shadow-sm ${activeDept.badgeColor}`}>
                      {activeDept.members.length} Members
                    </span>
                  </div>

                  <p className="text-xs sm:text-body-xl text-ink font-semibold leading-snug mb-4 sm:mb-6 max-w-xl relative z-10 break-words">
                    {activeDept.description}
                  </p>

                  {/* Member Dossier ID Cards Grid */}
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 relative z-10 w-full">
                    {activeDept.members.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 + 0.1 }}
                        className="group rounded-[16px] sm:rounded-[20px] bg-white/95 backdrop-blur-md p-3 sm:p-4 border-2 border-white/80 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between min-w-0"
                      >
                        {/* Member Card Top Row */}
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          {/* Avatar */}
                          <MemberAvatar member={member} />

                          {/* Info Column */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-xs sm:text-base uppercase text-ink font-black truncate leading-tight">
                              {member.name}
                            </h4>

                            <p className="text-[10px] sm:text-xs font-black text-ink/75 mt-0.5 truncate">
                              {member.role}
                            </p>

                            {/* Skill Tag Pill */}
                            <span className="mt-1 inline-block rounded-full bg-ink text-yellow px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black tracking-wider shadow-sm truncate max-w-full">
                              {member.tag}
                            </span>
                          </div>
                        </div>

                        {/* Social Buttons Bottom Bar */}
                        <div className="mt-2.5 pt-2 border-t border-ink/10 flex items-center justify-end">
                          <div className="flex flex-wrap items-center gap-1">
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-red transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                GitHub <ArrowUpRight size={9} />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-blue transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                LinkedIn <ArrowUpRight size={9} />
                              </a>
                            )}
                            {member.twitter && (
                              <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-orange transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                X / Twitter <ArrowUpRight size={9} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Folder Bottom Stamp */}
                <div className="mt-5 sm:mt-8 pt-3 sm:pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-2 text-[9px] sm:text-xs font-display uppercase font-black text-ink/70 relative z-10">
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
