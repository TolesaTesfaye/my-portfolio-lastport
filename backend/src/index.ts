import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/neon-http";
import { asc, desc, eq } from "drizzle-orm";
import { deleteCookie, getCookie } from "hono/cookie";
import { neon } from "@neondatabase/serverless";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "dotenv";
config({ path: "../.env.local" });
config();
import { admins, certificates, contactMessages, education, experiences, profiles, projectTechnologies, projects, skills, socialLinks } from "./db/schema";
import { clearSession, createSession, hashPassword, requireAdmin, sessionEmail, sessionToken, setSession, verifyPassword } from "./auth";
import { certificateSchema, contactSchema, educationSchema, experienceSchema, loginSchema, profileSchema, projectSchema, skillSchema, socialSchema } from "./validation";
import type { Env } from "./types";

const app = new Hono<{ Bindings: Env; Variables: { adminEmail: string } }>();
const getEnv = (name: string, fallback = "") => {
  const deno = (globalThis as { Deno?: { env: { get: (key: string) => string | undefined } } }).Deno;
  const nodeProcess = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return deno?.env.get(name) || nodeProcess?.env?.[name] || fallback;
};
const sql = neon(getEnv("DATABASE_URL"));
const db = drizzle(sql);

// Backblaze B2 Configuration
const b2KeyId = getEnv("B2_KEY_ID");
const b2ApplicationKey = getEnv("B2_APPLICATION_KEY");
const b2BucketName = getEnv("B2_BUCKET_NAME");
const b2Endpoint = getEnv("B2_ENDPOINT"); // e.g., https://s3.us-west-004.backblazeb2.com
const b2Region = getEnv("B2_REGION", "us-west-004");

let s3Client: S3Client | null = null;
if (b2KeyId && b2ApplicationKey && b2BucketName && b2Endpoint) {
  s3Client = new S3Client({
    endpoint: b2Endpoint,
    region: b2Region,
    credentials: {
      accessKeyId: b2KeyId,
      secretAccessKey: b2ApplicationKey,
    },
  });
  console.log("B2 Storage configured:", b2BucketName, "Endpoint:", b2Endpoint);
}
const storageEnabled = Boolean(s3Client);
const runtimeEnv: Env = { DB: sql, FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"), SESSION_SECRET: getEnv("SESSION_SECRET", "local-development-session-secret-change-before-production"), ADMIN_SETUP_TOKEN: getEnv("ADMIN_SETUP_TOKEN") };
export async function bootstrapAdmin() {
  const email = getEnv("ADMIN_EMAIL").trim().toLowerCase();
  const password = getEnv("ADMIN_PASSWORD");
  if (!email && !password) return;
  if (!email || password.length < 12) throw new Error("ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters are required");
  const existing = (await db.select().from(admins).where(eq(admins.email, email)))[0];
  if (existing) return;
  await db.insert(admins).values({ id: crypto.randomUUID(), email, passwordHash: await hashPassword(password), createdAt: new Date(), updatedAt: new Date() });
  console.log(`Created admin account for ${email}`);
}
app.use("*", async (c, next) => { c.env = runtimeEnv; return next(); });
const now = () => new Date(); const id = () => crypto.randomUUID();

// CORS middleware - must come before other routes
app.use("*", cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://my-portfolio-lastport.vercel.app"],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length", "Set-Cookie"],
  maxAge: 600,
}));

// Test endpoints to verify CORS configuration
app.get("/test", (c) => c.json({ ok: true, message: "CORS test endpoint", timestamp: new Date().toISOString() }));
app.get("/api/test", (c) => c.json({ ok: true, message: "API CORS test endpoint", timestamp: new Date().toISOString() }));

app.get("/", (c) => c.json({ ok: true, service: "tolesa-portfolio-api" }));
app.get("/api/health", (c) => c.json({ ok: true }));

const parse = async <T>(c: any, schema: { safeParse: (v: unknown) => { success: boolean; data?: T; error?: unknown } }) => { const result = schema.safeParse(await c.req.json()); if (!result.success) throw new Response(JSON.stringify({ error: "Invalid input", details: result.error }), { status: 400 }); return result.data as any as T; };
app.use("/api/*", async (c, next) => {
  const isWrite = ["POST", "PUT", "DELETE"].includes(c.req.method);
  const isPrivateRead = c.req.path === "/api/messages" || c.req.path.startsWith("/api/messages/");
  const isPublicAuth = ["/api/auth/login", "/api/auth/logout", "/api/auth/setup"].includes(c.req.path);
  return isPublicAuth || (!isWrite && !isPrivateRead) ? next() : requireAdmin(c, next);
});

