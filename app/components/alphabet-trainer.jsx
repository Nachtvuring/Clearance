'use client';

import { useMemo, useState } from 'react';

const alphabet = [
  ['A', 'Alfa', 'AL-fah'], ['B', 'Bravo', 'BRAH-voh'], ['C', 'Charlie', 'CHAR-lee'], ['D', 'Delta', 'DELL-tah'],
  ['E', 'Echo', 'ECK-oh'], ['F', 'Foxtrot', 'FOKS-trot'], ['G', 'Golf', 'GOLF'], ['H', 'Hotel', 'hoh-TELL'],
  ['I', 'India', 'IN-dee-ah'], ['J', 'Juliett', 'JEW-lee-ett'], ['K', 'Kilo', 'KEY-loh'], ['L', 'Lima', 'LEE-mah'],
  ['M', 'Mike', 'MIKE'], ['N', 'November', 'no-VEM-ber'], ['O', 'Oscar', 'OSS-cah'], ['P', 'Papa', 'pah-PAH'],
  ['Q', 'Quebec', 'keh-BECK'], ['R', 'Romeo', 'ROH-mee-oh'], ['S', 'Sierra', 'see-AIR-rah'], ['T', 'Tango', 'TANG-go'],
  ['U', 'Uniform', 'YOU-nee-form'], ['V', 'Victor', 'VIK-tah'], ['W', 'Whiskey', 'WISS-key'], ['X', 'X-ray', 'ECKS-ray'],
  ['Y', 'Yankee', 'YANG-key'], ['Z', 'Zulu', 'ZOO-loo'],
];

function choicesFor(index) {
  const otherIndexes = [(index + 5) % 26, (index + 11) % 26, (index + 19) % 26];
  const choices = [...otherIndexes];
  choices.splice(index % 4, 0, index);
  return choices;
}

export function AlphabetReference() {
  return <div className="alphabet-grid">{alphabet.map(([letter, word, pronunciation]) => <div className="alphabet-cell" key={letter}><b>{letter}</b><strong>{word}</strong><span>{pronunciation}</span></div>)}</div>;
}

export default function AlphabetTrainer() {
  const [letterIndex, setLetterIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Play the radio word, then choose the letter it represents.');
  const [busy, setBusy] = useState(false);
  const options = useMemo(() => choicesFor(letterIndex), [letterIndex]);
  const [letter, word] = alphabet[letterIndex];

  async function playWord() {
    setBusy(true);
    setMessage('Generating the NATO spelling word…');
    try {
      const response = await fetch('/api/elevenlabs/speech', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: word }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Could not generate the audio.');
      }
      const audioUrl = URL.createObjectURL(await response.blob());
      const audio = new Audio(audioUrl);
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      audio.onerror = () => URL.revokeObjectURL(audioUrl);
      await audio.play();
      setMessage('Listen to the word, then pick the matching letter.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  function choose(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === letterIndex) {
      setScore((value) => value + 1);
      setMessage(`Correct — ${letter} is spoken “${word}”.`);
    } else {
      setMessage(`Not quite. ${letter} is spoken “${word}”.`);
    }
  }

  function next() {
    let nextIndex = letterIndex;
    while (nextIndex === letterIndex) nextIndex = Math.floor(Math.random() * alphabet.length);
    setLetterIndex(nextIndex);
    setSelected(null);
    setMessage('Play the radio word, then choose the letter it represents.');
  }

  return <section className="alphabet-trainer"><div className="trainer-top"><div><div className="doc-kicker">LISTEN AND IDENTIFY</div><h2>Which letter did you hear?</h2><p>{message}</p></div><div className="trainer-score"><strong>{score}</strong><span>correct</span></div></div><div className="trainer-controls"><button className="primary-button" onClick={playWord} disabled={busy}>▶ &nbsp; {busy ? 'Loading audio…' : 'Play word'}</button>{options.map((choice) => <button className={`letter-choice ${selected === choice ? choice === letterIndex ? 'correct' : 'wrong' : selected !== null && choice === letterIndex ? 'correct' : ''}`} key={choice} onClick={() => choose(choice)} disabled={selected !== null}>{alphabet[choice][0]}</button>)}{selected !== null && <button className="next-letter" onClick={next}>Next letter →</button>}</div></section>;
}
