import type { APIEvent } from '@solidjs/start/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { POST, validateChatPayload } from '../../routes/api/chat'

const processEnv = (
  globalThis as {
    process?: {
      env?: Record<string, string | undefined>
    }
  }
).process?.env

const createApiEvent = (body: unknown): APIEvent =>
  ({
    request: new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }),
  }) as APIEvent

describe('/api/chat validation', () => {
  it('rejects empty payloads', () => {
    const result = validateChatPayload({})
    expect('error' in result).toBe(true)
  })

  it('rejects too-long messages', () => {
    const result = validateChatPayload({
      messages: [{ role: 'user', content: 'a'.repeat(1201) }],
    })

    expect(result).toEqual({
      error: 'Each message must be at most 1200 characters.',
    })
  })

  it('rejects invalid role values', () => {
    const result = validateChatPayload({
      messages: [{ role: 'system', content: 'hello' }],
    })

    expect(result).toEqual({
      error: 'Message role must be either "user" or "assistant".',
    })
  })

  it('accepts valid conversation and normalizes whitespace', () => {
    const result = validateChatPayload({
      messages: [{ role: 'user', content: '   Hello from Diego   ' }],
    })

    expect(result).toEqual({
      messages: [{ role: 'user', content: 'Hello from Diego' }],
    })
  })
})

describe('POST /api/chat provider integration', () => {
  beforeEach(() => {
    if (processEnv) {
      processEnv.DEEPSEEK_API_KEY = 'test-key'
      delete processEnv.DEEPSEEK_MODEL
      delete processEnv.DEEPSEEK_BASE_URL
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
    if (processEnv) {
      delete processEnv.DEEPSEEK_API_KEY
      delete processEnv.DEEPSEEK_MODEL
      delete processEnv.DEEPSEEK_BASE_URL
    }
  })

  it('returns provider reply on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: 'I can help with that.' } }],
        }),
        {
          status: 200,
          headers: { 'content-type': 'application/json' },
        }
      )
    )

    const response = await POST(
      createApiEvent({
        messages: [{ role: 'user', content: 'Tell me about your projects' }],
      })
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      reply: 'I can help with that.',
    })
  })

  it('returns clear configuration error when API key is missing', async () => {
    if (processEnv) {
      delete processEnv.DEEPSEEK_API_KEY
    }

    const response = await POST(
      createApiEvent({
        messages: [{ role: 'user', content: 'hello' }],
      })
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      error: 'Server is missing DEEPSEEK_API_KEY configuration.',
    })
  })

  it('maps non-2xx provider responses to 502', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('upstream failed', { status: 500 })
    )

    const response = await POST(
      createApiEvent({
        messages: [{ role: 'user', content: 'Any update?' }],
      })
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      error: 'Chat provider request failed. Please try again in a moment.',
    })
  })

  it('maps provider timeout to 502 with stable error', async () => {
    const timeoutError = new Error('The operation was aborted.')
    timeoutError.name = 'AbortError'

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(timeoutError)

    const response = await POST(
      createApiEvent({
        messages: [{ role: 'user', content: 'Tell me about SEO work' }],
      })
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      error: 'The chat provider timed out. Please try again.',
    })
  })
})
