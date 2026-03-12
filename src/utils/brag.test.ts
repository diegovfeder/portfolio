import { describe, expect, it } from 'vitest'

import type { BragEntry } from '../types/brag'
import { loadPrivateBragData } from './brag-private'
import {
  buildBragPageData,
  buildPublicBragEntries,
  mergeBragEntries,
} from './brag'

const publicBlogEntries = [
  {
    slug: 'PUBLIC_1',
    title: 'Public One',
    description: 'Public evidence one',
    date: '2026-02-18',
    tags: ['public'],
  },
  {
    slug: 'PUBLIC_2',
    title: 'Public Two',
    description: 'Public evidence two',
    date: '2026-03-01',
    tags: ['public'],
  },
]

const privateEntriesFixture: BragEntry[] = [
  {
    id: 'private:1',
    title: 'Private Win',
    date: '2026-03-05',
    source: 'private-note',
    tags: ['private'],
    impact: 'Shipped private improvement',
    visibility: 'private',
  },
]

describe('brag utilities', () => {
  it('merges entries by descending date while preserving source labels', () => {
    const publicEntries = buildPublicBragEntries(publicBlogEntries)
    const merged = mergeBragEntries(publicEntries, privateEntriesFixture, true)

    expect(merged.map((entry) => entry.id)).toEqual([
      'private:1',
      'blog:PUBLIC_2',
      'blog:PUBLIC_1',
    ])
    expect(merged[0].source).toBe('private-note')
    expect(merged[1].source).toBe('blog')
  })

  it('excludes private entries when private mode is not enabled', async () => {
    const result = await buildBragPageData({
      isDev: false,
      blogEntries: publicBlogEntries,
      fallbackModule: {
        privateBragEntries: privateEntriesFixture,
        privateSummaries: [],
      },
    })

    expect(result.privateMode).toBe('disabled')
    expect(result.entries.every((entry) => entry.source === 'blog')).toBe(true)
    expect(result.entries.some((entry) => entry.visibility === 'private')).toBe(
      false
    )
  })

  it('handles missing local private module without crashing', async () => {
    const result = await loadPrivateBragData({
      isDev: true,
      localLoaders: {},
      fallbackModule: {
        privateBragEntries: [],
        privateSummaries: [],
      },
    })

    expect(result.mode).toBe('fallback')
    expect(result.entries).toEqual([])
    expect(result.summaries).toEqual([])
  })
})
