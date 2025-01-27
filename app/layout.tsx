import type { Metadata } from "next";
import "./globals.css";
import { LayoutContent } from '@/components/LayoutContent';

export const metadata: Metadata = {
  title: "GreenDetective",
  description: "Detect greenwashing in companies",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background min-h-screen bg-gradient-to-b from-background/80 via-muted/20 to-primary/10">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
