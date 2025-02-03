import { Component, createResource, Show, ErrorBoundary } from 'solid-js'
import { useParams } from '@solidjs/router'
import { marked } from 'marked'

import {
  BlogPostHeader,
  Loading,
  MarkdownRenderer,
  TerminalWindow,
  TerminalError,
} from '~/components'

import { blogPostEntries } from '~/utils/blog'

const BlogPost: Component = () => {
  const params = useParams<{ slug: string }>()

  // Get post metadata from our static entries
  const postMeta = blogPostEntries.find((post) => post.slug === params.slug)

  const [content] = createResource(async () => {
    try {
      const response = await fetch(`/src/content/blog/posts/${params.slug}.md`)
      if (!response.ok) throw new Error('Failed to fetch post')

      const text = await response.text()
      return marked(text)
    } catch (error) {
      console.error('Error loading post:', error)
      throw error
    }
  })

  return (
    <ErrorBoundary
      fallback={(err) => (
        <div class="flex min-h-screen">
          <TerminalWindow
            title="blog_error.sh"
            onClose={() => (window.location.href = '/blog')}
            defaultHeight="400px"
            positionStrategy={{ type: 'viewport-centered', offset: { y: 0 } }}
          >
            <TerminalError error={err as Error} />
          </TerminalWindow>
        </div>
      )}
    >
      <div class="relative ml-[60px] sm:ml-[120px] min-h-screen">
        <div class="max-w-3xl mx-auto px-4 py-16">
          <Show when={!content.loading} fallback={<Loading />}>
            <BlogPostHeader
              title={postMeta?.title || ''}
              date={postMeta?.date || ''}
              tags={[]}
            />
            <MarkdownRenderer
              content={content()}
              error={content.error}
              isLoading={content.loading}
            />
          </Show>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default BlogPost
