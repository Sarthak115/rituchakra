'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/useLanguage';
import { updateProgress } from '@/lib/story/useProgress';
import type { Language } from '@/data/translations';
export function LanguageSelector() {
  const { language, t } = useLanguage();
  return <Select value={language} onValueChange={value => updateProgress(current => ({ ...current, language: value as Language }))}>
    <SelectTrigger className="language-trigger" aria-label={t('Language')}><SelectValue/></SelectTrigger>
    <SelectContent className="language-options" position="popper"><SelectItem value="en">English</SelectItem><SelectItem value="hi"><span lang="hi">हिन्दी</span></SelectItem><SelectItem value="or"><span lang="or">ଓଡ଼ିଆ</span></SelectItem></SelectContent>
  </Select>;
}
