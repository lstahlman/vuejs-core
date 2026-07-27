---
name: find-first-contribution
description: Find and rank current Vue Core first-contribution candidates using project labels, issue evidence, ownership, activity, linked work, risk, and local testability.
---

# Find First Contribution

Use this skill when a developer wants help finding credible first-contribution candidates in Vue Core. Do not claim, assign, label, comment on, close, or otherwise mutate issues.

## Inputs

Required:

- `repository`: `vuejs/core`

Optional:

- `interests`: runtime, compiler, reactivity, types, playground, tooling, docs
- `contribution_types`: bug-fix, test, type-fix, playground, chore
- `environment_readiness`
- `issue_access_method`
- `max_candidates`: default 3, maximum 5

## Access Order

Use the best already-approved read-only method:

1. Cursor GitHub integration.
2. Existing approved MCP integration.
3. Authenticated `gh` CLI.
4. Public browser access.
5. Manually supplied issue URL or exported issue data.

Never configure credentials or create a new integration for this skill.

## Discovery Process

1. Read `.github/contributing.md` and `references/issue-signals-and-rubric.md`.
2. Fetch current labels and descriptions at runtime.
3. Search explicit newcomer/community signals first:
   - `good first issue`
   - `help wanted`
   - `easy to merge`
4. If those queues are insufficient, search lower-risk labels by current label names:
   - priority chore labels
   - nice-to-have labels
   - minor-bug labels
   - `need test`
   - contained `scope:` labels matching the developer's interests
5. Also fetch a broad page of current open issues without relying on labels. Identify unlabeled issues and issues whose labels do not map to the known newcomer or lower-risk queues.
6. Treat unlabeled issues as triage-unknown: inspect the full body, comments, ownership, linked PRs, reproduction, likely package area, and validation path before considering them. Do not recommend an unlabeled issue from list metadata alone.
7. Exclude high-risk, unresolved, already-owned, or already-implemented work before scoring.
8. Fetch full issue body and accessible comments for every candidate considered for recommendation.
9. Check assignees, linked PRs, recent activity, maintainer guidance, reproduction, likely package area, and local validation path.
10. Use source search only to estimate package/test home. Do not design the implementation.
11. Optionally pass normalized issue metadata to `scripts/score-candidates.mjs`.

## Output

```md
# First-Contribution Candidates

## Search Basis

- Timestamp:
- Issue access method:
- Queries and labels inspected:
- Environment constraints:

## Project Newcomer Signals

## Recommended Candidates

### Candidate: #<number> - <title>

- Issue:
- Why it may fit:
- Expected learning:
- Likely repository area:
- Environment and validation needs:
- Risks:
- Activity and ownership status:
- Rubric score and factors:
- Confidence:
- Confirmation still needed:

## Candidates Rejected

## No-Issue Alternatives Requiring Maintainer Confirmation

## Access Limitations

## Recommended Next Step
```

If no candidate clears the threshold, state that plainly. Do not invent work.

Repository-discovered ideas must be labeled:

```text
Not approved work - ask a maintainer before implementation.
```
