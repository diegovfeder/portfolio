import { useNavigate } from '@solidjs/router'

import { TerminalError, TerminalWindow } from '~/components'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div class="flex min-h-screen">
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
    </div>
  )
}
