export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const THEME_VALUES = {
  LIGHT: Theme.Light,
  DARK: Theme.Dark,
} as const

export const THEME_BUTTON_TEXT = {
  LIGHT: 'light mode.',
  DARK: 'dark mode.',
} as const
