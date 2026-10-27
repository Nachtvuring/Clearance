import Link from 'next/link';
import { createClient } from '../../lib/supabase/server';
import { getCourseProgress } from '../../lib/course-progress';

const sections = [
  { number: '01', title: 'ATC course', href: '/course', text: 'Start with the introduction, then work through radio basics, ground, tower, VFR, IFR, and emergencies.', action: 'Open the course', featured: true },
  { number: '02', title: 'NATO alphabet', href: '/alphabet', text: 'Learn Alfa to Zulu with a reference table and listen-and-identify trainer.', action: 'Learn the alphabet' },
  { number: '03', title: 'Phraseology guide', href: '/phraseology', text: 'Keep common pilot calls and readback patterns close as a quick reference.', action: 'Browse phraseology' },
  { number: '04', title: 'Practice room', href: '/practice', text: 'Practice with short quizzes, listening drills, and recorded readbacks.', action: 'Open practice room' },
];
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } = {} } = supabase ? await supabase.auth.getUser() : { data: {} };
  const progress = await getCourseProgress(supabase, user?.id);
  return <div className="page-wrap route-page home-page"><div className="eyebrow"><span className="live-dot" /> ATC RADIO COMMUNICATIONS · YOUR TRAINING</div>
    <section className="home-hero"><div><h1>Welcome to<br /><em>your training desk.</em></h1><p>Build your ATC radio knowledge with clear lessons and spoken examples. Start with the introduction, or jump to a topic you want to review.</p><Link className="primary-button" href="/course#start-here">Continue the course <span>→</span></Link></div><div className="hero-transmission"><div className="example-label">YOUR FIRST CALL</div><p>“Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight.”</p><button className="listen-example" data-speech="Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight."><span>▶</span> Listen to example</button></div></section>
    <section className="dashboard-progress"><div><div className="eyebrow">YOUR COURSE PROGRESS</div><h2>{progress.total ? `${progress.completed} of ${progress.total} lessons complete` : 'Your course progress will appear here'}</h2><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div></div><strong>{progress.percent}%</strong><Link href="/course#start-here">{progress.completed ? 'Continue course' : 'Start course'} <span>→</span></Link></section>
    <div className="home-section-title"><div><div className="eyebrow">YOUR LEARNING LIBRARY</div><h2>Choose where to begin</h2></div><span>Read first, practice when ready.</span></div>
    <div className="home-library">{sections.map((section) => <article className={`library-card ${section.featured ? 'library-featured' : ''}`} key={section.number}><span className="library-number">{section.number}</span><h3>{section.title}</h3><p>{section.text}</p><Link href={section.href}>{section.action} <span>↗</span></Link></article>)}</div>
    <div className="home-note"><strong>A note about the examples</strong><p>The course uses ICAO and European conventions to teach the basics. Real phraseology varies by country and airport; use current local publications and qualified instruction for real operations.</p></div>
  </div>;
}
