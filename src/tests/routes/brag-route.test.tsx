// @vitest-environment jsdom

import { render, screen } from '@solidjs/testing-library'
import { MetaProvider } from '@solidjs/meta'
import { describe, expect, it } from 'vitest'

import BragRoute from '../../routes/brag'

describe('/brag route', () => {
  it('renders a simple static route', async () => {
    render(() => (
      <MetaProvider>
        <BragRoute />
      </MetaProvider>
    ))

    expect(await screen.findByText('brag_document')).toBeTruthy()
    expect(await screen.findByRole('heading', { name: 'timeline' })).toBeTruthy()
    expect(await screen.findByRole('heading', { name: 'retros' })).toBeTruthy()
    expect(await screen.findByRole('heading', { name: 'ai prompts' })).toBeTruthy()
    expect(await screen.findByRole('heading', { name: 'exports' })).toBeTruthy()
  })
})
