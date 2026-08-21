# Dependency Rules

## Autorisé

- `apps/api` peut dépendre de `application`, `contracts`, `config`, `observability`.
- `apps/web` peut dépendre de `contracts` et `ui`.
- `apps/worker` peut dépendre de `application`, `infrastructure`, `config`, `observability`.
- `application` peut dépendre de `domain`.
- `infrastructure` peut implémenter les ports définis par `application` ou `domain`.

## Interdit

- `domain` -> NestJS
- `domain` -> Next.js / React
- `domain` -> TypeORM/Prisma/Drizzle/pg
- `domain` -> HTTP
- `domain` -> Keycloak
- `application` -> détails d'un framework HTTP
- `web` -> accès PostgreSQL
- `api` -> requêtes SQL directes
- un module -> tables SQL d'un autre module

## Règle de décision

Toute violation nécessite un ADR explicite et une justification d'architecture.
