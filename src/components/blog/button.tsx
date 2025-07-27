import { A, useLocation } from '@solidjs/router'
import { createMemo } from 'solid-js'

const BlogNavButton = () => {
  const location = useLocation()

  // Wrap the route check in a memo to make it reactive
  const isBlogRoute = createMemo(() => location.pathname.startsWith('/blog'))

  return (
    <A
      href={isBlogRoute() ? '/' : '/blog'}
      class="fixed w-20 text-center top-6 right-6 p-2 px-4 z-50 rounded-full mix-blend-color-overlay text-black bg-white dark:bg-black dark:text-white dark:border-white border-2 transition-all duration-500 hover:scale-105"
    >
      {isBlogRoute() ? 'home.' : 'blog.'}
    </A>
  )
}

export default BlogNavButton
