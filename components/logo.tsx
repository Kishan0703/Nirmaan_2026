export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Nirmaan home" className={`block leading-none ${className}`}>
      <span className="block font-display text-[clamp(40px,3vw,58px)] font-black leading-[.78] tracking-normal">Nirmaan</span>
      <span className="ml-[4px] block text-[clamp(7px,.52vw,9px)] font-bold uppercase leading-none">Hackathon 2026</span>
    </a>
  );
}
