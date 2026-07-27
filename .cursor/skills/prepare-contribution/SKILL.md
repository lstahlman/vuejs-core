---
name: prepare-contribution
description: Produce a final Vue Core contribution summary for engineering, review, QA, product, and release or DevOps stakeholders after review and validation.
disable-model-invocation: true
---

# Prepare contribution

Explicit invocation only. Produce the shared handoff in `references/contribution-summary-template.md`.

## Preconditions

- Task intent and acceptance criteria.
- Final diff.
- `review-change` findings resolved or explicitly accepted.
- Validation command log (passes, failures, skips).
- Human-confirmed target branch when a PR is imminent.

## Procedure

1. Verify blockers are resolved or listed as open.
2. Read the final diff and validation results; do not reuse stale implementation summaries.
3. Identify user-visible behavior, implementation, affected systems, reviewer focus, QA scenarios, product acceptance, and operational/release impact.
4. State target branch / RFC / docs / external-repo status without changing them.
5. Produce the exact shared Markdown template.
6. Optionally suggest a conventional commit/PR title; do not commit or open a PR unless separately requested.
7. Return the summary in chat by default. Write to a file only at a user-specified path.

## Failure behavior

- Do not label validation complete when results are missing.
- Unresolved branch / API / RFC / release impact belongs in “Known risks and unanswered questions.”
- If user-visible behavior cannot be stated, mark product/QA portions incomplete rather than inventing criteria.
