#!/usr/bin/env node
/**
 * Read-only Vue Core first-contribution discovery helper.
 *
 * Why this exists:
 * - `gh issue list --label` returns empty stub objects for several emoji/shortcode labels.
 * - GitHub search often returns PullRequest nodes even with `is:issue` for these labels.
 * - GraphQL `repository.label(name:).issues` returns real Issues with exact label names.
 *
 * Usage:
 *   node .cursor/skills/find-first-contribution/scripts/discover-candidates.mjs
 *   node .../discover-candidates.mjs --labels-only
 *   node .../discover-candidates.mjs --json
 *
 * Requires authenticated `gh`. Targets upstream vuejs/core even from a fork checkout.
 * Does not claim, comment, label, or otherwise mutate issues.
 */

import { spawnSync } from 'node:child_process'
import process from 'node:process'

const REPO_OWNER = 'vuejs'
const REPO_NAME = 'core'

const PRIMARY_LABELS = ['good first issue', 'help wanted']

// Exact API names observed 2026-07-27 (revalidate via --labels-only).
const FALLBACK_LABELS = [
  '🔩 p2-edge-case',
  ':hammer: p3-minor-bug',
  ':cake: p2-nice-to-have',
  ':broom:  p1-chore',
  'scope: playground',
  'scope: types',
]

const HARD_NEGATIVE_LABELS = new Set([
  ':exclamation: p4-important',
  ':fire: p5-urgent',
  'has PR',
  'need discussion',
  'need more info',
  'need guidance',
  'security',
  'transferred to rfc discussions',
])

function ghJson(args) {
  const result = spawnSync('gh', args, { encoding: 'utf8' })
  if (result.status !== 0) {
    const err = (result.stderr || result.stdout || 'gh failed').trim()
    throw new Error(err)
  }
  return JSON.parse(result.stdout)
}

function ghGraphQL(query, variables = {}) {
  // Use -F for JSON-typed variables (e.g. Int). -f always sends strings.
  const args = ['api', 'graphql', '-f', `query=${query}`]
  for (const [key, value] of Object.entries(variables)) {
    if (typeof value === 'number' || typeof value === 'boolean') {
      args.push('-F', `${key}=${JSON.stringify(value)}`)
    } else {
      args.push('-f', `${key}=${value}`)
    }
  }
  return ghJson(args)
}

function listLabels() {
  return ghJson([
    'label',
    'list',
    '--repo',
    `${REPO_OWNER}/${REPO_NAME}`,
    '--limit',
    '200',
    '--json',
    'name,description,color',
  ])
}

const ISSUE_NODE_FIELDS = `
  number
  title
  url
  updatedAt
  assignees(first: 10) { nodes { login } }
  labels(first: 30) { nodes { name } }
  timelineItems(itemTypes: [CROSS_REFERENCED_EVENT], last: 20) {
    nodes {
      ... on CrossReferencedEvent {
        willCloseTarget
        source {
          __typename
          ... on PullRequest {
            number
            title
            url
            state
            isDraft
            repository { nameWithOwner }
          }
        }
      }
    }
  }
`

function issuesForLabel(labelName, limit = 15) {
  const query = `
    query($name: String!, $limit: Int!) {
      repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
        label(name: $name) {
          name
          description
          issues(states: OPEN, first: $limit, orderBy: { field: UPDATED_AT, direction: DESC }) {
            totalCount
            nodes { ${ISSUE_NODE_FIELDS} }
          }
        }
      }
    }
  `
  const data = ghGraphQL(query, { name: labelName, limit })
  return data.data.repository.label
}

/**
 * Broad open-issue page that does not depend on newcomer/fallback labels.
 * Used when official queues are empty so unlabeled (or uncategorized) issues
 * are still visible for triage-unknown / conditional review.
 */
function recentOpenIssues(limit = 40) {
  const query = `
    query($limit: Int!) {
      repository(owner: "${REPO_OWNER}", name: "${REPO_NAME}") {
        issues(states: OPEN, first: $limit, orderBy: { field: UPDATED_AT, direction: DESC }) {
          totalCount
          nodes { ${ISSUE_NODE_FIELDS} }
        }
      }
    }
  `
  const data = ghGraphQL(query, { limit })
  return data.data.repository.issues
}

