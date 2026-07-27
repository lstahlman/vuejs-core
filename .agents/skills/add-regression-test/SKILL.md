---
name: add-regression-test
description: Add a focused Vue core regression test (runtime-test or DOM/jsdom) that fails before a fix and passes after. Use when writing tests, reproducing bugs, or improving coverage for a change.
---

# Add regression test

## Rules of thumb

- Colocate under the package's `__tests__/` as `*.spec.ts`.
- Prefer the **smallest** harness that proves the behavior.
- Platform-agnostic → `@vue/runtime-test`.
- DOM/hydration/attrs → `@vue/runtime-dom` / `vue` + jsdom env comment when needed.
- Compiler → assert generated code with explicit matchers, not snapshot-only updates.
- Types → `packages-private/dts-test` + `pnpm test-dts`.

## Steps

1. Name the behavior under test in one sentence (what broke / what must hold).
2. Find a neighboring spec and copy its imports/setup style.
3. Write the failing assertion first; run `pnpm test <fileNamePattern> -t '…' run` to confirm red.
4. After the fix, confirm green with the same filter.
5. If the code under test emits warnings, assert with `toHaveBeenWarned` / `toHaveBeenWarnedLast` / `toHaveBeenWarnedTimes`.
6. Do not leave `.only` / `.skip`.

## Anti-patterns

- Tests that only chase coverage numbers without asserting behavior.
- Broad integration tests when a unit/`runtime-test` case would do.
- Snapshot noise without an explicit expectation of the important fragment.
