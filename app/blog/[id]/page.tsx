import { MediumBlogDetail } from "@/components/medium-blog-detail"
import { notFound } from "next/navigation"
import { BLOGS } from "@/lib/blog-data"

interface BlogPageProps {
  params: {
    id: string
  }
}

export default function BlogPage({ params }: BlogPageProps) {
  const blog = BLOGS.find(b => b.id === params.id)

  if (!blog) {
    notFound()
  }

  return <MediumBlogDetail blogId={params.id} />
}