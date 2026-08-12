"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { galleryImages } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function GallerySection() {
  // Triplicated array for smooth infinite marquee loop
  const marqueeImages = [...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <section id="gallery" className="my-gap" data-reveal>
      <div className="clay-card bg-purple p-4 sm:p-6 rounded-brand border-2 border-white/20 text-white overflow-hidden">
        
        {/* Header with Navigation Link to full /gallery page */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4 mb-6">
          <div>
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-widest text-yellow font-black">
              NIRMAAN ARCHIVES // LIVE REEL
            </span>
            <h2 className="font-display text-2xl sm:text-section uppercase text-white font-black leading-tight mt-0.5">
              Event Gallery
            </h2>
          </div>

          {/* Navigation Button to Full Gallery Page */}
          <Link
            href="/gallery"
            className="clay-card rounded-pill bg-yellow px-5 py-2.5 text-xs sm:text-sm font-display uppercase font-black text-ink hover:scale-105 transition-all shadow-md flex items-center gap-1.5 active:translate-y-0.5"
          >
            <span>View Full Gallery</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Single Row Horizontal Scroller (Left-to-Right Continuous Motion) */}
        <div className="relative w-full overflow-hidden py-2">
          <motion.div
            className="flex w-max gap-4 sm:gap-6 items-center"
            animate={{ x: ["-33.333%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 32,
                ease: "linear",
              },
            }}
          >
            {marqueeImages.map((img, i) => (
              <Link
                key={`${img.id}-${i}`}
                href="/gallery"
                className="shrink-0 w-[250px] sm:w-[320px] group/card"
              >
                <div className="clay-card bg-paper p-2.5 sm:p-3 rounded-[20px] text-ink border-2 border-white/40 shadow-md group-hover/card:scale-[1.03] transition-transform duration-300 overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden rounded-[14px] border border-white/30">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover filter saturate-105 contrast-105 group-hover/card:scale-110 transition-transform duration-500"
                      sizes="(min-width: 1024px) 320px, 250px"
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between px-1">
                    <span className="font-display text-[10px] sm:text-xs uppercase font-black text-ink/80 tracking-wider">
                      {img.category}
                    </span>
                    <span className="font-display text-[9px] uppercase font-bold text-purple bg-purple/10 px-2 py-0.5 rounded-full border border-purple/20">
                      Archive #{String((i % galleryImages.length) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
