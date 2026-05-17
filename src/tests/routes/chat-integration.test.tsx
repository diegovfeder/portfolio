// @vitest-environment jsdom

import { MetaProvider } from '@solidjs/meta'
import { fireEvent, render, screen } from '@solidjs/testing-library'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ChatRoute from '../../routes/chat'

describe('/chat integration flow', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('completes full conversation flow with multiple messages', async () => {
    const responses = [
      'I work on full-stack projects at Tarmac.io',
      'Yes, I have experience with React and Next.js',
    ]
    let responseIndex = 0

    vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      const reply = responses[responseIndex++] || 'Default response'
      return Promise.resolve(
        new Response(JSON.stringify({ reply }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      )
    })

    render(() => (
      <MetaProvider>
        <ChatRoute />
      </MetaProvider>
    ))

    const textarea = screen.getByLabelText('Your message')
    const sendButton = screen.getByRole('button', { name: 'send.' })

    // First message
    await fireEvent.input(textarea, { target: { value: 'Tell me about your work' } })
    expect(sendButton).toHaveProperty('disabled', false)
    await fireEvent.click(sendButton)

    expect(await screen.findByText('Tell me about your work')).toBeTruthy()
    expect(await screen.findByText('I work on full-stack projects at Tarmac.io')).toBeTruthy()

    // Second message
    await fireEvent.input(textarea, { target: { value: 'Do you know React?' } })
    await fireEvent.click(sendButton)

    expect(await screen.findByText('Do you know React?')).toBeTruthy()
    expect(await screen.findByText('Yes, I have experience with React and Next.js')).toBeTruthy()

    // Verify all messages visible
    expect(screen.getByText('Tell me about your work')).toBeTruthy()
    expect(screen.getByText('I work on full-stack projects at Tarmac.io')).toBeTruthy()
    expect(screen.getByText('Do you know React?')).toBeTruthy()
    expect(screen.getByText('Yes, I have experience with React and Next.js')).toBeTruthy()
  })
})
