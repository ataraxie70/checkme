import http from "node:http";
import { loadConfig } from "@checkme/config";
import { createLogger } from "@checkme/observability";

const config = loadConfig(process.env);
const logger = createLogger({ service: "checkme-api", environment: config.nodeEnv });

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? `127.0.0.1:${config.port}`}`);

  response.setHeader("content-type", "application/json; charset=utf-8");
  response.setHeader("cache-control", "no-store");

  if (request.method === "GET" && url.pathname === "/health/live") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok", service: "checkme-api" }));
    return;
  }

  if (request.method === "GET" && url.pathname === "/health/ready") {
    // Infrastructure readiness checks are deliberately explicit and composable.
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ready", checks: { configuration: "ok" } }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ error: { code: "NOT_FOUND", message: "Route not found" } }));
});

server.on("error", (error) => {
  logger.error("api_server_error", { error: error.message });
  process.exitCode = 1;
});

server.listen(config.port, config.host, () => {
  logger.info("api_started", { host: config.host, port: config.port });
});

const shutdown = (signal) => {
  logger.info("api_shutdown_requested", { signal });
  server.close(() => process.exit(0));
};

process.once("SIGTERM", () => shutdown("SIGTERM"));
process.once("SIGINT", () => shutdown("SIGINT"));
