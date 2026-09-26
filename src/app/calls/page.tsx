"use client";
import { useState } from "react";
import Link from "next/link";

const members = [
  { id: 1, name: "Elizabeth", role: "user" },
  { id: 2, name: "Jordan Lee", role: "team_member" },
  { id: 3, name: "Sam Rivera", role: "user" },
  { id: 4, name: "Morgan", role: "user" },
];

export default function CallsPage() {
  const [active, setActive] = useState<{ name: string; type: string } | null>(null);
  const [seconds, setSeconds] = useState(0);

  const start = (name: string, type: string) => {
    setActive({ name, type });
    setSeconds(0);
    (window as any).__t = setInterval(() => setSeconds((s) => s + 1), 1000);
  };
  const end = () => {
    clearInterval((window as any).__t);
    setActive(null);
  };
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (active) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,#1a1f2e,#2a2f45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", zIndex: 50 }}>
        <div style={{ width: 112, height: 112, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700, marginBottom: 24 }}>{active.name[0]}</div>
        <h2 style={{ margin: 0, fontSize: 24 }}>{active.name}</h2>
        <p style={{ opacity: 0.7, marginTop: 8 }}>{active.type === "video" ? "Video call" : "Voice call"} · {fmt(seconds)}</p>
        <button onClick={end} style={{ marginTop: 48, width: 64, height: 64, borderRadius: "50%", background: "#ef4444", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>&#128222;</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 24 }}>
      <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
      <h1 style={{ marginTop: 16 }}>Calls</h1>
      <p style={{ color: "#6b7280", fontSize: 14 }}>Voice & video calling</p>
      {members.map((m) => (
        <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, padding: 12, marginTop: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2a2f45", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{m.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>{m.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280", textTransform: "capitalize" }}>{m.role.replace("_", " ")}</div>
          </div>
          <button onClick={() => start(m.name, "voice")} style={{ width: 40, height: 40, borderRadius: "50%", background: "#dbeafe", border: "none", cursor: "pointer", fontSize: 16 }}>&#128222;</button>
          <button onClick={() => start(m.name, "video")} style={{ width: 40, height: 40, borderRadius: "50%", background: "#d1fae5", border: "none", cursor: "pointer", fontSize: 16 }}>&#128249;</button>
        </div>
      ))}
    </div>
  );
}
