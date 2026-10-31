import { ArrowRight, ChevronsRight } from 'lucide-react';
import type { Dialogue } from '@/lib/story/types';
import { useLanguage } from '@/lib/useLanguage';
export function DialogueBox({ dialogue, speaker, count, onContinue, focusKey, passive = false, side, line }: { dialogue: Dialogue; speaker: string; count: number; onContinue: () => void; focusKey: string; passive?: boolean; side?: 'left' | 'right' | 'guest'; line?: [number, number] }) {
  const { t, copy: en } = useLanguage();
  const revealing = count < dialogue.text.length;
  const Caption = passive ? 'div' : 'button';
  return <section className="dialogue-box" data-side={side} aria-label={`${speaker} · ${t('Dialogue')}`}>
    <div className="dialogue-top"><span className="speaker-label">{speaker}</span>{line && <span className="dialogue-count">{line[0]} / {line[1]}</span>}</div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{speaker}: {dialogue.text} {dialogue.translation}</p>
    <Caption key={focusKey} className="dialogue-text" onClick={passive ? undefined : onContinue} aria-label={passive ? undefined : revealing ? en.finish : en.continue}>
      <span className="dialogue-quote" aria-hidden="true">“{dialogue.text.slice(0, count)}{revealing && <span className="cursor"/>}{!revealing && '”'}</span>
      {dialogue.translation && <span className="translation" aria-hidden="true">{dialogue.translation}</span>}
    </Caption>
    {!passive && <div className="dialogue-bottom">
      <span>{t(revealing ? 'Enter or tap to reveal' : 'Enter or tap to continue')}</span>
      <button className="continue-button" onClick={onContinue}>{revealing ? t('Reveal') : en.continue}{revealing ? <ChevronsRight size={17}/> : <ArrowRight size={17}/>}</button>
    </div>}
  </section>;
}
