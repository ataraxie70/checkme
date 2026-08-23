export class OrganizationApplicationError extends Error {
  constructor(code, message, { cause } = {}) {
    super(message, { cause });
    this.name = "OrganizationApplicationError";
    this.code = code;
  }
}

export const OrganizationErrorCodes = Object.freeze({
  INVALID_INPUT: "ORGANIZATION_INVALID_INPUT",
  NOT_FOUND: "ORGANIZATION_NOT_FOUND",
  ALREADY_EXISTS: "ORGANIZATION_ALREADY_EXISTS",
});
