import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export class PostgresClient {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  async ping() {
    const env = {
      ...process.env,
      PGPASSWORD: this.config.password,
    };

    await execFileAsync(
      "psql",
      [
        "--host", this.config.host,
        "--port", String(this.config.port),
        "--username", this.config.user,
        "--dbname", this.config.database,
        "--command", "SELECT 1",
        "--no-psqlrc",
        "--quiet",
      ],
      { env, timeout: this.config.timeoutMs },
    );

    return true;
  }

  async close() {
    // The current bootstrap adapter is process-based and therefore stateless.
  }
}
