const REQUIRED = ["NODE_ENV", "PORT"];

const asNodeEnv = (value) => {
  if (value === "development" || value === "test" || value === "production") return value;
  throw new Error("NODE_ENV must be development, test, or production");
};

const asPort = (value) => {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }
  return port;
};

const required = (env, name) => {
  if (!env[name]) throw new Error(`Missing required environment variable: ${name}`);
  return env[name];
};

const asPositiveInt = (value, name) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`${name} must be a positive integer`);
  return parsed;
};

export function loadConfig(env = process.env) {
  for (const name of REQUIRED) required(env, name);

  return Object.freeze({
    nodeEnv: asNodeEnv(env.NODE_ENV),
    host: env.HOST ?? "127.0.0.1",
    port: asPort(env.PORT),
    postgres: Object.freeze({
      host: env.POSTGRES_HOST ?? "127.0.0.1",
      port: asPositiveInt(env.POSTGRES_PORT ?? "5432", "POSTGRES_PORT"),
      user: env.POSTGRES_USER ?? "checkme",
      password: env.POSTGRES_PASSWORD ?? "checkme",
      database: env.POSTGRES_DB ?? "checkme",
      timeoutMs: asPositiveInt(env.POSTGRES_TIMEOUT_MS ?? "2000", "POSTGRES_TIMEOUT_MS"),
    }),
    objectStorage: Object.freeze({
      endpoint: required(env, "S3_ENDPOINT"),
      region: env.S3_REGION ?? "us-east-1",
      accessKey: required(env, "S3_ACCESS_KEY"),
      secretKey: required(env, "S3_SECRET_KEY"),
      bucket: required(env, "S3_BUCKET"),
      forcePathStyle: (env.S3_FORCE_PATH_STYLE ?? "true") === "true",
    }),
  });
}
