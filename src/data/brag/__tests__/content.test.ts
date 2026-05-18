import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { bragProfile, bragTimeline } from '~/data/brag/profile'
import { bragReports } from '~/data/brag/reports'

describe('brag content files', () => {
  it('exposes a populated public profile contract', () => {
    expect(bragProfile.name).toBeTruthy()
    expect(bragProfile.currentRole).toBeTruthy()
    expect(bragProfile.summary.length).toBeGreaterThan(40)
    expect(bragProfile.skillGroups.length).toBeGreaterThan(0)
    expect(bragTimeline.length).toBeGreaterThan(0)
  })

  it('keeps yearly reports unique and backed by markdown files', () => {
    const years = bragReports.map((report) => report.year)
    expect(new Set(years).size).toBe(years.length)

    for (const report of bragReports) {
      const reportPath = join(process.cwd(), 'public', 'brag', 'reports', `${report.year}.md`)
      expect(existsSync(reportPath)).toBe(true)
      expect(report.relatedBlogSlugs.length).toBeGreaterThan(0)
    }
  })
})
