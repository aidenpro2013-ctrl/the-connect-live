"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, getMessages, saveMessages } from "@/lib/storage";

const CONTACTS = [
  { id: "elizabeth", name: "Elizabeth" },
  { id: "jordan", name: "Jordan Lee" },
  { id: "sam", name: "Sam Rivera" },
  { id: "morgan", name: "Morgan" },
];

export default function MessagesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/"); return; }
    setUser(u);
  }, [router]);

  useEffect(() => {
    if (!active) return;
    const stored = getMessages(`dm_${active}`);
    setMessages(stored.length ? stored : [{ id: 1, user: CONTACTS.find((c) => c.id === active)?.name, text: "Hey! Thanks for connecting on THE Connect 👋", time: "earlier", mine: false }]);
  }, [active]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim() || !active || !user) return;
    const msg = { id: Date.now(), user: user.full_name, text: input.trim(), time: "now", mine: true };
    const next = [...messages, msg];
    setMessages(next);
    saveMessages(`dm_${active}`, next);
    setInput("");
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16, height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
        <h1 style={{ fontSize: 18, margin: 0 }}>Messages</h1>
      </div>
      <div style={{ flex: 1, display: "flex", gap: 12, minHeight: 0 }}>
        <div style={{ width: 200, background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, overflow: "auto" }}>
          {CONTACTS.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{ width: "100%", display: "flex", gap: 10, alignItems: "center", padding: 12, border: "none", background: active === c.id ? "#f4f4f8" : "transparent", cursor: "pointer", textAlign: "left" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2a2f45", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>{c.name[0]}</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
            </button>
          ))}
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {!active ? <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontSize: 14 }}>Select a conversation</div> : (
            <>
              <div style={{ padding: 12, borderBottom: "1px solid #e8e8ee", fontWeight: 600, fontSize: 14 }}>{CONTACTS.find((c) => c.id === active)?.name}</div>
              <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                {messages.map((m) => (
                  <div key={m.id} style={{ display: "flex", justifyContent: m.mine ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    <div style={{ maxWidth: "75%", borderRadius: 16, padding: "10px 14px", background: m.mine ? "#2a2f45" : "#f4f4f8", color: m.mine ? "#fff" : "#1a1f2e", fontSize: 14 }}>
                      {m.text}
                      <div style={{ fontSize: 10, marginTop: 4, opacity: 0.6 }}>{m.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div style={{ padding: 12, borderTop: "1px solid #e8e8ee", display: "flex", gap: 8 }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message…"
                  style={{ flex: 1, height: 44, padding: "0 16px", borderRadius: 22, border: "1px solid #e8e8ee", fontSize: 14, outline: "none" }} />
                <button onClick={send} style={{ height: 44, padding: "0 20px", borderRadius: 22, background: "#2a2f45", color: "#fff", border: "none", fontWeight: 500, cursor: "pointer" }}>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
