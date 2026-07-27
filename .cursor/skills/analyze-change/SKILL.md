---
name: analyze-change
description: Analyze a Vue Core task before implementation; identify the change archetype, package boundaries, precedents, companion changes, target branch, risks, and validation plan.
disable-model-invocation: false
---

# Analyze change

Plan before editing. Load `references/change-archetypes.md` and `references/repository-map.md` as needed.

## Procedure

1. **Restate the task and evidence.** Separate observed failure, requested outcome, and assumptions.
2. **Classify the archetype.** Choose AR-01–AR-04 (see references) or explain why another class is needed.
3. **Inspect lifecycle state.** Read current branch, upstream refs, package version, and whether API surface implies `minor` or `main`. Do not switch branches.
4. **Map architecture.** Responsible package, adjacent layer, public entry point, dependencies, build formats, feature flags, generated outputs.
5. **Find current precedents.** Current source/tests first; local history only when ambiguity remains.
6. **Build the changed-together map.** Implementation, tests, snapshots, types, docs, external repos, manifests, CI, size, release — required / conditional / N/A.
7. **Create a validation ladder.** Fastest failing test → focused pass → package pass → static checks → only justified broad checks.
8. **Identify human checkpoints.** API acceptance, RFC, target branch, dependency change, external repo, performance/size, release/deploy.
9. **Present an implementation plan.** File- and command-specific, with uncertainties and stop conditions.

## Search strategy

- Read `.github/contributing.md`, `.github/maintenance.md`, root `package.json`, `pnpm-workspace.yaml`, relevant package manifests.
- Search symbols and tests in the responsible package first.
- Inspect public exports/types when API/types may change.
- Use `git log -- <paths>` / blame selectively; do not mine history exhaustively.

Prefer read-only commands (`git status`, `git branch --show-current`, `git diff --stat`, `rg`, file reads). Do not install/build/test until the plan identifies a need.

## Output

```text
Task interpretation
Change archetype
Current branch and recommended upstream target
Responsible package and boundaries
Current precedents inspected
Required companion surfaces
Implementation sequence
Validation ladder
Human checkpoints
Risks, uncertainties, and stop conditions
```

## Escalation

- Stop if the bug cannot be reproduced or public behavior is ambiguous.
- Escalate API/RFC and branch decisions to a human.
- If package ownership remains unclear, ask a bounded maintainer question rather than editing multiple layers.
- If the checkout differs from enablement research, trust the checkout and record the discrepancy.
