"use client";

import { values } from "@/lib/data";

export function Values() {
  return (
    <section className="flex gap-gap max-lg:flex-col" data-reveal>
      {values.map((item) => (
        <article key={item.title} className="flex-1 rounded-brand bg-blue px-box py-[50px] text-center clay-card text-white">
          <div className="mx-auto grid h-20 w-20 place-content-center rounded-full bg-yellow font-display text-[28px] leading-none text-ink clay-card font-black">{item.mark}</div>
          <h3 className="mt-[25px] font-display text-card uppercase text-ink font-black">{item.title}</h3>
          <p className="mt-4 text-body-xl text-ink font-bold leading-snug">{item.copy}</p>
        </article>
      ))}
    </section>
  );
}
