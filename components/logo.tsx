
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Nirmaan home"
      className={`inline-flex items-baseline leading-none group ${className}`}
    >
      <span className="font-display text-[26px] xl:text-[30px] font-black lowercase tracking-tighter text-ink leading-none transition-transform duration-300 group-hover:scale-[1.01]">
        nirmaan
      </span>
      <span className="font-display text-[26px] xl:text-[30px] font-black text-green-light leading-none transition-transform duration-300 group-hover:scale-[1.01]">
        .
      </span>
    </a>
  );
}
