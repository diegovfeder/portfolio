import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const REPO_ROOT = path.resolve(__dirname, '../..')
export const BRAG_DIR = path.join(REPO_ROOT, 'docs', 'brag')
export const CAPTURES_DIR = path.join(BRAG_DIR, 'captures')
export const GENERATED_DIR = path.join(BRAG_DIR, 'generated')
export const PRIVATE_LOCAL_FILE = path.join(
  REPO_ROOT,
  'src',
  'data',
  'brag',
  'private.local.ts'
)

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const KEY_VALUE_PATTERN = /^([a-zA-Z0-9_-]+):\s*(.*)$/

const stripWrappingQuotes = (value) => {
  const normalized = value.trim()
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    return normalized.slice(1, -1)
  }
  return normalized
}

const toNonEmptyString = (value) => {
  if (typeof value !== 'string') {
    return ''
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : ''
}

export const toKebabCase = (value) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

export const formatLocalDate = (
  date = new Date(),
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone,
  }).format(date)
}

export const formatIsoTimestamp = (date = new Date()) => {
  return date.toISOString()
}

const parseListValue = (value) => {
  const normalized = stripWrappingQuotes(value)

  if (normalized.startsWith('[') && normalized.endsWith(']')) {
    return normalized
      .slice(1, -1)
      .split(',')
      .map((item) => stripWrappingQuotes(item.trim()))
      .filter(Boolean)
  }

  return normalized
    .split(',')
    .map((item) => stripWrappingQuotes(item.trim()))
    .filter(Boolean)
}

const shouldBeArray = (key) => {
  return (
    key.endsWith('s') ||
    key === 'tags' ||
    key === 'skills' ||
    key === 'evidence_links' ||
    key === 'lessons' ||
    key === 'gaps' ||
    key === 'next_actions'
  )
}

export const parseFrontmatter = (markdown) => {
  const lines = markdown.split(/\r?\n/)

  if (lines[0]?.trim() !== '---') {
    return {
      frontmatter: {},
      body: markdown,
    }
  }

  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---')

  if (endIndex === -1) {
    return {
      frontmatter: {},
      body: markdown,
    }
  }

  const frontmatter = {}

  for (const rawLine of lines.slice(1, endIndex)) {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      continue
    }

    const pair = line.match(KEY_VALUE_PATTERN)

    if (!pair) {
      continue
    }

    const [, key, rawValue] = pair
    const normalizedValue = rawValue.trim()

    if (!normalizedValue) {
      continue
    }

    frontmatter[key] = shouldBeArray(key)
      ? parseListValue(normalizedValue)
      : stripWrappingQuotes(normalizedValue)
  }

  return {
    frontmatter,
    body: lines.slice(endIndex + 1).join('\n').trim(),
  }
}

export const parseSections = (body) => {
  const lines = body.split(/\r?\n/)
  const sections = {}
  let current = null

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/)

    if (heading) {
      current = heading[1].trim().toLowerCase()
      sections[current] = []
      continue
    }

    if (!current) {
      continue
    }

    sections[current].push(line)
  }

  const finalized = {}
  for (const [key, value] of Object.entries(sections)) {
    finalized[key] = value.join('\n').trim()
  }

  return finalized
}

const pickFirstNonEmpty = (values) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return ''
}

const valueToArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((entry) => `${entry}`.trim()).filter(Boolean)
  }

  if (typeof value === 'string' && value.trim()) {
    return parseListValue(value)
  }

  return []
}

const valueFromLabeledLine = (block, label) => {
  if (!block) {
    return ''
  }

  const matcher = new RegExp(`^[-*]?\\s*${label}:\\s*(.+)$`, 'im')
  const match = block.match(matcher)
  return match?.[1]?.trim() || ''
}

const resolveEntryDate = (frontmatterDate, fileName) => {
  if (typeof frontmatterDate === 'string' && ISO_DATE_PATTERN.test(frontmatterDate)) {
    return frontmatterDate
  }

  const fileDate = fileName.match(/(\d{4}-\d{2}-\d{2})/)
  if (fileDate) {
    return fileDate[1]
  }

  return formatLocalDate()
}

const buildId = (frontmatterId, fileName) => {
  const normalizedFrontmatterId = toNonEmptyString(frontmatterId)
  if (normalizedFrontmatterId) {
    return normalizedFrontmatterId
  }

  const slug = fileName.replace(/\.md$/i, '')
  return `private:${slug}`
}

const normalizeTags = (frontmatterTags, captureType) => {
  const tags = valueToArray(frontmatterTags)

  if (captureType) {
    tags.push(`type:${captureType}`)
  }

  return [...new Set(tags)]
}

