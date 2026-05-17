import { useLocation } from '@solidjs/router'
import { Show, createMemo } from 'solid-js'

import { useTheme } from '~/context'
import { THEME_VALUES } from '~/constants/theme'

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = createMemo(() => location.pathname === '/')

  return (
    <Show when={isHome()}>
      <button
        class="fixed bottom-16 -right-6 p-2 px-4 z-50 rounded-full -rotate-90 mix-blend-color-overlay text-black bg-white dark:bg-black dark:text-white dark:border-white border-2 transition-all duration-500 hover:scale-105 focus-ring"
        onClick={toggleTheme}
      >
        {theme() === THEME_VALUES.DARK ? 'light mode.' : 'dark mode.'}
      </button>
    </Show>
  )
}

export default ThemeButton
