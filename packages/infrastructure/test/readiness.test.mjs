import test from "node:test";
import assert from "node:assert/strict";
import { checkReadiness } from "../src/runtime/readiness.mjs";

test("readiness is ready when every dependency passes", async () => {
  const result = await checkReadiness({
    checks: {
      configuration: async () => {},
      postgres: async () => {},
      objectStorage: async () => {},
    },
  });

  assert.equal(result.status, "ready");
  assert.deepEqual(result.checks, {
    configuration: { status: "ok" },
    postgres: { status: "ok" },
    objectStorage: { status: "ok" },
  });
});

test("readiness is not_ready when one dependency fails", async () => {
  const result = await checkReadiness({
    checks: {
      configuration: async () => {},
      postgres: async () => { throw new Error("database unavailable"); },
      objectStorage: async () => {},
    },
  });

  assert.equal(result.status, "not_ready");
  assert.equal(result.checks.postgres.status, "failed");
  assert.equal(result.checks.postgres.error, "database unavailable");
});
