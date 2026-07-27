# Cursor Onboarding Guide for Vue Core

This repository includes a small Cursor package for developers making an early Vue Core contribution. It helps with orientation, environment readiness, issue discovery, and contribution preparation before handing implementation planning to Cursor Plan Mode.

It does not replace Cursor search, Set up Environment, Plan Mode, Agent editing, browser testing, built-in review, GitHub integrations, MCP, or worktrees.

## Start

Invoke:

```text
/start-first-contribution
```

If no goal is supplied, the skill asks whether you are exploring Vue Core, finding a first issue, or starting a known issue.

## Orientation

The start skill routes to the read-only `project-onboarding-guide` subagent. The guide reads the current repository sources:

- `.github/contributing.md`
- `.github/maintenance.md`
- `.github/commit-convention.md`
- `package.json`
- `.node-version`
- `pnpm-workspace.yaml`
- `.github/workflows/ci.yml`
- `.github/workflows/test.yml`
- relevant package manifests and tests

It returns a concise package map, branch model, test and CI path, important conventions, readiness classification, and one next action.

## Environment Readiness

The start skill may run:

```bash
node .cursor/skills/start-first-contribution/scripts/check-readiness.mjs '{"repositoryRoot":".","allowCommandProbes":true}'
```

The script is read-only. It checks repository identity, Node, pnpm, current branch, dependency presence, and browser-package presence. It does not install dependencies or run validation suites.

Classifications:

- `Ready`: setup and at least one relevant validation check are known to have passed.
- `Partially ready`: core tools and dependencies are present, but task-specific proof is missing.
- `Setup available but not applied`: repository setup exists, but dependencies or required tools are missing.
- `Not ready`: repository identity, Node, pnpm, or branch prerequisites fail.
- `Unable to verify`: required facts cannot be checked.

## Finding Issues

Use `/find-first-contribution` when no issue is selected. The skill fetches current labels and issue metadata through the best read-only access method available:

1. Cursor GitHub integration.
2. Existing approved MCP integration.
3. Authenticated `gh` CLI.
4. Public browser access.
5. Manual issue URL or exported issue data.

The skill searches newcomer/community signals first, then lower-risk labels only if needed. It checks assignees, linked PRs, comments, reproduction quality, likely package area, and local validation. Empty queues are valid output.

Repository-discovered ideas are never approved work. They must be labeled:

```text
Not approved work - ask a maintainer before implementation.
```

## Starting From a Known Issue

Use `/prepare-first-contribution` with an issue URL, issue number, or explicit maintainer-approved task. The skill rechecks ownership and current issue state, maps likely source and tests, identifies validation, and produces a first-contribution brief.

The brief includes:

- issue and intended outcome
- acceptance evidence
- relevant repository areas
- current precedents
- expected source, tests, docs, types, generated, and browser surfaces
- validation ladder
- ownership and review concerns
- PM, QA, and DevOps lenses
- a Plan Mode prompt

## Plan Mode Handoff

Preparation ends by asking Cursor Plan Mode to research current code and produce a focused implementation plan. Plan Mode remains responsible for planning. Normal Agent mode remains responsible for code edits and validation after the developer chooses to proceed.

## Safety Boundaries

The onboarding package must not:

- install dependencies
- create or edit secrets
- provision environments
- claim, assign, label, comment on, close, or otherwise mutate issues
- create branches or pull requests as part of onboarding
- implement code before the developer selects and scopes a contribution
- replace built-in review or security review

## Maintaining the Package

Update the package when any of these change:

- `.github/contributing.md`, `.github/maintenance.md`, or branch policy
- package layout or import boundaries
- `package.json` scripts, Node, pnpm, or hooks
- CI workflow jobs
- issue labels or triage practice
- Cursor Rules, Skills, or Subagents file formats

Keep rules and skills short. Prefer links to authoritative files over copied guidance.

## Demo Flow

1. Invoke `/start-first-contribution`.
2. Say: `I am new to Vue Core and interested in compiler or playground work.`
3. Review orientation and readiness.
4. Invoke `/find-first-contribution`.
5. Accept that no credible candidate may be found.
6. For a known issue, invoke `/prepare-first-contribution issue #<number>`.
7. Review the brief and paste the generated prompt into Plan Mode.

## Known Limitations

- Cursor runtime discovery must be verified in the developer's Cursor environment.
- Issue metadata richness depends on the available integration.
- Browser readiness is task-specific and may require additional setup.
- The package improves contribution preparation; it does not guarantee maintainer acceptance.
