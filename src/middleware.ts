import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  if (
    !session &&
    (req.nextUrl.pathname.startsWith('/tournaments') ||
      req.nextUrl.pathname.startsWith('/matches'))
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Redirect to home if logged in user tries to access auth pages
  if (
    session &&
    (req.nextUrl.pathname.startsWith('/auth/login') ||
      req.nextUrl.pathname.startsWith('/auth/register'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}