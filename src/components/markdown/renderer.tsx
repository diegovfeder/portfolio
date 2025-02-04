import { Component, Match, Switch } from 'solid-js'

interface MarkdownRendererProps {
  content?: string
  isLoading?: boolean
  error?: Error
  class?: string
}

const MarkdownRenderer: Component<MarkdownRendererProps> = ({
  content,
  isLoading,
  error,
  class: className,
}) => {
  return (
    <Switch fallback={<div>Something went wrong</div>}>
      <Match when={isLoading}>
        <div class="font-mono text-gray-500 animate-pulse">
          Loading content...
        </div>
      </Match>

      <Match when={error}>
        <div class="text-red-500 font-mono">
          {error?.message || 'Failed to load content'}
        </div>
      </Match>

      <Match when={content}>
        <article
          class={`
            prose dark:prose-invert max-w-none
            prose-h1:font-mono prose-h1:text-2xl
            prose-h2:font-mono prose-h2:text-xl
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-code:font-mono prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
            prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
            prose-strong:text-blue-600 dark:prose-strong:text-blue-400
            prose-ol:list-none prose-ol:pl-0 prose-ol:m-0
            prose-ol>li:flex prose-ol>li:items-baseline prose-ol>li:gap-2
            prose-ol>li:before:content-[counter(list-item)'.'] prose-ol>li:before:text-gray-500 prose-ol>li:before:dark:text-gray-400
            prose-ul:list-none prose-ul:pl-4
            prose-li:text-gray-700 dark:prose-li:text-gray-300
            ${className || ''}
          `}
          innerHTML={content}
        />
      </Match>
    </Switch>
  )
}

export default MarkdownRenderer
