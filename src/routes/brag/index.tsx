import { Meta, Title } from '@solidjs/meta'
import { A } from '@solidjs/router'
import { For } from 'solid-js'

import { BragHeader, BragNav } from '~/components'
import { buildBragPageData } from '~/utils/brag'

const formatDate = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
    parsed,
  )
}

const data = buildBragPageData()
const recentEvidencePreview = data.recentEvidence.slice(0, 3)

export default function BragRoute() {
  return (
    <>
      <Title>brag_document.</Title>
      <Meta
        name="description"
        content="Public proof surface: recent writing, yearly impact documents, profile and timeline, plus reusable career prompts and artifacts."
      />
      <Meta name="robots" content="noindex, nofollow" />

      <div class="relative min-h-screen">
        <div class="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <BragNav />

          <BragHeader
            title="brag_document"
            tagline={
              <>
                A public proof surface for recent writing, yearly impact
                documents, and the working profile behind the portfolio.
              </>
            }
          />

          {/* CTAs + meta strip */}
          <div class="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <dl class="flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
              <div>
                <dt class="text-slate-500 dark:text-slate-400">role</dt>
                <dd class="font-bold">{data.profile.currentRole}</dd>
              </div>
              <div>
                <dt class="text-slate-500 dark:text-slate-400">experience</dt>
                <dd class="font-bold">{data.profile.yearsOfExperience}</dd>
              </div>
              <div>
                <dt class="text-slate-500 dark:text-slate-400">reports</dt>
                <dd class="font-bold">{data.reports.length} annual</dd>
              </div>
            </dl>
          </div>

          {/* Recent evidence */}
          <section class="mb-16">
            <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 class="text-xl font-bold">recent_evidence</h2>
                <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
                <p class="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
                  Latest public writing tied to practical engineering work.
                </p>
              </div>
              <A
                href="/blog"
                class="font-mono text-sm text-blue-600 dark:text-blue-400 hover:underline focus-ring"
              >
                view_all_posts.
              </A>
            </div>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <For each={recentEvidencePreview}>
                {(entry) => (
                  <article class="group relative h-full rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
                    <p class="font-mono text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {formatDate(entry.date)}
                    </p>
                    <h3 class="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {entry.title}
                    </h3>
                    <p class="mb-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {entry.impact}
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <For each={entry.tags.slice(0, 4)}>
                        {(tag) => (
                          <span class="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-slate-600 dark:text-slate-300 rounded-full">
                            {tag}
                          </span>
                        )}
                      </For>
                    </div>
                    <A
                      href={entry.link}
                      class="absolute inset-0 rounded-lg focus-ring"
                      aria-label={`Read post: ${entry.title}`}
                    />
                  </article>
                )}
              </For>
            </div>
          </section>

          {/* Yearly documents */}
          <section class="mb-16">
            <div class="mb-6">
              <h2 class="text-xl font-bold">yearly_documents</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
              <p class="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
                One living annual document per year, updated as the work
                compounds.
              </p>
            </div>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <For each={data.reports}>
                {(report) => (
                  <article class="group relative rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400">
                    <p class="font-mono text-xs text-slate-500 dark:text-slate-400 mb-3">
                      year = '{report.year}' · {formatDate(report.publishedAt)}
                    </p>
                    <h3 class="mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {report.title}
                    </h3>
                    <p class="mb-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {report.summary}
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <For each={report.metrics}>
                        {(metric) => (
                          <span class="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-slate-600 dark:text-slate-300 rounded-full">
                            {metric}
                          </span>
                        )}
                      </For>
                    </div>
                    <A
                      href={`/brag/${report.year}`}
                      class="absolute inset-0 rounded-lg focus-ring"
                      aria-label={`Read ${report.title}`}
                    />
                  </article>
                )}
              </For>
            </div>
          </section>

          {/* Explore more */}
          <section>
            <div class="mb-6">
              <h2 class="text-xl font-bold">explore_more</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
              <p class="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
                Deeper context behind the proof surface.
              </p>
            </div>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <A
                href="/brag/profile"
                class="group relative rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 focus-ring"
              >
                <h3 class="mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  profile
                  <span class="text-blue-600 dark:text-blue-400">.</span>
                </h3>
                <p class="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Working profile, strengths, focus areas, skill groups, and the
                  experience timeline that grounds the proof surface.
                </p>
              </A>
              <A
                href="/brag/toolkit"
                class="group relative rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 focus-ring"
              >
                <h3 class="mb-3 text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  toolkit
                  <span class="text-blue-600 dark:text-blue-400">.</span>
                </h3>
                <p class="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Reusable prompts and artifact templates for turning public
                  evidence into resumes, fit analyses, and interview stories.
                </p>
              </A>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
