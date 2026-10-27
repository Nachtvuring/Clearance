'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './logout-button';

const navigation = [
  { href: '/dashboard', label: 'Overview', icon: '▦' },
  { href: '/course', label: 'ATC course', icon: '◈' },
  { href: '/alphabet', label: 'NATO alphabet', icon: '⌗' },
  { href: '/practice', label: 'Practice room', icon: '◎' },
  { href: '/phraseology', label: 'Phraseology guide', icon: '⌕' },
  { href: '/profile', label: 'My profile', icon: '◉' },
];
const pageNames = { '/dashboard': 'OVERVIEW', '/course': 'ATC COURSE', '/alphabet': 'NATO ALPHABET', '/practice': 'PRACTICE ROOM', '/phraseology': 'PHRASEOLOGY GUIDE', '/profile': 'MY PROFILE' };
export default function AppShell({ children }) {
  const pathname = usePathname();
  const isPublic = pathname === '/' || pathname === '/login' || pathname === '/signup';
  const [showTrainingTip, setShowTrainingTip] = useState(false);
  useEffect(() => {
    setShowTrainingTip(localStorage.getItem('clearance-training-tip-dismissed') !== 'true');
    import('../training').then(({ initializeTraining }) => initializeTraining());
  }, []);
  const modal = <div className="modal-backdrop" id="exercise-modal" aria-hidden="true"><section className="exercise-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" id="modal-close" aria-label="Close">×</button><div className="modal-kicker" id="modal-kicker">PRACTICE ROOM</div><h2 id="modal-title">Listening exercise</h2><div id="exercise-content" /></section></div>;
  const trainingNotice = <div id="training-notice" className="training-notice" role="status" aria-live="polite" />;
  if (isPublic) return <>{children}{modal}{trainingNotice}</>;
  return <div className="app-shell">
    <aside className="sidebar"><Link className="brand" href="/dashboard" aria-label="Clearance dashboard"><span className="brand-mark">C<span>↗</span></span><span>clearance<span className="brand-sub">ATC TRAINING</span></span></Link><div className="nav-label">LEARN</div>
      <nav className="main-nav" aria-label="Main navigation">{navigation.map((item) => <Link className={`nav-item ${pathname === item.href ? 'active' : ''}`} href={item.href} key={item.href}><span className="nav-icon">{item.icon}</span>{item.label}</Link>)}</nav>
      <div className="sidebar-bottom">{showTrainingTip && <div className="pro-card"><button className="tip-close" type="button" aria-label="Dismiss training tip" onClick={() => { localStorage.setItem('clearance-training-tip-dismissed', 'true'); setShowTrainingTip(false); }}>×</button><div className="pro-icon">✦</div><strong>Training tip</strong><p>Good radio work is short, clear, and complete. One readback at a time.</p><Link href="/course">Continue learning <span>↗</span></Link></div>}<Link className="profile sidebar-profile" href="/profile"><div className="avatar">P</div><div><strong>Pilot profile</strong><span>Student pilot</span></div><span className="more">···</span></Link><LogoutButton /></div>
    </aside>
    <main className="main-content"><header className="topbar"><div className="breadcrumb">TRAINING <span>/</span> {pageNames[pathname] || 'TRAINING'}</div><div className="top-actions"><span className="streak"><span>✦</span> Pilot training</span><Link className="mini-avatar" href="/profile" aria-label="Open profile">P</Link></div></header>{children}</main>
    {modal}{trainingNotice}
  </div>;
}
