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
      { name: "Anmol Narayan", role: "Head (Coding Club)", tag: "Head", initials: "AN", avatar: "https://drive.google.com/thumbnail?id=13sVKpdiAgg2vJ4Z5vZbLR-z3WwQx2KU_&sz=w500", linkedin: "https://www.linkedin.com/in/anmol-narayan-8133a532a", github: "https://github.com/anmolnarayan" },
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
      { name: "Arnav Paniya", role: "UI/UX Head (Coding Club)", tag: "UI/UX Head", initials: "AP", avatar: "/assets/images/team/arnav.jpg" },
      { name: "Swapnil Biswas", role: "Web Engineer (Coding Club)", tag: "Web Developer", initials: "SB", avatar: "https://drive.google.com/thumbnail?id=10VGrCW4Mjl1a1tVf6vF3kMYRrPH9AJMk&sz=w500" },
      { name: "Kishan MN", role: "Web Engineer & Marketing Head", tag: "Web Developer", initials: "KMN", avatar: "/assets/images/team/kishan.jpg", linkedin: "https://www.linkedin.com/in/kishan-mn-898b67334", github: "https://github.com/Kishan0703" },
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
      { name: "Swapnil Biswas", role: "Design Specialist (Coding Club)", tag: "Graphics & Posters", initials: "SB", avatar: "https://drive.google.com/thumbnail?id=10VGrCW4Mjl1a1tVf6vF3kMYRrPH9AJMk&sz=w500" },
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
      { name: "Kishan MN", role: "Marketing Head (Coding Club)", tag: "Marketing Head", initials: "KMN", avatar: "/assets/images/team/kishan.jpg", linkedin: "https://www.linkedin.com/in/kishan-mn-898b67334", github: "https://github.com/Kishan0703" },
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
    <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-[14px] overflow-hidden border-2 border-ink/20 shadow-md bg-gradient-to-br from-ink to-gray-800 flex items-center justify-center text-white">
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
        <span className="font-display text-xs sm:text-sm uppercase font-black tracking-wider text-yellow">
          {member.initials}
        </span>
      )}
    </div>
  );
}

export function TeamSection() {
  const [activeTab, setActiveTab] = useState("core");

  const currentDept = DEPARTMENTS.find((d) => d.id === activeTab) || DEPARTMENTS[0];

  return (
    <section id="team" className="my-gap relative" data-reveal>
      <div className="rounded-brand bg-paper p- box clay-card border-2 border-white/60 shadow-2xl relative overflow-hidden">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-ink/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink text-paper text-[10px] sm:text-xs font-display uppercase tracking-[0.2em] font-black mb-3">
              <span>Nirmaan 2026 Crew</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl uppercase font-black tracking-tight text-ink">
              Roster &amp; Organizers
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-bold text-ink/75 leading-relaxed">
            Meet the architects, engineers, designers, marketing strategists, and volunteer leads building Nirmaan 2026.
          </p>
        </div>

        {/* ── TOP FOLDER TABS NAVIGATION ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none mb-6">
          {DEPARTMENTS.map((dept) => {
            const isActive = activeTab === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-[16px] font-display text-xs sm:text-sm font-black uppercase tracking-wide transition-all shrink-0 flex items-center gap-2 border-2 active:scale-95 ${
                  isActive
                    ? `${dept.tabColor} border-ink shadow-[4px_4px_0px_0px_#18181b] -translate-y-1`
                    : "bg-paper text-ink/80 border-ink/20 hover:border-ink/40 hover:bg-white hover:text-ink"
                }`}
              >
                <Folder size={14} className={isActive ? "fill-current" : "opacity-70"} />
                <span>{dept.name}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-current" : "bg-ink/10 text-ink"}`}>
                  {dept.members.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── ACTIVE DEPARTMENT DOSSIER CARD ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDept.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="rounded-[24px] border-2 border-ink/20 bg-white p-5 sm:p-8 shadow-xl relative overflow-hidden"
          >
            {/* Header / Accent Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-ink/10">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full font-display text-xs font-black uppercase ${currentDept.badgeColor}`}>
                  {currentDept.name}
                </span>
                <span className="text-xs font-bold text-ink/60">
                  {currentDept.members.length} Active Roster Members
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-ink/80 max-w-lg">
                {currentDept.description}
              </p>
            </div>

            {/* ── MEMBER CARDS MATRIX (Heads on Top Row) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {currentDept.members.map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="group relative rounded-[20px] bg-paper border-2 border-ink/15 p-4 sm:p-5 shadow-md hover:border-ink hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <MemberAvatar member={member} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display text-sm sm:text-base uppercase font-black text-ink tracking-tight truncate group-hover:text-purple transition-colors">
                          {member.name}
                        </h3>

                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-ink/10 text-ink font-display text-[9px] sm:text-[10px] font-black uppercase">
                          {member.tag}
                        </span>
                      </div>

                      <p className="font-sans text-xs font-bold text-ink/70 mt-0.5 truncate">
                        {member.role}
                      </p>

                      {member.description && (
                        <p className="font-sans text-[11px] font-medium text-ink/80 mt-2 line-clamp-2 leading-relaxed bg-white/70 p-2 rounded-xl border border-ink/10">
                          "{member.description}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social / External Links Bar */}
                  {(member.github || member.linkedin || member.instagram || member.twitter || member.website) && (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-ink/10 justify-end flex-wrap">
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-purple transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                        >
                          Website <ArrowUpRight size={9} />
                        </a>
                      )}
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
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-red transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                        >
                          Instagram <ArrowUpRight size={9} />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-ink text-white px-2 py-0.5 font-display text-[8px] sm:text-[9px] uppercase font-black hover:bg-blue transition-all flex items-center gap-0.5 shadow-sm active:translate-y-0.5"
                        >
                          Twitter <ArrowUpRight size={9} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
