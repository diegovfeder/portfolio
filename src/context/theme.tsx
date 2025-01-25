import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import { THEME_VALUES } from "~/constants";

type Theme = (typeof THEME_VALUES)[keyof typeof THEME_VALUES];

interface ThemeContextState {
  theme: Theme;
}

interface ThemeContextValue {
  theme: () => Theme; // Expose as accessor function
  toggleTheme: () => void;
}

const defaultState: ThemeContextState = {
  theme: THEME_VALUES.LIGHT,
};

const ThemeContext = createContext<ThemeContextValue>();

export const ThemeProvider: ParentComponent = (props) => {
  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || defaultState.theme;
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

    setState("theme", newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle(
      THEME_VALUES.DARK,
      newTheme === THEME_VALUES.DARK
    );
  };

  // Initial class setup
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle(
      THEME_VALUES.DARK,
      state.theme === THEME_VALUES.DARK
    );
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
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
