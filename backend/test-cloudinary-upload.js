import { v2 as cloudinary } from "cloudinary";

// Test with the exact credentials
cloudinary.config({
  cloud_name: "doxnfikws",
  api_key: "234262248445188",
  api_secret: "5xWw0k-xAOJxdu32RLmHtBDrTGQ",
  secure: true,
});

console.log("Testing Cloudinary configuration...");
console.log("Cloud Name:", cloudinary.config().cloud_name);
console.log("API Key:", cloudinary.config().api_key);
console.log("API Secret length:", cloudinary.config().api_secret.length);
console.log("");

// Test with a simple upload (using a test URL)
console.log("Testing upload signature generation...");

try {
  // Test the ping API first
  const result = await cloudinary.api.ping();
  console.log("✅ Cloudinary API connection successful!");
  console.log("Response:", result);
  
  // Test upload parameters (similar to what the code does)
  console.log("\nTesting upload signature...");
  const uploadResult = await cloudinary.uploader.upload(
    "https://via.placeholder.com/150",
    { 
      folder: "tolesa-portfolio",
      resource_type: "auto"
    }
  );
  
  console.log("✅ Upload test successful!");
  console.log("URL:", uploadResult.secure_url);
  console.log("Public ID:", uploadResult.public_id);
  
} catch (error) {
  console.error("❌ Error:", error.message);
  if (error.http_code) {
    console.error("HTTP Code:", error.http_code);
  }
  if (error.error) {
    console.error("Details:", error.error);
  }
}
