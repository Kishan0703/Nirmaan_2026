"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { values } from "@/lib/data";

function ValueCard({ item }: { item: (typeof values)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  // Automatically open when scrolled into view on mobile
  useEffect(() => {
    if (isInView && !hasAutoOpened) {
      setIsOpen(true);
      setHasAutoOpened(true);
    }
  }, [isInView, hasAutoOpened]);

  return (
    <article
      ref={cardRef}
      className="flex-1 rounded-brand bg-blue p-4 sm:p-5 lg:px-box lg:py-[50px] text-center clay-card text-white flex flex-col justify-between"
    >
      <div>
        {/* Header Button on Mobile */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex flex-col items-center focus:outline-none lg:pointer-events-none cursor-pointer lg:cursor-default"
        >
          <div className="flex items-center justify-between w-full lg:justify-center relative">
            <div className="mx-auto grid h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20 place-content-center rounded-full bg-yellow font-display text-lg sm:text-xl lg:text-[28px] leading-none text-ink clay-card font-black">
              {item.mark}
            </div>
            {/* Mobile Expand Indicator */}
            <span className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 text-ink font-bold text-xs px-2.5 py-1 rounded-full bg-yellow shadow-xs font-display uppercase font-black">
              {isOpen ? "Hide −" : "Read +"}
            </span>
          </div>

          <h3 className="mt-3 lg:mt-[25px] font-display text-base sm:text-card uppercase text-ink font-black leading-tight">
            {item.title}
          </h3>
        </button>

        {/* Copy: Auto-opens on scroll in view / manually toggleable on mobile (< lg), Always visible on Desktop (lg+) */}
        <div className={`${isOpen ? "block" : "hidden lg:block"} transition-all`}>
          <p className="mt-2.5 lg:mt-4 text-xs sm:text-body-xl text-ink font-bold leading-snug border-t border-white/20 pt-2.5 lg:border-none lg:pt-0">
            {item.copy}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Values() {
  return (
    <section className="flex gap-gap max-lg:flex-col" data-reveal>
      {values.map((item) => (
        <ValueCard key={item.title} item={item} />
      ))}
    </section>
  );
}
