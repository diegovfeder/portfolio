import { Meta, Title } from '@solidjs/meta'

export default function BragRoute() {
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
              Direct Access Route
            </p>
            <h1 class="text-4xl md:text-5xl font-mono font-bold mt-3 leading-tight">
              brag_document
              <span class="text-blue-600 dark:text-blue-400">.</span>
            </h1>
            <p class="font-mono mt-3 text-gray-700 dark:text-gray-300 max-w-3xl">
              Route is live. Step 1 is complete with a hydration-safe static render.
            </p>
          </header>

          <div class="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section class="rounded-xl border border-cyan-200 dark:border-cyan-700 bg-white/95 dark:bg-black/90 p-6">
              <h2 class="text-2xl font-mono font-bold">timeline</h2>
              <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                Static placeholder. Next step: map blog posts into public evidence cards.
              </p>
            </section>

            <section class="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white/95 dark:bg-black/90 p-6">
              <h2 class="text-2xl font-mono font-bold">retros</h2>
              <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                Static placeholder. Next step: weekly, monthly, quarterly summaries.
              </p>
            </section>

            <section class="rounded-xl border border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-black/90 p-6">
              <h2 class="text-2xl font-mono font-bold">ai prompts</h2>
              <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                Static placeholder. Next step: CV customization, fit analysis, interview drill, Excalidraw.
              </p>
            </section>

            <section class="rounded-xl border border-amber-200 dark:border-amber-700 bg-white/95 dark:bg-black/90 p-6">
              <h2 class="text-2xl font-mono font-bold">exports</h2>
              <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
                Static placeholder. Next step: markdown blocks for copy/paste workflows.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
