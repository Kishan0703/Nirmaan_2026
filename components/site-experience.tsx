"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { galleryImages, livingCards, menuItems, unitFeatures, values } from "@/lib/data";
import { ArrowUpRight, CloseIcon, DownArrows, GlobeIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Rail({ onBook }: { onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 hidden h-dvh w-[calc(theme(spacing.rail)+25px)] flex-col px-[22px] py-[40px] lg:flex">
      <Logo className="mb-[27px]" />
      <nav aria-label="Main navigation" className="flex flex-col gap-[14px]">
        {menuItems.map((item) => (
          <a
            key={item.index}
            href={item.href}
            className={`${item.color} group flex h-[clamp(150px,9.48vw,182px)] flex-col justify-between rounded-[10px] px-[20px] py-[18px] text-ink transition-colors duration-500 hover:bg-paper hover:ring-1 hover:ring-ink`}
          >
            <span className="flex items-center justify-between font-aeonik text-rail">
              {item.index}
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="max-w-[120px] font-aeonik text-rail">{item.label}</span>
          </a>
        ))}
      </nav>
      <button
        type="button"
        onClick={onBook}
        className="mt-[14px] min-h-[86px] rounded-[10px] bg-purple px-4 text-center font-aeonik text-rail transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ink"
      >
        Book your Unit
      </button>
      <a href="#top" className="mt-[14px] flex h-[58px] items-center justify-between rounded-[10px] bg-ink px-[22px] text-white">
        <span className="font-aeonik text-rail">Ελληνικά</span>
        <GlobeIcon />
      </a>
      <div className="mt-[14px] flex h-[58px] items-center justify-around rounded-[10px] bg-ink text-white" aria-label="Social links">
        <a href="https://www.instagram.com/units.gr/" aria-label="Instagram" className="social-icon">ig</a>
        <a href="https://www.facebook.com/units.gr" aria-label="Facebook" className="social-icon">f</a>
        <a href="https://www.tiktok.com/@units.gr" aria-label="TikTok" className="social-icon">t</a>
      </div>
    </header>
  );
}

function MobileHeader({ open, setOpen, onBook }: { open: boolean; setOpen: (value: boolean) => void; onBook: () => void }) {
  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between bg-paper px-5 py-4 lg:hidden">
      <Logo />
      <div className="flex items-center gap-2">
        <button type="button" onClick={onBook} className="rounded-pill bg-purple px-4 py-3 text-sm font-bold text-ink">
          Book
        </button>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-content-center rounded-full bg-ink text-white"
        >
          <span className="hamburger" />
        </button>
      </div>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {menuItems.map((item) => (
          <a key={item.index} href={item.href} onClick={() => setOpen(false)} className={`${item.color} rounded-[20px] p-5 font-display text-3xl`}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

function CTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-pill bg-ink px-[34px] py-[17px] text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple"
    >
      <span className="relative z-10 text-body-xl">{children}</span>
      <ArrowUpRight className="relative z-10" />
      <span className="absolute inset-0 translate-y-full bg-purple transition-transform duration-500 group-hover:translate-y-0" />
    </button>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative grid min-h-[calc(100dvh-50px)] place-content-center overflow-hidden rounded-brand lg:min-h-[calc(100dvh-50px)]" data-reveal>
      <picture className="absolute inset-0">
        <source media="(max-width: 768px)" srcSet="/assets/images/Header_Homepage-mobile.jpg" />
        <Image src="/assets/images/Lounge-Area.jpg" alt="Students relaxing in a colorful shared lounge" fill priority className="object-cover" sizes="(min-width: 1024px) 88vw, 100vw" />
      </picture>
      <div className="absolute inset-0 bg-ink/20" />
      <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center text-white">
        <h1 className="max-w-[1140px] font-display text-hero">Home of the uniquely awesome.</h1>
        <p className="mt-[17px] max-w-[880px] text-center font-aeonik text-[clamp(24px,1.667vw,32px)] font-bold leading-[1.1]">
          All-inclusive student accommodation with everything you need to live, study and connect.
        </p>
        <div className="mt-[37px]">
          <CTA onClick={onBook}>Book your Unit</CTA>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="locations" className="grid gap-gap lg:grid-cols-[.7fr_1fr]" data-reveal>
      <div className="flex min-h-[520px] flex-col rounded-brand bg-yellow p-box">
        <span className="label">Locations</span>
        <div className="mt-auto">
          <h2 className="font-display text-section">Where your everyday<br />just works</h2>
          <p className="mt-[30px] max-w-[620px] text-body-xl">
            Wake up, step out, you&apos;re there. Campus, classes, nights out - all within easy reach. No time wasted. Because at Units, location isn&apos;t random. It&apos;s chosen to match your rhythm and make life work better.
          </p>
        </div>
        <div className="mt-[30px]">
          <p className="text-body-xl font-bold">Explore what&apos;s</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="rounded-brand bg-gray px-4 py-2 font-bold text-ink/50">Coming soon</span>
            <span className="font-bold">and</span>
            <span className="rounded-brand bg-orange px-4 py-2 font-bold">Move-in ready!</span>
          </div>
        </div>
      </div>
      <div className="relative min-h-[520px] overflow-hidden rounded-brand bg-green">
        <div className="map-grid absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-ink bg-yellow shadow-soft" />
        <div className="absolute bottom-8 left-8 rounded-[18px] bg-paper px-5 py-4 font-bold">
          Units Parkside<br /><span className="text-sm font-normal">37.9638028, 23.758556</span>
        </div>
      </div>
    </section>
  );
}

function Marquee({ color, textColor, items }: { color: string; textColor: string; items: string[] }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <section className={`my-gap overflow-hidden rounded-none ${color}`} aria-label={items.join(", ")}>
      <div className="flex w-max animate-marquee items-center gap-8 py-[22px]">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className={`flex items-center gap-8 font-display text-[20px] font-black leading-none ${textColor}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="h-[14px] w-[14px] rotate-45 bg-current" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Living() {
  const [active, setActive] = useState(0);
  const card = livingCards[active];
  return (
    <section id="living" className="my-gap overflow-hidden" data-reveal>
      <div className="flex min-h-[calc(100dvh-125px)] gap-gap max-lg:flex-col">
        <div className="flex w-full flex-col rounded-brand bg-red-light p-box lg:w-[29.688vw] lg:flex-none">
          <div className="flex items-start justify-between">
            <span className="label">All-Inclusive Living</span>
            <div className="home-lottie" aria-hidden="true" />
          </div>
          <div className="mt-auto max-lg:mt-10">
            <h2 className="font-display text-section">One Unit.<br />An entire universe.</h2>
            <p className="mt-[15px] text-body-xl font-bold">Your rent covers everything</p>
            <p className="mt-[15px] text-body-xl">
              Each unit is its own universe, combining spaces and services for effortless, all-inclusive student living. Everything is included in your rent. No hidden fees, no surprises. Fully equipped, design-led spaces that let your everyday flow, your way.
            </p>
          </div>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
            {livingCards.map((item) => (
              <article key={item.title} className="flex w-full flex-none flex-col gap-[15px] px-0 lg:w-[28.125vw] lg:pr-gap">
                <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-brand">
                  <Image src={item.image} alt={item.title} fill className={`object-cover ${item.speed === "fast" ? "animate-drift-up" : "animate-drift-down"}`} sizes="(min-width: 1024px) 28vw, 100vw" />
                </div>
                <div className="rounded-brand bg-yellow p-box">
                  <h3 className="font-display text-[clamp(24px,1.354vw,26px)] leading-[1.1]">{item.title}</h3>
                  <p className="mt-[10px] text-body-xl font-bold">{item.subtitle}</p>
                  <ul className="mt-5 list-none p-0">
                    {item.details.map((detail) => (
                      <li key={detail} className="text-body-lg">{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 inline-flex rounded-pill bg-green p-1">
            <button aria-label="Previous living card" className="grid h-12 w-12 place-content-center rounded-full hover:bg-white/30" onClick={() => setActive((active - 1 + livingCards.length) % livingCards.length)}>←</button>
            <button aria-label="Next living card" className="grid h-12 w-12 place-content-center rounded-full hover:bg-white/30" onClick={() => setActive((active + 1) % livingCards.length)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Units({ onBook }: { onBook: () => void }) {
  return (
    <section id="units" className="my-gap grid min-h-[830px] gap-gap lg:grid-cols-[35.938vw_1fr]" data-reveal>
      <div className="flex flex-col rounded-brand border border-ink p-box">
        <span className="label">Our Units</span>
        <div className="mt-auto max-lg:mt-[30px]">
          <h2 className="font-display text-section">Student living,<br />redefined.</h2>
          <p className="mt-10 text-body-xl">
            A new concept in student living - fully furnished, move-in ready units designed for comfort and ease. Units is more than just a place to stay; it&apos;s a place to belong. Join a vibrant community and experience student living like never before.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
            {unitFeatures.map(([label, icon]) => (
              <div key={label} className="flex items-center gap-[10px]">
                <Image src={icon} alt="" width={29} height={29} className="h-[29px] w-[29px]" />
                <span className="text-[16px] font-bold leading-[1.2]">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-[35px]">
            <CTA onClick={onBook}>Check out our Units</CTA>
          </div>
        </div>
      </div>
      <div className="relative min-h-[350px] overflow-hidden rounded-brand border border-ink">
        <div className="gallery-cloud">
          {[...galleryImages, ...galleryImages].map((src, index) => (
            <div key={`${src}-${index}`} className="gallery-tile">
              <Image src={src} alt="" fill className="object-cover" sizes="240px" />
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 z-10 h-[6.51vw] min-h-[90px] w-[7.031vw] min-w-[100px] -translate-x-1/2 -translate-y-1/2 border border-ink bg-paper" />
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="my-gap grid gap-gap lg:grid-cols-[.78fr_1fr_.78fr]" data-reveal>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand">
        <Image src="/assets/images/Community_1.jpg" alt="Resident in a bright community living space" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
      <div className="flex min-h-[430px] flex-col rounded-brand bg-red p-box">
        <span className="label">Community</span>
        <div className="mt-auto">
          <h2 className="font-display text-section">A shared way<br />of living</h2>
          <p className="mt-[30px] text-body-xl">
            At Units, community happens naturally. Through common spaces, shared moments, and experiences that bring people together - with the freedom to join in whenever and however you want.
          </p>
          <div className="mt-[30px]"><CTA>Join our community</CTA></div>
        </div>
      </div>
      <div className="relative min-h-[430px] overflow-hidden rounded-brand">
        <Image src="/assets/images/Community_2.jpg" alt="Shared student common room" fill className="object-cover" sizes="(min-width: 1024px) 25vw, 100vw" />
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-gap flex items-center justify-between rounded-none bg-blue px-box py-[30px] text-yellow" data-reveal>
      <DownArrows />
      <h2 className="text-center font-display text-section text-ink">{children}</h2>
      <DownArrows />
    </section>
  );
}

function Values() {
  return (
    <section className="flex gap-gap max-lg:flex-col" data-reveal>
      {values.map((item) => (
        <article key={item.title} className="flex-1 rounded-brand bg-blue px-box py-[clamp(30px,3.646vw,70px)] text-center">
          <Image src={item.image} alt="" width={180} height={180} className="mx-auto h-[100px] w-auto object-contain" />
          <h3 className="mt-[30px] font-display text-card">{item.title}</h3>
          <p className="mt-5 text-body-xl">{item.copy}</p>
        </article>
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="mt-gap pb-5" data-reveal>
      <div className="relative h-[430px] overflow-hidden">
        <div className="footer-grid absolute inset-0" />
        <Logo className="absolute bottom-[42px] left-[35px] scale-[2.5] origin-bottom-left max-lg:bottom-[15px] max-lg:left-[10px] max-lg:scale-[1.6]" />
      </div>
      <div className="mt-[30px] flex justify-between gap-5 max-lg:flex-col">
        <div>
          <p className="font-display text-[20px] font-black leading-[1.1]">© 2026 KORPO Development</p>
          <p className="mt-[10px] text-sm font-bold">Web design by Big Horror. Code by Lemonjelly</p>
        </div>
        <ul className="flex list-none flex-wrap gap-[10px] p-0">
          {["FAQs", "Privacy Policy", "Cookies Policy"].map((item) => (
            <li key={item}><a className="block rounded-pill border border-ink px-3 py-2 text-sm transition-colors hover:bg-ink hover:text-white" href="#top">{item}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const initialFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    initialFocusRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
    onClose();
  };

  return (
    <aside aria-hidden={!open} className={`modal-shell ${open ? "open" : ""}`}>
      <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close booking form" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="modal-panel">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-6 top-6 z-20 grid h-14 w-14 place-content-center rounded-full bg-ink text-white">
          <CloseIcon />
        </button>
        <div className="flex items-center justify-between bg-orange px-6 py-[30px] text-yellow">
          <DownArrows />
          <h2 id="booking-title" className="font-display text-section text-ink">Book your unit</h2>
          <DownArrows />
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 p-box">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field">First name<input ref={initialFocusRef} name="firstName" required /></label>
            <label className="field">Last name<input name="lastName" required /></label>
          </div>
          <label className="field">Email<input name="email" type="email" required /></label>
          <label className="field">Phone<input name="phone" type="tel" required /></label>
          <label className="field">Preferred unit<select name="unit" defaultValue="Boost Unit"><option>Kick Unit</option><option>Boost Unit</option><option>Flex Unit</option><option>Vibe Unit</option></select></label>
          <label className="field">Message<textarea name="message" rows={4} placeholder="Tell us when you want to move in." /></label>
          <button className="mt-2 rounded-pill bg-green px-8 py-4 text-body-xl font-bold text-ink transition-transform hover:-translate-y-0.5" type="submit">
            Submit request
          </button>
        </form>
      </div>
    </aside>
  );
}

export function SiteExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const marqueeOne = useMemo(() => ["Social areas", "Private kitchen & bathroom", "24/7 Security", "Fast and reliable maintenance", "Smart living"], []);
  const marqueeTwo = useMemo(() => ["Super-fast WiFi", "24/7 Hot water", "Electric bike stations", "Elevator access"], []);
  useReveal();

  return (
    <>
      <Rail onBook={() => setModalOpen(true)} />
      <MobileHeader open={menuOpen} setOpen={setMenuOpen} onBook={() => setModalOpen(true)} />
      <main className="relative ml-0 overflow-hidden px-0 pt-[75px] lg:ml-[calc(theme(spacing.rail)+25px)] lg:px-0 lg:pr-5 lg:pt-[30px]">
        <article className="home">
          <Hero onBook={() => setModalOpen(true)} />
          <Locations />
          <Marquee color="bg-red" textColor="text-yellow" items={marqueeOne} />
          <Living />
          <Marquee color="bg-blue" textColor="text-green-light" items={marqueeTwo} />
          <Units onBook={() => setModalOpen(true)} />
          <Community />
          <SectionTitle>What defines us</SectionTitle>
          <Values />
          <Footer />
        </article>
      </main>
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
