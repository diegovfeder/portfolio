import { BlogGrid, BlogHeader } from '~/components'

export default function Blog() {
  return (
    <div class="relative ml-[48px] sm:ml-[64px] lg:ml-[120px] min-h-screen">
      <div class="max-w-7xl px-4 pb-10">
        <div class="fixed top-0 left-[48px] sm:left-[64px] lg:left-[120px] right-0 bg-white dark:bg-black z-20 px-4 pt-6">
          <BlogHeader />
        </div>

        <div class="pt-40 relative z-10">
          <BlogGrid />
        </div>
      </div>
    </div>
  )
}
