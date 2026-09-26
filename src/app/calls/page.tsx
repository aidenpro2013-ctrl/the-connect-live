"use client";
import { useState } from "react";
import AppShell from "@/components/AppShell";

const members = [
  { id: 1, name: "Elizabeth" },
  { id: 2, name: "Jordan Lee" },
  { id: 3, name: "Sam Rivera" },
  { id: 4, name: "Morgan" },
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
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg,#0c0c0e,#1c1c1e)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", zIndex: 100 }}>
        <div className="avatar xl" style={{ width: 112, height: 112, fontSize: 40, marginBottom: 24, background: "linear-gradient(135deg,#5865f2,#007aff)" }}>
          {active.name[0]}
        </div>
        <h2 className="font-bold" style={{ fontSize: 24, margin: 0 }}>{active.name}</h2>
        <p className="text-muted" style={{ marginTop: 8, color: "#8e8e93" }}>
          {active.type === "video" ? "Video call" : "Voice call"} · {fmt(seconds)}
        </p>
        <button
          onClick={end}
          style={{ marginTop: 48, width: 68, height: 68, borderRadius: "50%", background: "#ff3b30", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}
        >
          📵
        </button>
      </div>
    );
  }

  return (
    <AppShell title="Calls">
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p className="text-muted text-sm mb-4">Start a voice or video call</p>
        {members.map((m) => (
          <div key={m.id} className="card flex items-center gap-3" style={{ padding: 12, marginBottom: 8 }}>
            <div className="avatar lg">{m.name[0]}</div>
            <div className="flex-1 font-semibold">{m.name}</div>
            <button
              onClick={() => start(m.name, "voice")}
              className="btn"
              style={{ width: 40, height: 40, borderRadius: "50%", padding: 0, background: "#e8f0fe", color: "#007aff" }}
              title="Voice"
            >
              📞
            </button>
            <button
              onClick={() => start(m.name, "video")}
              className="btn"
              style={{ width: 40, height: 40, borderRadius: "50%", padding: 0, background: "#e8f8ee", color: "#34c759" }}
              title="Video"
            >
              📹
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
