import type { Plugin } from 'vite'
import { resolve } from 'path'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import matter from 'gray-matter'

const processFiles = () => {
  const outputFile = resolve('src/data/posts.json')
  const blogDir = resolve('src/content/blog/posts')
  const files = readdirSync(blogDir)

  const blogPosts = files
    .filter(
      (file) =>
        statSync(resolve(blogDir, file)).isFile() && file.endsWith('.md')
    )
    .map((file) => {
      const source = readFileSync(resolve(blogDir, file), 'utf-8')
      const { data } = matter(source)
      return {
        ...data,
        slug: file.replace('.md', ''),
      } as {
        title: string
        date: string
        description: string
        tags: string[]
        slug: string
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2), 'utf-8')
}

export const blogPostsPlugin = (): Plugin => {
  return {
    name: 'blog-posts',
    buildEnd() {
      processFiles()
    },
    configureServer(server) {
      server.watcher.on('change', (filePath) => {
        if (filePath.includes('/src/content/blog')) {
          processFiles()
        }
      })
    },
  }
}
