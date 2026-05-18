import type { APIEvent } from '@solidjs/start/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  POST,
  guardChatRequest,
  resetChatRateLimitForTests,
  validateChatPayload,
} from '../../routes/api/chat'
import {
  checkChatRateLimit,
  getChatRateLimitBucketCountForTests,
  getClientRateLimitKey,
  RATE_LIMIT_BUCKET_CAP,
} from '../../utils/chat-api'

const processEnv = (
  globalThis as {
    process?: {
      env?: Record<string, string | undefined>
    }
  }
).process?.env

const createApiEvent = (
  body: unknown,
  headers: Record<string, string> = {},
): APIEvent =>
  ({
    request: new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
    }),
  }) as APIEvent

const originalNodeEnv = processEnv?.NODE_ENV

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
    resetChatRateLimitForTests()

    if (processEnv) {
      processEnv.DEEPSEEK_API_KEY = 'test-key'
      delete processEnv.DEEPSEEK_MODEL
      delete processEnv.DEEPSEEK_BASE_URL
      processEnv.NODE_ENV = originalNodeEnv
      delete processEnv.CHAT_ALLOWED_ORIGINS
      delete processEnv.CHAT_ALLOW_MISSING_ORIGIN
      delete processEnv.CHAT_RATE_LIMIT_MAX_REQUESTS
      delete processEnv.CHAT_RATE_LIMIT_WINDOW_MS
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
    resetChatRateLimitForTests()

    if (processEnv) {
      delete processEnv.DEEPSEEK_API_KEY
      delete processEnv.DEEPSEEK_MODEL
      delete processEnv.DEEPSEEK_BASE_URL
      delete processEnv.CHAT_ALLOWED_ORIGINS
      delete processEnv.CHAT_ALLOW_MISSING_ORIGIN
      delete processEnv.CHAT_RATE_LIMIT_MAX_REQUESTS
      delete processEnv.CHAT_RATE_LIMIT_WINDOW_MS

      if (originalNodeEnv) {
        processEnv.NODE_ENV = originalNodeEnv
      } else {
        delete processEnv.NODE_ENV
      }
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
        },
      ),
    )

    const response = await POST(
      createApiEvent({
        messages: [{ role: 'user', content: 'Tell me about your projects' }],
      }),
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
      }),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      error: 'Server is missing DEEPSEEK_API_KEY configuration.',
    })
  })

  it('maps non-2xx provider responses to 502', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('upstream failed', { status: 500 }),
    )

    const response = await POST(
      createApiEvent({
        messages: [{ role: 'user', content: 'Any update?' }],
      }),
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
      }),
    )

    expect(response.status).toBe(502)
    await expect(response.json()).resolves.toEqual({
      error: 'The chat provider timed out. Please try again.',
    })
  })

  it('rejects cross-origin production requests before provider calls', async () => {
    if (processEnv) {
      processEnv.NODE_ENV = 'production'
      processEnv.CHAT_ALLOWED_ORIGINS = 'https://www.diegovfeder.com'
    }

    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const response = await POST(
      createApiEvent(
        { messages: [{ role: 'user', content: 'hello' }] },
        { origin: 'https://attacker.example' },
      ),
    )

    expect(response.status).toBe(403)
    expect(fetchSpy).not.toHaveBeenCalled()
    await expect(response.json()).resolves.toEqual({
      error: 'Request origin is not allowed.',
    })
  })

  it('allows configured production origins', () => {
    if (processEnv) {
      processEnv.NODE_ENV = 'production'
      processEnv.CHAT_ALLOWED_ORIGINS = 'https://www.diegovfeder.com'
    }

    const request = new Request('https://www.diegovfeder.com/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://www.diegovfeder.com',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
      }),
    })

    expect(guardChatRequest(request)).toEqual({ ok: true })
  })

  it('rejects missing production origins by default', async () => {
    if (processEnv) {
      processEnv.NODE_ENV = 'production'
    }

    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const response = await POST(
      createApiEvent({ messages: [{ role: 'user', content: 'hello' }] }),
    )

    expect(response.status).toBe(403)
    expect(fetchSpy).not.toHaveBeenCalled()
    await expect(response.json()).resolves.toEqual({
      error: 'Request origin is not allowed.',
    })
  })

  it('rate limits repeated requests before provider calls', async () => {
    if (processEnv) {
      processEnv.CHAT_RATE_LIMIT_MAX_REQUESTS = '1'
      processEnv.CHAT_RATE_LIMIT_WINDOW_MS = '60000'
    }

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: 'ok' } }],
        }),
        {
          status: 200,
          headers: { 'content-type': 'application/json' },
        },
      ),
    )

    const firstResponse = await POST(
      createApiEvent(
        { messages: [{ role: 'user', content: 'first' }] },
        { 'x-forwarded-for': '203.0.113.9' },
      ),
    )
    const secondResponse = await POST(
      createApiEvent(
        { messages: [{ role: 'user', content: 'second' }] },
        { 'x-forwarded-for': '203.0.113.9' },
      ),
    )

    expect(firstResponse.status).toBe(200)
    expect(secondResponse.status).toBe(429)
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(secondResponse.headers.get('retry-after')).toBe('60')
    await expect(secondResponse.json()).resolves.toEqual({
      error: 'Too many chat requests. Please try again shortly.',
    })
  })

  it('rejects non-JSON and oversized requests before provider calls', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const nonJsonRequest = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: 'hello',
    })
    const oversizedRequest = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': '12001',
      },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
    })

    const nonJsonResponse = await POST({ request: nonJsonRequest } as APIEvent)
    const oversizedResponse = await POST({
      request: oversizedRequest,
    } as APIEvent)

    expect(nonJsonResponse.status).toBe(415)
    expect(oversizedResponse.status).toBe(413)
    expect(fetchSpy).not.toHaveBeenCalled()
    await expect(nonJsonResponse.json()).resolves.toEqual({
      error: 'Request body must be JSON.',
    })
    await expect(oversizedResponse.json()).resolves.toEqual({
      error: 'Request body is too large.',
    })
  })

  it('rejects oversized requests when content-length is missing', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const oversizedRequest = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
        padding: 'x'.repeat(12_000),
      }),
    })

    const response = await POST({ request: oversizedRequest } as APIEvent)

    expect(response.status).toBe(413)
    expect(fetchSpy).not.toHaveBeenCalled()
    await expect(response.json()).resolves.toEqual({
      error: 'Request body is too large.',
    })
  })

  it('uses a scoped fallback rate-limit key when IP headers are absent', () => {
    const request = new Request('https://www.diegovfeder.com/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'https://www.diegovfeder.com',
        'user-agent': 'vitest-agent',
      },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
    })

    expect(getClientRateLimitKey(request)).toBe(
      'missing-ip:https://www.diegovfeder.com:vitest-agent',
    )
  })

  it('evicts rate-limit buckets instead of growing without bound', () => {
    for (let index = 0; index < RATE_LIMIT_BUCKET_CAP + 25; index += 1) {
      checkChatRateLimit(`client-${index}`, 1_000 + index)
    }

    expect(getChatRateLimitBucketCountForTests()).toBeLessThanOrEqual(
      RATE_LIMIT_BUCKET_CAP,
    )
  })
})
