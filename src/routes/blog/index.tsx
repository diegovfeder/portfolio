import { BlogGrid, BlogHeader } from '~/components'

export default function Blog() {
  return (
    <div class="relative min-h-screen">
      <div class="max-w-7xl mx-auto px-4 pb-10">
        <BlogHeader />
        <div class="mt-8">
          <BlogGrid />
        </div>
      </div>
    </div>
  )
}
