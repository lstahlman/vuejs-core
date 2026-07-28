---
name: find-first-contribution
description: Discover and rank current first-contribution candidates in the installed Vue project using its live issue signals, ownership, activity, linked work, scope, and local testability.
---

# Find First Contribution

Discover credible first-contribution candidates in the **installed project**. Do not claim, assign, comment, edit files, or create branches.

## Reference

Read and, when access permits, refresh:

`.cursor/skills/find-first-contribution/references/project-contribution-signals.md`

## Issue access policy

Use the best already-exposed approved tool, in order:

1. Connected GitHub/tracker connector in the Cursor session
2. Existing approved MCP tool
3. Authenticated official high-level `gh` (`repo`, `label`, `issue`, `pr` view/list only)
4. Public browser for non-sensitive orientation only
5. Developer-supplied URLs/data

Never:

- generate custom API clients
- call REST/GraphQL directly
- use `gh api graphql`
- request/store tokens
- silently switch from installed project to research upstream

### Auth failure behavior

1. Stop live GitHub lookup
2. Classify `GitHub access unavailable`
3. Report the failed tool and high-level error
4. Ask the developer to connect/authorize an approved GitHub tool or authenticate `gh`
5. State the installed owner/repository that needs access
6. Continue only with repository-local orientation or developer-supplied issue data

## Steps

1. Resolve installed project and tracker (`OWNER/REPOSITORY`, fork parent, issues enabled).
2. Confirm contribution scope is the installed project. Do not query `vuejs/core` unless the developer explicitly requests read-only upstream discovery.
3. Read installed contribution guidance (`.github/contributing.md`, issue templates, maintenance notes).
4. Enumerate the complete live label inventory and descriptions.
5. Compare live signals with the reference file; mark additions/removals/drift.
6. Use common newcomer terms only as seeds (`good first issue`, `help wanted`, `beginner`, `starter`, `up for grabs`).
7. Query canonical signals, then fallbacks only when needed (see reference).
8. For each candidate, inspect body/comments, activity, assignees, linked/closing PRs, dependencies, maintainer guidance, likely package, and test needs.
9. Search open PR titles/bodies with high-level tools for the issue number.
10. Apply hard exclusions and the scoring rubric from the reference.
11. Return at most five, preferably three, ranked candidates.
12. Separate accepted issue-backed work from repository ideas requiring maintainer confirmation.

## Output

```md
# First-Contribution Candidates

## Search Basis
## Project Newcomer Signals
## Recommended Candidates
### Candidate
- Issue
- Why it may fit
- Expected learning
- Likely repository area
- Environment and validation needs
- Risks
- Activity and ownership status
- Confidence

## Candidates Rejected
## No-Issue Alternatives Requiring Maintainer Confirmation
## Access Limitations
## Recommended Next Step
```

## Honesty requirements

- Do not call an issue easy.
- Do not invent live state when access is missing.
- When no candidate clears the threshold, say so. A truthful empty result is success.
- If fork issues look mirrored/untriaged (empty discussion, no maintainer confirmation), keep scores conservative and prefer confirmation-required placement.

## Next step

When the developer selects a candidate, route to `/prepare-first-contribution` with that issue URL/number.
