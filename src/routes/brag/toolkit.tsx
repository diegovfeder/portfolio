import { Meta, Title } from '@solidjs/meta'
import { For } from 'solid-js'

import { BragHeader, BragNav } from '~/components'
import { buildBragPageData } from '~/utils/brag'

const data = buildBragPageData()

export default function BragToolkitRoute() {
  return (
    <>
      <Title>toolkit. | brag_document</Title>
      <Meta
        name="description"
        content="Reusable prompts and artifact templates for turning public evidence into resumes, fit analyses, and interview stories."
      />
      <Meta name="robots" content="noindex, nofollow" />

      <div class="relative min-h-screen">
        <div class="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <BragNav />

          <BragHeader
            title="toolkit"
            tagline={
              <>
                Reusable prompts and artifact templates for turning public
                evidence into resumes, fit analyses, and interview stories. Not
                the brag page itself — supporting assets.
              </>
            }
          />

          {/* Prompt templates */}
          <section class="mb-16">
            <div class="mb-6">
              <h2 class="text-xl font-bold">prompt_templates</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
              <p class="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
                Drop one of these into your model of choice, fill the slots, and
                let it ground the answer in the public brag surface.
              </p>
            </div>
            <div class="space-y-6">
              <For each={data.prompts}>
                {(prompt) => (
                  <article class="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6">
                    <header class="mb-4">
                      <h3 class="text-2xl font-bold mb-2">{prompt.title}</h3>
                      <p class="mb-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {prompt.goal}
                      </p>
                      <p class="font-mono text-xs text-slate-500 dark:text-slate-400">
                        inputs: {prompt.requiredInputs.join(', ')}
                      </p>
                    </header>
                    <pre class="font-mono text-sm bg-gray-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 rounded-lg p-4 overflow-auto max-h-80 whitespace-pre-wrap">
                      {prompt.templateText}
                    </pre>
                  </article>
                )}
              </For>
            </div>
          </section>

          {/* Artifacts */}
          <section>
            <div class="mb-6">
              <h2 class="text-xl font-bold">artifacts</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
              <p class="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
                Markdown templates pre-filled with the most recent public
                evidence and yearly documents. Copy and tailor.
              </p>
            </div>
            <div class="space-y-6">
              <For each={data.artifacts}>
                {(artifact) => (
                  <article class="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6">
                    <header class="mb-4">
                      <h3 class="text-2xl font-bold mb-2">{artifact.title}</h3>
                      <p class="text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {artifact.description}
                      </p>
                    </header>
                    <pre class="font-mono text-sm bg-gray-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 rounded-lg p-4 overflow-auto max-h-80 whitespace-pre-wrap">
                      {artifact.markdown}
                    </pre>
                  </article>
                )}
              </For>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
