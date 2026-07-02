/**
 * Next.js Middleware
 *
 * Protects routes that require authentication.
 * Redirects unauthenticated users to the login page.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Routes that don't require authentication
 */
const publicRoutes = [
  '/login',
  '/register',
  '/api/auth',
  '/_next',
  '/favicon.ico',
];

/**
 * Routes that require authentication
 */
const protectedRoutes = [
  '/dashboard',
  '/products',
  '/orders',
  '/inventory',
  '/customers',
  '/vendors',
  '/categories',
  '/reports',
  '/settings',
];

/**
 * Check if a path is public
 */
function isPublicPath(path: string): boolean {
  return publicRoutes.some(route => path.startsWith(route));
}

/**
 * Check if a path is protected
 */
function isProtectedPath(path: string): boolean {
  return protectedRoutes.some(route => path.startsWith(route));
}

/**
 * Middleware to protect routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isAuthenticated = !!(accessToken || refreshToken);

  // Redirect authenticated users away from login/register
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protect authenticated routes
  if (isProtectedPath(pathname) && !isAuthenticated) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware runs on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Static files (images, etc.)
     * - API routes that handle their own auth
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
