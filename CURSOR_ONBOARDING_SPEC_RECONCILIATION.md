# Cursor Onboarding Specification Reconciliation

Research upstream: `vuejs/core`  
Research target commit: `b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5`  
Installed checkout commit: `b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5`  
Reconciliation date: 2026-07-28

## Summary

The research specification is largely accurate for repository shape, commands, contribution workflow, and Cursor artifact design. The decisive runtime correction is project scope: this checkout is the fork `lstahlman/vuejs-core`, not `vuejs/core`. Issue discovery, branch guidance, and any later PR targeting must stay on the installed project. Upstream remains read-only reference.

Live tracker evidence also differs from the research snapshot. The fork has issues enabled and 29 labels (not the upstream inventory of 59). Canonical newcomer labels exist but currently have zero open issues. Open issues appear mirrored/imported with sparse discussion, so discovery must revalidate ownership and prefer honest empty or confirmation-required results over overselling suitability.

Environment checks on this Cloud Agent run classify as **Ready**: Node `v22.14.0`, pnpm `11.13.0`, dependencies present, and the bounded shared smoke test passed.

## Scope Contract

| Key | Value |
|---|---|
| `RESEARCH_UPSTREAM` | `vuejs/core` (`https://github.com/vuejs/core`) |
| `INSTALLED_PROJECT` | `lstahlman/vuejs-core` |
| `CONTRIBUTION_PROJECT` | `lstahlman/vuejs-core` |
| `CONTRIBUTION_REMOTE` | `origin` → `https://github.com/lstahlman/vuejs-core` |
| `CONTRIBUTION_BASE_BRANCH` | Installed default `main` for fixes/refactors/chores; `minor` for public API/behavior when that branch policy remains in installed guidance |
| `UPSTREAM_REFERENCE_POLICY` | Read-only reference. Do not query, claim, branch, push, or open PRs against `vuejs/core` unless the developer explicitly selects upstream contribution scope and permission is verified. |

## Material Decisions

| Spec Item | Current Evidence | Decision | Reason | Implementation Impact |
|---|---|---|---|---|
| Runtime project identity is `vuejs/core` | `gh repo view` shows fork `lstahlman/vuejs-core` of `vuejs/core`; origin remote matches | Replace | Installed project is the contribution target | All skills/rules/docs use installed owner/repo |
| Issue discovery against research upstream | Fork `hasIssuesEnabled: true`; 51 open issues observed | Modify | Query installed project; upstream only with explicit permission | Find skill and signal reference scoped to fork |
| Upstream label taxonomy (59 labels) | Fork currently has 29 labels; missing many upstream labels (`has PR`, `:broom: p1-chore`, `🛑 on hold`, `version: minor`, etc.) | Narrow | Live inventory is authoritative | Signal reference records fork inventory and drift warning |
| Canonical newcomer queue | Open `good first issue` / `help wanted` = 0 on installed project | Accept | Matches research dormancy finding | Empty truthful result is success; use fallbacks cautiously |
| Fallback candidates such as upstream #14910 | That issue number is upstream research evidence, not automatically valid on the fork | Reject as hardcoded candidate | Must rediscover from installed tracker | Demo/docs use live fork queries, not frozen upstream issue IDs |
| No existing `.cursor/` / `AGENTS.md` on `main` | Confirmed absent in checkout | Accept | Safe to add package without merge conflicts | Implement full MVP file set |
| Active `minor` branch may have `AGENTS.md` | Research E25; not checked out here | Unable to verify locally beyond research | Do not invent `minor` AGENTS content | Core rule says reconcile if installed later |
| Three rules + one agent + three skills + guide | No conflicting Cursor artifacts; Cursor docs still support `.mdc`, skills, subagents | Accept | Fits MVP and non-overlap matrix | Implement proposed structure |
| Optional find-skill scripts | High-level authenticated `gh` available; no need for API client | Narrow | Prefer documented `gh` commands in skill/reference | No scripts directory in MVP |
| Environment readiness smoke test | `pnpm exec vitest run --project unit packages/shared/__tests__/escapeHtml.spec.ts` passed | Accept | Matches installed scripts/deps | Keep command in environment reference |
| Post-implementation completeness skill | No repeated Vue-specific review omissions observed yet | Reject for MVP | Spec defers until real onboarding sessions justify it | Document as deferred |
| `BUGBOT.md` | No Bugbot config present | Reject for MVP | Spec says do not add solely for onboarding | Guide points to built-in review/Bugbot when available |
| Package manager / Node contract | `.node-version` `lts/*`; engines `>=20`; `packageManager` `pnpm@11.13.0` | Accept | Matches research and runtime | Readiness checks use installed files |
| Branch policy `main` vs `minor` | Present in `.github/contributing.md` and `.github/maintenance.md` | Accept | Installed guidance matches research | Prepare skill and core rule keep branch classification |
| Create docs under `docs/` | No `docs/` directory existed | Modify path only by creating it | Guide belongs in new `docs/cursor-onboarding-guide.md` | Create directory as part of package |
| Issue claiming automation | No claiming protocol; fork issues mostly uncommented | Accept exclusion | Do not claim/assign/comment | Skills explicitly forbid mutation |
| Authenticated `gh` as issue access | `gh auth status` authenticated as `cursor`; high-level issue/label commands work | Accept | Approved connector/CLI path | Prefer `gh` in this session; still document connector-first policy |
| Cursor Plan Mode / Browser / Bugbot availability | Official docs describe them; this Cloud Agent session did not exercise full IDE UI | Unable to verify | Guide marks availability honestly | Capability table uses Available / Not verified / Requires configuration |

