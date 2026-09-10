import { ArrowRight, Microscope } from 'lucide-react';
import type { ScienceCheckContent } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
export function ScienceCheck({ content, onContinue, experienced = false }: { content: ScienceCheckContent; onContinue: () => void; experienced?: boolean }) {
  const { t } = useLanguage();
  return <section className="science-check" aria-labelledby="science-heading">
    <div className="science-title"><Microscope size={25} strokeWidth={1.5}/><h2 id="science-heading">{t('Science Check')}</h2><span>{t('Let’s look together')}</span></div>
    <div className="science-cards">
      <div className="science-heard"><h3>{t(experienced ? 'What we heard / experienced' : 'What we heard')}</h3><p>“{content.belief}”</p></div>
      <div className="science-evidence"><h3>{t('What evidence says')}</h3><p>{content.evidence}</p></div>
    </div>
    <div className="science-remember"><h3>{t('Remember')}</h3><p>{content.takeaway}</p></div>
    <div className="science-bottom"><div className="science-sources">{t('Sources')}: {content.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title}</a>)}</div><button className="continue-button" onClick={onContinue}>{t('Back to the conversation')}<ArrowRight size={17}/></button></div>
  </section>;
}
