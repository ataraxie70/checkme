import { Organization } from "@checkme/domain/organization/organization.mjs";
import { OrganizationApplicationError, OrganizationErrorCodes } from "./errors.mjs";

export class CreateOrganization {
  constructor({ repository, idGenerator }) {
    this.repository = repository;
    this.idGenerator = idGenerator;
  }

  async execute({ name }) {
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new OrganizationApplicationError(
        OrganizationErrorCodes.INVALID_INPUT,
        "organization name must contain at least 2 characters",
      );
    }

    const normalizedName = name.trim();
    const existing = await this.repository.findByName(normalizedName);
    if (existing) {
      throw new OrganizationApplicationError(
        OrganizationErrorCodes.ALREADY_EXISTS,
        "organization already exists",
      );
    }

    const organization = new Organization({
      id: this.idGenerator(),
      name: normalizedName,
    });

    await this.repository.save(organization);
    return organization;
  }
}
