"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Medal, Sparkles, Gift, Zap, Pizza, CheckCircle2, DollarSign, Coins } from "lucide-react";

type CashItem = {
  id: number;
  x: number;
  rotate: number;
  icon: string;
  size: number;
};

const PRIZES = [
  {
    rank: "2nd",
    place: "RUNNER UP",
    amount: "₹30,000",
    rawAmount: 30000,
    color: "bg-blue text-white",
    borderColor: "border-blue",
    shadowColor: "shadow-blue/20",
    height: "min-h-[340px] lg:h-[430px]",
    order: "order-2 lg:order-1",
    icon: Medal,
    perks: [
      "₹30,000 Cash Prize",
      "Official Runner-Up Plaque",
      "Premium Hacker Merch Kits",
      "Direct Sponsor Fast-Track Interviews",
    ],
  },
  {
    rank: "1st",
    place: "CHAMPIONS",
    amount: "₹40,000",
    rawAmount: 40000,
    color: "bg-yellow text-ink",
    borderColor: "border-yellow",
    shadowColor: "shadow-yellow/30",
    height: "min-h-[380px] lg:h-[490px]",
    order: "order-1 lg:order-2",
    badge: "GRAND PRIZE",
    icon: Trophy,
    perks: [
      "₹40,000 Cash Prize",
      "Nirmaan 2026 Winner Trophy",
      "VIP Sponsor Incubation & Mentorship",
      "Exclusive Winner Swag Box & Badges",
      "Featured Spot on Hall of Fame",
    ],
  },
  {
    rank: "3rd",
    place: "2nd RUNNER UP",
    amount: "₹15,000",
    rawAmount: 15000,
    color: "bg-orange text-white",
    borderColor: "border-orange",
    shadowColor: "shadow-orange/20",
    height: "min-h-[320px] lg:h-[410px]",
    order: "order-3 lg:order-3",
    icon: Award,
    perks: [
      "₹15,000 Cash Prize",
      "Official 2nd Runner-Up Plaque",
      "Nirmaan Swag Goodies",
      "Certificate of Merit",
    ],
  },
];

const TRACK_SPECIAL_PRIZES = [
  {
    track: "Software Track",
    title: "Best Open Innovation",
    amount: "₹7,500",
    rawAmount: 7500,
    badge: "SPECIAL TRACK AWARD",
    color: "bg-purple text-white",
    icon: Sparkles,
    desc: "Awarded to the most creative open innovation project built in the Software Track (AI, Web Apps & Open Tech).",
    perks: [
      "₹7,500 Cash Prize",
      "Official Certificate of Excellence",
    ],
  },
  {
    track: "Hardware Track",
    title: "Best Open Innovation",
    amount: "₹7,500",
    rawAmount: 7500,
    badge: "SPECIAL TRACK AWARD",
    color: "bg-green text-ink",
    icon: Zap,
    desc: "Awarded to the most inventive open innovation project built in the Hardware Track (Embedded Systems & IoT).",
    perks: [
      "₹7,500 Cash Prize",
      "Official Certificate of Excellence",
    ],
  },
];

const EXTRA_PERKS = [
  { icon: Gift, title: "Swag Kits for All Finalists", desc: "Custom stickers, t-shirts, and hacker badges for every finalist team." },
  { icon: Pizza, title: "Free Meals & Midnight Snacks", desc: "Red Bull energy drinks, midnight pizza boxes, and coffee on tap for 24 hours." },
  { icon: Zap, title: "Sponsor Bounties", desc: "Additional API & track bounties awarded by partner companies." },
];

