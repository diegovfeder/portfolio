import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { renderMarkdownContentOnServer } from './markdown-content.server'

const postsDir = path.resolve(process.cwd(), 'public', 'blog', 'posts')

export async function readBlogPostMarkdown(slug: string) {
  const filePath = path.join(postsDir, `${slug}.md`)

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
        `Blog post "${slug}" not found. The markdown file is missing.`,
      )
    }

    throw new Error(`Failed to read blog post "${slug}" from disk.`)
  }
}

export async function renderBlogPostContent(markdown: string) {
  return renderMarkdownContentOnServer(markdown)
}

export async function loadBlogPostContent(slug: string) {
  const markdown = await readBlogPostMarkdown(slug)
  return renderBlogPostContent(markdown)
}
