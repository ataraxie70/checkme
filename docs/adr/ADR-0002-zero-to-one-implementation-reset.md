# ADR-0002 — Reprise sur une nouvelle base d'implémentation

## Statut
Accepted

## Décision
La nouvelle implémentation ne réutilise pas les chemins opérationnels de l'ancien dépôt lorsque leur audit a identifié des défauts de composition, de sécurité ou de cohérence.

L'ancienne base reste une référence historique pour :
- comprendre les décisions ;
- récupérer des éléments métier validés ;
- comparer les écarts.

Elle n'est pas copiée comme squelette technique.

## Principe

```text
Architecture
  -> contracts
  -> domain
  -> application
  -> infrastructure
  -> interfaces
  -> integration
  -> E2E
```

Chaque couche est validée avant l'ajout de la suivante.
