import { describe, expect, it } from 'vitest'

import { bragReports } from '~/data/brag/reports'
import {
  buildBragPageData,
  buildRecentEvidence,
  getBragReportByYear,
  resolveRelatedBlogPosts,
} from '~/utils/brag'

describe('brag utilities', () => {
  it('builds recent evidence in descending date order', () => {
    const evidence = buildRecentEvidence([
      {
        slug: 'OLDER',
        title: 'Older',
        description: 'Older evidence',
        date: '2026-01-10',
        tags: ['older'],
      },
      {
        slug: 'NEWER',
        title: 'Newer',
        description: 'Newer evidence',
        date: '2026-03-10',
        tags: ['newer'],
      },
    ])

    expect(evidence.map((entry) => entry.slug)).toEqual(['NEWER', 'OLDER'])
    expect(evidence[0].link).toBe('/blog/NEWER')
  })

  it('sorts yearly brag documents newest year first', () => {
    const result = buildBragPageData()

    expect(result.reports.map((report) => report.year)).toEqual(['2026', '2025'])
  })

  it('keeps only public-safe prompt templates', () => {
    const result = buildBragPageData()

    expect(result.prompts.map((prompt) => prompt.id)).toEqual([
      'custom-cv',
      'job-fit-analysis',
      'interview-prep',
      'performance-review',
      'excalidraw',
    ])
  })

  it('returns report metadata by year', () => {
    const report = getBragReportByYear('2025')

    expect(report?.title).toBe('2025 Brag Document')
  })

  it('throws when report metadata references a missing related blog slug', () => {
    expect(() =>
      resolveRelatedBlogPosts({
        ...bragReports[0],
        year: '2099',
        relatedBlogSlugs: ['MISSING_POST'],
      })
    ).toThrow(
      'Brag report "2099" references missing blog slug "MISSING_POST".'
    )
  })
})
