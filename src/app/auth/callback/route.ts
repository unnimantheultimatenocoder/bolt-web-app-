import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect(new URL('/auth/login?error=auth_callback_error', request.url));
      }

      // Successful authentication, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If no code, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/auth/login?error=unknown_error', request.url));
  }
}
