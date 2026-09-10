import { uiCopy, type Language } from './ui';
import { storyCopy } from './stories';
import type { Story } from '@/lib/story/types';
export type { Language } from './ui';
export const translations = { ...uiCopy, ...storyCopy };
export function translate(text: string, language: Language): string {
  if (language === 'en' || !text) return text;
  return translations[text]?.[language === 'hi' ? 0 : 1] ?? text;
}
export function localizeStory(story: Story, language: Language): Story {
  const t = (text: string) => translate(text, language);
  return { ...story, title: t(story.title), world: t(story.world), scenes: Object.fromEntries(Object.entries(story.scenes).map(([id, scene]) => [id, {
    ...scene, narrative: scene.narrative ? t(scene.narrative) : undefined,
    dialogue: scene.dialogue.map(line => ({ ...line, text: t(line.translation || line.text), translation: '' })),
    choices: scene.choices?.map(choice => ({ ...choice, text: t(choice.translation || choice.text), translation: '', consequence: t(choice.consequence) })),
    scienceCheck: scene.scienceCheck ? { ...scene.scienceCheck, belief: t(scene.scienceCheck.belief === 'Periods ke time kitchen mein nahi jaana chahiye.' ? 'You should not enter the kitchen during your period.' : scene.scienceCheck.belief), evidence: t(scene.scienceCheck.evidence), takeaway: t(scene.scienceCheck.takeaway), sources: scene.scienceCheck.sources.map(source => ({ ...source, title: t(source.title) })) } : undefined,
  }])) };
}
