import test from "node:test";
import assert from "node:assert/strict";
import { loadConfig } from "@checkme/config";

test("configuration accepts a valid environment", () => {
  const config = loadConfig({ NODE_ENV: "test", PORT: "3000" });
  assert.equal(config.nodeEnv, "test");
  assert.equal(config.port, 3000);
});

test("configuration fails fast when required values are missing", () => {
  assert.throws(() => loadConfig({ NODE_ENV: "test" }), /Missing required environment variable: PORT/);
});

test("configuration rejects invalid ports", () => {
  assert.throws(() => loadConfig({ NODE_ENV: "test", PORT: "0" }), /PORT must be an integer/);
});
