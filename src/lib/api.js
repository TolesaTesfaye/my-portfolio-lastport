const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const apiEnabled = Boolean(API_URL);

export async function apiFetch(path, options = {}) {
  if (!API_URL) throw new Error("API is not configured");
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || "Request failed");
  return response.status === 204 ? null : response.json();
}

export async function getPortfolioData() {
  if (!apiEnabled) return null;
  const [profile, skills, experience, projects, education, certificates, socialLinks] = await Promise.all([
    apiFetch("/api/profile"), apiFetch("/api/skills"), apiFetch("/api/experience"), apiFetch("/api/projects"),
    apiFetch("/api/education"), apiFetch("/api/certificates"), apiFetch("/api/social-links"),
  ]);
  return { profile, skills, experience, projects, education, certificates, socialLinks };
}
