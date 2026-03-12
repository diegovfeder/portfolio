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
const REQUEST_TIMEOUT_MS = 15000
const DEFAULT_DEEPSEEK_MODEL = 'deepseek-chat'
const DEFAULT_DEEPSEEK_BASE_URL = 'https://api.deepseek.com'

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
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
