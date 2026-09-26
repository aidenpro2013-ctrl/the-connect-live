"use client";
import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/AppShell";

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("safety") || q.includes("report")) return "Safety is built in: real names only, report tools, and admin logs. Phone number sharing was removed.";
  if (q.includes("dating") || q.includes("match")) return "Create a profile, swipe on people, and match. Mutual likes unlock messaging.";
  if (q.includes("call") || q.includes("video")) return "Go to Calls to start a voice or video call with a full-screen UI and timer.";
  if (q.includes("how") && q.includes("work")) return "THE Connect is a community app for Seabrook/CCISD with messaging, dating, calls, AI, and more.";
  if (q.includes("aiden")) return "Aiden Armstrong created THE Connect. Check the About page!";
  return "I'm the THE Connect assistant. Ask about the app, safety, Dating, messaging, or calls!";
}

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm the THE Connect AI. Ask me anything about the app." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const v = input.trim();
    setMessages((m) => [...m, { role: "user", text: v }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply(v) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <AppShell title="AI Assistant">
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 52px)", margin: "-16px" }}>
        <div className="chat-messages" style={{ flex: 1 }}>
          {messages.map((m, i) => (
            <div key={i} className={`msg-row ${m.role === "user" ? "me" : "them"}`}>
              <div>
                <div className={`bubble ${m.role === "user" ? "me" : "them"}`}>{m.text}</div>
              </div>
            </div>
          ))}
          {typing && <div className="text-muted text-sm" style={{ padding: "0 8px" }}>Thinking…</div>}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-bar">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything…"
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
