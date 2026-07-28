# Cursor Onboarding Implementation Report

## 1. Outcome

Implemented a repository-local Cursor onboarding package for this Vue core checkout. The package orients newcomers, classifies environment readiness without provisioning, discovers installed-project first-contribution candidates with live signal revalidation, prepares a contribution brief, and hands off to Cursor Plan Mode and normal Agent workflow.

## 2. Repository and Onboarding Findings

- Checkout matches research commit `b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5` on `main`.
- No pre-existing `.cursor/`, `AGENTS.md`, or Copilot instruction files on this branch.
- Authoritative contributor sources remain `.github/contributing.md`, `.github/maintenance.md`, `package.json`, Vitest/CI config, and `SECURITY.md`.
- Workspace is pnpm-managed Vue 3.5.40 monorepo with public packages under `packages/` and private playground/type-test packages under `packages-private/`.
- Canonical newcomer labels exist but currently have zero open issues on the installed tracker.

## 3. Specification Reconciliation

See [`CURSOR_ONBOARDING_SPEC_RECONCILIATION.md`](./CURSOR_ONBOARDING_SPEC_RECONCILIATION.md).

Major corrections: installed project is a fork; live label inventory is 29 not 59; upstream demo issue IDs were rejected as hardcoded candidates; optional scripts/post-implementation skill/`BUGBOT.md` deferred or rejected for MVP.

## 3A. Project Scope and Fork Relationship

| Field | Value |
|---|---|
| Research upstream | `vuejs/core` |
| Installed project | `lstahlman/vuejs-core` |
| Contribution project | `lstahlman/vuejs-core` |
| Remotes | `origin` → `https://github.com/lstahlman/vuejs-core` |
| Default branch | `main` |
| Fork / parent | Fork of `vuejs/core` |
| Issues enabled | Yes |
| Issue-query scope | Installed project |
| Branch / PR target | Installed project |
| Upstream reference policy | Read-only unless developer explicitly selects upstream contribution scope |
| Unresolved limitations | Project-board fields not visible via approved high-level `gh`; IDE-only Cursor features not fully verified in this Cloud Agent run |

## 4. Implemented Cursor Package

| Path | Primitive | Onboarding Purpose | Built-In Capability Reused | Evidence |
|---|---|---|---|---|
| `.cursor/rules/00-new-contributor-core.mdc` | Always-on rule | Identity/scope/branch/generated-file/validation safety | Agent rules | contributing/maintenance/package manifests |
| `.cursor/rules/10-runtime-reactivity-conventions.mdc` | Scoped rule | Runtime/reactivity test and risk boundaries | Search, terminal, review | contributing + recent fix patterns |
| `.cursor/rules/20-compiler-types-conventions.mdc` | Scoped rule | Compiler snapshot/type-test boundaries | Search, terminal, review | contributing + vitest/dts layout |
| `.cursor/agents/project-onboarding-guide.md` | Read-only subagent | Orientation + readiness | Search/Explore/subagents | README, contributing, manifests |
| `.cursor/skills/start-first-contribution/` | Skill + readiness reference | Session router | Skills, subagent, terminal | Spec §11 + env checks |
| `.cursor/skills/find-first-contribution/` | Skill + signal reference | Live candidate discovery | Authenticated `gh` / connectors | Live labels/issues on installed repo |
| `.cursor/skills/prepare-first-contribution/` | Skill + change-surface reference | Contribution brief for Plan Mode | Search/Explore/Plan Mode | Package map + contribution guide |
| `docs/cursor-onboarding-guide.md` | Human guide | Capability catalogs + recipes | Cursor built-ins | Implemented artifacts + docs |
| `CURSOR_ONBOARDING_SPEC_RECONCILIATION.md` | Reconciliation record | Research vs installed truth | N/A | Phase 0–2 inspection |
| `CURSOR_ONBOARDING_IMPLEMENTATION_REPORT.md` | Implementation report | Validation and maintenance | N/A | This document |

## 5. New Developer Journey

```text
/start-first-contribution
→ project-onboarding-guide (orientation + readiness)
→ /find-first-contribution  or known-issue verify
→ /prepare-first-contribution
→ Cursor Plan Mode (suggested prompt)
→ Agent implementation under project rules
→ built-in review + focused validation
```

## 6. Environment Readiness Behavior

Detect-only checks:

1. git identity/branch/commit
2. Node vs engines
3. pnpm vs `packageManager`
4. dependency usability
5. bounded smoke test when deps usable
6. browser tooling only when task-specific

Statuses: Ready / Partially ready / Setup available but not applied / Not ready / Unable to verify.

Authoring-environment result: **Ready**

- Node `v22.14.0`
- pnpm `11.13.0`
- deps present
- `pnpm exec vitest run --project unit packages/shared/__tests__/escapeHtml.spec.ts` passed (5 tests)

No automatic `pnpm install`.

## 7. First-Contribution Discovery Behavior

