import {
  Component,
  createResource,
  Show,
  ErrorBoundary,
  createEffect,
  createSignal,
  onMount,
} from 'solid-js'
import { useParams, useNavigate } from '@solidjs/router'
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
  const navigate = useNavigate()

  // Track if we're on the client to avoid hydration mismatch
  const [isMounted, setIsMounted] = createSignal(false)

  // Use a signal for hydration-safe blog post lookup
  const [blogPost, setBlogPost] = createSignal(
    blogPostEntries.find((post) => post.slug === params.slug)
  )

  onMount(() => {
    setIsMounted(true)
  })

  // Ensure consistent lookup after hydration
  createEffect(() => {
    setBlogPost(blogPostEntries.find((post) => post.slug === params.slug))
  })

  const [content] = createResource(
    () => isMounted() && blogPost(), // Only fetch after mount and when blog post exists
    async () => {
      try {
        const response = await fetch(`/blog/posts/${params.slug}.md`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              `Blog post "${params.slug}" not found. The markdown file is missing.`
            )
          }
          throw new Error(
            `Failed to load blog post "${params.slug}". Server responded with ${response.status}.`
          )
        }

        const text = await response.text()
        return marked(text)
      } catch (error) {
        console.error('Error loading post:', error)
        throw error
      }
    }
  )

  // Always render the same basic structure to avoid hydration mismatch
  return (
    <div class="relative ml-[48px] sm:ml-[64px] lg:ml-[120px] min-h-screen">
      <div class="max-w-7xl px-4 py-16">
        <Show when={isMounted()} fallback={<Loading />}>
          <Show
            when={blogPost()}
            fallback={
              <TerminalWindow
                title="blog_error.sh"
                onClose={() => navigate('/blog')}
                defaultHeight="400px"
                positionStrategy={{
                  type: 'viewport-centered',
                  offset: { y: 0 },
                }}
              >
                <TerminalError
                  error={
                    new Error(
                      `Blog post not found. The post you're looking for doesn't exist.`
                    )
                  }
                />
              </TerminalWindow>
            }
          >
            <ErrorBoundary
              fallback={(err) => (
                <TerminalWindow
                  title="blog_error.sh"
                  onClose={() => navigate('/blog')}
                  defaultHeight="400px"
                  positionStrategy={{
                    type: 'viewport-centered',
                    offset: { y: 0 },
                  }}
                >
                  <TerminalError error={err as Error} />
                </TerminalWindow>
              )}
            >
              <Show when={!content.loading} fallback={<Loading />}>
                <BlogPostHeader
                  title={blogPost()?.title || ''}
                  date={blogPost()?.date || ''}
                  tags={blogPost()?.tags || []}
                />
                <MarkdownRenderer
                  content={content()}
                  error={content.error}
                  isLoading={content.loading}
                />
              </Show>
            </ErrorBoundary>
          </Show>
        </Show>
      </div>
    </div>
  )
}

export default BlogPost
