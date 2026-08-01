"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventFlowCards } from "@/lib/data";

export function EventFlow() {
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
            <h2 className="font-display text-section uppercase text-white font-black">One flow.</h2>
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
