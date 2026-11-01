import { ArrowLeft, Flower2, MessageCircleQuestion, RotateCcw, School, Undo2 } from 'lucide-react';
import * as m from 'motion/react-m';
import { skills } from '@/data/skills';
import type { SkillValues, Story } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
export function StoryCompletion({ values, onReplay, onRewind, story }: { values: SkillValues; onReplay: () => void; onRewind?: () => void; story: Story }) {
  const { t } = useLanguage();
  const school = story.setting !== undefined && story.setting !== 'home';
  return <section className="story-completion" aria-labelledby="complete-heading">
    <Flower2 className="completion-flower" size={34} strokeWidth={1.4}/><p className="eyebrow">{story.world} · {t('Story complete')}</p>
    {story.reflection ? <m.div className="reflection-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <span className="eyebrow"><MessageCircleQuestion size={15}/>{t('Think about it')}</span>
      <h2 id="complete-heading">{story.reflection}</h2>
      <p>{t('Think quietly, or talk about it with someone next to you. There is no wrong answer.')}</p>
    </m.div> : <h2 id="complete-heading">{t('Story Complete')}</h2>}
    <div className="completion-actions">
      {onRewind && <button className="primary-button" onClick={onRewind}><Undo2 size={16}/>{t('Try another choice')}</button>}
      <button className="secondary-button" onClick={onReplay}><RotateCcw size={16}/>{t('Replay story')}</button>
    </div>
    <p className="completion-subtitle">{t('You didn’t just learn the answer.')}<br/>{t('You learned how to handle the conversation.')}</p>
    <div className="completion-skills">{skills.map(({ id, name, meaning, icon: Icon }) => <div key={id} className="completion-skill"><Icon size={21} strokeWidth={1.5}/><strong>{values[id]}</strong><h3>{t(name)}</h3><span>{t(meaning)}</span></div>)}</div>
    <p className="skill-explanation">{t('Journey points earned through your choices. Prototype values, not a test score. Replaying keeps your earned points.')}</p>
    <div className="completion-next"><School size={23} strokeWidth={1.4}/><div><h3>{t('What’s next?')}</h3><p>{t(school ? 'Explore another conversation.' : 'Try a school situation next.')}</p>{!school && <a href="/vidyalaya">{t('Vidyalaya')} · {t('Available')}</a>}</div></div>
    <div className="completion-actions"><a className="completion-replay" href="/"><ArrowLeft size={16}/>{t(school ? 'See Your Journey' : 'Back to Story World')}</a></div>
  </section>;
}
