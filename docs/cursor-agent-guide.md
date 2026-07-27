# Cursor Agent Guide (Vue Core)

## Purpose

Help Cursor Agent contribute to this repository the way maintainers expect: find the right package layer, identify companion changes, run proportionate validation, review omissions, and hand off a multi-role summary.

## Non-goals

- Not an onboarding wizard or chat wrapper.
- Not a replacement for `.github/contributing.md` / `.github/maintenance.md`.
- Not autonomous branching, committing, PR creation, merge, release, or deploy (unless a human explicitly requests those actions).
- Not MCP, hooks, or CI-hosted Cursor agents in this MVP.

## Implemented structure

```text
.cursor/
├── agents/
│   └── convention-reviewer.md
├── rules/
│   ├── vue-core-basics.mdc          # alwaysApply
│   ├── package-boundaries.mdc       # globs: packages/**
│   ├── tests-and-validation.mdc     # globs: tests/snaps/workflows
│   └── public-api-and-release.mdc   # intelligent / description-selected
└── skills/
    ├── analyze-change/
    ├── implement-vue-core-change/
    ├── review-change/
    └── prepare-contribution/
```

See also `CURSOR_SPEC_RECONCILIATION.md` and `CURSOR_AGENT_IMPLEMENTATION_REPORT.md` at the repository root.

## How rules are selected

| Rule | Selection |
| --- | --- |
| `vue-core-basics` | Always |
| `package-boundaries` | When package sources/manifests are in context |
| `tests-and-validation` | When tests, snapshots, dts tests, or workflows are in context |
| `public-api-and-release` | When the task involves public API, types, docs, compatibility, or release |

Rules reference canonical docs instead of copying them. Prefer updating `.github/*` and pointing rules at those paths.

## Skills and example invocations

| Skill | When | Example |
| --- | --- | --- |
| `analyze-change` | Before non-trivial work | “Plan a fix for … which packages/tests are involved?” |
| `implement-vue-core-change` | After a plan / scoped task | “Implement the plan with a focused regression test.” |
| `review-change` | After implementation | “Review this diff for missing companion changes.” |
| `prepare-contribution` | Explicit only (`disable-model-invocation: true`) | `/prepare-contribution` or “Prepare the contribution summary.” |

Skills load detailed checklists from their `references/` directories progressively.

## Subagent

`convention-reviewer` is a **read-only, foreground** subagent. The parent should pass the input contract (task intent, diff, validation record, branch/RFC status). It looks for omissions the implementing context may miss (analogous call paths, snapshot-only proof, wrong test environment, API/branch risk).

## Required repository commands

Use the repo-declared pnpm/Node. Common commands:

```bash
pnpm install                 # when deps missing; prefer --frozen-lockfile for repro
pnpm test <pattern> --run    # focused unit tests
pnpm test-unit --run
pnpm check                   # tsc --noEmit
pnpm lint
pnpm format-check
pnpm test-dts                # public type / declaration changes
pnpm build <package>
pnpm test-e2e                # only when justified
pnpm size                    # size-sensitive changes
```

Confirm flags against the checkout. Append `run` / `--run` so Vitest exits in non-interactive sessions.

## Safety and autonomy

- No secrets access; no dependency/lockfile changes without explicit approval.
- No hand-editing generated `dist` / snapshots / rolled dts to force green.
- Report every skipped/failed/unavailable check with consequence.
- Git writes, PR, merge, release, deploy require explicit human request.

## Representative demo (dry-run)

Spec scenario: compiler-SFC static property key resolution (historical PR #13998).

Normal ask:

> Fix compiler-sfc so numeric property keys and template-literal keys without expressions are resolved as static keys in type-based props. Keep dynamic template-literal behavior unchanged, add the smallest meaningful regression tests, and prepare the change for review without committing or pushing.

Expected flow: `analyze-change` → `implement-vue-core-change` → `review-change` (+ `convention-reviewer`) → `/prepare-contribution`.

**Do not** reintroduce the bug into product `main` solely to demo. Prefer a historical checkout, a disposable branch, or a walkthrough against the already-fixed code paths (`packages/compiler-sfc/src/script/resolveType.ts`, `utils.ts`, `resolveType.spec.ts`) while exercising the omission case (e.g. `findStaticPropertyType`) as a review drill.

### Manual smoke test (Cursor UI)

1. Open the repo in Cursor.
2. Confirm Project Rules lists the four `.mdc` files; `vue-core-basics` always on.
3. In Agent chat, type `/` and confirm the four skills appear.
4. Confirm Custom agents lists `convention-reviewer`.
5. Ask: “Using analyze-change, plan a focused runtime-core bug fix for …” and verify the structured analysis output.
6. Do not enable auto-commit/push for the drill.

### Cursor CLI smoke test (if installed)

```bash
cursor --version   # or agent --version
# Ask/Plan mode only; no writes
```

If CLI is unavailable, rely on static validation and the UI steps above.

## Maintainer updates

1. Change canonical docs/scripts first (`.github/*`, Vitest, workflows).
2. Update the smallest Cursor artifact that points at them (usually a reference file).
3. Keep `vue-core-basics.mdc` short; put procedures in skills.
4. Promote observed patterns to rules only after repeated evidence.
5. Remove artifacts that merely restate ESLint/Prettier/CI without aiding judgment.
6. Keep `convention-reviewer` single-purpose and read-only.

## Known limitations

- Heuristic companion-change detection can miss rare paths.
- Runtime Cursor discovery is environment-dependent.
- Full CI parity (Windows compiler matrix, e2e browsers, size bots) may be unavailable locally.
- API/RFC/branch decisions remain human.

## Optional future extensions

Bugbot, Cursor CLI in CI, hooks for audit-only validation logging, `AGENTS.md` for cross-tool portability, MCP only if an external system becomes essential.
