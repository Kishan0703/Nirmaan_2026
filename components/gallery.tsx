"use client";

import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function GallerySection() {
  // Homepage preview displays the first 4 images cleanly without text captions
  const previewImages = galleryImages.slice(0, 4);

  return (
    <section id="gallery" className="my-gap" data-reveal>
      <div className="clay-card bg-purple p-box rounded-brand border-2 border-white/20 text-white">
        {/* Header with Navigation Link to full /gallery page */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4 mb-6">
          <div>
            <span className="font-display text-[10px] sm:text-xs uppercase tracking-widest text-yellow font-black">
              NIRMAAN ARCHIVES
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

        {/* Clean Image Grid — 5 Real Nirmaan Event Photos */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {galleryImages.map((img, i) => (
            <Link key={img.id || i} href="/gallery" className="group">
              <div className="clay-card bg-paper p-2 sm:p-2.5 rounded-[18px] text-ink border-2 border-white/40 shadow-md group-hover:scale-[1.03] transition-transform duration-300 overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-white/30">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover filter saturate-105 contrast-105 group-hover:scale-110 transition-transform duration-500"
                    sizes="(min-width: 1024px) 18vw, 40vw"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="font-display text-[9px] sm:text-[10px] uppercase font-black text-ink/70 tracking-wider">
                    {img.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
