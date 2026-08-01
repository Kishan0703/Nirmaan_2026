import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="mt-gap pb-5" data-reveal>
      {/* Grid workspace container matching units.gr layout */}
      <div
        className="relative h-[320px] overflow-hidden rounded-brand border-2 border-white/40 shadow-soft bg-[#f2eae1] clay-card"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      >
        {/* Scattered grid block snap-elements */}
        <div className="absolute left-[20%] top-[10%] h-9 w-9 bg-purple border border-white/20 shadow-sm rounded-[4px]" />
        <div className="absolute left-[70%] top-[20%] h-9 w-9 bg-blue border border-white/20 shadow-sm rounded-[4px]" />
        <div className="absolute left-[50%] top-[40%] h-9 w-9 bg-yellow border border-white/20 shadow-sm rounded-[4px]" />
        <div className="absolute left-[33%] top-[45%] h-9 w-9 bg-orange border border-white/20 shadow-sm rounded-[4px]" />
        
        {/* Giant branding typography with snapped accents */}
        <div className="absolute bottom-6 left-8 z-10 select-none">
          <h2 className="font-display text-[clamp(60px,10vw,120px)] leading-none text-ink tracking-tighter font-black lowercase relative">
            nirmaan.
            {/* Embedded custom color spots overlapping letters */}
            <span className="absolute left-[16px] bottom-0 h-4 w-4 bg-red rotate-45 z-20 rounded-[2px]" />
            <span className="absolute left-[105px] bottom-[18px] h-6 w-2.5 bg-green z-20 rounded-[2px]" />
          </h2>
        </div>
      </div>

      {/* Footer bottom details & navigation links */}
      <div className="mt-6 flex flex-wrap justify-between gap-5 items-end">
        <div className="flex flex-col gap-1 text-left">
          <p className="font-display text-[14px] uppercase tracking-tight text-ink font-black">
            © 2026 NIRMAAN 2026
          </p>
          <p className="text-xs font-bold text-gray-700">
            Web design by Big Horror. Code by Lemonjelly
          </p>
        </div>

        {/* Outline Pill navigation items */}
        <div className="flex flex-wrap gap-2.5" aria-label="Footer links">
          <a
            href="#faq"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            FAQs
          </a>
          <Link
            href="/privacy"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="rounded-full border border-ink/40 px-5 py-2 text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Cookies Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
