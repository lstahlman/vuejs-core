# Precedent Evidence Guidance

Use precedents to understand current repository behavior, not to create universal rules.

## Classification

- `Explicit`: stated in project documentation, package manifests, scripts, or workflows.
- `Observed`: seen in current source, tests, issue metadata, or merged pull requests.
- `Inferred`: reasoned from explicit and observed evidence.

Low-confidence inferred findings must remain questions in the brief.

## Useful Precedent Types

- Contained chore or tooling changes: shows accepted scope and validation for non-behavior work.
- One-package bug fixes: shows collocated regression tests and targeted validation.
- Compiler changes: shows snapshots plus direct semantic assertions.
- Type changes: shows source and built declaration tests.
- Playground changes: shows browser/manual validation and private-tool boundaries.

## Search Hints

- Prefer recent merged PRs that touch the same package or symbol.
- Read the tests and changed files, not only the PR title.
- Check whether the PR had linked issues, snapshots, dts tests, browser proof, size reports, or maintainer comments.
- Record what the precedent proves and what it does not prove.

## Anti-Patterns

- Do not copy a file-pair pattern from one PR and require it everywhere.
- Do not treat a passing snapshot as semantic proof.
- Do not infer maintainer approval for a new task from a superficially similar merged PR.
- Do not turn optional CI or maintainer-only checks into local requirements unless current project guidance supports that.
