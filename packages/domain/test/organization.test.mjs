import test from "node:test";
import assert from "node:assert/strict";
import { Organization } from "../src/organization/organization.mjs";

test("organization requires a stable id and meaningful name", () => {
  assert.throws(() => new Organization({ id: "", name: "Acme" }));
  assert.throws(() => new Organization({ id: "org-1", name: "A" }));
});

test("organization starts active and can be suspended", () => {
  const organization = new Organization({ id: "org-1", name: "Acme" });
  assert.equal(organization.status, "active");
  organization.suspend();
  assert.equal(organization.status, "suspended");
  organization.activate();
  assert.equal(organization.status, "active");
});

test("organization rejects unknown status", () => {
  assert.throws(() => new Organization({ id: "org-1", name: "Acme", status: "deleted" }));
});
