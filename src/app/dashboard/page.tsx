"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("the_connect_user");
    if (!raw) { router.push("/"); return; }
    setUser(JSON.parse(raw));
  }, [router]);

  if (!user) return <div style={{ padding: 40 }}>Loading…</div>;

  const links = [
    { href: "/community", label: "Community Chat", desc: "Talk with everyone" },
    { href: "/messages", label: "Messages", desc: "Private DMs" },
    { href: "/dating", label: "Dating", desc: "Swipe & match" },
    { href: "/calls", label: "Calls", desc: "Voice & video" },
    { href: "/ai", label: "AI Assistant", desc: "24/7 help" },
    { href: "/profile", label: "Profile", desc: "Your page" },
    { href: "/about", label: "About", desc: "Meet the team" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24 }}>Welcome back, {user.full_name?.split(" ")[0]} 👋</h1>
          <p style={{ color: "#6b7280", marginTop: 4 }}>THE Connect · Seabrook / CCISD</p>
        </div>
        <button onClick={() => { localStorage.removeItem("the_connect_user"); router.push("/"); }}
          style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e8e8ee", background: "#fff", cursor: "pointer", fontSize: 13 }}>
          Log out
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{ background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, padding: 16, textDecoration: "none", color: "inherit" }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{l.label}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{l.desc}</div>
          </Link>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 40 }}>Created by Aiden Armstrong · Phone number sharing removed</p>
    </div>
  );
}
