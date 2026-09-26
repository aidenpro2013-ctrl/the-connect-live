"use client";
import AppShell from "@/components/AppShell";

export default function AboutPage() {
  return (
    <AppShell title="About">
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="card card-pad mb-4">
          <div className="flex gap-4">
            <div className="avatar xl" style={{ borderRadius: 16, fontSize: 28, flexShrink: 0 }}>A</div>
            <div>
              <h2 className="font-bold" style={{ margin: 0, fontSize: 18 }}>Aiden Armstrong</h2>
              <p className="text-sm text-muted" style={{ margin: "4px 0" }}>Creator & Owner</p>
              <p className="text-sm" style={{ marginTop: 8, lineHeight: 1.5 }}>
                Hi my name is Aiden and im a big coder hope you enjoy my app.
              </p>
              <p className="text-xs text-muted" style={{ marginTop: 8 }}>
                Favorite colors: pastel yellow & dark green · 4 pets · Loves painting, stickers & astrology.
              </p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", marginTop: 20, paddingTop: 20 }} className="flex gap-4">
            <div className="avatar lg" style={{ borderRadius: 14, background: "#fce7f3", color: "#be185d", flexShrink: 0 }}>E</div>
            <div>
              <div className="font-semibold">Elizabeth</div>
              <p className="text-xs text-muted">Featured community member</p>
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <h3 className="font-semibold mb-2">Our mission</h3>
          <p className="text-sm text-muted" style={{ lineHeight: 1.6 }}>
            THE Connect helps people in the Seabrook and CCISD community safely connect through messaging, dating, calls, and shared tools — with real names and accountability. Phone number sharing has been removed.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
