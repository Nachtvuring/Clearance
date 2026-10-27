import AlphabetTrainer, { AlphabetReference } from '../components/alphabet-trainer';

export default function AlphabetPage() {
  return <div className="page-wrap route-page alphabet-page">
    <div className="eyebrow"><span className="live-dot" /> RADIO COMMUNICATIONS · FOUNDATION</div>
    <div className="route-heading"><div><h1>NATO spelling alphabet</h1><p>Often called the military alphabet, this is the radiotelephony alphabet used to make letters unmistakable over a noisy radio.</p></div></div>
    <div className="doc-callout alphabet-intro"><strong>Why pilots use it</strong><p>Similar-sounding letters are easy to confuse over radio. Use the standard radiotelephony word for each letter when spelling callsigns, registrations, waypoints, or other information. The official spelling is <strong>Alfa</strong>; the official spelling of J is <strong>Juliett</strong>.</p></div>
    <section className="alphabet-reference"><div className="section-heading"><div><div className="eyebrow">REFERENCE TABLE</div><h2>All 26 letters</h2></div></div><AlphabetReference /></section>
    <AlphabetTrainer />
    <p className="source-note">The alphabet and pronunciation guidance follow the <a href="https://www.icao.int/sites/default/files/postalhistory/annex_10_aeronautical_telecommunications.htm" target="_blank" rel="noreferrer">ICAO International Radiotelephony Spelling Alphabet</a>. Pronunciation guides here are approximate; refer to official ICAO pronunciation materials for the standard.</p>
  </div>;
}
