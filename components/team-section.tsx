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
  description?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
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
      { name: "Anmol Narayan", role: "Head (Coding Club)", tag: "President", initials: "AN", avatar: "https://drive.google.com/thumbnail?id=13sVKpdiAgg2vJ4Z5vZbLR-z3WwQx2KU_&sz=w500", linkedin: "https://www.linkedin.com/in/anmol-narayan-8133a532a", github: "https://github.com/anmolnarayan" },
      { name: "Amey Vikram Singh", role: "Head (Alterino)", tag: "Head", initials: "AVS", avatar: "/assets/images/team/amey.jpg", linkedin: "https://www.linkedin.com/in/amey-vikram-singh-610039333/", instagram: "https://www.instagram.com/ameyvikramsingh.bisen/" },
      { name: "Alok Verma", role: "Co-Head (Coding Club)", tag: "Co-Head", initials: "AV", avatar: "https://drive.google.com/thumbnail?id=18tgb1zLyUjvYDq53OgFufxgTFkb3nVMO&sz=w500" },
      { name: "Dheeksha N", role: "Co-Head (Coding Club)", tag: "Co-Head", initials: "DN", avatar: "https://drive.google.com/thumbnail?id=10DKueLQJbU-9gpz-rwP7WCfSeCrW2lzF&sz=w500", linkedin: "https://www.linkedin.com/in/dheekshanaveen/", github: "https://github.com/dheekshanaveen" },
      { name: "Shashikiran B S", role: "Co-Head (Coding Club)", tag: "Co-Head", initials: "SB", avatar: "https://drive.google.com/thumbnail?id=1LuA9DgCAUfWujIEvEA_iyFJJqxgi4dSG&sz=w500", linkedin: "https://www.linkedin.com/in/shashikiran-bs/", github: "https://github.com/shashikiranbs2006" },
      { name: "Saurabh Kumar", role: "Co-Head (Alterino)", tag: "Co-Head", initials: "SK", avatar: "https://drive.google.com/thumbnail?id=1XincBkx8sKuO5QbTtiP2aAKqmXXAWM5d&sz=w500", linkedin: "https://www.linkedin.com/in/saurabh-kumar-6358a433b" },
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
      { name: "Shashikiran B S", role: "Technical Head (Coding Club)", tag: "Head", initials: "SB", avatar: "https://drive.google.com/thumbnail?id=1LuA9DgCAUfWujIEvEA_iyFJJqxgi4dSG&sz=w500", linkedin: "https://www.linkedin.com/in/shashikiran-bs/", github: "https://github.com/shashikiranbs2006" },
      { name: "Arnav Paniya", role: "UI/UX Head (Coding Club)", tag: "UI/UX Head", initials: "AP", avatar: "/assets/images/team/arnav.jpg", description: "VLSI & AI Enthusiast | Freelancer", website: "https://arnavpaniya.netlify.app/", linkedin: "https://www.linkedin.com/in/arnav-paniya/", github: "https://github.com/arnavpaniya" },
      { name: "Swapnil Biswas", role: "Web Engineer (Coding Club)", tag: "Web Developer", initials: "SB", avatar: "https://drive.google.com/thumbnail?id=10VGrCW4Mjl1a1tVf6vF3kMYRrPH9AJMk&sz=w500", description: "Full Stack developer and robotics enthusiast focused on creating scalable software and intelligent systems.", linkedin: "https://www.linkedin.com/in/swapnil-biswas-b33b35399/", github: "https://github.com/Swapnil-Biswas" },
      { name: "Kishan MN", role: "Web Engineer & Marketing Head", tag: "Web Developer", initials: "KMN", avatar: "/assets/images/team/kishan.jpg", website: "https://www.kishanmn.dev/", linkedin: "https://www.linkedin.com/in/kishan-mn-898b67334", github: "https://github.com/Kishan0703" },
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
      { name: "Lakshaya Garg", role: "Design Head (Coding Club)", tag: "Design Head", initials: "LG", avatar: "https://drive.google.com/thumbnail?id=1PI7coMAk5dRJeHf5Bfc1nvHunJ40KBT7&sz=w500" },
      { name: "Mansi Kalgudi", role: "Design Lead (Coding Club)", tag: "Design Lead", initials: "MK", avatar: "https://drive.google.com/thumbnail?id=10nWnrJkeb-K-2W_evQ8ilk90w45QCmnE&sz=w500", linkedin: "https://www.linkedin.com/in/mansi-kalgudi-ba2520333" },
      { name: "Archisha Gupta", role: "Design Specialist (Coding Club)", tag: "Visual Design", initials: "AG", avatar: "https://drive.google.com/thumbnail?id=13A3ElGHqh4YKwWy27DPaKGJ2Jh0RhuWV&sz=w500", linkedin: "https://www.linkedin.com/in/archisha-gupta-4a6266385/", github: "https://github.com/Archish2007Gupta" },
      { name: "Sakshi Sanjeev Jadhav", role: "Design Specialist (Coding Club)", tag: "Graphic Design", initials: "SJ", avatar: "https://drive.google.com/thumbnail?id=1VD209VQN0hT7epOoijKUDFsJ5oBRPSym&sz=w500", linkedin: "https://www.linkedin.com/in/sakshi-jadhav-aa5328387", github: "https://github.com/sakshisjadhav2708" },
      { name: "Sonika K", role: "Creative Specialist (Coding Club)", tag: "Creative Design", initials: "SK", avatar: "https://drive.google.com/thumbnail?id=1BqlWve0awh8MYSmhdOSlorFqSmKFhMvn&sz=w500", description: "Computer science student with a creative side who loves bringing ideas to life, whether through tech, art, or performance.", linkedin: "https://www.linkedin.com/in/sonika-k-153136384", github: "https://github.com/sonika13-droid" },
      { name: "Swapnil Biswas", role: "Design Specialist (Coding Club)", tag: "Graphics & Posters", initials: "SB", avatar: "https://drive.google.com/thumbnail?id=10VGrCW4Mjl1a1tVf6vF3kMYRrPH9AJMk&sz=w500", description: "Full Stack developer and robotics enthusiast focused on creating scalable software and intelligent systems.", linkedin: "https://www.linkedin.com/in/swapnil-biswas-b33b35399/", github: "https://github.com/Swapnil-Biswas" },
      { name: "Sajja Chaulagain", role: "Creative Designer (Coding Club)", tag: "Visual Art", initials: "SC", avatar: "https://drive.google.com/thumbnail?id=17K3f_0FHSVIXpAmFueifFfrfdUGyEIIB&sz=w500", linkedin: "https://www.linkedin.com/in/sajja-chaulagain-5a6204334" },
      { name: "Kanishk Upadhyay", role: "Design Specialist (Coding Club)", tag: "Design Assets", initials: "KU", avatar: "https://drive.google.com/thumbnail?id=1bdg_Dn6renQ4HQDlF70WXEC3CSPIW5-6&sz=w500" },
      { name: "Madhusudhan C N", role: "Brand Designer (Alterino)", tag: "Brand Design", initials: "MC", avatar: "https://drive.google.com/thumbnail?id=1iWPRDb06OYUaBYJw6L7xtDfdZz5_gmWh&sz=w500", linkedin: "https://www.linkedin.com/in/madhusudhan-c-n-a985a3337", github: "https://github.com/MadhusudhanCN" },
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
      { name: "Alok Verma", role: "Event & Ops Head (Coding Club)", tag: "Ops Head", initials: "AV", avatar: "https://drive.google.com/thumbnail?id=18tgb1zLyUjvYDq53OgFufxgTFkb3nVMO&sz=w500" },
      { name: "Ritik", role: "Event & Ops Head (Alterino)", tag: "Ops Head", initials: "R", avatar: "https://drive.google.com/thumbnail?id=1t8KEfb_LD-pwHvgp1pM6QVUQjnlgXLcO&sz=w500", linkedin: "https://www.linkedin.com/in/ritik-baranwal-95275b334" },
      { name: "Rithika Shetty", role: "Event & Ops Associate (Coding Club)", tag: "Event Ops", initials: "RS", avatar: "https://drive.google.com/thumbnail?id=117vOViNG9gtX3CD4upfnxaSGpsu6rpTs&sz=w500", linkedin: "https://www.linkedin.com/in/rithika-shetty624", github: "https://github.com/RithikaShetty2025" },
      { name: "Likitha S", role: "Event & Ops Associate (Coding Club)", tag: "Logistics", initials: "LS", avatar: "https://drive.google.com/thumbnail?id=1FgHj_iJ3LimFLeLPPM4AymOWfY7OeZZ4&sz=w500", linkedin: "https://www.linkedin.com/in/likitha-siddabasappa-421774359/", github: "https://github.com/likithha500" },
      { name: "Harshit Raj", role: "Event & Ops Associate (Coding Club)", tag: "Operations", initials: "HR", avatar: "https://drive.google.com/thumbnail?id=11BRUb7LHA29QVyGuPkr2Xmq9YQWRH_ZH&sz=w500" },
      { name: "Parth Paliwal", role: "Event & Ops Associate (Coding Club)", tag: "Operations", initials: "PP", avatar: "" },
      { name: "Ravindra A", role: "Event & Ops Associate (Alterino)", tag: "Event Ops", initials: "RA", avatar: "https://drive.google.com/thumbnail?id=1eJKn-IML4lEYl7jXlmYLCEkd1EeS0iwP&sz=w500", description: "just a cool guy. nothing much, just vibes.", linkedin: "https://www.linkedin.com/in/ravizzz", github: "https://github.com/ravizzz18" },
      { name: "Vanshika Biswal", role: "Event & Ops Associate (Alterino)", tag: "Event & Creative", initials: "VB", avatar: "https://drive.google.com/thumbnail?id=1JIiQzkPkttI7MfuC2thlCjva0tUP9nWK&sz=w500", description: "Part-time artist, full-time extrovert bringing creativity into everything I do.", linkedin: "https://www.linkedin.com/in/vanshika-biswal-b583aa357" },
      { name: "Zoha Tabassum Khader", role: "Event & Ops Associate (Coding Club)", tag: "Event Ops", initials: "ZK", avatar: "" },
      { name: "Aman Kumar Bhagat", role: "Event & Ops Associate (Alterino)", tag: "Event Ops", initials: "AB", avatar: "https://drive.google.com/thumbnail?id=1vOEkJjE8yrd_xY9h13t0heQTJMbzQYct&sz=w500", linkedin: "https://www.linkedin.com/in/aman-kumar-bhagat-700340315" },
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
      { name: "Kishan MN", role: "Marketing Head (Coding Club)", tag: "Marketing Head", initials: "KMN", avatar: "/assets/images/team/kishan.jpg", website: "https://www.kishanmn.dev/", linkedin: "https://www.linkedin.com/in/kishan-mn-898b67334", github: "https://github.com/Kishan0703" },
      { name: "Saurabh Kumar", role: "Marketing Head (Alterino)", tag: "Marketing Head", initials: "SK", avatar: "https://drive.google.com/thumbnail?id=1XincBkx8sKuO5QbTtiP2aAKqmXXAWM5d&sz=w500", linkedin: "https://www.linkedin.com/in/saurabh-kumar-6358a433b" },
      { name: "Sneha Mudgal", role: "Marketing Strategist (Coding Club)", tag: "Outreach Lead", initials: "SM", avatar: "https://drive.google.com/thumbnail?id=1XuIV2l_cy-DWdLr9CBYGK8FDme0QfJDa&sz=w500", linkedin: "https://www.linkedin.com/in/sneha-mudgal0806/", github: "https://github.com/Sneham-06" },
      { name: "Sai Amrutha AS", role: "Marketing Strategist (Coding Club)", tag: "Campaign Lead", initials: "SA", avatar: "https://drive.google.com/thumbnail?id=1wICOPf4tsrI3yE_JIxDzte3FoHbejSIn&sz=w500", linkedin: "https://www.linkedin.com/in/sai-amrutha-a-s-443671307/", github: "https://github.com/saiamruthaas-as" },
      { name: "Sarjath", role: "Marketing Specialist", tag: "Growth & Hype", initials: "S", avatar: "" },
      { name: "Sakshi Sanjeev Jadhav", role: "Marketing Specialist (Coding Club)", tag: "Social Content", initials: "SJ", avatar: "https://drive.google.com/thumbnail?id=1VD209VQN0hT7epOoijKUDFsJ5oBRPSym&sz=w500", linkedin: "https://www.linkedin.com/in/sakshi-jadhav-aa5328387", github: "https://github.com/sakshisjadhav2708" },
      { name: "Namratha R Bagade", role: "Marketing Specialist (Alterino)", tag: "Outreach & PR", initials: "NB", avatar: "https://drive.google.com/thumbnail?id=1CJg5AI1paNKpBq2oUB9ursiWwgjuyE8l&sz=w500", linkedin: "https://www.linkedin.com/in/namratha-r-bagade-b8b980384" },
    ],
  },
  {
    id: "volunteers",
    name: "Volunteers",
    badgeColor: "bg-orange text-white",
    tabColor: "bg-orange text-white",
    folderBg: "bg-orange",
    accentColor: "#ff7700",
    textColor: "text-orange",
    description: "Dedicated volunteer team managing ground support, registration desks, and hacker experience.",
    members: [
      { name: "Ayush Kumar", role: "Volunteer (Coding Club)", tag: "Ground Support", initials: "AK", avatar: "https://drive.google.com/thumbnail?id=1aVFuQ2r9OImnuSKEX2rc4ez7Xk_M0HQn&sz=w500", linkedin: "https://www.linkedin.com/in/ayush-kumar-b97886315" },
      { name: "Sisir Raj", role: "Volunteer (Alterino)", tag: "Ground Support", initials: "SR", avatar: "https://drive.google.com/thumbnail?id=1ZhJ_wpvxfbLHy4T80-fx2O_XI5Mm6VMi&sz=w500", linkedin: "https://www.linkedin.com/in/sisir-raj-388bba331" },
      { name: "Eklavya Agarwal", role: "Volunteer (Coding Club)", tag: "Ground Support", initials: "EA", avatar: "https://drive.google.com/thumbnail?id=12jrBZqNIwVZxibXcoLy_t6UcSvkAiM2H&sz=w500", linkedin: "https://www.linkedin.com/in/eklavya-agarwal-156509375/", github: "https://github.com/agarwaleklavya575-sudo" },
      { name: "Sajja Chaulagain", role: "Volunteer (Coding Club)", tag: "Ground Support", initials: "SC", avatar: "https://drive.google.com/thumbnail?id=17K3f_0FHSVIXpAmFueifFfrfdUGyEIIB&sz=w500", linkedin: "https://www.linkedin.com/in/sajja-chaulagain-5a6204334" },
      { name: "Prateek Mitra", role: "Volunteer (Coding Club)", tag: "Ground Support", initials: "PM", avatar: "", linkedin: "https://www.linkedin.com/in/prateek-mitra-7953522aa/", github: "https://github.com/Prateek07-code" },
      { name: "Shlesha Singh Thakuri", role: "Volunteer (Coding Club)", tag: "Ground Support", initials: "ST", avatar: "https://drive.google.com/thumbnail?id=1toyRzMw1raM9WhfJYi6m6s4RneyVT3Nw&sz=w500" },
    ],
  },
];

