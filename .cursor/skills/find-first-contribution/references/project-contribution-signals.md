# Project Contribution Signals

> Maintained guidance, not a candidate cache. Revalidate live labels and issue state every discovery session.

## Identity

| Field | Value |
|---|---|
| Research upstream | `vuejs/core` (reference only) |
| Installed / contribution project | Resolve at runtime; authoring snapshot: `lstahlman/vuejs-core` |
| Last verification date | 2026-07-28 |
| Installed branch / commit checked | `main` @ `b5f8518379b77c3b62a7a9d2b52f6c76cda09bd5` |
| Runtime repository target | **Never hardcode**. Always query the installed `OWNER/REPOSITORY`. |

## Live label inventory (installed project, 2026-07-28)

The fork currently exposes **29** labels. This is narrower than the upstream research inventory (~59). Missing upstream labels at verification time included examples such as `has PR`, `:broom: p1-chore`, `🛑 on hold`, `wait changes`, `version: minor`, `breaking change`, and several additional scope labels.

Current names:

- `good first issue` — Good for newcomers
- `help wanted` — Extra attention is needed
- `bug`, `:lady_beetle:  bug`, `documentation`, `duplicate`, `enhancement`, `invalid`, `question`, `wontfix`
- `:cake: p2-nice-to-have`, `🔩 p2-edge-case`, `:hammer: p3-minor-bug`
- `:sparkles: feature request`
- `browser specific`, `has workaround`
- `need discussion`, `need documentation`, `need guidance`, `need more info`
- `scope: compiler`, `scope: custom elements`, `scope: playground`, `scope: reactivity`, `scope: sfc`, `scope: transition`, `scope: types`, `scope: vapor`, `scope:hydration`

If a live inventory differs, mark research/reference drift and trust the live list.

## Taxonomy

| Exact signal | Mechanism | Meaning | Suitability effect | Confidence | Notes |
|---|---|---|---|---|---|
| `good first issue` | Label | Explicit newcomer signal | Strong positive when current | High meaning; availability often low | Still require ownership/PR/clarity/testability checks |
| `help wanted` | Label | External attention welcomed | Moderate positive, never sufficient alone | High meaning; availability often low | Combine with bounded scope |
| Maintainer “good first PR” / equivalent invitation | Comment/phrase | Explicit invitation | Strong positive when current | High for exact current comment | Rare; must not be superseded |
| Required reproduction + expected/actual | Issue form fields | Valid bug intake / test seed | Positive prerequisite | High | Not a difficulty signal by itself |
| `need documentation` | Label | Docs clarification may be needed | Conditional positive | Medium | Confirm file is owned by installed repo |
| `:cake: p2-nice-to-have` / `🔩 p2-edge-case` | Priority labels | Lower urgency / edge case | Weak positive only after review | High | Spans tiny to architectural work |
| `:hammer: p3-minor-bug` | Priority label | Narrow/edge bug | Neutral to conditional positive | High | Needs clear repro + local test |
| `scope: *` | Component labels | Routing aid | Neutral; improves packaging | High | Combine with other signals |
| `need discussion` / `need guidance` / `need more info` | Blocker labels | Decision/evidence unresolved | Strong exclusion | High | Do not recommend |
| Assignee or acknowledged claimant | Assignment/comment | Someone may be working it | Negative until clarified | Medium | No reliable claiming protocol |
| Linked/open PR or closing references | Timeline/search | Implementation exists | Strong exclusion | High | Verify with issue view + PR search; do not assume a `has PR` label exists |
| Feature / RFC / breaking / security | Label/policy | Sensitive or large work | Hard exclusion for first contribution | High | Security uses `SECURITY.md` |
| Low priority alone | Priority label | Not “easy” | Never infer suitability | High | Cap score when no maintainer clarification |

## Query strategy

After resolving `OWNER/REPOSITORY` to the installed project:

```bash
gh label list --repo OWNER/REPOSITORY --limit 500 \
  --json name,description,color

gh issue list --repo OWNER/REPOSITORY --state open \
  --label "good first issue" --limit 100 \
  --json number,title,url,createdAt,updatedAt,labels,assignees,comments

gh issue list --repo OWNER/REPOSITORY --state open \
  --label "help wanted" --limit 100 \
  --json number,title,url,createdAt,updatedAt,labels,assignees,comments
```

For every candidate:

```bash
gh issue view NUMBER --repo OWNER/REPOSITORY \
  --json number,title,url,body,author,createdAt,updatedAt,labels,assignees,comments,closedByPullRequestsReferences

gh pr list --repo OWNER/REPOSITORY --state open \
  --search "NUMBER in:body" --limit 50 \
  --json number,title,url,author,updatedAt
```

### Fallback order when canonical queries are empty

1. Current maintainer invitation phrases in recently updated issues
2. `need documentation` only for files owned by the installed repository
3. Repo-local `scope: playground` / infra-like tasks with maintainer-confirmed bounded behavior
4. `p2` / `p3` priority labels, followed by full issue and PR review
5. Repository-discovered documentation/test gaps, clearly marked “requires maintainer confirmation”

Never silently switch the query repository to upstream.

## Scoring rubric (out of 100)

| Dimension | Points | Judgment |
|---|---:|---|
| Scope | 20 | One package/component; small traceable surface |
| Clarity | 20 | Reproduction, expected/actual, maintainer-confirmed intent |
| Local testability | 15 | Focused unit/type/playground check; no private service |
| Architectural risk | 15 | Avoid hot paths, public API design, release/security |
| Dependencies | 10 | No active PR, blocker, unresolved design |
| Activity/ownership | 10 | Recently verified; unassigned; no acknowledged claimant |
| Documentation quality | 5 | Full context and relevant links |
| Learning value | 5 | Teaches a coherent package/test pattern |

Modifiers:

- current `good first issue`: +10 (cap 100)
- current explicit maintainer invitation: +10 (cap 100)
- last substantive activity older than 12 months: −10
- only a low-priority label with no maintainer clarification: cap 60
- cross-repository docs ownership unresolved: cap 50

Recommend only scores ≥70 with no hard exclusion. Scores 50–69 may appear only under “requires maintainer confirmation.” Below 50 → rejected.

## Hard exclusions

Do not recommend without new maintainer confirmation:

- security-sensitive work
- urgent/release-critical work
- new APIs, breaking changes, RFC-scale features
- blocker labels above
- assignee / acknowledged claimant / active linked PR
- stale unretested reproductions
- renderer/component-instantiation hot paths, broad hydration/Suspense/Vapor/compiler design unless unusually explicit
- broad refactors, stylistic cleanup, benchmark-less performance work, snapshot-only “coverage”
- docs owned by another repository unless that project is explicitly selected
- work needing maintainer-only ecosystem CI, release credentials, or secrets for basic validation
- issues already fixed on the installed branch
- unlabeled repository ideas presented as accepted work

## Authoring-time observation (not a candidate list)

On 2026-07-28 for `lstahlman/vuejs-core`:

- open `good first issue`: 0
- open `help wanted`: 0
- open issues existed, but many had empty comment arrays and near-simultaneous updates
- treat such issues as low-confidence until maintainer confirmation and local repro are established

A truthful empty recommendation set is success.
