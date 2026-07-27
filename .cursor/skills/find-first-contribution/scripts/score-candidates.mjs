#!/usr/bin/env node
import { readFileSync } from 'node:fs'

function readInput() {
  const arg = process.argv[2]
  if (!arg || arg === '-' || arg === '--stdin') {
    return JSON.parse(readFileSync(0, 'utf8'))
  }
  return JSON.parse(readFileSync(arg, 'utf8'))
}

function names(labels) {
  return (labels || []).map(label =>
    typeof label === 'string' ? label : label.name || '',
  )
}

function hasLabel(labelNames, fragment) {
  const lower = fragment.toLowerCase()
  return labelNames.some(label => label.toLowerCase().includes(lower))
}

function clampScore(value) {
  if (Number.isInteger(value)) return Math.max(0, Math.min(3, value))
  return null
}

function scoreOr(record, key, fallback) {
  return clampScore(record.scores?.[key]) ?? fallback
}

function scoreCandidate(record) {
  const labelNames = names(record.labels)
  const hardExclusions = []

  if ((record.assignees || []).length > 0)
    hardExclusions.push('Issue has an assignee.')
  if (record.activeLinkedPullRequest || record.linkedPullRequests?.length > 0) {
    hardExclusions.push('Issue appears to have linked pull-request activity.')
  }
  if (hasLabel(labelNames, 'has PR'))
    hardExclusions.push('Issue is labeled has PR.')
  if (hasLabel(labelNames, 'need discussion'))
    hardExclusions.push('Issue needs discussion.')
  if (hasLabel(labelNames, 'need guidance'))
    hardExclusions.push('Issue needs maintainer guidance.')
  if (hasLabel(labelNames, 'need more info'))
    hardExclusions.push('Issue needs more information.')
  if (
    hasLabel(labelNames, 'p4-important') ||
    hasLabel(labelNames, 'p5-urgent')
  ) {
    hardExclusions.push(
      'Issue priority is too high for default newcomer recommendation.',
    )
  }
  if (hasLabel(labelNames, 'security'))
    hardExclusions.push('Security work is excluded.')
  if (record.newPublicApiSurface)
    hardExclusions.push('Task appears to add public API surface.')
  if (record.privateOrCiOnlyValidation)
    hardExclusions.push(
      'Validation is private or CI-only without a local path.',
    )
  if (record.hasCurrentReproduction === false && record.type === 'bug-fix') {
    hardExclusions.push('Bug-fix candidate lacks a current reproduction.')
  }

  const conditionalReasons = []
  if (record.maintainerConfirmed === false) {
    conditionalReasons.push('Maintainer confirmation is missing.')
  }
  if (record.acceptanceCriteria === false) {
    conditionalReasons.push('Acceptance criteria are not confirmed.')
  }
  if (labelNames.length === 0 && record.maintainerConfirmed !== true) {
    conditionalReasons.push('Issue has no labels; triage context is missing.')
  }

  const scope = scoreOr(
    record,
    'scope',
    record.likelyRepositoryArea && !record.crossCutting
      ? 3
      : record.crossCutting
        ? 1
        : 0,
  )
  const clarity = scoreOr(
    record,
    'clarity',
    record.hasCurrentReproduction && record.acceptanceCriteria
      ? 3
      : record.hasCurrentReproduction || record.acceptanceCriteria
        ? 2
        : record.body
          ? 1
          : 0,
  )
  const localTestability = scoreOr(
    record,
    'localTestability',
    record.localValidationPath
      ? 3
      : record.moderateExternalSetup
        ? 2
        : record.privateOrCiOnlyValidation
          ? 0
          : 1,
  )
  const architecturalRisk = scoreOr(
    record,
    'architecturalRisk',
    record.newPublicApiSurface || record.hotPath || record.crossCutting
      ? 0
      : record.knownInternalPattern
        ? 2
        : 1,
  )
  const dependencies = scoreOr(
    record,
    'dependencies',
    record.blocked ? 0 : record.externalDependency ? 1 : 3,
  )
  const ownership = scoreOr(
    record,
    'ownership',
    (record.assignees || []).length > 0 || record.activeLinkedPullRequest
      ? 0
      : record.ownershipVerified
        ? 3
        : 2,
  )
  const documentationQuality = scoreOr(
    record,
    'documentationQuality',
    record.hasCurrentReproduction &&
      record.versions &&
      record.acceptanceCriteria
      ? 3
      : record.hasCurrentReproduction
        ? 2
        : record.body
          ? 1
          : 0,
  )
  const learningValue = scoreOr(
    record,
    'learningValue',
    record.likelyRepositoryArea && record.localValidationPath
      ? 3
      : record.likelyRepositoryArea
        ? 2
        : 1,
  )
  const branchFit = scoreOr(
    record,
    'branchFit',
    record.intendedBaseBranch === 'main' ||
      record.intendedBaseBranch === 'minor'
      ? 3
      : 1,
  )

  const factors = {
    scope,
    clarity,
    localTestability,
    architecturalRisk,
    dependencies,
    ownership,
    documentationQuality,
    learningValue,
    branchFit,
  }
  const total = Object.values(factors).reduce((sum, value) => sum + value, 0)

  let confidence =
    record.commentsAvailable && record.ownershipVerified ? 'High' : 'Medium'
  if (record.repositoryDiscoveredIdea) confidence = 'Low'
  if (conditionalReasons.length > 0 && confidence === 'High')
    confidence = 'Medium'
  if (hardExclusions.length > 0)
    confidence = confidence === 'High' ? 'Medium' : confidence

  let recommendation = 'reject'
  if (hardExclusions.length > 0) {
    recommendation = 'excluded'
  } else if (conditionalReasons.length > 0 && total >= 17) {
    recommendation = 'conditional'
  } else if (total >= 22) {
    recommendation = 'recommend'
  } else if (total >= 17) {
    recommendation = 'conditional'
  } else if (total >= 12) {
    recommendation = 'not-recommended'
  }

  return {
    number: record.number ?? null,
    title: record.title ?? null,
    url: record.url ?? null,
    labels: labelNames,
    factors,
    total,
    hardExclusions,
    conditionalReasons,
    confidence,
    recommendation,
  }
}

const input = readInput()
const candidates = Array.isArray(input) ? input : input.candidates || []
const output = {
  generatedBy: 'score-candidates.mjs',
  candidateCount: candidates.length,
  results: candidates.map(scoreCandidate),
}

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`)
