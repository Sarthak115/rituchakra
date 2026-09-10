import { ArrowRight, ChevronsRight } from 'lucide-react';
import type { Dialogue } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
export function DialogueBox({ dialogue, speaker, count, onContinue, focusKey }: { dialogue: Dialogue; speaker: string; count: number; onContinue: () => void; focusKey: string }) {
  const { t, copy: en } = useLanguage();
  const revealing = count < dialogue.text.length;
  return <section className="dialogue-box" aria-label={`${speaker} · ${t('Dialogue')}`}>
    <div className="dialogue-top"><span className="speaker-label">{speaker}</span><span className="dialogue-dots" aria-hidden="true">•••</span></div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{speaker}: {dialogue.text} {dialogue.translation}</p>
    <button key={focusKey} className="dialogue-text" onClick={onContinue} aria-label={revealing ? en.finish : en.continue}>
      <span className="dialogue-quote"  aria-hidden="true">“{dialogue.text.slice(0, count)}{revealing && <span className="cursor"/>}{!revealing && '”'}</span>
      {dialogue.translation && <span className="translation" aria-hidden="true">{dialogue.translation}</span>}
    </button>
    <div className="dialogue-bottom"><span>{t(revealing ? 'Enter or tap to reveal' : 'Enter or tap to continue')}</span><button className="continue-button" onClick={onContinue}>{revealing ? t('Reveal') : en.continue}{revealing ? <ChevronsRight size={17}/> : <ArrowRight size={17}/>}</button></div>
  </section>;
}
