# Vue Core project contribution signals

```yaml
repository: vuejs/core
verified_at: 2026-07-27T21:27:36Z
verified_commit: b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5
access_method: gh
label_inventory:
  complete: true
  count: 59
```

> Maintained guidance, not permanent truth. Revalidate labels and candidate state every discovery run (and at least every 30 days). Prefer GraphQL `repository.label.issues` via `scripts/discover-candidates.mjs` because `gh issue list --label` stubs emoji/shortcode labels in this environment.

## Exact signals

| Exact signal | Mechanism | Meaning | Evidence | Consistency | Required combination | Effect | Confidence |
|---|---|---|---|---|---|---|---|
| `good first issue` | Label (“Good for newcomers”) | Official newcomer invitation | Label description; historical closed issues | Historically used; **0 open** on 2026-07-27 | Clear scope, no assignee, no linked PR, still accepted | Strong positive | High meaning / Low availability |
| `help wanted` | Label | Extra community attention wanted | Label description | **0 open** on 2026-07-27 | Bounded scope/difficulty | Positive, insufficient alone | High meaning / Low availability |
| `🔩 p2-edge-case` | Priority label | Edge behavior, lower urgency | 136 open issues via GraphQL | Frequent | Clear repro, no dispute, no open PR, contained surface, local tests | Conditional positive | High |
| `:hammer: p3-minor-bug` | Priority label (literal shortcode name) | Real but specific bug | 39 open | Frequent | Contained fix + repro; reject broad SSR/hydration/renderer by default | Conditional | High |
| `:cake: p2-nice-to-have` | Priority label | Non-breaking improvement | 41 open | Mixed (includes features) | Acceptance clarity; exclude `version: minor` features without approval | Weak / conditional | Medium |
| `:broom:  p1-chore` | Priority label (**two spaces** after emoji shortcode) | No behavior change / maintenance | 4 open | Sparse; often stale or `need discussion` | Maintainer invitation + low risk config surface | Weak positive | Medium |
| `:exclamation: p4-important` | Priority label | Documented-behavior / significant perf | `#15113` | Consistent risk | Maintainer confirmation required | Strong negative for newcomers | High |
| `:fire: p5-urgent` | Priority label | Build-breaking / broad impact | Label description | Risk signal | Never first contribution | Hard negative | High |
| `has PR` | Workflow label | Implementation already submitted | Label description | Direct exclusion when current | Also search linked PRs independently | Hard negative | High |
| Linked open/draft PR | Relationship | Active implementation | e.g. `#15096`→`#15097`, `#15126`→`#15136` | Stronger than label | Check state/draft/maintainer direction | Usually negative | High |
| Assignee / explicit claim | Assignment or comment | Work owned | Issue metadata | Per-issue | Unassigned unless collaboration invited | Negative | High |
| `need discussion` / `need more info` / `need guidance` | Workflow labels | Not actionable yet | Label inventory | Clear warnings | Resolution required | Strong/hard negative | High |
| `need test` / `need documentation` | Workflow labels | Completeness signals | Label inventory | Often PR-oriented | Do not invent tasks from these alone | Ambiguous | Medium |
| `scope: ...` | Scope labels | Likely subsystem | e.g. `scope: playground`, `scope: types` | Useful routing | Pair with priority + body + code | Neutral mapping | High |
| `easy to merge` | PR label | Merge simplicity | Inventory | PR-only | Never a first-task signal | Ambiguous | Medium |
| `ready for review` / `ready to merge` | PR workflow | Review state | Maintenance guide | PR-only | Not for issue discovery | Neutral | High |
| New issue helper | https://new-issue.vuejs.org/ | Structured bug intake | README, ISSUE_TEMPLATE/config.yml | Canonical for bugs | Good repro helps suitability ≠ approval | Positive evidence | High |
| Feature → RFC | Routing | Features belong in RFCs | ISSUE_TEMPLATE/config.yml, contributing | Canonical | Default exclude from first contribution | Negative | High |
| Maintainer phrases (“PR welcome”, “feel free to work on this”, approved approach) | Comments | Explicit invitation / boundary | Per-issue timeline | Strong when recent | No active implementation | Strong positive | High when present |
| Vapor Roadmap `#13687` | Documented issue list | Community opportunities in Vapor | Issue body | Explicit list | Bounded item + maintainer confirmation; architecture evolving | Positive source / negative risk modifier | High |

## Effective convention

```text
explicit maintainer invitation OR official newcomer label
+ bounded priority/scope evidence
+ complete reproduction or acceptance criteria
+ no assignee or active linked PR
+ local testability
+ low architectural/release risk
```

If the first line is absent, the result is a **conditional candidate requiring maintainer confirmation**, not an endorsed first issue.

## Query strategy

1. `gh label list --repo vuejs/core --limit 200 --json name,description,color` (or script `--labels-only`).
2. Primary: GraphQL issues for `good first issue` and `help wanted`.
3. Fallback pools with **exact** names from inventory (note `:broom:  p1-chore` spacing).
4. For each candidate: full body, comments, labels, assignees, milestones, linked PRs, repro, package map, validation path.
5. Apply hard exclusions, then score (see skill rubric). Return ≤3.
6. Access fallbacks: public browser → manual URL/export. Do not invent candidates.

### Preferred commands

```bash
node .cursor/skills/find-first-contribution/scripts/discover-candidates.mjs --json
gh label list --repo vuejs/core --limit 200 --json name,description,color
gh issue view <n> --repo vuejs/core --json number,title,url,state,body,labels,assignees,milestone,comments
gh pr list --repo vuejs/core --state all --search "<n>" --json number,title,url,state,isDraft,mergedAt
```

Avoid relying on `gh issue list --label "<emoji label>"` until verified fixed — it returned empty stub objects during 2026-07-27 validation.

## Known exceptions

- Official newcomer labels may be empty for long periods; emptiness is a valid result.
- Many `🔩 p2-edge-case` issues are old/stale or disputed; recency and maintainer confirmation matter.
- `scope: playground` on `#14910` is a typing/playground hypothesis without invitation — conditional only.
- Priority shortcode labels must be queried with leading `:emoji:` text, not rendered emoji (except `🔩` / `🛑` which are real characters).
- Always query tracker host `vuejs/core` even when the git remote is a fork.

## Suitability rubric (summary)

Score only after hard exclusions. Max 100:

- Maintainer acceptance 0–20
- Scope containment 0–15
- Acceptance clarity 0–15
- Local testability 0–15
- Architectural risk (higher = safer) 0–15
- Activity/ownership 0–10
- Learning value 0–10

Interpret: 75–100 recommend; 60–74 conditional; &lt;60 do not recommend; any hard exclusion → reject.
