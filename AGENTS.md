# Agent Contribution Guide

This document is the **shared** instruction layer for AI coding agents (Cursor, Codex, and others) contributing to Vue core. It is derived from established project practice in [`.github/contributing.md`](./.github/contributing.md), [`.github/commit-convention.md`](./.github/commit-convention.md), [`.github/maintenance.md`](./.github/maintenance.md), and from patterns enforced by ESLint, Prettier, Vitest, and git hooks.

Human contributors should continue to follow the Contributing Guide. Agents must follow **both** that guide and the constraints below.

Cursor-specific rules and custom agents live under [`.cursor/`](./.cursor/README.md). Portable workflow skills live under [`.agents/skills/`](./.agents/skills/). Codex-compatible agent copies live under [`.codex/agents/`](./.codex/agents/).

## Canonical sources (do not reinvent)

| Topic | Source of truth |
| --- | --- |
| PR acceptance criteria, package map, scripts, tests | [`.github/contributing.md`](./.github/contributing.md) |
| Commit message format | [`.github/commit-convention.md`](./.github/commit-convention.md) |
| Maintainer review expectations | [`.github/maintenance.md`](./.github/maintenance.md) |
| Syntax / env boundaries | [`eslint.config.js`](./eslint.config.js) |
| Formatting | [`.prettierrc`](./.prettierrc) |
| Compile-time flags | [`packages/global.d.ts`](./packages/global.d.ts) |
| Unexpected-warn test helpers | [`scripts/setup-vitest.ts`](./scripts/setup-vitest.ts) |
| Tree-shaking / size guards | [`scripts/verify-treeshaking.js`](./scripts/verify-treeshaking.js) |

When project docs and this file disagree, prefer the `.github/` docs and tooling configs, then update this file.

## Contribution policy (hard gates)

Agents must **not** open PRs that violate these project norms:

