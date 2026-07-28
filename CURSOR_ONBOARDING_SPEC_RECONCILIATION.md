# Cursor Onboarding Specification Reconciliation

**Repository:** `vuejs/core` (working fork `lstahlman/vuejs-core`)  
**Inspected commit:** `b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5`  
**Package version:** `3.5.40`  
**Reconciliation date:** 2026-07-28  
**Research spec:** `CURSOR_DEVELOPER_ONBOARDING_SPEC.md` (research snapshot same commit)  
**Implement prompt:** `02-implement-cursor-onboarding-package.md` (artifacts v3)

## Summary

The research specification matches the current checkout closely: same commit, version, workspace layout, contributor docs, and absence of prior Cursor artifacts on `main`. The MVP shape (one always-on rule, one scoped package/test rule, one read-only onboarding subagent, three skills, contributor guide, contribution-signal reference) is **accepted**.

Material corrections:

1. **Issue query tooling:** `gh issue list --label` and GitHub REST/search paths mishandle Vue’s emoji / shortcode labels (empty stubs or PR-contaminated results). Candidate discovery must prefer **GraphQL `repository.label(...).issues`** (script provided).
2. **Exact label inventory:** Confirmed **59** labels via authenticated `gh label list`. Several priority labels use literal shortcodes (e.g. `:hammer: p3-minor-bug`, `:broom:  p1-chore` with two spaces), while `🔩 p2-edge-case` uses a real emoji. Queries must use exact API names.
3. **Official newcomer queue empty:** `good first issue` and `help wanted` still have **zero** open issues. Fallback taxonomy remains required; candidates without an invitation are **conditional**.
4. **Unlabeled / uncategorized survivors:** When primary queues are empty, discovery must still surface unlabeled open issues and issues outside known signal pools as **triage-unknown** options. Missing labels are not endorsement, but empty newcomer labels must not hide all work.
5. **Subagent schema:** Current Cursor docs support `readonly: true` and `is_background: false`. Include both.
6. **Environment:** This checkout is **Ready** for unit work (Node 22.14.0, pnpm 11.13.0, deps installed, `pnpm test packages/shared --run` passed). No repo `.cursor/environment.json`; cloud env is db-backed. Defer committing environment config.
7. **Optional Bugbot / completeness rule:** Deferred — no demonstrated Bugbot install or repeated omission evidence.
8. **Tracker host:** Skills must query **`vuejs/core`** even when the local remote is a fork.

## Material Decisions

