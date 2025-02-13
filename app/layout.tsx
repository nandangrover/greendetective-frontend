import type { Metadata } from "next";
import "./globals.css";
import { LayoutContent } from '@/components/LayoutContent';
import { Toaster } from "@/components/ui/toaster"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
export const metadata: Metadata = {
  title: {
    default: "GreenDetective",
    template: "%s | GreenDetective"
  },
  description: "Detect and prevent greenwashing with our AI-powered platform. Verify environmental claims, analyze corporate communications, and ensure ESG compliance.",
  keywords: [
    "greenwashing detection",
    "ESG compliance",
    "environmental claims verification",
    "sustainability analysis",
    "AI environmental analysis"
  ],
  openGraph: {
    title: "GreenDetective - AI-Powered Greenwashing Detection",
    description: "Detect and prevent greenwashing with our AI-powered platform. Verify environmental claims, analyze corporate communications, and ensure ESG compliance.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "GreenDetective",
    images: [
      {
        url: '/images/about_page.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GreenDetective - AI-Powered Greenwashing Detection",
    description: "Detect and prevent greenwashing with our AI-powered platform. Verify environmental claims, analyze corporate communications, and ensure ESG compliance.",
    images: ['/images/about_page.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      }
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://greendetective.earth'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className="min-h-screen bg-background min-h-screen bg-gradient-to-b from-background/80 via-muted/20 to-primary/10">
      <Toaster />
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
