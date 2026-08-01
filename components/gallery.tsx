"use client";

import Image from "next/image";
import { galleryImages } from "@/lib/data";

export function GallerySection() {
  return (
    <section id="gallery" className="my-gap" data-reveal>
      <div className="clay-card bg-purple p-box rounded-brand border-2 border-white/20 text-white">
        <span className="label bg-paper border-2 border-white/20 font-bold text-xs uppercase text-ink shadow-sm">Archive</span>
        <h2 className="mt-4 font-display text-section uppercase text-white font-black">Event Gallery</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="clay-card bg-paper p-3 rounded-[20px] text-ink border-2 border-white/40 shadow-sm flex flex-col gap-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-[14px] border border-white/30">
                <Image src={img.src} alt={img.alt} fill className="object-cover filter contrast-125 saturate-50" sizes="20vw" />
              </div>
              <p className="font-display text-xs uppercase font-black text-center mt-1">{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
