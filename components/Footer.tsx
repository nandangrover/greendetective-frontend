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
        <div className="border-t border-white/10"></div>
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Newsletter Section */}
            <div className="flex flex-col items-center text-center mb-16">
                <h3 className="text-lg font-medium uppercase tracking-wider mb-3">Newsletter</h3>
                <p className="text-gray-300 text-sm mb-6">Stay updated with the latest on greenwashing detection and sustainability</p>
                <div className="flex w-full max-w-md">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="flex-1 px-4 py-2.5 bg-white/5 border-t border-b border-l border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary rounded-l-lg"
                    />
                    <button className="px-8 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-colors rounded-r-lg">
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
                  <Link href="/resources" className="block text-gray-300 hover:text-white">Resources</Link>
                  <Link href="/policies" className="block text-gray-300 hover:text-white">Privacy Policy</Link>
                  <Link href="/future" className="block text-gray-300 hover:text-white">Future</Link>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Contact</h4>
                <div className="space-y-2">
                  <Link href="mailto:info@greendetective.earth" className="block text-gray-300 hover:text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    info@greendetective.earth
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
                  Empowering businesses and consumers to make informed decisions by detecting and preventing greenwashing practices
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