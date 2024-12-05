import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect routes under /tournaments, /matches, /wallet
  if (!session && (
    req.nextUrl.pathname.startsWith('/tournaments') ||
    req.nextUrl.pathname.startsWith('/matches') ||
    req.nextUrl.pathname.startsWith('/wallet')
  )) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/tournaments/:path*', '/matches/:path*', '/wallet/:path*']
};