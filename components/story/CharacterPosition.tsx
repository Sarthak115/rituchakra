import { Character, type CharacterProps } from '@/components/characters/Character';
export function CharacterPosition({ position, active, ...props }: CharacterProps & { position: 'left' | 'right' | 'center'; active: boolean }) {
  return <div className={`character-position position-${position} ${active ? 'is-speaking' : 'is-listening'}`}><Character {...props}/><span className="character-name">{props.character === 'dadi' ? 'Dadi' : props.character === 'aara' ? 'Aara' : 'Aarav'}{active && <span className="speaking-mark" aria-hidden="true"><i/><i/><i/></span>}</span></div>;
}
