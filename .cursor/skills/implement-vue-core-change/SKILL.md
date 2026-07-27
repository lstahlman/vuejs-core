---
name: implement-vue-core-change
description: Implement an approved Vue Core change using current package precedents, focused tests, repository boundaries, and proportionate validation.
paths:
  - "packages/**"
  - "packages-private/**"
disable-model-invocation: false
---

# Implement Vue Core change

Use after an accepted plan (or a sufficiently scoped task). See `references/implementation-checklist.md`.

## Preconditions

- Accepted plan or clear scoped task.
- Confirmed responsible package.
- Human decision for public API / RFC / branch when relevant.
- Working tree inspected; preserve unrelated user changes.

## Procedure

1. Confirm files to touch and unrelated working-tree changes to preserve.
2. Add or isolate the smallest failing regression/feature test when feasible.
3. Implement in the narrowest correct layer; preserve package and compiler/runtime boundaries.
4. Reuse current nearby patterns; do not introduce abstractions without demonstrated need.
5. Update required negative / warning / dev-prod cases.
6. Generate snapshots or declaration artifacts through canonical commands; review every generated diff.
7. Run the focused validation command (verify flags against checked-out scripts).
8. Expand per the approved validation ladder.
9. Review the diff for accidental formatting, generated output, dependency, or public export changes.
10. Hand off to `review-change`; do not self-declare completion from the implementing context alone.

## Common commands (verify against checkout)

```bash
pnpm test <file-or-pattern> --run
pnpm test-unit --run <pattern>
pnpm check
pnpm lint
pnpm format-check
pnpm test-dts          # or pnpm test-dts-only after a current build
pnpm build <package>
pnpm test-e2e          # only when justified; browsers may need install
pnpm size              # size-sensitive / runtime public changes
```

## Output

```text
Files changed
Behavior implemented
Tests added or changed
Generated output produced by commands
Validation run and result
Remaining validation
Deviations from the accepted plan
Human decisions still required
```

## Escalation

- Do not broaden scope to fix unrelated failures.
- Stop if implementation reveals an unapproved API, dependency, branch, cross-repo, or release decision.
- Never weaken assertions to mask failures without proving expectations changed intentionally.
