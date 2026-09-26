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
      email: email || "aidenpro2013@gmail.com",
      role: "owner",
    };
    localStorage.setItem("the_connect_user", JSON.stringify(user));
    setTimeout(() => router.push("/dashboard"), 500);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#2a2f45", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginBottom: 16 }}>TC</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Welcome back</h1>
          <p style={{ color: "#6b7280", marginTop: 8 }}>Log in to THE Connect</p>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>v.1</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e8ee", padding: 32 }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                style={{ width: "100%", height: 48, padding: "0 12px", borderRadius: 8, border: "1px solid #e8e8ee", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: "100%", height: 48, padding: "0 12px", borderRadius: 8, border: "1px solid #e8e8ee", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: "100%", height: 48, background: "#2a2f45", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginTop: 24 }}>Created by Aiden Armstrong</p>
      </div>
    </div>
  );
}
