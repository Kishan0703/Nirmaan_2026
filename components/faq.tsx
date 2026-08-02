"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/data";

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="my-gap" data-reveal>
      <div className="clay-card bg-paper p-box rounded-brand border-2 border-white/40">
        <h2 className="font-display text-section uppercase tracking-tight text-ink font-black">Frequently Asked Questions</h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="clay-card rounded-[18px] bg-white/60 border border-white/40 overflow-hidden">
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-display text-[16px] uppercase font-black text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span>{faq.question}</span>
                <span className="font-bold text-lg">{activeIndex === idx ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-xs text-gray-800 font-bold leading-relaxed border-t border-ink/5 pt-3 bg-white/20"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
