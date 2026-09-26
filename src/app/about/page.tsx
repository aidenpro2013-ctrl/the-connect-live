"use client";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 24 }}>
      <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
      <h1 style={{ fontSize: 28, marginTop: 16 }}>About THE Connect</h1>
      <p style={{ color: "#6b7280" }}>A community platform for Seabrook / CCISD</p>

      <div style={{ background: "#fff", border: "1px solid #e8e8ee", borderRadius: 16, padding: 24, marginTop: 24 }}>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: "#2a2f45", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, flexShrink: 0 }}>A</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 18 }}>Aiden Armstrong</h2>
            <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>Creator & Owner</p>
            <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5 }}>Hi my name is Aiden and im a big coder hope you enjoy my app.</p>
            <p style={{ margin: "8px 0 0", fontSize: 13, color: "#6b7280" }}>Favorite colors: pastel yellow & dark green · 4 pets (2 tabby cats, 2 parakeets) · Loves painting, sketching, stickers, rocks, pins & astrology.</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #e8e8ee", marginTop: 24, paddingTop: 24, display: "flex", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#fce7f3", color: "#be185d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>E</div>
          <div>
            <h3 style={{ margin: 0 }}>Elizabeth</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Featured community member.</p>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e8e8ee", borderRadius: 16, padding: 24, marginTop: 16 }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 16 }}>Our mission</h2>
        <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>THE Connect helps people in the Seabrook and CCISD community safely connect through messaging, dating, calls, and shared tools — with real names, moderation, and accountability. Phone number sharing has been removed.</p>
      </div>
    </div>
  );
}
