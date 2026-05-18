import { A, useLocation } from '@solidjs/router'
import { For, createMemo } from 'solid-js'

const parseHash = (hash: string) => {
  return hash.split('#')[1]
}

const NAV_LINKS: { hash: string; label: string }[] = [
  { hash: 'home', label: 'home' },
  { hash: 'cases', label: 'cases' },
  { hash: 'projects', label: 'projects' },
  { hash: 'about', label: 'about me' },
  { hash: 'contact', label: 'contact' },
]

const LINK_BASE_CLASS =
  'w-fit font-mono text-base sm:text-lg transform -rotate-90 origin-left hover:underline hover:scale-105 transition-all duration-500 focus-bold-and-underline'

const Nav = () => {
  const location = useLocation()
  const hashname = createMemo(() => parseHash(location.hash))

  // Hide section nav on dedicated content routes
  const shouldShowNav = createMemo(
    () =>
      !location.pathname.startsWith('/blog') &&
      !location.pathname.startsWith('/chat') &&
      !location.pathname.startsWith('/brag')
  )

  return (
    <nav
      class="fixed left-0 top-0 flex h-full w-12 flex-col justify-around whitespace-nowrap bg-white p-1 pl-6 dark:bg-black dark:text-white min-h-[420px] sm:w-20 sm:p-4 sm:pl-10 sm:min-h-[480px]"
      classList={{ hidden: !shouldShowNav() }}
    >
      <For each={NAV_LINKS}>
        {(link) => (
          <A
            href={`#${link.hash}`}
            class={LINK_BASE_CLASS}
            classList={{
              'font-bold underline': hashname() === link.hash,
            }}
          >
            {link.label}
          </A>
        )}
      </For>
    </nav>
  )
}

export default Nav
