# Main branch protection policy

## Objective

`main` is the protected integration branch. Direct changes are not part of the normal development flow.

## Required GitHub rules

Configure a branch ruleset for `main` with:

- require a pull request before merging;
- require at least 1 approving review;
- dismiss stale approvals when new commits are pushed;
- require conversation resolution before merge;
- require the `Foundation checks` status check;
- require branches to be up to date before merge;
- block force pushes;
- block branch deletion;
- do not allow bypassing these rules for normal repository administration.

## Required status check

The required CI check is the `Foundation checks` job from `.github/workflows/ci.yml`.

It must pass:

1. lockfile verification;
2. dependency installation;
3. architecture checks;
4. lint;
5. typecheck;
6. tests;
7. build.

## Operational rule

A failing CI check is a release/integration blocker. Do not bypass it by merging manually or force-pushing `main`.
