"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ReportProvider } from "@/app/contexts/ReportContext";
import { AuthProvider } from "@/lib/auth/auth-provider";
import Image from "next/image";
import Head from "next/head";
import { useMemo, useEffect, useState } from "react";
import { Suspense } from "react";

// Define background images in a constant
const BACKGROUND_IMAGES = {
  home: "/images/background/abstract_1.webp",
  about: "/images/background/abstract_2.webp",
  pricing: "/images/background/abstract_3.webp",
  resources: "/images/background/abstract_4.webp",
  default: "/images/background/abstract_2.webp",
} as const;

// Add a default blur data URL (a tiny 1x1 pixel transparent image)
const DEFAULT_BLUR_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Lazy loaded video component
const BackgroundVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the video is already cached
    const cachedVideo = localStorage.getItem('backgroundVideoLoaded');
    if (cachedVideo) {
      setIsLoaded(true);
    }
  }, []);

  const handleVideoLoaded = () => {
    setIsLoaded(true);
    localStorage.setItem('backgroundVideoLoaded', 'true');
  };

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={`absolute h-full w-full object-cover transition-opacity duration-100 ${
        isLoaded ? 'opacity-20' : 'opacity-0'
      }`}
      onLoadedData={handleVideoLoaded}
    >
      <source src="/videos/background-video.mp4" type="video/mp4" />
    </video>
  );
};

// Lazy loaded background image component
const BackgroundImage = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState(DEFAULT_BLUR_DATA_URL);

  useEffect(() => {
    // Generate or get cached blur data URL
    const getCachedBlurData = async () => {
      const cached = localStorage.getItem(`blur-${src}`);
      if (cached) {
        setBlurDataURL(cached);
        return;
      }

      // Create a tiny version of the image for blur
      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 10;
        canvas.height = 10;
        if (ctx) {
          ctx.drawImage(img, 0, 0, 10, 10);
          const blurData = canvas.toDataURL('image/jpeg', 0.5);
          localStorage.setItem(`blur-${src}`, blurData);
          setBlurDataURL(blurData);
        }
      };
    };

    getCachedBlurData();
  }, [src]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt="Abstract green background"
        fill
        className={`object-cover transition-all duration-100 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isLoaded ? 'opacity-20 scale-100' : 'opacity-0 scale-105'
        }`}
        priority={false}
        quality={90}
        loading="lazy"
        onLoadingComplete={() => setIsLoaded(true)}
        placeholder="blur"
        blurDataURL={blurDataURL}
        style={{
          willChange: 'transform, opacity', // Optimize for animations
        }}
      />
      {/* Optional: Add a subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullFooterRoutes = ["/", "/about", "/pricing", "/policies", "/roadmap", "/contact"];
  const showMinimalFooter = !(fullFooterRoutes.includes(pathname) || pathname.startsWith('/resources'));
  const isResourcePage = pathname.startsWith('/resources');

  // Memoize the background image selection
  const currentBackground = useMemo(() => {
    // if (pathname === "/") return BACKGROUND_IMAGES.home;
    // if (pathname === "/about") return BACKGROUND_IMAGES.about;
    // if (pathname === "/pricing") return BACKGROUND_IMAGES.pricing;
    // if (pathname.startsWith('/resources')) return BACKGROUND_IMAGES.resources;
    return BACKGROUND_IMAGES.resources;
  }, [pathname]);

  // Get next possible backgrounds for preloading
  const preloadBackgrounds = useMemo(() => {
    // Only preload images for routes that are likely to be visited next
    const currentIndex = fullFooterRoutes.indexOf(pathname);
    const nextRoutes = [];
    
    if (currentIndex !== -1) {
      // Add next route in navigation
      if (currentIndex < fullFooterRoutes.length - 1) {
        nextRoutes.push(fullFooterRoutes[currentIndex + 1]);
      }
      // Add previous route
      if (currentIndex > 0) {
        nextRoutes.push(fullFooterRoutes[currentIndex - 1]);
      }
    }
    
    return [...new Set(nextRoutes.map(route => {
      if (route === "/") return BACKGROUND_IMAGES.home;
      if (route === "/about") return BACKGROUND_IMAGES.about;
      if (route === "/pricing") return BACKGROUND_IMAGES.pricing;
      return BACKGROUND_IMAGES.default;
    }))];
  }, [pathname]);

  // Register service worker for caching
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  return (
    <AuthProvider>
      <Head>
        {/* Preload current background */}
        <link
          rel="preload"
          as="image"
          href={currentBackground}
          key={currentBackground}
        />
        {/* Preload next possible backgrounds */}
        {preloadBackgrounds.map(bg => (
          <link
            key={bg}
            rel="prefetch"
            as="image"
            href={bg}
          />
        ))}
      </Head>

      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Video Background Layer */}
        {!isResourcePage && (
          <Suspense fallback={null}>
            <BackgroundVideo />
          </Suspense>
        )}
        
        {/* Image Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Suspense fallback={null}>
            <BackgroundImage src={currentBackground} />
          </Suspense>
        </div>
      </div>

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReportProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <Footer minimal={showMinimalFooter} />
          </div>
          <CookieBanner />
        </ReportProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
