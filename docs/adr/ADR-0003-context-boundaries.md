# ADR-0003 — CheckMe! Context Boundaries

- **Status:** Proposed
- **Date:** 2026-08-21
- **Scope:** Clean implementation foundation

## Context

CheckMe! must be rebuilt from a clean base while preserving the documented business direction and preventing the coupling and operational ambiguity identified during the previous implementation audit.

## Decision

CheckMe! is organized around explicit bounded contexts:

- Identity & Access
- Organization
- Publication Model
- Publication
- Dataset & Import
- Record
- Projection & Consultation
- Platform / Infrastructure as a technical supporting layer

The Core Domain is the governed publication-to-consultation lifecycle. Context ownership is explicit, and direct cross-context database access is forbidden.

## Consequences

### Positive

- Business ownership becomes explicit.
- Tenant isolation can be enforced at the correct boundary.
- Consultation cannot accidentally become a raw source-data query layer.
- Infrastructure can evolve without contaminating domain policy.
- Architecture tests can enforce the dependency rules.

### Negative

- More interfaces and contracts are required.
- Some simple operations will cross application boundaries.
- Early implementation is slower than a shared-model approach.

These costs are accepted because the project is being rebuilt for long-term safety, operational robustness and institutional integration rather than short-term feature velocity.

## Rejected alternatives

### Shared database model across all contexts

Rejected because table ownership and tenant boundaries become implicit and fragile.

### Microservices per context

Rejected at this stage. The architecture remains a modular monolith with workers. Process distribution must be justified later by measured load, failure isolation or organizational requirements.

### UI-first module decomposition

Rejected because UI boundaries do not define domain ownership.
