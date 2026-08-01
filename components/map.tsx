"use client";

import { ArrowUpRight } from "@/components/icons";

export function LocationMap() {
  return (
    <section id="location" className="my-gap" data-reveal>
      <div className="grid gap-gap lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-brand overflow-hidden h-[400px] border-2 border-white/30 shadow-soft clay-card relative">
          <iframe
            src="https://maps.google.com/maps?q=13.1341876,77.5693927&t=&z=15&ie=UTF8&iwloc=near&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-brand"
            title="BMSIT Campus Map"
          />
        </div>
        
        <div className="flex flex-col justify-center rounded-brand bg-green p-box clay-card">
          <h2 className="font-display text-section uppercase tracking-tight text-ink font-black">BMSIT Campus</h2>
          <p className="mt-4 text-body-xl text-ink font-semibold leading-snug">
            Nirmaan 2026 is hosted offline at BMS Institute of Technology and Management, Yelahanka, Bengaluru.
          </p>
          <div className="mt-6 border-t border-ink/10 pt-5 text-ink/80 text-sm font-bold flex flex-col gap-2">
            <p>📍 Doddaballapur Main Road, Yelahanka, Bengaluru - 560064</p>
            <p>🗓 November 6-7, 2026</p>
            <a
              href="https://www.google.com/maps/place/BMS+Institute+of+Technology+and+Management/@13.133363,77.5648019,830m/data=!3m1!1e3!4m6!3m5!1s0x3bae18a5c54ece35:0x49c4c47a68a60b9c!8m2!3d13.1341876!4d77.5693927!16s%2Fm%2F03c38ys?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-pill bg-paper px-4 py-2.5 text-xs font-display uppercase font-black text-ink clay-card w-max border-2 border-white/30"
            >
              <span>Open in Google Maps</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
