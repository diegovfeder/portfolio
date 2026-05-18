import { Meta, Title } from '@solidjs/meta'
import { A, cache, createAsync } from '@solidjs/router'
import {
  ErrorBoundary,
  For,
  Match,
  Show,
  Suspense,
  Switch,
  createMemo,
} from 'solid-js'

import { MarkdownRenderer } from '~/components'
import BragHeader from './header'
import BragNav from './nav'
import { getBragReportByYear, resolveRelatedBlogPosts } from '~/utils/brag'
import { renderMarkdownContent } from '~/utils/markdown-content'

const formatDate = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
    parsed,
  )
}

const stripLeadingH1 = (html: string) =>
  html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '')

export const getBragReportContent = cache(async (year: string) => {
  if (import.meta.env.SSR) {
    const { loadBragReportContent } = await import(
      '~/utils/brag-report-content'
    )
    const html = await loadBragReportContent(year)
    return stripLeadingH1(html)
  }

  const response = await fetch(`/brag/reports/${year}.md`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Brag report "${year}" not found. The markdown file is missing.`,
      )
    }

    throw new Error(
      `Failed to load brag report "${year}". Server responded with ${response.status}.`,
    )
  }

  const markdown = await response.text()
  const html = await renderMarkdownContent(markdown)
  return stripLeadingH1(html)
}, 'brag-report-content')

export function BragReportPage(props: { year: string }) {
  const report = createMemo(() => getBragReportByYear(props.year))
  const relatedPosts = createMemo(() => {
    const currentReport = report()
    return currentReport ? resolveRelatedBlogPosts(currentReport) : []
  })
  const content = createAsync(
    async () => {
      const currentReport = report()
      if (!currentReport) {
        return undefined
      }
      return getBragReportContent(currentReport.year)
    },
    { deferStream: true },
  )

  return (
    <>
      <Title>{report()?.title || 'brag_report_not_found.'}</Title>
      <Meta
        name="description"
        content={
          report()?.summary ||
          'Requested yearly brag document could not be found.'
        }
      />
      <Meta name="robots" content="noindex, nofollow" />

      <div class="relative min-h-screen">
        <div class="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <BragNav />

          <Switch>
            <Match when={!report()}>
              <BragHeader
                title="brag_report_not_found"
                tagline={
                  <>
                    No yearly brag document found for {props.year}. The archive
                    is intentionally small and year-based. Browse the brag index
                    for the available annual documents.
                  </>
                }
              />
              <A
                href="/brag"
                class="inline-flex rounded-full border-2 border-gray-900 dark:border-white px-5 py-3 font-mono text-sm transition-all duration-500 hover:scale-105 focus-ring"
              >
                back_to_brag_index.
              </A>
            </Match>

            <Match when={report()}>
              {(reportAccessor) => (
                <>
                  <BragHeader
                    title={`year_${reportAccessor().year}`}
                    tagline={<>{reportAccessor().summary}</>}
                  />

                  <p class="font-mono text-sm text-slate-500 dark:text-slate-400 mb-6">
                    published {formatDate(reportAccessor().publishedAt)}
                  </p>

                  <div class="flex flex-wrap gap-2 mb-12">
                    <For each={reportAccessor().tags}>
                      {(tag) => (
                        <span class="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-slate-600 dark:text-slate-300 rounded-full">
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>

                  <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_0.55fr] gap-8">
                    <section class="border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black p-6 md:p-8">
                      <ErrorBoundary
                        fallback={() => (
                          <p class="font-mono text-sm text-red-500">
                            Failed to load yearly brag document.
                          </p>
                        )}
                      >
                        <Suspense
                          fallback={
                            <p class="font-mono text-sm text-slate-500 dark:text-slate-400">
                              Loading yearly brag document...
                            </p>
                          }
                        >
                          <Show when={content()}>
                            {(html) => <MarkdownRenderer content={html()} />}
                          </Show>
                        </Suspense>
                      </ErrorBoundary>
                    </section>

                    <aside class="space-y-6">
                      <section class="border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black p-6">
                        <h2 class="text-xl font-bold">key_metrics</h2>
                        <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14 mb-4" />
                        <ul class="space-y-2">
                          <For each={reportAccessor().metrics}>
                            {(metric) => (
                              <li class="text-sm leading-6 text-slate-700 dark:text-slate-300">
                                <span class="text-blue-600 dark:text-blue-400 font-mono mr-2">
                                  ·
                                </span>
                                {metric}
                              </li>
                            )}
                          </For>
                        </ul>
                      </section>

                      <section class="border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black p-6">
                        <h2 class="text-xl font-bold">related_posts</h2>
                        <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14 mb-4" />
                        <p class="text-sm leading-6 text-slate-700 dark:text-slate-300 mb-4">
                          Public evidence tied to this yearly document.
                        </p>
                        <div class="space-y-3">
                          <For each={relatedPosts()}>
                            {(post) => (
                              <A
                                href={`/blog/${post.slug}`}
                                class="group block border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 focus-ring"
                              >
                                <p class="font-mono text-xs text-slate-500 dark:text-slate-400 mb-1">
                                  {formatDate(post.date)}
                                </p>
                                <h3 class="font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                  {post.title}
                                </h3>
                                <p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                  {post.description}
                                </p>
                              </A>
                            )}
                          </For>
                        </div>
                      </section>
                    </aside>
                  </div>
                </>
              )}
            </Match>
          </Switch>
        </div>
      </div>
    </>
  )
}
