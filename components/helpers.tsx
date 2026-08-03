"use client";

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

// Custom 3D Tilt Component
export function InteractiveTiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateXSpring = useSpring(useTransform(y, [-200, 200], [10, -10]), springConfig);
  const rotateYSpring = useSpring(useTransform(x, [-200, 200], [-10, 10]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

// Text marquee loop
export function Marquee({ color, textColor, items }: { color: string; textColor: string; items: string[] }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className={`my-gap overflow-hidden border-y border-ink/5 rounded-none ${color}`} aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee items-center gap-6 sm:gap-8 py-3.5 sm:py-[18px]">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className={`flex items-center gap-6 sm:gap-8 font-display text-sm sm:text-[16px] uppercase font-black leading-none ${textColor}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="h-[8px] w-[8px] sm:h-[10px] sm:w-[10px] rotate-45 bg-current opacity-70" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Section Title Separator
import { DownArrows } from "@/components/icons";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-gap flex items-center justify-between border-y border-ink/5 bg-blue px-3.5 sm:px-box py-3.5 sm:py-[22px] text-yellow" data-reveal>
      <DownArrows />
      <h2 className="text-center font-display text-lg sm:text-[26px] uppercase tracking-tight text-ink font-black">{children}</h2>
      <DownArrows />
    </section>
  );
}

// Social Icons SVGs
export function GithubIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function XIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

export function InstagramIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
