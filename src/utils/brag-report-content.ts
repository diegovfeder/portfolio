import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { renderMarkdownContentOnServer } from '~/utils/markdown-content.server'

const reportsDir = path.resolve(process.cwd(), 'public', 'brag', 'reports')

export async function readBragReportMarkdown(year: string) {
  const filePath = path.join(reportsDir, `${year}.md`)

  try {
    return await readFile(filePath, 'utf8')
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      throw new Error(
        `Brag report "${year}" not found. The markdown file is missing.`,
      )
    }

    throw new Error(`Failed to read brag report "${year}" from disk.`)
  }
}

export async function loadBragReportContent(year: string) {
  const markdown = await readBragReportMarkdown(year)
  return renderMarkdownContentOnServer(markdown)
}
