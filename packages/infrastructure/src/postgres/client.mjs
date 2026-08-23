import pg from "pg";
import { PostgresInfrastructureError } from "./port.mjs";

const { Pool } = pg;

export class PostgresClient {
  constructor(config, logger) {
    this.logger = logger;
    this.pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      connectionTimeoutMillis: config.timeoutMs,
      max: config.maxConnections ?? 10,
      idleTimeoutMillis: config.idleTimeoutMs ?? 30000,
    });
  }

  async ping() {
    try {
      await this.pool.query("SELECT 1");
      return true;
    } catch (cause) {
      throw new PostgresInfrastructureError("PostgreSQL ping failed", { cause, operation: "ping" });
    }
  }

  async query(text, parameters = []) {
    try {
      return await this.pool.query(text, parameters);
    } catch (cause) {
      throw new PostgresInfrastructureError("PostgreSQL query failed", { cause, operation: "query" });
    }
  }

  async transaction(work) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await work(client);
      await client.query("COMMIT");
      return result;
    } catch (cause) {
      try { await client.query("ROLLBACK"); } catch (rollbackCause) {
        this.logger?.error("postgres_rollback_failed", { error: rollbackCause.message });
      }
      throw new PostgresInfrastructureError("PostgreSQL transaction failed", { cause, operation: "transaction" });
    } finally {
      client.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}
