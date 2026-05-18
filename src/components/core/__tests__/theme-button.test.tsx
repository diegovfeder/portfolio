// @vitest-environment jsdom

import { MetaProvider } from '@solidjs/meta'
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// ThemeButton uses useLocation to only render on the home route; mock it
// so the tests can mount the component without a Router.
vi.mock('@solidjs/router', async () => {
  const actual = await vi.importActual<typeof import('@solidjs/router')>(
    '@solidjs/router'
  )
  return {
    ...actual,
    useLocation: () => ({ pathname: '/' }),
  }
})

import ThemeButton from '~/components/core/theme-button'
import { ThemeProvider } from '~/context/theme'

describe('ThemeButton', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document classes
    document.documentElement.className = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders with default light theme text', () => {
    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')
    expect(button.textContent).toBe('dark mode.')
  })

  it('toggles theme when clicked', async () => {
    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')

    // Initial state - should show "dark mode." (meaning light theme is active)
    expect(button.textContent).toBe('dark mode.')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    // Click to toggle to dark mode
    await fireEvent.click(button)

    await waitFor(() => {
      expect(button.textContent).toBe('light mode.')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    // Click again to toggle back to light mode
    await fireEvent.click(button)

    await waitFor(() => {
      expect(button.textContent).toBe('dark mode.')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(localStorage.getItem('theme')).toBe('light')
    })
  })

  it('persists theme to localStorage', async () => {
    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')

    // Toggle to dark
    await fireEvent.click(button)

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('dark')
    })

    // Toggle back to light
    await fireEvent.click(button)

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('light')
    })
  })

  it('loads saved theme from localStorage on mount', async () => {
    // Set dark mode in localStorage before mounting
    localStorage.setItem('theme', 'dark')

    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')

    // Should initialize with dark mode
    await waitFor(() => {
      expect(button.textContent).toBe('light mode.')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('applies dark class to document element when in dark mode', async () => {
    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')

    // Initially no dark class
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    // Click to enable dark mode
    await fireEvent.click(button)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('sets background color on document element', async () => {
    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')

    // Click to dark mode
    await fireEvent.click(button)

    await waitFor(() => {
      expect(document.documentElement.style.backgroundColor).toBe('black')
    })

    // Click back to light mode
    await fireEvent.click(button)

    await waitFor(() => {
      expect(document.documentElement.style.backgroundColor).toBe('white')
    })
  })

  it('handles multiple rapid toggles correctly', async () => {
    render(() => (
      <MetaProvider>
        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </MetaProvider>
    ))

    const button = screen.getByRole('button')

    // Rapid clicks
    await fireEvent.click(button)
    await fireEvent.click(button)
    await fireEvent.click(button)

    await waitFor(() => {
      // Should end up in dark mode (3 clicks: light->dark->light->dark)
      expect(button.textContent).toBe('light mode.')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })
})
