"use client";

import { useEffect, useState, useRef } from "react";
import AppShell from "@/components/AppShell";
import { getUser, getMessages, saveMessages } from "@/lib/storage";

const CONTACTS = [
  { id: "elizabeth", name: "Elizabeth", status: "Online", color: "#ff6b6b" },
  { id: "jordan", name: "Jordan Lee", status: "Active now", color: "#4ecdc4" },
  { id: "sam", name: "Sam Rivera", status: "Away", color: "#ffe66d" },
  { id: "morgan", name: "Morgan", status: "Offline", color: "#95a5a6" },
];

export default function MessagesPage() {
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    if (!active) return;
    const stored = getMessages(`dm_${active}`);
    if (stored.length) {
      setMessages(stored);
    } else {
      const name = CONTACTS.find((c) => c.id === active)?.name;
      setMessages([
        { id: 1, text: `Hey! Thanks for connecting on THE Connect 👋`, time: "Yesterday", mine: false },
        { id: 2, text: "How are you liking the app so far?", time: "Yesterday", mine: false },
      ]);
    }
  }, [active]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim() || !active || !user) return;
    const msg = {
      id: Date.now(),
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      mine: true,
    };
    const next = [...messages, msg];
    setMessages(next);
    saveMessages(`dm_${active}`, next);
    setInput("");
  };

  const activeContact = CONTACTS.find((c) => c.id === active);

  return (
    <AppShell title="Messages">
      <div style={{ display: "flex", height: "calc(100vh - 52px)", margin: "-16px" }}>
        {/* Contact list — Discord + Messages hybrid */}
        <div className="contact-list hide-mobile" style={{ display: active ? undefined : "flex" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
            <input className="input" placeholder="Search" style={{ height: 36, fontSize: 14 }} />
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {CONTACTS.map((c) => (
              <button
                key={c.id}
                className={`contact-item ${active === c.id ? "active" : ""}`}
                onClick={() => setActive(c.id)}
              >
                <div className="avatar" style={{ background: c.color }}>{c.name[0]}</div>
                <div className="flex-1 truncate">
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted">{c.status}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area — Apple Messages style */}
        <div className="chat-container flex-1">
          {!active ? (
            <div className="flex-1 flex items-center justify-center text-muted" style={{ flexDirection: "column", gap: 8 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p style={{ fontSize: 15 }}>Select a conversation</p>
              {/* Mobile: show contacts */}
              <div className="flex flex-col gap-2" style={{ marginTop: 16, width: "100%", maxWidth: 280, padding: 16 }}>
                {CONTACTS.map((c) => (
                  <button key={c.id} className="contact-item card" onClick={() => setActive(c.id)} style={{ borderRadius: 12 }}>
                    <div className="avatar" style={{ background: c.color }}>{c.name[0]}</div>
                    <div className="font-semibold text-sm">{c.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="main-header" style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  className="btn-ghost"
                  onClick={() => setActive(null)}
                  style={{ display: "none", padding: 4 }}
                  id="back-btn"
                >
                  ←
                </button>
                <div className="avatar" style={{ background: activeContact?.color, width: 32, height: 32, fontSize: 13 }}>
                  {activeContact?.name[0]}
                </div>
                <div>
                  <div className="font-semibold" style={{ fontSize: 15 }}>{activeContact?.name}</div>
                  <div className="text-xs text-muted">{activeContact?.status}</div>
                </div>
              </div>

              <div className="chat-messages">
                {messages.map((m) => (
                  <div key={m.id} className={`msg-row ${m.mine ? "me" : "them"}`}>
                    <div>
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
                  placeholder="iMessage"
                  autoFocus
                />
                <button className="send-btn" onClick={send} disabled={!input.trim()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-list { display: ${active ? "none" : "flex"} !important; width: 100%; }
          #back-btn { display: flex !important; }
        }
      `}</style>
    </AppShell>
  );
}
