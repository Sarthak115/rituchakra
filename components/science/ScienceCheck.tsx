import { ArrowRight, ExternalLink, Landmark, Microscope } from 'lucide-react';
import * as m from 'motion/react-m';
import type { ScienceCheckContent } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';

// Reveal order: what we heard → the evidence (the "reveal") → culture note → takeaway and sources.
const step = (delay: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.4 } });
const sourceOrg = (title: string) => title.includes(':') ? title.split(':')[0] : '';
const sourceName = (title: string) => title.includes(':') ? title.slice(title.indexOf(':') + 1).trim() : title;

export function ScienceCheck({ content, onContinue, experienced = false, automatic = false }: { content: ScienceCheckContent; onContinue: () => void; experienced?: boolean; automatic?: boolean }) {
  const { t } = useLanguage();
  return <section className="science-check" aria-labelledby="science-heading">
    <m.div className="science-title" {...step(0)}><Microscope size={25} strokeWidth={1.5}/><h2 id="science-heading">{t('Science Check')}</h2><span>{t('Let’s look together')}</span></m.div>
    <div className="science-cards">
      <m.div className="science-heard" {...step(0.1)}><h3>{t(experienced ? 'What we heard / experienced' : 'What we heard')}</h3><p>“{content.belief}”</p></m.div>
      <m.div className="science-evidence" initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.55, type: 'spring', stiffness: 140, damping: 16 }}><h3>{t('What evidence says')}</h3><p>{content.evidence}</p></m.div>
    </div>
    {content.cultureNote && <m.div className="science-culture" {...step(0.95)}><Landmark size={20} strokeWidth={1.5}/><div><h3>{t('Culture & tradition')}</h3><p>{content.cultureNote}</p></div></m.div>}
    <m.div className="science-remember" {...step(1.15)}><h3>{t('Remember')}</h3><p>{content.takeaway}</p></m.div>
    <m.div className="science-bottom" {...step(1.3)}>
      <div className="science-sources"><h3>{t('Source')}</h3>{content.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{sourceOrg(source.title) && <b>{sourceOrg(source.title)}</b>}{sourceName(source.title)}<ExternalLink size={13}/></a>)}</div>
      {!automatic && <button className="continue-button" onClick={onContinue}>{t('Back to the conversation')}<ArrowRight size={17}/></button>}
    </m.div>
  </section>;
}
