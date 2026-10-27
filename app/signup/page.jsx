import Link from 'next/link';
import { Suspense } from 'react';
import AuthForm from '../components/auth-form';
export default function SignupPage() { return <main className="auth-page"><Link className="auth-back" href="/">← Clearance</Link><Suspense><AuthForm mode="signup" /></Suspense><p className="auth-legal">Use this site as an educational resource. Follow current local procedures for real operations.</p></main>; }
