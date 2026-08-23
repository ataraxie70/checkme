import { OrganizationApplicationError, OrganizationErrorCodes } from "./errors.mjs";

export class GetOrganization {
  constructor({ repository }) {
    this.repository = repository;
  }

  async execute({ id }) {
    if (!id || typeof id !== "string") {
      throw new OrganizationApplicationError(
        OrganizationErrorCodes.INVALID_INPUT,
        "organization id is required",
      );
    }

    const organization = await this.repository.findById(id);
    if (!organization) {
      throw new OrganizationApplicationError(
        OrganizationErrorCodes.NOT_FOUND,
        "organization not found",
      );
    }

    return organization;
  }
}
