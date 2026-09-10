import { en } from '@/data/translations/en';
export function StoryProgress({ step }: { step: number }) {
  return <ol className="story-progress" aria-label="Story progress">{en.stage.map((label, i) => <li key={label} className={i <= step ? 'reached' : ''} aria-current={i === step ? 'step' : undefined}><span className="progress-dot">{i < step ? '✓' : i + 1}</span><span>{label}</span></li>)}</ol>;
}
