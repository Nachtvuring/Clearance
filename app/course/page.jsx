import { createClient } from '../../lib/supabase/server';
import { getCourseProgress } from '../../lib/course-progress';
import LessonProgressControl from '../components/lesson-progress-control';

const chapters = [
  {
    id: 'start-here', title: 'Start here', kicker: 'THE COMPLETE INTRODUCTION', heading: 'What ATC does',
    intro: 'Air traffic control helps aircraft move safely and efficiently in controlled airspace and at controlled aerodromes. Controllers issue clearances and instructions, coordinate traffic, and pass information. The pilot remains responsible for operating the aircraft and must understand an instruction before acting on it.',
    sections: [
      { title: 'A radio call is a small coordination task', paragraphs: ['A useful way to understand radio communication is to think of each call as a coordination task. The controller needs to know which aircraft is speaking, where it is or what it is doing, and what action is requested or instructed. The pilot needs to identify the station, understand the message, and confirm any safety-critical details.', 'The radio is shared. One person speaks at a time, and every unnecessary transmission makes it harder for others to get through. A concise call is not a rushed call: it contains the information needed for the next decision and leaves out unrelated detail.'] },
      { title: 'Who you may speak with', paragraphs: ['At a larger controlled airport, a flight may speak with several units. Clearance Delivery may issue a departure clearance; Ground coordinates movement on the manoeuvring area; Tower handles runway operations; Departure or Approach manages the climb and arrival; and Area Control manages en-route traffic. Smaller aerodromes may combine roles or provide an information service instead of full ATC.', 'The service name matters because it tells you what kind of help to expect. An information service can provide useful traffic and aerodrome information, but it is not automatically the same as an ATC clearance or separation service. The local chart and aerodrome information tell you which service is available.'] },
      { title: 'The basic exchange', paragraphs: ['A typical exchange has a call, a reply, an instruction or information, and a response from the pilot. The controller may use your full callsign at first and shorten it only after communication is established. Use the callsign form the controller uses so there is no doubt that an instruction is intended for your aircraft.', 'You do not have to memorize every phrase before you begin. First learn to distinguish a request from an instruction and an instruction from a clearance. If any part is unclear, ask for it again before acting.'], bullets: ['Listen for the station and your callsign.', 'Write down details that are easy to confuse, such as a frequency, runway, route, level, or transponder code.', 'Read back required items clearly and wait for correction if the controller identifies a mistake.'] },
    ],
    examples: [{ label: 'First call · request taxi', speaker: 'PILOT', text: 'Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight.' }],
    takeaway: 'Listen first. Identify who is speaking, what applies to your aircraft, and what action is expected before you respond.',
  },
  {
    id: 'radio-basics', title: '1. Radio basics', kicker: 'CHAPTER 01 · THE RADIO', heading: 'Make a clear transmission',
    intro: 'Good radio technique makes your message easier to understand and reduces the chance that a controller or another pilot has to ask you to repeat it. Use the correct frequency, listen before transmitting, and speak at a steady, conversational pace.',
    sections: [
      { title: 'Before you press transmit', paragraphs: ['Confirm that the radio is on the intended frequency and that the volume and audio panel are set correctly. Listen for a moment before transmitting; if someone else is using the frequency, wait for a natural pause. This prevents two transmissions from covering each other.', 'Press the transmit switch, pause very briefly so the first syllable is not clipped, then speak. Keep the microphone at a consistent distance and avoid shouting. Release the switch when finished so the other station can answer. If you are unsure whether your transmission went through, listen before repeating it.'] },
      { title: 'Build a message in a useful order', paragraphs: ['For an initial call, state the station you are calling, your callsign, and then the information or request. A position helps the controller find you in the traffic picture. An aircraft type, flight rules, destination, or ATIS letter may be relevant depending on the service and the local procedure.', 'Once contact is established, do not repeat the full introduction on every call unless the situation requires it. Respond to the instruction, include details that need confirmation, and identify yourself when needed. The goal is a message that is complete enough to be unambiguous without filling the frequency with repeated information.'], bullets: ['Station being called: “Antwerp Ground”.', 'Aircraft identity: “OO-ABC”.', 'Position or context: “stand 4” or “5 miles south”.', 'Request or response: “request taxi” or the required readback.'] },
      { title: 'Callsigns, letters, and numbers', paragraphs: ['Use the international radiotelephony spelling alphabet when a letter could be mistaken for another. For example, say Alfa, Bravo, Charlie rather than relying on the sound of the letters alone. The complete alphabet and a listening trainer are available on the NATO alphabet page.', 'Aviation number pronunciations are designed to make digits easier to distinguish over radio. Say runway numbers as individual digits, such as “runway two five”. Frequencies, headings, levels, and codes should be spoken in the prescribed form for the region and situation. Do not invent a shortened form if it could change the meaning.'] },
    ],
    examples: [
      { label: 'Callsign spelling · OO-ABC', speaker: 'PILOT', text: 'Oscar Oscar Alfa Bravo Charlie.' },
      { label: 'Runway number · 25', speaker: 'PILOT', text: 'Runway two five.' },
    ], takeaway: 'Speak clearly and steadily. Use standard words for letters and numbers, and never let brevity make a message ambiguous.',
  },
  {
    id: 'first-contact', title: '2. First contact', kicker: 'CHAPTER 02 · WHO TO CALL', heading: 'Choose the right station and make first contact',
    intro: 'Use the frequency published for the service you need. The correct station depends on your location, phase of flight, and the local aerodrome procedure. Use current charts and information rather than relying on a remembered frequency.',
    sections: [
      { title: 'Prepare before calling', paragraphs: ['Before transmitting, identify the service you need and gather the information that service is likely to ask for. For a departure this may include your callsign, aircraft type, parking position, flight rules, destination or direction, and the current ATIS letter. For an airborne call it may include your position, altitude or level, route, and request.', 'Preparation keeps you from beginning a call and then searching for basic information while holding the frequency. Keep charts or notes available, but continue to monitor the aircraft and outside environment. In actual flight, use the checklist and workload management taught by your instructor.'] },
      { title: 'Listen to ATIS and the frequency', paragraphs: ['ATIS is a recorded broadcast of routine aerodrome information such as runway in use, weather, and operational notices. It is not a clearance. Note the information letter and any details relevant to the flight, then include the letter in your first call when local procedure requests it.', 'Listen to the active frequency before you transmit. This helps you avoid interrupting another exchange and gives you context about traffic and the controller’s workload. If the frequency is busy, wait for a gap unless you have an urgent safety reason to call.'] },
      { title: 'Make the first call complete, not long', paragraphs: ['Give the station name, your callsign, and the reason for calling. Add the position or context the controller needs to respond. Do not read a long flight plan over the radio unless asked; use the published process for submitting flight plan information.', 'After the controller answers, listen for the instruction before preparing your response. If the controller uses an abbreviated callsign, use it only after it has been established and only while it remains unmistakable. If you are uncertain that a call was meant for you, ask rather than assuming.'] },
    ],
    examples: [
      { label: 'Request departure clearance · ATIS Bravo', speaker: 'PILOT · DELIVERY', text: 'Antwerp Delivery, OO-ABC, stand 4, VFR to the south, information Bravo, request clearance.' },
      { label: 'Request taxi', speaker: 'PILOT · GROUND', text: 'Antwerp Ground, OO-ABC, stand 4, ready to taxi.' },
    ], takeaway: 'Have the relevant information ready before you call. ATIS informs you; it does not authorize an action.',
  },
  {
    id: 'clearances', title: '3. Clearances & readbacks', kicker: 'CHAPTER 03 · UNDERSTAND AND CONFIRM', heading: 'Know what you are agreeing to',
    intro: 'A clearance authorizes a specific action under stated conditions. An instruction tells you what to do. Information helps you make a decision but does not, by itself, grant permission. If you cannot tell which one you received, ask the controller to clarify.',
    sections: [
      { title: 'Listen for the action and its limits', paragraphs: ['A clearance can include a route, a limit, a runway, a level, or a condition. Repeat the parts that define what you may do and where the authorization ends. Do not extend a clearance beyond what was said: permission to taxi does not automatically include permission to cross a runway, and being told to line up is not takeoff clearance.', 'Instructions and clearances can arrive in more than one part. Write down complex details, read the message back in a logical order, and ask for a repeat if a word or number was blocked. Never guess a runway, altitude, route, or code.'] },
      { title: 'What a readback does', paragraphs: ['A readback closes the communication loop. You repeat the safety-related parts so the controller can hear whether you understood them correctly. The controller is expected to listen to the readback and correct a discrepancy; your readback is not complete until the instruction is clear to both sides.', 'For European operations, EASA SERA identifies items that always require readback, including route clearances; runway entry, landing, takeoff, hold-short, crossing, taxi, and backtrack instructions; runway in use; altimeter settings; SSR codes; newly assigned communication channels; level, heading, and speed instructions; and transition levels. Other instructions must be read back or acknowledged so understanding is clear.'] },
      { title: 'Correct mistakes without delay', paragraphs: ['If you hear a mistake in your own readback, correct it immediately. If the controller says “negative” or issues a correction, stop and listen to the corrected instruction. Do not continue with the version you first heard.', 'If you cannot comply, say “unable” and briefly explain why. A request for clarification is normal and safer than acting on a guess. “Say again” asks for repetition; “confirm” asks the controller to verify a specific detail.'] },
    ],
    examples: [
      { label: 'ATC · taxi and hold short', speaker: 'ATC · GROUND', text: 'OO-ABC, taxi to holding point runway 25 via taxiway Alpha. Hold short runway 25.' },
      { label: 'Pilot · complete readback', speaker: 'PILOT · READBACK', text: 'Taxi to holding point runway 25 via Alpha, hold short runway 25, OO-ABC.' },
    ], takeaway: 'Read back the safety-critical items completely. If anything is unclear or impossible, say so before taking action.',
  },
  {
    id: 'ground', title: '4. Ground & taxi', kicker: 'CHAPTER 04 · BEFORE TAKEOFF', heading: 'Taxi with a clear route and runway plan',
    intro: 'Ground movement takes place in a busy environment with aircraft, vehicles, intersections, and active runways. A taxi instruction is a route to follow on the ground; it does not remove the need to maintain your position awareness and follow airport signs and markings.',
    sections: [
      { title: 'Understand the route', paragraphs: ['Taxi instructions may name taxiways, holding points, intersections, and runways. Trace the route on the current airport chart before moving. If a taxiway name is unfamiliar or the route is difficult to follow, ask for progressive taxi or clarification as allowed by local procedure.', 'Do not rely on memory alone at an unfamiliar aerodrome. Confirm your position after each turn and compare signs and markings with the chart. If you become unsure where you are, stop in a safe place and tell Ground. Never continue moving while uncertain of your position.'] },
      { title: 'Runway crossings and hold-short points', paragraphs: ['A runway is a protected area. A taxi clearance does not automatically authorize entering or crossing a runway. Each runway instruction must be explicit and read back. “Hold short” means stop before the specified runway or holding position and remain there until further clearance.', 'If an instruction includes a runway crossing and a later hold-short point, preserve both parts in your readback. Do not cross a runway because another aircraft is moving, because you expect a clearance, or because a controller has cleared a different aircraft.'] },
      { title: 'Start-up and pushback', paragraphs: ['Start-up, engine start, and pushback procedures vary by airport. Some aerodromes require a specific request or approval; others use different procedures. Check local instructions and do not assume that permission to start engines also authorizes pushback or taxi.', 'Keep the radio call concise and state your stand or position. If you receive a revised route, stop and update your plan before continuing. A readback should match the latest instruction, not an earlier taxi clearance.'] },
    ],
    examples: [
      { label: 'Taxi route with a runway crossing', speaker: 'ATC · GROUND', text: 'OO-ABC, taxi via Alpha, cross runway 19, then hold short runway 25.' },
      { label: 'Pilot · readback', speaker: 'PILOT · READBACK', text: 'Via Alpha, cross runway 19, hold short runway 25, OO-ABC.' },
    ], takeaway: 'Follow the chart, signs, and clearance together. Never enter or cross a runway without an explicit instruction.',
  },
  {
    id: 'tower', title: '5. Tower & departure', kicker: 'CHAPTER 05 · RUNWAY OPERATIONS', heading: 'Use the runway only when cleared',
    intro: 'Tower coordinates aircraft using or approaching the runway. Instructions such as “line up and wait”, “cleared for takeoff”, and “cleared to land” have different meanings. Hear the exact clearance for your aircraft and runway before acting.',
    sections: [
      { title: 'Line up is not takeoff clearance', paragraphs: ['“Line up and wait” authorizes entering the runway and waiting, subject to the precise instruction and local procedures. It does not authorize takeoff. If you are holding short, remain there until an instruction authorizes you to enter.', 'A takeoff clearance must be explicit. Read back the runway and takeoff clearance with your callsign. If the runway, wind, or instruction does not match your understanding, query Tower before beginning the takeoff roll.'] },
      { title: 'After departure', paragraphs: ['After takeoff, Tower may tell you to follow a published departure, maintain a heading or level, or contact another controller. Write down a new frequency before switching. Read back assigned headings, levels, and frequency changes when required, then tune and verify the new frequency.', 'When making the first call to Departure or Approach, include the station name, your callsign, and the information that helps the controller identify you, such as altitude or assigned heading. Follow any local reporting requirement.'] },
      { title: 'Landing, go-arounds, and runway vacation', paragraphs: ['A landing clearance is separate from an approach clearance. Continue the approach only in accordance with the clearance and the applicable procedure. If Tower instructs a go-around, respond and carry it out using the aircraft procedure and instruction; do not continue an approach expecting a landing clearance.', 'After landing, follow the published exit and taxi instructions. Report runway vacated only when the aircraft is fully clear of the runway according to local procedures. Then contact Ground if instructed.'] },
    ],
    examples: [
      { label: 'Line up and wait', speaker: 'ATC · TOWER', text: 'OO-ABC, runway 25, line up and wait.' },
      { label: 'Takeoff clearance', speaker: 'ATC · TOWER', text: 'OO-ABC, runway 25, cleared for takeoff, wind 240 degrees 8 knots.' },
      { label: 'Pilot · readback', speaker: 'PILOT · READBACK', text: 'Runway 25, cleared for takeoff, OO-ABC.' },
    ], takeaway: '“Line up and wait” is not “cleared for takeoff”. Wait for the explicit clearance that applies to your runway.',
  },
  {
    id: 'enroute', title: '6. En route & handoffs', kicker: 'CHAPTER 06 · IN FLIGHT', heading: 'Manage instructions and frequency changes',
    intro: 'En-route communication keeps the controller and pilot aligned as the aircraft moves through airspace. Instructions may change your level, heading, speed, route, or next frequency. Listen for exactly what changes and what remains in effect.',
    sections: [
      { title: 'Read back changes accurately', paragraphs: ['When an instruction changes a level or heading, repeat the assigned value and callsign. Do not substitute a value you expected to receive. If you are already complying with a previous instruction, continue that instruction until you receive a replacement or cancellation.', 'For a multi-part clearance, note the pieces in order: action, value, limit or route, then any frequency. If you miss one part, ask for that part again. It is better to pause and clarify than to read back only the part you happened to catch.'] },
      { title: 'Transfer to another frequency', paragraphs: ['A frequency change tells you which station to contact next. Tune the assigned frequency, confirm the radio is transmitting on it, listen briefly, and make an initial call. If the frequency is unreadable or you cannot establish contact, follow the applicable lost-communications procedure and attempt the published alternatives as appropriate.', 'A handoff is not a new clearance by itself. Keep complying with the last valid instruction unless the new controller changes it. When entering a new sector, the controller may ask you to report your level, position, or intention.'] },
      { title: 'If the instruction is not practical', paragraphs: ['Tell ATC promptly if you cannot comply with a heading, altitude, speed, or route. State the reason briefly and make a request if you have a safe alternative. Do not silently modify an instruction and assume the controller has noticed.', 'The controller may respond “unable” and offer another option, or ask for more information. Continue to fly the aircraft and use the approved procedures and training for any immediate safety issue.'] },
    ],
    examples: [
      { label: 'Altitude instruction', speaker: 'ATC · DEPARTURE', text: 'OO-ABC, climb to altitude 3,000 feet.' },
      { label: 'Heading and frequency change', speaker: 'ATC · APPROACH', text: 'OO-ABC, turn right heading 270, contact Brussels Approach 119.5.' },
      { label: 'Unable to comply', speaker: 'PILOT', text: 'Brussels Approach, OO-ABC, unable heading 270 due weather, request heading 240.' },
    ], takeaway: 'A frequency transfer does not cancel your current clearance. Keep following it until ATC changes it.',
  },
  {
    id: 'vfr', title: '7. VFR & flight information', kicker: 'CHAPTER 07 · VISUAL FLIGHTS', heading: 'Understand the service you are receiving',
    intro: 'VFR describes flight conducted under Visual Flight Rules. The communication service available to a VFR flight depends on the airspace, the aerodrome, and the local procedure. A request for information does not automatically create a controlled flight or guarantee separation from other traffic.',
    sections: [
      { title: 'Know the airspace and service', paragraphs: ['Before flight, use current charts to identify the airspace along the route, its vertical limits, and the frequency or clearance requirements. Controlled airspace may require an explicit clearance before entry. Other areas may provide flight information, traffic information, or an aerodrome information service.', 'Use the words that describe the service actually provided. A controller may issue an instruction or clearance in controlled airspace; an information service may pass traffic or weather information. The pilot remains responsible for complying with the applicable VFR rules and maintaining awareness.'] },
      { title: 'Position reports that help', paragraphs: ['A useful VFR call normally gives the station, callsign, aircraft type if useful, position, altitude, route or intention, and request. Use a charted reporting point or a clear geographic reference. Avoid vague positions such as “near the city” when a more precise distance and direction are available.', 'If you change your route, altitude, or destination in a way that affects the service you are receiving, advise the appropriate station when required. Keep your position current and make reports requested by ATC or the local procedure.'] },
      { title: 'Joining an aerodrome circuit', paragraphs: ['The aerodrome chart and local instructions define circuit direction, joining points, reporting points, and runway use. A circuit instruction tells you where to join and when to report. Repeat the runway and relevant circuit instruction so both sides know which pattern you intend to fly.', 'Do not assume that the runway in use, circuit direction, or landing order is unchanged from a previous visit. Listen to current information and follow the latest instruction. If you cannot safely comply with a requested join, say so and request an alternative.'] },
    ],
    examples: [
      { label: 'Request traffic information', speaker: 'PILOT', text: 'Brussels Information, OO-ABC, Cessna 172, 5 miles south of Antwerp, 2,000 feet, VFR to Leuven, request traffic information.' },
      { label: 'Join the circuit', speaker: 'ATC · TOWER', text: 'OO-ABC, join left-hand downwind runway 25, report downwind.' },
    ], takeaway: 'Know whether you have a clearance, an instruction, or an information service. They do not mean the same thing.',
  },
  {
    id: 'ifr', title: '8. IFR arrival & approach', kicker: 'CHAPTER 08 · INSTRUMENT FLIGHTS', heading: 'Follow the clearance and published procedure',
    intro: 'IFR communication may include an ATC route clearance, departure instructions, climb and descent clearances, standard arrival procedures, holding instructions, and approach clearances. A clearance and a charted procedure work together; neither should be interpreted from memory when the current chart is available.',
    sections: [
      { title: 'Departure and route clearance', paragraphs: ['An IFR clearance can specify the clearance limit, route, initial altitude or level, departure procedure, runway, transponder code, and other instructions. Write it down and read back the route and safety-related items. If a route or fix is unfamiliar, ask for clarification before departure.', 'A published SID may be part of the clearance, but the exact procedure and any restrictions must be checked on the current chart. If ATC changes a route or level, identify what portion is changed and what remains in effect. Do not assume a previous clearance still applies unchanged.'] },
      { title: 'Arrival and holding instructions', paragraphs: ['A STAR or other arrival procedure provides a published route into the terminal area. ATC may clear you to follow the procedure and may add or amend altitude, speed, or route instructions. Keep the chart open and note any amended part so you do not inadvertently follow a superseded restriction.', 'Holding instructions can include a fix, inbound track, turn direction, leg timing or distance, and expected further clearance time. Read back the details carefully. If you miss any element, request it again rather than reconstructing the hold from partial information.'] },
      { title: 'Approach is not landing', paragraphs: ['An approach clearance authorizes the specified instrument approach under its conditions. It is not a landing clearance. Tower issues landing clearance separately when appropriate. If you have not received a landing clearance, follow the applicable published procedure and contact ATC as required.', 'A missed approach is a planned part of an instrument approach. Know the published missed-approach instructions before commencing the approach. If ATC issues a different instruction, read it back and apply it only when it is safe and clear.'] },
    ],
    examples: [
      { label: 'IFR departure clearance', speaker: 'ATC · DELIVERY', text: 'OO-ABC, cleared to Brussels via the LNO 2A departure, runway 25, squawk 4621.' },
      { label: 'Holding instruction', speaker: 'ATC · APPROACH', text: 'OO-ABC, hold at Nicky, inbound track 270, right turns, expect further clearance at 1420.' },
      { label: 'Approach clearance', speaker: 'ATC · APPROACH', text: 'OO-ABC, cleared ILS approach runway 25.' },
    ], takeaway: 'Use the current chart, read back changes, and keep approach clearance distinct from landing clearance.',
  },
  {
    id: 'abnormal', title: '9. Abnormal situations', kicker: 'CHAPTER 09 · WHEN THINGS CHANGE', heading: 'Communicate clearly when the plan changes',
    intro: 'When a situation does not fit routine phraseology, communicate the essential facts clearly. State who you are, what has happened, where you are, what you intend to do, and what assistance you need. Aviate first and use the aircraft procedures and training appropriate to the situation.',
    sections: [
      { title: 'Ask for help or a repeat', paragraphs: ['You may ask the controller to repeat a message, speak more slowly, or clarify a specific item. Identify the unclear detail rather than guessing. If you have misunderstood an instruction, say so promptly and ask for it again.', 'If you cannot comply, use “unable” and give a short reason. A controller can only help solve a problem they know about. Keep the message factual and concise, and give additional detail when requested or when it changes the assistance required.'] },
      { title: 'Urgency and distress', paragraphs: ['“Pan-Pan” is used for an urgency situation concerning the safety of an aircraft or person that does not require immediate assistance. “Mayday” is used for distress involving grave and imminent danger and requiring immediate assistance. Use the appropriate call and repeat it as needed to attract attention.', 'After the call, state the station if known, callsign, nature of the problem, position and altitude, intentions, and assistance needed. If workload or the situation prevents a complete message, start with the most important information and continue when able.'] },
      { title: 'Radio communication failure', paragraphs: ['If two-way radio communication fails, use the approved procedure for the flight rules, airspace, and jurisdiction. Check audio selection and frequency only when it is safe to do so. Use the prescribed transponder indication if applicable and continue with the published lost-communications procedure.', 'The correct route, altitude, approach, and landing action depend on whether the flight is VFR or IFR and on local rules. This course gives general communication concepts only; it cannot replace current official procedures, aircraft checklists, or instruction from a qualified instructor.'] },
    ],
    examples: [
      { label: 'Ask for repetition', speaker: 'PILOT', text: 'Brussels Approach, OO-ABC, say again last transmission.' },
      { label: 'Unable to comply', speaker: 'PILOT', text: 'Brussels Approach, OO-ABC, unable descent due icing, request maintain 4,000 feet.' },
      { label: 'Urgency call', speaker: 'PILOT', text: 'Pan-Pan, Pan-Pan, Pan-Pan, Brussels Approach, OO-ABC, engine roughness, 8 miles north of Antwerp, 2,000 feet, request priority landing.' },
      { label: 'Distress call', speaker: 'PILOT', text: 'Mayday, Mayday, Mayday, Brussels Approach, OO-ABC, engine failure, 5 miles south of Antwerp, 1,500 feet, forced landing field in sight.' },
    ], takeaway: 'Be direct, state what you need, and use the approved emergency procedures for the aircraft and jurisdiction.',
  },
];

