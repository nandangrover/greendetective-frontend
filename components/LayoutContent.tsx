"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ReportProvider } from "@/app/contexts/ReportContext";
import { AuthProvider } from "@/lib/auth/auth-provider";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullFooterRoutes = ["/", "/about", "/pricing", "/privacy"];
  const showMinimalFooter = !fullFooterRoutes.includes(pathname);

  return (
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
