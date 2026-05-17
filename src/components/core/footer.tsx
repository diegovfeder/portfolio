import { A, useLocation } from '@solidjs/router'
import { For, createMemo } from 'solid-js'

interface FooterLink {
  href: string
  label: string
}

// Note: `/brag` is intentionally NOT linked here while the experience is
// work-in-progress. It remains reachable via direct URL (and
// `<Meta name="robots" content="noindex" />` keeps it out of search).
// Restore the entry to promote it again.
const FOOTER_LINKS: FooterLink[] = [
  { href: '/blog', label: 'blog.' },
  { href: '/chat', label: 'chat.' },
]

const Footer = () => {
  const location = useLocation()
  const isHome = createMemo(() => location.pathname === '/')

  return (
    <footer class="mt-8 border-t border-gray-200 dark:border-gray-800 py-6">
      <div class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
        <A
          href="/"
          aria-label="Home — diegovfeder"
          class="font-mono text-3xl font-semibold focus-pulse transition-all duration-500 hover:scale-105 sm:justify-self-start"
          classList={{ 'sm:ml-20': isHome() }}
        >
          dvf<span class="text-blue-600 dark:text-blue-400">.</span>
        </A>
        <nav
          aria-label="Primary"
          class="flex flex-wrap items-center justify-center gap-6"
        >
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
        <div aria-hidden="true" class="hidden sm:block" />
      </div>
    </footer>
  )
}

export default Footer
