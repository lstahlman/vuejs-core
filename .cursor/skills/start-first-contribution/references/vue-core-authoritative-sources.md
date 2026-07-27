# Vue Core Authoritative Sources

Read these sources before making onboarding claims:

1. `.github/contributing.md`
   - PR acceptance criteria
   - `main` versus `minor`
   - setup and scripts
   - package structure
   - package import boundaries
   - test guidance
2. `.github/maintenance.md`
   - maintainer review criteria
   - branch and release workflow
   - performance, bundle-size, tree-shaking, and ecosystem concerns
3. `.github/commit-convention.md`
   - accepted commit prefixes and subject style
4. `package.json`
   - Node engine
   - pinned package manager
   - scripts
   - git hooks
5. `.node-version`
   - Node LTS intent
6. `pnpm-workspace.yaml`
   - workspace roots and catalog policy
7. `tsconfig.json`, `vitest.config.ts`, and relevant package manifests
   - aliases, test projects, exports, and dependencies
8. `.github/workflows/ci.yml` and `.github/workflows/test.yml`
   - CI jobs, browser setup, lint, format, type, dts, unit, e2e, and tree-shaking checks

Important boundaries:

- Public user documentation generally lives in the separate `vuejs/docs` repository.
- Generated build outputs such as `dist/` and `temp/` are not onboarding edit targets unless current project guidance says otherwise.
- `@vue/runtime-test` is a test helper under `packages/runtime-test`; do not treat it as ordinary public runtime API.
