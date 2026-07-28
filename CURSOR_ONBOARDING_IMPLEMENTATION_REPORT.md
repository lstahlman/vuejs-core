# Cursor Onboarding Implementation Report

## 1. Outcome

Implemented a repository-local Vue Core Cursor onboarding package that supports:

`/start-first-contribution` → orientation → environment readiness → issue discovery or known-issue selection → first-contribution brief → Plan Mode handoff → normal Agent work.

No production dependencies were added. No issues were claimed, commented on, or otherwise mutated. Product runtime behavior was not changed.

## 2. Repository and Onboarding Findings

| Finding | Evidence |
|---|---|
| Checkout matches research snapshot | Commit `b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5`, version `3.5.40` |
| No prior Cursor agent package on `main` | No `.cursor/`, no `AGENTS.md`, no `.agents/` |
| Authoritative contributor docs present | `.github/contributing.md`, `maintenance.md`, `commit-convention.md` |
| Workspace shape confirmed | `packages/*`, `packages-private/*`, `scripts/*` |
| Working remote is a fork | `lstahlman/vuejs-core`; tracker queries pin `vuejs/core` |
| Official newcomer labels empty | GraphQL: `good first issue` 0, `help wanted` 0 |
| Label inventory complete | 59 labels via authenticated `gh label list` |
| Environment ready for unit work | Node `v22.14.0`, pnpm `11.13.0`, deps present, `pnpm test packages/shared --run` passed (6 files / 60 tests) |

## 3. Specification Reconciliation

See [`CURSOR_ONBOARDING_SPEC_RECONCILIATION.md`](./CURSOR_ONBOARDING_SPEC_RECONCILIATION.md).

Largest corrections: GraphQL-based issue discovery (emoji/shortcode label tooling bugs), exact label-name inventory, unlabeled/uncategorized broad-page fallback when primary queues are empty, deferred environment.json/Bugbot, and fork-vs-upstream tracker targeting.

## 4. Implemented Cursor Package

| Path | Primitive | Onboarding Purpose | Built-In Capability Reused | Evidence |
|---|---|---|---|---|
| `.cursor/rules/00-new-contributor-core.mdc` | Always-on rule | Boundaries, branches, generated files, validation honesty, external-state safety | Agent rules | Contributing + maintenance guides |
| `.cursor/rules/10-package-boundaries-and-tests.mdc` | Scoped rule | Import/dependency/test conventions when package files are in context | Auto-attached rules | Contributing project-structure sections |
| `.cursor/agents/project-onboarding-guide.md` | Read-only subagent | Bounded orientation + readiness classification | Search/Explore/terminal; `readonly` | Cursor subagent docs + repo sources |
| `.cursor/skills/start-first-contribution/SKILL.md` | Manual skill | Session entry and routing | Slash skills | Product journey |
| `.../references/environment-readiness.md` | Reference | Stable readiness matrix | Terminal / Set up Environment | package.json, workflows, smoke test |
| `.cursor/skills/find-first-contribution/SKILL.md` | Manual skill | Live taxonomy + candidate ranking | GitHub/`gh` | Labels + issues |
| `.../references/project-contribution-signals.md` | Reference | Versioned signal taxonomy | Skill progressive loading | 59-label inventory |
| `.../scripts/discover-candidates.mjs` | Read-only script | Reliable label/issue queries + hard exclusions + unlabeled scan | `gh` GraphQL | Validated against live tracker |
| `.cursor/skills/prepare-first-contribution/SKILL.md` | Manual skill | Contribution brief + Plan Mode prompt | Search/Explore/Plan Mode | Contributing + change-surface map |
| `.../references/vue-change-surfaces.md` | Reference | Compact package/test/docs/generated map | Skill progressive loading | Workspace layout |
| `docs/cursor-onboarding-guide.md` | Human guide | Invocation, limitations, maintenance, demo | Docs | Package contracts |

## 5. New Developer Journey

```text
/start-first-contribution
→ project-onboarding-guide (read-only orientation)
→ environment readiness classification
→ /find-first-contribution  OR  known issue URL
→ /prepare-first-contribution
→ Suggested Plan Mode prompt
→ Cursor Plan Mode (editable plan)
→ Agent implementation under project rules
→ built-in review / CI
```

## 6. Environment Readiness Behavior

Non-mutating checks only during orientation. Five-state classifier documented in `environment-readiness.md`.

This checkout classification on 2026-07-28: **Ready** for unit work. Task-specific browser/e2e/dts needs remain **Partially ready** until those capabilities are verified for the selected task. Setup recommendation path: `pnpm install` or Cursor Set up Environment. No `.cursor/environment.json` committed.

## 7. First-Contribution Discovery Behavior

