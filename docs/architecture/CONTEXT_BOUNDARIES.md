# CheckMe! — Bounded Context & Module Boundaries

**Status:** Architecture proposal — A0.1
**Branch:** `architecture/a0-1-boundaries`

## 1. Purpose

This document defines the first architectural boundaries for the clean CheckMe! implementation. It is normative for dependency direction and module ownership. It does not yet define persistence schemas or implementation classes.

## 2. Core Domain

The Core Domain is the controlled publication and individual consultation lifecycle:

```text
Publication Model
      ↓
Publication
      ↓
Dataset
      ↓
Import / Validation
      ↓
Record
      ↓
Projection
      ↓
Consultation
```

The strategic differentiator is not the public UI. It is the ability to transform institution-owned source data into a governed, versioned, provenance-aware publication and a controlled consultation projection.

## 3. Bounded Contexts

### 3.1 Identity & Access

**Responsibility:** authentication identity, administrative roles, session/token integration, authorization primitives.

**Owns:** external identity references, role/permission mapping, access policies.

**Must not own:** organization business data or publication records.

### 3.2 Organization

**Responsibility:** organization tenancy and organizational membership.

**Owns:** organization identity, status, membership relationships and tenant boundaries.

**Key invariant:** every tenant-owned aggregate has an explicit organization boundary unless explicitly classified as global infrastructure data.

### 3.3 Publication Model

**Responsibility:** declaration of the data shape and public consultation contract.

**Owns:** model version, fields, identifier declaration, publication-facing visibility rules.

**Must not:** directly import source files or execute transport concerns.

### 3.4 Publication

**Responsibility:** publication lifecycle and authority state.

**Owns:** publication identity, organization ownership, lifecycle state, publication metadata, version references.

**Key invariant:** a publication cannot expose a dataset that is not in an explicitly publishable state.

### 3.5 Dataset & Import

**Responsibility:** source dataset ingestion, validation, import jobs and import outcomes.

**Owns:** dataset identity, source metadata, content checksum, import state, validation errors and processing status.

**Boundary:** source artifacts remain separate from public projections.

### 3.6 Record

**Responsibility:** normalized domain records produced from an accepted dataset.

**Owns:** record identity, publication/dataset association, declared identifier values and domain payload according to the publication model.

**Key invariant:** records are never exposed directly as an unrestricted public data store.

### 3.7 Projection & Consultation

**Responsibility:** build and serve the read model intended for beneficiary consultation.

**Owns:** projection version/state, queryable lookup representation and public response shaping.

**Boundary:** consultation reads a projection; it does not bypass the publication contract to query arbitrary source tables.

### 3.8 Platform / Infrastructure

**Responsibility:** technical capabilities shared by contexts.

**Includes:** PostgreSQL adapter, object storage, Outbox, message/job dispatch, telemetry, configuration, cryptographic utilities and external identity adapters.

**Rule:** infrastructure implements ports; it does not define Core Domain policy.

## 4. Context Map

```text
Identity & Access ──────┐
                        │ authorization / identity
Organization ───────────┤
                        ▼
                 Publication Model
                        │ model contract
                        ▼
                   Publication
                        │ publication context
                        ▼
                  Dataset & Import
                        │ accepted dataset
                        ▼
                     Record
                        │ source for read model
                        ▼
               Projection & Consultation
```

Infrastructure is transversal and must remain behind ports.

## 5. Dependency Rules

Allowed:

```text
Interface adapter → Application → Domain
Infrastructure adapter → Application/Domain ports
Contracts → primitive/shared contract types only
```

Forbidden:

```text
Domain → framework
Domain → ORM
Domain → HTTP
Domain → PostgreSQL
Domain → Keycloak
Application → concrete infrastructure adapter
Context A → Context B database tables
Consultation → source/import tables directly
```

Cross-context communication must use an explicit application contract, domain event, or integration event. Direct repository/table access across contexts is prohibited.

## 6. Ownership Rule

Each business concept has one authoritative owner.

```text
Organization       → Organization context
PublicationModel   → Publication Model context
Publication        → Publication context
Dataset/Import     → Dataset & Import context
Record             → Record context
Projection         → Projection & Consultation context
Identity           → Identity & Access context
```

A context may reference another context by stable identifier or contract; it must not duplicate the other's authoritative lifecycle.

## 7. First Implementation Slice

The first code slice must implement only the architectural foundation required to prove these boundaries. No business context is considered implemented until its ownership, public API, persistence boundary, tests and failure behavior are defined.

## 8. Decision Gate

A0.1 is complete when:

- all Core Domain boundaries are documented;
- ownership is unambiguous;
- forbidden dependencies are mechanically testable;
- no context requires direct table access to another context;
- the first vertical slice can be selected without changing these boundaries.
