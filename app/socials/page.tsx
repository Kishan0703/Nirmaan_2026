"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { SocialInstagram, SocialLinkedin } from "@/components/icons";

const clubs = [
  {
    name: "Coding Club",
    initials: "CC",
    color: "bg-purple",
    textColor: "text-purple",
    description: "BMSIT Coding Club — Build, Learn, Ship.",
    socials: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/codingclub_bmsit/",
        icon: SocialInstagram,
        hoverColor: "hover:bg-red",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/codingclub-bmsit/",
        icon: SocialLinkedin,
        hoverColor: "hover:bg-blue",
      },
      {
        platform: "WhatsApp Community",
        url: "https://chat.whatsapp.com/KkXQRuFjlCnCLuYV7G24Vf",
        icon: WhatsAppIcon,
        hoverColor: "hover:bg-green",
      },
    ],
  },
  {
    name: "Alterino",
    initials: "AL",
    color: "bg-orange",
    textColor: "text-orange",
    description: "BMSIT Alterino — Hardware, Innovation, Impact.",
    socials: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/alterino_bmsit/",
        icon: SocialInstagram,
        hoverColor: "hover:bg-red",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/alterino/posts/?feedView=all",
        icon: SocialLinkedin,
        hoverColor: "hover:bg-blue",
      },
    ],
  },
];

function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function SocialsPage() {
  return (
    <main className="min-h-screen bg-[#f4e9e1] text-ink p-6 lg:p-12 relative flex flex-col justify-between">
      <div className="clay-grid absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-6 mb-8">
          <Logo />
          <Link
            href="/"
            className="clay-card rounded-full bg-ink text-white px-5 py-2.5 text-xs font-display uppercase font-black"
          >
            ← Back to Lobby
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="font-display text-[42px] md:text-[56px] leading-none uppercase font-black tracking-tight mb-3">
            Socials
          </h1>
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">
            Follow our clubs &amp; stay connected
          </p>
        </div>

        {/* Club Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {clubs.map((club) => (
            <div
              key={club.name}
              className="clay-card bg-paper p-6 md:p-8 rounded-[28px] border-2 border-white/50 shadow-soft"
            >
              {/* Club Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`${club.color} h-12 w-12 rounded-full flex items-center justify-center clay-card`}>
                  <span className="font-display text-sm font-black text-white">{club.initials}</span>
                </div>
                <div>
                  <h2 className="font-display text-xl uppercase font-black tracking-tight">{club.name}</h2>
                  <p className="text-xs font-bold text-gray-500">{club.description}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-3">
                {club.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 rounded-[14px] border-2 border-ink/10 bg-white/60 p-4 transition-all hover:scale-[1.02] hover:border-ink/20 hover:shadow-sm`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white ${social.hoverColor} transition-all shadow-sm`}>
                      <social.icon className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display text-sm uppercase font-black">{social.platform}</span>
                      <span className="text-[10px] font-bold text-gray-500 truncate max-w-[200px]">
                        {social.url.replace(/https?:\/\//, "").split("/")[0]}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="relative z-10 text-center mt-12 text-[10px] font-display uppercase tracking-widest font-black text-ink/40">
        © 2026 NIRMAAN // SOCIALS GRID
      </footer>
    </main>
  );
}
