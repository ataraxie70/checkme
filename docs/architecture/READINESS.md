# CheckMe! — Runtime Readiness Contract

## Purpose

`/health/live` answers whether the process is alive.

`/health/ready` answers whether the process can safely serve requests because all mandatory runtime dependencies are available.

## Contract

```text
LIVE
  process event loop and HTTP server are operational

READY
  configuration is valid
  AND PostgreSQL is reachable
  AND object storage is reachable
```

A dependency failure makes readiness `not_ready`; it must not make liveness fail.

## Response model

Ready:

```json
{
  "status": "ready",
  "checks": {
    "configuration": { "status": "ok" },
    "postgres": { "status": "ok" },
    "objectStorage": { "status": "ok" }
  }
}
```

Not ready:

```json
{
  "status": "not_ready",
  "checks": {
    "postgres": { "status": "failed", "error": "..." }
  }
}
```

The public response must not expose credentials, connection strings, SQL statements, bucket secrets or stack traces. Detailed failures belong in structured server logs.
