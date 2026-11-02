import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config({ path: ".dev.vars" });

const b2KeyId = process.env.B2_KEY_ID;
const b2ApplicationKey = process.env.B2_APPLICATION_KEY;
const b2BucketName = process.env.B2_BUCKET_NAME;
const b2Endpoint = process.env.B2_ENDPOINT;
const b2Region = process.env.B2_REGION || "us-east-005";

console.log("Testing B2 connection...");
console.log("Key ID:", b2KeyId);
console.log("Bucket:", b2BucketName);
console.log("Endpoint:", b2Endpoint);
console.log("");

const s3Client = new S3Client({
  endpoint: b2Endpoint,
  region: b2Region,
  credentials: {
    accessKeyId: b2KeyId,
    secretAccessKey: b2ApplicationKey,
  },
});

try {
  console.log("Uploading test file...");
  
  const testContent = "Hello from portfolio!";
  
  const command = new PutObjectCommand({
    Bucket: b2BucketName,
    Key: "test/hello.txt",
    Body: Buffer.from(testContent),
    ContentType: "text/plain",
  });
  
  await s3Client.send(command);
  
  console.log("✅ Upload successful!");
  console.log("Your B2 configuration is working correctly.");
  
} catch (error) {
  console.error("❌ Upload failed:");
  console.error(error.message);
  console.error(error.$metadata);
}
