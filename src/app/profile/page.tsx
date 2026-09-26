"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser, saveUser } from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/"); return; }
    setUser(u);
    setBio(u.bio || "");
    setPhone(u.phone || "");
    setPhoto(u.photo || null);
  }, [router]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 2e6) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const save = () => {
    const updated = { ...user, bio, phone, photo };
    saveUser(updated);
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <Link href="/dashboard" style={{ fontSize: 13, color: "#6b7280" }}>← Home</Link>
      <h1 style={{ marginTop: 16 }}>Your Profile</h1>
      <div style={{ background: "#fff", border: "1px solid #e8e8ee", borderRadius: 16, padding: 24, marginTop: 16 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
          <div style={{ position: "relative" }}>
            {photo ? <img src={photo} alt="" style={{ width: 72, height: 72, borderRadius: 16, objectFit: "cover" }} /> :
              <div style={{ width: 72, height: 72, borderRadius: 16, background: "#2a2f45", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>{user.full_name?.[0]}</div>}
            <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: -4, right: -4, width: 28, height: 28, borderRadius: "50%", background: "#2a2f45", color: "#fff", border: "none", cursor: "pointer", fontSize: 12 }}>&#128247;</button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{user.full_name}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{user.email}</div>
            <div style={{ fontSize: 11, marginTop: 4, padding: "2px 8px", borderRadius: 12, background: "#f4f4f8", display: "inline-block", textTransform: "capitalize" }}>{user.role}</div>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 500 }}>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{ width: "100%", marginTop: 4, padding: 10, borderRadius: 8, border: "1px solid #e8e8ee", fontSize: 14, boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 500 }}>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", height: 44, marginTop: 4, padding: "0 10px", borderRadius: 8, border: "1px solid #e8e8ee", fontSize: 14, boxSizing: "border-box" }} placeholder="Optional" />
        </div>
        <button onClick={save} style={{ width: "100%", height: 44, background: "#2a2f45", color: "#fff", border: "none", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}>{saved ? "Saved ✓" : "Save changes"}</button>
      </div>
    </div>
  );
}
