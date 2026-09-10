import { ArrowRight, ChevronsRight } from 'lucide-react';
import type { Dialogue } from '@/lib/story/types';
import { en } from '@/data/translations/en';
export function DialogueBox({ dialogue, speaker, count, onContinue, focusKey }: { dialogue: Dialogue; speaker: string; count: number; onContinue: () => void; focusKey: string }) {
  const revealing = count < dialogue.text.length;
  return <section className="dialogue-box" aria-label={`${speaker}'s dialogue`}>
    <div className="dialogue-top"><span className="speaker-label">{speaker}</span><span className="dialogue-dots" aria-hidden="true">•••</span></div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{speaker}: {dialogue.text} {dialogue.translation}</p>
    <button key={focusKey} className="dialogue-text" onClick={onContinue} aria-label={revealing ? en.finish : en.continue}>
      <span className="dialogue-quote" lang="hi-Latn" aria-hidden="true">“{dialogue.text.slice(0, count)}{revealing && <span className="cursor"/>}{!revealing && '”'}</span>
      <span className="translation" aria-hidden="true">{dialogue.translation}</span>
    </button>
    <div className="dialogue-bottom"><span>Enter or tap to {revealing ? 'reveal' : 'continue'}</span><button className="continue-button" onClick={onContinue}>{revealing ? 'Reveal' : en.continue}{revealing ? <ChevronsRight size={17}/> : <ArrowRight size={17}/>}</button></div>
  </section>;
}
