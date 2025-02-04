import type { Component } from 'solid-js'
import { A } from '@solidjs/router'
import { Show, For } from 'solid-js'

interface BlogCardProps {
  /** The title of the blog post */
  title: string
  /** The description or excerpt of the blog post */
  description: string
  /** The date the blog post was published */
  date: string
  /** The URL slug for the blog post */
  slug: string
  /** Optional array of tags/categories */
  tags?: string[]
  /** Optional reading time in minutes */
  readingTime?: number
}

/**
 * BlogCard component displays a preview of a blog post with consistent styling
 * and interactive elements
 *
 * @component
 * @example
 * ```tsx
 * <BlogCard
 *   title="My Blog Post"
 *   description="A brief description"
 *   date="2024-01-30"
 *   slug="my-blog-post"
 *   tags={['tech', 'coding']}
 *   readingTime={5}
 * />
 * ```
 */
const BlogCard: Component<BlogCardProps> = (props) => {
  const formattedDate = () =>
    new Date(props.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <article
      class="group relative h-full p-6 rounded-lg 
      border-2 border-gray-200 dark:border-gray-700 
      hover:border-blue-500 dark:hover:border-blue-400 
      transition-all duration-300 
      bg-white dark:bg-black"
    >
      <div class="flex flex-col h-full">
        {/* Header: Date and Reading Time */}
        <header class="flex justify-between items-center mb-4">
          <time
            datetime={props.date}
            class="text-sm text-gray-500 dark:text-gray-400 font-mono"
          >
            {formattedDate()}
          </time>
          <Show when={props.readingTime}>
            <span class="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {props.readingTime} min read
            </span>
          </Show>
        </header>

        {/* Content */}
        <div class="flex-grow">
          <h2
            class="text-xl font-bold mb-3 
            group-hover:text-blue-600 dark:group-hover:text-blue-400 
            transition-colors duration-300"
          >
            {props.title}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">{props.description}</p>
        </div>

        {/* Tags */}
        <Show when={props.tags?.length}>
          <div class="flex flex-wrap gap-2 mt-4">
            <For each={props.tags}>
              {(tag) => (
                <span
                  class="text-xs px-3 py-1 
                  bg-gray-100 dark:bg-gray-800 
                  text-gray-600 dark:text-gray-300 
                  rounded-full font-mono"
                >
                  {tag}
                </span>
              )}
            </For>
          </div>
        </Show>

        {/* Read More */}
        <div
          class="mt-4 font-mono text-sm 
          text-blue-600 dark:text-blue-400 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300"
        >
          read_more →
        </div>

        {/* Clickable overlay */}
        <A
          href={`/blog/${props.slug}`}
          class="absolute inset-0 rounded-lg"
          aria-label={`Read full article: ${props.title}`}
        />
      </div>
    </article>
  )
}

export default BlogCard
