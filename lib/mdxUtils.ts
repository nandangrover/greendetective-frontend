import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { compileMDX } from 'next-mdx-remote/rsc'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getPostBySlug(slug: string) {
  // Check if the slug already has an extension
  const fileName = slug.endsWith('.md') ? slug : `${slug}.md`
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return { data, content }
}

export async function getPostData(slug: string) {
  // Check if the slug already has an extension
  const fileName = slug.endsWith('.md') ? slug : `${slug}.md`
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  
  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: 'mdx',
    },
  })

  const readTime = readingTime(content).text

  return {
    ...data,
    content: mdxSource,
    category: data.categories?.[0] || 'Uncategorized',
    readTime,
    title: data.title,
    author: {
      avatar: data.author?.avatar || '/images/avatars/default.png',
      name: data.author?.name || 'Anonymous',
      role: data.author?.role || 'Writer',
    },
    image: data.image || '/images/blog/default.jpg',
  }
}

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    // Serialize the content
    const mdxSource = await serialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        format: 'mdx',
      },
    })

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      category: data.categories?.[0] || 'General',
      readTime: readingTime(content).text,
      author: {
        name: data.author?.name || 'Anonymous',
        role: data.author?.role || 'Writer',
        avatar: data.author?.avatar || '/images/avatars/default.png'
      },
      image: data.image || '/images/blog/default.png',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      content: mdxSource // Add serialized content
    }
  }))
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
} 