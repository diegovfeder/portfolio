import { Component, ErrorBoundary, Show, Suspense, createMemo } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { cache, createAsync, useNavigate, useParams } from '@solidjs/router'

import {
  BlogPostHeader,
  Loading,
  MarkdownRenderer,
  TerminalWindow,
  TerminalError,
} from '~/components'
import { getBlogPostEntryBySlug } from '~/utils/blog'
import { renderMarkdownContent } from '~/utils/markdown-content'

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
  return renderMarkdownContent(markdown)
}, 'blog-post-content')

export const route = {
  preload({ params }: { params: { slug: string } }) {
    const post = getBlogPostEntryBySlug(params.slug)

    if (!post) {
      return
    }

    void getBlogPostContent(post.slug).catch(() => {})
  },
}

const BlogPost: Component = () => {
  const params = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const blogPost = createMemo(() => getBlogPostEntryBySlug(params.slug))
  const pageTitle = createMemo(
    () => blogPost()?.title || 'blog_post_not_found.',
  )
  const pageDescription = createMemo(
    () =>
      blogPost()?.description ||
      'Requested blog post could not be found in the portfolio archive.',
  )

  // SolidStart's route cache is SSR-aware here; keep createAsync for deferStream.
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
    <>
      <Title>{pageTitle()}</Title>
      <Meta name="description" content={pageDescription()} />

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
    </>
  )
}

export default BlogPost
