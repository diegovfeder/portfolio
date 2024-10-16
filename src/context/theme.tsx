import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

export const THEME_VALUES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

type Theme = (typeof THEME_VALUES)[keyof typeof THEME_VALUES];

interface ThemeContextState {
  theme: Theme;
}

interface ThemeContextValue extends ThemeContextState {
  toggleTheme: () => void;
}

const defaultState: ThemeContextState = {
  theme: THEME_VALUES.LIGHT,
};

const ThemeContext = createContext<ThemeContextValue>({
  ...defaultState,
  toggleTheme: () => {},
});

export const ThemeProvider: ParentComponent = (props) => {
  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = localStorage.getItem("theme") as Theme;
      if (storedTheme) {
        return storedTheme;
      }
    }
    return defaultState.theme;
  };

  const [state, setState] = createStore<ThemeContextState>({
    theme: getInitialTheme(),
  });

  const toggleTheme = () => {
    const newTheme =
      state.theme === THEME_VALUES.LIGHT
        ? THEME_VALUES.DARK
        : THEME_VALUES.LIGHT;

    setState({ theme: newTheme });

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", newTheme);
    }

    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle(
        THEME_VALUES.DARK,
        newTheme === THEME_VALUES.DARK
      );
    }
  };

  // Apply theme on initial load
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle(
      THEME_VALUES.DARK,
      state.theme === THEME_VALUES.DARK
    );
  }

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
