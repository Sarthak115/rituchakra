'use client';
import { useCallback } from 'react';
import { useProgress } from './story/useProgress';
import { translate } from '@/data/translations';
import { en } from '@/data/translations/en';
export function useLanguage() {
  const { progress } = useProgress();
  const language = progress.language;
  const t = useCallback((text: string) => translate(text, language), [language]);
  const copy = { ...en, brand: en.brand, tagline: t(en.tagline), chapter: t(en.chapter), subtitle: t(en.subtitle), companion: t(en.companion), restart: t(en.restart), finish: t(en.finish), continue: t(en.continue), choose: t(en.choose), chooseHint: t(en.chooseHint), context: t(en.context), footer: t(en.footer), stage: en.stage.map(t) };
  return { language, t, copy };
}
