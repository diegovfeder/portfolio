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
    A: (props: { href: string; children: unknown; class?: string }) => (
      <a href={props.href} class={props.class}>
        {props.children}
      </a>
    ),
  }
})

vi.mock('~/components/sections', () => ({
  HomeSection: () => <section>Home Section</section>,
  CasesSection: () => <section>Cases Section</section>,
  ProjectsSection: () => <section>Projects Section</section>,
  AboutSection: () => <section>About Section</section>,
  ContactSection: () => <section>Contact Section</section>,
}))

import Home from '~/routes/index'

describe('/ route', () => {
  it('renders the portfolio sections', () => {
    render(() => (
      <MetaProvider>
        <Home />
      </MetaProvider>
    ))

    expect(screen.getByText('Home Section')).toBeTruthy()
    expect(screen.getByText('Cases Section')).toBeTruthy()
    expect(screen.getByText('Projects Section')).toBeTruthy()
    expect(screen.getByText('About Section')).toBeTruthy()
    expect(screen.getByText('Contact Section')).toBeTruthy()
  })

  it('no longer renders the deprecated brag CTA pill on the homepage', () => {
    render(() => (
      <MetaProvider>
        <Home />
      </MetaProvider>
    ))

    expect(screen.queryByRole('link', { name: 'brag_document.' })).toBeNull()
  })
})
