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

export function loadConfig(env = process.env) {
  for (const name of REQUIRED) {
    if (!env[name]) throw new Error(`Missing required environment variable: ${name}`);
  }

  return Object.freeze({
    nodeEnv: asNodeEnv(env.NODE_ENV),
    host: env.HOST ?? "127.0.0.1",
    port: asPort(env.PORT),
  });
}
