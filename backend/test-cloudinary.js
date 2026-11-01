import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

// Load environment variables
config({ path: "backend/.dev.vars" });

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl) {
  console.error("❌ CLOUDINARY_URL not found in environment variables");
  process.exit(1);
}

// Parse and configure Cloudinary
try {
  const parsed = new URL(cloudinaryUrl);
  cloudinary.config({
    cloud_name: parsed.hostname,
    api_key: decodeURIComponent(parsed.username),
    api_secret: decodeURIComponent(parsed.password.substring(1)),
  });

  console.log("✅ Cloudinary configuration loaded:");
  console.log(`   Cloud Name: ${parsed.hostname}`);
  console.log(`   API Key: ${parsed.username}`);
  console.log(`   API Secret: ${"*".repeat(parsed.password.length - 1)}`);

  // Test the connection by pinging the API
  cloudinary.api.ping()
    .then((result) => {
      console.log("\n✅ Cloudinary connection successful!");
      console.log("   Response:", result);
    })
    .catch((error) => {
      console.error("\n❌ Cloudinary connection failed:");
      console.error("   Error:", error.message);
      process.exit(1);
    });
} catch (error) {
  console.error("❌ Failed to parse CLOUDINARY_URL:", error.message);
  process.exit(1);
}
