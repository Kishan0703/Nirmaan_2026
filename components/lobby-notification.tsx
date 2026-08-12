"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

type LobbyMessage = {
  id: string;
  sender: string;
  type: string;
  text: string;
  time: string;
};

const LAST_SEEN_MSG_KEY = "nirmaan_last_seen_msg_id";

export function LobbyNotificationListener() {
  const pathname = usePathname();
  const [unreadMessage, setUnreadMessage] = useState<LobbyMessage | null>(null);
  const [lastSeenId, setLastSeenId] = useState<string | null>(null);

  useEffect(() => {
    const savedLastSeen = localStorage.getItem(LAST_SEEN_MSG_KEY);
    if (savedLastSeen) {
      setLastSeenId(savedLastSeen);
    }
  }, []);

  const checkNewMessages = useCallback(async () => {
    // If currently viewing the lobby page, don't show popup notification
    if (pathname === "/lobby") {
      setUnreadMessage(null);
      return;
    }

    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
        const newest = data.messages[data.messages.length - 1] as LobbyMessage;
        const storedLastSeen = localStorage.getItem(LAST_SEEN_MSG_KEY);

        // If newest message ID is different from last seen, trigger notification
        if (storedLastSeen && newest.id !== storedLastSeen) {
          setUnreadMessage(newest);
        } else if (!storedLastSeen) {
          // Store initial baseline ID
          localStorage.setItem(LAST_SEEN_MSG_KEY, newest.id);
          setLastSeenId(newest.id);
        }
      }
    } catch (err) {
      console.error("Lobby notification check failed:", err);
    }
  }, [pathname]);

  useEffect(() => {
    checkNewMessages();
    const interval = setInterval(checkNewMessages, 4000);
    return () => clearInterval(interval);
  }, [checkNewMessages]);

  const dismissNotification = () => {
    if (unreadMessage) {
      localStorage.setItem(LAST_SEEN_MSG_KEY, unreadMessage.id);
      setLastSeenId(unreadMessage.id);
    }
    setUnreadMessage(null);
  };

  if (pathname === "/lobby" || !unreadMessage) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-yellow border-3 border-ink p-4 rounded-2xl shadow-[6px_6px_0px_0px_#18181b] text-ink flex flex-col gap-2.5"
      >
        <div className="flex items-center justify-between gap-2 border-b border-ink/20 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red animate-ping" />
            <span className="font-display text-xs uppercase font-black tracking-wide">
              NEW UNREAD LOBBY MESSAGE
            </span>
          </div>

          <button
            type="button"
            onClick={dismissNotification}
            className="p-1 rounded-md text-ink hover:bg-ink hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>

        <div>
          <span className="font-display text-xs font-black uppercase text-ink block">
            {unreadMessage.sender}:
          </span>
          <p className="font-sans font-bold text-xs text-ink/90 line-clamp-2 mt-0.5">
            &quot;{unreadMessage.text}&quot;
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Link
            href="/lobby"
            onClick={dismissNotification}
            className="inline-flex items-center gap-1.5 bg-ink text-white hover:bg-red border-2 border-ink px-3 py-1.5 rounded-xl font-display text-xs uppercase font-black shadow-[2px_2px_0px_0px_#18181b] transition-all active:translate-y-0.5"
          >
            <span>Open Lobby</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