| Spec Item                                                           | Current Evidence                                                             | Decision         | Reason                                               | Implementation Impact                                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| MVP package tree (2 rules, 1 subagent, 3 skills, guide, signal ref) | No `.cursor/`, no `AGENTS.md`; contributing/maintenance guides authoritative | Accept           | Smallest coherent journey; no overlap with built-ins | Implement as specified under `.cursor/` + `docs/`    |
| Always-on `00-new-contributor-core.mdc`                             | `.github/contributing.md`, `maintenance.md`, commit convention, CI           | Accept           | Boundary rules tooling cannot choose                 | Keep short; reference paths, not restated lint rules |
| Scoped `10-package-boundaries-and-tests.mdc`                        | Contributing project-structure / importing / tests sections                  | Accept           | High miss rate for newcomers on package code         | Auto-attach via package globs                        |
| Deferred `20-sensitive-surfaces.mdc`                                | Core rule + prepare skill cover hot paths                                    | Reject (for MVP) | Would add noise before proven gaps                   | Document as deferred                                 |
| `project-onboarding-guide` subagent                                 | Docs confirm `.cursor/agents/*.md`, `readonly`, `is_background`              | Accept + Modify  | Add verified `readonly`/`is_background` fields       | Frontmatter includes both                            |
| `/start-first-contribution` skill                                   | Skills docs: `disable-model-invocation`, slash invoke                        | Accept           | Explicit entry; avoid auto noise                     | `disable-model-invocation: true`                     |
| `find-first-contribution` + signal reference                        | 59 labels; GFI/HW empty; GraphQL label.issues works                          | Accept + Modify  | Need GraphQL script + broad open-issue page          | Add `scripts/discover-candidates.mjs`                |
| Unlabeled-issue fallback                                            | Live open issues exist without newcomer labels                               | Accept + Modify  | Empty GFI/HW must not end discovery                  | Script emits `unlabeledOrUncategorized`              |
| `prepare-first-contribution`                                        | Plan Mode remains separate; brief handoff                                    | Accept           | Do not replace Plan Mode                             | Brief + suggested Plan Mode prompt only              |
| Environment readiness reference                                     | `.node-version` `lts/*`, engines `>=20`, `packageManager` pnpm@11.13.0       | Accept           | Smoke test proven: `pnpm test packages/shared --run` | Document five-state classifier                       |
| `.cursor/environment.json`                                          | None in repo; cloud env db-backed                                            | Reject (MVP)     | Spec deferred; avoid duplicating setup               | Recommend built-in Set up Environment                |
| `.cursor/BUGBOT.md`                                                 | No Bugbot evidence in checkout                                               | Reject (MVP)     | Spec decision criteria unmet                         | Defer                                                |
| Custom MCP / issue service                                          | Authenticated `gh` available                                                 | Reject           | `gh` + GraphQL sufficient                            | No MCP added                                         |
| Issue mutation / claiming                                           | Safety constraints                                                           | Accept           | Skills remain read-only on tracker                   | Explicit bans in skills                              |
| Role-specific subagents                                             | Spec multi-role via shared sections                                          | Accept           | One orientation output with role notes               | No extra agents                                      |
| Scripts in MVP                                                      | Spec optional; emoji label bugs observed                                     | Modify           | Thin GraphQL script improves reliability             | Read-only Node script, no deps                       |
| Docs path `docs/cursor-onboarding-guide.md`                         | No `docs/` directory previously                                              | Accept           | Create `docs/` for contributor-facing guide          | New directory                                        |
| Historical demo fallback #14777/#14778                              | Spec demo branch                                                             | Accept           | Closed-issue learning mode only                      | Document in guide/skills                             |
| Query via `gh issue list --label` examples in research              | Returns empty stub objects for emoji labels                                  | Replace          | Unreliable in this environment                       | Document GraphQL as primary                          |
| GitHub search `is:issue` + emoji labels                             | Returns PullRequest nodes despite `is:issue`                                 | Narrow           | Contaminates candidates                              | Filter `__typename == Issue` / use label.issues      |
| Vapor Roadmap #13687                                                | Still open; architectural risk                                               | Accept           | Discovery source only, not blanket approval          | Signal reference + exclusions                        |
| Fork remotes (`lstahlman/vuejs-core`)                               | Working remote is fork; upstream is vuejs/core                               | Modify           | Tracker queries must target upstream                 | Skills pin `--repo vuejs/core`                       |

## Corrected Onboarding Baseline

Authoritative sources (read in this order):

1. `README.md`
2. `.github/contributing.md`
3. `.github/maintenance.md`
4. `.github/commit-convention.md`
5. `package.json`, `.node-version`, `pnpm-workspace.yaml`
6. `.github/workflows/ci.yml`, `.github/workflows/test.yml`
7. Affected package `package.json`, sources, and `__tests__`
8. Live issue / PR context on **`vuejs/core`**

Contribution types remain: bug fixes with reproduction/tests → `main`; public API / features → `minor` with prior approval/RFC; chores only when meaningful; stylistic refactors discouraged.

## Corrected Environment Model

| Check                            | Observed 2026-07-28                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Node                             | `v22.14.0` (satisfies `>=20`; `.node-version` is `lts/*`)                                                      |
| pnpm                             | `11.13.0` matches `packageManager`                                                                             |
| Dependencies                     | `node_modules` present; install already applied                                                                |
| Bounded smoke                    | `pnpm test packages/shared --run` → 6 files / 60 tests passed                                                  |
| Dev container / Docker / Nix     | Not present                                                                                                    |
| Repo cloud env file              | Not present                                                                                                    |
| Classification for this checkout | **Ready** (unit); e2e/browser and `test-dts` remain task-dependent (**Partially ready** if those are required) |

