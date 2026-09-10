'use client';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useProgress, updateProgress } from '@/lib/story/useProgress';
import type { Companion } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
export function CompanionPicker() {
  const { copy: en } = useLanguage();
  const { progress, ready } = useProgress();
  return <fieldset className="companion-picker map-companion-picker"><legend>{en.companion}</legend><RadioGroup value={progress.companion} disabled={!ready} onValueChange={value => updateProgress(current => ({ ...current, companion: value as Companion }))} aria-label={en.companion} orientation="horizontal">{(['aara', 'aarav'] as Companion[]).map(c => <label key={c} className={progress.companion === c ? 'companion-option active' : 'companion-option'}><RadioGroupItem value={c} aria-label={en[c]}/><span className={`companion-seed ${c}`}/>{en[c]}</label>)}</RadioGroup></fieldset>;
}
