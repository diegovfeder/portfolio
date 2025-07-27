import { For } from 'solid-js'

import { blogPostEntries } from '~/utils/blog'
import BlogCard from './card'

const BlogGrid = () => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <For each={blogPostEntries}>
        {(post) => (
          <BlogCard
            slug={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            readingTime={post.readingTime}
            tags={post.tags}
          />
        )}
      </For>
    </div>
  )
}

export default BlogGrid
