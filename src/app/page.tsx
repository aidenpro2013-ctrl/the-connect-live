"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      id: "user-1",
      full_name: "Aiden Armstrong",
      email: email || "aiden@theconnect.app",
      role: "owner",
      photo: null,
      bio: "Creator of THE Connect",
    };
    localStorage.setItem("the_connect_user", JSON.stringify(user));
    setTimeout(() => router.push("/dashboard"), 500);
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #5865f2, #007aff)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 16,
              boxShadow: "0 8px 24px rgba(0,122,255,0.3)",
            }}
          >
            TC
          </div>
          <h1 className="font-bold" style={{ fontSize: 26, letterSpacing: -0.5 }}>Welcome back</h1>
          <p className="text-muted mt-1" style={{ fontSize: 15 }}>Sign in to THE Connect</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-sm font-semibold" style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm font-semibold" style={{ display: "block", marginBottom: 6 }}>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ height: 48, fontSize: 16 }}>
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>

        <p className="text-center text-muted text-xs mt-4" style={{ marginTop: 24 }}>
          Demo mode — any email & password works
        </p>
        <p className="text-center text-muted text-xs" style={{ marginTop: 12 }}>
          Created by Aiden Armstrong
        </p>
      </div>
    </div>
  );
}
