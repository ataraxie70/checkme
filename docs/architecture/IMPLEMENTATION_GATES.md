# Implementation Gates

Une brique ne peut passer à l'état suivant que si elle satisfait les quatre niveaux :

1. **Designed** — décision documentée.
2. **Implemented** — code présent et conforme.
3. **Verified** — validation automatisée exécutée.
4. **Operational** — comportement validé dans l'environnement cible.

## Gate architecture

Avant toute fonctionnalité métier :

- [ ] monorepo cohérent
- [ ] lockfile présent
- [ ] build reproductible
- [ ] règles de dépendance testées
- [ ] configuration centralisée
- [ ] environnement local reproductible
- [ ] CI minimale
- [ ] logs et healthchecks de base

## Gate de sécurité

- [ ] identité administrative
- [ ] contexte d'organisation
- [ ] autorisation
- [ ] tests négatifs cross-tenant
- [ ] secret management
- [ ] filtrage des données publiques
