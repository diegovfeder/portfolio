import { BlogGrid, BlogHeader } from '~/components'

export default function Blog() {
  return (
    <div class="relative ml-[60px] sm:ml-[120px] min-h-screen">
      <div class="max-w-7xl px-4">
        <div class="fixed top-0 left-[60px] sm:left-[120px] right-0 bg-white dark:bg-black z-20 px-4 pt-6">
          <BlogHeader />
        </div>

        <div class="pt-40 relative z-10">
          <BlogGrid />
        </div>
      </div>
    </div>
  )
}
