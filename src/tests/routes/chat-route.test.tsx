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

  it('sends with Enter using the current textarea value', async () => {
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

    const textarea = screen.getByLabelText('Your message') as {
      value: string
    }
    textarea.value = 'Send this from the DOM value'

    await fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })

    expect(await screen.findByText('Send this from the DOM value')).toBeTruthy()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('disables send button when draft is empty or whitespace-only', async () => {
    render(() => (
      <MetaProvider>
        <ChatRoute />
      </MetaProvider>
    ))

    const sendButton = screen.getByRole('button', { name: 'send.' })
    expect(sendButton).toHaveProperty('disabled', true)

    const textarea = screen.getByLabelText('Your message')

    // Test whitespace-only
    await fireEvent.input(textarea, { target: { value: '   ' } })
    expect(sendButton).toHaveProperty('disabled', true)

    // Test valid input
    await fireEvent.input(textarea, { target: { value: 'Hello' } })
    expect(sendButton).toHaveProperty('disabled', false)

    // Test empty again
    await fireEvent.input(textarea, { target: { value: '' } })
    expect(sendButton).toHaveProperty('disabled', true)
  })

  it('does not send message when draft is empty', async () => {
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

    const sendButton = screen.getByRole('button', { name: 'send.' })

    expect(sendButton).toHaveProperty('disabled', true)
    expect(fetchSpy).not.toHaveBeenCalled()

    // Even if clicked, should not send
    await fireEvent.click(sendButton)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('displays error message and allows retry after API failure', async () => {
    let callCount = 0

    vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      callCount++
      if (callCount === 1) {
        return Promise.resolve(
          new Response(JSON.stringify({ error: 'Server error' }), {
            status: 502,
            headers: { 'content-type': 'application/json' },
          })
        )
      }
      return Promise.resolve(
        new Response(JSON.stringify({ reply: 'Success!' }), {
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
    await fireEvent.input(textarea, { target: { value: 'Test message' } })

    const sendButton = screen.getByRole('button', { name: 'send.' })
    await fireEvent.click(sendButton)

    // Should show error
    expect(await screen.findByText(/Server error/i)).toBeTruthy()

    // User message should still be in history
    expect(await screen.findByText('Test message')).toBeTruthy()

    // Retry should work
    await fireEvent.input(textarea, { target: { value: 'Retry' } })
    await fireEvent.click(sendButton)

    expect(await screen.findByText('Success!')).toBeTruthy()
    expect(screen.queryByText(/Server error/i)).toBeNull()
  })

  it('clears textarea after successful send', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ reply: 'Got it!' }), {
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
    await fireEvent.input(textarea, { target: { value: 'Hello' } })

    const sendButton = screen.getByRole('button', { name: 'send.' })
    await fireEvent.click(sendButton)

    // Wait for response
    await screen.findByText('Got it!')

    // Textarea should be empty
    expect((textarea as { value: string }).value).toBe('')

    expect(sendButton).toHaveProperty('disabled', true)
  })
})
