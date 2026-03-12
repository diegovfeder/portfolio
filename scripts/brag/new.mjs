import path from 'node:path'

import {
  CAPTURES_DIR,
  ensureDirectory,
  fileExists,
  formatLocalDate,
  relativeToRoot,
  toKebabCase,
  writeFile,
} from './lib.mjs'

const { console, process } = globalThis

const SUPPORTED_TYPES = new Set([
  'work',
  'study',
  'project',
  'hiring',
  'reflection',
])

const parseArgs = (argv) => {
  const args = {}

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]
    if (!token.startsWith('--')) {
      continue
    }

    const key = token.slice(2)
    const next = argv[index + 1]

    if (!next || next.startsWith('--')) {
      args[key] = 'true'
      continue
    }

    args[key] = next
    index += 1
  }

  return args
}

const args = parseArgs(process.argv.slice(2))

if (args.help === 'true') {
  console.log(
    [
      'Create a new brag capture note.',
      '',
      'Usage:',
      '  bun run brag:new --title "Checkout reliability fix" --type work',
      '',
      'Options:',
      '  --title  Required. Short description of what happened.',
      '  --type   Optional. One of: work, study, project, hiring, reflection.',
      '  --date   Optional. ISO date (YYYY-MM-DD). Defaults to local date.',
    ].join('\n')
  )
  process.exit(0)
}

const rawTitle = `${args.title || ''}`.trim()
if (!rawTitle) {
  console.error('Missing --title. Example: bun run brag:new --title "SEO pipeline refactor"')
  process.exit(1)
}

const rawType = `${args.type || 'work'}`.trim().toLowerCase()
const entryType = SUPPORTED_TYPES.has(rawType) ? rawType : 'work'
const entryDate = `${args.date || formatLocalDate()}`.trim()

if (!/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) {
  console.error('Invalid --date. Expected format: YYYY-MM-DD')
  process.exit(1)
}

const slug = toKebabCase(rawTitle)
const fileName = `${entryDate}__${entryType}__${slug}.md`
const destination = path.join(CAPTURES_DIR, fileName)

await ensureDirectory(CAPTURES_DIR)

if (await fileExists(destination)) {
  console.error(`Capture already exists: ${relativeToRoot(destination)}`)
  process.exit(1)
}

const template = `---
id: private:${entryDate}-${slug}
date: ${entryDate}
type: ${entryType}
title: "${rawTitle}"
role: ""
tags: ["${entryType}"]
skills: []
impact: ""
impact_metric: ""
evidence_links: []
interview_story_angle: ""
lessons: []
gaps: []
next_actions: []
visibility: private
---

## Context
- Team or project context:
- Why this mattered:

## Challenge
- Technical or delivery challenge:
- Constraints:

## Action
- What I did:
- Tradeoff chosen:

## Result
- Outcome:
- Business/user impact:

## Evidence and Metrics
- Metric before:
- Metric after:
- Link to PR / ticket / artifact:

## Reflection
- What went well:
- What to improve:
- Candidate story for brag timeline:
`

await writeFile(destination, template)

console.log(`Created: ${relativeToRoot(destination)}`)
console.log('Next: fill this file, then run `bun run brag:sync`.')
