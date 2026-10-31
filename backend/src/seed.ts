import { config } from "dotenv";
config({ path: "../.env.local" });
config();
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL || "");
const source = await readFile(new URL("../seed.sql", import.meta.url), "utf8");
const statements = source
  .split(";")
  .map((statement) => {
    let normalized = statement.replace(/INSERT OR IGNORE INTO/g, "INSERT INTO").replace(/unixepoch\(\) \* 1000/g, "CURRENT_TIMESTAMP").trim();
    if (normalized.startsWith("INSERT INTO skills")) normalized = normalized.replace(/, 1, CURRENT_TIMESTAMP/g, ", true, CURRENT_TIMESTAMP");
    if (normalized.startsWith("INSERT INTO experiences")) normalized = normalized.replace(/, (0|1), (NULL|'[^']*'), 1, CURRENT_TIMESTAMP/g, (_, working, location) => `, ${working === "1" ? "true" : "false"}, ${location}, true, CURRENT_TIMESTAMP`);
    if (normalized.startsWith("INSERT INTO projects")) normalized = normalized.replace(/, (0|1), (\d+), 1, CURRENT_TIMESTAMP/g, (_, featured, order) => `, ${featured === "1" ? "true" : "false"}, ${order}, true, CURRENT_TIMESTAMP`);
    if (/INSERT INTO (education|certificates|social_links)/.test(normalized)) normalized = normalized.replace(/, 1, CURRENT_TIMESTAMP/g, ", true, CURRENT_TIMESTAMP");
    return normalized;
  })
  .filter(Boolean)
  .map((statement) => `${statement} ON CONFLICT DO NOTHING`);

for (const statement of statements) await sql.query(statement);
console.log(`Seeded ${statements.length} PostgreSQL statements.`);
