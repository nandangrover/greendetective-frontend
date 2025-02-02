'use client'

import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 ml-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 ml-4" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary hover:underline" {...props} />
  ),
}

interface MdxContentProps {
  content: MDXRemoteSerializeResult
}

export function MdxContent({ content }: MdxContentProps) {
  return <MDXRemote {...content} components={components} />
} 