# Architecture Build Roadmap

## A0 — Foundation

- repository
- workspace
- lockfile
- conventions
- CI
- dependency rules

## A1 — Domain kernel

- Organization bounded context
- value objects
- invariants
- domain errors
- unit tests

## A2 — Application layer

- commands/queries
- ports
- transaction boundary
- application tests

## A3 — Infrastructure

- PostgreSQL
- migrations
- repositories
- transaction adapter

## A4 — Identity & authorization

- OIDC
- Keycloak
- organization context
- RBAC/ABAC
- negative security tests

## A5 — API

- canonical versioned contracts
- error model
- request IDs
- validation

## A6 — Async foundation

- outbox
- pg-boss
- worker runtime
- retries
- idempotency

## A7 — First vertical

Organization -> PublicationModel -> Publication -> Dataset -> Record

## A8 — Projection & consultation

- projection
- search
- field filtering
- rate limiting
- E2E

## A9 — Hardening

- observability
- backup/restore
- load
- resilience
- security review
