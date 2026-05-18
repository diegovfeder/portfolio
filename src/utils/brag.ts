import { bragProfile, bragTimeline } from '~/data/brag/profile'
import { bragPromptTemplates } from '~/data/brag/prompts'
import { bragReports } from '~/data/brag/reports'
import type {
  BragArtifact,
  BragPageData,
  BragRecentEvidence,
  BragReportMetadata,
} from '~/types/brag'
import { blogPostEntries } from '~/utils/blog'
import type { BlogPostEntry } from '~/utils/blog'

const compareByDateDesc = (
  leftDate: string,
  rightDate: string
) => new Date(rightDate).getTime() - new Date(leftDate).getTime()

const compareReportsByYearDesc = (
  left: BragReportMetadata,
  right: BragReportMetadata
) => Number(right.year) - Number(left.year)

export function mapBlogPostToRecentEvidence(
  post: BlogPostEntry
): BragRecentEvidence {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    impact: post.brag?.impact || post.description,
    impactMetric: post.brag?.impactMetric,
    link: `/blog/${post.slug}`,
  }
}

export function buildRecentEvidence(
  posts: BlogPostEntry[],
  limit = 6
): BragRecentEvidence[] {
  return [...posts]
    .sort((left, right) => compareByDateDesc(left.date, right.date))
    .slice(0, limit)
    .map(mapBlogPostToRecentEvidence)
}

export function getBragReportByYear(
  year: string,
  reports: BragReportMetadata[] = bragReports
) {
  return reports.find((report) => report.year === year)
}

export function resolveRelatedBlogPosts(
  report: BragReportMetadata,
  posts: BlogPostEntry[] = blogPostEntries
) {
  return report.relatedBlogSlugs.map((slug) => {
    const match = posts.find((post) => post.slug === slug)

    if (!match) {
      throw new Error(
        `Brag report "${report.year}" references missing blog slug "${slug}".`
      )
    }

    return match
  })
}

export function buildBragArtifacts(
  evidence: BragRecentEvidence[],
  reports: BragReportMetadata[]
): BragArtifact[] {
  const evidenceBullets = evidence
    .slice(0, 5)
    .map(
      (entry, index) =>
        `${index + 1}. ${entry.title} (${entry.date}) - ${entry.impactMetric || entry.impact}`
    )
    .join('\n')

  const yearlyBullets = reports
    .map(
      (report) =>
        `- ${report.year}: ${report.title} -> ${report.summary}`
    )
    .join('\n')

  return [
    {
      id: 'resume-brief',
      title: 'Role Brief',
      description:
        'A compact evidence pack for tailoring resumes or professional summaries.',
      markdown: `# Role Brief

## Target Role
{{TARGET_ROLE}}

## Job Description
{{JOB_DESCRIPTION}}

## Strongest Recent Evidence
${evidenceBullets || '1. Add public blog evidence first.'}

## Yearly Context
${yearlyBullets || '- Add a yearly brag document first.'}
`,
    },
    {
      id: 'fit-matrix',
      title: 'Fit Evidence Matrix',
      description:
        'A structured template for comparing a role against public proof.',
      markdown: `# Fit Evidence Matrix

## Role
{{TARGET_ROLE}}

| Requirement | Public Evidence | Confidence | Gap | Follow-up |
|---|---|---:|---|---|
| {{REQ_1}} | {{BLOG_OR_REPORT_SECTION}} | {{0.80}} | {{NONE_OR_GAP}} | {{ACTION}} |
| {{REQ_2}} | {{BLOG_OR_REPORT_SECTION}} | {{0.65}} | {{GAP}} | {{ACTION}} |
`,
    },
    {
      id: 'story-pack',
      title: 'Interview Story Pack',
      description:
        'A public-safe structure for turning recent work into interview-ready narratives.',
      markdown: `# Interview Story Pack

## Role
{{TARGET_ROLE}}

## Story Candidates
1. Question: {{QUESTION}}
   - Evidence: {{BLOG_POST_OR_YEARLY_REPORT_SECTION}}
   - Story: {{SITUATION}} -> {{TASK}} -> {{ACTION}} -> {{RESULT}}
   - Risk: {{RISK}}
   - Rehearsal Note: {{NOTE}}
`,
    },
  ]
}

export function buildBragPageData(
  posts: BlogPostEntry[] = blogPostEntries,
  reports: BragReportMetadata[] = bragReports
): BragPageData {
  const sortedReports = [...reports].sort(compareReportsByYearDesc)

  // Fail fast if a report archive entry drifts from the blog index.
  sortedReports.forEach((report) => {
    resolveRelatedBlogPosts(report, posts)
  })

  const recentEvidence = buildRecentEvidence(posts)

  return {
    profile: bragProfile,
    timeline: bragTimeline,
    recentEvidence,
    reports: sortedReports,
    prompts: bragPromptTemplates,
    artifacts: buildBragArtifacts(recentEvidence, sortedReports),
  }
}
