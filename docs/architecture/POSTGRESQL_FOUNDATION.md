# A0.4.1 — PostgreSQL Foundation

## Scope

This slice establishes PostgreSQL as the transactional persistence infrastructure without introducing business-domain tables.

## Rules

- PostgreSQL is the transactional source of truth.
- Business contexts own their schema/data boundaries.
- Cross-context direct table access is forbidden.
- Infrastructure code owns connection and health concerns.
- Migrations are versioned and committed.
- Local credentials are development-only and never production secrets.

## Current bootstrap

The first migration creates only `schema_migrations`. No Organization, Publication, Dataset, Record or Consultation tables exist at this stage.

## Health

The API readiness contract will include a PostgreSQL check only when the database adapter is available in the runtime environment. A failed dependency must make readiness fail; liveness remains independent.

## Driver decision

The application-level PostgreSQL driver must be pinned in `package-lock.json` once dependency installation is available. The current adapter is deliberately isolated behind `packages/infrastructure` so the driver choice cannot leak into Domain or Application.

## Local validation

```text
make db-up
make db-migrate
make db-check
```

Expected result: PostgreSQL is reachable and `schema_migrations` contains `0001_bootstrap`.
