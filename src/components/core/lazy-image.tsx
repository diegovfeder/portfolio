import { Show, createSignal, onMount } from 'solid-js'

interface LazyImageProps {
  src: string
  alt: string
  class?: string
}

const LazyImage = (props: LazyImageProps) => {
  const [loaded, setLoaded] = createSignal(false)
  let imgRef: HTMLImageElement | undefined

  const isReady = (el: HTMLImageElement) =>
    el.complete && el.naturalWidth > 0

  const handleRef = (el: HTMLImageElement) => {
    imgRef = el
    // The image may already be complete (cached or SSR-rendered) before our
    // onLoad handler attaches during hydration. Defer to a microtask so the
    // signal update runs after Solid's synchronous render pass.
    if (isReady(el) && typeof window !== 'undefined') {
      window.queueMicrotask(() => setLoaded(true))
    }
  }

  onMount(() => {
    if (imgRef && isReady(imgRef)) {
      setLoaded(true)
      return
    }
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        if (imgRef && isReady(imgRef)) {
          setLoaded(true)
        }
      })
    }
  })

  return (
    <div
      class={`relative overflow-hidden ${props.class || ''}`}
      style={{ 'padding-top': '56.25%' }}
    >
      <Show when={!loaded()}>
        <div
          class="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse pointer-events-none"
          role="img"
          aria-label={props.alt}
        />
      </Show>
      <img
        ref={handleRef}
        src={props.src}
        alt={props.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
        classList={{ 'opacity-0': !loaded(), 'opacity-100': loaded() }}
        style={{ 'image-rendering': 'crisp-edges' }}
      />
    </div>
  )
}

export default LazyImage
