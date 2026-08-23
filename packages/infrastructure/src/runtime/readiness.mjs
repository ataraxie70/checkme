export async function checkReadiness({ checks }) {
  const entries = await Promise.all(
    Object.entries(checks).map(async ([name, check]) => {
      try {
        await check();
        return [name, { status: "ok" }];
      } catch (error) {
        return [name, { status: "failed", error: error.message }];
      }
    }),
  );

  const results = Object.fromEntries(entries);
  const ready = Object.values(results).every((result) => result.status === "ok");

  return Object.freeze({
    status: ready ? "ready" : "not_ready",
    checks: results,
  });
}
