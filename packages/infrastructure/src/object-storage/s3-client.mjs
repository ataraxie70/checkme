import {
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { ObjectStorageError } from "./index.mjs";

export class S3ObjectStorageClient {
  constructor(config) {
    this.bucket = config.bucket;
    this.client = new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
      },
    });
  }

  async ping() {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      return true;
    } catch (cause) {
      throw new ObjectStorageError("Object storage bucket is unavailable", { cause, operation: "ping" });
    }
  }

  async put(key, body, { contentType } = {}) {
    try {
      await this.client.send(new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ...(contentType ? { ContentType: contentType } : {}),
      }));
    } catch (cause) {
      throw new ObjectStorageError("Object storage write failed", { cause, operation: "put" });
    }
  }

  async get(key) {
    try {
      const result = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
      return result.Body;
    } catch (cause) {
      throw new ObjectStorageError("Object storage read failed", { cause, operation: "get" });
    }
  }

  async head(key) {
    try {
      return await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
    } catch (cause) {
      throw new ObjectStorageError("Object storage metadata lookup failed", { cause, operation: "head" });
    }
  }
}
