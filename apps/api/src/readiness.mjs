export class ReadinessService {
  constructor({ checks, timeoutMs = 1500 }) {
    this.checks = checks;
    this.timeoutMs = timeoutMs;
  }

  async run() {
    const results = {};
    let ready = true;

    for (const [name, check] of Object.entries(this.checks)) {
      try {
        await Promise.race([
          Promise.resolve().then(() => check()),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("readiness check timed out")), this.timeoutMs),
          ),
        ]);
        results[name] = "ok";
      } catch (error) {
        ready = false;
        results[name] = {
          status: "failed",
          reason: error instanceof Error ? error.message : "unknown error",
        };
      }
    }

    return { ready, checks: results };
  }
}
