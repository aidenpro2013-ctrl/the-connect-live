"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/storage";

const NAV = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/community", label: "Community", icon: "users" },
  { href: "/messages", label: "Messages", icon: "message" },
  { href: "/dating", label: "Dating", icon: "heart" },
  { href: "/calls", label: "Calls", icon: "phone" },
  { href: "/ai", label: "AI", icon: "sparkles" },
  { href: "/profile", label: "Profile", icon: "user" },
];

function Icon({ name }: { name: string }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "home": return <svg {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case "users": return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "message": return <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
    case "heart": return <svg {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>;
    case "phone": return <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case "sparkles": return <svg {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>;
    case "user": return <svg {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    default: return null;
  }
}

export default function AppShell({ children, title }: { children: React.ReactNode; title?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/"); return; }
    setUser(u);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted">Loading…</div>
      </div>
    );
  }

  const logout = () => {
    localStorage.removeItem("the_connect_user");
    router.push("/");
  };

  return (
    <div className="app-shell">
      {/* Discord-style sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">TC</div>
            <div>
              <div className="font-bold" style={{ fontSize: 15 }}>THE Connect</div>
              <div className="text-xs" style={{ color: "var(--sidebar-muted)" }}>Seabrook / CCISD</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Main</div>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} className={`nav-item ${active ? "active" : ""}`}>
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar">{user.full_name?.[0] || "A"}</div>
            <div className="flex-1 truncate">
              <div className="text-sm font-semibold truncate">{user.full_name}</div>
              <div className="text-xs" style={{ color: "var(--sidebar-muted)" }}>Online</div>
            </div>
            <button onClick={logout} className="btn-ghost" style={{ padding: 6, color: "var(--sidebar-muted)" }} title="Log out">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        {title && (
          <header className="main-header">
            <h1 className="font-semibold" style={{ fontSize: 16 }}>{title}</h1>
          </header>
        )}
        <div className="main-body" style={{ padding: title ? undefined : 0 }}>
          {children}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        {NAV.slice(0, 5).map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""}>
              <Icon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
