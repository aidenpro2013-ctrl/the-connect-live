"use client";
import { useEffect, useState, useRef } from "react";
import AppShell from "@/components/AppShell";
import { getUser, saveUser } from "@/lib/storage";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = getUser();
    if (u) {
      setUser(u);
      setBio(u.bio || "");
      setPhoto(u.photo || null);
    }
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 2e6) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const save = () => {
    const updated = { ...user, bio, photo };
    saveUser(updated);
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <AppShell title="Profile">
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div className="card card-pad">
          <div className="flex items-center gap-4 mb-4">
            <div style={{ position: "relative" }}>
              {photo ? (
                <img src={photo} alt="" className="avatar xl" style={{ borderRadius: 16, objectFit: "cover" }} />
              ) : (
                <div className="avatar xl" style={{ borderRadius: 16, fontSize: 28 }}>{user.full_name?.[0]}</div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                style={{
                  position: "absolute", bottom: -4, right: -4, width: 28, height: 28,
                  borderRadius: "50%", background: "var(--accent)", color: "#fff",
                  border: "2px solid var(--surface)", cursor: "pointer", fontSize: 12,
                }}
              >
                +
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
            </div>
            <div>
              <div className="font-bold" style={{ fontSize: 18 }}>{user.full_name}</div>
              <div className="text-sm text-muted">{user.email}</div>
              <span className="text-xs" style={{ display: "inline-block", marginTop: 4, padding: "2px 10px", borderRadius: 12, background: "var(--surface-2)", textTransform: "capitalize" }}>
                {user.role}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold" style={{ display: "block", marginBottom: 6 }}>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="input"
              style={{ height: "auto", padding: 12, borderRadius: 12, resize: "vertical" }}
              placeholder="Tell people about yourself…"
            />
          </div>

          <button onClick={save} className="btn btn-primary w-full" style={{ height: 44 }}>
            {saved ? "Saved ✓" : "Save changes"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
