import { Title, Meta } from '@solidjs/meta'

interface BlogPost {
  meta: {
    title: string
    excerpt: string
  }
}

export default function BlogSEO({ post }: { post: BlogPost }) {
  return (
    <>
      <Title>{post.meta.title} | My Blog</Title>
      <Meta name="description" content={post.meta.excerpt} />
      <Meta property="og:title" content={post.meta.title} />
      <Meta property="og:description" content={post.meta.excerpt} />
      <Meta property="og:type" content="article" />
    </>
  )
}
