import { S3Client } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
export const R2_WORKSPACE_PUB_ENDPOINT = `https://pub-${process.env.R2_WORKSPACE_PUB_ACCOUNT_ID}.r2.dev`;

export default s3Client;
