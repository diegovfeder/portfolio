import { Meta, Title } from '@solidjs/meta'
import { For, Show, createSignal } from 'solid-js'

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
  let inputRef: { value: string } | undefined

  const canSend = () => !isSending() && draft().trim().length > 0

  const syncDraft = (value: string) => {
    setDraft(value)
  }

  const clearDraft = () => {
    setDraft('')

    if (inputRef) {
      inputRef.value = ''
    }
  }

  const sendMessage = async (rawDraft = inputRef?.value ?? draft()) => {
    const normalizedDraft = rawDraft.trim()

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
    clearDraft()
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

      <div class="relative min-h-[100dvh]">
        <div class="mx-auto flex min-h-[100dvh] max-w-4xl flex-col px-3 py-4 sm:px-4 sm:py-8 md:py-16">
          <header class="shrink-0 border-b border-gray-200 pb-3 dark:border-gray-700 sm:pb-4">
            <h1 class="font-mono text-3xl font-bold sm:text-4xl">
              chat_with_me
              <span class="text-blue-600 dark:text-blue-400">.</span>
            </h1>
            <p class="mt-2 font-mono text-sm text-gray-600 dark:text-gray-300">
              We can talk about blog posts, projects, engineering exp, anything
              really...
            </p>
          </header>

          <section class="mt-4 flex min-h-0 flex-1 flex-col rounded-xl border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-black sm:mt-6">
            <div class="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
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
              class="shrink-0 border-t border-gray-200 p-3 dark:border-gray-700 sm:p-4"
              onSubmit={(event) => {
                event.preventDefault()
                void sendMessage()
              }}
            >
              <label for="chat-input" class="sr-only">
                Your message
              </label>
              <textarea
                ref={(element) => {
                  inputRef = element
                }}
                id="chat-input"
                value={draft()}
                rows={3}
                onInput={(event) => syncDraft(event.currentTarget.value)}
                onChange={(event) => syncDraft(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey &&
                    !event.isComposing
                  ) {
                    event.preventDefault()
                    const currentDraft = event.currentTarget.value
                    syncDraft(currentDraft)
                    void sendMessage(currentDraft)
                  }
                }}
                class="block h-20 max-h-36 min-h-20 w-full resize-none rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm leading-6 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 dark:border-gray-600 dark:bg-black dark:text-gray-100 dark:placeholder:text-gray-500 sm:h-28 sm:min-h-28 md:text-base"
                placeholder="Type a question..."
              />

              <div class="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p class="font-mono text-xs text-gray-500 dark:text-gray-400">
                  Enter to send. Shift+Enter for newline.
                </p>
                <button
                  type="submit"
                  disabled={!canSend()}
                  class="rounded-full border-2 border-gray-900 px-4 py-2 font-mono text-sm transition-all duration-300 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white sm:self-auto"
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
