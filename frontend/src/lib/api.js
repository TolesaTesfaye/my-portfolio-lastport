const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const TOKEN_KEY = "portfolio_admin_token";

export const apiEnabled = Boolean(API_URL);

export async function apiFetch(path, options = {}) {
  if (!API_URL) throw new Error("API is not configured");
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && !headers.Authorization) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || "Request failed");
  return response.status === 204 ? null : response.json();
}

export async function apiUpload(file) {
  if (!API_URL) throw new Error("API is not configured");
  const body = new FormData();
  body.append("file", file);
  const headers = {};
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_URL}/api/upload`, { method: "POST", credentials: "include", headers, body });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || "Upload failed");
  return response.json();
}

export const assetUrl = (key) => key ? (key.startsWith("/") || key.startsWith("http") ? key : `${API_URL}/api/files/${key}`) : "";

export async function getPortfolioData() {
  if (!apiEnabled) return null;
  const [profile, skills, experience, projects, education, certificates, socialLinks] = await Promise.all([
    apiFetch("/api/profile"), apiFetch("/api/skills"), apiFetch("/api/experience"), apiFetch("/api/projects"),
    apiFetch("/api/education"), apiFetch("/api/certificates"), apiFetch("/api/social-links"),
  ]);
  return { profile, skills, experience, projects, education, certificates, socialLinks };
}