app.post("/api/auth/login", async (c) => { const input = await parse(c, loginSchema); const attempts = Number(getCookie(c, "login_attempts") || 0); if (attempts >= 8) return c.json({ error: "Too many attempts" }, 429); const db = drizzle(c.env.DB); const admin = (await db.select().from(admins).where(eq(admins.email, input.email.toLowerCase())))[0]; if (!admin || !(await verifyPassword(input.password, admin.passwordHash))) { c.header("Set-Cookie", `login_attempts=${attempts + 1}; Max-Age=900; HttpOnly; Secure; SameSite=Lax; Path=/`); return c.json({ error: "Invalid credentials" }, 401); } deleteCookie(c, "login_attempts", { path: "/" }); const token = await createSession(admin.email, c.env.SESSION_SECRET); setSession(c, token); return c.json({ email: admin.email, token }); });
app.post("/api/auth/logout", (c) => { clearSession(c); return c.json({ ok: true }); });
app.get("/api/auth/me", async (c) => { const email = await sessionEmail(sessionToken(c), c.env.SESSION_SECRET); return email ? c.json({ email }) : c.json({ error: "Unauthenticated" }, 401); });
app.post("/api/auth/setup", async (c) => { if (c.req.header("x-setup-token")?.trim() !== c.env.ADMIN_SETUP_TOKEN?.trim()) return c.json({ error: "Forbidden" }, 403); const input = await parse(c, loginSchema); const db = drizzle(c.env.DB); if ((await db.select().from(admins).where(eq(admins.email, input.email.toLowerCase())))[0]) return c.json({ error: "Admin exists" }, 409); const timestamp = now(); await db.insert(admins).values({ id: id(), email: input.email.toLowerCase(), passwordHash: await hashPassword(input.password), createdAt: timestamp, updatedAt: timestamp }); return c.json({ ok: true }, 201); });

type Table = typeof skills | typeof experiences | typeof projects | typeof education | typeof certificates | typeof socialLinks;
const publicList = async (c: any, table: Table) => { const isAdmin = Boolean(await sessionEmail(sessionToken(c), c.env.SESSION_SECRET)); const query = drizzle(c.env.DB).select().from(table); return c.json(await (isAdmin ? query : query.where(eq((table as any).published, true))).orderBy(asc((table as any).displayOrder || (table as any).createdAt))); };
const crud = (path: string, table: any, schema: any) => { app.get(path, (c) => publicList(c, table)); app.post(path, async (c) => { const input: any = await parse(c, schema); const timestamp = now(); const row = { ...input, id: id(), createdAt: timestamp, updatedAt: timestamp }; await drizzle(c.env.DB).insert(table).values(row); return c.json(row, 201); }); app.put(`${path}/:id`, async (c) => { const input: any = await parse(c, schema.partial()); const row = { ...input, updatedAt: now() }; await drizzle(c.env.DB).update(table).set(row).where(eq(table.id, c.req.param("id"))); return c.json({ id: c.req.param("id"), ...row }); }); app.delete(`${path}/:id`, async (c) => { await drizzle(c.env.DB).delete(table).where(eq(table.id, c.req.param("id"))); return c.body(null, 204); }); };
crud("/api/skills", skills, skillSchema); crud("/api/experience", experiences, experienceSchema); crud("/api/education", education, educationSchema); crud("/api/certificates", certificates, certificateSchema); crud("/api/social-links", socialLinks, socialSchema);

