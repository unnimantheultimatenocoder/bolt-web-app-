import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Auth routes handling
    if (req.nextUrl.pathname.startsWith('/auth')) {
      if (session) {
        // If user is signed in and tries to access auth pages, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      // Allow access to auth pages for non-authenticated users
      return res;
    }

    // Protected routes
    if (!session && (
      req.nextUrl.pathname.startsWith('/tournaments') ||
      req.nextUrl.pathname.startsWith('/matches') ||
      req.nextUrl.pathname.startsWith('/wallet') ||
      req.nextUrl.pathname.startsWith('/dashboard')
    )) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/tournaments/:path*',
    '/matches/:path*',
    '/wallet/:path*',
    '/dashboard/:path*'
  ]
};