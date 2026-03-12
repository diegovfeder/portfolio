import { A, useLocation } from '@solidjs/router'
import { createMemo } from 'solid-js'

interface QuickLink {
  href: string
  label: string
}

const HOME_LINK: QuickLink = { href: '/', label: 'home.' }
const BLOG_LINK: QuickLink = { href: '/blog', label: 'blog.' }
const CHAT_LINK: QuickLink = { href: '/chat', label: 'chat.' }

const BlogNavButton = () => {
  const location = useLocation()
  const quickLinks = createMemo<{ first: QuickLink; second: QuickLink }>(() => {
    const pathname = location.pathname

    if (pathname === '/') {
      return { first: BLOG_LINK, second: CHAT_LINK }
    }

    if (pathname.startsWith('/blog')) {
      return { first: HOME_LINK, second: CHAT_LINK }
    }

    if (pathname.startsWith('/chat')) {
      return { first: HOME_LINK, second: BLOG_LINK }
    }

    return { first: HOME_LINK, second: BLOG_LINK }
  })

  return (
    <div class="fixed top-6 right-6 z-50 flex flex-col gap-2">
      <A
        href={quickLinks().first.href}
        class="w-20 text-center p-2 px-4 rounded-full mix-blend-color-overlay text-black bg-white dark:bg-black dark:text-white dark:border-white border-2 transition-all duration-500 hover:scale-105 focus-ring"
      >
        {quickLinks().first.label}
      </A>
      <A
        href={quickLinks().second.href}
        class="w-20 text-center p-2 px-4 rounded-full mix-blend-color-overlay text-black bg-white dark:bg-black dark:text-white dark:border-white border-2 transition-all duration-500 hover:scale-105 focus-ring"
      >
        {quickLinks().second.label}
      </A>
    </div>
  )
}

export default BlogNavButton
