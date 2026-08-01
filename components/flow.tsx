"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { eventFlowCards } from "@/lib/data";

export function EventFlow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const percentage = (scrollLeft / maxScroll) * 100;
    setScrollProgress(percentage);
  };

  return (
    <section id="schedule" className="my-gap overflow-hidden" data-reveal>
      <div className="flex gap-gap max-lg:flex-col items-stretch">
        
        {/* Left Side: Fixed Description Board */}
        <div className="flex w-full flex-col justify-between rounded-brand bg-red-light p-box lg:w-[29.688vw] lg:flex-none clay-card text-white">
          <div className="flex items-start justify-between">
            <div className="construction-mark" aria-hidden="true" />
          </div>
          <div className="mt-auto max-lg:mt-10">
            <h2 className="font-display text-section uppercase text-white font-black">One flow.</h2>
            <p className="mt-[15px] text-body-xl text-white font-medium">
              Nirmaan moves from kickoff to demo day through clear event phases, live checkpoints, mentor support, judging rounds, and a final showcase.
            </p>
          </div>
        </div>
        
        {/* Right Side: Horizontal Scroll Deck */}
        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none"
            }}
          >
            {eventFlowCards.map((card, idx) => (
              <div 
                key={idx} 
                className="snap-start shrink-0 w-[290px] md:w-[350px] flex flex-col gap-3"
              >
                {/* Stage Image card with status badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border-2 border-white/20 shadow-md">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover filter contrast-125 saturate-50 hover:scale-105 transition-transform duration-500"
                    sizes="300px"
                  />
                  <span className="absolute top-4 left-4 bg-ink text-yellow text-[9px] font-display uppercase font-black px-2.5 py-1 rounded-full shadow-md">
                    Stage {idx + 1}
                  </span>
                </div>
                
                {/* Stage Details Block */}
                <div className="clay-card bg-yellow p-5 rounded-[24px] text-ink flex-1 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3 className="font-display text-[18px] uppercase font-black leading-tight">{card.title}</h3>
                    <p className="text-[10px] uppercase font-bold text-gray-700 mt-1">{card.subtitle}</p>
                  </div>
                  <ul className="mt-4 space-y-1.5 border-t border-ink/10 pt-3">
                    {card.details.map((detail) => (
                      <li key={detail} className="text-xs font-semibold text-ink/90 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Scrolling progress bar overlay */}
          <div className="mt-4 flex items-center gap-4">
            <div className="h-1 bg-white/40 rounded-full flex-1 max-w-[200px] overflow-hidden relative shadow-inner">
              <div 
                className="h-full bg-yellow rounded-full transition-all duration-75" 
                style={{ width: `${scrollProgress}%` }} 
              />
            </div>
            <span className="font-display text-[10px] font-black uppercase text-gray-700 tracking-wider">
              Swipe or Scroll to explore stages
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