function linkedPullRequests(issue) {
  const refs = []
  const upstream = `${REPO_OWNER}/${REPO_NAME}`
  for (const node of issue.timelineItems?.nodes || []) {
    const source = node?.source
    if (source?.__typename !== 'PullRequest') continue
    // Ignore cross-repo references (common false positives in timelines).
    if (
      source.repository?.nameWithOwner &&
      source.repository.nameWithOwner !== upstream
    ) {
      continue
    }
    refs.push({
      number: source.number,
      title: source.title,
      url: source.url,
      state: source.state,
      isDraft: source.isDraft,
      repository: source.repository?.nameWithOwner || upstream,
      willCloseTarget: Boolean(node.willCloseTarget),
    })
  }
  return refs
}

function classifyIssue(issue) {
  const labelNames = (issue.labels?.nodes || []).map(l => l.name)
  const assignees = (issue.assignees?.nodes || []).map(a => a.login)
  const prs = linkedPullRequests(issue)
  const openOrDraftPrs = prs.filter(
    p => p.state === 'OPEN' || p.isDraft || p.state === 'open',
  )
  const negatives = labelNames.filter(n => HARD_NEGATIVE_LABELS.has(n))
  const reasons = []

  if (assignees.length) reasons.push(`assignees: ${assignees.join(', ')}`)
  if (openOrDraftPrs.length) {
    reasons.push(
      `open/draft PR(s): ${openOrDraftPrs.map(p => `#${p.number}`).join(', ')}`,
    )
  }
  if (negatives.length) reasons.push(`negative labels: ${negatives.join(', ')}`)

  return {
    number: issue.number,
    title: issue.title,
    url: issue.url,
    updatedAt: issue.updatedAt,
    labels: labelNames,
    assignees,
    linkedPullRequests: prs,
    excluded: reasons.length > 0,
    exclusionReasons: reasons,
  }
}

function parseArgs(argv) {
  return {
    labelsOnly: argv.includes('--labels-only'),
    json: argv.includes('--json'),
  }
}

