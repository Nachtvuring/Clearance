'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
export default function AuthForm({ mode }) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const supabase = createClient();
  const next = searchParams.get('next');
  const safeNext = next?.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
  async function submit(event) {
    event.preventDefault(); setMessage('');
    if (!supabase) return setMessage('Add your Supabase URL and publishable key to .env.local to enable accounts.');
    setBusy(true);
    const result = mode === 'signup'
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}` } })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (result.error) return setMessage(result.error.message);
    if (mode === 'signup' && !result.data.session) return setMessage('Check your inbox to confirm your email, then log in.');
    window.location.assign(safeNext);
  }
  async function googleLogin() {
    if (!supabase) return setMessage('Add your Supabase URL and publishable key to .env.local to enable accounts.');
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}` } });
    if (error) { setBusy(false); setMessage(error.message); }
  }
  return <section className="auth-card"><div className="eyebrow">PILOT TRAINING ACCOUNT</div><h1>{mode === 'signup' ? 'Start your training.' : 'Welcome back.'}</h1><p>{mode === 'signup' ? 'Create an account to follow your course and save your progress.' : 'Log in to continue your ATC training.'}</p>
    <button type="button" className="google-button" onClick={googleLogin} disabled={busy}><span className="google-g">G</span> Continue with Google</button><div className="auth-divider"><span>or use email</span></div>
    <form onSubmit={submit} className="auth-form"><label>Email address<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label><button className="primary-button auth-submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'} <span>→</span></button></form>
    {message && <p className="auth-message" role="status">{message}</p>}<p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to Clearance?'} <Link href={mode === 'signup' ? '/login' : '/signup'}>{mode === 'signup' ? 'Log in' : 'Create an account'}</Link></p>
  </section>;
}
