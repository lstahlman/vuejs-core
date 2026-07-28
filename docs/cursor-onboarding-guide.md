# Cursor onboarding guide (Vue Core)

This repository includes a small Cursor package that helps a new developer start a first contribution without replacing Cursor’s built-in Agent, Plan Mode, search, environment setup, or review tools.

## What the package does

1. Orients you to Vue Core’s monorepo, contribution flow, and conventions.
2. Classifies whether this environment can run the relevant checks.
3. Discovers credible first-contribution candidates using Vue’s live issue signals.
4. Prepares a selected issue into a First-Contribution Brief.
5. Hands off to Cursor **Plan Mode**, then normal Agent implementation.

## What it deliberately leaves to Cursor built-ins

| Built-in | Package does not replace it |
|---|---|
| Search / Explore | Custom codebase search |
| Set up Environment | Dependency installer / provisioner |
| Plan Mode | Generic planning skill |
| Agent edit + terminal | Coding orchestrator |
| Browser | Generic browser automation skill |
| Review / Bugbot / security review | Custom review bot |
| GitHub integration / `gh` | Custom issue tracker service |

## Invoke `/start-first-contribution`

In Agent chat:

```text
/start-first-contribution
/start-first-contribution find
/start-first-contribution explore compiler-sfc
/start-first-contribution https://github.com/vuejs/core/issues/14910
```

Related skills:

- `/find-first-contribution` — discovery only
- `/prepare-first-contribution <issue>` — brief + Plan Mode prompt

The `project-onboarding-guide` subagent may also be delegated for read-only orientation.

## Orientation

The onboarding guide reads authoritative sources first:

- `.github/contributing.md`
- `.github/maintenance.md`
- `package.json`, `.node-version`, `pnpm-workspace.yaml`
- CI workflows under `.github/workflows/`

It returns a bounded map: packages, change flow (`main` vs `minor`), conventions, environment readiness, and one next action.

## Environment-readiness meanings

| State | Meaning |
|---|---|
| Ready | Node/pnpm/deps OK; bounded unit smoke works; task extras available |
| Partially ready | Unit baseline OK; task needs browser, dts, playground, etc. |
| Setup available but not applied | Repo documents setup, but this checkout has not installed it |
| Not ready | Unsupported toolchain or failed prerequisites |
| Unable to verify | No reliable way to inspect the environment |

Checks are non-mutating by default. Setup recommendation is `pnpm install` or Cursor **Set up Environment** — the package does not auto-install.

Proven bounded smoke on 2026-07-28: `pnpm test packages/shared --run`.

Details: `.cursor/skills/start-first-contribution/references/environment-readiness.md`.

## Issue discovery

Vue Core has official `good first issue` and `help wanted` labels, but they are often empty. Discovery therefore:

1. Inventories all labels (59 as of 2026-07-28).
2. Queries official newcomer labels.
3. Falls back to project-specific signals (`🔩 p2-edge-case`, `:hammer: p3-minor-bug`, contained scopes, maintainer invitations, roadmap lists).
4. Scans a broad open-issue page so unlabeled / uncategorized issues still appear as **triage-unknown** options (conditional at best — not exact newcomer-label matches).
5. Rejects active PRs, assignees, high-priority/SSR/architecture-risk work, and unresolved discussions.
6. Ranks at most three candidates with explicit confidence.

Helper script (read-only):

```bash
node .cursor/skills/find-first-contribution/scripts/discover-candidates.mjs
node .cursor/skills/find-first-contribution/scripts/discover-candidates.mjs --json
```

Signal taxonomy: `.cursor/skills/find-first-contribution/references/project-contribution-signals.md`.

**Important:** Always query the upstream tracker `vuejs/core`, even if your git remote is a fork.

### Access methods and fallbacks

1. Cursor GitHub integration  
2. Approved MCP (optional)  
3. Authenticated `gh` + GraphQL script  
4. Public browser  
5. Manual issue URL / export  

If access fails, the skills must not invent candidates.

## Starting from a known issue

```text
/start-first-contribution https://github.com/vuejs/core/issues/<n>
# or
/prepare-first-contribution <n>
```

Preparation revalidates ownership and linked PRs, maps sources/tests/docs/generated outputs, and produces a brief with a suggested Plan Mode prompt.

## Plan Mode handoff

The prepare skill stops at the brief. Copy the **Suggested Plan Mode Prompt** into Plan Mode. Plan Mode researches remaining implementation details and produces an editable plan. After you approve the plan, use normal Agent mode to implement.

## Maintainer updates

| Artifact | When to update | Source of truth |
|---|---|---|
| Rules under `.cursor/rules/` | Contributor/architecture guidance changes | `.github/contributing.md`, `maintenance.md` |
| `project-contribution-signals.md` | Every discovery run / ≤30 days | Live `vuejs/core` labels, forms, comments, roadmaps |
| `discover-candidates.mjs` label lists | When inventory names change | `gh label list` |
| `environment-readiness.md` | Node/pnpm/script/CI changes | `package.json`, workflows |
| `vue-change-surfaces.md` | Package/CI/layout changes | Workspace + contributing guide |
| Skill contracts | Cursor release behavior changes | Official Cursor docs |
| This guide | Journey or limitations change | Package contracts |

Revalidation tip: run the discovery script and compare exact label strings (watch for `:broom:  p1-chore` double spaces and shortcode vs emoji names).

## Safety and external-state boundaries

The package must not:

- assign, claim, comment on, or label issues
- push, open, merge, or release
- access secrets
- install dependencies during orientation
- edit product code solely to demonstrate onboarding
- present repository cleanups as endorsed tasks without maintainer confirmation

Project rules additionally require honest validation reporting and protection of generated `dist` / `temp` outputs.

## Known limitations

- Official newcomer labels can be empty; honesty is expected.
- `gh issue list --label` is unreliable for some Vue emoji/shortcode labels; use the GraphQL script.
- Public search may mix PRs into issue results; skills must filter.
- Project-board fields were not adopted as a suitability signal in the MVP.
- Subagent `readonly` depends on Cursor enforcing the frontmatter flag.
- Issue suitability is judgment over live evidence, not a static label lookup.
- Product docs may live in `vuejs/docs` / vuejs.org, not this repository.

## Live demo sequence

1. `/start-first-contribution find`
2. Review orientation + environment classification.
3. Watch discovery: primary labels empty → labeled fallback pools → unlabeled/uncategorized broad-page survivors → explicit rejects (active PRs, high-priority/SSR/architecture risk).
4. If a live candidate survives, select it and state whether it is an exact newcomer-label match or a conditional fallback survivor; otherwise say no safe recommendation and use a known-issue or historical learning path.
5. `/prepare-first-contribution <issue>`
6. Paste the suggested prompt into Plan Mode.
7. After plan approval, implement with normal Agent tools (do not use the onboarding skills as a coding loop).

Historical learning fallback (not claimable): issue `#14777` with merged PR `#14778` (reactivity + focused regression tests).

## Package paths

```text
.cursor/rules/00-new-contributor-core.mdc
.cursor/rules/10-package-boundaries-and-tests.mdc
.cursor/agents/project-onboarding-guide.md
.cursor/skills/start-first-contribution/
.cursor/skills/find-first-contribution/
.cursor/skills/prepare-first-contribution/
docs/cursor-onboarding-guide.md
CURSOR_ONBOARDING_SPEC_RECONCILIATION.md
CURSOR_ONBOARDING_IMPLEMENTATION_REPORT.md
```
