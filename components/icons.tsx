export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11.25 4.5H4.5V2.8h9.65v9.65h-1.7V5.7L4.95 13.2l-1.2-1.2 7.5-7.5Z" fill="currentColor" />
    </svg>
  );
}

export function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18M12 2.5c2.7 2.6 4 5.8 4 9.5s-1.3 6.9-4 9.5c-2.7-2.6-4-5.8-4-9.5s1.3-6.9 4-9.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <path d="M1 1l44 44M45 1 1 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function DownArrows() {
  return (
    <svg width="58" height="42" viewBox="0 0 58 42" fill="none" aria-hidden="true">
      <path className="animate-nudge-right" d="M13.8 1.9v37" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path className="animate-nudge-right" d="m25.7 25.1-12 14.8-12-14.8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path className="animate-nudge-left" d="M47 6.5v28" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      <path className="animate-nudge-left" d="m56 24.1-9 11.2-9-11.2" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
