import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

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

console.log("Running migration: add-certificate-images.sql");

try {
  // Create table
  await sql`
    CREATE TABLE IF NOT EXISTS certificate_images (
      id TEXT PRIMARY KEY,
      certificate_id TEXT NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
      image_key TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  
  console.log("✓ Created certificate_images table");
  
  // Create index
  await sql`CREATE INDEX IF NOT EXISTS certificate_images_certificate_idx ON certificate_images(certificate_id)`;
  
  console.log("✓ Created index");
  console.log("✅ Migration completed successfully!");
} catch (error: any) {
  console.error("❌ Migration failed:", error.message);
  process.exit(1);
}
