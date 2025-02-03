import { createSignal, onMount } from 'solid-js'

import { BlogGrid, BlogHeader } from '~/components'

export default function Blog() {
  const [headerHeight, setHeaderHeight] = createSignal(0)
  let headerRef: HTMLDivElement | undefined

  onMount(() => {
    const updateHeaderHeight = () => {
      if (headerRef) {
        setHeaderHeight(headerRef.offsetHeight)
      }
    }

    // Initial measurement
    updateHeaderHeight()

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight)

    // Cleanup
    return () => window.removeEventListener('resize', updateHeaderHeight)
  })

  return (
    <div class="relative ml-[60px] sm:ml-[120px] min-h-screen">
      <div class="max-w-7xl px-4">
        <div
          ref={headerRef}
          class="fixed top-0 left-[60px] sm:left-[120px] right-0 bg-white dark:bg-black z-20 px-4 pt-6"
        >
          <BlogHeader />
        </div>

        <div
          style={{ 'margin-top': `${headerHeight() + 16}px` }}
          class="relative z-10"
        >
          <BlogGrid />
        </div>
      </div>
    </div>
  )
}
