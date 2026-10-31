import app from "./index.ts";

Deno.serve({ port: Number(Deno.env.get("PORT") || 8000) }, app.fetch);
