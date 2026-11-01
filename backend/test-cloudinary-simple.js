import { v2 as cloudinary } from "cloudinary";

// Direct configuration
cloudinary.config({
  cloud_name: "doxnfikws",
  api_key: "234262248445188",
  api_secret: "5xWw0k-xAOJxdu32RLmHtBDrTGQ",
});

console.log("✅ Cloudinary Configuration:");
console.log("   Cloud Name:", cloudinary.config().cloud_name);
console.log("   API Key:", cloudinary.config().api_key);
console.log("   Configured:", cloudinary.config().cloud_name ? "YES" : "NO");

// Test the API connection
console.log("\n🔄 Testing Cloudinary API connection...");

try {
  const result = await cloudinary.api.ping();
  console.log("✅ SUCCESS! Cloudinary is connected and working!");
  console.log("   Response:", result);
} catch (error) {
  console.error("❌ FAILED! Cloudinary connection error:");
  console.error("   Error:", error.message);
  if (error.error) {
    console.error("   Details:", error.error);
  }
  process.exit(1);
}
