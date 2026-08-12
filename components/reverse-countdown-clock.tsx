"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EVENT_START_ISO } from "@/lib/config";

const typedLines = {
  left: ["build();", "commit ideas", "prototype fast", "debug the night"],
  right: ["ship demo", "mentor sync", "pitch ready", "final submit"]
};

const EVENT_START_TIME = new Date(EVENT_START_ISO).getTime();

function getRemainingSeconds() {
  return Math.max(0, Math.floor((EVENT_START_TIME - Date.now()) / 1000));
}

function splitTime(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hrs = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return { days, hrs, mins, secs };
}

function padTime(value: number) {
  return String(value).padStart(2, "0");
}

function TypingText({ words, align = "left" }: { words: string[]; align?: "left" | "right" }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[wordIndex];

  useEffect(() => {
    const isComplete = visibleChars === word.length;
    const isEmpty = visibleChars === 0;
    const delay = deleting ? 42 : isComplete ? 1050 : 72;

    const timer = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setVisibleChars((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, visibleChars, word.length, words.length]);

  return (
    <div className={`font-display text-2xl sm:text-3xl lg:text-[clamp(30px,3.5vw,64px)] uppercase leading-none text-ink tracking-tight text-center ${align === "right" ? "lg:text-right" : "lg:text-left"}`}>
      <span>{word.slice(0, visibleChars)}</span>
      <span className="typing-caret">|</span>
    </div>
  );
}

export function ReverseCountdownClock() {
  const clockRef = useRef<HTMLDivElement>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24, mass: 0.45 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24, mass: 0.45 });

  // Set real countdown value only on the client after hydration to avoid SSR mismatch
  useEffect(() => {
    setRemainingSeconds(getRemainingSeconds());
  }, []);

  useEffect(() => {
    if (isScrubbing) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds(getRemainingSeconds());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isScrubbing]);

  const time = splitTime(remainingSeconds);
  const secondAngle = time.secs * 6;
  const minuteAngle = (time.mins + time.secs / 60) * 6;
  const countdownUnits = [
    [padTime(time.days), "days"],
    [padTime(time.hrs), "hrs"],
    [padTime(time.mins), "mins"],
    [padTime(time.secs), "secs"]
  ];

  const updateTilt = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    tiltX.set(y * -10);
    tiltY.set(x * 10);
  };

  const scrubSeconds = (event: PointerEvent<HTMLDivElement>) => {
    const rect = clockRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const clockwiseAngle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const selectedSecs = Math.round(((clockwiseAngle + 360) % 360) / 6) % 60;

    setRemainingSeconds((current) => {
      const base = current - (current % 60);
      return base + selectedSecs;
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsScrubbing(true);
    updateTilt(event);
    scrubSeconds(event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    updateTilt(event);

    if (isScrubbing) {
      scrubSeconds(event);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsScrubbing(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const handlePointerLeave = () => {
    if (!isScrubbing) {
      tiltX.set(0);
      tiltY.set(0);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowLeft" || event.key === "ArrowDown" ? -1 : 1;

    setRemainingSeconds((current) => {
      const base = current - (current % 60);
      const nextSecs = (current % 60) + direction;
      return base + ((nextSecs + 60) % 60);
    });
  };

  return (
    <section id="countdown-clock" className="my-gap relative overflow-hidden bg-paper px-4 pb-6 pt-4 text-ink sm:px-6 lg:px-box lg:pb-16 lg:pt-8" data-reveal>
      <div className="relative z-10 grid items-center gap-6 lg:min-h-[570px] lg:gap-8 lg:grid-cols-[minmax(190px,.7fr)_minmax(320px,1fr)_minmax(190px,.7fr)]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="order-2 lg:order-1 hidden lg:flex items-center justify-center lg:justify-start min-h-[44px] lg:min-h-[88px] w-full px-2 overflow-hidden"
        >
          <TypingText words={typedLines.left} />
        </motion.div>

        <div className="order-1 flex flex-col items-center lg:order-2">
          {/* Clock + stopwatch hardware wrapper */}
          <div className="relative pt-[70px] lg:pt-[85px] pb-4">
            <motion.div
              ref={clockRef}
              role="slider"
              tabIndex={0}
              aria-label="Interactive countdown seconds dial"
              aria-valuemin={0}
              aria-valuemax={59}
              aria-valuenow={time.secs}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              onKeyDown={handleKeyDown}
              className="real-clock relative aspect-square w-[min(66vw,410px)] cursor-grab touch-none rounded-full border-[14px] border-white bg-[#f7f3ef] shadow-[0_22px_54px_rgba(0,0,0,.16),0_7px_0_rgba(255,255,255,.92),inset_0_0_0_3px_rgba(0,0,0,.08)] active:cursor-grabbing"
              initial={{ opacity: 0, scale: 0.86, y: 36 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              style={{ rotateX: tiltX, rotateY: tiltY }}
            >
              {/* ── Top Crown & Ring Assembly (12 o'clock) ── */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%-8px)] z-20 flex flex-col items-center pointer-events-none">
                {/* Metallic Ring / Bail */}
                <div
                  className="w-[66px] h-[54px] rounded-full border-[7px] border-[#b8b4ae] shadow-[inset_0_2px_3px_rgba(255,255,255,.7),0_4px_12px_rgba(0,0,0,.25)]"
                  style={{
                    background: 'linear-gradient(180deg, #dcd8d2 0%, #9e9a94 50%, #c4c0ba 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 54% at 50% 50%, transparent 56%, black 58%)',
                    maskImage: 'radial-gradient(ellipse 60% 54% at 50% 50%, transparent 56%, black 58%)'
                  }}
                />
                {/* Crown Button + Stem */}
                <div className="-mt-[38px] z-10 flex flex-col items-center">
                  {/* Ridged Crown Knob */}
                  <div
                    className="w-[28px] h-[26px] rounded-t-[5px] border border-[#8a867f]"
                    style={{
                      background: 'linear-gradient(90deg, #94908a 0%, #dedad4 25%, #ffffff 50%, #b5b1ab 75%, #85817b 100%)',
                      backgroundImage: 'repeating-linear-gradient(90deg, #7a7670 0px, #7a7670 2px, #e8e4de 2px, #e8e4de 4px)',
                      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.7), 0 3px 6px rgba(0,0,0,.3)'
                    }}
                  />
                  {/* Stem penetrating clock bezel */}
                  <div
                    className="w-[18px] h-[18px] border-x border-[#7a766f]"
                    style={{
                      background: 'linear-gradient(90deg, #8a867f 0%, #d4d0ca 45%, #ffffff 60%, #9e9a94 100%)',
                      boxShadow: '0 4px 6px rgba(0,0,0,.2)'
                    }}
                  />
                </div>
              </div>

              {/* ── Left Pusher (10 o'clock) ── */}
              <div className="absolute left-[25%] top-[6.7%] z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 -rotate-[30deg]">
                <div className="flex flex-col items-center -translate-y-[45%]">
                  {/* Button cap */}
                  <div
                    className="w-[22px] h-[14px] rounded-t-[4px] border border-[#8a867f]"
                    style={{
                      background: 'linear-gradient(90deg, #94908a 0%, #dedad4 30%, #ffffff 55%, #a8a49e 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 3px 6px rgba(0,0,0,.25)'
                    }}
                  />
                  {/* Pusher stem penetrating bezel */}
                  <div
                    className="w-[14px] h-[18px] border-x border-[#7a766f]"
                    style={{
                      background: 'linear-gradient(90deg, #8a867f 0%, #d4d0ca 40%, #ffffff 65%, #9e9a94 100%)'
                    }}
                  />
                </div>
              </div>

              {/* ── Right Pusher (2 o'clock) ── */}
              <div className="absolute left-[75%] top-[6.7%] z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 rotate-[30deg]">
                <div className="flex flex-col items-center -translate-y-[45%]">
                  {/* Button cap */}
                  <div
                    className="w-[22px] h-[14px] rounded-t-[4px] border border-[#8a867f]"
                    style={{
                      background: 'linear-gradient(90deg, #94908a 0%, #dedad4 30%, #ffffff 55%, #a8a49e 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 3px 6px rgba(0,0,0,.25)'
                    }}
                  />
                  {/* Pusher stem penetrating bezel */}
                  <div
                    className="w-[14px] h-[18px] border-x border-[#7a766f]"
                    style={{
                      background: 'linear-gradient(90deg, #8a867f 0%, #d4d0ca 40%, #ffffff 65%, #9e9a94 100%)'
                    }}
                  />
                </div>
              </div>
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="clock-tick absolute left-1/2 top-1/2 h-[15px] w-[5px] rounded-pill bg-ink"
                  style={{ transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(calc(-1 * min(28vw, 176px)))` }}
                />
              ))}
              <span className="clock-number left-1/2 top-[13%] -translate-x-1/2">12</span>
              <span className="clock-number right-[14%] top-1/2 -translate-y-1/2">3</span>
              <span className="clock-number bottom-[12%] left-1/2 -translate-x-1/2">6</span>
              <span className="clock-number left-[14%] top-1/2 -translate-y-1/2">9</span>
              <motion.span
                className="clock-hand-wrap absolute left-1/2 top-1/2"
                animate={{ rotate: minuteAngle }}
                transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="clock-hand clock-hand-minute bg-ink" />
              </motion.span>
              <motion.span
                className="clock-hand-wrap absolute left-1/2 top-1/2"
                animate={{ rotate: secondAngle }}
                transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="clock-hand clock-hand-second bg-red" />
              </motion.span>
              <span className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-ink bg-yellow shadow-[0_0_0_14px_rgba(255,255,255,.75),0_9px_20px_rgba(0,0,0,.15)]" />
            </motion.div>
          </div>

          <div className="mt-7 grid w-full max-w-[560px] grid-cols-4 gap-2 sm:gap-4">
            {countdownUnits.map(([value, label]) => (
              <div key={label} className="rounded-[18px] border border-ink/5 bg-white/78 px-2 py-4 text-center shadow-[inset_5px_5px_10px_rgba(0,0,0,.08),inset_-7px_-7px_12px_rgba(255,255,255,.9),0_12px_26px_rgba(0,0,0,.11)] sm:rounded-[26px] sm:py-5">
                <p className="font-display text-[clamp(26px,4.2vw,54px)] uppercase leading-none text-ink">{value}</p>
                <p className="mt-1 font-display text-[clamp(10px,1.25vw,18px)] uppercase leading-none text-ink">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="order-3 hidden lg:flex items-center justify-center lg:justify-end min-h-[44px] lg:min-h-[88px] w-full px-2 overflow-hidden"
        >
          <TypingText words={typedLines.right} align="right" />
        </motion.div>
      </div>
    </section>
  );
}
