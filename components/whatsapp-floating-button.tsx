"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Copy, Check, Users, Sparkles } from "lucide-react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/GVtFW37FcZPIkhPDNvielk?mode=gi_t";
const QR_CODE_SRC = "/assets/images/whatsapp-qr.png";

export function WhatsappFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(WHATSAPP_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add ripple effect
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);

    setIsOpen(true);
  };

  const handleCollapse = () => {
    setIsCollapsed(true);
  };

  const handleExpand = () => {
    setIsCollapsed(false);
  };

  return (
    <>
      {/* ── COMMUNITY PROMPT FLOATING CTA ── */}
      <AnimatePresence>
        {isCollapsed ? (
          <motion.button
            key="community-mini"
            type="button"
            onClick={handleExpand}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-gradient-to-br from-[#25D366] to-[#075E54] text-white shadow-[4px_4px_0px_0px_#18181b] sm:bottom-6 sm:right-6"
            aria-label="Show Idea Lab community prompt"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
            <svg className="relative z-10 h-7 w-7 fill-current drop-shadow-md" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.817 0-3.596-.484-5.163-1.402l-.37-.218-3.836 1.006 1.024-3.74-.243-.387c-1.007-1.604-1.54-3.468-1.54-5.385 0-5.592 4.549-10.141 10.14-10.141 2.709 0 5.257 1.056 7.173 2.973 1.916 1.917 2.971 4.465 2.971 7.172 0 5.594-4.548 10.142-10.139 10.142M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.195 1.613 6.012L0 24l6.165-1.618C7.94 23.398 9.949 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            key="community-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="fixed inset-x-4 bottom-4 z-50 ml-auto w-auto max-w-[380px] rounded-xl border-2 border-ink bg-paper text-ink shadow-[6px_6px_0px_0px_#18181b] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]"
          >
            <div className="h-1.5 rounded-t-[10px] bg-gradient-to-r from-[#25D366] via-yellow to-blue" />
            <button
              type="button"
              onClick={handleCollapse}
              className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink/70 transition-colors hover:bg-white hover:text-ink"
              aria-label="Collapse community prompt"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-3 p-4 pr-11 sm:p-5 sm:pr-12">
              <div className="space-y-1.5">
                <p className="font-display text-[10px] font-black uppercase tracking-widest text-[#128C7E]">
                  Idea Lab Community
                </p>
                <p className="text-base font-black leading-snug text-ink">
                  Don&apos;t have an idea yet?
                </p>
                <p className="text-sm font-semibold leading-relaxed text-ink/75">
                  Join our community. Let&apos;s brainstorm, find teammates, and build something together.
                </p>
              </div>

              <button
                type="button"
                onClick={handleButtonClick}
                aria-label="Open Idea Lab WhatsApp Community"
                className="relative flex w-fit items-center gap-2 overflow-hidden rounded-lg border-2 border-ink bg-[#25D366] px-3.5 py-2 font-display text-xs font-black uppercase text-ink shadow-[3px_3px_0px_0px_#18181b] transition-transform hover:-translate-y-0.5"
              >
                {ripples.map((r) => (
                  <motion.span
                    key={r.id}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ top: r.y, left: r.x }}
                    className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 pointer-events-none"
                  />
                ))}

                <svg className="relative h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.817 0-3.596-.484-5.163-1.402l-.37-.218-3.836 1.006 1.024-3.74-.243-.387c-1.007-1.604-1.54-3.468-1.54-5.385 0-5.592 4.549-10.141 10.14-10.141 2.709 0 5.257 1.056 7.173 2.973 1.916 1.917 2.971 4.465 2.971 7.172 0 5.594-4.548 10.142-10.139 10.142M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.195 1.613 6.012L0 24l6.165-1.618C7.94 23.398 9.949 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Join WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── POP-UP MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#18181b] to-[#09090b] text-white rounded-brand border-2 border-white/20 p-6 sm:p-7 shadow-2xl z-10 clay-card overflow-hidden"
            >
              {/* Top Liquid Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#0055ff]" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header Icon & Title */}
              <div className="flex flex-col items-center text-center mt-1 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-3 shadow-inner">
                  <Users className="h-6 w-6" />
                </div>
                <span className="font-display text-[10px] uppercase font-black tracking-widest text-[#25D366]">
                  WHATSAPP COMMUNITY
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-tight mt-0.5">
                  Nirmaan 2026 - Idea Lab
                </h3>
              </div>

              {/* Tagline / Message */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5 text-center">
                <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                  &ldquo;Don’t have an idea yet? Join our community. Let’s brainstorm, find teammates, and build something together.&rdquo;
                </p>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative p-3 bg-white rounded-2xl shadow-xl border-2 border-white/20 group">
                  <div className="relative h-48 w-48 sm:h-52 sm:w-52 rounded-lg overflow-hidden">
                    <Image
                      src={QR_CODE_SRC}
                      alt="Nirmaan 2026 Idea Lab WhatsApp QR Code"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 font-display font-semibold mt-2.5 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-yellow" />
                  Scan with your phone camera or WhatsApp
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-ink font-display uppercase font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Join WhatsApp Group
                  <ExternalLink className="h-4 w-4" />
                </a>

                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-display uppercase font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#25D366]" />
                      <span className="text-[#25D366]">Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-gray-300" />
                      <span>Copy Invite Link</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
