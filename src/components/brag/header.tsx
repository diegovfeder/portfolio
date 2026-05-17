import type { JSX } from 'solid-js'

interface BragHeaderProps {
  title: string
  tagline: JSX.Element
}

const BragHeader = (props: BragHeaderProps) => {
  return (
    <header class="mb-12">
      <h1 class="text-4xl sm:text-5xl font-mono font-bold leading-tight">
        {props.title}
        <span class="text-blue-600 dark:text-blue-400">.</span>
      </h1>
      <p class="mt-4 max-w-3xl text-base sm:text-lg leading-7 text-slate-700 dark:text-slate-300">
        {props.tagline}
      </p>
    </header>
  )
}

export default BragHeader
