# Review severity

## Blocking

Must resolve or explicitly accept before contribution handoff:

- Missing evidence for a bug fix (no repro / no regression where feasible)
- Package-boundary or import-rule violation
- Public API / RFC / wrong target-branch decision unresolved when the change requires it
- Snapshot-only proof for important compiler behavior
- Public type change without dts coverage
- Hand-edited generated output
- Validation claimed passed but skipped/failed/unavailable
- Companion path in the same subsystem clearly omitted (same helper/call pattern)

## Warning

Should be addressed or consciously deferred with owner:

- Validation narrower than affected surfaces without justification
- Possible docs / language-tools / ecosystem follow-up
- Size/perf risk on hot paths without measurement
- Large generated diffs needing closer human read
- Unrelated working-tree noise adjacent to the change

## Informational

Helpful context, not a gate:

- Suggested commit/PR title wording
- Optional broader CI jobs for maintainer confidence
- Historical precedent notes

Do not block on low-confidence style preferences that are not documented or enforced.
