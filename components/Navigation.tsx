"use client";

import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/Logo";

export function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 py-3 px-4 md:px-6 backdrop-blur-sm border-b border-border bg-background/80">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-7xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-4 md:space-x-4">
          <a
            href="/"
            className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </a>
          {isAuthenticated && (
            <a
              href="/reports"
              className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Reports
            </a>
          )}
          <a
            href="/pricing"
            className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </a>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
