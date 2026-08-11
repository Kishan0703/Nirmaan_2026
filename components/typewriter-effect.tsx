"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "24-HOUR NATIONAL INNOVATION HACKATHON",
  "₹1,00,000 TOTAL CASH PRIZE POOL",
  "SOFTWARE & HARDWARE TRACKS",
  "BMSIT BANGALORE • SEPT 18-19, 2026",
  "BUILD THE FUTURE OF HARDWARE & AI",
];

export function TypewriterEffect({ className = "" }: { className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = WORDS[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
          if (currentText === fullWord) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <div className={`inline-flex items-center font-display font-black tracking-widest text-yellow uppercase ${className}`}>
      <span className="drop-shadow-md text-yellow">{currentText}</span>
      <span className="ml-1 inline-block h-5 w-2 sm:h-6 sm:w-2.5 bg-green-light animate-pulse shadow-sm" />
    </div>
  );
}
