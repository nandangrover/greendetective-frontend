import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReportProvider } from "./contexts/ReportContext";
import { AuthProvider } from '@/lib/auth/auth-provider'
import { Navigation } from '@/components/Navigation'

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
        <AuthProvider>
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
              <Navigation />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
              <footer className="py-4 px-6 bg-transparent backdrop-blur-sm text-center mt-auto">
              <div className="max-w-7xl mx-auto text-sm text-muted-foreground">
                © 2025 GreenDetective. All rights reserved.
              </div>
            </footer>
            </ReportProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
