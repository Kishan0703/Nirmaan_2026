export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" aria-label="Units home" className={`block leading-none ${className}`}>
      <span className="block font-display text-[clamp(42px,3.2vw,62px)] font-black leading-[.78] tracking-normal">units.</span>
      <span className="ml-[4px] block text-[clamp(6px,.45vw,8px)] font-bold uppercase leading-none">Unique Student Homes</span>
    </a>
  );
}