1. **No stylistic-only refactors.** Style-only or subjective readability PRs are discouraged and usually rejected. Change code only when fixing a bug, adding an approved feature, improving measurable performance, or making a clearly justified objective quality improvement tied to the task.
2. **Stay on scope.** Fix or implement only what the task requires. Do not drive-by reformat, rename, or reorganize unrelated code.
3. **Bugs need evidence.** Prefer an open issue with a reproduction, or include a failing test / minimal reproduction in the PR. Do not claim a fix without explaining the broken behavior.
4. **Features need justification.** Widely applicable use cases only. Non-trivial API surface or behavior changes need prior discussion / RFC ([vuejs/rfcs](https://github.com/vuejs/rfcs/discussions)). Do not invent public API.
5. **Size and perf are first-class.** Runtime code is especially size-sensitive. Hot paths (notably `packages/runtime-core/src/renderer.ts` and component init) need extra caution. Prefer the smallest correct change.
6. **Target the right branch.**
   - Bug fixes, chores, most non-API work → `main`
   - New public API surface → `minor`

## Environment and toolchain

- **Package manager:** pnpm only (`preinstall` enforces `only-allow pnpm`). Use the version in `package.json` `packageManager`.
- **Node:** version from `.node-version` (engines: `>=20`).
- **Language:** TypeScript; production bundles via Rollup; unit tests via Vitest.
- **Install:** `pnpm i`
- **Useful scripts:**
  - `pnpm check` — project-wide typecheck (also runs on pre-commit)
  - `pnpm test` / `pnpm test-unit` / `pnpm test-e2e` / `pnpm test-dts`
  - `pnpm test-coverage` — coverage guidance for new code
  - `pnpm build` / `pnpm build-dts`
  - `pnpm lint` / `pnpm format`
  - `pnpm dev`, `pnpm dev-sfc`, `pnpm dev-compiler` — local debug loops

Prefer focused Vitest filters while iterating:

```bash
pnpm test runtime-core
pnpm test <fileNamePattern> -t 'test name'
pnpm test run   # CI-style single run
```

Plain `pnpm test` / `pnpm test-unit` start Vitest in **watch mode** — append `run` to exit in non-interactive sessions.

### Non-obvious gotchas

- **`pnpm dev-sfc` cold-start race.** On a fresh checkout (empty `packages/*/dist`), the first `pnpm dev-sfc` can fail Vite's dep scan before `vue` finishes building. Wait for all `built:` lines, then **restart** `pnpm dev-sfc` once. A page reload is not enough.
- **Commit hooks.** `pre-commit` runs `pnpm lint-staged && pnpm check`; `commit-msg` enforces conventional commits via `scripts/verify-commit.js`. Do not bypass hooks unless explicitly instructed.
- **e2e / browser tests.** `pnpm test-e2e` needs Puppeteer Chromium and Playwright browsers (not downloaded by default). Install with `node node_modules/puppeteer/install.mjs` and `pnpm exec playwright install chromium` when needed.

## Commit and PR conventions

### Commits

Validated by `scripts/verify-commit.js` on `commit-msg`:

```text
type(scope)?: subject   # subject length 1–50, imperative, no trailing period
```

Allowed types: `feat` | `fix` | `docs` | `dx` | `style` | `refactor` | `perf` | `test` | `workflow` | `build` | `ci` | `chore` | `types` | `wip` | `release` (plus `revert: …`).

Common scopes: package or subsystem names such as `runtime-core`, `compiler-core`, `reactivity`, `runtime-dom`, `server-renderer`, `compiler-sfc`, `hydration`, `types`, `ci`, `deps`.

- Imperative mood: "fix" not "fixed".
- Do not capitalize the subject; no trailing `.`.
- Reference issues when fixing: `(fix #1234)` or `close #1234` in the body/footer as appropriate.

### Pull requests

- Title should read like a changelog entry; for fixes include `(fix #xxxx)` when applicable.
- Describe the bug/feature clearly; link issues; include reproduction or point to the new failing test.
- Keep the diff minimal and reviewable.
- Ensure tests pass locally for the affected area before handing off.
- Do not squash/rewrite history unless asked; small WIP commits are fine.

## Monorepo architecture rules

Public packages live under `packages/`; private tooling under `packages-private/`.

```text
compiler-sfc → compiler-dom → compiler-core → shared
                     ↓
vue → runtime-dom → runtime-core → reactivity → shared
```

**Import rules:**

- Import other packages by package name (`@vue/runtime-core`), never via relative paths into another package's `src/`.
- Compiler packages must not import runtime packages, and vice versa (type-only exceptions exist; do not expand them casually).
- Share cross-cutting utilities through `@vue/shared`.
- If package A value-imports or re-exports from B, B must be listed in A's `package.json` dependencies.
- Some `@vue/shared` helpers are **compiler-only** (e.g. `isHTMLTag`, `isSVGTag`) and must not be pulled into runtime builds.

| Area | Typical location |
| --- | --- |
| Public runtime APIs | `packages/runtime-core/src/api*.ts` |
| VDOM / component internals | `packages/runtime-core/src/component*.ts`, `renderer.ts`, `vnode.ts` |
| Reactivity primitives | `packages/reactivity/src/{ref,effect,reactive,computed}.ts` |
| Compiler pipeline | `packages/compiler-core/src/{parse,transform,codegen}.ts` |
| Compiler transforms | `packages/compiler-core/src/transforms/` |
| DOM runtime | `packages/runtime-dom/src/` |
| Unit tests | colocated `__tests__/**/*.spec.ts` |
| DTS tests | `packages-private/dts-test/` |

## Coding conventions agents must preserve

### Formatting (Prettier)

- `semi: false`
- `singleQuote: true`
- `arrowParens: "avoid"`

### ES2016 / bundle constraints (ESLint-enforced in core packages)

Do **not** introduce:

- `const enum` (use non-const enums; the build inlines them)
- Object rest/spread (use `extend` from `@vue/shared`)
- Optional chaining
- `async` / `await`

Prefer `slice` over `substring`. Use `import type` / inline type imports. Prefer `@ts-expect-error` over `@ts-ignore`.

### Environment globals

Most packages are env-agnostic: do not use `window`, `document`, or `require` outside packages that intentionally target DOM or Node (see overrides in `eslint.config.js`).

### Dev / prod / feature flags

Use compile-time constants from `packages/global.d.ts` (`__DEV__`, `__TEST__`, `__BROWSER__`, `__SSR__`, `__COMPAT__`, `__FEATURE_*`, …):

- Wrap warnings and expensive diagnostics in `__DEV__` so they DCE in production.
- Export DEV-only helpers as `(__DEV__ ? impl : NOOP)` when they must exist on the public surface.
- Never let compiler-only or DEV-only code leak into runtime prod builds.

### Errors and warnings

- **Runtime:** `warn()` (DEV-only), `callWithErrorHandling` / `callWithAsyncErrorHandling`, `ErrorCodes`.
- **Compiler:** `createCompilerError(...)` via `context.onError` / `onWarn`; internal `assert()` for invariants.
- Tests that expect warnings must use `toHaveBeenWarned` / `toHaveBeenWarnedLast` / `toHaveBeenWarnedTimes`.

### API visibility

- Public exports go through package `src/index.ts` barrels.
- Mark non-public exports with `/** @internal */` (or `@private`).
- Prefer boring, explicit code over clever abstractions.

## Testing conventions

1. Colocate specs in `__tests__` as `*.spec.ts`.
2. Use the **minimal API surface** needed for the assertion.
3. Platform-agnostic runtime behavior → `@vue/runtime-test` (`nodeOps`, `serializeInner`, `render`, `h`).
4. DOM/hydration/attrs behavior → `@vue/runtime-dom` / `vue`, with `/** @vitest-environment jsdom */` when required.
5. Bug-fix PRs should include a test that fails before the fix and passes after.
6. Snapshot updates alone are insufficient for compiler output; add explicit assertions.
7. Type surface changes need coverage under `packages-private/dts-test` (`pnpm test-dts`).
8. Do not leave focused/disabled Vitest tests.

## Agent workflow checklist

Before coding:

- [ ] Identify the package(s) and whether the change is runtime, compiler, types, or tooling.
- [ ] Confirm the change type: fix / feature / chore / perf — and that it is in-policy.
- [ ] For features with API impact, stop and require RFC / maintainer guidance instead of inventing API.
- [ ] Choose target branch (`main` vs `minor`).

While coding:

- [ ] Match neighboring file style; no broad reformatting.
- [ ] Respect package DAG and import rules.
- [ ] Gate DEV diagnostics with `__DEV__`; consider size on runtime paths.
- [ ] Add or update colocated tests (and dts tests if types change).

Before finishing:

- [ ] `pnpm check` (or rely on hook) is clean for touched types.
- [ ] Relevant `pnpm test …` paths pass.
- [ ] Commit messages match the convention regex.
- [ ] PR description explains motivation, behavior change, and test plan.
- [ ] Diff contains no unrelated churn.

## What “good” looks like

A strong agent PR in this repository is usually:

- A focused bug fix with a regression test, or a small well-justified improvement.
- Minimal lines changed outside the necessary files.
- Commit subjects like `fix(runtime-core): unwind dangling blocks when slot content throws`.
- No formatting-only noise, no new public API without prior discussion, and no dependency edge violations.

When unsure, prefer the smaller change, add a test, and cite the existing pattern you copied from a neighboring file.

## Cursor / Codex package map

| Asset | Path | When it loads |
| --- | --- | --- |
| Shared instructions | `AGENTS.md` (this file) | Always (Cursor, Codex, other AGENTS.md clients) |
| Hard gates + architecture | `.cursor/rules/*.mdc` | Cursor rules (always-apply or by glob) |
| Workflows | `.agents/skills/*/SKILL.md` | On demand when relevant (Agent Skills standard) |
| Specialized roles | `.cursor/agents/*.md` | When delegated / selected |
| Codex agents | `.codex/agents/*.md` | Codex-compatible agent definitions |
