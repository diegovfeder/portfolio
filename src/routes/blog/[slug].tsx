import { Component, ErrorBoundary, Show, Suspense, createMemo } from 'solid-js'
import { cache, createAsync, useNavigate, useParams } from '@solidjs/router'

import {
  BlogPostHeader,
  Loading,
  MarkdownRenderer,
  TerminalWindow,
  TerminalError,
} from '~/components'
import { marked } from 'marked'
import { blogPostEntries } from '~/utils/blog'

const getBlogPostContent = cache(async (slug: string) => {
  if (import.meta.env.SSR) {
    const { loadBlogPostContent } = await import('~/utils/blog-content')
    return loadBlogPostContent(slug)
  }

  const response = await fetch(`/blog/posts/${slug}.md`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Blog post "${slug}" not found. The markdown file is missing.`,
      )
    }

    throw new Error(
      `Failed to load blog post "${slug}". Server responded with ${response.status}.`,
    )
  }

  const markdown = await response.text()
  const html = await Promise.resolve(marked.parse(markdown))
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '')
}, 'blog-post-content')

export const route = {
  preload({ params }: { params: { slug: string } }) {
    void getBlogPostContent(params.slug)
  },
}

const BlogPost: Component = () => {
  const params = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const blogPost = createMemo(() =>
    blogPostEntries.find((post) => post.slug === params.slug),
  )

  const content = createAsync(
    async () => {
      const post = blogPost()
      if (!post) {
        return undefined
      }
      return getBlogPostContent(post.slug)
    },
    {
      deferStream: true,
    },
  )

  // Always render the same basic structure to avoid hydration mismatch
  return (
    <div class="relative min-h-screen">
      <div class="max-w-7xl mx-auto px-4 pt-8 pb-4">
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
                    `Blog post not found. The post you're looking for doesn't exist.`,
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
            <Suspense fallback={<Loading />}>
              <Show when={content()}>
                {(blogContent) => (
                  <>
                    <BlogPostHeader
                      title={blogPost()?.title || ''}
                      date={blogPost()?.date || ''}
                      tags={blogPost()?.tags || []}
                    />
                    <MarkdownRenderer content={blogContent()} />
                  </>
                )}
              </Show>
            </Suspense>
          </ErrorBoundary>
        </Show>
      </div>
    </div>
  )
}

export default BlogPost