const normalizeCaptureType = (rawValue) => {
  const normalized = toKebabCase(rawValue || '')
  return normalized || 'work'
}

const ensureEvidenceLink = (frontmatterEvidenceLinks, defaultLink) => {
  const links = valueToArray(frontmatterEvidenceLinks)
  return links[0] || defaultLink || undefined
}

export const readCaptureRecord = async (filePath) => {
  const raw = await fs.readFile(filePath, 'utf8')
  const { frontmatter, body } = parseFrontmatter(raw)
  const sections = parseSections(body)
  const fileName = path.basename(filePath)

  const captureType = normalizeCaptureType(frontmatter.type)

  const delivered = sections['what i delivered']
  const result = sections['result']
  const problemsSolved = sections['problems solved']
  const reflection = sections.reflection
  const evidenceBlock = sections['evidence and metrics']

  const impact = pickFirstNonEmpty([
    frontmatter.impact,
    result,
    delivered,
    problemsSolved,
    'Add impact details in the capture note so this story is interview-ready.',
  ])

  const metricBefore = valueFromLabeledLine(evidenceBlock, 'Metric before')
  const metricAfter = valueFromLabeledLine(evidenceBlock, 'Metric after')

  const generatedMetric =
    metricBefore && metricAfter
      ? `Before: ${metricBefore}. After: ${metricAfter}.`
      : pickFirstNonEmpty([metricBefore, metricAfter])

  const impactMetric = pickFirstNonEmpty([
    frontmatter.impact_metric,
    generatedMetric,
    valueFromLabeledLine(evidenceBlock, 'Impact metric'),
  ])

  const linkFromEvidenceBlock = valueFromLabeledLine(
    evidenceBlock,
    'Link to PR / ticket / artifact'
  )

  const title = pickFirstNonEmpty([
    frontmatter.title,
    valueFromLabeledLine(delivered, 'Title'),
    delivered.split('\n')[0],
    fileName.replace(/\.md$/i, ''),
  ])

  const interviewStoryAngle = pickFirstNonEmpty([
    frontmatter.interview_story_angle,
    valueFromLabeledLine(reflection, 'Candidate story for brag timeline'),
  ])

  const lessons = valueToArray(frontmatter.lessons)
  const gaps = valueToArray(frontmatter.gaps)
  const nextActions = valueToArray(frontmatter.next_actions)

  if (reflection) {
    const improve = valueFromLabeledLine(reflection, 'What to improve')
    const well = valueFromLabeledLine(reflection, 'What went well')

    if (well) {
      lessons.push(well)
    }

    if (improve) {
      gaps.push(improve)
    }
  }

  return {
    filePath,
    fileName,
    frontmatter,
    sections,
    entry: {
      id: buildId(frontmatter.id, fileName),
      title,
      date: resolveEntryDate(frontmatter.date, fileName),
      source: 'private-note',
      tags: normalizeTags(frontmatter.tags, captureType),
      impact,
      evidenceLink: ensureEvidenceLink(
        frontmatter.evidence_links,
        linkFromEvidenceBlock
      ),
      visibility: frontmatter.visibility === 'public' ? 'public' : 'private',
      impactMetric: impactMetric || undefined,
      role: toNonEmptyString(frontmatter.role) || undefined,
      skills: valueToArray(frontmatter.skills),
      interviewStoryAngle: interviewStoryAngle || undefined,
    },
    lessons: [...new Set(lessons)].filter(Boolean),
    gaps: [...new Set(gaps)].filter(Boolean),
    nextActions: [...new Set(nextActions)].filter(Boolean),
  }
}

const readDirectoryMarkdownFiles = async (directoryPath) => {
  let directoryEntries = []

  try {
    directoryEntries = await fs.readdir(directoryPath, { withFileTypes: true })
  } catch {
    return []
  }

  return directoryEntries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
    .map((entry) => path.join(directoryPath, entry.name))
    .sort((a, b) => a.localeCompare(b))
}

export const loadCaptureRecords = async () => {
  const files = await readDirectoryMarkdownFiles(CAPTURES_DIR)

  const records = await Promise.all(files.map((file) => readCaptureRecord(file)))

  return records.sort((a, b) => {
    const dateDifference =
      new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime()

    if (dateDifference !== 0) {
      return dateDifference
    }

    return a.entry.title.localeCompare(b.entry.title)
  })
}

const uniqueFirst = (values, maxItems) => {
  const unique = [...new Set(values.filter(Boolean))]
  return unique.slice(0, maxItems)
}

