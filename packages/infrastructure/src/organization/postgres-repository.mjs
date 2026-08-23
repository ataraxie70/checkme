import { Organization } from "@checkme/domain/organization/organization.mjs";
import { PostgresInfrastructureError } from "../postgres/port.mjs";

export class PostgresOrganizationRepository {
  constructor({ postgres }) {
    this.postgres = postgres;
  }

  async findById(id) {
    const result = await this.postgres.query(
      "SELECT id, name, status FROM organizations WHERE id = $1",
      [id],
    );
    return result.rows[0] ? this.#toDomain(result.rows[0]) : null;
  }

  async findByName(name) {
    const result = await this.postgres.query(
      "SELECT id, name, status FROM organizations WHERE lower(name) = lower($1)",
      [name],
    );
    return result.rows[0] ? this.#toDomain(result.rows[0]) : null;
  }

  async save(organization) {
    try {
      const result = await this.postgres.query(
        `INSERT INTO organizations (id, name, status)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE
           SET name = EXCLUDED.name,
               status = EXCLUDED.status
         RETURNING id, name, status`,
        [organization.id, organization.name, organization.status],
      );
      return this.#toDomain(result.rows[0]);
    } catch (error) {
      if (error?.code === "23505") {
        throw new PostgresInfrastructureError("organization persistence conflict", {
          cause: error,
          operation: "organization.save",
        });
      }
      throw error;
    }
  }

  #toDomain(row) {
    return new Organization({ id: row.id, name: row.name, status: row.status });
  }
}
