import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { config } from "dotenv";
import crypto from "crypto";

config({ path: ".dev.vars" });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

// Simple password hashing
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

async function createAdmin() {
  const email = "tolesatesfaye273@gmail.com";
  const password = "702512@Tol";
  
  console.log("Creating admin account...");
  console.log("Email:", email);
  
  try {
    const passwordHash = await hashPassword(password);
    const id = crypto.randomUUID();
    const now = new Date();
    
    await db.execute(`
      INSERT INTO admins (id, email, password_hash, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO UPDATE 
      SET password_hash = $3, updated_at = $5
    `, [id, email.toLowerCase(), passwordHash, now, now]);
    
    console.log("✅ Admin account created/updated successfully!");
    console.log("\nYou can now login with:");
    console.log("Email:", email);
    console.log("Password: 702512@Tol");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

createAdmin();
