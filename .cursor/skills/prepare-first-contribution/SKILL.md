---
name: prepare-first-contribution
description: Prepare a selected Vue Core issue for Cursor Plan Mode by validating ownership and mapping current source, tests, precedents, validation, review, and release implications
disable-model-invocation: true
---

# Prepare first contribution (Vue Core)

Assemble a project-specific contribution brief, then hand off to **Cursor Plan Mode**. Do not implement unless the developer explicitly continues after the brief.

## Inputs

```yaml
issue_url_or_number: required
target_branch: optional
developer_constraints:
  timebox: optional
  local_or_cloud: optional
  browser_available: optional
```

Historical learning mode (demo/teaching only): closed issue + merged PR pairs such as `#14777` / `#14778` may be prepared if clearly labeled as non-claimable learning exercises.

## Steps

1. Validate repository and issue identity on `vuejs/core`.
2. Read the full issue, comments, labels, assignees, milestones, and linked context.
3. Search open/draft/merged/closed PRs associated with the issue.
4. Identify acceptance evidence and unresolved questions.
5. **Stop** if ownership is active or expected outcome is unresolved — emit a maintainer-confirmation brief without a Plan Mode prompt when appropriate.
6. Map to current sources with built-in search/Explore. Use `references/vue-change-surfaces.md` as a compact checklist.
7. Identify: package entry points, implementation functions, collocated tests, dts tests, fixtures/snapshots, playground/browser path, manifest/export implications, generated outputs, docs ownership (`vuejs/core` vs `vuejs/docs`).
8. Inspect 2–3 current precedents (nearest implementation, nearest test, representative merged contribution).
9. Identify expected companion changes (must-change / likely-change / inspect-only).
10. Assess local environment for this task (`../start-first-contribution/references/environment-readiness.md`).
11. Select bounded local validation commands; list CI and maintainer-only checks separately.
12. State branch (`main` vs `minor`) and release implications.
13. Produce the brief; end with a tailored Plan Mode prompt.
14. Do not implement; do not replace Plan Mode with a generic plan.

## Output

```md
# First-Contribution Brief

## Issue and Intended Outcome

## Current Status and Ownership

## Acceptance Evidence

## Relevant Repository Areas

## Current Precedents

## Expected Change Surface

## Tests and Documentation

## Generated and Public-Surface Implications

## Environment Readiness

## Validation

### Local

### CI

### Maintainer-Only

## Review and Ownership

## Release and Branch

## Role Handoffs

### PM

### QA

### DevOps

## Risks and Questions

## Suggested Plan Mode Prompt
```

## Brief rules

- Exact paths, not only package names.
- Separate must-change, likely-change, and inspect-only.
- Explain why each local validation command matters.
- For bug fixes: describe the test that should fail before the fix.
- For snapshots: require focused semantic assertions when needed.
- For public types: include DTS tests.
- For browser behavior: include browser evidence expectations.
- For runtime/compiler: mention size/tree-shaking when applicable.
- Preserve unknowns; do not fill with assumptions.
- Never claim checks passed when not run.

## Suggested Plan Mode prompt template

```text
Create an implementation plan for Vue Core issue #<number> using the attached
First-Contribution Brief.

Respect these constraints:
- target branch: <main|minor|unresolved>
- intended outcome: <accepted outcome>
- must-change surface: <paths>
- inspect-only precedents: <paths/PRs>
- required regression test: <description>
- local validation: <commands>
- CI/maintainer-only checks: <checks>
- generated/public API boundaries: <notes>
- unresolved questions: <questions>

Do not implement yet. Research any remaining current-code details, ask only
material clarifying questions, and return an editable file-specific plan.
```

## Failure behavior

| Condition                 | Behavior                                                                  |
| ------------------------- | ------------------------------------------------------------------------- |
| Closed/completed issue    | Stop unless historical learning mode was requested                        |
| Active linked PR/assignee | Stop and explain                                                          |
| No acceptance evidence    | Maintainer-confirmation brief; no Plan Mode prompt                        |
| Environment not ready     | Still produce repo context; recommend setup before Plan Mode execution    |
| Broad task                | Offer decomposition options; do not invent approval for a smaller subtask |
| Cross-repo docs/RFC       | Record as dependency, not automatic edit                                  |
