"use client";
import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { getUser, getDatingProfile, saveDatingProfile, getMatches, saveMatches } from "@/lib/storage";

const DECK = [
  { id: "e1", name: "Elizabeth", age: 19, bio: "Love art, music, and good conversations.", interests: ["Art", "Music", "Astrology"] },
  { id: "j1", name: "Jordan", age: 21, bio: "CCISD grad. Always down for coffee or a hike.", interests: ["Hiking", "Coffee", "Photography"] },
  { id: "s1", name: "Sam", age: 20, bio: "Parakeet parent & sticker collector.", interests: ["Pets", "Stickers", "Painting"] },
  { id: "m1", name: "Morgan", age: 22, bio: "Music producer. Looking for someone to share playlists with.", interests: ["Music", "Tech", "Concerts"] },
];

export default function DatingPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [setup, setSetup] = useState({ name: "", age: "", bio: "", interests: "" });
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [tab, setTab] = useState<"swipe" | "matches">("swipe");

  useEffect(() => {
    const u = getUser();
    setUser(u);
    const p = getDatingProfile();
    setProfile(p);
    if (p) setSetup({ name: p.name || "", age: String(p.age || ""), bio: p.bio || "", interests: (p.interests || []).join(", ") });
    setMatches(getMatches());
  }, []);

  const createProfile = () => {
    if (!setup.name || !setup.age) return;
    const p = {
      name: setup.name,
      age: Number(setup.age),
      bio: setup.bio,
      interests: setup.interests.split(",").map((s) => s.trim()).filter(Boolean),
    };
    saveDatingProfile(p);
    setProfile(p);
  };

  const card = DECK[index % DECK.length];
  const swipe = (liked: boolean) => {
    if (liked && Math.random() > 0.35) {
      const m = { ...card, matchedAt: Date.now() };
      setMatched(m);
      const next = [...matches, m];
      setMatches(next);
      saveMatches(next);
      setTimeout(() => { setMatched(null); setIndex((i) => i + 1); }, 1800);
    } else setIndex((i) => i + 1);
  };

  if (!user) return null;

  if (!profile) {
    return (
      <AppShell title="Dating">
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <div className="card card-pad">
            <h2 className="font-bold mb-4" style={{ fontSize: 18 }}>Create your profile</h2>
            {(["name", "age", "bio", "interests"] as const).map((field) => (
              <div key={field} className="mb-4">
                <label className="text-sm font-semibold" style={{ display: "block", marginBottom: 6, textTransform: "capitalize" }}>
                  {field === "interests" ? "Interests (comma separated)" : field}
                </label>
                {field === "bio" ? (
                  <textarea
                    value={setup[field]}
                    onChange={(e) => setSetup({ ...setup, [field]: e.target.value })}
                    rows={3}
                    className="input"
                    style={{ height: "auto", padding: 12, borderRadius: 12 }}
                  />
                ) : (
                  <input
                    type={field === "age" ? "number" : "text"}
                    value={setup[field]}
                    onChange={(e) => setSetup({ ...setup, [field]: e.target.value })}
                    className="input"
                  />
                )}
              </div>
            ))}
            <button onClick={createProfile} className="btn btn-primary w-full" style={{ height: 44 }}>Start swiping</button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Dating">
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTab("swipe")}
            className={`btn flex-1 ${tab === "swipe" ? "btn-primary" : "btn-ghost"}`}
            style={{ border: tab === "swipe" ? "none" : "1px solid var(--border)" }}
          >
            Discover
          </button>
          <button
            onClick={() => setTab("matches")}
            className={`btn flex-1 ${tab === "matches" ? "btn-primary" : "btn-ghost"}`}
            style={{ border: tab === "matches" ? "none" : "1px solid var(--border)" }}
          >
            Matches ({matches.length})
          </button>
        </div>

        {tab === "matches" ? (
          matches.length === 0 ? (
            <div className="card card-pad text-center text-muted">No matches yet. Keep swiping!</div>
          ) : (
            matches.map((m) => (
              <div key={m.id + m.matchedAt} className="card flex items-center gap-3" style={{ padding: 12, marginBottom: 8 }}>
                <div className="avatar lg" style={{ background: "linear-gradient(135deg,#ff2d55,#ff6b6b)" }}>{m.name[0]}</div>
                <div className="flex-1">
                  <div className="font-semibold">{m.name}, {m.age}</div>
                  <div className="text-xs text-muted">{m.bio}</div>
                </div>
              </div>
            ))
          )
        ) : matched ? (
          <div className="card" style={{ background: "linear-gradient(135deg,#ff2d55,#ff6b6b)", color: "#fff", borderRadius: 24, padding: 40, textAlign: "center", border: "none" }}>
            <div style={{ fontSize: 48 }}>💕</div>
            <h2 className="font-bold" style={{ margin: "12px 0 4px", fontSize: 24 }}>It's a Match!</h2>
            <p style={{ opacity: 0.9 }}>You and {matched.name} liked each other</p>
          </div>
        ) : (
          <div className="card" style={{ overflow: "hidden", borderRadius: 24 }}>
            <div style={{ height: 240, background: "linear-gradient(135deg,#5865f2,#007aff)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 64, fontWeight: 700 }}>
              {card.name[0]}
            </div>
            <div style={{ padding: 20 }}>
              <h2 className="font-bold" style={{ margin: 0, fontSize: 22 }}>{card.name}, {card.age}</h2>
              <p className="text-muted text-sm" style={{ margin: "8px 0" }}>{card.bio}</p>
              <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
                {card.interests.map((i) => (
                  <span key={i} className="text-xs" style={{ padding: "4px 12px", borderRadius: 20, background: "var(--surface-2)", border: "1px solid var(--border)" }}>{i}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4" style={{ paddingBottom: 24 }}>
              <button onClick={() => swipe(false)} style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid var(--danger)", background: "var(--surface)", color: "var(--danger)", fontSize: 24, cursor: "pointer" }}>✕</button>
              <button onClick={() => swipe(true)} style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid var(--success)", background: "var(--surface)", color: "var(--success)", fontSize: 24, cursor: "pointer" }}>♥</button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
