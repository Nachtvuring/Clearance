let initialized = false;

export function initializeTraining() {
  if (initialized) return;
  initialized = true;

  const modal = document.querySelector('#exercise-modal');
  const modalTitle = document.querySelector('#modal-title');
  const modalKicker = document.querySelector('#modal-kicker');
  const exerciseContent = document.querySelector('#exercise-content');
  const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };

  function openExercise(mode) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    if (mode === 'lesson') renderLesson();
    if (mode === 'listen') renderListening();
    if (mode === 'quiz') renderQuiz();
    if (mode === 'speak') renderSpeaking();
  }

  function renderLesson() {
    modalKicker.textContent = 'MODULE 01 / LESSON 01';
    modalTitle.textContent = 'Your first transmission.';
    exerciseContent.innerHTML = `<div class="lesson-progress"><i class="on"></i><i></i><i></i></div><p class="micro-hint">Before you transmit, take a moment to listen and get ready. A clear call has three parts:</p><div class="transmission"><small>THE FIRST CALL</small><b>Who you’re calling</b> — the station you want, such as Ground or Tower.<br/><b>Who you are</b> — your callsign, spoken clearly.<br/><b>What you need</b> — your request or information.</div><p class="micro-hint">For example: “Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight.” Keep the message short and wait for the controller to reply before continuing.</p><button class="play-button" id="lesson-audio">▶ &nbsp; Hear the example</button><button class="primary-button" id="lesson-quiz">Check what you learned <span>→</span></button><div class="feedback" id="feedback" aria-live="polite"></div>`;
    document.querySelector('#lesson-audio').addEventListener('click', () => speak('Antwerp Ground, OO-ABC, Cessna 172, stand 4, request taxi for local flight.'));
    document.querySelector('#lesson-quiz').addEventListener('click', renderQuiz);
  }

  const listening = {
    text: 'Cessna 172, taxi to holding point runway 25 via taxiway Alpha. Hold short runway 25.',
    options: [
      'Taxi to runway 25 via Alpha, hold short runway 25.',
      'Taxi to runway 25 via Bravo, cross runway 25.',
      'Line up and wait runway 25 via Alpha.'
    ],
    correct: 0,
    explanation: 'Correct. The key instructions are taxi via Alpha and hold short of runway 25. A runway crossing always needs an explicit clearance.'
  };

  function renderListening() {
    modalKicker.textContent = 'PRACTICE ROOM / LISTENING';
    modalTitle.textContent = 'Hear it. Understand it.';
    exerciseContent.innerHTML = `<p class="micro-hint">Listen to the taxi instruction. Which readback matches what you heard?</p><button class="play-button" id="play-audio">▶ &nbsp; Play transmission</button><div class="answer-list">${listening.options.map((answer, i) => `<button class="answer-option" data-answer="${i}">${answer}</button>`).join('')}</div><div class="feedback" id="feedback" aria-live="polite"></div>`;
    document.querySelector('#play-audio').addEventListener('click', () => speak(listening.text));
    document.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
      document.querySelectorAll('[data-answer]').forEach((item) => item.classList.remove('correct', 'wrong'));
      const correct = Number(button.dataset.answer) === listening.correct;
      button.classList.add(correct ? 'correct' : 'wrong');
      document.querySelector('#feedback').textContent = correct ? listening.explanation : 'Not quite. Listen again for the taxiway and whether ATC said to hold short.';
    }));
  }

  function renderQuiz() {
    modalKicker.textContent = 'PRACTICE ROOM / QUICK QUIZ';
    modalTitle.textContent = 'One quick check.';
    const answers = ['The entire message exactly as heard', 'Only the callsign and your position', 'Runway designators and clearances that affect the runway'];
    exerciseContent.innerHTML = `<p class="micro-hint">Which instructions should a pilot always read back?</p><div class="answer-list">${answers.map((a, i) => `<button class="answer-option" data-answer="${i}">${a}</button>`).join('')}</div><div class="feedback" id="feedback" aria-live="polite"></div>`;
    document.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
      document.querySelectorAll('[data-answer]').forEach((item) => item.classList.remove('correct', 'wrong'));
      const correct = Number(button.dataset.answer) === 2;
      button.classList.add(correct ? 'correct' : 'wrong');
      document.querySelector('#feedback').textContent = correct ? 'That’s right. Always read back runway instructions and clearances, plus any other item ATC requests.' : 'Not quite. Focus on instructions that affect runway safety, including runway designators and clearances.';
    }));
  }

  function renderSpeaking() {
    modalKicker.textContent = 'PRACTICE ROOM / SPEAKING BETA';
    modalTitle.textContent = 'Make the call.';
    exerciseContent.innerHTML = `<div class="transmission"><small>ATC · GROUND</small>“Cessna 172, taxi to holding point runway 25 via taxiway Alpha. Hold short runway 25.”</div><button class="play-button" id="play-audio">▶ &nbsp; Listen to ATC</button><p class="micro-hint">Read back the taxi route and the hold short instruction. Record your response or type it below.</p><button class="record-button" id="record">● &nbsp; Start recording</button><input class="scenario-input" id="typed-response" placeholder="Type your readback here…" aria-label="Type your readback" /><button class="play-button" id="check-response">Check my readback</button><div class="transcript" id="transcript" aria-live="polite"></div><div class="feedback" id="feedback" aria-live="polite"></div>`;
    const record = document.querySelector('#record');
    const response = document.querySelector('#typed-response');
    const transcript = document.querySelector('#transcript');
    document.querySelector('#play-audio').addEventListener('click', () => speak('Cessna 172, taxi to holding point runway 25 via taxiway Alpha. Hold short runway 25.'));
    let recorder;
    let chunks = [];
    record.addEventListener('click', async () => {
      if (recorder?.state === 'recording') {
        recorder.stop();
        record.textContent = 'Transcribing…';
        return;
      }
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        transcript.textContent = 'Microphone recording is not supported here. Type your readback instead.';
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);
        chunks = [];
        recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
        recorder.onstop = async () => {
          stream.getTracks().forEach((track) => track.stop());
          const mimeType = recorder.mimeType || 'audio/webm';
          const extension = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'webm';
          const audio = new Blob(chunks, { type: mimeType });
          const form = new FormData();
          form.append('audio', audio, `pilot-readback.${extension}`);
          try {
            const result = await fetch('/api/elevenlabs/transcribe', { method: 'POST', body: form });
            const data = await result.json();
            if (!result.ok) throw new Error(data.error || 'Transcription failed');
            response.value = data.text || '';
            transcript.textContent = `ElevenLabs heard: “${response.value}”`;
          } catch (error) {
            transcript.textContent = error.message || 'Transcription failed. Type your readback instead.';
          } finally {
            record.classList.remove('recording');
            record.innerHTML = '● &nbsp; Record again';
          }
        };
        recorder.start();
        record.classList.add('recording');
        record.textContent = '■  Stop recording';
      } catch (error) {
        transcript.textContent = error.name === 'NotAllowedError' ? 'Allow microphone access to record a readback.' : 'Could not start the microphone. Type your readback instead.';
      }
    });
    document.querySelector('#check-response').addEventListener('click', () => {
      const text = response.value.toLowerCase();
      const route = /alpha/.test(text);
      const runway = /25|two five|two-five/.test(text);
      const hold = /hold short/.test(text);
      const feedback = document.querySelector('#feedback');
      if (route && runway && hold) feedback.textContent = 'Good readback. You included the taxiway, runway, and hold short instruction.';
      else {
        const missing = [!route && 'taxiway Alpha', !runway && 'runway 25', !hold && 'hold short'].filter(Boolean);
        feedback.textContent = `You have the start of it. Include ${missing.join(', ')} to complete this readback.`;
      }
    });
  }

  function speak(text, sourceButton = document.querySelector('#play-audio, #lesson-audio')) {
    const button = sourceButton;
    if (button) button.disabled = true;
    fetch('/api/elevenlabs/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'ElevenLabs audio could not be generated.');
      }
      return response.blob();
    }).then((blob) => {
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      audio.onerror = () => URL.revokeObjectURL(audioUrl);
      return audio.play();
    }).catch((error) => {
      const feedback = document.querySelector('#feedback');
      if (feedback) feedback.textContent = error.message;
      else {
        const notice = document.querySelector('#training-notice');
        if (notice) {
          notice.textContent = error.message;
          notice.classList.add('visible');
          clearTimeout(window.clearanceNoticeTimer);
          window.clearanceNoticeTimer = setTimeout(() => notice.classList.remove('visible'), 6000);
        }
      }
    }).finally(() => { if (button) button.disabled = false; });
  }

  document.addEventListener('click', (event) => {
    const audioTrigger = event.target.closest('[data-speech]');
    if (audioTrigger) speak(audioTrigger.dataset.speech, audioTrigger);
    const trigger = event.target.closest('[data-mode]');
    if (trigger) openExercise(trigger.dataset.mode);
    if (event.target.closest('#modal-close')) closeModal();
    if (event.target.closest('#start-lesson, #continue-lesson')) openExercise('lesson');
  });
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  document.addEventListener('click', (event) => {
    if (event.target.closest('#view-course')) window.location.assign('/course');
    const showModules = event.target.closest('#show-modules');
    if (!showModules) return;
    const button = showModules;
    const path = document.querySelector('.path-card');
    if (!path) return;
    if (path.querySelector('.extra-modules')) { path.querySelector('.extra-modules').remove(); button.innerHTML = 'Show all 6 modules <span>↓</span>'; return; }
    const extra = document.createElement('div');
    extra.className = 'extra-modules';
    extra.innerHTML = `<article class="module upcoming"><div class="module-marker">04</div><div class="module-body"><div class="module-kicker">MODULE 04 · LOCKED</div><h3>Departure & en route</h3><p>Frequency changes, handoffs, and staying ahead of the aircraft.</p><div class="lesson-pills"><span>3 lessons</span><span>·</span><span>16 min</span></div></div><span class="lock-icon">⌑</span></article><article class="module upcoming"><div class="module-marker">05</div><div class="module-body"><div class="module-kicker">MODULE 05 · LOCKED</div><h3>Arrival & approach</h3><p>Listen, prepare, and read back arrival instructions.</p><div class="lesson-pills"><span>3 lessons</span><span>·</span><span>19 min</span></div></div><span class="lock-icon">⌑</span></article><article class="module upcoming"><div class="module-marker">06</div><div class="module-body"><div class="module-kicker">MODULE 06 · LOCKED</div><h3>Real-world scenarios</h3><p>Put it all together in complete pilot–controller exchanges.</p><div class="lesson-pills"><span>4 lessons</span><span>·</span><span>25 min</span></div></div><span class="lock-icon">⌑</span></article>`;
    path.insertBefore(extra, button); button.innerHTML = 'Show fewer modules <span>↑</span>';
  });
}
