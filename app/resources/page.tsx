import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, BookOpen, Newspaper, Book, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from '@/lib/mdxUtils'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { Button } from "@/components/ui/button"
import { MdxContent } from '@/components/MdxContent'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type BlogPost = {
  id: string
  title: string
  description: string
  category: string
  readTime: string
  author: {
    name: string
    role: string
    avatar: string
  }
  image: string
  slug: string
  content?: MDXRemoteSerializeResult
  date?: string
  tags?: string[]
}

const POSTS_PER_PAGE = 6 // Number of posts to show per page

export default async function Resources({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const blogPosts = await getAllPosts() as BlogPost[]
  const currentPage = Number(searchParams.page) || 1
  const totalPages = Math.max(1, Math.ceil((blogPosts.length - 1) / POSTS_PER_PAGE))
  
  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE + 1 // +1 because first post is featured
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, blogPosts.length)
  
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  if (!blogPosts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No blog posts found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Top Navigation for Resource Types */}
      <div className="border-b border-border/40 top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            <Link 
              href="/resources?type=blog" 
              className="flex items-center px-4 py-6 text-primary border-b-2 border-primary font-medium"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center px-4 py-6 text-muted-foreground/50 cursor-not-allowed">
                    <Newspaper className="w-4 h-4 mr-2" />
                    Industry News
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Will be available after beta</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center px-4 py-6 text-muted-foreground/50 cursor-not-allowed">
                    <Book className="w-4 h-4 mr-2" />
                    Glossary
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Will be available after beta</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Featured Post */}
        {currentPage === 1 && (
          <div className="py-16">
            <Link href={`/resources/${blogPosts[0].slug}`}>
              <Card className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-md transition-all duration-300">
                <div className="grid md:grid-cols-5 gap-6 p-6">
                  <div className="md:col-span-3 space-y-6">
                    <div className="space-y-4">
                      <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                        {blogPosts[0].category}
                      </Badge>
                      <h1 className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {blogPosts[0].title}
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        {blogPosts[0].description}
                      </p>
                    </div>
                    
                    {blogPosts[0].content && (
                      <div className="prose prose-sm max-w-none text-accent-foreground line-clamp-3">
                        <MdxContent content={blogPosts[0].content} />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={blogPosts[0].author.avatar}
                            alt={blogPosts[0].author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {blogPosts[0].author.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {blogPosts[0].author.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {blogPosts[0].readTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* All Posts */}
        <div className="pb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8">All Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentPosts.map((post) => (
              <Link href={`/resources/${post.slug}`} key={post.id}>
                <Card className="group h-full border shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-6 space-y-6">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center pt-2">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.author.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                asChild
              >
                <Link href={`/resources?page=${currentPage - 1}`}>
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="icon"
                  asChild
                >
                  <Link href={`/resources?page=${pageNum}`}>
                    {pageNum}
                  </Link>
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                asChild
              >
                <Link href={`/resources?page=${currentPage + 1}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 