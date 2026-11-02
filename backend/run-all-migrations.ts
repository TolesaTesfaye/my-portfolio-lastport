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

console.log("\n🚀 Running all image gallery migrations...\n");

try {
  // Project Images (already exists, but safe to run again)
  console.log("1️⃣ Creating project_images table...");
  await sql`
    CREATE TABLE IF NOT EXISTS project_images (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      image_key TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS project_images_project_idx ON project_images(project_id)`;
  console.log("   ✅ project_images ready\n");
  
  // Certificate Images
  console.log("2️⃣ Creating certificate_images table...");
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
  await sql`CREATE INDEX IF NOT EXISTS certificate_images_certificate_idx ON certificate_images(certificate_id)`;
  console.log("   ✅ certificate_images ready\n");
  
  // Skill Images
  console.log("3️⃣ Creating skill_images table...");
  await sql`
    CREATE TABLE IF NOT EXISTS skill_images (
      id TEXT PRIMARY KEY,
      skill_id TEXT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
      image_key TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS skill_images_skill_idx ON skill_images(skill_id)`;
  console.log("   ✅ skill_images ready\n");
  
  // Experience Images
  console.log("4️⃣ Creating experience_images table...");
  await sql`
    CREATE TABLE IF NOT EXISTS experience_images (
      id TEXT PRIMARY KEY,
      experience_id TEXT NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
      image_key TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS experience_images_experience_idx ON experience_images(experience_id)`;
  console.log("   ✅ experience_images ready\n");
  
  // Education Images
  console.log("5️⃣ Creating education_images table...");
  await sql`
    CREATE TABLE IF NOT EXISTS education_images (
      id TEXT PRIMARY KEY,
      education_id TEXT NOT NULL REFERENCES education(id) ON DELETE CASCADE,
      image_key TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS education_images_education_idx ON education_images(education_id)`;
  console.log("   ✅ education_images ready\n");
  
  console.log("═".repeat(60));
  console.log("✅ ALL MIGRATIONS COMPLETED SUCCESSFULLY!");
  console.log("═".repeat(60));
  console.log("\n📊 Image Galleries Available For:");
  console.log("   • Projects");
  console.log("   • Certificates");
  console.log("   • Skills");
  console.log("   • Experience");
  console.log("   • Education");
  console.log("\n💡 Next: Restart your backend and refresh the admin page!\n");
  
} catch (error: any) {
  console.error("\n❌ Migration failed:", error.message);
  process.exit(1);
}
