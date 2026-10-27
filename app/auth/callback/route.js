import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next');
  const safeNext = next?.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
  if (searchParams.has('error') || searchParams.has('error_description')) {
    return NextResponse.redirect(`${origin}/login?error=oauth`);
  }
  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=oauth`);
}