function main() {
  const opts = parseArgs(process.argv.slice(2))
  const verifiedAt = new Date().toISOString()

  const labels = listLabels()
  const labelNames = new Set(labels.map(l => l.name))

  const knownSignalLabels = new Set([...PRIMARY_LABELS, ...FALLBACK_LABELS])

  const payload = {
    repository: `${REPO_OWNER}/${REPO_NAME}`,
    verifiedAt,
    accessMethod: 'gh-graphql',
    labelInventory: {
      complete: labels.length > 0,
      count: labels.length,
      names: labels.map(l => ({
        name: l.name,
        description: l.description || '',
      })),
    },
    primary: {},
    fallback: {},
    unlabeledOrUncategorized: {
      scanned: 0,
      openIssuesTotal: 0,
      unlabeled: [],
      outsideKnownSignals: [],
    },
    notes: [
      'Official newcomer labels are queried first; empty queues are expected and must be reported honestly.',
      'Fallback labeled pools are raw inputs for human/agent judgment — not endorsements.',
      'When primary queues are empty, a broad open-issue page surfaces unlabeled / uncategorized issues as triage-unknown (conditional at best).',
      'Revalidate each candidate (comments, reproduction, architecture) before recommending.',
    ],
  }

  if (opts.labelsOnly) {
    if (opts.json) {
      process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
    } else {
      console.log(`Label inventory for ${payload.repository}: ${labels.length}`)
      for (const l of labels.sort((a, b) => a.name.localeCompare(b.name))) {
        console.log(`- ${l.name}${l.description ? ` — ${l.description}` : ''}`)
      }
    }
    return
  }

  for (const name of PRIMARY_LABELS) {
    if (!labelNames.has(name)) {
      payload.primary[name] = { error: 'label missing from inventory' }
      continue
    }
    const label = issuesForLabel(name, 20)
    const issues = (label?.issues?.nodes || []).map(classifyIssue)
    payload.primary[name] = {
      totalCount: label?.issues?.totalCount ?? 0,
      issues,
    }
  }

  for (const name of FALLBACK_LABELS) {
    if (!labelNames.has(name)) {
      payload.fallback[name] = {
        error: 'label missing from inventory; refresh taxonomy',
      }
      continue
    }
    const label = issuesForLabel(name, 12)
    const issues = (label?.issues?.nodes || []).map(classifyIssue)
    payload.fallback[name] = {
      totalCount: label?.issues?.totalCount ?? 0,
      openWithoutHardExclusion: issues.filter(i => !i.excluded).length,
      issues,
    }
  }

  // Always scan a recent open-issue page so empty primary queues / missing
  // fallback-label matches cannot hide unlabeled work from discovery.
  const recent = recentOpenIssues(40)
  const recentIssues = (recent?.nodes || []).map(classifyIssue)
  payload.unlabeledOrUncategorized.openIssuesTotal = recent?.totalCount ?? 0
  payload.unlabeledOrUncategorized.scanned = recentIssues.length
  for (const issue of recentIssues) {
    if (issue.labels.length === 0) {
      payload.unlabeledOrUncategorized.unlabeled.push({
        ...issue,
        triageStatus: 'triage-unknown',
        note: 'No labels — inspect body/comments before any recommendation; conditional at best.',
      })
      continue
    }
    const overlapsKnown = issue.labels.some(n => knownSignalLabels.has(n))
    if (!overlapsKnown) {
      payload.unlabeledOrUncategorized.outsideKnownSignals.push({
        ...issue,
        triageStatus: 'outside-known-signals',
        note: 'Labels present but outside primary/fallback pools — do not treat as newcomer-endorsed.',
      })
    }
  }

  if (opts.json) {
    process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
    return
  }

  console.log(`# Vue Core candidate discovery (${verifiedAt})`)
  console.log(`Repository: ${payload.repository}`)
  console.log(`Labels: ${payload.labelInventory.count}`)
  console.log('')
  console.log('## Primary')
  for (const [name, block] of Object.entries(payload.primary)) {
    if (block.error) {
      console.log(`- ${name}: ${block.error}`)
      continue
    }
    console.log(`- ${name}: ${block.totalCount} open`)
    for (const issue of block.issues.slice(0, 5)) {
      console.log(`  - #${issue.number} ${issue.title}`)
    }
  }
  console.log('')
  console.log('## Fallback pools (pre-judgment)')
  for (const [name, block] of Object.entries(payload.fallback)) {
    if (block.error) {
      console.log(`- ${name}: ${block.error}`)
      continue
    }
    console.log(
      `- ${name}: ${block.totalCount} open; ${block.openWithoutHardExclusion} without hard exclusion in first page`,
    )
    for (const issue of block.issues.slice(0, 5)) {
      const flag = issue.excluded
        ? `REJECT (${issue.exclusionReasons.join('; ')})`
        : 'review'
      console.log(`  - #${issue.number} [${flag}] ${issue.title}`)
    }
  }
  console.log('')
  console.log('## Unlabeled / uncategorized (broad open page)')
  console.log(
    `- scanned ${payload.unlabeledOrUncategorized.scanned} of ${payload.unlabeledOrUncategorized.openIssuesTotal} open issues`,
  )
  console.log(
    `- unlabeled: ${payload.unlabeledOrUncategorized.unlabeled.length} (triage-unknown; conditional at best)`,
  )
  for (const issue of payload.unlabeledOrUncategorized.unlabeled.slice(0, 8)) {
    const flag = issue.excluded
      ? `REJECT (${issue.exclusionReasons.join('; ')})`
      : 'review'
    console.log(`  - #${issue.number} [${flag}] ${issue.title}`)
  }
  console.log(
    `- outside known primary/fallback signals: ${payload.unlabeledOrUncategorized.outsideKnownSignals.length}`,
  )
  for (const issue of payload.unlabeledOrUncategorized.outsideKnownSignals.slice(
    0,
    5,
  )) {
    const flag = issue.excluded
      ? `REJECT (${issue.exclusionReasons.join('; ')})`
      : 'review'
    console.log(`  - #${issue.number} [${flag}] ${issue.title}`)
  }
  console.log('')
  console.log(
    'Next: inspect full issue bodies/comments and score with the skill rubric.',
  )
}

try {
  main()
} catch (error) {
  console.error(`discover-candidates failed: ${error.message}`)
  console.error(
    'Fallback: ask the developer for an issue URL/export, or use public browser pages.',
  )
  process.exit(1)
}
