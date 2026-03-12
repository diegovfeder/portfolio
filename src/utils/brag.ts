import { bragPromptTemplates } from '~/data/brag/prompts'
import type {
  BragEntry,
  BragSummary,
  PrivateBragModule,
  PromptTemplate,
} from '~/types/brag'
import { blogPostEntries } from '~/utils/blog'
import { loadPrivateBragData } from '~/utils/brag-private'

export interface BragExportBlock {
  id: string
  title: string
  description: string
  markdown: string
}

export interface BragPageData {
  entries: BragEntry[]
  summaries: BragSummary[]
  prompts: PromptTemplate[]
  exports: BragExportBlock[]
  privateMode: 'disabled' | 'local' | 'fallback'
  privateModeHint: string | null
}

interface BlogPostEntry {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

interface BuildBragPageDataOptions {
  isDev?: boolean
  blogEntries?: BlogPostEntry[]
  localLoaders?: Record<string, () => Promise<PrivateBragModule>>
  fallbackModule?: PrivateBragModule
}

export function mapBlogPostToBragEntry(post: BlogPostEntry): BragEntry {
  return {
    id: `blog:${post.slug}`,
    title: post.title,
    date: post.date,
    source: 'blog',
    tags: post.tags,
    impact:
      post.description ||
      'Impact summary placeholder: add measurable outcome and business signal.',
    evidenceLink: `/blog/${post.slug}`,
    visibility: 'public',
    impactMetric: 'Add metric (latency, conversion, SEO rank, delivery speed).',
    interviewStoryAngle: 'Challenge -> tradeoff -> result -> what changed next.',
  }
}

export function buildPublicBragEntries(posts: BlogPostEntry[]): BragEntry[] {
  return posts.map(mapBlogPostToBragEntry)
}

export function mergeBragEntries(
  publicEntries: BragEntry[],
  privateEntries: BragEntry[],
  includePrivate: boolean
): BragEntry[] {
  const merged = includePrivate
    ? [...privateEntries, ...publicEntries]
    : [...publicEntries]

  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function buildFallbackSummaries(entries: BragEntry[]): BragSummary[] {
  const latestTitles = entries.slice(0, 3).map((entry) => entry.title)

  return [
    {
      period: 'weekly',
      wins: [
        latestTitles[0] || 'Capture one concrete weekly win with evidence.',
        'Document one technical decision and why it was chosen.',
      ],
      lessons: [
        'Write the context around each win so interview stories stay clear.',
      ],
      gaps: ['Add at least one metric per entry to avoid vague achievements.'],
      nextActions: ['Ship one weekly retro note with measurable outcomes.'],
    },
    {
      period: 'monthly',
      wins: [
        latestTitles[1] || 'Consolidate recurring wins into role-relevant themes.',
      ],
      lessons: ['Track delivery impact and collaboration impact separately.'],
      gaps: ['Map each experience to target-role requirements before applying.'],
      nextActions: ['Create a role-focused CV variant from this month entries.'],
    },
    {
      period: 'quarterly',
      wins: [
        latestTitles[2] || 'Review quarter-wide patterns and strongest evidence.',
      ],
      lessons: ['Promote strongest private wins into public narrative when safe.'],
      gaps: ['Identify one hard skill gap and one storytelling gap.'],
      nextActions: [
        'Run a quarterly job-fit analysis and prepare interview drills.',
      ],
    },
  ]
}

export function buildExportBlocks(entries: BragEntry[]): BragExportBlock[] {
  const topEntries = entries.slice(0, 5)
  const entryBullets = topEntries
    .map(
      (entry, index) =>
        `${index + 1}. ${entry.title} (${entry.date}) - ${entry.impactMetric || entry.impact}`
    )
    .join('\n')

  return [
    {
      id: 'custom-cv-input',
      title: 'Custom CV Input',
      description: 'Paste this into your AI assistant to generate a tailored CV.',
      markdown: `# Custom CV Input

## Target Role
{{TARGET_ROLE}}

## Job Description
{{JOB_DESCRIPTION}}

## Constraints
{{CONSTRAINTS}}

## Evidence Entries
${entryBullets || '1. Add at least one brag entry first.'}
`,
    },
    {
      id: 'job-fit-report',
      title: 'Job-Fit Report',
      description:
        'Use this structure to compare your profile against role requirements.',
      markdown: `# Job Fit Report

## Role
{{TARGET_ROLE}}

## Requirement Mapping
| Requirement | Evidence | Confidence (0-1) | Gap | Action |
|---|---|---:|---|---|
| {{REQ_1}} | {{ENTRY_ID}} | {{0.80}} | {{NONE_OR_GAP}} | {{ACTION}} |
| {{REQ_2}} | {{ENTRY_ID}} | {{0.65}} | {{GAP}} | {{ACTION}} |
`,
    },
    {
      id: 'interview-drill-sheet',
      title: 'Interview Drill Sheet',
      description: 'Convert your brag entries into rehearsable interview stories.',
      markdown: `# Interview Drill Sheet

## Target Role
{{TARGET_ROLE}}

## Questions and Evidence
1. Question: {{QUESTION}}
   - Story: {{SITUATION}} -> {{TASK}} -> {{ACTION}} -> {{RESULT}}
   - Evidence ID: {{ENTRY_ID}}
   - Risk: {{RISK}}
   - Rehearsal Note: {{NOTE}}
`,
    },
  ]
}

const getPrivateModeHint = (
  privateMode: BragPageData['privateMode'],
  hasPrivateEntries: boolean
) => {
  if (privateMode === 'disabled') {
    return 'Private mode is disabled in production. Only public blog-derived evidence is shown.'
  }

  if (privateMode === 'fallback' && !hasPrivateEntries) {
    return 'No local private module detected. Create src/data/brag/private.local.ts in local dev to load private notes.'
  }

  return null
}

export async function buildBragPageData({
  isDev,
  blogEntries = blogPostEntries,
  localLoaders,
  fallbackModule,
}: BuildBragPageDataOptions = {}): Promise<BragPageData> {
  const publicEntries = buildPublicBragEntries(blogEntries)
  const privateData = await loadPrivateBragData({
    isDev,
    localLoaders,
    fallbackModule,
  })

  const includePrivate = privateData.mode !== 'disabled'
  const entries = mergeBragEntries(
    publicEntries,
    privateData.entries,
    includePrivate
  )
  const summaries =
    privateData.summaries.length > 0
      ? privateData.summaries
      : buildFallbackSummaries(entries)

  return {
    entries,
    summaries,
    prompts: bragPromptTemplates,
    exports: buildExportBlocks(entries),
    privateMode: privateData.mode,
    privateModeHint: getPrivateModeHint(
      privateData.mode,
      privateData.entries.length > 0
    ),
  }
}
