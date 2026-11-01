import type { Next } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { Env } from "./types";

const COOKIE = "portfolio_admin";
const ITERATIONS = 600_000;
const encoder = new TextEncoder();

const b64 = (bytes: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
const unb64 = (value: string) => {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padding = (4 - (normalized.length % 4)) % 4;
  return Uint8Array.from(atob(normalized + "=".repeat(padding)), (c) => c.charCodeAt(0));
};

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" }, key, 256);
  return `pbkdf2_sha256$${ITERATIONS}$${b64(salt)}$${b64(bits)}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [, iterations, saltValue, hashValue] = stored.split("$");
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: unb64(saltValue), iterations: Number(iterations), hash: "SHA-256" }, key, 256);
  const actual = new Uint8Array(bits); const expected = unb64(hashValue);
  return actual.length === expected.length && actual.every((byte, i) => byte === expected[i]);
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createSession(email: string, secret: string) {
  const payload = `${email}.${Date.now() + 86_400_000}`;
  return `${payload}.${await sign(payload, secret)}`;
}

export async function sessionEmail(token: string | undefined, secret: string) {
  if (!token) return null;
  const decodedToken = decodeURIComponent(token);
  const signatureStart = decodedToken.lastIndexOf(".");
  const expiryStart = decodedToken.lastIndexOf(".", signatureStart - 1);
  const email = decodedToken.slice(0, expiryStart);
  const expiry = decodedToken.slice(expiryStart + 1, signatureStart);
  const signature = decodedToken.slice(signatureStart + 1);
  if (!email || !expiry || !signature || Number(expiry) < Date.now()) return null;
  return (await sign(`${email}.${expiry}`, secret)) === signature ? email : null;
}

export function setSession(c: any, value: string) {
  const production = new URL(c.req.url).protocol === "https:";
  setCookie(c, COOKIE, value, {
    httpOnly: true,
    secure: production,
    sameSite: production ? "None" : "Lax",
    path: "/",
    maxAge: 86_400,
  });
}
export function clearSession(c: any) { deleteCookie(c, COOKIE, { path: "/" }); }
export function sessionToken(c: any) {
  return getCookie(c, COOKIE) || c.req.header("Authorization")?.replace(/^Bearer\s+/i, "");
}

export async function requireAdmin(c: any, next: Next) {
  const email = await sessionEmail(sessionToken(c), c.env.SESSION_SECRET);
  if (!email) return c.json({ error: "Authentication required" }, 401);
  c.set("adminEmail", email);
  return next();
}
