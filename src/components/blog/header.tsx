import { Title } from '@solidjs/meta'

const BlogHeader = () => {
  return (
    <>
      <Title>blog_posts.</Title>
      <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 class="text-4xl font-mono font-bold pt-8">
          blog_posts
          <span class="text-blue-600 dark:text-blue-400">.</span>
        </h1>
        <p class="font-mono mt-2">
          <span class="text-purple-600 dark:text-purple-400">const</span>{' '}
          <span class="text-blue-600 dark:text-blue-400">thoughts</span>{' '}
          <span class="text-gray-500">=</span>{' '}
          <span class="text-gray-500">[</span>
          <span class="text-green-500 dark:text-green-400">'code'</span>
          <span class="text-gray-500">,</span>{' '}
          <span class="text-green-500 dark:text-green-400">'tech'</span>
          <span class="text-gray-500">,</span>{' '}
          <span class="text-green-500 dark:text-green-400">'life'</span>
          <span class="text-gray-500">]</span>
        </p>
      </div>
    </>
  )
}

export default BlogHeader
