import { useLanguage } from '@/lib/useLanguage';
export function StoryProgress({ step, school = false }: { step: number; school?: boolean }) {
  const { t, copy: en } = useLanguage();
  const stages = school ? ['Notice', 'Support', 'See their side', 'Reflect', 'Evidence'].map(t) : en.stage;
  return <ol className="story-progress" aria-label={t('Story progress')}>{stages.map((label, i) => <li key={label} className={i <= step ? 'reached' : ''} aria-current={i === step ? 'step' : undefined}><span className="progress-dot">{i < step ? '✓' : i + 1}</span><span>{label}</span></li>)}</ol>;
}
