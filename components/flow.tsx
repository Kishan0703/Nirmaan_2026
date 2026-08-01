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

  // Dynamically measure horizontal track scroll range for precise end-to-end alignment
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const calculateRange = () => {
      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      const paddingRight = 32;
      const maxScroll = Math.max(0, trackWidth - containerWidth + paddingRight);
      setScrollRange(maxScroll);
    };

    calculateRange();

    const resizeObserver = new ResizeObserver(() => {
      calculateRange();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, []);

  // Hook into vertical scroll progress of targetRef runway:
  // "start start" -> Top of target section reaches top of viewport (pin begins, progress = 0)
  // "end end"     -> Bottom of target section reaches bottom of viewport (pin ends, progress = 1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress [0, 1] 1:1 to horizontal displacement [0, -scrollRange]
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={targetRef} className="relative h-[250vh] w-full">
      {/* Inner Sticky Container pinned at top: 0, height: 100vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-6 lg:py-10">
        <div className="flex gap-6 items-stretch h-[82vh] max-h-[680px] w-full px-4 lg:px-8 max-lg:flex-col">
          
          {/* Left Side: Fixed Description Card */}
          <div className="flex w-full flex-col justify-between rounded-brand bg-red-light p-box lg:w-[320px] xl:w-[360px] lg:shrink-0 clay-card text-white z-10">
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
          
          {/* Right Side: Horizontal Scroll Track Container */}
          <div ref={containerRef} className="min-w-0 flex-1 relative flex items-center overflow-hidden">
            <motion.div 
              ref={trackRef}
              style={{ x }}
              className="flex gap-6 items-stretch py-2"
            >
              {eventFlowCards.map((card, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px] flex flex-col gap-4"
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
    </section>
  );
}

