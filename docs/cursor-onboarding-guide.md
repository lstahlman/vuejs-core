# Cursor Developer Onboarding Guide

This guide explains the repository-local Cursor onboarding package for **this checkout**.

## Installed project identity

| Item | Value |
|---|---|
| Installed / contribution project | `lstahlman/vuejs-core` |
| Default remote | `origin` |
| Default branch | `main` |
| Detected relationship | Fork of `vuejs/core` |
| Research upstream | `vuejs/core` (read-only reference) |
| Issue discovery target | Installed project only by default |
| Branch / PR target | Installed project only by default |

If remotes or fork status change, re-resolve with git + high-level `gh repo view` before trusting this table.

## What this package does

Helps a new developer:

1. Orient to Vue core’s package and test boundaries
2. Assess environment readiness without auto-installing
3. Find credible first-contribution candidates in the installed tracker
4. Prepare a selected issue into a Vue-specific brief
5. Hand off to Cursor Plan Mode, then normal Agent implementation and built-in review

## What it deliberately leaves to Cursor built-ins

- Search / Instant Grep / Explore
- Set up Environment / Cloud Environment Setup
- Plan Mode
- Agent editing and terminal
- Browser validation
- Built-in review / security review / Bugbot
- GitHub/tracker integrations (scoped to the installed project)

---

## Project-provided capabilities

| Name | Type | Invocation | Use It For | Output | Limitations |
|---|---|---|---|---|---|
| `00-new-contributor-core` | Always-on rule | Automatic | Identity, branch, scope, generated files, validation honesty | Persistent guardrails | Not a tour or setup guide |
| `10-runtime-reactivity-conventions` | Scoped rule | Auto on matching runtime/reactivity paths | Runtime test/size/hot-path boundaries | Context while editing those files | Not a linter |
| `20-compiler-types-conventions` | Scoped rule | Auto on matching compiler/dts paths | Compiler snapshot and type-test boundaries | Context while editing those files | Not a TypeScript service |
| `project-onboarding-guide` | Read-only subagent | Delegated by start skill or explicit selection | Orientation + readiness | `Project Orientation` | No edits, no provisioning |
| `/start-first-contribution` | Skill | Slash command; optional issue URL/number | Start a newcomer session | `First-Contribution Session` | Does not implement code |
| `/find-first-contribution` | Skill | Slash command or routed from start | Live candidate discovery | Ranked candidates / honest empty set | No claiming; installed-project scope |
| `/prepare-first-contribution` | Skill | Slash command or routed with selected issue | Build contribution brief | `First-Contribution Brief` | Does not replace Plan Mode |
| `environment-readiness.md` | Reference | Loaded by start/onboarding | Exact readiness contract | Status definitions + checks | Snapshot dates drift |
| `project-contribution-signals.md` | Reference | Loaded by find skill | Label taxonomy + queries | Signals, exclusions, scoring | Must be revalidated live |
| `vue-change-surfaces.md` | Reference | Loaded by prepare skill | Package/test/docs routing | Surface map | Installed manifests win |

## Cursor-provided capabilities

| Cursor Capability | Availability | Use It For | Project Artifact That Complements It | How to Start | Notes |
|---|---|---|---|---|---|
| Agent | Available in this Cloud Agent run | Implement and verify selected work | Rules + contribution brief | Continue after Plan Mode approval | Core coding loop |
| Ask / read-only exploration | Not verified in this run | Learn without edits | `project-onboarding-guide` | Use Ask mode if present, or instruct Agent not to edit | Edition dependent |
| Search / Instant Grep / Explore | Available | Find symbols, precedents, tests | Knowledge in skills/references | Built-in search tools | Prefer authoritative paths first |
| Plan Mode | Not verified in this Cloud Agent UI | Reviewable implementation plan | Prepare skill brief + suggested prompt | Switch to Plan Mode with suggested prompt | Fallback: ask Agent for a plan without editing |
| Set up Environment / Cloud Environment Setup | Available (this repo has a Cloud environment) | Provision when not ready | Readiness reference | Consent to setup after readiness gaps | Package never auto-installs |
| Terminal | Available | git, pnpm, tests, high-level `gh` | Skills choose Vue-specific commands | Agent terminal | Permissions may vary locally |
| Browser | Not verified | Playground / e2e UI checks | Prepare brief says when needed | Built-in browser if present | Else use repo e2e or manual steps |
| Built-in review / security review / Bugbot | Not verified | Review completed changes | Rules + brief context | `/review`, `/review-security`, `/review-bugbot` if available | Fallback: Agent checklist review |
| Worktrees / Cloud Agents | Cloud Agents available; worktrees not verified | Isolate risky/parallel work | Guide recommends only when useful | Cursor worktree/cloud UI | Optional |
| Connected GitHub / `gh` | `gh` authenticated in this run | Labels, issues, PRs, fork metadata | Find/prepare skills | Prefer connector if exposed; else authenticated `gh` | Requires configuration in other environments |

Do not assume a capability is present merely because Cursor docs mention it.

---

## Journey

```text
/start-first-contribution
→ project orientation + readiness
→ /find-first-contribution  or  known issue
→ /prepare-first-contribution
→ Cursor Plan Mode
→ Agent implementation with rules
→ built-in review + focused validation
```

### Invoke start

```text
/start-first-contribution
/start-first-contribution find work in compiler
/start-first-contribution https://github.com/lstahlman/vuejs-core/issues/123
```

