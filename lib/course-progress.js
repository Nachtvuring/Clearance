export const COURSE_SLUG = 'atc-radio-communications';

export async function getCourseProgress(supabase, userId) {
  const empty = { lessons: [], statusBySlug: {}, completed: 0, total: 0, percent: 0 };
  if (!supabase || !userId) return empty;
  const { data: course } = await supabase.from('courses')
    .select('id, modules(id, sort_order, lessons(id, slug, title, sort_order, user_lesson_progress(status)))')
    .eq('slug', COURSE_SLUG)
    .maybeSingle();
  if (!course) return empty;
  const lessons = (course.modules || [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .flatMap((module) => module.lessons || [])
    .sort((a, b) => a.sort_order - b.sort_order);
  if (!lessons.length) return empty;
  const statusBySlug = Object.fromEntries(lessons.map((lesson) => [lesson.slug, lesson.user_lesson_progress?.[0]?.status || 'not_started']));
  const completed = Object.values(statusBySlug).filter((status) => status === 'completed').length;
  return { lessons, statusBySlug, completed, total: lessons.length, percent: Math.round((completed / lessons.length) * 100) };
}
