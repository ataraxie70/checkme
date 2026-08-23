# A0.3 — Runtime & Infrastructure Foundation

## Objective

Provide a minimal executable runtime before any business context is introduced.

## API

The API process must provide:

- explicit configuration loading;
- structured process logging;
- liveness probe: `GET /health/live`;
- readiness probe: `GET /health/ready`;
- deterministic 404 responses;
- graceful SIGTERM/SIGINT shutdown;
- no business behavior.

## Worker

The worker process must:

- load the same validated runtime configuration;
- initialize structured logging;
- handle SIGTERM/SIGINT;
- start without registering business jobs yet.

## Configuration rules

Configuration is read from the environment and validated at process startup. Invalid configuration must fail fast. Secrets are never committed to the repository and `.env.example` contains placeholders only.

## Readiness

Readiness is not equivalent to liveness. Future infrastructure dependencies (PostgreSQL, object storage, identity provider, job transport) must expose explicit checks before the service reports `ready`.

## Error contract

HTTP errors must be structured and must not expose stack traces, credentials, SQL, internal filesystem paths or provider-specific secrets.

## Shutdown

Processes must stop accepting new work, close resources, and exit cleanly on SIGTERM/SIGINT. Worker job handling will later add graceful drain semantics.

## Gate

A0.3 is not `VERIFIED` until the runtime is executed under Node 24.18.x, probes are tested, invalid configuration is tested, shutdown is tested, and the CI pipeline executes the same checks.
