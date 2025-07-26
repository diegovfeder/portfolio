import {
  Component,
  JSX,
  createSignal,
  onCleanup,
  onMount,
  Show,
  createEffect,
} from 'solid-js'

interface PositionStrategy {
  type: 'viewport-centered' | 'parent-relative' | 'bottom-centered'
  offset?: { x?: number; y?: number }
}

interface TerminalWindowProps {
  title?: string
  children: JSX.Element
  onClose: () => void
  defaultWidth?: string
  defaultHeight?: string
  positionStrategy?: PositionStrategy
}

const TerminalWindow: Component<TerminalWindowProps> = ({
  title,
  children,
  onClose,
  defaultWidth = '800px',
  defaultHeight = '120px',
  positionStrategy = { type: 'viewport-centered' },
}) => {
  // Calculate initial size based on viewport
  const calculateInitialSize = () => {
    if (typeof window === 'undefined')
      return { width: defaultWidth, height: defaultHeight }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // For mobile screens (< 640px)
    if (viewportWidth < 640) {
      return {
        width: `${Math.min(viewportWidth - 32, 400)}px`, // 16px padding on each side
        height: `${Math.min(viewportHeight * 0.6, 300)}px`,
      }
    }

    // For tablets (640px - 1024px)
    if (viewportWidth < 1024) {
      return {
        width: `${Math.min(viewportWidth * 0.8, 600)}px`,
        height: `${Math.min(viewportHeight * 0.7, 400)}px`,
      }
    }

    // For desktop, use default or constrain if viewport is smaller
    return {
      width: `${Math.min(parseFloat(defaultWidth), viewportWidth - 64)}px`,
      height: `${Math.min(parseFloat(defaultHeight), viewportHeight - 100)}px`,
    }
  }

  const calculateInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const windowWidth = parseFloat(calculateInitialSize().width)
    const windowHeight = parseFloat(calculateInitialSize().height)

    switch (positionStrategy.type) {
      case 'parent-relative':
        return {
          x: positionStrategy.offset?.x || 0,
          y: positionStrategy.offset?.y || 0,
        }

      case 'bottom-centered':
        return {
          x: Math.max((viewportWidth - windowWidth) / 2, 0),
          y: windowHeight - 32,
        }

      case 'viewport-centered':
      default:
        return {
          x: (viewportWidth - windowWidth) / 2,
          y:
            (viewportHeight - windowHeight) / 2 -
            (positionStrategy.offset?.y || 100),
        }
    }
  }

  const [isMinimized, setIsMinimized] = createSignal(false)
  const [isVisible, setIsVisible] = createSignal(true)
  const [isInteracting, setIsInteracting] = createSignal(false)
  const [position, setPosition] = createSignal(calculateInitialPosition())
  const [windowSize, setWindowSize] = createSignal(calculateInitialSize())

  let windowRef: HTMLDivElement | undefined
  let isDragging = false
  let startPos = { x: 0, y: 0 }
  let isResizing = false
  let resizeStart = { x: 0, y: 0, width: 0, height: 0 }

  // Handle window resize
  createEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      if (!isInteracting()) {
        setWindowSize(calculateInitialSize())
        // Adjust position if window is outside viewport
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const currentSize = windowSize()
        const currentPos = position()

        setPosition({
          x: Math.min(
            currentPos.x,
            viewportWidth - parseFloat(currentSize.width)
          ),
          y: Math.min(
            currentPos.y,
            viewportHeight - parseFloat(currentSize.height)
          ),
        })
      }
    }

    window.addEventListener('resize', handleResize)
    // eslint-disable-next-line solid/reactivity
    return () => window.removeEventListener('resize', handleResize)
  })

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging || isMinimized() || !windowRef) return

    const newX = e.clientX - startPos.x
    const newY = e.clientY - startPos.y
    windowRef.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
  }

  const handleDragStart = (e: MouseEvent) => {
    if (!isMinimized() && windowRef) {
      isDragging = true
      setIsInteracting(true)
      startPos = {
        x: e.clientX - position().x,
        y: e.clientY - position().y,
      }

      const transform = new DOMMatrix(getComputedStyle(windowRef).transform)
      windowRef.style.transform = `translate3d(${transform.m41}px, ${transform.m42}px, 0)`

      if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', handleDrag)
        window.addEventListener('mouseup', handleDragEnd)
      }
    }
  }

  const handleDragEnd = () => {
    if (!isDragging || !windowRef) return
    isDragging = false
    setIsInteracting(false)

    const transform = new DOMMatrix(getComputedStyle(windowRef).transform)
    setPosition({ x: transform.m41, y: transform.m42 })

    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleDrag)
      window.removeEventListener('mouseup', handleDragEnd)
    }
  }

  const handleResize = (e: MouseEvent) => {
    if (!isResizing || isMinimized() || !windowRef) return

    const deltaX = e.clientX - resizeStart.x
    const deltaY = e.clientY - resizeStart.y

    const newWidth = Math.max(300, resizeStart.width + deltaX)
    const newHeight = Math.max(150, resizeStart.height + deltaY)

    windowRef.style.width = `${newWidth}px`
    windowRef.style.height = isMinimized() ? '57px' : `${newHeight}px`
  }

  const startResize = (e: MouseEvent) => {
    e.stopPropagation()
    if (isMinimized()) return

    isResizing = true
    setIsInteracting(true)
    resizeStart = {
      x: e.clientX,
      y: e.clientY,
      width: parseFloat(windowSize().width),
      height: parseFloat(windowSize().height),
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleResize)
      window.addEventListener('mouseup', stopResize)
    }
  }

  const stopResize = () => {
    if (!isResizing) return
    isResizing = false
    setIsInteracting(false)

    if (windowRef) {
      setWindowSize({
        width: windowRef.style.width,
        height: windowRef.style.height,
      })
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleResize)
      window.removeEventListener('mouseup', stopResize)
    }
  }

  onMount(() => {
    // Event listeners cleanup
    onCleanup(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleDrag)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('mousemove', handleResize)
        window.removeEventListener('mouseup', stopResize)
      }
    })
  })

  return (
    <Show when={isVisible()}>
      <div
        ref={windowRef}
        class={`fixed overflow-hidden rounded-lg border border-gray-200 
          dark:border-gray-700 bg-white dark:bg-black shadow-lg transition-[opacity,transform]
          duration-300 ease-out ${isInteracting() ? 'select-none' : ''}
          max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] z-40`}
        style={{
          width: windowSize().width,
          height: isMinimized() ? '57px' : windowSize().height,
          transform: `translate3d(${position().x}px, ${position().y}px, 0)`,
        }}
      >
        {/* Terminal Header */}
        <div
          onMouseDown={handleDragStart}
          class="flex items-center gap-2 px-4 py-4 bg-gray-100 dark:bg-gray-800 
            border-b border-gray-200 dark:border-gray-700 cursor-move touch-none"
          classList={{
            'border-b-0': isMinimized(),
          }}
        >
          <div class="flex items-center gap-3">
            <button
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onClose?.(), 300)
              }}
              class="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              aria-label="Close terminal"
            />
            <button
              onClick={() => setIsMinimized(true)}
              class="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
              aria-label="Minimize terminal"
            />
            <button
              onClick={() => setIsMinimized(false)}
              class="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              aria-label="Maximize terminal"
            />
          </div>
          <span class="ml-2 text-sm md:text-base text-gray-500 font-mono">
            {title}
          </span>
        </div>

        {/* Terminal Content */}
        <Show when={!isMinimized()}>
          <div class="p-4 md:p-6 font-mono text-sm md:text-base overflow-auto">
            {children}
          </div>
        </Show>

        {/* Resize Handle */}
        <div
          class="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize touch-none"
          onMouseDown={startResize}
          style={{
            'background-image':
              'linear-gradient(135deg, transparent 50%, rgba(128,128,128,0.5) 50%)',
          }}
        />
      </div>
    </Show>
  )
}

export default TerminalWindow
