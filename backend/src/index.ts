import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { asc, desc, eq } from "drizzle-orm";
import { deleteCookie, getCookie } from "hono/cookie";
import { admins, certificates, contactMessages, education, experiences, profiles, projectTechnologies, projects, skills, socialLinks } from "./db/schema";
import { clearSession, createSession, hashPassword, requireAdmin, sessionEmail, setSession, verifyPassword } from "./auth";
import { certificateSchema, contactSchema, educationSchema, experienceSchema, loginSchema, profileSchema, projectSchema, skillSchema, socialSchema } from "./validation";
import type { Env } from "./types";

const app = new Hono<{ Bindings: Env; Variables: { adminEmail: string } }>();
const now = () => new Date(); const id = () => crypto.randomUUID();
app.use("/api/*", async (c, next) => {
  const allowedOrigins = [c.env.FRONTEND_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"].filter(Boolean);
  return cors({ origin: (origin) => allowedOrigins.includes(origin) ? origin : undefined, credentials: true, allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowHeaders: ["Content-Type"] })(c, next);
});
app.get("/", (c) => c.json({ ok: true, service: "tolesa-portfolio-api" }));
app.get("/api/health", (c) => c.json({ ok: true }));

const parse = async <T>(c: any, schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } }) => { const result = schema.safeParse(await c.req.json()); if (!result.success) throw new Response(JSON.stringify({ error: "Invalid input", details: result.error }), { status: 400 }); return result.data as any as T; };
app.use("/api/*", async (c, next) => {
  const isWrite = ["POST", "PUT", "DELETE"].includes(c.req.method);
  const isPrivateRead = c.req.path === "/api/messages" || c.req.path.startsWith("/api/messages/");
  const isPublicAuth = ["/api/auth/login", "/api/auth/logout", "/api/auth/setup"].includes(c.req.path);
  return isPublicAuth || (!isWrite && !isPrivateRead) ? next() : requireAdmin(c, next);
});

app.post("/api/auth/login", async (c) => { const input = await parse(c, loginSchema); const attempts = Number(getCookie(c, "login_attempts") || 0); if (attempts >= 8) return c.json({ error: "Too many attempts" }, 429); const db = drizzle(c.env.DB); const admin = await db.select().from(admins).where(eq(admins.email, input.email.toLowerCase())).get(); if (!admin || !(await verifyPassword(input.password, admin.passwordHash))) { c.header("Set-Cookie", `login_attempts=${attempts + 1}; Max-Age=900; HttpOnly; Secure; SameSite=Lax; Path=/`); return c.json({ error: "Invalid credentials" }, 401); } deleteCookie(c, "login_attempts", { path: "/" }); setSession(c, await createSession(admin.email, c.env.SESSION_SECRET)); return c.json({ email: admin.email }); });
app.post("/api/auth/logout", (c) => { clearSession(c); return c.json({ ok: true }); });
app.get("/api/auth/me", async (c) => { const email = await sessionEmail(getCookie(c, "portfolio_admin"), c.env.SESSION_SECRET); return email ? c.json({ email }) : c.json({ error: "Unauthenticated" }, 401); });
app.post("/api/auth/setup", async (c) => { if (c.req.header("x-setup-token")?.trim() !== c.env.ADMIN_SETUP_TOKEN?.trim()) return c.json({ error: "Forbidden" }, 403); const input = await parse(c, loginSchema); const db = drizzle(c.env.DB); if (await db.select().from(admins).where(eq(admins.email, input.email.toLowerCase())).get()) return c.json({ error: "Admin exists" }, 409); const timestamp = now(); await db.insert(admins).values({ id: id(), email: input.email.toLowerCase(), passwordHash: await hashPassword(input.password), createdAt: timestamp, updatedAt: timestamp }); return c.json({ ok: true }, 201); });

type Table = typeof skills | typeof experiences | typeof projects | typeof education | typeof certificates | typeof socialLinks;
const publicList = async (c: any, table: Table) => c.json(await drizzle(c.env.DB).select().from(table).where(eq((table as any).published, true)).orderBy(asc((table as any).displayOrder || (table as any).createdAt)));
const crud = (path: string, table: any, schema: any) => { app.get(path, (c) => publicList(c, table)); app.post(path, async (c) => { const input: any = await parse(c, schema); const timestamp = now(); const row = { ...input, id: id(), createdAt: timestamp, updatedAt: timestamp }; await drizzle(c.env.DB).insert(table).values(row); return c.json(row, 201); }); app.put(`${path}/:id`, async (c) => { const input: any = await parse(c, schema.partial()); const row = { ...input, updatedAt: now() }; await drizzle(c.env.DB).update(table).set(row).where(eq(table.id, c.req.param("id"))); return c.json({ id: c.req.param("id"), ...row }); }); app.delete(`${path}/:id`, async (c) => { await drizzle(c.env.DB).delete(table).where(eq(table.id, c.req.param("id"))); return c.body(null, 204); }); };
crud("/api/skills", skills, skillSchema); crud("/api/experience", experiences, experienceSchema); crud("/api/education", education, educationSchema); crud("/api/certificates", certificates, certificateSchema); crud("/api/social-links", socialLinks, socialSchema);

