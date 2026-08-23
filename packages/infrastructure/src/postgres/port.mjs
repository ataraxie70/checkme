export class PostgresInfrastructureError extends Error {
  constructor(message, { cause, operation } = {}) {
    super(message, { cause });
    this.name = "PostgresInfrastructureError";
    this.operation = operation;
  }
}

/**
 * Infrastructure port for transactional PostgreSQL access.
 * Concrete drivers stay behind this boundary.
 */
export class PostgresPort {
  async ping() {
    throw new Error("PostgresPort.ping() is not implemented");
  }

  async query(_text, _parameters = []) {
    throw new Error("PostgresPort.query() is not implemented");
  }

  async transaction(_work) {
    throw new Error("PostgresPort.transaction() is not implemented");
  }

  async close() {
    throw new Error("PostgresPort.close() is not implemented");
  }
}
