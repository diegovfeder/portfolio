import { describe, expect, it } from 'vitest'

import {
  loadBragReportContent,
  readBragReportMarkdown,
} from '~/utils/brag-report-content'

describe('brag report content utilities', () => {
  it('reads the 2025 yearly brag document from disk', async () => {
    const markdown = await readBragReportMarkdown('2025')

    expect(markdown).toContain('# 2025 Brag Document')
    expect(markdown).toContain('92 PRs merged')
  })

  it('reads the 2026 yearly brag document from disk', async () => {
    const markdown = await readBragReportMarkdown('2026')

    expect(markdown).toContain('# 2026 Brag Document')
    expect(markdown).toContain('live annual brag document for 2026')
  })

  it('renders yearly brag markdown into HTML', async () => {
    const html = await loadBragReportContent('2025')

    expect(html).toContain('<h1>2025 Brag Document</h1>')
    expect(html).toContain('<h2>Scope of Contribution</h2>')
  })

  it('throws a clear error when the yearly markdown file is missing', async () => {
    await expect(readBragReportMarkdown('2099')).rejects.toThrow(
      'Brag report "2099" not found. The markdown file is missing.'
    )
  })
})
