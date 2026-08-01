
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Nirmaan home" className={`flex flex-col items-center justify-center leading-none group ${className}`}>
      <span className="font-display text-[22px] font-black uppercase tracking-tight text-ink transition-transform duration-300 group-hover:scale-[1.02] text-center">
        NIRMAAN 2026
      </span>
    </a>
  );
}
