import Link from 'next/link';

const learningSteps = [
  { number: '01', title: 'Learn the basics', text: 'Understand radio calls, frequencies, clearances, and readbacks.' },
  { number: '02', title: 'Hear examples', text: 'Listen to common exchanges and learn what each part means.' },
  { number: '03', title: 'Practice at your pace', text: 'Use optional listening and speaking exercises to build confidence.' },
];

export default function HomePage() {
  return <main className="public-page">
    <header className="public-nav">
      <Link className="brand" href="/" aria-label="Clearance home"><span className="brand-mark">C<span>↗</span></span><span>clearance<span className="brand-sub">ATC TRAINING</span></span></Link>
      <nav aria-label="Public navigation"><Link href="/course">About the course</Link><Link href="/login">Log in</Link><Link className="public-nav-cta" href="/signup">Create account <span>→</span></Link></nav>
    </header>

    <section className="public-hero" id="course-intro">
      <div className="public-copy">
        <div className="eyebrow"><span className="live-dot" /> ATC RADIO COMMUNICATIONS · BEGINNER COURSE</div>
        <h1>Understand ATC.<br /><em>One call at a time.</em></h1>
        <p>Learn aviation radio communication from the beginning with clear explanations, spoken examples, and optional practice.</p>
        <div className="public-actions"><Link className="primary-button" href="/signup">Start learning <span>→</span></Link><span className="public-signup-note">Free account · Learn at your own pace</span></div>
      </div>
      <aside className="public-example" aria-label="Example radio transmission">
        <div className="public-example-top"><span className="example-label">RADIO EXAMPLE</span><span className="public-example-tag">FIRST CONTACT</span></div>
        <p>“Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight.”</p>
        <button className="listen-example" data-speech="Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight."><span>▶</span> Listen to example</button>
        <div className="public-example-caption"><span className="live-dot" /> Station · callsign · request</div>
      </aside>
    </section>

    <section className="public-learning" id="learning-path" aria-labelledby="learning-title">
      <div className="public-section-heading"><div className="eyebrow">A CLEAR PATH THROUGH ATC</div><h2 id="learning-title">Learn, listen, then practice.</h2></div>
      <div className="public-steps">{learningSteps.map((step) => <article className="public-step" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
    </section>

    <footer className="public-footer"><span>Clearance · ATC Training</span><span>For education only. Follow current local procedures and qualified instruction.</span></footer>
  </main>;
}
