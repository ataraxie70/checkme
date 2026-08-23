import assert from "node:assert/strict";
import test from "node:test";
import { ReadinessService } from "../src/readiness.mjs";

test("readiness is ready when every dependency passes", async () => {
  const service = new ReadinessService({
    checks: {
      configuration: async () => true,
      postgres: async () => true,
    },
  });

  assert.deepEqual(await service.run(), {
    ready: true,
    checks: { configuration: "ok", postgres: "ok" },
  });
});

test("readiness fails when one dependency fails", async () => {
  const service = new ReadinessService({
    checks: {
      configuration: async () => true,
      postgres: async () => { throw new Error("database unavailable"); },
    },
  });

  const result = await service.run();
  assert.equal(result.ready, false);
  assert.equal(result.checks.configuration, "ok");
  assert.deepEqual(result.checks.postgres, {
    status: "failed",
    reason: "database unavailable",
  });
});

test("readiness fails a dependency that exceeds the timeout", async () => {
  const service = new ReadinessService({
    timeoutMs: 10,
    checks: { postgres: () => new Promise(() => {}) },
  });

  const result = await service.run();
  assert.equal(result.ready, false);
  assert.equal(result.checks.postgres.status, "failed");
  assert.equal(result.checks.postgres.reason, "readiness check timed out");
});
