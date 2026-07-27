# Cursor Agent Implementation Report

## 1. Outcome

Implemented the repository-level Cursor MVP for Vue Core per `CURSOR_PROJECT_ENABLEMENT_SPEC.md`, after reconciling research against this checkout and replacing an earlier overbuilt package on the same branch.

Primary experience delivered: a new engineer can ask Cursor Agent for a normal fix/feature; always-on + scoped rules constrain behavior; skills drive analyze → implement → review → contribution summary; one read-only subagent provides independent convention review.

## 2. Repository Findings

- Vue Core monorepo at version `3.5.40`; pnpm `11.13.0`; Node engines `>=20`; `.node-version` is `lts/*` (not a numeric pin).
- Canonical contribution docs live under `.github/` (`contributing.md`, `maintenance.md`, `commit-convention.md`).
- `main` has no `.cursor/`, no root `AGENTS.md`, no `CODEOWNERS`, no `.coderabbit.yaml`.
- CI: `.github/workflows/test.yml` (+ size/release workflows). Local equivalents: `pnpm test*`, `pnpm check`, `pnpm lint`, `pnpm format-check`, `pnpm test-dts`, `pnpm size`.
- Demo-relevant paths for historical PR #13998 still exist: `packages/compiler-sfc/src/script/{resolveType,utils}.ts` including `typeElementsToMap` and `findStaticPropertyType`.

## 3. Specification Reconciliation

See [`CURSOR_SPEC_RECONCILIATION.md`](./CURSOR_SPEC_RECONCILIATION.md).

Material corrections: rejected MVP `AGENTS.md` and prior multi-agent/`.codex` overbuild; noted `.node-version` = `lts/*`; narrowed the live demo so product code is not intentionally broken; documented that Cursor Cloud git/PR workflow overrides the Codex prompt’s local no-push default for this environment.

## 4. Implemented Cursor Package

| Path | Primitive | Purpose | Trigger or Scope | Evidence |
|---|---|---|---|---|
| `.cursor/rules/vue-core-basics.mdc` | Rule | Universal contribution + safety | `alwaysApply: true` | Spec §7.1 |
| `.cursor/rules/package-boundaries.mdc` | Rule | Package DAG / imports / hot path | globs on packages + aliases | Spec §7.2; contributing guide |
| `.cursor/rules/tests-and-validation.mdc` | Rule | Tests, snapshots, dts, validation ladder | globs on tests/snaps/workflows | Spec §7.3 |
| `.cursor/rules/public-api-and-release.mdc` | Rule | API / branch / RFC / release | description-selected | Spec §7.4 |
| `.cursor/skills/analyze-change/` | Skill | Pre-implementation analysis | auto-invocable | Spec §8.1 + refs |
| `.cursor/skills/implement-vue-core-change/` | Skill | Focused implementation + validation | `paths: packages/**` | Spec §8.2 + checklist |
| `.cursor/skills/review-change/` | Skill | Diff readiness + subagent orchestration | auto after implement / on ask | Spec §8.3 + matrix |
| `.cursor/skills/prepare-contribution/` | Skill | Multi-role contribution summary | `disable-model-invocation: true` | Spec §8.4 / §12 |
| `.cursor/agents/convention-reviewer.md` | Subagent | Independent omission-focused review | readonly, foreground | Spec §9 |
| `docs/cursor-agent-guide.md` | Docs | Usage + maintenance | human/agent | Spec §13 / prompt Phase 8 |
| `CURSOR_SPEC_RECONCILIATION.md` | Docs | Research vs checkout | maintainers | Prompt Phase 2 |
| `CURSOR_AGENT_IMPLEMENTATION_REPORT.md` | Docs | This report | maintainers | Prompt Phase 10 |

## 5. Agent Behavior

1. **Analyze** — classify archetype, map package boundaries, precedents, companion surfaces, validation ladder, human checkpoints.
2. **Implement** — smallest failing test when feasible; narrow layer; existing commands; no generated-output hand edits.
3. **Review** — reconstruct archetype from diff; validation matrix; delegate to `convention-reviewer`.
4. **Prepare** — explicit `/prepare-contribution` produces engineering/QA/product/release handoff.
5. **Safety** — honest validation reporting; no secrets; no autonomous publish/merge/deploy.

## 6. Representative Demo

| Item | Detail |
|---|---|
| Task | Historical compiler-sfc static key resolution (PR #13998 shape) |
| Rules | basics, package-boundaries, tests-and-validation; public-api may attach but should conclude “bug fix” |
| Skills | analyze → implement → review → prepare |
| Subagent | Should catch omitted `findStaticPropertyType` path if only `typeElementsToMap` is updated |
| Intentional omission drill | Documented in `docs/cursor-agent-guide.md`; **not** applied to live product code in this run |
| Result this environment | Structural package ready; runtime Cursor discovery and live omission drill **not** executed |

## 7. Validation Results

| Command or Check | Result | Evidence | Limitations |
|---|---|---|---|
| Structural: `.mdc` rules in `.cursor/rules/` | Passed | Tree listing | — |
| Structural: skill folders/`SKILL.md`/name match | Passed | Python frontmatter check | — |
| Structural: subagent Markdown + frontmatter | Passed | File present | — |
| Reference files exist | Passed | All `references/*` present | — |
| Demo source paths exist | Passed | `resolveType.ts` / `utils.ts` / spec file | Bug already fixed upstream |
| `pnpm lint` / `pnpm check` / unit tests | Not run for this docs-only change | N/A | No product TS edited |
| Cursor CLI discovery smoke test | Unavailable / not verified | `which cursor` / `agent` empty | Manual UI steps documented |
| Live behavioral omission drill | Not executed | Would require historical checkout or temporary fixture | Avoided product-behavior demo edits |

Never claim CI or Cursor runtime discovery passed — they were not executed here.

## 8. Deviations From the Research Specification

- Removed/replaced prior branch artifacts (`AGENTS.md`, persona agents, `.codex/`, `.agents/`) that conflicted with MVP.
- Did not reintroduce a historical bug for a live demo; documented dry-run instead.
- Continued cloud-agent PR updates despite Codex prompt’s local “do not open PR” default (environment requirement).
- Kept contribution summary template in skill references rather than adding a new PR template file (repo has none).

## 9. Maintenance Guidance

1. Update `.github/*` and scripts first when policy/commands change.
2. Adjust the smallest Cursor reference/rule that points at them.
3. Keep always-apply rule short; put workflows in skills.
4. Promote patterns to rules only after repeated evidence.
5. Retain a single read-only reviewer subagent unless a new independent-context need is proven.
6. Delete stale artifacts that restate deterministic lint/CI without aiding judgment.

## 10. Deferred Extensions

Hooks, MCP, `AGENTS.md` for cross-tool portability, Bugbot, Cursor CLI in CI — only if evidence shows a concrete gap after MVP use.

## 11. Known Limitations

- Companion-change review is heuristic.
- Cursor runtime discovery not verified in this environment.
- Local validation may omit Windows compiler jobs, e2e browsers, size bots, and ecosystem CI.
- API/RFC/branch/release decisions remain human.
- Fork cloud workflow may grant broader git autonomy than the research safety defaults; humans must still gate merge/release.