| Item | Result |
|---|---|
| Installed-project scope | `lstahlman/vuejs-core` |
| Access tool | Authenticated high-level `gh` |
| Authentication state | Authenticated (`gh auth status` succeeded) |
| Taxonomy method | Full `gh label list` inventory + issue template/contribution docs review |
| Exact inferred positive signals | `good first issue`; maintainer invitation phrases; conditional docs/playground/bounded p2/p3 after review |
| Negative signals | `need discussion`, `need guidance`, `need more info`; assignees; linked/open PRs; features/security |
| Query strategy | Canonical labels first; fallbacks only if empty; never silent upstream switch |
| Ranking | Spec rubric; recommend ≥70 only |
| Authoring-time canonical queries | 0 open `good first issue`, 0 open `help wanted` |
| Example rejection | `#50` excluded for `need discussion` |
| Example conditional inspection | `#55` (`:hammer: p3-minor-bug`, unassigned, no PR/comments) kept confirmation-required / not auto-recommended because no maintainer clarification and potentially broad DOM surface |
| Developer escalation | On auth failure, stop live lookup and ask to connect approved GitHub access |
| Limitations | Fork issues often uncommented; board fields unavailable; suitability must stay conservative |

## 7A. Developer Capability Catalog

Documented in `docs/cursor-onboarding-guide.md`:

- Project-provided: 3 rules, 1 subagent, 3 skills, 3 references
- Cursor-provided: Agent, Ask, Search/Explore, Plan Mode, Set up Environment, Terminal, Browser, review/Bugbot, Worktrees/Cloud Agents, GitHub/`gh`
- Availability marked as Available / Not verified / Requires configuration based on this run
- Handoffs: start → onboarding guide/find/prepare → Plan Mode → Agent → built-in review

## 8. Plan Mode Handoff

`/prepare-first-contribution` produces a `First-Contribution Brief` with a Suggested Plan Mode Prompt containing installed identity, base branch, issue URL, acceptance evidence, likely files, required tests, non-goals, and unresolved questions. Plan Mode remains responsible for the implementation approach; the package does not generate a generic implementation plan.

## 9. Validation Results

| Check | Result | Evidence | Limitations |
|---|---|---|---|
| Installed identity / fork | Pass | `gh repo view` fork of `vuejs/core` | N/A |
| File structure / frontmatter | Pass | All MVP paths exist; skill names match folders | Runtime Cursor discovery UI not exercised |
| No conflicting AGENTS.md | Pass | None present on `main` | `minor` branch AGENTS not checked out |
| Environment readiness Ready | Pass | Node/pnpm/smoke test | Local developer machines may differ |
| Live label inventory | Pass | 29 labels listed | May drift |
| Canonical newcomer queries | Pass (empty) | `[]` for both labels | Empty is expected/honest |
| Candidate exclusion logic | Pass | `#50` blocked; `#55` not oversold | Full ranking not exhaustively applied to all 51 issues |
| No raw GraphQL/REST client added | Pass | Skills forbid it; no scripts dir | N/A |
| No secrets added | Pass | Search found only prohibition text | N/A |
| Slash-command runtime invocation | Not verified | Static validation only | Needs IDE session |
| Plan Mode / Browser / Bugbot UI | Not verified | Marked in guide | Edition/team dependent |
| Fork PR-target guidance | Pass by design | Rules/skills/docs enforce installed project | No PR created by onboarding skills |

## 10. Deviations From the Research Specification

- Contribution target is `lstahlman/vuejs-core`, not `vuejs/core`.
- Signal reference records 29 live fork labels and warns about upstream drift.
- Hardcoded upstream demo issue `#14910` not embedded as a ready candidate.
- No find-skill scripts directory (authenticated `gh` commands documented instead).
- Created `docs/` because it did not previously exist.
- Start skill output headings follow the research spec (`Installed Project`, etc.) while remaining compatible with the implementation prompt intent.
- Optional post-implementation skill and `BUGBOT.md` deferred.

## 11. Maintenance Guidance

1. Re-resolve installed remotes/fork status when the checkout changes.
2. Refresh `project-contribution-signals.md` after label or triage-policy changes; update the verification date.
3. Re-check readiness commands whenever `package.json` / Node / pnpm contracts change.
4. Reconcile rules with any future `AGENTS.md` on the active branch; preserve stronger installed guidance.
5. Keep upstream references explicitly read-only unless contribution scope changes.
6. Only add a completeness skill if real first-contribution reviews show repeated Vue-specific omissions.

## 12. Deferred Extensions

- `first-contribution-completeness` skill
- `BUGBOT.md`
- Custom tracker scripts / MCP server
- Environment provisioning skill
- Generic planning or review agents
- Automatic issue claiming / branch / PR creation inside onboarding skills

## 13. Known Limitations

- Cursor IDE runtime discovery of skills/subagents was not executed in this Cloud Agent turn.
- Ask mode, Plan Mode UI, Browser, Worktrees, and Bugbot were not verified here.
- Public project-board newcomer fields remain unknown through the approved interface.
- Installed-project issues may be mirrored/untriaged; discovery intentionally prefers honest empty or confirmation-required outcomes.
- This report does not claim upstream issue state, unauthenticated environments, or unrun CI lanes were verified.
