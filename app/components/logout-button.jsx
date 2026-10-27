'use client';
import { createClient } from '../../lib/supabase/client';
export default function LogoutButton() {
  async function logout() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    window.location.assign('/');
  }
  return <button className="logout-button" type="button" onClick={logout}>Log out</button>;
}
