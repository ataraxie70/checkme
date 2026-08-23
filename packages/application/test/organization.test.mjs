import test from "node:test";
import assert from "node:assert/strict";
import { CreateOrganization } from "../src/organization/create-organization.mjs";
import { GetOrganization } from "../src/organization/get-organization.mjs";
import { OrganizationErrorCodes } from "../src/organization/errors.mjs";

const repository = () => {
  const items = new Map();
  return {
    async findById(id) { return items.get(id) ?? null; },
    async findByName(name) { return [...items.values()].find((item) => item.name === name) ?? null; },
    async save(item) { items.set(item.id, item); },
  };
};

test("CreateOrganization creates an organization", async () => {
  const repo = repository();
  const useCase = new CreateOrganization({ repository: repo, idGenerator: () => "org-1" });

  const result = await useCase.execute({ name: "Example Org" });

  assert.equal(result.id, "org-1");
  assert.equal(result.name, "Example Org");
  assert.equal(result.status, "active");
});

test("CreateOrganization rejects duplicates", async () => {
  const repo = repository();
  const useCase = new CreateOrganization({ repository: repo, idGenerator: () => "org-1" });
  await useCase.execute({ name: "Example Org" });

  await assert.rejects(
    () => useCase.execute({ name: "Example Org" }),
    (error) => error.code === OrganizationErrorCodes.ALREADY_EXISTS,
  );
});

test("GetOrganization returns the aggregate", async () => {
  const repo = repository();
  const create = new CreateOrganization({ repository: repo, idGenerator: () => "org-1" });
  const expected = await create.execute({ name: "Example Org" });
  const get = new GetOrganization({ repository: repo });

  assert.equal(await get.execute({ id: "org-1" }), expected);
});

test("GetOrganization reports not found", async () => {
  const get = new GetOrganization({ repository: repository() });

  await assert.rejects(
    () => get.execute({ id: "missing" }),
    (error) => error.code === OrganizationErrorCodes.NOT_FOUND,
  );
});
