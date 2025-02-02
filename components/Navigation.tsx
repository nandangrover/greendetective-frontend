"use client";

import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher"

export function Navigation() {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // hide home and pricing if authenticated
  return (
    <header className="sticky top-0 z-50 py-3 px-4 md:px-6 backdrop-blur-sm border-b border-border bg-background/80">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 max-w-7xl mx-auto w-full">
        <Logo />
        <div className="flex items-center gap-4 md:space-x-4">
          {/* New Knowledge Hub Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
              Knowledge Hub
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/resources" className="w-full cursor-pointer">
                  Blog & Resources
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about" className="w-full cursor-pointer">
                  About Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated && (
            <a
              href="/reports"
              className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Reports
            </a>
          )}
          {!isAuthenticated && (
            <a
              href="/pricing"
              className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
          )}
          
          {/* User Dropdown - unchanged */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 hover:bg-muted/50 rounded-full p-2 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block">
                    {user?.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a
              href="/login"
              className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </a>
          )}

          {/* <ThemeSwitcher /> */}
        </div>
      </nav>
    </header>
  );
}
