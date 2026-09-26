"use client";

import Link from "next/link";
import AppShell from "@/components/AppShell";
import { getUser } from "@/lib/storage";
import { useEffect, useState } from "react";

const TILES = [
  { href: "/messages", label: "Messages", desc: "Private chats", icon: "💬", color: "#007aff" },
  { href: "/community", label: "Community", desc: "Group chat", icon: "👥", color: "#5865f2" },
  { href: "/dating", label: "Dating", desc: "Swipe & match", icon: "❤️", color: "#ff2d55" },
  { href: "/calls", label: "Calls", desc: "Voice & video", icon: "📞", color: "#34c759" },
  { href: "/ai", label: "AI Assistant", desc: "Smart help", icon: "✨", color: "#af52de" },
  { href: "/profile", label: "Profile", desc: "Your page", icon: "👤", color: "#ff9500" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => setUser(getUser()), []);

  return (
    <AppShell title="Home">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="mb-4">
          <h2 className="font-bold" style={{ fontSize: 22, letterSpacing: -0.3 }}>
            Hey {user?.full_name?.split(" ")[0] || "there"} 👋
          </h2>
          <p className="text-muted text-sm mt-1">What do you want to do today?</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
          {TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card card-pad"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: t.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {t.icon}
              </div>
              <div className="font-semibold" style={{ fontSize: 15 }}>{t.label}</div>
              <div className="text-xs text-muted">{t.desc}</div>
            </Link>
          ))}
        </div>

        <div className="card card-pad mt-4" style={{ marginTop: 24 }}>
          <div className="font-semibold mb-2">Community pulse</div>
          <p className="text-sm text-muted">
            THE Connect is built for Seabrook / CCISD students & families. Chat, meet people, and stay connected — safely.
          </p>
        </div>

        <p className="text-center text-xs text-muted" style={{ marginTop: 32 }}>
          Created by Aiden Armstrong · v1.0
        </p>
      </div>
    </AppShell>
  );
}
