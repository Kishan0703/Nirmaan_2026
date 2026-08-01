import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Nirmaan home" className={`flex flex-col items-center justify-center leading-none group ${className}`}>
      <div className="relative w-[110px] h-[78px] overflow-hidden mix-blend-multiply transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/assets/images/nirmaan_logo.jpg"
          alt="Nirmaan Logo"
          fill
          priority
          className="object-cover scale-[1.3] -translate-y-[8px]"
        />
      </div>
      <span className="mt-[2px] block text-[9px] font-display font-black uppercase tracking-[0.18em] text-ink text-center">
        Hackathon 2026
      </span>
    </a>
  );
}
