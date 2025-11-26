import { BlogGrid, BlogHeader } from '~/components'

export default function Blog() {
  return (
    <div class="relative min-h-screen">
      <div class="max-w-7xl px-4 pb-10">
        <div class="fixed top-0 left-0 right-0 bg-white dark:bg-black z-20 px-4 pt-6">
          <BlogHeader />
        </div>

        <div class="pt-40 xs:pt-36 relative z-10">
          <BlogGrid />
        </div>
      </div>
    </div>
  )
}
