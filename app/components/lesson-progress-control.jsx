'use client';

import { useState, useTransition } from 'react';
import { saveLessonProgress } from '../course/actions';

export default function LessonProgressControl({ lessonId, initialStatus = 'not_started' }) {
  const [status, setStatus] = useState(initialStatus);
  const [message, setMessage] = useState('');
  const [pending, startTransition] = useTransition();
  if (!lessonId) return <span className="progress-setup-needed">Progress setup pending</span>;
  function save(nextStatus) {
    setMessage('');
    startTransition(async () => {
      const result = await saveLessonProgress(lessonId, nextStatus);
      if (result?.error) setMessage(result.error);
      else setStatus(nextStatus);
    });
  }
  return <div className="lesson-progress-control">
    {status === 'completed' ? <><span className="lesson-done">✓ Completed</span><button type="button" onClick={() => save('in_progress')} disabled={pending}>Review again</button></>
      : <><button type="button" onClick={() => save('in_progress')} disabled={pending || status === 'in_progress'}>{status === 'in_progress' ? 'In progress' : 'Start'}</button><button type="button" className="lesson-complete-button" onClick={() => save('completed')} disabled={pending}>{pending ? 'Saving…' : 'Complete'}</button></>}
    {message && <span className="lesson-progress-error" role="status">{message}</span>}
  </div>;
}
