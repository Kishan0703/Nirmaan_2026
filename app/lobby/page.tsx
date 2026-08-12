"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";

type MessageType = "ANNOUNCEMENT" | "QUERY" | "REPLY";

type ChatMessage = {
  id: string;
  sender: string;
  type: MessageType | string;
  text: string;
  time: string;
};

const PLAYER_NAME_KEY = "nirmaan_player_name";
const LAST_SEEN_MSG_KEY = "nirmaan_last_seen_msg_id";

export default function LobbyPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "ANNOUNCEMENT" | "QUERY">("ALL");
  const [sending, setSending] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Sync user profile name
  useEffect(() => {
    const savedName = localStorage.getItem(PLAYER_NAME_KEY) || "";
    if (savedName) setUserName(savedName);
  }, []);

  const handleNameChange = (val: string) => {
    setUserName(val);
    if (val.trim()) {
      localStorage.setItem(PLAYER_NAME_KEY, val.trim());
    }
  };

  // Fetch messages from live server database
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        if (data.messages.length > 0) {
          const newest = data.messages[data.messages.length - 1];
          localStorage.setItem(LAST_SEEN_MSG_KEY, newest.id);
        }
      }
    } catch (err) {
      console.error("Failed to sync lobby messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, activeFilter]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;

    setSending(true);
    const textToSend = inputText.trim();
    const senderToSend = (userName.trim() || localStorage.getItem(PLAYER_NAME_KEY) || "Hacker").trim();

    if (senderToSend) {
      localStorage.setItem(PLAYER_NAME_KEY, senderToSend);
    }

    setInputText("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: senderToSend,
          text: textToSend,
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        if (data.messages.length > 0) {
          localStorage.setItem(LAST_SEEN_MSG_KEY, data.messages[data.messages.length - 1].id);
        }
      }
    } catch (err) {
      console.error("Error sending lobby message:", err);
    } finally {
      setSending(false);
    }
  };

  // Filter messages based on active filter
  const filteredMessages = messages.filter((msg) => {
    if (activeFilter === "ANNOUNCEMENT") {
      return msg.type === "ANNOUNCEMENT" || msg.type === "REPLY";
    }
    if (activeFilter === "QUERY") {
      return msg.type === "QUERY";
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col justify-between p-3 sm:p-6 relative overflow-x-hidden">
      
      {/* Background Dots */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#18181b 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-4xl w-full mx-auto relative z-10 my-auto flex flex-col gap-4">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 font-display text-xs uppercase font-black hover:bg-red transition-all shadow-[3px_3px_0px_0px_#18181b] active:translate-y-0.5 border-2 border-ink"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ── LOBBY PURPOSE & USAGE GUIDE BOX ── */}
        <div className="rounded-2xl border-3 border-ink bg-yellow p-4 sm:p-5 shadow-[5px_5px_0px_0px_#18181b] text-ink">
          <h2 className="font-display text-base sm:text-lg font-black uppercase tracking-tight mb-1">
            HOW THE LOBBY WORKS
          </h2>
          <p className="font-sans text-xs sm:text-sm font-bold leading-relaxed">
            Welcome to the Nirmaan Live Community Lobby! This central broadcast room connects event participants and organizing roster members in real-time.
          </p>
          <div className="mt-2.5 flex flex-col sm:flex-row gap-2 sm:gap-6 font-sans text-xs font-bold text-ink/90 pt-2 border-t-2 border-ink/20">
            <div>
              <span className="font-black underline uppercase">Organizers & Roster Members:</span> Authenticated roster members broadcast official event announcements and answers.
            </div>
            <div>
              <span className="font-black underline uppercase">Participant Teams:</span> Ask hackathon questions, clarify schedule/rules, or request support directly from the organizing team.
            </div>
          </div>
        </div>

        {/* ── MAIN LOBBY CONTAINER ── */}
        <div className="rounded-3xl border-4 border-ink bg-white shadow-[8px_8px_0px_0px_#18181b] overflow-hidden flex flex-col h-[640px] sm:h-[700px] relative">
          
          {/* Header & Filter Tabs */}
          <div className="bg-red text-white p-4 sm:p-5 border-b-4 border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-20 shrink-0">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl uppercase font-black tracking-tight text-white">
                NIRMAAN COMMUNITY LOBBY
              </h1>
              <p className="font-display text-xs uppercase font-bold text-white/90">
                Official Announcements & Live Participant Q&A
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-ink/90 p-1.5 rounded-2xl border-2 border-white/40 shadow-inner self-stretch sm:self-auto justify-center">
              <button
                type="button"
                onClick={() => setActiveFilter("ALL")}
                className={`px-3 py-1 rounded-xl font-display text-xs font-black uppercase transition-all ${
                  activeFilter === "ALL"
                    ? "bg-yellow text-ink border-2 border-ink shadow-[2px_2px_0px_0px_#18181b]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                ALL
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("ANNOUNCEMENT")}
                className={`px-3 py-1 rounded-xl font-display text-xs font-black uppercase transition-all ${
                  activeFilter === "ANNOUNCEMENT"
                    ? "bg-yellow text-ink border-2 border-ink shadow-[2px_2px_0px_0px_#18181b]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                ANNOUNCEMENTS
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter("QUERY")}
                className={`px-3 py-1 rounded-xl font-display text-xs font-black uppercase transition-all ${
                  activeFilter === "QUERY"
                    ? "bg-yellow text-ink border-2 border-ink shadow-[2px_2px_0px_0px_#18181b]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Q&A
              </button>
            </div>
          </div>

          {/* ── CHAT STREAM ── */}
          <div
            ref={chatScrollRef}
            className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 relative z-10 bg-[#fbf9f4]"
            style={{
              backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 border-4 border-dashed border-ink/20 rounded-3xl bg-white">
                <h3 className="font-display text-lg uppercase font-black text-ink">
                  No Messages In This Stream Yet
                </h3>
                <p className="font-sans text-xs font-bold text-ink/70 max-w-sm mt-1">
                  Post a message or question below to start the conversation!
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isAnnouncement = msg.type === "ANNOUNCEMENT";
                const isQuery = msg.type === "QUERY";
                const isSelf = userName.trim().toLowerCase() === msg.sender.trim().toLowerCase();

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex flex-col w-full ${
                      isAnnouncement
                        ? "items-center my-2"
                        : isQuery
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    {/* ANNOUNCEMENT CARD (Center) */}
                    {isAnnouncement ? (
                      <div className="w-full max-w-2xl bg-yellow border-4 border-ink rounded-3xl p-4 sm:p-5 shadow-[5px_5px_0px_0px_#18181b] relative text-ink">
                        <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b-2 border-ink">
                          <span className="font-display text-xs uppercase font-black tracking-wide">
                            ANNOUNCEMENT FROM {msg.sender}
                          </span>
                          <span className="font-display text-[10px] font-black bg-white px-2 py-0.5 rounded-full border border-ink">
                            {msg.time}
                          </span>
                        </div>
                        <p className="font-sans font-extrabold text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    ) : (
                      /* QUERY (Right side) / REPLY (Left side) CARD */
                      <div
                        className={`max-w-[90%] sm:max-w-[80%] rounded-2xl border-3 border-ink p-4 shadow-[4px_4px_0px_0px_#18181b] relative text-xs sm:text-sm ${
                          isQuery
                            ? "bg-blue text-white rounded-tr-none"
                            : "bg-purple text-white rounded-tl-none"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-1.5 pb-1.5 border-b border-ink/20">
                          <span className="font-display text-xs uppercase font-black">
                            {msg.sender} {isSelf && "(You)"}
                          </span>
                          <span className="text-[9px] font-black opacity-80">
                            {msg.time}
                          </span>
                        </div>
                        <p className="font-sans font-bold leading-relaxed break-words whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          {/* ── COMPOSER BAR ── */}
          <div className="p-3 sm:p-5 bg-yellow border-t-4 border-ink flex flex-col gap-3 shrink-0 relative z-20">
            
            {/* User Profile Name Input */}
            <div className="flex items-center gap-2 bg-white border-3 border-ink rounded-2xl px-3 py-1.5 shadow-[3px_3px_0px_0px_#18181b]">
              <span className="font-display text-xs uppercase font-black text-ink shrink-0">
                YOUR NAME:
              </span>
              <input
                type="text"
                value={userName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter your name (e.g. Participant Name / Roster Member Name)"
                className="w-full bg-transparent font-sans font-bold text-xs text-ink outline-none placeholder:text-ink/40"
              />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message or question here..."
                className="w-full bg-white text-ink font-sans font-bold text-xs sm:text-sm px-4 py-3 border-3 border-ink rounded-2xl outline-none placeholder:text-ink/40 shadow-[4px_4px_0px_0px_#18181b] focus:bg-amber-50 transition-all"
              />

              <button
                type="submit"
                disabled={sending || !inputText.trim()}
                className={`px-5 py-3 rounded-2xl border-3 border-ink font-display text-xs sm:text-sm uppercase font-black flex items-center gap-2 shadow-[4px_4px_0px_0px_#18181b] transition-all shrink-0 active:translate-y-0.5 bg-blue text-white hover:bg-green ${
                  sending || !inputText.trim() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span>Send</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
