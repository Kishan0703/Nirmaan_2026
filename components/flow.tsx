"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { eventFlowCards } from "@/lib/data";

export function EventFlow() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Hook into vertical scroll of the target wrapper section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress [0, 1] to horizontal translation percent [-62%]
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <div ref={targetRef} className="relative h-[220vh]">
      {/* Sticky container that locks in viewport while translation completes */}
      <div className="sticky top-[80px] h-[calc(100vh-120px)] flex flex-col justify-center overflow-hidden">
        <div className="flex gap-gap items-stretch h-full py-4 max-lg:flex-col">
          
          {/* Left Side: Fixed Description Card */}
          <div className="flex w-full flex-col justify-between rounded-brand bg-red-light p-box lg:w-[28vw] lg:flex-none clay-card text-white z-10">
            <div className="flex items-start justify-between">
              <div className="construction-mark" aria-hidden="true" />
            </div>
            <div className="mt-auto max-lg:mt-6">
              <h2 className="font-display text-section uppercase text-white font-black">One flow.</h2>
              <p className="mt-[15px] text-body-xl text-white font-medium">
                Nirmaan moves from kickoff to demo day through clear event phases, live checkpoints, mentor support, judging rounds, and a final showcase.
              </p>
            </div>
          </div>
          
          {/* Right Side: Horizontal Parallax Scroll Track */}
          <div className="min-w-0 flex-1 relative flex items-center overflow-hidden">
            <motion.div 
              style={{ x }}
              className="flex gap-6 pr-[20vw]"
            >
              {eventFlowCards.map((card, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 w-[290px] md:w-[360px] flex flex-col gap-4"
                >
                  {/* Stage Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border-2 border-white/20 shadow-md">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover filter contrast-125 saturate-50 hover:scale-105 transition-transform duration-500"
                      sizes="360px"
                    />
                    <span className="absolute top-4 left-4 bg-ink text-yellow text-[9px] font-display uppercase font-black px-2.5 py-1 rounded-full shadow-md">
                      Stage {idx + 1}
                    </span>
                  </div>
                  
                  {/* Stage Details */}
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
