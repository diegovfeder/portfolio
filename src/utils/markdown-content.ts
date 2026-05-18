import { marked } from 'marked'

import { sanitizeHtml } from './sanitize-html'

export async function renderMarkdownContent(markdown: string) {
  const html = await Promise.resolve(marked.parse(markdown))
  return sanitizeHtml(html)
}
