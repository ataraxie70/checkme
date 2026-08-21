# CheckMe! — Architecture Enforcement

## Status

A0.2 — executable architecture gate.

## Objective

Architecture rules are not documentation-only constraints. They must be executable and must fail CI when violated.

## Current enforcement

`npm run architecture:test` executes `scripts/check-architecture.mjs`.

The checker scans source files and rejects:

- framework/ORM/database/transport/provider imports from the domain;
- application imports of infrastructure implementations;
- domain imports of application, infrastructure, contracts or app code;
- web imports that bypass application boundaries into domain/infrastructure.

## Scope

The current checker is intentionally small and deterministic. It is the first executable gate, not the final architecture verification system.

As contexts gain real packages, the manifest will be extended with explicit context-to-context rules and package ownership.

## CI policy

Architecture checks are part of the mandatory lint step. A pull request that violates a forbidden dependency must fail before business tests can be considered valid.

## Limitation

The checker is static import analysis. It does not yet prove runtime dependency injection, database access isolation, tenant enforcement or event topology. Those controls belong to later security and integration gates.

## Gate condition

A0.2 can be closed when:

1. the architecture checker runs locally;
2. CI runs it through `npm run lint`;
3. a deliberately forbidden dependency is demonstrated to fail the checker;
4. the checker itself has tests covering allowed and forbidden cases.
