# Environment Readiness Contract

Last verified against installed checkout on 2026-07-28.

## Authoritative inputs

Read these from the installed project before classifying readiness:

- `.node-version`
- `package.json#engines.node`
- `package.json#packageManager`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- any installed `AGENTS.md` or Cloud Environment setup files

Research defaults are stale if installed files differ.

## Read-only check sequence

1. Confirm git worktree; record branch and commit.
2. Compare `node --version` with `package.json#engines`.
3. Compare `pnpm --version` with `packageManager`.
   - Exact mismatch is a warning.
   - Wrong major / missing pnpm when `preinstall` enforces pnpm is **Not ready**.
4. Determine whether dependencies appear installed and usable (`node_modules`, ability to resolve local bins).
5. When usable, run the bounded smoke test:

   ```bash
   pnpm exec vitest run --project unit packages/shared/__tests__/escapeHtml.spec.ts
   ```

6. Only probe browser/e2e tooling when the selected task needs it.

Do **not** run `pnpm install`, browser downloads, or other provisioning unless the developer explicitly asks.

## Status meanings

| Status | Meaning | Typical next action |
|---|---|---|
| Ready | Identity resolved; tools satisfy current files; deps usable; smoke test passed | Continue explore / find / prepare |
| Partially ready | Core tools work; a task-specific capability is missing (browser binaries, dts outputs, etc.) | Continue with noted limitation, or set up the missing capability |
| Setup available but not applied | Version/lock/setup files exist, but deps or compatible tools are absent | Ask developer to choose repository setup or Cursor Set up Environment |
| Not ready | Current branch requirements cannot be met, install known broken, or wrong package manager enforced | Show blockers; do not pretend validation is credible |
| Unable to verify | Terminal/checks unavailable | Provide manual commands for the developer |

## Installed snapshot (2026-07-28)

Observed in the Cloud Agent environment used to author this package:

- Node `v22.14.0` (satisfies `>=20.0.0`)
- pnpm `11.13.0` (matches `packageManager`)
- Dependencies present
- Smoke test passed
- Classification: **Ready**

Re-run checks in every new session; do not treat this snapshot as permanent.

## Commands newcomers usually need later

Prefer repository-native pnpm unless `nr` is already available:

| Purpose | Command |
|---|---|
| Install (only after explicit consent) | `pnpm install` |
| Type-check | `pnpm run check` |
| Lint | `pnpm run lint` |
| Format check | `pnpm run format-check` |
| Focused unit test | `pnpm run test -- --run <file-or-pattern>` |
| Unit projects | `pnpm run test-unit` |
| Browser/e2e | `pnpm run test-e2e` |
| Declarations + type tests | `pnpm run test-dts` |
| Package build | `pnpm run build -- <package>` |
| SFC playground | `pnpm run dev-sfc` |
| Template explorer | `pnpm run dev-compiler` |
