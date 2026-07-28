# Vue Change Surfaces

Route a selected issue to the smallest relevant source, test, docs, and validation surface. Re-read installed package manifests and contribution docs if they differ from this map.

## Package map (top level)

Public / core packages under `packages/`:

| Package | Typical ownership |
|---|---|
| `reactivity` | Reactive primitives and effects |
| `runtime-core` | Platform-agnostic runtime, renderer, components |
| `runtime-dom` | DOM runtime |
| `runtime-test` | Private test renderer support |
| `server-renderer` | SSR |
| `compiler-core` | Platform-agnostic compiler |
| `compiler-dom` | DOM compiler |
| `compiler-sfc` | Single File Component compiler |
| `compiler-ssr` | SSR compiler transforms |
| `shared` | Shared utilities (watch compiler-only helpers) |
| `vue` | Public package composition |
| `vue-compat` | Migration build |

Private support under `packages-private/`:

| Area | Role |
|---|---|
| `dts-test` | Source-facing type tests |
| `dts-built-test` | Built declaration tests |
| `sfc-playground` | SFC playground |
| `template-explorer` | Template explorer |
| `vite-debug` | Internal debugging aid |

## Architecture reminder

```text
vue
├── runtime-dom
│   └── runtime-core
│       └── reactivity
└── compiler-dom
    └── compiler-core

compiler-sfc → compiler-core + compiler-dom
server-renderer and shared support the relevant layers
```

Cross-package imports use package names. Compiler ↛ runtime and runtime ↛ compiler.

## Archetype → surface routing

| Archetype | Likely source | Likely tests | Docs | Validation |
|---|---|---|---|---|
| Repo-local docs/playground correction | One README/example/playground file | Usually none; targeted playground build if executable | The change itself | `format-check`; playground run when needed |
| Contained runtime/reactivity regression | One `packages/*/src` file | Colocated `__tests__`; `runtime-test` when platform-agnostic | Only if public behavior docs need updating | Focused Vitest → check/lint; build/size if runtime |
| Type behavior correction | Public types + `packages-private/dts-test` or built dts tests | Minimal compile-time assertions | API docs only if semantics change | Focused type test; `pnpm run test-dts` before handoff |
| Compiler diagnostic/codegen correction | One transform/parser area | Existing spec + snapshot + direct assertion | Error text/package docs if user-facing | Focused compiler test, check/lint, snapshot review |

## Generated vs tracked expectations

| Path | Treatment |
|---|---|
| `packages/*/src`, colocated `__tests__` | Normal edit surface |
| `__snapshots__` | Tracked expectations; review semantically |
| `packages/*/dist`, root `temp` | Generated; do not hand-edit/commit unless current instructions say so |
| `packages/vue/examples`, playground packages | Examples/dev surfaces; confirm ownership before broad changes |

## Branch classification

Using installed `.github/contributing.md` / `.github/maintenance.md` when unchanged:

- Fix / refactor / chore → `main`
- Public API or behavior-adding feature → `minor`

If installed guidance changes, follow installed guidance.

## Validation cheat sheet

| Need | Command |
|---|---|
| Focused unit | `pnpm run test -- --run <file-or-pattern>` |
| Unit projects | `pnpm run test-unit` |
| Types | `pnpm run check` |
| Lint / format | `pnpm run lint`, `pnpm run format-check` |
| Declarations + dts | `pnpm run test-dts` |
| E2E/browser | `pnpm run test-e2e` |
| Package build | `pnpm run build -- <package>` |

CI also covers Windows compiler/SSR lanes, tree-shaking, size-report, and maintainer-gated ecosystem CI. Say when a check is local vs CI-only vs maintainer-only.

## Precedent hunt tips

Prefer recent merged PRs on the installed project history when available. Research-era upstream examples of focused contributions:

- Reactivity fix + colocated regression
- Hydration/DOM fix + regression
- Small repo-local docs correction

Always re-find precedents in the current checkout rather than copying research PR numbers as instructions.

## Stop / escalate conditions for prepare

Stop preparation and ask the developer before planning implementation when:

- ownership or intended behavior is unresolved
- a current PR/claim exists
- work is security-sensitive
- implementation belongs to another repository
- environment cannot support even focused validation and no setup path was chosen
