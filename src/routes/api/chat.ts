import type { APIEvent } from '@solidjs/start/server'

import { buildChatSystemPrompt } from '~/data/ai/persona'

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  role: ChatRole
  content: string
}

interface DeepSeekChoice {
  message?: {
    content?: string
  }
}

interface DeepSeekChatCompletionResponse {
  choices?: DeepSeekChoice[]
}

interface ValidationSuccess {
  messages: ChatMessage[]
}

interface ValidationFailure {
  error: string
}

interface DeepSeekResultSuccess {
  reply: string
}

interface DeepSeekResultFailure {
  error: string
}

const MAX_MESSAGES = 6
const MAX_MESSAGE_CHARS = 1200
const MAX_REQUEST_BYTES = 12_000
const REQUEST_TIMEOUT_MS = 15000
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60_000
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 5
const DEFAULT_DEEPSEEK_MODEL = 'deepseek-chat'
const DEFAULT_DEEPSEEK_BASE_URL = 'https://api.deepseek.com'

interface RateLimitBucket {
  count: number
  resetAt: number
}

interface RequestGuardSuccess {
  ok: true
}

interface RequestGuardFailure {
  ok: false
  response: Response
}

const rateLimitBuckets = new Map<string, RateLimitBucket>()

const jsonResponse = (
  data: unknown,
  status = 200,
  headers: Record<string, string> = {}
) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
  })

const getEnv = (name: string, fallback = '') => {
  const processValue = (
    globalThis as {
      process?: {
        env?: Record<string, string | undefined>
      }
    }
  ).process?.env?.[name]
  const importMetaEnv = (
    import.meta as ImportMeta & {
      env?: Record<string, string | undefined>
    }
  ).env

  return processValue || importMetaEnv?.[name] || fallback
}

const isObjectRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object'

const parsePositiveInt = (value: string, fallback: number) => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const normalizeOrigin = (value: string) => {
  const normalized = value.trim().replace(/\/+$/, '')

  if (!normalized) {
    return ''
  }

  try {
    return new URL(normalized).origin
  } catch {
    return ''
  }
}