| Item | Result |
|---|---|
| Access method | Authenticated `gh` + GraphQL script |
| Taxonomy method | Full label inventory (59) + forms/routing + priority/scope/workflow labels + roadmap/maintainer phrases |
| Primary signals | `good first issue`, `help wanted` (both 0 open) |
| Fallback signals | `🔩 p2-edge-case`, `:hammer: p3-minor-bug`, `:cake: p2-nice-to-have`, `:broom:  p1-chore`, `scope: playground`, `scope: types` |
| Unlabeled path | Broad open-issue page → `unlabeledOrUncategorized` (triage-unknown / outside-known-signals) |
| Query strategy | GraphQL `label.issues` + recent `repository.issues`; independent linked-PR scan; exclude cross-repo PR refs |
| Ranking | Rubric after hard exclusions; ≤3 results; conditional when no invitation |
| Confidence | High on exclusions/ownership; medium on fallback/unlabeled suitability without maintainer invitation |
| Limitations | Board fields unused; suitability changes quickly; no invented candidates when access fails |

Fallback survivors without exact newcomer labels **do** appear as review options (labeled fallback pools and unlabeled/uncategorized scan). They must be presented as conditional / not exact newcomer matches.

## 8. Plan Mode Handoff

`prepare-first-contribution` gathers issue status, paths, precedents, validation matrix, branch/release notes, and role handoffs, then emits a tailored Plan Mode prompt. Plan Mode remains responsible for clarifying questions and the editable implementation plan. The skill does not implement code.

## 9. Validation Results

| Check | Result | Evidence | Limitations |
|---|---|---|---|
| Required files present | Pass | Structure script | — |
| Rule `.mdc` frontmatter | Pass | `alwaysApply` / globs present | Runtime attachment not exercised in IDE UI |
| Skill names match folders + `disable-model-invocation` | Pass | Frontmatter parse | Slash-menu discovery not runtime-tested here |
| Subagent frontmatter (`readonly`, `is_background`) | Pass | Matches Cursor docs | Enforcement depends on Cursor edition |
| No credentials added | Pass | Review of added files | Mentions of “secrets” are policy text only |
| Existing Cursor config preserved | Pass | None existed on `main`; package added cleanly | — |
| Label inventory | Pass | 59 labels | — |
| Primary newcomer queries | Pass | 0 / 0 open | — |
| Discovery script | Pass | Primary/fallback/unlabeled sections | Rate limits possible |
| Linked-PR exclusion | Pass | Timeline + cross-repo filter | Timeline completeness varies |
| Environment smoke | Pass | `pnpm test packages/shared --run` | Not full CI matrix |
| Known-issue / not-ready / access-fallback paths | Spec’d + statically reviewed | Skill failure tables | Full multi-session UX not run in IDE |
| Plan Mode handoff runtime | Not executed | Prompt template present | Do not claim Plan Mode UI opened |
| Issue mutation absent | Pass | Read-only `gh`/GraphQL only | — |

## 10. Deviations From the Research Specification

1. Added `scripts/discover-candidates.mjs` (research said optional) because emoji/shortcode label queries were unreliable.
2. Added broad open-issue unlabeled/uncategorized scan so empty official queues cannot hide all candidates.
3. Subagent frontmatter includes verified `readonly: true` and `is_background: false`.
4. Skills explicitly pin tracker host `vuejs/core` for fork checkouts.
5. Deferred `.cursor/environment.json` and `.cursor/BUGBOT.md` as recommended.
6. Created `docs/` directory (did not previously exist) for the human guide.
7. Cloud-agent delivery may open a PR on the working fork to land the package; onboarding skills themselves still forbid unsolicited pushes/issue writes.
8. Original prompt/spec files were referenced by local host paths and not present in this cloud workspace; implementation followed the research MVP shape as reconciled against live repo evidence and prior validated package contracts for the same artifacts.

## 11. Maintenance Guidance

1. Re-run `discover-candidates.mjs --labels-only` when labels change; update exact strings in the script and signal reference.
2. Refresh `project-contribution-signals.md` verification timestamp during discovery sessions.
3. Update readiness reference when Node/pnpm/scripts/CI change; re-prove a bounded smoke command.
4. Update rules only when contributing/maintenance guidance changes — do not duplicate linters.
5. Retest skill/subagent frontmatter against current Cursor docs after major Cursor releases.
6. Keep candidates ephemeral; never hard-code a durable “good first issue.”

## 12. Deferred Extensions

- `.cursor/environment.json` after validated cloud setup
- `.cursor/BUGBOT.md` after Bugbot is installed and Vue-specific misses are demonstrated
- `20-sensitive-surfaces.mdc` if core rule + prepare skill prove insufficient
- Project-board field signals if authenticated board reads show contributor value
- Thin completeness pre-PR skill if Bugbot unavailable and omissions repeat

## 13. Known Limitations

- Cursor IDE runtime discovery/invocation of skills and subagents was not verified in a desktop session in this environment.
- Plan Mode UI execution was not opened here.
- Public project-board suitability fields remain unverified.
- Whether `good first issue` is intentionally unused is unknown.
- Candidate suitability is time-sensitive; every run must revalidate.
- Script hard exclusions are necessary but not sufficient — human/agent judgment still required for architecture and acceptance clarity.
- Host-path prompt/spec attachments (`cursor_onboarding_prompt_artifacts_v3`, Codex project path) were unavailable in-cloud; reconciliation used live repo evidence plus the documented MVP contract.
