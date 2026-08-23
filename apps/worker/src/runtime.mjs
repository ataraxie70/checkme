import { loadConfig } from "@checkme/config";
import { createLogger } from "@checkme/observability";

const config = loadConfig(process.env);
const logger = createLogger({ service: "checkme-worker", environment: config.nodeEnv });

logger.info("worker_started", { status: "idle", reason: "no business jobs registered" });

const shutdown = (signal) => {
  logger.info("worker_shutdown_requested", { signal });
  process.exit(0);
};

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
