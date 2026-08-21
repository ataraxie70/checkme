# CheckMe! — Architecture Baseline

## Statut

Baseline de la nouvelle implémentation. L'ancien code reste historique et n'est pas la source de vérité technique.

## Déploiement cible initial

```text
Internet
   |
Reverse Proxy
   |
+--------------------------+
| Monolithe modulaire      |
| - API organisme          |
| - API intégration        |
| - API consultation       |
+------------+-------------+
             |
   +---------+---------+----------------+
   |                   |                |
PostgreSQL           Outbox      Object Storage
   |                   |
   +-------------------+
           |
        Workers
           |
      Projection
```

## Règles

- Monolithe modulaire au départ.
- Workers asynchrones pour les charges non synchrones.
- PostgreSQL comme source transactionnelle.
- Consultation séparée par projection reconstruisible.
- Isolation organisationnelle traitée comme contrainte de modèle et de sécurité.
- Aucun accès direct aux tables d'un autre module.
- Aucun organisme ne bénéficie d'un chemin de code spécifique au Core Domain.
- Recherche PostgreSQL-first au MVP.
- Pas de microservices, Kafka, Redis, Kubernetes ou moteur de recherche spécialisé sans preuve par métriques.

## Structure

```text
apps/
  api/          # interfaces HTTP administration/intégration/consultation
  web/          # interfaces Next.js
  worker/       # traitement asynchrone

packages/
  domain/       # entités, value objects, invariants, ports métier
  application/  # cas d'utilisation, orchestration, ports applicatifs
  infrastructure/ # PostgreSQL, outbox, object storage, OIDC adapters
  contracts/    # DTO et contrats externes versionnés
  config/       # configuration typée
  observability/# telemetry, logging, metrics
  ui/           # composants partagés
  tooling/      # outillage de développement

infra/
  compose/
  postgres/
  keycloak/
  object-storage/

docs/
  architecture/
  adr/

tests/
  architecture/
  integration/
  e2e/
```

## Direction des dépendances

```text
interfaces -> application -> domain
infrastructure -> application/domain
contracts -> aucune dépendance au métier concret
```

Le domaine ne dépend d'aucun framework, ORM, transport ou fournisseur.
