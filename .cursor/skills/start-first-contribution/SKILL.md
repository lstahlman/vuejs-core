---
name: start-first-contribution
description: Start a Vue Core contribution session by orienting the developer, assessing environment readiness, and routing to discovery or issue preparation
disable-model-invocation: true
---

# Start first contribution (Vue Core)

Explicit entry point for a new developer. Invoke with `/start-first-contribution`.

Optional forms:

```text
/start-first-contribution
/start-first-contribution explore compiler-sfc
/start-first-contribution find
/start-first-contribution https://github.com/vuejs/core/issues/14910
```

## Inputs

```yaml
intent: explore | find | start-known | unknown
interest: string | null
issue_url_or_number: string | null
environment_check: true | false  # default true
```

## Steps

1. Confirm this is Vue Core (fork remotes are OK; tracker host remains `vuejs/core`).
2. Determine intent from the invocation (explore / find / start-known / unknown). If unknown, briefly orient then present the three routes without a long questionnaire.
3. Invoke or apply the `project-onboarding-guide` subagent (read-only). Reuse its orientation summary.
4. Assess environment readiness using `references/environment-readiness.md`. Do **not** install or provision.
5. Route:
   - No task selected → run `find-first-contribution`.
   - Task selected → revalidate issue identity/state/ownership/linked PRs on `vuejs/core`, then run `prepare-first-contribution`.
6. If cloud/local setup is missing and execution will require it, recommend Cursor **Set up Environment** or `pnpm install`. Do not create `.cursor/environment.json` here.
7. End with **exactly one** recommended next action.
8. Do not implement code in this skill.

## Output

```md
# Vue Core First-Contribution Start

## Your Intent
## Orientation Summary
## Environment Readiness
## Routed Workflow
## Result
## Recommended Next Action
```

Detailed discovery or preparation artifacts may follow the wrapper.

## Failure behavior

| Condition | Behavior |
|---|---|
| Wrong repository | Stop; identify expected Vue Core checkout |
| No terminal | Readiness = Unable to verify; continue read-only orientation |
| No issue access | Use public browser or ask for URL/export; do not fabricate candidates |
| No safe candidates | Explain search basis; repository ideas only as maintainer-confirmation requests |
| Known issue closed or active PR | Do not prepare as new work; offer historical learning mode or return to discovery |
| Ambiguous intent | Orient, then offer explore / find / start-known |

## Safety

No issue claims/comments, no pushes/PRs, no secrets, no dependency installs unless the developer explicitly requests setup outside this skill’s default path.