## Corrected Onboarding Baseline

- Vue 3 core monorepo at version `3.5.40`, pnpm workspace under `packages/*` and `packages-private/*`.
- Authoritative contributor sources: `.github/contributing.md`, `.github/maintenance.md`, `package.json`, `vitest.config.ts`, CI workflows, `SECURITY.md`.
- Public packages and private playground/type-test packages match the research map.
- Cross-package imports use package names; compiler/runtime separation remains binding.
- Generated outputs: `packages/*/dist`, root `temp`. Tracked snapshots under `__snapshots__` are expectations, not disposable build junk.
- First contributions should prefer focused regression fixes, type corrections, narrow compiler cases, or repo-local docs/playground chores with clear acceptance evidence.

## Corrected Environment Model

| Check | Observed |
|---|---|
| Node | `v22.14.0` satisfies `>=20.0.0` |
| pnpm | `11.13.0` exact match to `packageManager` |
| Dependencies | `node_modules` present and usable |
| Smoke test | Passed |
| Dev container / Docker / Nix / Mise | Not present |
| Cloud Environment Setup | Personal Cloud Agent environment exists for this repo; no repo-root `environment.json` exposed in this run |
| Browser/e2e tooling | Playwright/Puppeteer declared; not required for unit smoke; treat as task-specific |
| Classification for this run | **Ready** |

Readiness must remain detect-only. Do not run `pnpm install` unless the developer explicitly requests setup.

## Corrected Project and Fork Scope

```text
onboarding scope = lstahlman/vuejs-core
issue discovery scope = lstahlman/vuejs-core
branch and PR target = lstahlman/vuejs-core
research upstream vuejs/core = reference only
```

If a developer supplies a `vuejs/core` issue URL while working in this fork:

1. Treat it as upstream reference unless they explicitly change contribution scope.
2. Prefer preparing work against an installed-project issue, or clearly label upstream-only analysis as non-PR-ready for this checkout.

## Corrected Issue-Discovery Model

Positive signals still recognized when current:

1. `good first issue`
2. Explicit maintainer invitation language
3. Bounded repo-local docs/playground/test/chore with maintainer confirmation

Hard exclusions remain: security, blockers (`need discussion`, `need guidance`, `need more info`), assignees/active PRs, features/RFCs, hot-path architecture, cross-repo docs ownership unresolved.

Installed-project differences:

- Revalidate full label inventory every discovery session.
- Do not assume upstream-only labels exist.
- Fork open issues currently show empty comment arrays and synchronized update timestamps; treat triage confidence as lower until maintainer confirmation appears.
- Recommend only scores ≥70; 50–69 only under “requires maintainer confirmation.”

## Corrected Cursor Artifact Set

Implement:

```text
.cursor/rules/00-new-contributor-core.mdc
.cursor/rules/10-runtime-reactivity-conventions.mdc
.cursor/rules/20-compiler-types-conventions.mdc
.cursor/agents/project-onboarding-guide.md
.cursor/skills/start-first-contribution/SKILL.md
.cursor/skills/start-first-contribution/references/environment-readiness.md
.cursor/skills/find-first-contribution/SKILL.md
.cursor/skills/find-first-contribution/references/project-contribution-signals.md
.cursor/skills/prepare-first-contribution/SKILL.md
.cursor/skills/prepare-first-contribution/references/vue-change-surfaces.md
docs/cursor-onboarding-guide.md
CURSOR_ONBOARDING_SPEC_RECONCILIATION.md
CURSOR_ONBOARDING_IMPLEMENTATION_REPORT.md
```

No custom MCP, no provisioner, no generic planner/reviewer, no API client scripts.

## Deferred or Rejected Recommendations

| Item | Decision | Reason |
|---|---|---|
| Hardcoded upstream demo issue IDs | Reject | Installed tracker differs |
| Custom tracker scripts / GraphQL | Reject | Authenticated high-level `gh` is sufficient and approved |
| Environment installer skill | Reject | Built-in/repo setup already cover this |
| Post-implementation completeness skill | Defer | Needs repeated Vue-specific omission evidence |
| `BUGBOT.md` | Defer/Reject for onboarding MVP | Not independently adopted |
| Searching upstream issues by default on fork | Reject | Violates installed-project scope contract |

## Remaining Uncertainties

- Whether fork issue labels/bodies will stay synchronized with upstream triage over time.
- Whether public project-board fields exist for newcomer routing (not visible through approved high-level `gh` in this session).
- Full IDE availability of Ask mode, Plan Mode, Browser, Worktrees, and Bugbot for every developer edition.
- Whether `minor` branch agent guidance will later conflict with these rules if checked out.
- Maintainer preference for renewing `good first issue` usage on this fork or upstream.