export function PrizePoolSection() {
  const [cashBurst, setCashBurst] = useState<CashItem[]>([]);

  const triggerMakeItRain = () => {
    const icons = ["💸", "💵", "💰", "🪙", "₹500", "✨"];
    const newItems: CashItem[] = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5,
      rotate: Math.random() * 360,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: Math.floor(Math.random() * 16) + 20,
    }));

    setCashBurst(newItems);
    setTimeout(() => setCashBurst([]), 3200);
  };

  return (
    <section id="prizes" className="my-gap relative overflow-hidden" data-reveal>
      {/* ── Interactive Falling Money Rain Canvas Overlay ── */}
      <AnimatePresence>
        {cashBurst.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: -60, x: `${item.x}%`, opacity: 1, rotate: item.rotate, scale: 0.8 }}
            animate={{
              y: 750,
              opacity: [1, 1, 0],
              rotate: item.rotate + 360,
              scale: [1, 1.2, 0.9],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: Math.random() * 1.5 + 1.8, ease: "easeOut" }}
            style={{ fontSize: `${item.size}px` }}
            className="pointer-events-none absolute z-50 select-none font-black text-yellow drop-shadow-md"
          >
            {item.icon}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="clay-card bg-paper p-box rounded-brand border-2 border-white/40 shadow-xl relative z-10">
        
        {/* Header Title */}
        <div className="border-b border-ink/10 pb-6 mb-8">
          <div className="flex items-center gap-2">
            <Coins size={16} className="text-yellow animate-spin" />
            <span className="font-display text-xs uppercase tracking-widest text-ink/60 font-black">
              PRIZE POOL BREAKDOWN
            </span>
          </div>
          <h2 className="font-display text-section uppercase text-ink font-black mt-1 flex items-center gap-2">
            <span>₹1,00,000 Total Prize Pool</span>
            <span className="text-xl">💸</span>
          </h2>
        </div>

        {/* 3D Podium Layout with Money Shimmer */}
        <div className="grid gap-gap lg:grid-cols-3 items-end mb-10">
          {PRIZES.map((prize) => {
            const Icon = prize.icon;
            const isFirst = prize.rank === "1st";

            return (
              <motion.div
                key={prize.rank}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`${prize.order} ${prize.color} ${prize.height} clay-card rounded-brand p-6 border-2 border-white/40 flex flex-col justify-between relative overflow-hidden shadow-xl group`}
              >
                {/* Floating Background Cash Watermark */}
                <div className="absolute right-2 top-10 text-8xl font-black opacity-10 pointer-events-none select-none font-display tracking-tighter">
                  ₹
                </div>

                {/* Background Shimmer Glow */}
                {isFirst && (
                  <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/35 blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
                )}

                {/* Floating Money Badges */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-4 bottom-14 opacity-25 group-hover:opacity-60 transition-opacity pointer-events-none text-2xl font-black"
                >
                  {isFirst ? "💵 💸 🪙" : "💵"}
                </motion.div>

                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 rounded-full bg-black/15 backdrop-blur-sm border border-white/20">
                        <Icon size={22} className={isFirst ? "text-ink" : "text-white"} />
                      </div>
                      <span className="font-display text-xs uppercase tracking-wider font-black opacity-80">
                        {prize.place}
                      </span>
                    </div>

                    {prize.badge && (
                      <span className="bg-red text-white font-display text-[9px] uppercase font-black px-3 py-1 rounded-full shadow-sm animate-bounce">
                        {prize.badge}
                      </span>
                    )}
                  </div>

                  {/* Cash Amount Hero Display with Money Icon */}
                  <div className="my-4 relative z-10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase font-black tracking-tight leading-none block drop-shadow-sm">
                        {prize.amount}
                      </span>
                    </div>
                    <span className="text-[11px] font-display uppercase tracking-widest font-black opacity-75 mt-1 flex items-center gap-1">
                      <span>{prize.rank} PLACE CASH REWARD</span>
                      <DollarSign size={12} className="inline opacity-80" />
                    </span>
                  </div>

                  {/* Perks Checklist */}
                  <ul className="space-y-2 mt-6 border-t border-black/10 pt-4 relative z-10">
                    {prize.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-xs font-bold leading-tight">
                        <CheckCircle2 size={14} className="shrink-0 opacity-90 text-emerald-400" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[10px] font-display uppercase tracking-widest font-black opacity-70 relative z-10">
                  <span>NIRMAAN 2026 CASH</span>
                  <span>{prize.rank} REWARD</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Open Innovation Track Prizes Section ── */}
        <div className="mb-10 pt-8 border-t border-ink/10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-yellow" />
            <h3 className="font-display text-lg uppercase font-black text-ink">
              Open Innovation Track Prizes (Both Tracks)
            </h3>
          </div>

          <div className="grid gap-gap md:grid-cols-2">
            {TRACK_SPECIAL_PRIZES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.track}
                  className={`clay-card rounded-brand p-5 sm:p-6 border-2 border-white/40 ${item.color} shadow-lg flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-[10px] sm:text-xs uppercase tracking-wider font-black px-2.5 py-1 rounded-full bg-black/15 border border-white/20">
                        {item.track}
                      </span>
                      <span className="font-display text-[9px] uppercase font-black px-2.5 py-1 rounded-full bg-yellow text-ink shadow-sm">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 my-2">
                      <div className="p-2 rounded-xl bg-black/15 shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-display text-base sm:text-lg uppercase font-black leading-tight">
                          {item.title}
                        </h4>
                        <span className="font-display text-2xl sm:text-3xl font-black block mt-0.5">
                          {item.amount}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold leading-relaxed mt-2 opacity-90">
                      {item.desc}
                    </p>

                    <ul className="space-y-1.5 mt-4 pt-3 border-t border-white/20">
                      {item.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-xs font-bold">
                          <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 text-[9px] font-display uppercase tracking-widest font-black opacity-80 flex justify-between">
                    <span>{item.track.toUpperCase()} SPECIAL</span>
                    <span>{item.amount} CASH</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Extra Perks Grid */}
        <div className="grid gap-4 sm:grid-cols-3 pt-6 border-t border-ink/10">
          {EXTRA_PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="clay-card rounded-[18px] bg-white/70 backdrop-blur-sm p-4 border border-white/60 flex items-start gap-3.5 shadow-sm hover:scale-[1.02] transition-transform"
              >
                <div className="p-2.5 rounded-[12px] bg-ink text-yellow shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-display text-xs uppercase font-black text-ink leading-tight">
                    {perk.title}
                  </h4>
                  <p className="text-[11px] font-bold text-gray-700 leading-snug mt-1">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
