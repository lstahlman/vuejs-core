---
name: fix-bug
description: End-to-end workflow for fixing a Vue core bug with evidence, a regression test, minimal diff, and conventional commits. Use when fixing bugs, investigating regressions, or addressing open issues.
---

# Fix bug

## Preconditions

- Identify the bug with an open issue **or** a minimal failing test / reproduction.
- Confirm the change is in-policy (not a stylistic refactor; not a new public API).
- Target branch: usually `main`.

## Workflow

1. **Reproduce**
   - Prefer a colocated `__tests__/*.spec.ts` that fails first.
   - Use `@vue/runtime-test` for platform-agnostic runtime bugs; jsdom/`runtime-dom` for DOM-specific ones.
   - For playground-shaped bugs, use `pnpm dev-sfc` (restart once after cold start).

2. **Locate**
   - Stay inside the owning package; respect the compiler ↛ runtime DAG.
   - Search neighboring tests and recent commits for the established pattern.

3. **Fix minimally**
   - Smallest correct change; match local style; no unrelated edits.
   - Gate diagnostics with `__DEV__`; watch runtime bundle size on hot paths.
   - Do not introduce optional chaining, object rest/spread, `async`/`await`, or `const enum` in core packages.

4. **Verify**
   - Confirm the new test fails before the fix and passes after.
   - `pnpm test <area> run` (and `pnpm check` if types touched).
   - Expected warnings must use `toHaveBeenWarned*` matchers.

5. **Ship shape**
   - Commit: `fix(<scope>): <imperative subject>` (≤50 char subject).
   - PR title includes `(fix #xxxx)` when applicable.
   - Use `/prepare-pr` before handoff.

## Stop conditions

- Bug is actually a feature request / API change → pause for RFC / maintainer guidance.
- Fix requires large architectural churn for a niche edge case → revisit approach or minimize cost.
