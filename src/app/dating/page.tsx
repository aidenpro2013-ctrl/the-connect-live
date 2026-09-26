"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, getDatingProfile, saveDatingProfile, getMatches, saveMatches } from "@/lib/storage";

const DECK = [
  { id: "e1", name: "Elizabeth", age: 19, bio: "Love art, music, and good conversations.", interests: ["Art", "Music", "Astrology"] },
  { id: "j1", name: "Jordan", age: 21, bio: "CCISD grad. Always down for coffee or a hike.", interests: ["Hiking", "Coffee", "Photography"] },
  { id: "s1", name: "Sam", age: 20, bio: "Parakeet parent & sticker collector.", interests: ["Pets", "Stickers", "Painting"] },
  { id: "m1", name: "Morgan", age: 22, bio: "Music producer. Looking for someone to share playlists with.", interests: ["Music", "Tech", "Concerts"] },
];

export default function DatingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [setup, setSetup] = useState({ name: "", age: "", bio: "", interests: "" });
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [tab, setTab] = useState<"swipe" | "matches">("swipe");

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/"); return; }
    setUser(u);
    const p = getDatingProfile();
    setProfile(p);
    if (p) setSetup({ name: p.name || "", age: String(p.age || ""), bio: p.bio || "", interests: (p.interests || []).join(", ") });
    setMatches(getMatches());
  }, [router]);

  const createProfile = () => {
    if (!setup.name || !setup.age) { alert("Name and age required"); return; }
    const p = { name: setup.name, age: Number(setup.age), bio: setup.bio, interests: setup.interests.split(",").map((s) => s.trim()).filter(Boolean) };
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
      setTimeout(() => { setMatched(null); setIndex((i) => i + 1); }, 2000);
    } else setIndex((i) => i + 1);
  };

  if (!user) return null;

  if (!profile) {
    return (
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
        <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
        <h1 style={{ textAlign: "center", marginTop: 16 }}>Create Dating Profile</h1>
        <div style={{ background: "#fff", border: "1px solid #e8e8ee", borderRadius: 16, padding: 24, marginTop: 16 }}>
          {["name", "age", "bio", "interests"].map((field) => (
            <div key={field} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 500, textTransform: "capitalize" }}>{field === "interests" ? "Interests (comma separated)" : field}</label>
              {field === "bio" ? (
                <textarea value={(setup as any)[field]} onChange={(e) => setSetup({ ...setup, [field]: e.target.value })} rows={3}
                  style={{ width: "100%", marginTop: 4, padding: 10, borderRadius: 8, border: "1px solid #e8e8ee", fontSize: 14, boxSizing: "border-box" }} />
              ) : (
                <input type={field === "age" ? "number" : "text"} value={(setup as any)[field]} onChange={(e) => setSetup({ ...setup, [field]: e.target.value })}
                  style={{ width: "100%", height: 44, marginTop: 4, padding: "0 10px", borderRadius: 8, border: "1px solid #e8e8ee", fontSize: 14, boxSizing: "border-box" }} />
              )}
            </div>
          ))}
          <button onClick={createProfile} style={{ width: "100%", height: 44, background: "#2a2f45", color: "#fff", border: "none", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}>Start swiping</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 16 }}>
      <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <button onClick={() => setTab("swipe")} style={{ flex: 1, height: 40, borderRadius: 8, border: "none", background: tab === "swipe" ? "#2a2f45" : "#fff", color: tab === "swipe" ? "#fff" : "#1a1f2e", fontWeight: 500, cursor: "pointer", borderWidth: 1, borderStyle: "solid", borderColor: "#e8e8ee" }}>Discover</button>
        <button onClick={() => setTab("matches")} style={{ flex: 1, height: 40, borderRadius: 8, border: "1px solid #e8e8ee", background: tab === "matches" ? "#2a2f45" : "#fff", color: tab === "matches" ? "#fff" : "#1a1f2e", fontWeight: 500, cursor: "pointer" }}>Matches ({matches.length})</button>
      </div>
      {tab === "matches" ? (
        matches.length === 0 ? <div style={{ textAlign: "center", padding: 40, color: "#6b7280", background: "#fff", borderRadius: 12, border: "1px solid #e8e8ee" }}>No matches yet. Keep swiping!</div> :
        matches.map((m) => (
          <div key={m.id + m.matchedAt} style={{ display: "flex", gap: 12, alignItems: "center", background: "#fff", border: "1px solid #e8e8ee", borderRadius: 12, padding: 12, marginBottom: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#ec4899,#f43f5e)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{m.name[0]}</div>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}, {m.age}</div><div style={{ fontSize: 12, color: "#6b7280" }}>{m.bio}</div></div>
          </div>
        ))
      ) : matched ? (
        <div style={{ background: "linear-gradient(135deg,#ec4899,#f43f5e)", color: "#fff", borderRadius: 24, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>&#128150;</div>
          <h2 style={{ margin: "12px 0 4px" }}>It&apos;s a Match!</h2>
          <p style={{ opacity: 0.9 }}>You and {matched.name} liked each other</p>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e8e8ee", borderRadius: 24, overflow: "hidden" }}>
          <div style={{ height: 260, background: "linear-gradient(135deg,#2a2f45,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 64, fontWeight: 700 }}>{card.name[0]}</div>
          <div style={{ padding: 20 }}>
            <h2 style={{ margin: 0 }}>{card.name}, {card.age}</h2>
            <p style={{ color: "#6b7280", fontSize: 14, margin: "8px 0" }}>{card.bio}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {card.interests.map((i) => <span key={i} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: "#f4f4f8", border: "1px solid #e8e8ee" }}>{i}</span>)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, paddingBottom: 24 }}>
            <button onClick={() => swipe(false)} style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #f87171", background: "#fff", color: "#ef4444", fontSize: 24, cursor: "pointer" }}>&#10005;</button>
            <button onClick={() => swipe(true)} style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #34d399", background: "#fff", color: "#10b981", fontSize: 24, cursor: "pointer" }}>&#9829;</button>
          </div>
        </div>
      )}
    </div>
  );
}
