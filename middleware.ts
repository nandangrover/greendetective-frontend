import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for protected routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/reports') ||
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/investigate')

  if (isProtectedRoute) {
    const accessToken = request.cookies.get('access_token')
    
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Ensure no trailing slashes
  if (request.nextUrl.pathname.endsWith('/') && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(
      new URL(request.nextUrl.pathname.slice(0, -1), request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/reports/:path*',
    '/profile/:path*',
    '/investigate/:path*',
  ],
} 