const toBuffer = async (body) => {
  if (body instanceof Uint8Array) return body;
  if (typeof body === "string") return Buffer.from(body);
  if (body?.arrayBuffer) return Buffer.from(await body.arrayBuffer());
  throw new TypeError("Object body must be a string, Uint8Array, or ArrayBuffer-like value");
};

const encode = (value) => encodeURIComponent(value).replace(/%2F/g, "/");

export class ObjectStorageError extends Error {
  constructor(message, { cause, operation } = {}) {
    super(message, { cause });
    this.name = "ObjectStorageError";
    this.operation = operation;
  }
}

export class S3ObjectStorage {
  constructor(config, logger, fetchImpl = globalThis.fetch) {
    this.config = config;
    this.logger = logger;
    this.fetch = fetchImpl;
  }

  url(key) {
    const path = `${encode(this.config.bucket)}/${encode(key)}`;
    return `${this.config.endpoint.replace(/\/$/, "")}/${path}`;
  }

  async put(key, body, { contentType = "application/octet-stream" } = {}) {
    try {
      const response = await this.fetch(this.url(key), {
        method: "PUT",
        headers: {
          "content-type": contentType,
          "x-checkme-access-key": this.config.accessKey,
          "x-checkme-secret-key": this.config.secretKey,
        },
        body: await toBuffer(body),
      });
      if (!response.ok) throw new Error(`S3 PUT failed with HTTP ${response.status}`);
      return { key };
    } catch (cause) {
      throw new ObjectStorageError("Object upload failed", { cause, operation: "put" });
    }
  }

  async head(key) {
    try {
      const response = await this.fetch(this.url(key), {
        method: "HEAD",
        headers: {
          "x-checkme-access-key": this.config.accessKey,
          "x-checkme-secret-key": this.config.secretKey,
        },
      });
      return response.ok;
    } catch (cause) {
      throw new ObjectStorageError("Object metadata check failed", { cause, operation: "head" });
    }
  }
}
