import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReportProvider } from "./contexts/ReportContext";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "GreenDetective",
  description: "Detect greenwashing in companies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute h-full w-full object-cover opacity-20"
          >
            <source src="/videos/background-video.mp4" type="video/mp4" />
          </video>
        </div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReportProvider>
            <header className="py-4 px-6 backdrop-blur-sm">
              <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <Logo />
                <div className="space-x-4">
                  <a
                    href="/"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="/dashboard"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/about"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="/pricing"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </div>
              </nav>
            </header>
            <main className="container mx-auto py-8 flex-grow">{children}</main>
            <footer className="py-4 px-6 bg-transparent backdrop-blur-sm text-center mt-auto">
              <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
                © 2025 GreenDetective. All rights reserved.
              </div>
            </footer>
          </ReportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
