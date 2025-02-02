import { Badge } from "@/components/ui/badge"
import { Clock, Share2, Linkedin, Twitter, Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPostData } from '@/lib/mdxUtils'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { MdxContent } from '@/components/MdxContent'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Post {
  content: MDXRemoteSerializeResult
  category: string
  readTime: string
  title: string
  author: {
    avatar: string
    name: string
    role: string
  }
  image: string
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug) as Post
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/resources/${params.slug}`

  return (
    <div className="min-h-screen text-foreground">
      <article className="max-w-4xl mx-auto px-4">
        <Link 
          href="/resources"
          className="inline-flex items-center py-8 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-primary">←</span>
          <span className="ml-2">Back to Resources</span>
        </Link>

        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="bg-accent/10 text-accent-foreground hover:bg-primary/20">
              {post.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border border-border">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {post.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {post.author.role}
                </p>
              </div>
            </div>
            <SocialShareButtons url={currentUrl} title={post.title} />
          </div>
        </div>

        <div className="relative h-[300px] md:h-[400px] mb-12 rounded-xl overflow-hidden shadow-md border border-border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="pb-20">
          <MdxContent content={post.content} />
        </div>
      </article>
    </div>
  )
} 