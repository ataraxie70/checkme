# CheckMe!

CheckMe! is being rebuilt from a clean implementation baseline.

## Current status

**Foundation: architecture bootstrap**

The implementation is intentionally empty of business behavior at this stage. The project follows the canonical CheckMe! documentation and the P8.REBASE audit baseline.

## Architecture

- modular monolith
- asynchronous worker
- PostgreSQL as transactional source
- Outbox for reliable asynchronous propagation
- S3-compatible object storage
- OIDC / Keycloak for administrative identity
- OpenTelemetry for observability
- TypeScript / Node.js 24 / NestJS / Next.js

## Rules

The domain must not depend on frameworks, persistence, transport, or infrastructure. Dependencies flow from interfaces toward application and domain; infrastructure implements ports.

## Current implementation gate

No business context is implemented until the architecture boundaries and dependency rules are validated.
