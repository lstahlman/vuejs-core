# Validation matrix

Map affected surfaces to existing repository commands. Verify flags against the checkout before running.

| Affected surface | Prefer first | Then expand | Notes |
| --- | --- | --- | --- |
| Single package unit behavior | `pnpm test <file-or-pattern> --run` | `pnpm test-unit --run <pkg>` | Append `--run` / `run` so non-interactive sessions exit |
| Platform-agnostic runtime | `@vue/runtime-test` specs | package unit project | Avoid jsdom unless DOM-specific |
| DOM / hydration / attrs | jsdom unit or targeted e2e | `pnpm test-e2e` | Browsers may need separate install |
| Compiler output | focused compiler specs + semantic asserts | package tests; review `.snap` diffs | Snapshots alone are insufficient |
| Public types / inference | dts-test edits | `pnpm test-dts` or `pnpm test-dts-only` | After current dts build when needed |
| Cross-package types | `pnpm check` | — | Also runs on pre-commit |
| Style / lint | rely on lint-staged for touched files | `pnpm lint`, `pnpm format-check` | Before handoff when feasible |
| Tree-shaking / size | `node scripts/verify-treeshaking.js` / `pnpm size` | size workflows | Runtime public features especially |
| Hot-path perf claim | `pnpm bench` / `pnpm bench-compare` | — | Only when making a perf claim |
| Workspace / install policy | review `pnpm-workspace.yaml` + lockfile | frozen install | Human approval for dependency changes |

Always record skipped broad checks with reason and confidence impact.
