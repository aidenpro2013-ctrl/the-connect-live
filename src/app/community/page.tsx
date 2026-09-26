"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, getMessages, saveMessages } from "@/lib/storage";

export default function CommunityPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/"); return; }
    setUser(u);
    const stored = getMessages("community");
    if (stored.length) setMessages(stored);
    else {
      const seed = [
        { id: 1, user: "Aiden Armstrong", text: "Welcome to THE Connect community chat! 👋", time: "earlier", mine: false },
        { id: 2, user: "Elizabeth", text: "Hey everyone! Excited to be here.", time: "earlier", mine: false },
      ];
      setMessages(seed);
      saveMessages("community", seed);
    }
  }, [router]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim() || !user) return;
    const msg = { id: Date.now(), user: user.full_name, text: input.trim(), time: "now", mine: true };
    const next = [...messages, msg];
    setMessages(next);
    saveMessages("community", next);
    setInput("");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16, height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
        <h1 style={{ fontSize: 18, margin: 0 }}>Community Chat</h1>
      </div>
      <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {messages.map((m) => (
            <div key={m.id} style={{ display: "flex", justifyContent: m.mine ? "flex-end" : "flex-start", marginBottom: 12 }}>
              <div style={{ maxWidth: "75%", borderRadius: 16, padding: "10px 14px", background: m.mine ? "#2a2f45" : "#f4f4f8", color: m.mine ? "#fff" : "#1a1f2e", fontSize: 14 }}>
                {!m.mine && <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2, opacity: 0.8 }}>{m.user}</div>}
                {m.text}
                <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6 }}>{m.time}</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: 12, borderTop: "1px solid #e8e8ee", display: "flex", gap: 8 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Say something…"
            style={{ flex: 1, height: 44, padding: "0 16px", borderRadius: 22, border: "1px solid #e8e8ee", fontSize: 14, outline: "none" }} />
          <button onClick={send} style={{ height: 44, padding: "0 20px", borderRadius: 22, background: "#2a2f45", color: "#fff", border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Send</button>
        </div>
      </div>
    </div>
  );
}