Classifier states unchanged: Ready / Partially ready / Setup available but not applied / Not ready / Unable to verify. Orientation must not install dependencies.

## Corrected Issue-Discovery Model

1. Inventory all labels via `gh label list --repo vuejs/core --limit 200 --json name,description,color`.
2. Primary queries: `good first issue`, `help wanted` (currently empty).
3. Fallback pools (exact names): `🔩 p2-edge-case`, `:hammer: p3-minor-bug`, `:cake: p2-nice-to-have`, `:broom:  p1-chore`, contained scopes such as `scope: playground` / `scope: types`.
4. Broad open-issue page: surface unlabeled and outside-known-signals issues as triage-unknown / conditional options when primary queues are empty.
5. Hard negatives: `:exclamation: p4-important`, `:fire: p5-urgent`, `has PR`, `need discussion`, `need more info`, active assignee/claim, open/draft linked PR, unresolved semantics, RFC/feature without approval.
6. Retrieve labeled candidates via GraphQL `label.issues(states:OPEN, orderBy:UPDATED_AT)` — not `gh issue list --label` for emoji/shortcode labels.
7. Independently search linked PRs even when `has PR` is absent.
8. Without invitation/newcomer label: status is **conditional-maintainer-confirmation**, never “easy first issue.”
9. Rank at most three; reject misleading labeled issues explicitly.

Live verification sample (2026-07-28, `gh` GraphQL):

- `good first issue` / `help wanted`: 0 open.
- Fallback pools populated (`🔩 p2-edge-case` 136, `:hammer: p3-minor-bug` 39, etc.).
- Many fallback survivors still excluded by open linked PRs or high-risk surfaces.
- Unlabeled / uncategorized survivors from the broad open page remain reviewable as conditional options, not newcomer endorsements.

## Corrected Cursor Artifact Set

```text
.cursor/
  rules/
    00-new-contributor-core.mdc
    10-package-boundaries-and-tests.mdc
  agents/
    project-onboarding-guide.md
  skills/
    start-first-contribution/
      SKILL.md
      references/environment-readiness.md
    find-first-contribution/
      SKILL.md
      references/project-contribution-signals.md
      scripts/discover-candidates.mjs
    prepare-first-contribution/
      SKILL.md
      references/vue-change-surfaces.md
docs/
  cursor-onboarding-guide.md
CURSOR_ONBOARDING_SPEC_RECONCILIATION.md
CURSOR_ONBOARDING_IMPLEMENTATION_REPORT.md
```

**Selected MVP scope (Phase 3):** as above. No environment skill, no planning skill, no review agent, no MCP server, no Bugbot file, no sensitive-surfaces rule.

## Deferred or Rejected Recommendations

| Item                                      | Decision | Reason                                                                 |
| ----------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `.cursor/environment.json`                | Deferred | Cloud setup already works via personal env; validate before committing |
| `.cursor/BUGBOT.md`                       | Deferred | No Bugbot install / omission evidence                                  |
| `20-sensitive-surfaces.mdc`               | Deferred | Prepare skill + core rule sufficient for MVP                           |
| Custom MCP issue server                   | Rejected | `gh` GraphQL covers needs                                              |
| Generic coding / review / planning skills | Rejected | Built-in Cursor capabilities                                           |
| Automatic issue claim/comment             | Rejected | Safety / maintainer process                                            |
| Historical hard-coded “good first issue”  | Rejected | Queues empty; suitability is ephemeral                                 |

## Open Questions

- Whether `good first issue` is intentionally unused (unavailable vs abandoned).
- Project-board field usage for suitability (not verified; GraphQL board access not required for MVP).
- Whether playground-only changes without issues are welcomed (treat as maintainer-confirmation ideas only).
- Cursor runtime discovery of skills/subagents in every client edition (static validation done here; manual smoke steps documented).
- Exact claiming phrase norms among maintainers (detect assignees + explicit comments; no single documented phrase).
