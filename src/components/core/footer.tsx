import { A, useLocation } from '@solidjs/router'
import { For, createMemo } from 'solid-js'

interface FooterLink {
  href: string
  label: string
}

const FOOTER_LINKS: FooterLink[] = [
  { href: '/blog', label: 'blog.' },
  { href: '/chat', label: 'chat.' },
  { href: '/brag', label: 'brag.' },
]

const Footer = () => {
  const location = useLocation()
  const isHome = createMemo(() => location.pathname === '/')

  return (
    <footer
      class="mt-16 border-t border-gray-200 dark:border-gray-800 py-8"
      classList={{ 'pl-16 sm:pl-20': isHome() }}
    >
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 px-4">
        <A
          href="/"
          aria-label="Home — diegovfeder"
          class="font-mono text-3xl font-semibold focus-pulse transition-all duration-500 hover:scale-105"
        >
          dvf<span class="text-blue-600 dark:text-blue-400">.</span>
        </A>
        <nav aria-label="Primary" class="flex flex-wrap items-center gap-6">
          <For each={FOOTER_LINKS}>
            {(link) => (
              <A
                href={link.href}
                class="font-mono text-sm transition-all duration-500 hover:scale-105 hover:underline focus-ring"
                classList={{
                  'font-bold underline': location.pathname.startsWith(link.href),
                }}
              >
                {link.label}
              </A>
            )}
          </For>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
