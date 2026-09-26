"use client";

import { useEffect, useState, useRef } from "react";
import AppShell from "@/components/AppShell";
import { getUser, getMessages, saveMessages } from "@/lib/storage";

export default function CommunityPage() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    const stored = getMessages("community");
    if (stored.length) {
      setMessages(stored);
    } else {
      const seed = [
        { id: 1, user: "Aiden Armstrong", text: "Welcome to THE Connect community! 👋 This is our main channel.", time: "Earlier", mine: false },
        { id: 2, user: "Elizabeth", text: "Hey everyone! Excited to be here.", time: "Earlier", mine: false },
        { id: 3, user: "Jordan Lee", text: "Anyone going to the game this weekend?", time: "Earlier", mine: false },
      ];
      setMessages(seed);
      saveMessages("community", seed);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !user) return;
    const msg = {
      id: Date.now(),
      user: user.full_name,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      mine: true,
    };
    const next = [...messages, msg];
    setMessages(next);
    saveMessages("community", next);
    setInput("");
  };

  return (
    <AppShell title="# general">
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 52px)", margin: "-16px" }}>
        <div className="chat-messages" style={{ flex: 1 }}>
          {messages.map((m) => (
            <div key={m.id} className={`msg-row ${m.mine ? "me" : "them"}`}>
              <div>
                {!m.mine && (
                  <div className="text-xs font-semibold" style={{ marginBottom: 2, paddingLeft: 4, color: "var(--accent)" }}>
                    {m.user}
                  </div>
                )}
                <div className={`bubble ${m.mine ? "me" : "them"}`}>{m.text}</div>
                <div className="msg-time">{m.time}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-bar">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Message #general"
          />
          <button className="send-btn" onClick={send} disabled={!input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
