import { serve } from "@hono/node-server";
import app, { bootstrapAdmin } from "./index";

const port = Number(process.env.PORT || 8787);
await bootstrapAdmin();
serve({ fetch: app.fetch, port });
console.log(`Portfolio API listening on http://localhost:${port}`);
