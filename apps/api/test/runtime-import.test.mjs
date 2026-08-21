import test from "node:test";
import assert from "node:assert/strict";

await test("API runtime dependencies resolve", async () => {
  const config = await import("@checkme/config");
  const observability = await import("@checkme/observability");

  assert.equal(typeof config.loadConfig, "function");
  assert.equal(typeof observability.createLogger, "function");
});
