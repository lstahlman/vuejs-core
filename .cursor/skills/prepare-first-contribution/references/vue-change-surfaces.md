# Vue Core change surfaces (compact map)

Use as a lookup while preparing a contribution brief. Regenerate judgment from the live tree when architecture shifts. Authoritative narrative: `.github/contributing.md`, `.github/maintenance.md`.

## Package groups

| Area                      | Path                                          | Typical validation                             | First-contribution caution                           |
| ------------------------- | --------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| Reactivity                | `packages/reactivity`                         | Collocated unit tests                          | Small diffs can have broad semantic impact           |
| Runtime core              | `packages/runtime-core`                       | `__tests__`, often `@vue/runtime-test`         | Renderer, lifecycle, Suspense, hydration = high risk |
| Runtime DOM               | `packages/runtime-dom`                        | Unit + possibly e2e/browser                    | Platform semantics                                   |
| Runtime test utils        | `packages/runtime-test`                       | Used by other packages’ tests                  | Prefer for platform-independent runtime assertions   |
| Server renderer           | `packages/server-renderer`                    | SSR-focused unit tests                         | Memory/lifecycle issues often not newcomer-safe      |
| Compiler core/dom/ssr/sfc | `packages/compiler-*`                         | Collocated tests, snapshots, Template Explorer | Wide syntax/output implications                      |
| Shared                    | `packages/shared`                             | Unit tests                                     | Avoid runtime/compiler leakage                       |
| Public vue                | `packages/vue`                                | Build/integration awareness                    | Distribution / public API                            |
| Compat                    | `packages/vue-compat`                         | Compat-specific tests                          | Legacy behavior                                      |
| DTS tests                 | `packages-private/dts-test`, `dts-built-test` | `pnpm test-dts`                                | Public type regressions                              |
| SFC Playground            | `packages-private/sfc-playground`             | `pnpm dev-sfc`, browser                        | Contained but public demo surface                    |
| Template Explorer         | `packages-private/template-explorer`          | `pnpm dev-compiler`                            | Compiler debugging aid                               |

## Generated / non-edit surfaces

- `packages/*/dist` — build outputs
- `temp/` — intermediate dts / tooling output
- Rolled-up declaration bundles from `pnpm build-dts`

Edit sources; regenerate with scripts.

## Companion-change checklist

| If you change…               | Also consider…                                                      |
| ---------------------------- | ------------------------------------------------------------------- |
| Runtime behavior             | Failing unit test; size/hot-path notes; `__DEV__` tree-shaking      |
| Compiler output              | Snapshot + focused string assertions; SSR/compiler-dom implications |
| Public types                 | `packages-private/dts-test`; `pnpm test-dts`                        |
| Package exports / re-exports | Dependency declarations in `package.json`                           |
| Playground UX                | Browser evidence; avoid claiming core runtime fix without tests     |
| Public docs behavior         | Often `vuejs/docs` or vuejs.org — confirm ownership before editing  |

## Branch / release

- Fixes & non-public-API refactors → `main`
- New API / features → `minor` (+ approval/RFC when required)
- Commit messages → `.github/commit-convention.md`
- Approvals → maintenance handbook (fixes generally ≥2 team approvals)

## Representative precedent shapes (examples, not mandates)

- Contained chore: workspace/config one-file change (e.g. historical `#15106`)
- Private tool tweak: playground behavior (e.g. historical `#15137`)
- Test-backed core fix: source + focused runtime regression tests (e.g. historical `#14778`)

Always prefer nearest current precedents found via search over these snapshots.
