"use client";

import { useEffect, useState } from "react";
import { EVENT_START_ISO } from "@/lib/config";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, active: true });

  useEffect(() => {
    const targetDate = new Date(EVENT_START_ISO).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, active: false });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, active: true });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft.active) {
    return (
      <div className="clay-card px-5 py-3 rounded-[12px] bg-green text-white text-center font-display text-sm uppercase font-black">
        Event is Active!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center text-ink max-w-[340px]">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hrs" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" }
      ].map((item, idx) => (
        <div key={idx} className="clay-card bg-white/70 backdrop-blur-md rounded-[12px] p-2 flex flex-col justify-center border border-white/40">
          <span className="font-display text-[20px] leading-none font-black text-ink">{String(item.value).padStart(2, "0")}</span>
          <span className="text-[8px] uppercase font-bold text-gray-700 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
