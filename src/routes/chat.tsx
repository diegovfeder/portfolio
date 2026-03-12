import { Meta, Title } from '@solidjs/meta'
import { For, Show, createMemo, createSignal } from 'solid-js'

interface ChatUiMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatApiSuccess {
  reply: string
}

interface ChatApiError {
  error: string
}

let messageSequence = 0

const nextMessageId = () => {
  messageSequence += 1
  return `chat-msg-${messageSequence}`
}

const ChatRoute = () => {
  const [messages, setMessages] = createSignal<ChatUiMessage[]>([])
  const [draft, setDraft] = createSignal('')
  const [isSending, setIsSending] = createSignal(false)
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null)

  const canSend = createMemo(() => {
    return !isSending() && draft().trim().length > 0
  })

  const sendMessage = async () => {
    const normalizedDraft = draft().trim()

    if (!normalizedDraft || isSending()) {
      return
    }

    const userMessage: ChatUiMessage = {
      id: nextMessageId(),
      role: 'user',
      content: normalizedDraft,
    }

    const nextHistory = [...messages(), userMessage]

    setMessages(nextHistory)
    setDraft('')
    setErrorMessage(null)
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextHistory.map(({ role, content }) => ({ role, content })),
        }),
      })

      const body = (await response.json()) as ChatApiSuccess | ChatApiError

      if (!response.ok) {
        const error =
          'error' in body && typeof body.error === 'string'
            ? body.error
            : 'Unable to get a response right now.'
        throw new Error(error)
      }

      if (!('reply' in body) || typeof body.reply !== 'string') {
        throw new Error('Invalid response from chat endpoint.')
      }

      setMessages((current) => [
        ...current,
        {
          id: nextMessageId(),
          role: 'assistant',
          content: body.reply,
        },
      ])
    } catch (error) {
      const fallback = 'Unable to get a response right now.'
      setErrorMessage(error instanceof Error ? error.message : fallback)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <Title>chat_with_diego.</Title>
      <Meta
        name="description"
        content="Chat with Diego's portfolio assistant. Answers are strictly grounded in portfolio and blog content."
      />

      <div class="relative min-h-screen">
        <div class="max-w-4xl mx-auto px-4 py-16">
          <header class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h1 class="text-4xl font-mono font-bold">
              chat_with_diego
              <span class="text-blue-600 dark:text-blue-400">.</span>
            </h1>
            <p class="mt-2 font-mono text-sm text-gray-600 dark:text-gray-300">
              Ask me about my projects, blog posts, and engineering experience.
            </p>
          </header>

          <section class="mt-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
            <div class="h-[52vh] min-h-[320px] overflow-y-auto p-4 space-y-3">
              <Show
                when={messages().length > 0}
                fallback={
                  <p class="font-mono text-sm text-gray-500 dark:text-gray-400">
                    No messages yet. Start the conversation.
                  </p>
                }
              >
                <For each={messages()}>
                  {(message) => (
                    <div
                      class="flex"
                      classList={{
                        'justify-end': message.role === 'user',
                        'justify-start': message.role === 'assistant',
                      }}
                    >
                      <article
                        class="max-w-[85%] rounded-lg border px-4 py-3"
                        classList={{
                          'border-blue-200 bg-blue-50 text-gray-900 dark:border-blue-700 dark:bg-blue-950/40 dark:text-gray-100':
                            message.role === 'user',
                          'border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100':
                            message.role === 'assistant',
                        }}
                      >
                        <p class="mb-2 text-xs uppercase tracking-wide font-mono text-gray-500 dark:text-gray-400">
                          {message.role === 'user' ? 'you' : 'diego'}
                        </p>
                        <p class="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                          {message.content}
                        </p>
                      </article>
                    </div>
                  )}
                </For>
              </Show>
            </div>

            <form
              class="border-t border-gray-200 dark:border-gray-700 p-4"
              onSubmit={(event) => {
                event.preventDefault()
                void sendMessage()
              }}
            >
              <label for="chat-input" class="sr-only">
                Your message
              </label>
              <textarea
                id="chat-input"
                value={draft()}
                onInput={(event) => setDraft(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    void sendMessage()
                  }
                }}
                class="w-full min-h-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black p-3 font-mono text-sm md:text-base focus-ring"
                placeholder="Type a question..."
              />

              <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p class="font-mono text-xs text-gray-500 dark:text-gray-400">
                  Enter to send. Shift+Enter for newline.
                </p>
                <button
                  type="submit"
                  disabled={!canSend()}
                  class="rounded-full border-2 border-gray-900 dark:border-white px-4 py-2 font-mono text-sm transition-all duration-300 enabled:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending() ? 'thinking...' : 'send.'}
                </button>
              </div>

              <Show when={errorMessage()}>
                <p class="mt-3 font-mono text-sm text-red-600 dark:text-red-400">
                  {errorMessage()}
                </p>
              </Show>
            </form>
          </section>
        </div>
      </div>
    </>
  )
}

export default ChatRoute
