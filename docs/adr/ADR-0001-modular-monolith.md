# ADR-0001 — Monolithe modulaire + workers

## Statut
Accepted

## Contexte
CheckMe! doit commencer avec une architecture robuste mais proportionnée à sa maturité. La distribution prématurée augmenterait le coût opérationnel et le couplage réseau.

## Décision
Adopter :

- un monolithe modulaire pour les capacités synchrones ;
- des workers séparés pour les traitements asynchrones ;
- PostgreSQL comme source transactionnelle ;
- Outbox pour la propagation fiable vers les projections ;
- stockage objet S3-compatible pour les artefacts ;
- OIDC/Keycloak pour l'identité administrative.

## Conséquences

Positives : frontières métiers explicites, déploiement simple, transactions locales, testabilité.

Négatives : discipline stricte nécessaire pour empêcher le monolithe de devenir un bloc couplé.

## Alternatives écartées au démarrage

Microservices, Kafka, Redis, Kubernetes, Elasticsearch/OpenSearch.
