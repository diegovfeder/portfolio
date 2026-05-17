import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { marked } from 'marked'

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
        `Blog post "${slug}" not found. The markdown file is missing.`
      )
    }

    throw new Error(`Failed to read blog post "${slug}" from disk.`)
  }
}

export async function renderBlogPostContent(markdown: string) {
  const html = await Promise.resolve(marked.parse(markdown))

  // Blog bodies are repo-authored markdown; strip inline script blocks on the
  // server path so direct requests do not depend on client-side sanitization.
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '')
}

export async function renderMarkdownContent(markdown: string) {
  return renderBlogPostContent(markdown)
}

export async function loadBlogPostContent(slug: string) {
  const markdown = await readBlogPostMarkdown(slug)
  return renderBlogPostContent(markdown)
}
