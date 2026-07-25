# AGENTS.md

## Cursor Cloud specific instructions

This is the **vuejs/core** monorepo (the `vue` framework). It is a pnpm workspace
under `packages/*` and `packages-private/*`. Package manager is **pnpm** (see the
`packageManager` field in `package.json`); Node 20+ is required. The startup
update script already runs `pnpm install`, so dependencies are ready when a
session begins.

For contributor docs and the full script reference, see `.github/contributing.md`
and the `scripts` block in `package.json`. Common commands:

- Lint: `pnpm lint` (ESLint). Format check: `pnpm format-check` (Prettier).
- Type check: `pnpm check` (`tsc --noEmit`).
- Unit tests (once, non-watch): `pnpm test-unit run`. Plain `pnpm test` / `pnpm test-unit` start Vitest in **watch mode** — append `run` to exit.
- The main runnable app is the **SFC Playground** (deployed at play.vuejs.org): `pnpm dev-sfc`, served at `http://localhost:5173/`.
- Other dev entry points: `pnpm dev` (bundles the `vue` package with watch), `pnpm dev-compiler` (Template Explorer on `http://localhost:3000`).

### Non-obvious gotchas

- **`pnpm dev-sfc` cold-start race.** The built artifacts in `packages/*/dist`
  are gitignored and absent on a fresh VM. `dev-sfc` starts the Vite server in
  parallel (`run-p`) with the package dev-builds, so on the **first** run Vite's
  dependency scan runs before the `vue` esm-bundler build finishes. You will see
  `Failed to run dependency scan` and repeated `Failed to resolve import "vue"`
  errors, and the page stays broken **even after** the builds finish (Vite cached
  an optimizeDeps result without `vue`). Fix: wait until all `built:` lines are
  printed, then **restart `pnpm dev-sfc` once**. On the second start the
  `packages/*/dist` files already exist on disk, the scan resolves `vue`
  immediately, and the playground works. A plain page reload is not enough — the
  process must be restarted. (This only affects the first run after `dist` is
  empty; once built, `dist` persists for the life of the VM.)

- **Commit hooks.** `simple-git-hooks` installs a `pre-commit` hook that runs
  `pnpm lint-staged && pnpm check` and a `commit-msg` hook that enforces the
  conventional-commit format (`scripts/verify-commit.js`). Commit messages must
  follow that convention (e.g. `fix(compiler): ...`).

- **e2e / browser tests.** `pnpm test-e2e` (and the `e2e-browser` Vitest project)
  need Puppeteer's Chromium and Playwright browsers, which are not downloaded by
  the default install. Unit-test CI sets `PUPPETEER_SKIP_DOWNLOAD=true`. If you
  need e2e, install browsers first: `node node_modules/puppeteer/install.mjs` and
  `pnpm exec playwright install chromium`.
