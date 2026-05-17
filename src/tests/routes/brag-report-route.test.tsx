// @vitest-environment jsdom

import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { MetaProvider } from '@solidjs/meta'
import { render, screen } from '@solidjs/testing-library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@solidjs/router', async () => {
  const actual = await vi.importActual<typeof import('@solidjs/router')>(
    '@solidjs/router'
  )
  const solid = await vi.importActual<typeof import('solid-js')>('solid-js')

  return {
    ...actual,
    A: (props: { href: string; children: unknown }) => (
      <a href={props.href}>{props.children}</a>
    ),
    cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
    createAsync: (fn: () => Promise<unknown>) => {
      const [data] = solid.createResource(fn)
      return data
    },
    useLocation: () => ({ pathname: '/brag/2026' }),
  }
})

import { BragReportPage } from '../../components/brag/report-page'

describe('/brag/[year] route', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request) => {
        const rawUrl =
          typeof input === 'string'
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url

        if (!rawUrl.startsWith('/brag/reports/')) {
          return new Response('', { status: 404 })
        }

        const year = rawUrl.split('/').pop()?.replace(/\.md$/, '')

        if (!year) {
          return new Response('', { status: 404 })
        }

        const markdown = await readFile(
          path.join(process.cwd(), 'public', 'brag', 'reports', `${year}.md`),
          'utf8'
        )

        return new Response(markdown, { status: 200 })
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the 2025 yearly brag document', async () => {
    render(() => (
      <MetaProvider>
        <BragReportPage year="2025" />
      </MetaProvider>
    ))

    // BragHeader title uses the `year_<year>` brand voice
    expect(
      await screen.findByRole('heading', { level: 1, name: /^year_2025/ })
    ).toBeTruthy()
    expect(await screen.findByText('92 PRs merged')).toBeTruthy()
    expect(
      await screen.findByRole('heading', { name: 'related_posts' })
    ).toBeTruthy()
    expect(
      await screen.findByRole('heading', { name: 'key_metrics' })
    ).toBeTruthy()
  })

  it('renders the 2026 yearly brag document', async () => {
    render(() => (
      <MetaProvider>
        <BragReportPage year="2026" />
      </MetaProvider>
    ))

    expect(
      await screen.findByRole('heading', { level: 1, name: /^year_2026/ })
    ).toBeTruthy()
    expect(
      await screen.findByText(/this is the live annual brag document for 2026/i)
    ).toBeTruthy()
  })

  it('shows a clear missing year state', async () => {
    render(() => (
      <MetaProvider>
        <BragReportPage year="2099" />
      </MetaProvider>
    ))

    expect(
      await screen.findByText(/No yearly brag document found for 2099/)
    ).toBeTruthy()
    expect(screen.getByText('back_to_brag_index.')).toBeTruthy()
  })
})
