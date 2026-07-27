---
name: prepare-first-contribution
description: Prepare Vue Core issue-specific source, test, docs, environment, CI, ownership, and review context before handing implementation planning to Cursor Plan Mode.
---

# Prepare First Contribution

Use this skill after a developer selects a known Vue Core issue or maintainer-approved task. Produce a contribution brief and Plan Mode prompt. Do not implement the change.

## Inputs

Provide one of:

- `issue_url`
- `issue_number`
- `task_statement`

Optional:

- `environment_readiness`
- `intended_base_branch`
- `developer_constraints`
- `selected_candidate_record`

## Instructions

1. Read the full issue or task and all accessible linked context.
2. Recheck current state immediately before preparation:
   - open or closed state
   - assignees
   - recent comments
   - linked or referenced PRs
   - maintainer scope or acceptance guidance
   - blockers and dependencies
3. State whether the task is approved, conditional, or unconfirmed.
4. Determine likely base branch from `.github/contributing.md` and task shape. Preserve ambiguity as a blocker.
5. Use Cursor's built-in search to locate relevant public symbols, source files, owning package, adjacent tests, type tests, browser/e2e cases, generated snapshots, precedents, package exports, and dependencies.
6. Inspect two or three recent merged precedents in the same area when useful and accessible. Distinguish observations from rules.
7. Classify findings as `Explicit`, `Observed`, or `Inferred`, with confidence.
8. Identify expected companion changes without asserting unsupported requirements.
9. Reuse environment readiness results and add task-specific gaps.
10. Define the smallest validation ladder:
    - targeted test
    - relevant package/unit tests
    - type check
    - dts, browser/e2e, build, size, or tree-shaking checks as applicable
    - CI-only and maintainer-only checks
11. Produce PM, QA, and DevOps role lenses.
12. End with a ready-to-paste Cursor Plan Mode prompt.

## Output

Use `references/contribution-brief-template.md`.

The suggested Plan Mode prompt should ask Cursor to research current code and produce a reviewable implementation plan. It must not be a generic implementation plan and must call out any assumption that still needs maintainer confirmation.

## Stop Conditions

- Issue is closed, superseded, actively owned, or already implemented.
- Root cause belongs to another repository.
- Reproduction is inaccessible and acceptance evidence is incomplete.
- Branch target is unresolved for a feature or public API change.
- No test precedent can be found; preserve uncertainty rather than inventing a convention.
