import { Meta, Title } from '@solidjs/meta'
import { For, Show, createResource } from 'solid-js'

import type { BragPageData } from '~/utils/brag'
import { buildBragPageData } from '~/utils/brag'

const formatEntryDate = (value: string) => {
  const parsed = new Date(`${value}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(parsed)
}

const clipText = (value: string, maxLength = 190) => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 3)}...`
}

const buildBragRouteFallbackData = (): BragPageData => ({
  entries: [],
  summaries: [
    {
      period: 'weekly',
      wins: ['No weekly entries yet.'],
      lessons: ['Capture one concrete lesson for each completed task.'],
      gaps: ['Add one measurable metric per entry.'],
      nextActions: ['Run `bun run brag:sync` after adding captures.'],
    },
    {
      period: 'monthly',
      wins: ['No monthly entries yet.'],
      lessons: ['Group wins by scope (delivery, technical depth, leadership).'],
      gaps: ['Link each story to evidence and impact.'],
      nextActions: ['Create one CV-ready bullet per high-impact entry.'],
    },
    {
      period: 'quarterly',
      wins: ['No quarterly entries yet.'],
      lessons: ['Promote repeat wins into clear role narratives.'],
      gaps: ['Map skill gaps to focused practice plans.'],
      nextActions: ['Prepare one interview drill sheet from top entries.'],
    },
  ],
  prompts: [
    {
      id: 'placeholder-prompt',
      title: 'Placeholder Prompt',
      goal: 'Use this while capture data is being prepared.',
      requiredInputs: ['TARGET_ROLE', 'JOB_DESCRIPTION'],
      templateText: `Using placeholder mode.

1. Paste the target role and job description.
2. Ask for 3 STAR stories using your latest project work.
3. Replace placeholders after running \`bun run brag:sync\`.`,
    },
  ],
  exports: [
    {
      id: 'placeholder-export',
      title: 'Placeholder Export',
      description: 'Temporary export block while captures are empty.',
      markdown: `# Placeholder Brag Export

## Target Role
{{TARGET_ROLE}}

## Evidence Entries
1. Add captures in docs/brag/captures
2. Run bun run brag:sync
3. Refresh /brag`,
    },
  ],
  privateMode: 'fallback',
  privateModeHint:
    'Showing safe placeholder data. Add capture notes and run `bun run brag:sync` to load real local entries.',
})

const loadBragPageData = async (): Promise<BragPageData> => {
  try {
    return await buildBragPageData()
  } catch (error) {
    console.error('Failed to load brag page data:', error)
    return buildBragRouteFallbackData()
  }
}

export default function BragRoute() {
  const [pageData] = createResource(loadBragPageData)

  return (
    <>
      <Title>brag_document.</Title>
      <Meta
        name="description"
        content="Career OS route for brag document workflows."
      />

      <div class="relative min-h-screen">
        <div class="max-w-7xl px-4 py-16">
          <header class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-black/80 p-6">
            <p class="font-mono text-xs uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Career Evidence OS
            </p>
            <h1 class="text-4xl md:text-5xl font-mono font-bold mt-3 leading-tight">
              brag_document
              <span class="text-blue-600 dark:text-blue-400">.</span>
            </h1>
            <p class="font-mono mt-3 text-gray-700 dark:text-gray-300 max-w-4xl">
              Daily capture in docs, automated private sync, and reusable AI prompts for CV, fit analysis, and interview drills.
            </p>

            <Show when={pageData()}>
              {(dataAccessor) => {
                const data = dataAccessor()

                return (
                  <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    <article class="rounded-lg border border-cyan-200 dark:border-cyan-700 px-4 py-3">
                      <p class="font-mono text-xs uppercase text-cyan-700 dark:text-cyan-300">
                        Entries
                      </p>
                      <p class="font-mono text-2xl mt-1">{data.entries.length}</p>
                    </article>

                    <article class="rounded-lg border border-emerald-200 dark:border-emerald-700 px-4 py-3">
                      <p class="font-mono text-xs uppercase text-emerald-700 dark:text-emerald-300">
                        Retros
                      </p>
                      <p class="font-mono text-2xl mt-1">{data.summaries.length}</p>
                    </article>

                    <article class="rounded-lg border border-blue-200 dark:border-blue-700 px-4 py-3">
                      <p class="font-mono text-xs uppercase text-blue-700 dark:text-blue-300">
                        Prompt Packs
                      </p>
                      <p class="font-mono text-2xl mt-1">{data.prompts.length}</p>
                    </article>

                    <article class="rounded-lg border border-amber-200 dark:border-amber-700 px-4 py-3">
                      <p class="font-mono text-xs uppercase text-amber-700 dark:text-amber-300">
                        Private Mode
                      </p>
                      <p class="font-mono text-xl mt-1">{data.privateMode}</p>
                    </article>
                  </div>
                )
              }}
            </Show>
          </header>

          <Show
            when={pageData()}
            fallback={
              <section class="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-black/90 p-6">
                <p class="font-mono text-sm text-gray-700 dark:text-gray-300">
                  Loading brag data...
                </p>
              </section>
            }
          >
            {(dataAccessor) => {
              const data = dataAccessor()

              return (
                <>
                  <Show when={data.privateModeHint}>
                    <aside class="mt-6 rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/20 p-4">
                      <p class="font-mono text-sm text-amber-900 dark:text-amber-300">
                        {data.privateModeHint}
                      </p>
                    </aside>
                  </Show>

                  <div class="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <section class="rounded-xl border border-cyan-200 dark:border-cyan-700 bg-white/95 dark:bg-black/90 p-6">
                      <h2 class="text-2xl font-mono font-bold">timeline</h2>
                      <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        Unified timeline from blog evidence and local private captures.
                      </p>

                      <Show
                        when={data.entries.length > 0}
                        fallback={
                          <p class="mt-4 rounded-lg border border-cyan-100 dark:border-cyan-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            No entries yet. Add a capture note and run `bun run brag:sync`.
                          </p>
                        }
                      >
                        <div class="mt-4 space-y-3 max-h-[560px] overflow-y-auto pr-1">
                          <For each={data.entries}>
                            {(entry) => (
                              <article class="rounded-lg border border-cyan-100 dark:border-cyan-900 px-4 py-3">
                                <p class="font-mono text-xs uppercase text-cyan-700 dark:text-cyan-300">
                                  {entry.source} · {formatEntryDate(entry.date)}
                                </p>
                                <h3 class="font-semibold mt-1">{entry.title}</h3>
                                <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                  {clipText(entry.impactMetric || entry.impact)}
                                </p>
                                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                  {entry.tags.join(' · ')}
                                </p>
                              </article>
                            )}
                          </For>
                        </div>
                      </Show>
                    </section>

                    <section class="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white/95 dark:bg-black/90 p-6">
                      <h2 class="text-2xl font-mono font-bold">retros</h2>
                      <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        Weekly, monthly, and quarterly summary snapshots generated from entries.
                      </p>

                      <Show
                        when={data.summaries.length > 0}
                        fallback={
                          <p class="mt-4 rounded-lg border border-emerald-100 dark:border-emerald-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            No summaries yet. Placeholder retros will appear after sync.
                          </p>
                        }
                      >
                        <div class="mt-4 space-y-3">
                          <For each={data.summaries}>
                            {(summary) => (
                              <article class="rounded-lg border border-emerald-100 dark:border-emerald-900 px-4 py-3">
                                <h3 class="font-mono text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                                  {summary.period}
                                </h3>
                                <p class="mt-2 text-sm">
                                  <strong>Wins:</strong> {summary.wins.join(' | ')}
                                </p>
                                <p class="mt-2 text-sm">
                                  <strong>Lessons:</strong> {summary.lessons.join(' | ')}
                                </p>
                                <p class="mt-2 text-sm">
                                  <strong>Gaps:</strong> {summary.gaps.join(' | ')}
                                </p>
                                <p class="mt-2 text-sm">
                                  <strong>Next:</strong> {summary.nextActions.join(' | ')}
                                </p>
                              </article>
                            )}
                          </For>
                        </div>
                      </Show>
                    </section>

                    <section class="rounded-xl border border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-black/90 p-6">
                      <h2 class="text-2xl font-mono font-bold">ai prompts</h2>
                      <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        Prompt templates for CV tailoring, fit analysis, interview drills, and process tracking.
                      </p>

                      <Show
                        when={data.prompts.length > 0}
                        fallback={
                          <p class="mt-4 rounded-lg border border-blue-100 dark:border-blue-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            Prompt templates are not available yet.
                          </p>
                        }
                      >
                        <div class="mt-4 space-y-3 max-h-[560px] overflow-y-auto pr-1">
                          <For each={data.prompts}>
                            {(prompt) => (
                              <article class="rounded-lg border border-blue-100 dark:border-blue-900 px-4 py-3">
                                <h3 class="font-semibold">{prompt.title}</h3>
                                <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                  {prompt.goal}
                                </p>
                                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                  Required: {prompt.requiredInputs.join(', ')}
                                </p>
                                <pre class="mt-3 rounded-lg bg-gray-100 dark:bg-gray-900 p-3 text-xs whitespace-pre-wrap font-mono">
                                  {prompt.templateText}
                                </pre>
                              </article>
                            )}
                          </For>
                        </div>
                      </Show>
                    </section>

                    <section class="rounded-xl border border-amber-200 dark:border-amber-700 bg-white/95 dark:bg-black/90 p-6">
                      <h2 class="text-2xl font-mono font-bold">exports</h2>
                      <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                        Copy-ready markdown blocks for custom CVs, fit analysis, and interview drill sheets.
                      </p>

                      <Show
                        when={data.exports.length > 0}
                        fallback={
                          <p class="mt-4 rounded-lg border border-amber-100 dark:border-amber-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            Export templates are not available yet.
                          </p>
                        }
                      >
                        <div class="mt-4 space-y-3 max-h-[560px] overflow-y-auto pr-1">
                          <For each={data.exports}>
                            {(block) => (
                              <article class="rounded-lg border border-amber-100 dark:border-amber-900 px-4 py-3">
                                <h3 class="font-semibold">{block.title}</h3>
                                <p class="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                  {block.description}
                                </p>
                                <pre class="mt-3 rounded-lg bg-gray-100 dark:bg-gray-900 p-3 text-xs whitespace-pre-wrap font-mono">
                                  {block.markdown}
                                </pre>
                              </article>
                            )}
                          </For>
                        </div>
                      </Show>
                    </section>
                  </div>
                </>
              )
            }}
          </Show>
        </div>
      </div>
    </>
  )
}
