const activities = [
  { mode: 'quiz', number: '01', label: 'KNOWLEDGE CHECK', title: 'Quick quiz', detail: 'Check runway readback rules and radio basics in a short question.' },
  { mode: 'listen', number: '02', label: 'LISTENING', title: 'Hear the instruction', detail: 'Listen to a ground transmission, then identify the taxi route and hold short.' },
  { mode: 'speak', number: '03', label: 'SPEAKING · ELEVENLABS', title: 'Read it back', detail: 'Listen to ATC, record your response, and review the recognized transcript.' },
];

export default function PracticePage() {
  return <div className="page-wrap route-page">
    <div className="eyebrow"><span className="live-dot" /> PRACTICE AT YOUR OWN PACE</div>
    <div className="route-heading"><div><h1>Practice room</h1><p>Choose a way to work on your radio skills. You can repeat every exercise as often as you like.</p></div></div>
    <div className="activity-grid">{activities.map((activity) => <article className="activity-card" key={activity.mode}><div className="activity-number">{activity.number}</div><div className="practice-type">{activity.label}</div><h2>{activity.title}</h2><p>{activity.detail}</p><button className="primary-button" data-mode={activity.mode}>{activity.mode === 'speak' ? 'Start speaking exercise' : 'Start exercise'} <span>→</span></button></article>)}</div>
    <section className="scenario-panel"><div><div className="eyebrow">SCENARIO PRACTICE</div><h2>First day at the airport</h2><p>Work through a short sequence from first contact with Ground to your handoff after departure.</p></div><button className="text-button" data-mode="lesson">Start the first scenario <span>↗</span></button></section>
    <p className="fine-print">Voice exercises use ElevenLabs speech generation and transcription. Add your ElevenLabs credentials to <code>.env.local</code> to enable audio.</p>
  </div>;
}
