# CheckMe! — Dependency Matrix

## Normative matrix

| Module / Context | Domain | Application | Infrastructure | Contracts | Other context tables |
|---|---:|---:|---:|---:|---:|
| Identity & Access | own | own | adapter only | may consume | **NO** |
| Organization | own | own | adapter only | may consume | **NO** |
| Publication Model | own | own | adapter only | may consume | **NO** |
| Publication | own | own | adapter only | may consume | **NO** |
| Dataset & Import | own | own | adapter only | may consume | **NO** |
| Record | own | own | adapter only | may consume | **NO** |
| Projection & Consultation | own | own | adapter only | may consume | **NO** |

## Direction

```text
HTTP / CLI / messaging adapters
            ↓
      Application services
            ↓
        Domain policy
            ↑
   Infrastructure adapters
```

Infrastructure dependencies point inward through ports. Business policy never points outward toward technical implementations.

## Cross-context rule

Cross-context calls must be one of:

1. an explicit application-level port/contract;
2. a domain/integration event;
3. a versioned external contract.

They must never be implemented as imports of another context's repository implementation or database table.

## Mechanical enforcement target

The architecture test suite will fail if:

- `packages/domain` imports NestJS, Next.js, TypeORM/Prisma, PostgreSQL clients, HTTP clients or Keycloak SDKs;
- a context imports another context's infrastructure package;
- application code imports a concrete infrastructure adapter instead of a port;
- consultation code imports source/import persistence modules;
- tests rely on a hidden global database connection that bypasses the declared adapter boundary.
