---
name: onboard-contributor
description: Orient a new contributor (human or agent) to Vue core — package map, scripts, hard gates, and a first safe contribution path. Use when onboarding, exploring the repo for the first time, or asking how to contribute.
---

# Onboard contributor

## Goal

Get a new engineer productive quickly with **high-quality, in-policy** contributions — not a tour of every file.

## Steps

1. Read root [`AGENTS.md`](../../../AGENTS.md) and skim [`.github/contributing.md`](../../../.github/contributing.md) PR guidelines.
2. Summarize for the user (short):
   - Hard gates (no style-only PRs, evidence for bugs, RFC for API, size/perf).
   - Package DAG and which packages own runtime vs compiler vs reactivity.
   - How to install and verify: `pnpm i`, `pnpm check`, `pnpm test-unit run`.
3. Map their goal to a package:
   - Reactivity / refs / effects → `packages/reactivity`
   - Components / VDOM / scheduler → `packages/runtime-core`
   - DOM attrs / events / custom elements → `packages/runtime-dom`
   - Template compile / transforms → `packages/compiler-core` (+ `compiler-dom` / `compiler-sfc`)
   - SSR → `packages/server-renderer`
4. Recommend a **first contribution shape**:
   - Best: focused bug fix + regression test against an open issue.
   - Avoid: broad refactors, new public API, drive-by formatting.
5. Point at local debug loops:
   - Runtime/SFC repro → `pnpm dev-sfc` (restart once after cold `dist` build).
   - Compiler → `pnpm dev-compiler`.
6. Hand off to `/fix-bug` or `/add-regression-test` when they have a concrete issue.

## Output

A concise orientation (package to touch, commands to run, policy reminders) — not a dump of the whole contributing guide.
