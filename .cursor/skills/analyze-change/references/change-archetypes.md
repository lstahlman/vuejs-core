# Change archetypes

Use these checklists when planning. Prefer the narrowest matching archetype.

## AR-01 — Focused bug fix / behavior correction (existing API)

Typical packages: `compiler-*`, `runtime-*`, `reactivity`, `server-renderer`, `shared`.

Companion surfaces:

| Surface | Expectation |
| --- | --- |
| Implementation | Narrowest correct layer |
| Focused regression test | Required when feasible (fails before fix) |
| Snapshots | Conditional (compiler); add semantic assertions |
| Public types / dts | Conditional if inference/output changes |
| Docs / RFC | Usually N/A unless public semantics change |
| Target branch | `main` |
| Size / e2e | Conditional on hot path / browser-only behavior |

## AR-02 — Public API / feature addition

Companion surfaces:

| Surface | Expectation |
| --- | --- |
| RFC / maintainer acceptance | Human checkpoint before implementation |
| Target branch | `minor` when adding API surface |
| Tests | Feature + negative/warning cases |
| Types / dts | Usually required |
| Docs / language-tools | Often external companion work |
| Size / ecosystem | Call out impact |

## AR-03 — Type-system / declaration change

Companion surfaces:

| Surface | Expectation |
| --- | --- |
| `packages-private/dts-test` | Required |
| Built dts validation | `pnpm test-dts` / `test-dts-only` as appropriate |
| Runtime tests | Conditional if behavior also changes |
| Target branch | `main` unless new API |

## AR-04 — Build / CI / tooling / workspace policy

Companion surfaces:

| Surface | Expectation |
| --- | --- |
| Workflows / scripts | Primary |
| Lockfile / allow-build | Review supply-chain impact |
| Product packages | Avoid drive-by product changes |
| Target branch | `main` |

Do not invent a fifth archetype casually; if needed, state why and which companion surfaces still apply.
