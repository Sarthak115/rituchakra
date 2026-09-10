import { ArrowUpRight } from 'lucide-react';
import type { Choice } from '@/lib/story/types';
export function ChoiceButton({ choice, index, selected, disabled, onSelect }: { choice: Choice; index: number; selected: string | null; disabled: boolean; onSelect: () => void }) {
  return <button className={`choice-button ${selected === choice.id ? 'selected' : ''} ${selected && selected !== choice.id ? 'unselected' : ''}`} style={{ animationDelay: `${index * 80}ms` }} onClick={onSelect} disabled={disabled}>
    <span className="choice-number">{String(index + 1).padStart(2, '0')}</span><span><strong lang="hi-Latn">{choice.text}</strong><small>{choice.translation}</small></span><ArrowUpRight size={20}/>
  </button>;
}