app.get("/api/projects", async (c) => { const isAdmin = Boolean(await sessionEmail(sessionToken(c), c.env.SESSION_SECRET)); const query = drizzle(c.env.DB).select().from(projects); const rows = await (isAdmin ? query : query.where(eq(projects.published, true))).orderBy(asc(projects.displayOrder)); return c.json(await Promise.all(rows.map(async (project: any) => ({ ...project, technologies: (await drizzle(c.env.DB).select().from(projectTechnologies).where(eq(projectTechnologies.projectId, project.id))).map((t: any) => t.technology) })))); });
app.get("/api/projects/:id", async (c) => c.json((await drizzle(c.env.DB).select().from(projects).where(eq(projects.id, c.req.param("id"))))[0]));
app.post("/api/projects", async (c) => { const input = await parse(c, projectSchema); const timestamp = now(); const project = { id: id(), ...input, createdAt: timestamp, updatedAt: timestamp }; const db = drizzle(c.env.DB); await db.insert(projects).values(project); if (input.technologies.length) await db.insert(projectTechnologies).values(input.technologies.map((technology) => ({ id: id(), projectId: project.id, technology }))); return c.json(project, 201); });
app.put("/api/projects/:id", async (c) => { const input = await parse(c, projectSchema.partial()); const db = drizzle(c.env.DB); const { technologies, ...project } = input; await db.update(projects).set({ ...project, updatedAt: now() }).where(eq(projects.id, c.req.param("id"))); if (technologies) { await db.delete(projectTechnologies).where(eq(projectTechnologies.projectId, c.req.param("id"))); await db.insert(projectTechnologies).values(technologies.map((technology) => ({ id: id(), projectId: c.req.param("id"), technology }))); } return c.json({ id: c.req.param("id"), ...input }); });
app.delete("/api/projects/:id", async (c) => { await drizzle(c.env.DB).delete(projects).where(eq(projects.id, c.req.param("id"))); return c.body(null, 204); });

app.get("/api/profile", async (c) => c.json((await drizzle(c.env.DB).select().from(profiles))[0]));
app.put("/api/profile", async (c) => { const input = await parse(c, profileSchema); const db = drizzle(c.env.DB); const existing = (await db.select().from(profiles))[0]; if (existing) await db.update(profiles).set({ ...input, updatedAt: now() }).where(eq(profiles.id, existing.id)); else await db.insert(profiles).values({ id: id(), ...input, createdAt: now(), updatedAt: now() }); return c.json(input); });
app.post("/api/contact", async (c) => { const input = await parse(c, contactSchema); const timestamp = now(); await drizzle(c.env.DB).insert(contactMessages).values({ id: id(), ...input, createdAt: timestamp, updatedAt: timestamp }); return c.json({ ok: true }, 201); });
app.get("/api/messages", async (c) => c.json(await drizzle(c.env.DB).select().from(contactMessages).orderBy(desc(contactMessages.createdAt))));
app.delete("/api/messages/:id", async (c) => { await drizzle(c.env.DB).delete(contactMessages).where(eq(contactMessages.id, c.req.param("id"))); return c.body(null, 204); });
app.post("/api/upload", async (c) => {
  if (!storageEnabled) return c.json({ error: "Storage is not configured" }, 503);
  const body = await c.req.parseBody();
  const file = body.file;
  if (!file || typeof file === "string" || !("arrayBuffer" in file)) return c.json({ error: "A file is required" }, 400);
  
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${crypto.randomUUID()}-${file.name}`;
    const key = `portfolio/${filename}`;
    
    // Upload to B2 using S3 SDK
    const upload = new Upload({
      client: s3Client!,
      params: {
        Bucket: b2BucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
      },
    });

    await upload.done();
    
    // Return the key - frontend will request signed URL via /api/files/:key
    return c.json({ 
      key: key, 
      publicId: key,
      url: `/api/files/${encodeURIComponent(key)}`
    }, 201);
  } catch (error: any) {
    console.error("B2 upload failed:", error);
    console.error("Error details:", error.message, error.Code);
    return c.json({ 
      error: "Upload failed", 
      message: error.message || "Unknown error",
      details: error.Code || "Check server logs for details"
    }, 502);
  }
});
app.get("/api/files/:key{.+}", async (c) => {
  if (!storageEnabled) return c.json({ error: "Storage is not configured" }, 503);
  
  try {
    const key = decodeURIComponent(c.req.param("key"));
    
    // Generate a signed URL that expires in 1 hour
    const command = new GetObjectCommand({
      Bucket: b2BucketName,
      Key: key,
    });
    
    const signedUrl = await getSignedUrl(s3Client!, command, { expiresIn: 3600 });
    
    // Redirect to the signed URL
    return c.redirect(signedUrl, 302);
  } catch (error: any) {
    console.error("Failed to generate signed URL:", error);
    return c.json({ error: "Failed to retrieve file" }, 500);
  }
});
app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((error, c) => { if (error instanceof Response) return error; console.error(error); return c.json({ error: "Internal server error" }, 500); });
export default app;
