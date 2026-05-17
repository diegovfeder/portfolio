import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { blogPostEntries } from './blog'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(currentDir, '../../public/blog/posts')

describe('blog metadata', () => {
  it('uses unique slugs', () => {
    const slugs = blogPostEntries.map((entry) => entry.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has a markdown file for each slug', () => {
    const missingPosts = blogPostEntries
      .map((entry) => entry.slug)
      .filter((slug) => !existsSync(path.join(postsDir, `${slug}.md`)))

    expect(missingPosts).toEqual([])
  })
})
