# Implementation checklist

## All archetypes

- [ ] Narrowest correct package/file
- [ ] Package-name imports; dependency declarations updated if needed
- [ ] No compiler/runtime boundary leak
- [ ] `__DEV__` gating for warnings / expensive diagnostics
- [ ] Diff scoped to the task

## AR-01 bug fix

- [ ] Failing focused regression exists (or document why not)
- [ ] Analogous call paths in the same subsystem checked for companion updates
- [ ] Semantic assertions for compiler output when snapshots change

## AR-02 public API / feature

- [ ] Human/RFC acceptance recorded
- [ ] Target branch recommendation is `minor` when adding API surface
- [ ] Types/exports/tests cover positive and negative cases
- [ ] External docs/language-tools impact identified (not silently edited)

## AR-03 types / declarations

- [ ] `packages-private/dts-test` coverage
- [ ] Built declaration validation considered (`pnpm test-dts`)

## AR-04 build / CI / tooling

- [ ] No drive-by product package edits
- [ ] Lockfile / allow-build / supply-chain impact reviewed
- [ ] Workflows match local command guidance