function MemberAvatar({ member }: { member: Member }) {
  const [imgError, setImgError] = useState(false);
  const hasAvatar = Boolean(member.avatar && member.avatar.trim() !== "");

  return (
    <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-[14px] overflow-hidden border-2 border-ink/20 shadow-md bg-gradient-to-br from-ink to-gray-800 flex items-center justify-center text-white">
      {hasAvatar && !imgError ? (
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          unoptimized
          onError={() => setImgError(true)}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <span className="font-display text-xs uppercase font-black tracking-wider text-yellow">
          {member.initials}
        </span>
      )}
    </div>
  );
}

export function TeamSection() {
  const [activeDeptId, setActiveDeptId] = useState("core");
  const activeDept = DEPARTMENTS.find((d) => d.id === activeDeptId) || DEPARTMENTS[0];

  return (
    <section id="team" className="my-gap space-y-gap w-full max-w-full overflow-hidden" data-reveal>
      {/* ── Interactive Department Filing Cabinet Section ── */}
      <div className="w-full max-w-full">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6">
          <span className="font-display text-xs uppercase tracking-widest text-ink/60 font-black">
            ROSTER &amp; CREW
          </span>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl uppercase font-black text-ink tracking-tight">
            Organizing Team
          </h2>
        </div>

        {/* Main Cuboid File Box Layout with Left 6x1 Column Navigation */}
        <div className="grid gap-gap lg:grid-cols-[360px_1fr] w-full min-w-0">
          
          {/* LEFT SIDE: 6x1 Column Roster Navigation Container (DESKTOP ONLY) */}
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
                <span className="text-[10px] font-black text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                  6 DEPARTMENTS
                </span>
              </div>
            </div>

            {/* Vertical 6x1 Folder File Stack */}
            <div className="space-y-3 relative z-10 my-1">
              {DEPARTMENTS.map((dept) => {
                const isActive = dept.id === activeDeptId;

                return (
                  <motion.div key={dept.id} className="relative" initial={false}>
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

            {/* Cabinet Footer Note */}
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] font-black text-white/80 uppercase">
              <span>NIRMAAN 2026 CREW</span>
              <span>BMSIT</span>
            </div>
          </div>

          {/* RIGHT SIDE: Opened File Sheet Container */}
          <div className="relative w-full min-w-0">
            
            {/* MOBILE ONLY: Embedded Vibrant Gradient Horizontal Department Selector */}
            <div className="lg:hidden mb-3 bg-gradient-to-r from-[#3b0764] via-[#7e22ce] to-[#c026d3] p-3 rounded-[18px] border-2 border-white/40 shadow-xl flex flex-col gap-2 w-full max-w-full overflow-hidden">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Folder size={14} className="text-yellow" />
                  <span className="font-display text-[11px] uppercase tracking-wider font-black text-white">
                    SELECT DEPARTMENT
                  </span>
                </div>
                <span className="text-[9px] font-black text-white/80 bg-white/20 px-2 py-0.5 rounded-full">
                  6 DEPARTMENTS
                </span>
              </div>

              {/* Horizontal Scroll Pill Selector with Touch Pan */}
              <div className="flex overflow-x-auto flex-nowrap gap-2 py-1 px-1 touch-pan-x overscroll-x-contain select-none scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full">
                {DEPARTMENTS.map((dept) => {
                  const isActive = dept.id === activeDeptId;
                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setActiveDeptId(dept.id)}
                      className={`shrink-0 min-w-max flex items-center gap-1.5 px-3.5 py-2 rounded-full font-display text-[11px] uppercase font-black transition-all border ${
                        isActive
                          ? `${dept.tabColor} border-white shadow-md ring-2 ring-white/50 scale-[1.02]`
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

            {/* Dossier Card Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className={`w-full max-w-full h-auto rounded-brand border-2 border-white/40 ${activeDept.folderBg} p-3 sm:p-box clay-card flex flex-col justify-between shadow-xl relative overflow-hidden`}
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
                        key={`${member.name}-${member.role}`}
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

                            {member.description && (
                              <p className="text-[9px] sm:text-[10px] font-semibold text-ink/80 mt-1 leading-snug break-words">
                                &quot;{member.description}&quot;
                              </p>
                            )}

                            {/* Skill Tag Pill */}
                            <span className="mt-1.5 inline-block rounded-full bg-ink text-yellow px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black tracking-wider shadow-sm truncate max-w-full">
                              {member.tag}
                            </span>
                          </div>
                        </div>

                        {/* Social Buttons Bottom Bar */}
                        <div className="mt-2.5 pt-2 border-t border-ink/10 flex items-center justify-end">
                          <div className="flex flex-wrap items-center gap-1">
                            {member.website && (
                              <a
                                href={member.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-purple transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                Website <ArrowUpRight className="h-2.5 w-2.5" />
                              </a>
                            )}
                            {member.github && (
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-red transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                GitHub <ArrowUpRight className="h-2.5 w-2.5" />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-blue transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                LinkedIn <ArrowUpRight className="h-2.5 w-2.5" />
                              </a>
                            )}
                            {member.instagram && (
                              <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-red transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                Instagram <ArrowUpRight className="h-2.5 w-2.5" />
                              </a>
                            )}
                            {member.twitter && (
                              <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-orange transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                              >
                                X / Twitter <ArrowUpRight className="h-2.5 w-2.5" />
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
