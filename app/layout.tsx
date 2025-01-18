import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { ReportProvider } from './contexts/ReportContext'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = {
  title: 'GreenDetective',
  description: 'Detect greenwashing in companies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReportProvider>
            <header className="py-4 px-6 bg-secondary">
              <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <Logo />
                <div className="space-x-4">
                  <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
                  <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">Dashboard</a>
                  <a href="/about" className="text-foreground hover:text-primary transition-colors">About</a>
                  <a href="/pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
                </div>
              </nav>
            </header>
            <main className="container mx-auto py-8">
              {children}
            </main>
            <footer className="py-4 px-6 bg-secondary text-center">
              <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
                © 2025 GreenDetective. All rights reserved.
              </div>
            </footer>
          </ReportProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

