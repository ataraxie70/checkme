# Persistence Foundation

## Scope

A0.4.3 establishes PostgreSQL as the transactional persistence infrastructure. It deliberately does not define business tables.

## Rules

- PostgreSQL is an infrastructure concern.
- Domain code never imports a PostgreSQL driver.
- Application code depends on ports, not concrete drivers.
- Migrations are versioned and repeatable.
- Readiness must represent real dependency availability.
- Transactions are owned by the infrastructure adapter and exposed through an application-safe port.
- Cross-context persistence access is forbidden.

## Current database state

The foundation creates only infrastructure metadata:

- `schema_migrations`
- `runtime_metadata`

No business aggregate is persisted at this stage.

## Verification

Local verification:

```bash
make db-up
make db-migrate
make db-check
```

The final runtime readiness endpoint will consume the same PostgreSQL health contract rather than assuming that a process listening on a TCP port means the dependency is ready.

## Driver policy

The concrete Node.js PostgreSQL driver remains an adapter dependency. It must be added with a reproducible lockfile before the adapter is considered production-ready. No handwritten protocol implementation is accepted as a substitute.