Expected output sections: Installed Project, Orientation Summary, Environment Readiness, Selected Path, Access Gaps, Next Action.

### Orientation via `project-onboarding-guide`

Start delegates to the read-only subagent. You can also ask:

```text
Use project-onboarding-guide to orient me to the runtime and test layout.
```

Expected output: `Project Orientation` with repository map, conventions, readiness, and one next action.

### Find work

```text
/find-first-contribution
```

Expected output: live signal summary, ranked candidates or an honest empty set, rejections, access limits, next step.

### Prepare a selected issue

```text
/prepare-first-contribution https://github.com/lstahlman/vuejs-core/issues/123
```

Expected output: `First-Contribution Brief` ending in a Suggested Plan Mode Prompt.

### How rules influence normal Agent sessions

- Core rule always applies: installed-project scope, no silent upstream targeting, no generated-file edits, honest validation.
- Runtime/compiler scoped rules attach when matching files are in context.
- Rules do not invent work; they constrain how selected work is done.

---

## Environment readiness meanings

| Status | Meaning |
|---|---|
| Ready | Tools/deps OK; smoke test passed |
| Partially ready | Core OK; task-specific gap |
| Setup available but not applied | Setup files exist; deps/tools missing |
| Not ready | Requirements unmet or wrong package manager |
| Unable to verify | Checks could not run |

Canonical checks and commands: `.cursor/skills/start-first-contribution/references/environment-readiness.md`.

Bounded smoke test:

```bash
pnpm exec vitest run --project unit packages/shared/__tests__/escapeHtml.spec.ts
```

---

## Issue discovery

Discovery always targets the installed project unless you explicitly request read-only upstream reference.

Access methods, in order:

1. Cursor GitHub/tracker connector
2. Approved existing MCP
3. Authenticated high-level `gh`
4. Public browser for unverified orientation
5. Manual issue URL/export

If authentication fails: stop live lookup, report the failed tool, ask to connect/authorize the approved integration, and continue with orientation or supplied issue data. Never fall back to raw REST/GraphQL or token scripts.

Signal taxonomy and scoring live in:

`.cursor/skills/find-first-contribution/references/project-contribution-signals.md`

Maintainers should update that file when labels, combinations, or query strategy drift.

### Known-issue path

```text
/start-first-contribution https://github.com/OWNER/REPOSITORY/issues/N
```

Start verifies the issue belongs to the contribution project, runs orientation/readiness, skips discovery, and routes to prepare.

If you paste a `vuejs/core` issue while working in this fork, upstream remains reference-only until you explicitly change contribution scope.

### Plan Mode handoff

1. Complete `/prepare-first-contribution`
2. Copy/use the Suggested Plan Mode Prompt
3. Switch to Plan Mode
4. Review/approve the plan
5. Continue in Agent mode for implementation

Plan Mode remains responsible for choosing the implementation approach. The brief supplies Vue-specific evidence and boundaries.

### Review completed work

Provide issue + brief + diff to built-in review when available, then run scoped tests/`check`/`lint` and record CI-only checks that were not run.

---

## Starter recipes

1. **Explore only**  
   `/start-first-contribution` → choose explore → read orientation → stop before issue lookup.

2. **Find work**  
   Start → verify readiness/identity → `/find-first-contribution` → select a ranked candidate → `/prepare-first-contribution`.

3. **Known issue**  
   `/start-first-contribution <issue URL>` → verify current state → prepare brief.

4. **No GitHub access**  
   Continue orientation; supply an issue URL/export or connect an approved tool; do not invent current status.

5. **Environment not ready**  
   Review gaps; explicitly choose repository `pnpm install` or Cursor Set up Environment; rerun readiness.

6. **Plan handoff**  
   Use the Suggested Plan Mode Prompt from the brief and switch to Plan Mode.

7. **Review completed change**  
   Built-in review with issue/brief/diff context, then scoped validation.

---

## Safety and external-state boundaries

The package must not:

- claim, assign, or comment on issues
- create branches/PRs during start/find/prepare
- install dependencies without explicit consent
- access secrets
- target upstream for issues/PRs by default
- present low-priority labels as proof a task is easy

## Known limitations

- Canonical newcomer labels may be dormant (0 open at package authoring time).
- Fork issue triage confidence may be lower than upstream.
- Some Cursor UI capabilities are edition/team dependent and were not fully verified in the authoring Cloud Agent session.
- Public project-board fields may exist but were not available through approved high-level `gh` here.
- User-facing Vue docs often live outside this repository.

## Live demo sequence (main path)

1. Run `/start-first-contribution`
2. Confirm installed identity is `lstahlman/vuejs-core` and upstream parent is `vuejs/core`
3. Confirm readiness classification with evidence
4. Run find against the installed repo label inventory
5. Expect canonical newcomer queries to be empty unless labels are renewed
6. Apply fallbacks carefully; prefer confirmation-required placement over overselling
7. Select only after stated confirmation/access steps
8. Prepare brief → Plan Mode → Agent

Demo acceptance is live installed-project-scoped discovery with honest suitability, not “always show three issues.”

## Maintenance

When updating this package:

1. Re-resolve installed identity and fork relationship
2. Refresh label inventory and signal reference verification date
3. Re-check `package.json` scripts and readiness smoke command
4. Reconcile with any new `AGENTS.md` / `.cursor` guidance on the active branch
5. Update this capability catalog only for artifacts that still exist
6. Keep upstream references labeled as reference-only
