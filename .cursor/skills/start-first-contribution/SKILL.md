---
name: start-first-contribution
description: Start a Vue newcomer session by orienting to the installed project, checking environment readiness, and routing to exploration, issue discovery, or a known issue.
disable-model-invocation: true
---

# Start First Contribution

Explicit entry point for a Vue newcomer session. Do not implement product code in this skill.

## Inputs

- optional intent: explore, find work, known issue
- optional issue URL/number
- optional interest area
- optional installed-project hint

## Steps

1. Determine intent from supplied input. Ask one concise question only if intent is truly ambiguous.
2. Resolve installed-project identity:
   - git root, remotes, current branch/commit
   - high-level `gh repo view` when available for owner/repo, fork parent, default branch, issues enabled
   - never mutate remotes
3. Delegate orientation/readiness to `.cursor/agents/project-onboarding-guide.md` (or perform the same read-only checklist if subagent delegation is unavailable).
4. Read `.cursor/skills/start-first-contribution/references/environment-readiness.md` and classify readiness without provisioning.
5. Display installed identity, upstream/fork relationship, branch, and readiness.
6. Route:
   - **explore** → return orientation and suggested areas, then stop
   - **find work** → invoke `/find-first-contribution`
   - **known issue** → verify the issue belongs to the installed contribution project, or obtain explicit permission for another scope; then invoke `/prepare-first-contribution`
7. If readiness is not Ready, recommend repository setup or Cursor Set up Environment / Cloud Environment Setup only for explicit gaps and only if available. Ask the developer to choose; do not install automatically.
8. End with exactly one primary next action and optional alternatives.

## Output

```md
# First-Contribution Session

## Installed Project
## Orientation Summary
## Environment Readiness
## Selected Path
## Access Gaps
## Next Action
```

Also include a short `Developer Goal` line when useful.

## Failure behavior

| Condition | Behavior |
|---|---|
| Unknown identity | Allow orientation; block tracker/branch/PR guidance |
| No terminal | Classify **Unable to verify**; give manual checks |
| No tracker tool | Route to manual issue input or connection instructions |
| Issue belongs to upstream while installed project is a fork | Keep upstream read-only until the developer explicitly changes contribution scope |
| Conflicting branch instructions | Show the conflict; prefer installed current files |
| Environment not ready | Continue orientation; discovery may continue with validation limitations noted |

## Non-goals

- Environment provisioning
- Issue claiming/commenting
- Implementation planning (that is Plan Mode after prepare)
- Editing repository source