const getAllowedOrigins = (request: Request) => {
  const requestOrigin = normalizeOrigin(new URL(request.url).origin)
  const configuredOrigins = getEnv('CHAT_ALLOWED_ORIGINS')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean)
  const vercelUrl = getEnv('VERCEL_URL')
  const vercelOrigin = vercelUrl
    ? normalizeOrigin(
        vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`
      )
    : ''

  return new Set(
    [requestOrigin, vercelOrigin, ...configuredOrigins].filter(Boolean)
  )
}

const isProduction = () => getEnv('NODE_ENV') === 'production'

export const isAllowedChatOrigin = (request: Request) => {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const candidate = normalizeOrigin(origin || referer || '')

  if (!candidate) {
    return !isProduction() || getEnv('CHAT_ALLOW_MISSING_ORIGIN') === 'true'
  }

  return getAllowedOrigins(request).has(candidate)
}

export const getClientRateLimitKey = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const forwardedIp = forwardedFor?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const cloudflareIp = request.headers.get('cf-connecting-ip')?.trim()

  return cloudflareIp || forwardedIp || realIp || 'unknown-client'
}

export const checkChatRateLimit = (
  key: string,
  now = Date.now()
): { allowed: true } | { allowed: false; retryAfterSeconds: number } => {
  const windowMs = parsePositiveInt(
    getEnv('CHAT_RATE_LIMIT_WINDOW_MS'),
    DEFAULT_RATE_LIMIT_WINDOW_MS
  )
  const maxRequests = parsePositiveInt(
    getEnv('CHAT_RATE_LIMIT_MAX_REQUESTS'),
    DEFAULT_RATE_LIMIT_MAX_REQUESTS
  )
  const bucket = rateLimitBuckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { allowed: true }
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    }
  }

  bucket.count += 1
  return { allowed: true }
}

export const resetChatRateLimitForTests = () => {
  rateLimitBuckets.clear()
}

export const guardChatRequest = (
  request: Request
): RequestGuardSuccess | RequestGuardFailure => {
  const contentType = request.headers.get('content-type') || ''
  const contentLength = request.headers.get('content-length')

  if (!contentType.toLowerCase().includes('application/json')) {
    return {
      ok: false,
      response: jsonResponse({ error: 'Request body must be JSON.' }, 415),
    }
  }

  if (contentLength && Number(contentLength) > MAX_REQUEST_BYTES) {
    return {
      ok: false,
      response: jsonResponse({ error: 'Request body is too large.' }, 413),
    }
  }

  if (!isAllowedChatOrigin(request)) {
    return {
      ok: false,
      response: jsonResponse({ error: 'Request origin is not allowed.' }, 403),
    }
  }

  const rateLimit = checkChatRateLimit(getClientRateLimitKey(request))

  if (!rateLimit.allowed) {
    return {
      ok: false,
      response: jsonResponse(
        { error: 'Too many chat requests. Please try again shortly.' },
        429,
        { 'retry-after': `${rateLimit.retryAfterSeconds}` }
      ),
    }
  }

  return { ok: true }
}

export const validateChatPayload = (
  payload: unknown
): ValidationSuccess | ValidationFailure => {
  if (!isObjectRecord(payload)) {
    return { error: 'Request body must be a JSON object.' }
  }

  const rawMessages = payload.messages

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { error: 'Request must include at least one message.' }
  }

  const normalizedMessages: ChatMessage[] = []

  for (const rawMessage of rawMessages) {
    if (!isObjectRecord(rawMessage)) {
      return { error: 'Each message must be an object with role and content.' }
    }

    const role = rawMessage.role
    const content = rawMessage.content

    if (role !== 'user' && role !== 'assistant') {
      return { error: 'Message role must be either "user" or "assistant".' }
    }

    if (typeof content !== 'string') {
      return { error: 'Message content must be a string.' }
    }

    const trimmed = content.trim()

    if (!trimmed) {
      return { error: 'Message content cannot be empty.' }
    }

    if (trimmed.length > MAX_MESSAGE_CHARS) {
      return {
        error: `Each message must be at most ${MAX_MESSAGE_CHARS} characters.`,
      }
    }

    normalizedMessages.push({
      role,
      content: trimmed,
    })
  }

  if (normalizedMessages.length === 0) {
    return { error: 'Request must include at least one valid message.' }
  }

  return {
    messages: normalizedMessages.slice(-MAX_MESSAGES),
  }
}

export const requestDeepSeekReply = async ({
  apiKey,
  baseUrl = DEFAULT_DEEPSEEK_BASE_URL,
  model = DEFAULT_DEEPSEEK_MODEL,
  messages,
  timeoutMs = REQUEST_TIMEOUT_MS,
  fetchImpl = fetch,
}: {
  apiKey: string
  baseUrl?: string
  model?: string
  messages: ChatMessage[]
  timeoutMs?: number
  fetchImpl?: typeof fetch
}): Promise<DeepSeekResultSuccess | DeepSeekResultFailure> => {
  const controller = new globalThis.AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  const sanitizedBaseUrl = baseUrl.replace(/\/+$/, '')

  try {
    const response = await fetchImpl(`${sanitizedBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 350,
        messages: [
          {
            role: 'system',
            content: buildChatSystemPrompt(),
          },
          ...messages,
        ],
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      return {
        error: 'Chat provider request failed. Please try again in a moment.',
      }
    }

    const payload =
      (await response.json()) as DeepSeekChatCompletionResponse | null
    const reply = payload?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return { error: 'Chat provider returned an empty response.' }
    }

    return { reply }
  } catch (error) {
    const isAbortError =
      error instanceof Error && (error.name === 'AbortError' || error.message === 'The operation was aborted.')

    if (isAbortError) {
      return { error: 'The chat provider timed out. Please try again.' }
    }

    return {
      error: 'Chat provider request failed. Please try again in a moment.',
    }
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(event: APIEvent) {
  let payload: unknown
  const guardResult = guardChatRequest(event.request)

  if (!guardResult.ok) {
    return guardResult.response
  }

  try {
    payload = await event.request.json()
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON.' }, 400)
  }

  const validation = validateChatPayload(payload)

  if ('error' in validation) {
    return jsonResponse({ error: validation.error }, 400)
  }

  const apiKey = getEnv('DEEPSEEK_API_KEY')

  if (!apiKey) {
    return jsonResponse(
      { error: 'Server is missing DEEPSEEK_API_KEY configuration.' },
      502
    )
  }

  const model = getEnv('DEEPSEEK_MODEL', DEFAULT_DEEPSEEK_MODEL)
  const baseUrl = getEnv('DEEPSEEK_BASE_URL', DEFAULT_DEEPSEEK_BASE_URL)

  const deepSeekResult = await requestDeepSeekReply({
    apiKey,
    model,
    baseUrl,
    messages: validation.messages,
  })

  if ('error' in deepSeekResult) {
    return jsonResponse({ error: deepSeekResult.error }, 502)
  }

  return jsonResponse({ reply: deepSeekResult.reply })
}

export type { ChatMessage, ChatRole }
