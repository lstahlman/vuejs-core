# Vue Core environment readiness

**Verified against commit:** record SHA at check time.  
**Authoritative sources:** `.node-version`, `package.json` (`engines`, `packageManager`, scripts), `.github/contributing.md` (Development Setup, Scripts), `.github/workflows/test.yml`.

## Required baseline

| Item            | Expectation                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Node            | `>=20` (`engines.node`); `.node-version` is `lts/*`                                                    |
| Package manager | `pnpm` matching `packageManager` (currently `pnpm@11.13.0`); preinstall enforces pnpm via `only-allow` |
| Install         | `pnpm install` (creates workspace links, enables `simple-git-hooks`)                                   |
| Lockfile        | `pnpm-lock.yaml` present                                                                               |
| Workspace       | `packages/*`, `packages-private/*`                                                                     |

## Non-mutating check sequence

```bash
git branch --show-current
git rev-parse --short HEAD
node --version
pnpm --version
node -p "require('./package.json').packageManager"
test -d node_modules && echo "dependencies-present" || echo "dependencies-missing"
pnpm exec vitest --version
```

Bounded smoke (unit baseline; not a full suite):

```bash
pnpm test packages/shared --run
```

Task-specific additions (only when the selected work needs them):

| Need                       | Command / note                                                      |
| -------------------------- | ------------------------------------------------------------------- |
| Package unit filter        | `pnpm test <package-or-file-pattern> --run` or `pnpm test-unit ...` |
| Types                      | `pnpm check`                                                        |
| Declaration / public types | `pnpm test-dts` (builds dts first)                                  |
| E2E / browser              | `pnpm test-e2e` (builds first; needs Puppeteer/Playwright Chromium) |
| SFC Playground             | `pnpm dev-sfc`                                                      |
| Template Explorer          | `pnpm dev-compiler`                                                 |
| Lint / format              | `pnpm lint`, `pnpm format-check`                                    |

## Classification

Return exactly one label:

### Ready

Supported Node active; pnpm available at declared or verified-compatible version; dependencies installed; bounded unit smoke can run; task-specific extras available when required; developer knows correct base branch (`main` vs `minor`).

### Partially ready

Unit baseline works, but the selected task needs unavailable capabilities (browser binaries, dts build, playground, external reproduction, etc.).

### Setup available but not applied

Repository documents Node/pnpm/lockfile/install, but dependencies or tools are not installed in this environment.

### Not ready

Unsupported Node; wrong package manager rejected; install failed; target tests cannot start; required network/browser capability blocked.

### Unable to verify

No terminal access, opaque remote state, or permission boundary prevents checks.

## What not to do

- Do not install during orientation unless the developer explicitly asks.
- Do not treat a full-repo test run as a smoke test.
- Do not claim e2e/dts/CI passed when not run.
- Do not create `.cursor/environment.json` from onboarding skills; recommend Cursor **Set up Environment** when a reusable cloud env is needed.
- Maintainer-only: `/ecosystem-ci`, release secrets, protected-branch merges.

## CI versus local

PRs to `main` / `minor` run the reusable test workflow (unit, Windows subsets, e2e, lint, format, types, dts, tree-shaking, size reporting). Local newcomers should run focused package tests first, then broaden. See `.github/workflows/ci.yml` and `test.yml`.
