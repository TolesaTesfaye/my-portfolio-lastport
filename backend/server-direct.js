import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

// CORS FIRST - before anything else
app.use("*", cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

app.get("/test", (c) => {
  console.log("Test endpoint hit!");
  return c.json({ message: "CORS is working!", timestamp: new Date().toISOString() });
});

app.get("/api/health", (c) => {
  return c.json({ ok: true, cors: "enabled" });
});

const port = 8787;
serve({ fetch: app.fetch, port });
console.log(`
========================================
 TEST SERVER RUNNING
 Port: ${port}
 CORS: ENABLED
 Test: http://localhost:${port}/test
========================================
`);
