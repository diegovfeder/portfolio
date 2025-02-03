import { Component } from 'solid-js'

interface LoadingProps {
  text?: string
  class?: string
}

const Loading: Component<LoadingProps> = (props) => {
  return (
    <div class={`font-mono ${props.class || ''}`}>
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <span class="w-2 h-2 rounded-full bg-red-500" />
        <span class="w-2 h-2 rounded-full bg-yellow-500" />
        <span class="w-2 h-2 rounded-full bg-green-500" />
        <span class="ml-2">loading.sh</span>
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div class="flex items-center gap-2">
          <span class="text-purple-600 dark:text-purple-400">const</span>
          <span class="text-blue-600 dark:text-blue-400">status</span>
          <span class="text-gray-500">=</span>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">[</span>
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:200ms]" />
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse [animation-delay:400ms]" />
            <span class="text-gray-500">]</span>
          </div>
        </div>

        <div class="mt-2 text-sm text-gray-500">
          {props.text || 'Loading content...'}
        </div>
      </div>
    </div>
  )
}

export default Loading
