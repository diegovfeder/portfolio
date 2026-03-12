// @vitest-environment jsdom

import { MetaProvider } from '@solidjs/meta'
import { fireEvent, render, screen } from '@solidjs/testing-library'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ChatRoute from '../../routes/chat'

describe('/chat route', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends a message, shows loading state, then renders assistant reply', async () => {
    let resolveRequest: ((value: Response) => void) | undefined

    const pendingResponse = new Promise<Response>((resolve) => {
      resolveRequest = resolve
    })

    vi.spyOn(globalThis, 'fetch').mockReturnValue(pendingResponse)

    render(() => (
      <MetaProvider>
        <ChatRoute />
      </MetaProvider>
    ))

    const textarea = screen.getByLabelText('Your message')
    await fireEvent.input(textarea, { target: { value: 'Tell me about SEO.' } })
    await fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })

    expect(await screen.findByText('Tell me about SEO.')).toBeTruthy()

    const pendingButton = screen.getByRole('button', { name: 'thinking...' })
    expect(pendingButton).toHaveProperty('disabled', true)

    resolveRequest?.(
      new Response(JSON.stringify({ reply: 'I improved local SEO visibility.' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    )

    expect(
      await screen.findByText('I improved local SEO visibility.')
    ).toBeTruthy()

    const sendButton = screen.getByRole('button', { name: 'send.' })
    expect(sendButton).toHaveProperty('disabled', true)

    await fireEvent.input(textarea, {
      target: { value: 'What about Next.js projects?' },
    })
    expect(sendButton).toHaveProperty('disabled', false)
  })

  it('does not send when pressing Shift+Enter', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ reply: 'ok' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    )

    render(() => (
      <MetaProvider>
        <ChatRoute />
      </MetaProvider>
    ))

    const textarea = screen.getByLabelText('Your message')
    await fireEvent.input(textarea, { target: { value: 'line one' } })
    await fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })

    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
