import type { Companion, Skill, SkillValues, Story, StoryState } from './types';
import { getChoice } from './engine';

export const skillKeys: Skill[] = ['gyaan', 'samvaad', 'saath', 'badlav'];
export const emptySkills = (): SkillValues => ({ gyaan: 0, samvaad: 0, saath: 0, badlav: 0 });
export interface StoryRecord { checkpoint?: StoryState; choiceAwarded: boolean; completed: boolean; }
// `classroom` = shared-screen mode (extra-large text, class vote). A device setting, not learner data.
export interface LearnerProgress { version: 1; language: 'en' | 'hi' | 'or'; companion: Companion; classroom?: boolean; skills: SkillValues; stories: Record<string, StoryRecord>; }
export const emptyProgress = (): LearnerProgress => ({ version: 1, language: 'en', companion: 'aara', skills: emptySkills(), stories: {} });
export function parseProgress(raw: string | null): LearnerProgress {
  const result = emptyProgress();
  try {
    const value = JSON.parse(raw ?? 'null');
    if (!value || value.version !== 1) return result;
    if (value.language === 'hi' || value.language === 'or') result.language = value.language;
    if (value.companion === 'aarav') result.companion = 'aarav';
    if (value.classroom === true) result.classroom = true;
    for (const key of skillKeys) if (Number.isFinite(value.skills?.[key])) result.skills[key] = Math.max(0, Math.min(100, Math.round(value.skills[key])));
    if (value.stories && typeof value.stories === 'object') for (const [id, entry] of Object.entries(value.stories)) {
      if (!entry || typeof entry !== 'object' || id === '__proto__') continue;
      const record = entry as StoryRecord;
      result.stories[id] = { checkpoint: record.checkpoint, choiceAwarded: record.choiceAwarded === true, completed: record.completed === true };
    }
  } catch { /* A damaged or older save starts a fresh local journey. */ }
  return result;
}

// Called on story transitions, never on renders. Replays retain the first earned rewards.
export function recordTransition(progress: LearnerProgress, story: Story, previous: StoryState, next: StoryState) {
  const record = { ...(progress.stories[story.id] ?? { choiceAwarded: false, completed: false }), checkpoint: next };
  const gains = emptySkills();
  if (previous.mode === 'science' && next.sceneId !== previous.sceneId && !record.choiceAwarded) {
    const choices = previous.choiceIds ?? (previous.choiceId ? [previous.choiceId] : []);
    for (const id of new Set(choices)) { const choice = getChoice(story, id); if (choice) for (const key of skillKeys) gains[key] += choice.skillImpact[key] ?? 0; }
    if (choices.length) record.choiceAwarded = true;
  }
  if (next.mode === 'end' && !record.completed) {
    for (const key of skillKeys) gains[key] += story.completionImpact?.[key] ?? 0;
    record.completed = true;
  }
  const skills = { ...progress.skills };
  for (const key of skillKeys) { skills[key] = Math.min(100, skills[key] + gains[key]); gains[key] = skills[key] - progress.skills[key]; }
  return { progress: { ...progress, skills, stories: { ...progress.stories, [story.id]: record } }, gains };
}