const formatWinLabel = (entry) => {
  if (entry.impactMetric) {
    return `${entry.title} - ${entry.impactMetric}`
  }

  return `${entry.title} - ${entry.impact}`
}

const entriesWithinDays = (records, days) => {
  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setDate(cutoff.getDate() - days)

  return records.filter((record) => new Date(record.entry.date).getTime() >= cutoff.getTime())
}

const makeSummary = (period, records, fallbackMessage) => {
  const wins = uniqueFirst(records.map((record) => formatWinLabel(record.entry)), 3)
  const lessons = uniqueFirst(records.flatMap((record) => record.lessons), 3)
  const gaps = uniqueFirst(records.flatMap((record) => record.gaps), 3)
  const nextActions = uniqueFirst(records.flatMap((record) => record.nextActions), 3)

  return {
    period,
    wins:
      wins.length > 0
        ? wins
        : [fallbackMessage],
    lessons:
      lessons.length > 0
        ? lessons
        : ['Capture one lesson learned per entry to improve interview clarity.'],
    gaps:
      gaps.length > 0
        ? gaps
        : ['Track missing proof (metrics, links, decisions) while work is still fresh.'],
    nextActions:
      nextActions.length > 0
        ? nextActions
        : ['Create one focused story drill from the strongest entry in this period.'],
  }
}

export const buildSummariesFromRecords = (records) => {
  const weeklyRecords = entriesWithinDays(records, 7)
  const monthlyRecords = entriesWithinDays(records, 30)
  const quarterlyRecords = entriesWithinDays(records, 90)

  return [
    makeSummary(
      'weekly',
      weeklyRecords,
      'No weekly captures yet. Add one daily note and run brag:sync again.'
    ),
    makeSummary(
      'monthly',
      monthlyRecords,
      'No monthly captures yet. Add entries with impact metrics to build momentum.'
    ),
    makeSummary(
      'quarterly',
      quarterlyRecords,
      'No quarterly captures yet. Keep daily notes flowing to build long-form evidence.'
    ),
  ]
}

const asTypeScriptExport = (name, typeName, value) => {
  return `export const ${name}: ${typeName} = ${JSON.stringify(value, null, 2)}`
}

export const buildPrivateLocalFileContent = (entries, summaries) => {
  return `import type { BragEntry, BragSummary } from '~/types/brag'\n\n// AUTO-GENERATED FILE.\n// Source: docs/brag/captures/*.md\n// Regenerate with: bun run brag:sync\n\n${asTypeScriptExport('privateBragEntries', 'BragEntry[]', entries)}\n\n${asTypeScriptExport('privateSummaries', 'BragSummary[]', summaries)}\n`
}

const markdownEscapePipe = (value) => `${value}`.replace(/\|/g, '\\|')

export const buildGeneratedReport = ({ records, summaries }) => {
  const reportRows = records
    .map((record) => {
      const metric = record.entry.impactMetric || '-'
      return `| ${record.entry.date} | ${markdownEscapePipe(record.entry.title)} | ${markdownEscapePipe(metric)} | ${path.relative(REPO_ROOT, record.filePath)} |`
    })
    .join('\n')

  const summaryBlocks = summaries
    .map((summary) => {
      return [
        `### ${summary.period}`,
        '',
        `- Wins: ${summary.wins.join(' | ')}`,
        `- Lessons: ${summary.lessons.join(' | ')}`,
        `- Gaps: ${summary.gaps.join(' | ')}`,
        `- Next Actions: ${summary.nextActions.join(' | ')}`,
      ].join('\n')
    })
    .join('\n\n')

  return `# Brag Sync Report\n\nGenerated at: ${formatIsoTimestamp()}\n\nEntries loaded: ${records.length}\n\n## Timeline Snapshot\n\n| Date | Title | Metric | Source File |\n|---|---|---|---|\n${reportRows || '| - | - | - | - |'}\n\n## Summary Snapshot\n\n${summaryBlocks}\n\n## Codex Prompt Context\n\n\`\`\`markdown\nUse these entries as the source of truth for interview storytelling and CV tailoring.\nPrioritize the highest-metric entries and call out any missing evidence links.\n\`\`\`\n`
}

export const ensureDirectory = async (directoryPath) => {
  await fs.mkdir(directoryPath, { recursive: true })
}

export const writeFile = async (filePath, content) => {
  await fs.writeFile(filePath, content, 'utf8')
}

export const fileExists = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export const relativeToRoot = (filePath) => path.relative(REPO_ROOT, filePath)
