import Link from "next/link"
import { Mail, LinkedinIcon, X } from "lucide-react"

interface FooterProps {
  minimal?: boolean;
}

export function Footer({ minimal = false }: FooterProps) {
  if (minimal) {
    return (
        <footer className="py-4 px-6 bg-transparent backdrop-blur-sm text-center mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-4 mb-2">
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
    <footer className="bg-background backdrop-blur-sm text-white">
        {/* line */}
        <div className="border-t border-white/10"></div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Newsletter Section */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-2">Join our newsletter</h3>
          <p className="text-gray-300 mb-4">Stay updated with the latest on greenwashing detection and sustainability.</p>
          <div className="flex gap-3 max-w-md">
            <input 
              type="email" 
              placeholder="Email" 
              className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white"
            />
            <button className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-[#8ED017] transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white">About</Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-white">Pricing</Link>
              <Link href="/policies" className="block text-gray-300 hover:text-white">Privacy Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <div className="space-y-2">
              <Link href="mailto:support@greendetective.earth" className="block text-gray-300 hover:text-white flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@greendetective.earth
              </Link>
              <Link href="https://www.linkedin.com/company/greendetective" className="block text-gray-300 hover:text-white flex items-center gap-2">
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link href="https://twitter.com/greendetective" className="block text-gray-300 hover:text-white flex items-center gap-2">
                <X className="h-4 w-4" />
                Twitter
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-medium mb-4">Our Mission</h4>
            <p className="text-gray-300">
              Empowering businesses and consumers to make informed decisions by detecting and preventing greenwashing practices.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex justify-between items-center text-sm text-gray-300">
          <p>© 2025 GreenDetective. All rights reserved.</p>
          <Link href="/policies" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
} 