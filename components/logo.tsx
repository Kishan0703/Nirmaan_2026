
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Nirmaan home" className={`inline-flex flex-col items-start justify-start text-left leading-none group ${className}`}>
      <span className="font-display text-[34px] font-black uppercase tracking-tighter text-ink leading-none transition-transform duration-300 group-hover:scale-[1.01]">
        NIRMAAN
      </span>
      <span className="mt-[2px] font-aeonik text-[13px] font-medium uppercase tracking-[0.16em] text-ink/60 leading-none">
        2026
      </span>
    </a>
  );
}
