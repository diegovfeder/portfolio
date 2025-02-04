import { Component } from 'solid-js'
import { A } from '@solidjs/router'

interface BlogPostHeaderProps {
  title: string
  date: string
  tags: string[]
}

const BlogPostHeader: Component<BlogPostHeaderProps> = ({
  title,
  date,
  tags,
}) => {
  return (
    <div class="mb-8 font-mono">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <A
          href="/blog"
          class="group relative w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        >
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              class="w-2 h-2 text-red-900"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </A>
        <span class="w-3 h-3 rounded-full bg-yellow-500" />
        <span class="w-3 h-3 rounded-full bg-green-500" />
        <span class="ml-2">blog_post.md</span>
      </div>
      <h1 class="text-3xl font-bold mb-4">{title}</h1>
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <time>const date = '{date}';</time>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        {tags.map((tag) => (
          <span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default BlogPostHeader
