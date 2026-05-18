import { describe, expect, it } from 'vitest'

import {
  loadBlogPostContent,
  readBlogPostMarkdown,
  renderBlogPostContent,
} from './blog-content'

describe('loadBlogPostContent', () => {
  it('loads a markdown file from disk and parses it into HTML', async () => {
    const html = await loadBlogPostContent('BUILDING_A_BLOG_FIRST_BRAG_PROCESS')

    expect(html).toContain('<h1>Building a Blog-First Brag Process</h1>')
  })

  it('reads raw markdown for an existing post', async () => {
    const markdown = await readBlogPostMarkdown(
      'BUILDING_A_BLOG_FIRST_BRAG_PROCESS',
    )

    expect(markdown).toContain('# Building a Blog-First Brag Process')
  })

  it('throws a clear error when the markdown file is missing', async () => {
    await expect(readBlogPostMarkdown('MISSING_POST')).rejects.toThrow(
      'Blog post "MISSING_POST" not found. The markdown file is missing.',
    )
  })

  it('sanitizes rendered HTML with DOMPurify', async () => {
    const html = await renderBlogPostContent(
      [
        '# Hello blog',
        '',
        '<script>alert("xss")</script>',
        '<img src="x" onerror="alert(1)">',
        '<a href="javascript:alert(1)">bad link</a>',
      ].join('\n'),
    )

    expect(html).toContain('<h1>Hello blog</h1>')
    expect(html).not.toContain('<script>')
    expect(html).not.toContain('onerror')
    expect(html).not.toContain('javascript:')
  })
})
