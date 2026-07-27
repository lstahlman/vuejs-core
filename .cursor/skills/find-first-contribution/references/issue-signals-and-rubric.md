# Vue Core Issue Signals and Rubric

Fetch labels at runtime. Names can include emoji, spacing, and punctuation, so match by exact current label name after discovery rather than hardcoding simplified names.

## Positive Signals

- `good first issue`: maintainer-designated newcomer signal, but still requires full issue inspection.
- `help wanted`: maintainers are open to outside help.
- `easy to merge`: lower-friction signal, not proof of suitability.
- Minor bug, nice-to-have, chore, or `need test` labels can be useful only when reproduction, ownership, and validation are clear.
- A contained `scope:` label helps route package search.
- Clear reproduction, expected behavior, recent maintainer guidance, and nearby tests increase confidence.

## Hard Exclusions Without Maintainer Confirmation

- Active assignee, active linked PR, or recent "I am working on this" claim.
- `has PR`.
- `need discussion`, `need guidance`, or `need more info`.
- Urgent or important priority labels.
- Security, release, publishing, credential, or dependency-policy work.
- New public API surface or RFC-level feature design.
- Broad refactors, style rewrites, migrations, or work justified only by coverage percentage.
- Runtime hot paths, hydration, Suspense, scheduler, vdom patching, broad SSR, or Vapor/VDOM interop unless explicitly scoped for a newcomer.
- Bugs without a current minimal reproduction.
- Public documentation work that belongs in `vuejs/docs` unless the task explicitly spans repositories.

## Scoring Factors

Score 0 to 3 for each factor, then apply hard exclusions:

1. Scope containment.
2. Clarity and acceptance evidence.
3. Local testability.
4. Architectural risk.
5. Dependencies and blockers.
6. Activity and ownership.
7. Documentation and reproduction quality.
8. Learning value.
9. Branch and release fit.

Interpretation:

- 22-27: recommend if no exclusion applies.
- 17-21: conditional; name the confirmation needed.
- 12-16: not recommended as a first contribution; may be an exploration task.
- 0-11: reject.

Confidence rules:

- Cap confidence at Medium without comments or ownership verification.
- Cap confidence at Low for repository-discovered ideas without an issue or maintainer request.
- A score never overrides a hard exclusion.
