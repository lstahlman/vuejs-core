# Repository map (concise)

Canonical detail: `.github/contributing.md` (project structure).

## Public packages (`packages/`)

| Package | Responsibility |
| --- | --- |
| `reactivity` | Standalone reactivity primitives |
| `runtime-core` | Platform-agnostic runtime (VDOM, components, APIs) |
| `runtime-dom` | Browser DOM runtime |
| `runtime-test` | Lightweight test runtime / assertion helpers |
| `server-renderer` | SSR |
| `compiler-core` | Platform-agnostic compiler pipeline |
| `compiler-dom` | Browser-specific compiler transforms |
| `compiler-sfc` | Single File Component compiler |
| `compiler-ssr` | SSR-oriented compiler bits |
| `shared` | Cross-cutting, environment-neutral helpers |
| `vue` | Public meta-package / builds |
| `vue-compat` | Migration build |

## Private packages (`packages-private/`)

| Area | Responsibility |
| --- | --- |
| `dts-test` / `dts-built-test` | Public type / built declaration tests |
| `sfc-playground` | Local SFC playground (`pnpm dev-sfc`) |
| `template-explorer` | Compiler explorer (`pnpm dev-compiler`) |

## Boundary reminders

```text
compiler-sfc → compiler-dom → compiler-core → shared
                     ↓
vue → runtime-dom → runtime-core → reactivity → shared
```

- Cross-package imports use `@vue/*` package names.
- Compiler ↛ runtime and runtime ↛ compiler.
- Prefer `runtime-test` for platform-agnostic runtime tests; `runtime-dom`/jsdom only for DOM-specific behavior.
