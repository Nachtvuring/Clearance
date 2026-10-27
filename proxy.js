import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
const protectedRoots = ['/dashboard', '/course', '/alphabet', '/practice', '/phraseology', '/profile'];
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (!protectedRoots.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const redirectToLogin = () => { const destination = request.nextUrl.clone(); destination.pathname = '/login'; destination.searchParams.set('next', pathname); return NextResponse.redirect(destination); };
  if (!url || !key) return redirectToLogin();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, { cookies: {
    getAll() { return request.cookies.getAll(); },
    setAll(values) { values.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); values.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); },
  } });
  const { data: { user } } = await supabase.auth.getUser();
  return user ? response : redirectToLogin();
}
export const config = { matcher: ['/dashboard/:path*', '/course/:path*', '/alphabet/:path*', '/practice/:path*', '/phraseology/:path*', '/profile/:path*'] };
