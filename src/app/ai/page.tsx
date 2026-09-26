"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("safety") || q.includes("report")) return "Safety is built in: real names only, report tools, flagged accounts, and admin activity logs.";
  if (q.includes("dating") || q.includes("match")) return "Dating lets you create a profile, swipe on members, and match. Mutual likes unlock messaging.";
  if (q.includes("call") || q.includes("video")) return "Go to Calls to start a voice or video call with a full-screen call UI and timer.";
  if (q.includes("how") && q.includes("work")) return "THE Connect is a community platform for Seabrook/CCISD with messaging, dating, calls, AI, and admin tools. Phone number sharing was removed.";
  if (q.includes("aiden")) return "Aiden Armstrong created THE Connect. See the About page for more!";
  return "I'm the THE Connect assistant. Ask about the app, safety, Dating, messaging, or calls!";
}

export default function AIPage() {
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hi! I'm the THE Connect AI assistant. Ask me anything about the app!" }]);
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
    setTimeout(() => { setMessages((m) => [...m, { role: "assistant", text: reply(v) }]); setTyping(false); }, 700);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16, height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
        <h1 style={{ fontSize: 18, margin: 0 }}>AI Assistant</h1>
      </div>
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
              <div style={{ maxWidth: "85%", borderRadius: 16, padding: "10px 14px", background: m.role === "user" ? "#2a2f45" : "#f4f4f8", color: m.role === "user" ? "#fff" : "#1a1f2e", fontSize: 14, lineHeight: 1.5 }}>{m.text}</div>
            </div>
          ))}
          {typing && <div style={{ fontSize: 13, color: "#6b7280" }}>Thinking…</div>}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: 12, borderTop: "1px solid #e8e8ee", display: "flex", gap: 8 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask anything…"
            style={{ flex: 1, height: 44, padding: "0 16px", borderRadius: 22, border: "1px solid #e8e8ee", fontSize: 14, outline: "none" }} />
          <button onClick={send} style={{ height: 44, padding: "0 20px", borderRadius: 22, background: "#2a2f45", color: "#fff", border: "none", fontWeight: 500, cursor: "pointer" }}>Send</button>
        </div>
      </div>
    </div>
  );
}
