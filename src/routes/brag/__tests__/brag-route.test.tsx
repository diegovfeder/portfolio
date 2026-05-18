// @vitest-environment jsdom

import { MetaProvider } from '@solidjs/meta'
import { render, screen } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@solidjs/router', async () => {
  const actual = await vi.importActual<typeof import('@solidjs/router')>(
    '@solidjs/router'
  )

  return {
    ...actual,
    A: (props: { href: string; children: unknown }) => (
      <a href={props.href}>{props.children}</a>
    ),
    useLocation: () => ({ pathname: '/brag' }),
  }
})

import BragRoute from '~/routes/brag'

describe('/brag landing route', () => {
  it('renders the new brag landing sections and sub-nav', async () => {
    render(() => (
      <MetaProvider>
        <BragRoute />
      </MetaProvider>
    ))

    // Brand voice page title — `brag_document` followed by the `.` accent
    expect(
      await screen.findByRole('heading', { level: 1, name: /^brag_document/ })
    ).toBeTruthy()

    // Sub-nav pills
    expect(
      screen.getByRole('link', { name: 'brag.' }).getAttribute('href')
    ).toBe('/brag')
    expect(
      screen.getByRole('link', { name: 'profile.' }).getAttribute('href')
    ).toBe('/brag/profile')
    expect(
      screen.getByRole('link', { name: 'toolkit.' }).getAttribute('href')
    ).toBe('/brag/toolkit')

    // Year pills
    expect(
      screen.getByRole('link', { name: "2026." }).getAttribute('href')
    ).toBe('/brag/2026')
    expect(
      screen.getByRole('link', { name: "2025." }).getAttribute('href')
    ).toBe('/brag/2025')

    // Section headings
    expect(
      await screen.findByRole('heading', { name: 'recent_evidence' })
    ).toBeTruthy()
    expect(
      await screen.findByRole('heading', { name: 'yearly_documents' })
    ).toBeTruthy()
    expect(
      await screen.findByRole('heading', { name: 'explore_more' })
    ).toBeTruthy()

    // Year cards on the landing carry the `year = 'YYYY'` meta string
    expect(screen.getAllByText(/year = '2026'/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/year = '2025'/).length).toBeGreaterThan(0)
  })
})