function Example({ label, text, speaker }) {
  return <div className="document-example"><div><span className="example-label">{speaker}</span><p>{text}</p></div><button className="listen-example" data-speech={text} aria-label={`Listen to: ${text}`}><span>▶</span> Listen</button><small>{label}</small></div>;
}

export default async function CoursePage() {
  const supabase = await createClient();
  const { data: { user } = {} } = supabase ? await supabase.auth.getUser() : { data: {} };
  const progress = await getCourseProgress(supabase, user?.id);
  const lessonBySlug = Object.fromEntries(progress.lessons.map((lesson) => [lesson.slug, lesson]));
  return <div className="page-wrap route-page course-page">
    <div className="eyebrow"><span className="live-dot" /> ATC RADIO COMMUNICATIONS · BEGINNER COURSE</div>
    <div className="route-heading"><div><h1>Air traffic control, from the beginning</h1><p>A guided reference for understanding who you call, what you hear, and what to say across a flight.</p></div></div>
    {progress.total === 0 && <div className="course-setup-notice"><strong>Course progress is not set up yet.</strong><span>In Supabase SQL Editor, run <code>supabase/migrations/202610270002_seed_atc_course.sql</code>. This registers the course chapters as lessons so they can be saved to your account.</span></div>}
    <div className="course-doc-layout">
      <nav className="course-index" aria-label="Course contents"><div className="eyebrow">ON THIS PAGE</div><div className="course-progress-summary">{progress.completed} of {progress.total} lessons complete</div><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div>{chapters.map((chapter) => <a href={`#${chapter.id}`} className="course-index-link" key={chapter.id}><span>{chapter.title}</span>{progress.statusBySlug[chapter.id] === 'completed' && <span className="index-complete" aria-label="Completed">✓</span>}</a>)}<a className="alphabet-index-link" href="/alphabet">NATO alphabet trainer ↗</a></nav>
      <article className="course-document">
        {chapters.map((chapter, index) => {
          const lessonId = lessonBySlug[chapter.id]?.id;
          return <section id={chapter.id} className={`doc-section ${index === 0 ? 'intro-section' : ''}`} key={chapter.id}>
            <div className="doc-section-top"><div><div className="doc-kicker">{chapter.kicker}</div><h2>{chapter.heading}</h2></div><LessonProgressControl lessonId={lessonId} initialStatus={progress.statusBySlug[chapter.id]} /></div>
            <p className="chapter-intro">{chapter.intro}</p>
            {chapter.sections.map((subsection) => <div className="doc-subsection" key={subsection.title}><h3>{subsection.title}</h3>{subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{subsection.bullets && <ul>{subsection.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>)}
            {chapter.examples.length > 0 && <div className="chapter-examples"><div className="eyebrow">HEAR IT IN CONTEXT</div>{chapter.examples.map((example) => <Example key={example.label} {...example} />)}</div>}
            <div className="doc-callout"><strong>Key idea</strong><p>{chapter.takeaway}</p></div>
          </section>;
        })}
        <section className="doc-section next-learning"><div className="doc-kicker">NEXT · OPTIONAL PRACTICE</div><h2>Review, listen, and practise</h2><p>Use the alphabet trainer and optional exercises to revisit the topics you have learned. Progress through each chapter at your own pace.</p><div className="next-links"><a href="/alphabet">Learn the NATO spelling alphabet <span>↗</span></a><a href="/practice">Go to listening and speaking practice <span>↗</span></a></div></section>
        <div className="source-note">Reference basis: <a href="https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-standardised-european?erules-id=ERULES-1963177438-9888" target="_blank" rel="noreferrer">EASA Standardised European Rules of the Air (SERA)</a> and <a href="https://www.icao.int/personnel-licensing-faq" target="_blank" rel="noreferrer">ICAO phraseology guidance</a>. Examples are illustrative and are not operational clearances. Procedures vary by country and aerodrome; always use current official publications and qualified instruction.
        </div>
      </article>
    </div>
  </div>;
}
