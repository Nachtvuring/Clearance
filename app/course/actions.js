'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../../lib/supabase/server';

export async function saveLessonProgress(lessonId, status) {
  if (!lessonId || !['in_progress', 'completed'].includes(status)) return { error: 'Invalid lesson progress update.' };
  const supabase = await createClient();
  if (!supabase) return { error: 'Supabase is not configured.' };
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: 'Please log in to save your course progress.' };
  const { error } = await supabase.from('user_lesson_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    status,
    completed_at: status === 'completed' ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,lesson_id' });
  if (error) return { error: error.message };
  revalidatePath('/course');
  revalidatePath('/dashboard');
  revalidatePath('/profile');
  return { ok: true };
}
