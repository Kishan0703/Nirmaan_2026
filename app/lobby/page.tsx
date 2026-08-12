"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCheck, ArrowLeft, ShieldCheck, User } from "lucide-react";

type MessageType = "QUERY" | "REPLY";

type ChatMessage = {
  id: string;
  sender: string;
  type: MessageType;
  text: string;
  time: string;
};

const PLAYER_NAME_KEY = "nirmaan_player_name";

export default function LobbyPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "Nirmaan Organizers",
      type: "REPLY",
      text: "Welcome to the NIRMAAN 2026 Community!",
      time: "10:00 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");
  const [sending, setSending] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Sync user profile name with localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem(PLAYER_NAME_KEY) || "";
    if (savedName) {
      setUserName(savedName);
    }
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
      }
    } catch (err) {
      console.error("Failed to sync messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    // Live synchronization every 3 seconds across all devices
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;

    setSending(true);
    const textToSend = inputText.trim();
    const senderToSend = (userName.trim() || localStorage.getItem(PLAYER_NAME_KEY) || "Builder").trim();

    if (senderToSend) {
      localStorage.setItem(PLAYER_NAME_KEY, senderToSend);
    }

    setInputText("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: senderToSend, text: textToSend }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-yellow selection:text-ink font-sans flex flex-col justify-between p-3 sm:p-6 relative overflow-x-hidden">
      
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl w-full mx-auto relative z-10 my-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-4 py-2 font-display text-xs uppercase font-black hover:bg-red transition-all clay-card shadow-sm active:translate-y-0.5"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ── Main Chat Box (Neon DB Connected) ── */}
        <div className="clay-card rounded-brand border-2 border-white/60 bg-paper shadow-2xl overflow-hidden flex flex-col h-[640px] sm:h-[700px] relative">
          
          {/* Header Bar */}
          <div className="bg-red text-white p-4 sm:p-5 border-b-2 border-ink/10 flex items-center justify-between z-20 shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-xl sm:text-3xl uppercase font-black tracking-tight leading-none text-white">
                NIRMAAN <span className="text-yellow">Community Lobby</span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white border border-white/30 font-display text-[10px] sm:text-xs uppercase font-black px-3 py-1 rounded-full shadow-xs">
                OFFICIAL FEED
              </span>
            </div>
          </div>

          {/* Chat Stream */}
          <div
            ref={chatScrollRef}
            className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-ink/20"
            style={{
              backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            {messages.map((msg) => {
              const isReply = msg.type === "REPLY";
              const isSelf = userName.trim().toLowerCase() === msg.sender.trim().toLowerCase();

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col w-full ${isSelf && !isReply ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[78%] rounded-[20px] p-4 shadow-md relative text-xs sm:text-sm border-2 ${
                      isReply
                        ? "bg-yellow text-ink rounded-tl-none border-ink/20"
                        : isSelf
                        ? "bg-blue text-white rounded-tr-none border-white/30"
                        : "bg-ink text-white rounded-tl-none border-white/20"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <span className="font-display text-xs uppercase font-black tracking-wide">
                        {msg.sender} {isSelf && "(You)"}
                      </span>

                      <span className="text-[9px] font-black opacity-75">
                        {msg.time}
                      </span>
                    </div>

                    {/* Content */}
                    <p className="font-sans font-bold leading-relaxed break-words whitespace-pre-wrap mt-1">
                      {msg.text}
                    </p>

                    {/* Checkmark */}
                    <div className="flex items-center justify-end gap-1 mt-2 text-[9px] font-black opacity-80">
                      <CheckCheck size={14} className={isReply ? "text-ink" : "text-yellow"} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Clean Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="bg-paper p-3 sm:p-4 border-t-2 border-ink/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 z-20"
          >
            {/* Alias Name Field */}
            <div className="flex items-center gap-1.5 bg-white rounded-full px-3.5 py-2 border-2 border-ink/15 shadow-xs shrink-0">
              <User size={14} className="text-ink/60" />
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => handleNameChange(e.target.value)}
                className="bg-transparent text-xs text-ink placeholder-gray-500 focus:outline-none w-28 sm:w-36 font-bold"
              />
            </div>

            {/* Message Input */}
            <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 border-2 border-ink/15 shadow-xs">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-ink placeholder-gray-500 focus:outline-none w-full font-bold"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={sending}
              className="bg-red hover:bg-ink text-white font-display text-xs uppercase font-black px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-1.5 transition-all active:translate-y-0.5 shrink-0 shadow-md clay-card disabled:opacity-50"
            >
              <span>{sending ? "Sending..." : "Send"}</span>
              <Send size={14} />
            </button>
          </form>

        </div>

        {/* Footer Credit */}
        <div className="mt-4 text-center font-display text-[10px] uppercase font-black text-ink/60 tracking-wider">
          NIRMAAN 2026 COMMUNITY LOBBY // BMSIT BANGALORE
        </div>
      </div>
    </div>
  );
}
