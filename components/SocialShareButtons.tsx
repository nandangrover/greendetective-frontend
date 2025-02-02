'use client'

import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Link as LinkIcon } from "lucide-react"
import { useState } from "react"

interface SocialShareButtonsProps {
  url: string
  title: string
}

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank')
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out this article: ${title}`)
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        className="hover:bg-primary/10 hover:text-primary"
        onClick={handleLinkedInShare}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="hover:bg-primary/10 hover:text-primary"
        onClick={handleTwitterShare}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="hover:bg-primary/10 hover:text-primary"
        onClick={handleCopyLink}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      {isCopied && (
        <span className="text-sm text-muted-foreground ml-2">
          Link copied!
        </span>
      )}
    </div>
  )
} 