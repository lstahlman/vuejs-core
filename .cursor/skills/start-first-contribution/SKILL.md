---
name: start-first-contribution
description: Explicitly start a Vue Core newcomer session, orient to the repository, assess environment readiness, and route to issue discovery or contribution preparation.
disable-model-invocation: true
---

# Start First Contribution

Use this skill only when explicitly invoked as `/start-first-contribution` or when the developer clearly asks to begin a Vue Core first-contribution onboarding session.

## Inputs

Optional:

- `intent`: `explore`, `find-work`, or `start-known-task`
- `issue`: URL or number
- `area`: package or interest
- `validation_constraints`
- `environment_mode`: `local`, `cloud`, or `unknown`

If intent is absent, ask one compact routing question:

```text
Are you exploring Vue Core, looking for a first issue, or starting a known issue?
```

## Instructions

1. Confirm the workspace is Vue Core using `package.json`, `pnpm-workspace.yaml`, and `.github/contributing.md`.
2. Read `references/vue-core-authoritative-sources.md`.
3. Invoke or emulate the `project-onboarding-guide` subagent with the developer's interests and constraints.
4. Run only non-mutating readiness checks. You may run `scripts/check-readiness.mjs`.
5. Report the readiness classification and evidence. Do not install dependencies or write environment configuration.
6. If setup is missing, recommend the repository's `pnpm i` path or Cursor's built-in Set up Environment. Do not perform setup inside this skill.
7. If no task is selected, route to `/find-first-contribution`.
8. If a task is selected, route to `/prepare-first-contribution`.
9. End with one clear next action.

## Output

```md
# First-Contribution Session

## Developer Goal
## Project Orientation Summary
## Environment Status
## Contribution Status
## Recommended Next Action
```

## Failure Behavior

- If this is not Vue Core, stop and identify the evidence.
- If terminal access is unavailable, classify readiness as `Unable to verify` and continue from file facts only.
- If dependencies are absent, classify as `Setup available but not applied`.
- If browser capability is unavailable, usually classify as `Partially ready` unless the selected task requires browser proof.
- If issue access is unavailable, route to manual issue URL input or repository-area exploration. Do not invent issue candidates.
