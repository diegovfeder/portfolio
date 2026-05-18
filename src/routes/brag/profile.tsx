import { Meta, Title } from '@solidjs/meta'
import { For } from 'solid-js'

import { BragHeader, BragNav } from '~/components'
import { bragProfile, bragTimeline } from '~/data/brag/profile'

export default function BragProfileRoute() {
  return (
    <>
      <Title>profile. | brag_document</Title>
      <Meta
        name="description"
        content="Working profile, strengths, focus areas, skill groups, and the experience timeline behind the portfolio."
      />
      <Meta name="robots" content="noindex, nofollow" />

      <div class="relative min-h-screen">
        <div class="max-w-7xl mx-auto px-4 pt-8 pb-4">
          <BragNav />

          <BragHeader
            title="profile"
            tagline={
              <>
                Working profile, focus areas, skill groups, and the experience
                timeline that grounds the public proof surface.
              </>
            }
          />

          {/* Positioning + summary */}
          <section class="mb-16">
            <div class="mb-6">
              <h2 class="text-xl font-bold">positioning</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
            </div>
            <p class="font-mono text-sm text-slate-500 dark:text-slate-400 mb-4">
              {bragProfile.currentRole} · {bragProfile.yearsOfExperience} ·{' '}
              {bragProfile.location}
            </p>
            <p class="max-w-3xl text-lg leading-7 text-slate-700 dark:text-slate-300 mb-6">
              {bragProfile.positioning}
            </p>
            <p class="max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
              {bragProfile.summary}
            </p>
          </section>

          {/* Highlights */}
          <section class="mb-16">
            <div class="mb-6">
              <h2 class="text-xl font-bold">highlights</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
            </div>
            <ul class="max-w-3xl space-y-3">
              <For each={bragProfile.highlights}>
                {(highlight) => (
                  <li class="text-base leading-7 text-slate-700 dark:text-slate-300">
                    <span class="text-blue-600 dark:text-blue-400 font-mono mr-2">
                      →
                    </span>
                    {highlight}
                  </li>
                )}
              </For>
            </ul>
          </section>

          {/* Strengths + focus areas */}
          <section class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 class="text-xl font-bold">strengths</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14 mb-4" />
              <div class="flex flex-wrap gap-2">
                <For each={bragProfile.strengths}>
                  {(strength) => (
                    <span class="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-slate-600 dark:text-slate-300 rounded-full">
                      {strength}
                    </span>
                  )}
                </For>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold">focus_areas</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14 mb-4" />
              <ul class="space-y-2">
                <For each={bragProfile.focusAreas}>
                  {(focus) => (
                    <li class="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      <span class="text-blue-600 dark:text-blue-400 font-mono mr-2">
                        ·
                      </span>
                      {focus}
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </section>

          {/* Skill groups */}
          <section class="mb-16">
            <div class="mb-6">
              <h2 class="text-xl font-bold">skill_groups</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
            </div>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <For each={bragProfile.skillGroups}>
                {(group) => (
                  <article class="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6">
                    <h3 class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">
                      {group.label}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <For each={group.items}>
                        {(item) => (
                          <span class="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-slate-600 dark:text-slate-300 rounded-full">
                            {item}
                          </span>
                        )}
                      </For>
                    </div>
                  </article>
                )}
              </For>
            </div>
          </section>

          {/* Languages + preferred roles */}
          <section class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 class="text-xl font-bold">languages</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14 mb-4" />
              <ul class="space-y-1">
                <For each={bragProfile.languages}>
                  {(lang) => (
                    <li class="font-mono text-sm text-slate-700 dark:text-slate-300">
                      {lang}
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <div>
              <h2 class="text-xl font-bold">preferred_roles</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14 mb-4" />
              <ul class="space-y-1">
                <For each={bragProfile.preferredRoles}>
                  {(role) => (
                    <li class="font-mono text-sm text-slate-700 dark:text-slate-300">
                      {role}
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <div class="mb-6">
              <h2 class="text-xl font-bold">experience_timeline</h2>
              <div class="border-slate-700 dark:border-slate-300 border-b-8 w-14" />
              <p class="mt-4 max-w-3xl text-slate-700 dark:text-slate-300">
                Recent roles first, with the strongest delivery patterns and
                system responsibilities called out directly.
              </p>
            </div>
            <div class="space-y-6">
              <For each={bragTimeline}>
                {(entry) => (
                  <article class="rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6">
                    <div class="mb-4 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p class="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                          {entry.company}
                        </p>
                        <h3 class="text-2xl font-bold">{entry.role}</h3>
                      </div>
                      <p class="font-mono text-sm text-slate-500 dark:text-slate-400">
                        {entry.period}
                      </p>
                    </div>
                    <p class="mb-4 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {entry.scope}
                    </p>
                    <div class="mb-4 flex flex-wrap gap-2">
                      <For each={entry.stack}>
                        {(item) => (
                          <span class="font-mono text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 text-slate-600 dark:text-slate-300 rounded-full">
                            {item}
                          </span>
                        )}
                      </For>
                    </div>
                    <ul class="space-y-2">
                      <For each={entry.highlights}>
                        {(highlight) => (
                          <li class="text-sm leading-6 text-slate-700 dark:text-slate-300">
                            <span class="text-blue-600 dark:text-blue-400 font-mono mr-2">
                              ·
                            </span>
                            {highlight}
                          </li>
                        )}
                      </For>
                    </ul>
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
