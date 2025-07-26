import { Component, createSignal, Show, For } from 'solid-js'
import { useNavigate } from '@solidjs/router'

interface TerminalErrorProps {
  error: Error
}

const TerminalError: Component<TerminalErrorProps> = (props) => {
  const [command, setCommand] = createSignal('cd ..')
  const [history, setHistory] = createSignal<string[]>([])
  const [isExecuting, setIsExecuting] = createSignal(false)
  const navigate = useNavigate()

  const handleCommand = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsExecuting(true)

      setHistory((prev) => [...prev, `➜ ${command()}`])

      switch (command().trim().toLowerCase()) {
        case 'cd ..':
          setHistory((prev) => [...prev, 'Navigating to blog index...'])
          setTimeout(() => navigate('/blog'), 1000)
          break
        case 'clear':
          setHistory([])
          setIsExecuting(false)
          break
        case 'help':
          setHistory((prev) => [
            ...prev,
            'Available commands:',
            '  cd ..     Navigate to blog index',
            '  clear     Clear terminal',
            '  help      Show this help message',
          ])
          setIsExecuting(false)
          break
        default:
          setHistory((prev) => [...prev, `command not found: ${command()}`])
          setIsExecuting(false)
      }
      setCommand('')
    }
  }

  return (
    <div class="max-w-2xl text-start p-6 font-mono">
      <div class="mb-4 text-red-500">Error: {props.error.message}</div>

      {/* Command History */}
      <div class="mb-4 text-gray-400">
        <For each={history()}>
          {(line) => <div class="pb-4">{line}</div>}
        </For>
      </div>

      {/* Command Input with Blinking Cursor */}
      <Show when={!isExecuting()}>
        <div class="flex items-center text-green-500">
          <span class="mr-2">➜</span>
          <div class="flex-1 relative">
            <input
              type="text"
              value={command()}
              onInput={(e) => setCommand(e.currentTarget.value)}
              onKeyDown={handleCommand}
              class="w-full bg-transparent border-none outline-none text-green-500 font-mono"
              placeholder="Type 'help' for available commands"
              autofocus
            />
            <div class="absolute top-0 left-0 pointer-events-none text-green-500">
              <span class="invisible">{command()}</span>
            </div>
          </div>
        </div>

        {/* Hint - Only show when not executing and history is empty */}
        <Show when={history().length === 0}>
          <div class="mt-4 text-sm opacity-50 text-gray-400">
            Hint: Type 'cd ..' and press Enter to navigate back
          </div>
        </Show>
      </Show>
    </div>
  )
}

export default TerminalError
