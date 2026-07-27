---
name: review-change
description: Review the current Vue Core diff against repository conventions, companion-change expectations, validation requirements, and contribution readiness.
disable-model-invocation: false
---

# Review change

Use after implementation or when asked for readiness. Load `references/validation-matrix.md` and `references/review-severity.md`. Prefer delegating a clean-context pass to the `convention-reviewer` subagent.

## Procedure

1. Reconstruct the change archetype from task and diff (do not trust the implementation label alone).
2. Map changed files to expected companion surfaces.
3. Check package / import / dependency boundaries.
4. Check tests: reproduction, minimal API, semantic assertions, negative cases, types, environment choice.
5. Check public API, branch, RFC, docs/language-tools, compatibility, size, and ecosystem implications.
6. Check generated outputs and lockfile/config changes for canonical generation and scope.
7. Compare validation performed against the risk-based matrix.
8. Delegate to `convention-reviewer` with the input contract from that agent file.
9. Merge findings; classify blocking / warning / informational.
10. Recommend the smallest next action for each blocker.

## Commands (read-only git + targeted checks)

```bash
git diff --check
git diff --stat
git diff --name-only
# plus focused tests / static checks from the validation matrix
```

No git write operations.

## Output

```text
Readiness: ready / ready with warnings / not ready
Blocking findings
Warnings
Confirmed companion surfaces
Validation coverage and gaps
Branch/RFC/docs/release checkpoints
Suggested next commands
Evidence inspected
```

Each finding needs evidence, consequence, and recommended action. Absence of findings is not proof that CI will pass.

## Escalation

- If task intent is unavailable, review observable correctness but mark requirements coverage unknown.
- Separate unrelated working-tree changes; do not approve combined scope.
- If the subagent cannot run, perform the checklist here and report loss of independent review.
