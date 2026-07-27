# Cursor Specification Reconciliation

## Summary

Reconciled `CURSOR_PROJECT_ENABLEMENT_SPEC.md` (research hypothesis, 2026-07-27, Vue Core `3.5.40`) against this checkout of `lstahlman/vuejs-core` (fork of `vuejs/core`, currently on feature branch `cursor/agent-package-enablement-e503`).

An earlier cloud-agent attempt on this branch shipped an overbuilt package (`AGENTS.md`, multiple persona agents, `.codex/` / `.agents/` mirrors). That tree is **replaced** by the research MVP shape: four rules, four skills (with references), one read-only `convention-reviewer` subagent, plus usage/report docs.

## Material Decisions

| Spec Item | Repository Evidence | Decision | Reason | Implementation Impact |
|---|---|---|---|---|
| MVP tree: 4 rules, 4 skills, 1 subagent | Spec §1 / §13; no prior `.cursor/` on `main` | Accept | Matches prompt bounds and repo needs | Implemented under `.cursor/` |
| One always-apply core rule | Spec §7.1 | Accept | Keep universal constraints short | `vue-core-basics.mdc` only `alwaysApply: true` |
| No hooks / MCP in MVP | Existing `simple-git-hooks` + CI workflows | Accept | Deterministic enforcement already present | No `.cursor/hooks.json` / `mcp.json` |
| No `AGENTS.md` in MVP | Spec excludes it; fork draft PRs #1/#2 added one | Modify → Reject for this package | Avoid duplicating `.cursor/rules`; public baseline has none | Removed `AGENTS.md` from this branch |
| No `.codex/` / portable `.agents/` mirrors in MVP | Spec focuses on Cursor paths; skills under `.cursor/skills/` | Reject prior overbuild | Prompt prefers `.cursor/skills/<name>/SKILL.md` | Removed `.codex/` and `.agents/` |
| Multiple persona agents (engineer/QA/PM) | Spec: one `convention-reviewer` only | Reject | Skills cover procedures; extra agents add noise | Single subagent only |
| Scripts in MVP | Spec: reuse pnpm/Vitest/tsc/eslint | Accept | No new deterministic scripts needed | Skills reference existing commands |
| `.node-version` is numeric | Checkout has `lts/*` | Modify | Spec assumed pinned numeric Node; engines still `>=20` | Core rule cites declared files, not a hard-coded number |
| `CODEOWNERS` absent | Confirmed none in checkout | Accept | No ownership claims in artifacts | Reviews escalate to human maintainers |
| Codex prompt: do not push/open PR | Cursor Cloud agent workflow requires commit/push/PR | Modify | Environment policy overrides local Codex default for this run | Continue updating existing draft PR #3 |
| Demo: restore pre-#13998 bug | Live product code must not be broken for demo | Narrow | Spec forbids modifying product behavior solely to demo | Documented as dry-run / historical scenario; no intentional bug reintroduction |
| `pnpm test … --run` vs `pnpm test run` | Both used in docs/scripts; Vitest accepts CLI options | Accept with verify-on-use | Skills say verify flags against checkout | Validation matrix notes both forms |

## Corrected Project Baseline

- **Repo:** Vue Core monorepo, pnpm workspaces `packages/*` + `packages-private/*`, version `3.5.40`.
- **Tooling:** `packageManager: pnpm@11.13.0`, Node `engines >=20`, `.node-version` = `lts/*`.
- **Branches:** `main` (default) and `minor` for new API surface (per contributing guide).
- **Tests:** Vitest projects via `vitest.config.ts`; CI in `.github/workflows/test.yml` (+ size/release workflows).
- **Agent config on `main`:** none. This branch now owns the MVP Cursor package only.
- **No** public `CODEOWNERS` or checked-in `.coderabbit.yaml`.

## Corrected Convention Set

Retained high-confidence conventions from the research inventory (architecture boundaries, import rules, test placement, snapshot semantic assertions, dts tests, `__DEV__` gating, contribution/PR policy, safety boundaries). Did **not** elevate single-PR observations into mandatory rules.

## Corrected Cursor Architecture

```text
.cursor/
  rules/          # 1 always-apply + 3 scoped/intelligent
  skills/         # analyze / implement / review / prepare
  agents/         # convention-reviewer only
docs/cursor-agent-guide.md
CURSOR_SPEC_RECONCILIATION.md
CURSOR_AGENT_IMPLEMENTATION_REPORT.md
```

Facts → rules; procedures → skills; independent judgment → one read-only subagent; deterministic checks → existing repository commands.

## Deferred or Rejected Recommendations

| Item | Disposition |
|---|---|
| Hooks | Deferred (no MVP enforcement gap) |
| MCP | Rejected for MVP |
| `AGENTS.md` | Rejected for MVP (may revisit for cross-tool portability) |
| Cursor CLI CI / Bugbot | Deferred |
| Historical-analysis platform | Rejected |
| Extra persona subagents / `.codex` mirrors | Rejected (prior overbuild) |
| New validation scripts | Deferred; reuse pnpm scripts |

## Remaining Uncertainties

- Cursor IDE/CLI runtime discovery of rules/skills/subagents was **not** executed in this environment (CLI availability unknown).
- Exact Vitest CLI flag spelling can vary by invocation style; agents must confirm against local `--help` / scripts.
- Upstream may add `AGENTS.md` later; if so, reconcile to avoid duplication with rules.
- Cloud-agent autonomy for git/PR differs from the Codex prompt’s local defaults; humans should still own merge/release.
