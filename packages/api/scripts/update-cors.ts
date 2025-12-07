import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";

// Try to load from process.env, which Bun populates from .env
const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;

console.log("Checking environment variables...");
console.log("R2_ACCOUNT_ID:", accountId ? "Set" : "Missing");
console.log("R2_ACCESS_KEY_ID:", accessKeyId ? "Set" : "Missing");
console.log("R2_SECRET_ACCESS_KEY:", secretAccessKey ? "Set" : "Missing");
console.log("R2_BUCKET:", bucket ? "Set" : "Missing");

if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
  console.error("Missing R2 environment variables. Please ensure .env contains R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET.");
  process.exit(1);
}

const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

const client = new S3Client({
  region: "auto",
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const run = async () => {
  try {
    console.log(`Updating CORS configuration for bucket: ${bucket}...`);
    
    const command = new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["GET", "PUT", "POST", "HEAD", "DELETE"],
            AllowedOrigins: ["*"], // Allow all origins to support dynamic subdomains
            ExposeHeaders: ["ETag"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    });

    await client.send(command);
    console.log("✅ Successfully updated CORS configuration!");
    console.log("New Rule:");
    console.log("- AllowedOrigins: *");
    console.log("- AllowedMethods: GET, PUT, POST, HEAD, DELETE");
    console.log("- AllowedHeaders: *");
  } catch (error) {
    console.error("❌ Error updating CORS configuration:", error);
    process.exit(1);
  }
};

run();
