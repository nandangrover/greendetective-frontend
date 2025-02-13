import Link from "next/link"
import { Mail, LinkedinIcon, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface FooterProps {
  minimal?: boolean;
}

export function Footer({ minimal = false }: FooterProps) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed')
      }

      toast({
        title: 'Success!',
        description: 'You have been subscribed to our newsletter.',
      })
      setEmail('')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Subscription Error',
        description: error instanceof Error ? error.message : 'Failed to subscribe',
      })
    } finally {
      setLoading(false)
    }
  }

  if (minimal) {
    return (
      <footer className="py-4 px-4 bg-transparent backdrop-blur-sm text-center mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/policies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 GreenDetective. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-card">
      <div className="border-t border-border"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Newsletter Section */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
          <h3 className="text-base sm:text-lg font-medium uppercase tracking-wider mb-3 text-foreground">Newsletter</h3>
          <p className="text-muted-foreground text-sm mb-4 sm:mb-6 px-2">Stay updated with the latest on greenwashing detection and sustainability</p>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md px-2">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded-l-lg text-sm"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 sm:px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-colors rounded-r-lg disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 px-2">
          <div>
            <h4 className="font-medium mb-3 text-foreground">Platform</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground text-sm">About Us</Link>
              <Link href="/pricing" className="block text-muted-foreground hover:text-foreground text-sm">Pricing</Link>
              <Link href="/resources" className="block text-muted-foreground hover:text-foreground text-sm">Blog & Resources</Link>
              <Link href="/roadmap" className="block text-muted-foreground hover:text-foreground text-sm">Product Roadmap</Link>
              <Link href="/policies" className="block text-muted-foreground hover:text-foreground text-sm">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-foreground">Contact</h4>
            <div className="space-y-2">
              <Link href="mailto:info@greendetective.earth" className="block text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                info@greendetective.earth
              </Link>
              <Link href="https://www.linkedin.com/company/greendetective" className="block text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm">
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link href="https://twitter.com/greendetective" className="block text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm">
                <X className="h-4 w-4" />
                Twitter
              </Link>
            </div>
          </div>

          <div className="sm:col-span-2">
            <h4 className="font-medium mb-3 text-foreground">Our Mission</h4>
            <p className="text-muted-foreground text-sm">
              Empowering businesses and consumers to make informed decisions by detecting and preventing greenwashing practices
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground space-y-2 sm:space-y-0 px-2">
          <p>© 2025 GreenDetective. All rights reserved.</p>
          <Link href="/policies" className="hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
} 