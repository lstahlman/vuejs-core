# First-Contribution Brief

## Issue and Intended Outcome

- Current state:
- Scope:
- Approved, conditional, or unconfirmed:
- Intended base branch:

## Acceptance Evidence

- Reproduction:
- Expected behavior:
- Actual behavior:
- Maintainer comments:
- Unresolved ambiguity:

## Relevant Repository Areas

| Area | Evidence | Classification | Confidence |
| ---- | -------- | -------------- | ---------- |

## Current Precedents

| Precedent | What it shows | Classification | Limit |
| --------- | ------------- | -------------- | ----- |

## Expected Change Surface

- Source:
- Tests:
- Types/dts:
- Snapshots:
- Docs:
- Exports/manifests:
- Browser/e2e:
- Generated files:

## Tests and Documentation

- Minimum expected proof:
- Public docs implication:
- Checks that are not expected:

## Environment Readiness

- Base readiness:
- Task-specific dependencies:
- Gaps:

## Validation

1. Targeted local check:
2. Broader relevant local check:
3. Type or build check:
4. Browser/e2e/dts/size/tree-shaking check if applicable:
5. CI-only checks:
6. Maintainer-only checks:

## Review and Ownership

- Assignee or linked PR status:
- Review concerns:
- Performance or bundle-size concerns:
- Compatibility and release notes:

## Multi-Role Lens

### PM

- User impact:
- Acceptance:
- Non-goals:

### QA

- Reproduction:
- Regression matrix:
- Checks not run:

### DevOps

- CI jobs:
- Environment dependencies:
- Release or preview boundary:

## Risks and Questions

-

## Suggested Plan Mode Prompt

```text
Use Plan Mode for Vue Core issue <issue>. Start from the attached First-Contribution Brief.

Research the current implementation and verify every inferred change surface. Produce a focused plan for the intended behavior only. Include exact files or symbol areas, regression-test strategy, type/browser/generated-file implications, local validation commands, and CI-only checks. Respect Vue Core package boundaries and the <main|minor|unresolved> branch decision. Do not include unrelated refactors. Call out any assumption that still needs maintainer confirmation before implementation.
```
