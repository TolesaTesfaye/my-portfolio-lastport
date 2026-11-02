import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { config } from "dotenv";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: ".dev.vars" });

const b2KeyId = process.env.B2_KEY_ID;
const b2ApplicationKey = process.env.B2_APPLICATION_KEY;
const b2BucketName = process.env.B2_BUCKET_NAME;
const b2Endpoint = process.env.B2_ENDPOINT;
const b2Region = process.env.B2_REGION || "us-east-005";

console.log("🚀 Starting B2 Migration");
console.log("=".repeat(60));
console.log("Bucket:", b2BucketName);
console.log("Endpoint:", b2Endpoint);
console.log("=".repeat(60));
console.log("");

if (!b2KeyId || !b2ApplicationKey || !b2BucketName || !b2Endpoint) {
  console.error("❌ Missing B2 configuration!");
  process.exit(1);
}

const s3Client = new S3Client({
  endpoint: b2Endpoint,
  region: b2Region,
  credentials: {
    accessKeyId: b2KeyId,
    secretAccessKey: b2ApplicationKey,
  },
});

const publicDir = join(__dirname, "..", "frontend", "public");
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];

function getContentType(filename) {
  const ext = extname(filename).toLowerCase();
  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  return types[ext] || "application/octet-stream";
}

function getAllImageFiles(dir) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllImageFiles(fullPath));
    } else {
      const ext = extname(item).toLowerCase();
      if (imageExtensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

async function uploadFile(filePath) {
  const filename = filePath.split("\\").pop().split("/").pop();
  const buffer = readFileSync(filePath);
  const fileSize = (buffer.length / 1024).toFixed(2);
  const key = `portfolio/${filename}`;
  
  try {
    console.log(`📤 Uploading: ${filename} (${fileSize} KB)`);
    
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: b2BucketName,
        Key: key,
        Body: buffer,
        ContentType: getContentType(filename),
      },
      queueSize: 1,
      partSize: 1024 * 1024 * 5, // 5MB parts
    });

    await upload.done();
    
    const publicUrl = `/api/files/${encodeURIComponent(key)}`;
    console.log(`✅ Success: ${filename}`);
    console.log(`   Key: ${key}`);
    console.log(`   URL: ${publicUrl}`);
    console.log("");
    
    return { filename, key, url: publicUrl, success: true };
  } catch (error) {
    console.error(`❌ Failed: ${filename}`);
    console.error(`   Error: ${error.message}`);
    if (error.$metadata) {
      console.error(`   Status: ${error.$metadata.httpStatusCode}`);
    }
    console.log("");
    return { filename, error: error.message, success: false };
  }
}

async function migrateAllImages() {
  console.log("🔍 Scanning for images...");
  const imageFiles = getAllImageFiles(publicDir);
  console.log(`Found ${imageFiles.length} image files\n`);
  
  if (imageFiles.length === 0) {
    console.log("No images found to migrate.");
    return;
  }
  
  const results = [];
  let successCount = 0;
  let failCount = 0;
  
  for (const filePath of imageFiles) {
    const result = await uploadFile(filePath);
    results.push(result);
    
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log("=".repeat(60));
  console.log("📊 Migration Summary");
  console.log("=".repeat(60));
  console.log(`Total files: ${imageFiles.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log("");
  
  if (successCount > 0) {
    console.log("📝 Image Mapping (for reference):");
    console.log("=".repeat(60));
    results
      .filter(r => r.success)
      .forEach(r => {
        console.log(`${r.filename}`);
        console.log(`  → ${r.url}`);
      });
    console.log("");
  }
  
  if (failCount > 0) {
    console.log("❌ Failed uploads:");
    console.log("=".repeat(60));
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`${r.filename}: ${r.error}`);
      });
    console.log("");
  }
  
  console.log("✅ Migration complete!");
  console.log("");
  console.log("Next steps:");
  console.log("1. Update your frontend code to use the new B2 URLs");
  console.log("2. Test that all images load correctly");
  console.log("3. Deploy to production with B2 environment variables");
}

migrateAllImages().catch(console.error);
