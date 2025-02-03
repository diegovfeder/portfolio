import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    description: string
    tags: string[]
  }
  content: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = import.meta.glob('./posts/*.md', { eager: true, query: '?raw' })

  return Object.entries(posts)
    .map(([filepath, content]) => {
      const { data, content: markdown } = matter(content as string)
      const slug = filepath.replace('./posts/', '').replace('.md', '')

      return {
        slug,
        frontmatter: {
          title: data.title,
          date: data.date,
          description: data.description,
          tags: data.tags || [],
        },
        content: markdown,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}
