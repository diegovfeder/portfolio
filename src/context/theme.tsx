import { createContext, useContext, ParentComponent, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { THEME_VALUES } from '~/constants/theme'

type Theme = (typeof THEME_VALUES)[keyof typeof THEME_VALUES]

interface ThemeContextState {
  theme: Theme
}

interface ThemeContextValue {
  theme: () => Theme // Expose as accessor function
  toggleTheme: () => void
}

const defaultState: ThemeContextState = {
  theme: THEME_VALUES.LIGHT,
}

const ThemeContext = createContext<ThemeContextValue>()

export const ThemeProvider: ParentComponent = (props) => {
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      return savedTheme || defaultState.theme
    }
    return defaultState.theme
  }

  const [state, setState] = createStore<ThemeContextState>({
    theme: defaultState.theme, // Initialize with default, but update immediately
  })

  // Synchronize theme state with localStorage on mount
  onMount(() => {
    const initialTheme = getInitialTheme()
    setState('theme', initialTheme)
    document.documentElement.classList.toggle(
      THEME_VALUES.DARK,
      initialTheme === THEME_VALUES.DARK
    )
    document.documentElement.style.backgroundColor =
      initialTheme === THEME_VALUES.DARK ? 'black' : 'white'
  })

  const toggleTheme = () => {
    const newTheme =
      state.theme === THEME_VALUES.LIGHT
        ? THEME_VALUES.DARK
        : THEME_VALUES.LIGHT

    setState('theme', newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle(
      THEME_VALUES.DARK,
      newTheme === THEME_VALUES.DARK
    )
    document.documentElement.style.backgroundColor =
      newTheme === THEME_VALUES.DARK ? 'black' : 'white'
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: () => state.theme, // Wrap store access in a function
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
