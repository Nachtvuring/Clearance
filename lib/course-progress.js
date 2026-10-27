export const COURSE_SLUG = 'atc-radio-communications';

export async function getCourseProgress(supabase, userId) {
  const empty = { lessons: [], statusBySlug: {}, completed: 0, total: 0, percent: 0 };
  if (!supabase || !userId) return empty;
  const { data: course } = await supabase.from('courses').select('id').eq('slug', COURSE_SLUG).maybeSingle();
  if (!course) return empty;
  const { data: modules } = await supabase.from('modules').select('id').eq('course_id', course.id);
  const moduleIds = (modules || []).map((module) => module.id);
  if (!moduleIds.length) return empty;
  const { data: lessons } = await supabase.from('lessons').select('id, slug, title, sort_order').in('module_id', moduleIds).order('sort_order');
  if (!lessons?.length) return empty;
  const { data: progress } = await supabase.from('user_lesson_progress').select('lesson_id, status').eq('user_id', userId).in('lesson_id', lessons.map((lesson) => lesson.id));
  const statusById = Object.fromEntries((progress || []).map((row) => [row.lesson_id, row.status]));
  const statusBySlug = Object.fromEntries(lessons.map((lesson) => [lesson.slug, statusById[lesson.id] || 'not_started']));
  const completed = Object.values(statusBySlug).filter((status) => status === 'completed').length;
  return { lessons, statusBySlug, completed, total: lessons.length, percent: Math.round((completed / lessons.length) * 100) };
}
