---
name: find-first-contribution
description: Discover and rank current Vue Core contribution candidates by rebuilding the live project-specific issue taxonomy and checking scope, ownership, linked work, and validation
disable-model-invocation: true
---

# Find first contribution (Vue Core)

Discover credible first-contribution candidates. Do not claim, comment, label, or assign issues. Do not describe issues as “easy.”

## Tracker access (first available)

1. Cursor GitHub integration (if present)
2. Existing approved MCP (if present)
3. Authenticated `gh` + GraphQL (**recommended operational path**)
4. Public browser
5. Manual issue URL / export from the developer

Do not configure credentials. Do not create an MCP server.

## Steps

1. Read `.github/contributing.md` and `.github/maintenance.md`.
2. Load `references/project-contribution-signals.md`, then **revalidate** live tracker metadata:
   - Prefer `node .cursor/skills/find-first-contribution/scripts/discover-candidates.mjs --json`
   - Or `gh label list --repo vuejs/core --limit 200 --json name,description,color`
3. Refresh the signal reference when older than 30 days, labels fail, queues disagree with the reference, or the user asks for current candidates.
4. Inspect issue routing: `.github/ISSUE_TEMPLATE/`, https://new-issue.vuejs.org/, RFC contact link.
5. Run primary queries (`good first issue`, `help wanted`). Expect possible empty queues — report honestly.
6. Run Vue-specific fallback pools using **exact** label names from inventory (emoji/shortcode sensitive).
7. Always also inspect a broad page of current open issues (the discovery script’s `unlabeledOrUncategorized` section). Surface:
   - unlabeled issues as **triage-unknown** (missing labels ≠ negative, but also ≠ newcomer endorsement)
   - labeled issues outside known primary/fallback pools as **outside-known-signals**
     Do not hide these when official queues are empty. Cap confidence and prefer `conditional-maintainer-confirmation` unless body/comments prove otherwise.
8. For each promising issue, retrieve full body, comments, labels, assignees, milestone, and **independently** search linked PRs (`gh pr list --repo vuejs/core --state all --search "<n>"` and timeline refs).
9. Map likely package and validation using built-in search / Explore.
10. Apply hard exclusions (see reference). Score remaining with the rubric.
11. Return at most **three** recommended or conditional candidates. Include rejected examples to show judgment.
12. If none qualify, say so. Repository-discovered ideas must be labeled **requiring maintainer confirmation**.

## Hard exclusions (default)

Reject without explicit maintainer confirmation:

- assignee, claim, or open/draft linked PR
- `:exclamation: p4-important`, `:fire: p5-urgent`, security, release-critical
- public API / feature without approval or RFC
- `need discussion`, `need guidance`, `need more info`, unresolved expected behavior
- broad refactors / style-only work
- runtime-core renderer, hydration, Suspense, SSR memory/lifecycle, cross-package architecture, ecosystem-compat
- Vapor roadmap items lacking a sharply bounded approved task
- stale issues with no recent confirmation
- missing/disputed reproduction
- maintainer-only infrastructure dependence
- multiple prior failed PRs without a clarified current approach

## Rubric

After exclusions, score 0–100 using: maintainer acceptance, scope containment, acceptance clarity, local testability, architectural safety, activity/ownership, learning value (see reference).  
75+ recommend; 60–74 conditional-maintainer-confirmation; &lt;60 do not recommend.

## Output

```md
# First-Contribution Candidates

## Search Basis

- Repository and commit
- Tracker access method
- Verification timestamp
- Complete label inventory status
- Queries used

## Project Newcomer Signals

## Recommended Candidates

### Candidate

- Issue
- Status: recommended | conditional-maintainer-confirmation
- Why it may fit
- Acceptance evidence
- Expected learning
- Likely repository area
- Environment and validation needs
- Risks
- Activity and ownership status
- Score and confidence
- Evidence links

## Candidates Rejected

## No-Issue Alternatives Requiring Maintainer Confirmation

## Access Limitations

## Recommended Next Step
```

## Manual-input fallback

If `gh`/integrations fail: ask for an issue URL or pasted export; update signals only with what can be verified; do not invent a candidate list.

## Safety

Read-only tracker operations only. Always target `vuejs/core` even from a fork remote. Timestamp and access method on every result.