app.get("/api/projects", async (c) => { const rows = await drizzle(c.env.DB).select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.displayOrder)); return c.json(await Promise.all(rows.map(async (project: any) => ({ ...project, technologies: (await drizzle(c.env.DB).select().from(projectTechnologies).where(eq(projectTechnologies.projectId, project.id))).map((t: any) => t.technology) })))); });
app.get("/api/projects/:id", async (c) => c.json(await drizzle(c.env.DB).select().from(projects).where(eq(projects.id, c.req.param("id"))).get()));
app.post("/api/projects", async (c) => { const input = await parse(c, projectSchema); const timestamp = now(); const project = { id: id(), ...input, createdAt: timestamp, updatedAt: timestamp }; const db = drizzle(c.env.DB); await db.insert(projects).values(project); if (input.technologies.length) await db.insert(projectTechnologies).values(input.technologies.map((technology) => ({ id: id(), projectId: project.id, technology }))); return c.json(project, 201); });
app.put("/api/projects/:id", async (c) => { const input = await parse(c, projectSchema.partial()); const db = drizzle(c.env.DB); const { technologies, ...project } = input; await db.update(projects).set({ ...project, updatedAt: now() }).where(eq(projects.id, c.req.param("id"))); if (technologies) { await db.delete(projectTechnologies).where(eq(projectTechnologies.projectId, c.req.param("id"))); await db.insert(projectTechnologies).values(technologies.map((technology) => ({ id: id(), projectId: c.req.param("id"), technology }))); } return c.json({ id: c.req.param("id"), ...input }); });
app.delete("/api/projects/:id", async (c) => { await drizzle(c.env.DB).delete(projects).where(eq(projects.id, c.req.param("id"))); return c.body(null, 204); });

app.get("/api/profile", async (c) => c.json(await drizzle(c.env.DB).select().from(profiles).get()));
app.put("/api/profile", async (c) => { const input = await parse(c, profileSchema); const db = drizzle(c.env.DB); const existing = await db.select().from(profiles).get(); if (existing) await db.update(profiles).set({ ...input, updatedAt: now() }).where(eq(profiles.id, existing.id)); else await db.insert(profiles).values({ id: id(), ...input, createdAt: now(), updatedAt: now() }); return c.json(input); });
app.post("/api/contact", async (c) => { const input = await parse(c, contactSchema); const timestamp = now(); await drizzle(c.env.DB).insert(contactMessages).values({ id: id(), ...input, createdAt: timestamp, updatedAt: timestamp }); return c.json({ ok: true }, 201); });
app.get("/api/messages", async (c) => c.json(await drizzle(c.env.DB).select().from(contactMessages).orderBy(desc(contactMessages.createdAt))));
app.delete("/api/messages/:id", async (c) => { await drizzle(c.env.DB).delete(contactMessages).where(eq(contactMessages.id, c.req.param("id"))); return c.body(null, 204); });
app.post("/api/upload", async (c) => { const body = await c.req.parseBody(); const file = body.file; if (!(file instanceof File)) return c.json({ error: "File required" }, 400); if (file.size > 10 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type)) return c.json({ error: "Unsupported file" }, 400); const key = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`; await c.env.ASSETS.put(key, file.stream(), { httpMetadata: { contentType: file.type } }); return c.json({ key, url: `${c.env.PUBLIC_ASSET_BASE_URL || new URL(c.req.url).origin}/api/files/${key}` }, 201); });
app.get("/api/files/:key{.+}", async (c) => { const object = await c.env.ASSETS.get(c.req.param("key")); if (!object) return c.notFound(); c.header("Content-Type", object.httpMetadata?.contentType || "application/octet-stream"); c.header("Cache-Control", "public, max-age=31536000, immutable"); return c.body(object.body as ReadableStream); });
app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((error, c) => { console.error(error); return c.json({ error: "Internal server error" }, 500); });
export default app;
