'use client';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/useLanguage';
import { useProgress } from '@/lib/story/useProgress';
export function WorldProgress({ storyId }: { storyId: string }) {
  const { t } = useLanguage();
  const { progress } = useProgress();
  const complete = progress.stories[storyId]?.completed;
  return <span className="world-map-available">{complete ? <><Check size={14}/>{t('Story complete')}</> : <>{t('Available')}<ArrowRight size={15}/></>}</span>;
}
