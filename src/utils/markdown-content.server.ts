import { marked } from 'marked'

import { sanitizeHtmlOnServer } from './sanitize-html.server'

export async function renderMarkdownContentOnServer(markdown: string) {
  const html = await Promise.resolve(marked.parse(markdown))
  return sanitizeHtmlOnServer(html)
}
