# Cursor agent package (Vue core)

Project enablement for Cursor (and Codex-compatible) agents contributing to this monorepo.

## Layout

| Path | Purpose |
| --- | --- |
| [`../AGENTS.md`](../AGENTS.md) | Shared always-on guide (Cursor + Codex + other tools) |
| [`rules/`](./rules/) | Enforceable Cursor rules (always-apply or glob-scoped) |
| [`agents/`](./agents/) | Custom subagents (engineer, reviewer, QA verifier) |
| [`../.agents/skills/`](../.agents/skills/) | Portable workflow skills (Agent Skills standard) |
| [`../.codex/agents/`](../.codex/agents/) | Codex-compatible agent copies |

## When to load what

- **Every coding task:** `AGENTS.md` + always-apply rules (contribution policy, architecture).
- **Editing package sources:** glob rules for coding constraints / tests activate automatically.
- **Named workflows:** invoke skills (`/onboard-contributor`, `/fix-bug`, `/add-regression-test`, `/prepare-pr`) or let the agent pick them by description. Skill bodies live under `.agents/skills/`.
- **Delegation:** parent agent may spawn `vue-core-engineer`, `pr-reviewer`, or `qa-verifier`.

Do **not** dump the full skill bodies into every turn — skills load when relevant.

## Persona notes (framework core)

This is a framework repository, not an application product. Non-engineer personas map as follows:

| Persona | Primary use of this package |
| --- | --- |
| Software engineer (new) | `/onboard-contributor` → focused fix with `/fix-bug` + `/add-regression-test` |
| Reviewer / maintainer-style | `pr-reviewer` agent against contribution policy + size/perf |
| QA | `qa-verifier` + `/add-regression-test`; prefer unit/`runtime-test` over e2e unless needed |
| PM / designer | Prefer issue/RFC framing; do not invent public API — point at [vuejs/rfcs](https://github.com/vuejs/rfcs/discussions) |

## Maintenance

When `.github/contributing.md`, ESLint, or commit conventions change, update `AGENTS.md` and the matching rule/skill in the same PR. Prefer thin always-on rules; put long procedures in skills. Keep `.codex/agents/` mirrors in sync with `.cursor/agents/`.
