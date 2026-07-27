---
name: prepare-pr
description: Prepare a Vue core pull request — conventional commits, checklist against contributing policy, focused test plan, and PR title/body. Use when finishing work, opening a PR, or polishing commits for review.
---

# Prepare PR

## Checklist

- [ ] Diff is scoped to the task (no unrelated refactors/formatting).
- [ ] Policy OK: evidence for bugs; no new public API without RFC; size/perf considered.
- [ ] Tests added/updated for the behavior; relevant `pnpm test … run` passes.
- [ ] `pnpm check` clean if types were touched.
- [ ] Commit messages match `type(scope)?: subject` (subject 1–50 chars, imperative, no trailing `.`).
- [ ] Target branch correct (`main` vs `minor`).

## PR title

Changelog-style; for fixes include `(fix #xxxx)` when applicable.

Examples:

- `fix(runtime-core): unwind dangling blocks when slot content throws (fix #1234)`
- `test(compiler-core): cover v-if + slot edge case`

## PR body template

```markdown
## Summary

<!-- What problem and why this approach. Link issues. -->

## Test plan

- [ ] `pnpm test <area> run`
- [ ] <!-- repro steps or pointer to new failing-then-passing test -->
```

## Notes

- Small WIP commits are fine; do not rewrite history unless asked.
- Tick "Allow edits from maintainers" when opening from a fork (upstream Vue process).
