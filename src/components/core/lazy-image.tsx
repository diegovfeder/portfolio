import type { Component } from 'solid-js'

interface LazyImageProps {
  src: string
  alt: string
  class?: string
}

/**
 * CSS-only image placeholder. The wrapper carries a neutral gray fill that
 * acts as the loading surface; the <img> renders on top with no opacity gate
 * and no JS state, so there is nothing to get stuck mid-hydration and nothing
 * overlaying the trigger button. Clicks pass through (`pointer-events-none`).
 */
const LazyImage: Component<LazyImageProps> = (props) => {
  return (
    <div
      class={`relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800 ${props.class || ''}`}
    >
      <img
        src={props.src}
        alt={props.alt}
        loading="lazy"
        decoding="async"
        class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none [image-rendering:crisp-edges]"
      />
    </div>
  )
}

export default LazyImage
