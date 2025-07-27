import { useNavigate } from '@solidjs/router'
import { createSignal, onMount, Show } from 'solid-js'

import { TerminalError, TerminalWindow } from '~/components'

export default function NotFound() {
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = createSignal(false)

  onMount(() => {
    setIsMounted(true)
  })

  return (
    <div class="flex min-h-screen px-4 py-16 ml-[48px] sm:ml-[64px] lg:ml-[120px]">
      <Show when={isMounted()}>
        <TerminalWindow
          title="404.sh"
          onClose={() => navigate('/')}
          defaultHeight="400px"
          positionStrategy={{ type: 'viewport-centered', offset: { y: 0 } }}
        >
          <TerminalError
            error={new Error('Page not found: Directory or file does not exist')}
          />
        </TerminalWindow>
      </Show>
    </div>
  )
}
