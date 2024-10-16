import { useLocation } from "@solidjs/router";

import { useTheme } from "~/context";
import { THEME_VALUES } from "~/constants";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <button
      class="fixed bottom-16 -right-6 p-2 px-4 z-50 rounded-full -rotate-90 mix-blend-color-overlay text-black bg-white dark:bg-black dark:text-white dark:border-white border-2 transition-all duration-500 hover:scale-105"
      onClick={toggleTheme}
    >
      {theme === THEME_VALUES.DARK ? "light mode." : "dark mode."}
    </button>
  );
};

export default ThemeButton;
