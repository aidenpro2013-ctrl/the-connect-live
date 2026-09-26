export function getUser() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("the_connect_user") || "null"); } catch { return null; }
}
export function saveUser(user: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_user", JSON.stringify(user));
}
export function getMessages(channel = "community") {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(`the_connect_msgs_${channel}`) || "[]"); } catch { return []; }
}
export function saveMessages(channel: string, messages: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`the_connect_msgs_${channel}`, JSON.stringify(messages));
}
export function getDatingProfile() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("the_connect_dating_profile") || "null"); } catch { return null; }
}
export function saveDatingProfile(p: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_dating_profile", JSON.stringify(p));
}
export function getMatches() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("the_connect_matches") || "[]"); } catch { return []; }
}
export function saveMatches(m: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("the_connect_matches", JSON.stringify(m));
}
