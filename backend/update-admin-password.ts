import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { admins } from "./src/db/schema";
import { hashPassword } from "./src/auth";
import { config } from "dotenv";

// Load environment variables
config({ path: ".dev.vars" });
config();

const getEnv = (name: string) => process.env[name] || "";

async function updateAdminPassword() {
  const email = getEnv("ADMIN_EMAIL").trim().toLowerCase();
  const password = getEnv("ADMIN_PASSWORD");
  
  if (!email || !password) {
    console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set");
    process.exit(1);
  }

  console.log(`\n🔧 Updating admin password for: ${email}`);
  
  const sql = neon(getEnv("DATABASE_URL"));
  const db = drizzle(sql);

  try {
    // Check if admin exists
    const existing = await db.select().from(admins).where(eq(admins.email, email));
    
    if (existing.length === 0) {
      console.log("📝 Admin doesn't exist, creating new account...");
      const passwordHash = await hashPassword(password);
      await db.insert(admins).values({
        id: crypto.randomUUID(),
        email,
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Created new admin account for ${email}`);
    } else {
      console.log("🔄 Admin exists, updating password...");
      const passwordHash = await hashPassword(password);
      await db
        .update(admins)
        .set({ passwordHash, updatedAt: new Date() })
        .where(eq(admins.email, email));
      console.log(`✅ Updated password for ${email}`);
    }
    
    console.log("\n✅ Done! You can now login with the new password.");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updateAdminPassword();
