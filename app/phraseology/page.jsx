const calls = [
  { label: 'FIRST CONTACT', title: 'Address · Identify · Request', example: 'Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight.', note: 'Open with the station you are calling, then your callsign. Add the aircraft type and a clear request.' },
  { label: 'READBACK', title: 'Repeat the safety-critical parts', example: 'Taxi to holding point runway 25 via Alpha, hold short runway 25, OO-ABC.', note: 'Read back runway instructions and clearances. Keep the callsign at the end of the readback.' },
  { label: 'WHEN YOU MISS A CALL', title: 'Ask for it again', example: 'Say again for OO-ABC.', note: 'If you did not understand, ask the controller to repeat. Do not guess at an instruction.' },
];

export default function PhraseologyPage() {
  return <div className="page-wrap route-page">
    <div className="eyebrow"><span className="live-dot" /> A POCKET REFERENCE</div>
    <div className="route-heading"><div><h1>Phraseology guide</h1><p>Simple examples to help you understand the shape of a radio call.</p></div></div>
    <div className="phrase-list">{calls.map((call, index) => <article className="phrase-card" key={call.label}><div className="phrase-index">0{index + 1}</div><div className="phrase-copy"><div className="module-kicker">{call.label}</div><h2>{call.title}</h2><p>{call.note}</p><div className="transmission"><small>EXAMPLE TRANSMISSION</small>{call.example}</div></div></article>)}</div>
    <div className="reference-callout"><strong>Training note</strong><p>These are learning examples, not operational instructions. Real phraseology and readback requirements depend on your country, airspace, and local procedures.</p></div>
  </div>;
}
