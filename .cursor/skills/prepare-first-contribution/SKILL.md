---
name: prepare-first-contribution
description: Prepare Vue-specific repository, test, documentation, branch, precedent, and validation context for a selected installed-project issue before Cursor Plan Mode.
---

# Prepare First Contribution

Assemble a project-specific contribution brief for a selected issue. Do not implement code and do not replace Plan Mode with a generic implementation plan.

## Reference

`.cursor/skills/prepare-first-contribution/references/vue-change-surfaces.md`

## Steps

1. Resolve installed project identity and ensure the issue belongs to the selected contribution project.
   - If the issue is from research upstream while this checkout is a fork, label it upstream read-only unless the developer explicitly changes contribution scope.
2. Read the full issue and linked context.
3. Recheck state, activity, assignees, claimant comments, blockers, and PRs with approved high-level tracker tools.
4. Extract acceptance evidence; distinguish reporter expectation from maintainer-approved behavior.
5. Map the smallest relevant source area, colocated tests, type tests, snapshots, docs, examples, and generated-output boundaries using the change-surface reference and live search.
6. Find two or three current implementation/test precedents, preferring the installed branch/history.
7. Classify fix/feature/refactor/chore and select the installed branch policy (`main` vs `minor` when that guidance remains current).
8. Identify companion changes: regression test, direct snapshot assertion, declaration test, dependency manifest, docs, size/perf explanation.
9. Reuse readiness results; probe only task-specific missing capabilities.
10. Produce the brief and recommend Cursor Plan Mode.
11. Stop. Implementation begins only when the developer explicitly continues in Agent mode after planning.

## Output

```md
# First-Contribution Brief

## Issue and Intended Outcome
## Acceptance Evidence
## Relevant Repository Areas
## Current Precedents
## Expected Change Surface
## Tests and Documentation
## Environment Readiness
## Validation
## Review and Ownership
## Risks and Questions
## Suggested Plan Mode Prompt
```

## Suggested Plan Mode Prompt requirements

The prompt must include:

- installed identity / contribution project
- recommended base branch
- issue URL
- acceptance evidence summary
- likely files/packages
- required tests/validation
- non-goals
- unresolved questions

It must ask Plan Mode to research before editing and keep the plan scoped. It must not itself be a full implementation plan.

## Stop conditions

Stop and ask before recommending Plan Mode handoff when:

- ownership or intended behavior is unresolved
- a current PR/claim exists
- selected work is security-sensitive
- implementation belongs to another repository
- environment cannot support even the planned focused validation and the developer has not chosen a setup path

## Non-goals

- Implementing the fix
- Claiming or commenting on the issue
- Generic multi-option architecture brainstorming unrelated to the issue
- Running maintainer-only ecosystem CI
