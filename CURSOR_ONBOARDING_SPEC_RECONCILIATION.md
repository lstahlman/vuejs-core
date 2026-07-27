# Cursor Onboarding Specification Reconciliation

## Summary

The research specification is accepted with narrow updates for the current Vue Core checkout and current Cursor documentation. The implemented package remains repository-local, read-only during onboarding, and focused on Vue-specific contribution judgment rather than search, setup, planning, implementation, or review.

## Material Decisions

| Spec Item                                        | Current Evidence                                                                                                   | Decision                  | Reason                                                                       | Implementation Impact                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Add repository-local Cursor package              | No existing `.cursor/`, `.agents/`, `.cursorrules`, or `AGENTS.md` in this checkout                                | Accept                    | There is no current package to merge with                                    | Create a new `.cursor/` tree                                    |
| Use `.cursor/rules/*.mdc`                        | Cursor Rules docs recognize `.cursor/rules` and `.mdc`                                                             | Accept                    | Current format matches the spec                                              | Add two focused rules                                           |
| Use YAML array `globs`                           | Cursor Rules docs show comma-separated multi-glob strings                                                          | Modify                    | Current docs explicitly describe comma-separated patterns                    | Use one comma-separated `globs` string                          |
| Use `.cursor/skills/<name>/SKILL.md`             | Cursor Skills docs discover `.cursor/skills` and require folder name matching `name`                               | Accept                    | Current format matches the spec                                              | Add three repo-level skills                                     |
| Use `disable-model-invocation` for start skill   | Cursor Skills docs support this field                                                                              | Accept                    | The entry point should be explicit                                           | Keep `/start-first-contribution` manual                         |
| Use `.cursor/agents/project-onboarding-guide.md` | Cursor Subagents docs support `.cursor/agents`, `readonly`, `model`, and `is_background`                           | Accept                    | The task benefits from isolated read-only context                            | Add one read-only subagent                                      |
| Node baseline                                    | `.node-version` is `lts/*`; `package.json` requires `>=20.0.0`; local Node is v22.14.0                             | Modify                    | The spec implied a current LTS alignment but the file is not a fixed version | Readiness script treats `lts/*` plus engine floor as the source |
| Package manager                                  | `package.json` pins `pnpm@11.13.0`; local pnpm is 11.13.0                                                          | Accept                    | Matches current checkout                                                     | Readiness script checks exact packageManager version            |
| Root docs location                               | No root `docs/` directory exists                                                                                   | Accept with note          | The guide creates a new doc area rather than extending an existing one       | Add `docs/cursor-onboarding-guide.md`                           |
| Runtime-test package classification              | `packages/runtime-test` is under `packages/` but has private-package behavior                                      | Modify                    | It is a key test helper but not a public runtime surface                     | References call it out as a test helper                         |
| Issue discovery                                  | `gh` is authenticated read-only; open `good first issue`, `help wanted`, and `easy to merge` queues returned empty | Accept                    | Discovery must tolerate no recommended candidates                            | Skill requires honest empty-result handling                     |
| Optional Bugbot/review artifacts                 | No evidence that maintainers want Cursor Bugbot context                                                            | Defer                     | Avoid duplicating built-in review or other review automation                 | No Bugbot file or review skill added                            |
| Environment provisioning                         | Repo setup is `pnpm i`; Cursor has built-in setup                                                                  | Reject as package feature | Onboarding should detect state, not install or provision                     | Script is read-only and never installs                          |

## Corrected Onboarding Baseline

Authoritative sources remain `.github/contributing.md`, `.github/maintenance.md`, `.github/commit-convention.md`, `package.json`, `.node-version`, `pnpm-workspace.yaml`, `tsconfig.json`, `vitest.config.ts`, and `.github/workflows/{ci,test}.yml`.

The package routes a newcomer through orientation, readiness, issue discovery or known-task preparation, and a Plan Mode prompt. It does not implement the contribution itself.

## Corrected Environment Model

The readiness model distinguishes:

- `Ready`: reserved for sessions where setup and at least one relevant validation check are known to have passed.
- `Partially ready`: dependencies and core tools are present, but browser capability or validation is not proven.
- `Setup available but not applied`: repository setup exists but dependencies or required tools are missing.
- `Not ready`: repository identity, Node, pnpm, or task branch prerequisites fail.
- `Unable to verify`: terminal access or repository identity cannot be established.

The committed script only probes; it does not install dependencies or run validation suites.

## Corrected Issue-Discovery Model

The current issue-access method is authenticated `gh` CLI in read-only mode. The skill must fetch current labels and inspect full issue context before recommending anything. Empty explicit queues are valid output, and no repository-discovered idea is approved work without maintainer confirmation.

## Corrected Cursor Artifact Set

Implemented MVP:

- `.cursor/rules/00-new-contributor-core.mdc`
- `.cursor/rules/10-vue-core-change-surface.mdc`
- `.cursor/agents/project-onboarding-guide.md`
- `.cursor/skills/start-first-contribution/SKILL.md`
- `.cursor/skills/start-first-contribution/scripts/check-readiness.mjs`
- `.cursor/skills/start-first-contribution/references/vue-core-authoritative-sources.md`
- `.cursor/skills/find-first-contribution/SKILL.md`
- `.cursor/skills/find-first-contribution/scripts/score-candidates.mjs`
- `.cursor/skills/find-first-contribution/references/issue-signals-and-rubric.md`
- `.cursor/skills/prepare-first-contribution/SKILL.md`
- `.cursor/skills/prepare-first-contribution/references/contribution-brief-template.md`
- `.cursor/skills/prepare-first-contribution/references/precedent-evidence-guidance.md`
- `docs/cursor-onboarding-guide.md`

## Deferred or Rejected Recommendations

- No custom MCP server.
- No environment setup or installer skill.
- No generic code search, planning, implementation, browser, review, or security agent.
- No Bugbot context until repository approval and repeated review misses justify it.
- No issue mutation, claiming, assignment, labels, comments, branches, or PRs from onboarding skills.

## Remaining Uncertainties

- Cursor runtime discovery of these project artifacts must be verified in a desktop or Cloud Agent UI that exposes the Skills, Rules, and Subagents panels.
- Linked-PR timeline richness depends on the available issue integration. The package supports `gh`, browser, and manual fallback.
- Current first-contribution suitability depends on live issue state and maintainer confirmation.
- Browser capability for playground/e2e tasks is task-specific and should not be inferred from installed Node dependencies alone.
