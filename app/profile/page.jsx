import { createClient } from '../../lib/supabase/server';
import { getCourseProgress } from '../../lib/course-progress';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } = {} } = supabase ? await supabase.auth.getUser() : { data: {} };
  const progress = await getCourseProgress(supabase, user?.id);
  const { data: profile } = supabase && user
    ? await supabase.from('profiles').select('display_name, avatar_url').eq('id', user.id).maybeSingle()
    : { data: null };
  const name = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pilot';
  const initial = name.charAt(0).toUpperCase();
  return <div className="page-wrap route-page">
    <div className="eyebrow"><span className="live-dot" /> YOUR TRAINING PROFILE</div>
    <div className="route-heading"><div><h1>My profile</h1><p>Your learning activity and training preferences.</p></div></div>
    <section className="profile-hero"><div className="profile-avatar-large">{initial}</div><div><div className="module-kicker">STUDENT PILOT</div><h2>{name}</h2><p>{user?.email}</p></div><div className="level-badge"><span>LEVEL</span><strong>01</strong></div></section>
    <div className="profile-grid"><article className="profile-stat"><span>COURSE PROGRESS</span><strong>{progress.percent}%</strong><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div><p>{progress.completed} of {progress.total} lessons complete</p><a href="/course">View learning path <span>↗</span></a></article><article className="profile-stat"><span>PRACTICE TIME</span><strong>— <small>min</small></strong><p>Practice tracking will be added as exercises are connected to your account.</p></article><article className="profile-stat"><span>CURRENT STREAK</span><strong>— <small>days</small></strong><p>Your learning activity will appear here.</p></article></div>
    <section className="profile-settings"><div><div className="eyebrow">VOICE PRACTICE</div><h2>ElevenLabs voice</h2><p>ATC audio is generated using the voice configured for this training app. Your API credentials stay on the server.</p></div><span className="settings-status">SERVER-SIDE VOICE CONFIG</span></section>
    <p className="fine-print">Account details and completed lessons load from Supabase. Practice time and streaks are not tracked yet.</p>
  </div>;
}
