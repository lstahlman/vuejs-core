#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function run(command, args, cwd) {
  try {
    return {
      ok: true,
      stdout: execFileSync(command, args, {
        cwd,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }).trim(),
    }
  } catch (error) {
    return {
      ok: false,
      stdout: '',
      error: error.message,
    }
  }
}

function parseInput() {
  const arg = process.argv[2]
  if (!arg) return {}
  if (arg === '-' || arg === '--stdin') {
    return JSON.parse(readFileSync(0, 'utf8'))
  }
  return JSON.parse(arg)
}

function parseMajor(version) {
  const match = String(version).match(/v?(\d+)/)
  return match ? Number(match[1]) : null
}

function versionFromPackageManager(value) {
  const match = String(value || '').match(/^pnpm@(.+)$/)
  return match ? match[1] : null
}

const input = parseInput()
const root = resolve(input.repositoryRoot || '.')
const allowCommandProbes = input.allowCommandProbes !== false
const gaps = []
const checksRun = []

let packageJson = null
let repositoryVerified = false
try {
  packageJson = readJson(resolve(root, 'package.json'))
  repositoryVerified =
    packageJson.private === true &&
    existsSync(resolve(root, 'pnpm-workspace.yaml')) &&
    existsSync(resolve(root, '.github/contributing.md'))
} catch {
  repositoryVerified = false
}

const nodeVersionFile = existsSync(resolve(root, '.node-version'))
  ? readFileSync(resolve(root, '.node-version'), 'utf8').trim()
  : null
const requiredNode = packageJson?.engines?.node || 'unknown'
const actualNode = allowCommandProbes ? process.version : null
const nodeOk =
  repositoryVerified &&
  actualNode &&
  parseMajor(actualNode) !== null &&
  parseMajor(actualNode) >= 20

const requiredPnpm = versionFromPackageManager(packageJson?.packageManager)
const pnpmProbe = allowCommandProbes ? run('pnpm', ['--version'], root) : null
const pnpmOk = Boolean(
  requiredPnpm && pnpmProbe?.ok && pnpmProbe.stdout === requiredPnpm,
)

const branchProbe = allowCommandProbes
  ? run('git', ['branch', '--show-current'], root)
  : null
const statusProbe = allowCommandProbes
  ? run('git', ['status', '--short'], root)
  : null
if (branchProbe?.ok) checksRun.push('git branch --show-current')
if (statusProbe?.ok) checksRun.push('git status --short')
if (allowCommandProbes) checksRun.push('node --version', 'pnpm --version')

const dependenciesPresent =
  existsSync(resolve(root, 'node_modules')) &&
  existsSync(resolve(root, 'node_modules/.pnpm'))
const lockfilePresent = existsSync(resolve(root, 'pnpm-lock.yaml'))

const playwrightPackage = existsSync(resolve(root, 'node_modules/playwright'))
const puppeteerPackage = existsSync(resolve(root, 'node_modules/puppeteer'))
let browserCapability = 'not-verified'
if (input.browserRequired === false || input.intendedTaskType !== 'browser') {
  browserCapability = 'not-required'
} else if (playwrightPackage || puppeteerPackage) {
  browserCapability = 'package-present-browser-binary-not-verified'
}

if (!repositoryVerified)
  gaps.push('Repository identity was not verified as Vue Core.')
if (!nodeOk)
  gaps.push(
    `Node does not satisfy ${requiredNode} with .node-version ${nodeVersionFile || 'missing'}.`,
  )
if (!pnpmOk)
  gaps.push(
    `pnpm does not match packageManager ${packageJson?.packageManager || 'unknown'}.`,
  )
if (!lockfilePresent) gaps.push('pnpm-lock.yaml is missing.')
if (!dependenciesPresent)
  gaps.push('node_modules/.pnpm is missing; dependencies are not installed.')
if (browserCapability === 'not-verified')
  gaps.push('Browser capability was not verified.')

let classification = 'Unable to verify'
if (repositoryVerified && (!nodeOk || !pnpmOk)) {
  classification = 'Not ready'
} else if (repositoryVerified && (!dependenciesPresent || !lockfilePresent)) {
  classification = 'Setup available but not applied'
} else if (repositoryVerified && nodeOk && pnpmOk && dependenciesPresent) {
  classification = 'Partially ready'
  gaps.push('No validation command was run by this read-only probe.')
}

const recommendedBaseBranch =
  input.intendedTaskType === 'feature' ? 'minor' : 'main'
const recommendedNextAction =
  classification === 'Setup available but not applied'
    ? 'Use repository setup (`pnpm i`) or Cursor Set up Environment before validation.'
    : classification === 'Not ready'
      ? 'Fix the reported toolchain mismatch before preparing a contribution.'
      : classification === 'Partially ready'
        ? 'Run a targeted repository validation command for the selected task.'
        : 'Open the Vue Core repository root and rerun readiness.'

const result = {
  classification,
  repositoryVerified,
  branch: branchProbe?.ok ? branchProbe.stdout : null,
  recommendedBaseBranch,
  node: {
    required: `${requiredNode}; .node-version ${nodeVersionFile || 'missing'}`,
    actual: actualNode,
    ok: Boolean(nodeOk),
  },
  pnpm: {
    required: requiredPnpm,
    actual: pnpmProbe?.ok ? pnpmProbe.stdout : null,
    ok: pnpmOk,
  },
  dependenciesPresent,
  browserCapability,
  checksRun,
  gitStatusShort: statusProbe?.ok ? statusProbe.stdout : null,
  gaps,
  recommendedNextAction,
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
