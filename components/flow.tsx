"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { eventFlowCards } from "@/lib/data";

export function EventFlow() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  // Capture window height for dynamic section sizing on desktop
  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Dynamically measure horizontal track scroll range on desktop
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const calculateRange = () => {
      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      const maxScroll = Math.max(0, trackWidth - containerWidth);
      setScrollRange(maxScroll);
    };

    calculateRange();

    const resizeObserver = new ResizeObserver(calculateRange);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, []);

  const sectionHeight = windowHeight > 0 ? windowHeight + scrollRange : undefined;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="event-flow" className="my-gap w-full" data-reveal>
      {/* ── DESKTOP LAYOUT (>= 1024px): Smooth Sticky Horizontal Scroll Track ── */}
      <div
        ref={targetRef}
        className="hidden lg:block relative w-full"
        style={{ height: sectionHeight ? `${sectionHeight}px` : "250vh" }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-10">
          <div className="flex gap-6 items-stretch h-[82vh] max-h-[680px] w-full px-8">
            
            {/* Left Side: Fixed Description Card */}
            <div className="flex w-[340px] xl:w-[360px] shrink-0 flex-col justify-between rounded-brand bg-red-light p-box clay-card text-white z-10">
              <div className="flex items-start justify-between">
                <div className="construction-mark" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-section uppercase text-white font-black">One flow.</h2>
                <p className="mt-[15px] text-body-xl text-white font-medium">
                  Nirmaan moves from kickoff to demo day through clear event phases, live checkpoints, mentor support, judging rounds, and a final showcase.
                </p>
              </div>
            </div>
            
            {/* Right Side: Horizontal Scroll Track Container */}
            <div ref={containerRef} className="min-w-0 flex-1 relative flex items-center overflow-hidden">
              <motion.div 
                ref={trackRef}
                style={{ x }}
                className="flex gap-6 items-stretch py-2"
              >
                {eventFlowCards.map((card, idx) => (
                  <div 
                    key={card.title} 
                    className="shrink-0 w-[340px] xl:w-[360px] flex flex-col gap-4"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border-2 border-white/20 shadow-md">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover filter contrast-105 hover:scale-105 transition-transform duration-500"
                        sizes="360px"
                      />
                      <span className="absolute top-4 left-4 bg-ink text-yellow text-[9px] font-display uppercase font-black px-2.5 py-1 rounded-full shadow-md">
                        Stage {idx + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1 rounded-[24px] bg-paper p-5 clay-card text-ink flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-3">
                          <h3 className="font-display text-lg uppercase font-black text-ink">{card.title}</h3>
                          <span className="font-display text-[10px] uppercase font-black text-ink/60">{card.subtitle}</span>
                        </div>
                      </div>
                      
                      <ul className="mt-2 space-y-2 border-t border-ink/10 pt-3">
                        {card.details.map((detail) => (
                          <li key={detail} className="text-xs text-ink font-bold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-red shrink-0" />
                            <span>{detail}</span>
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

      {/* ── MOBILE / TABLET LAYOUT (< 1024px): Clean Responsive Vertical & Swipeable Cards ── */}
      <div className="lg:hidden flex flex-col gap-5">
        {/* Mobile Header Card */}
        <div className="rounded-brand bg-red-light p-4 sm:p-box clay-card text-white flex flex-col justify-between">
          <div>
            <span className="font-display text-[10px] uppercase tracking-widest font-black text-yellow">
              NIRMAAN EVENT PIPELINE
            </span>
            <h2 className="font-display text-2xl sm:text-section uppercase text-white font-black leading-tight mt-1">
              One flow.
            </h2>
            <p className="mt-2 text-sm sm:text-body-xl text-white/95 font-medium leading-snug">
              Nirmaan moves from kickoff to demo day through clear event phases, live checkpoints, mentor support, judging rounds, and a final showcase.
            </p>
          </div>
        </div>

        {/* Mobile Horizontal Snap-Scroll Card List */}
        <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 sm:pb-4 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {eventFlowCards.map((card, idx) => (
            <div
              key={card.title}
              className="shrink-0 w-[240px] sm:w-[320px] snap-center flex flex-col gap-2.5"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] border-2 border-white/20 shadow-md">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover filter contrast-105"
                  sizes="320px"
                />
                <span className="absolute top-3 left-3 bg-ink text-yellow text-[9px] font-display uppercase font-black px-2.5 py-1 rounded-full shadow-md">
                  Stage {idx + 1}
                </span>
              </div>

              <div className="flex-1 rounded-[20px] bg-paper p-4 clay-card text-ink flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-2">
                    <h3 className="font-display text-base uppercase font-black text-ink">{card.title}</h3>
                    <span className="font-display text-[9px] uppercase font-black text-ink/60">{card.subtitle}</span>
                  </div>
                </div>

                <ul className="mt-2 space-y-1.5 border-t border-ink/10 pt-2.5">
                  {card.details.map((detail) => (
                    <li key={detail} className="text-[11px] text-ink font-bold flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
