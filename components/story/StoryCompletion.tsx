import { ArrowLeft, Flower2, School } from 'lucide-react';
import { skills } from '@/data/skills';
import type { SkillValues, Story } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
export function StoryCompletion({ values, onReplay, story }: { values: SkillValues; onReplay: () => void; story: Story }) {
  const { t } = useLanguage();
  const school = story.setting !== undefined && story.setting !== 'home';
  return <section className="story-completion" aria-labelledby="complete-heading">
    <Flower2 className="completion-flower" size={34} strokeWidth={1.4}/><p className="eyebrow">{story.world} · {t('Story complete')}</p>
    <h2 id="complete-heading">{t('Story Complete')}</h2><p className="completion-subtitle">{t('You didn’t just learn the answer.')}<br/>{t('You learned how to handle the conversation.')}</p>
    <div className="completion-skills">{skills.map(({ id, name, meaning, icon: Icon }) => <div key={id} className="completion-skill"><Icon size={21} strokeWidth={1.5}/><strong>{values[id]}</strong><h3>{t(name)}</h3><span>{t(meaning)}</span></div>)}</div>
    <p className="skill-explanation">{t('Journey points earned through your choices. Prototype values, not a test score. Replaying keeps your earned points.')}</p>
    <div className="completion-next"><School size={23} strokeWidth={1.4}/><div><h3>{t('What’s next?')}</h3><p>{t(school ? 'Explore another conversation.' : 'Try a school situation next.')}</p>{!school && <a href="/vidyalaya">{t('Vidyalaya')} · {t('Available')}</a>}</div></div>
    <div className="completion-actions"><a className="primary-button" href="/"><ArrowLeft size={16}/>{t(school ? 'See Your Journey' : 'Back to Story World')}</a><button className="completion-replay" onClick={onReplay}>{t('Replay story')}</button></div>
  </section>;
}
