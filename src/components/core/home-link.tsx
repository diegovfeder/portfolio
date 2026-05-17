import { A, useLocation } from '@solidjs/router'
import { Show, createMemo } from 'solid-js'

/**
 * Fixed top-right `home.` pill. Renders on every route except `/` so
 * readers always have a one-click path back to the portfolio. Sits
 * opposite the bottom-right theme toggle so they never collide.
 */
const HomeLink = () => {
  const location = useLocation()
  const isHome = createMemo(() => location.pathname === '/')

  return (
    <Show when={!isHome()}>
      <A
        href="/"
        aria-label="Home — diegovfeder"
        class="fixed top-6 right-6 z-50 rounded-full border-2 border-gray-900 dark:border-white bg-white dark:bg-black px-4 py-2 font-mono text-sm transition-all duration-500 hover:scale-105 focus-ring"
      >
        home.
      </A>
    </Show>
  )
}

export default HomeLink
