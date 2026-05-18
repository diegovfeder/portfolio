import type { APIEvent } from '@solidjs/start/server'

import {
  DEFAULT_DEEPSEEK_BASE_URL,
  DEFAULT_DEEPSEEK_MODEL,
  getEnv,
  guardChatRequest,
  jsonResponse,
  readChatJsonPayload,
  requestDeepSeekReply,
  validateChatPayload,
} from '~/utils/chat-api'

// Re-export the test surface so route API tests can import the stable helpers.
export {
  guardChatRequest,
  readChatJsonPayload,
  resetChatRateLimitForTests,
  validateChatPayload,
} from '~/utils/chat-api'
export type { ChatMessage, ChatRole } from '~/utils/chat-api'

export async function POST(event: APIEvent) {
  const guardResult = guardChatRequest(event.request)

  if (!guardResult.ok) {
    return guardResult.response
  }

  const payloadResult = await readChatJsonPayload(event.request)

  if (!payloadResult.ok) {
    return payloadResult.response
  }

  const validation = validateChatPayload(payloadResult.payload)

  if ('error' in validation) {
    return jsonResponse({ error: validation.error }, 400)
  }

  const apiKey = getEnv('DEEPSEEK_API_KEY')

  if (!apiKey) {
    return jsonResponse(
      { error: 'Server is missing DEEPSEEK_API_KEY configuration.' },
      502,
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
