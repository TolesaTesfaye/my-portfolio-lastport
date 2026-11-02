import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { admins } from "./src/db/schema";

// Manually load .dev.vars
const vars = readFileSync(".dev.vars", "utf-8");
const envVars: Record<string, string> = {};
for (const line of vars.split("\n")) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const [key, ...valueParts] = trimmed.split("=");
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join("=").trim();
    }
  }
}

if (!envVars.DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in .dev.vars");
  process.exit(1);
}

console.log("✓ Loaded DATABASE_URL from .dev.vars");
const sql = neon(envVars.DATABASE_URL);
const db = drizzle(sql);

const email = "tolesatesfaye273@gmail.com";

console.log(`Deleting admin account: ${email}...`);

await db.delete(admins).where(eq(admins.email, email));

console.log(`✓ Admin account deleted. Restart the backend to recreate it with the new password.`);
