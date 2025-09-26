import { For, Show } from 'solid-js'
import { A } from '@solidjs/router'

import { LazyImage, DialogImage } from '../core'

interface ProjectProps {
  image: string
  tags: string[]
  title: string
  subTitle?: string
  description: string
  url?: string
  archived?: boolean
}

const Project = ({
  image,
  tags,
  title,
  subTitle,
  description,
  url,
  archived = false,
}: ProjectProps) => {
  return (
    <div
      class={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 w-full max-w-4xl relative ${
        archived ? 'opacity-60' : ''
      }`}
    >
      <Show when={archived}>
        <div class="absolute top-2 right-2 z-10 bg-slate-900 dark:bg-slate-100 text-white dark:text-black text-xs font-bold px-2 py-1 rounded-full">
          ARCHIVED
        </div>
      </Show>
      <div class="flex flex-col justify-between">
        <div class="pb-2">
          <div class="flex flex-wrap gap-2 items-end pb-2">
            <h2 class=" text-xl md:text-2xl font-bold">{title}</h2>
            {subTitle ? (
              <h3 class="text-lg md:text-xl font-light">{subTitle}</h3>
            ) : null}
          </div>
          <p class="text-md md:text-lg text-slate-700 dark:text-slate-300 font-thin text-left">
            {description}
          </p>
        </div>
        {url && !archived ? (
          <A
            href={url}
            target="_blank"
            class="mt-4 md:mt-0 w-fit whitespace-nowrap hover:font-bold hover:scale-105 transition-all duration-500 focus-ring"
          >
            view project
            <div class="text-xl font-bold border-slate-700 dark:border-slate-300 border-b-4 w-6" />
          </A>
        ) : null}
      </div>
      <div class="flex flex-col group">
        <DialogImage
          src={image}
          alt={`Full size screenshot of ${title}`}
          trigger={
            <div class="overflow-hidden rounded-sm cursor-pointer">
              <LazyImage
                src={image}
                alt={`Screenshot of the ${title} project`}
                class="rounded-sm w-full h-auto object-cover transition-all duration-300 hover:animate-pulse"
              />
            </div>
          }
        />
        <ul class="flex flex-wrap text-xs font-bold pt-4">
          <For each={tags}>
            {(tag) => (
              <li class="flex justify-center items-center text-center border px-4 py-2 rounded-full leading-none me-1 mb-2">
                {tag}
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  )
}

export default Project
