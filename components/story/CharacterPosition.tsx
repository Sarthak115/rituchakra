import { Character, type CharacterProps } from '@/components/characters/Character';
// `active` = this character is speaking. Anyone else on stage during dialogue is a listener.
export function CharacterPosition({ position, active, dialogueActive = true, ...props }: CharacterProps & { position: 'left' | 'right' | 'center' | 'guest'; active: boolean; dialogueActive?: boolean }) {
  const state = !dialogueActive ? 'is-idle' : active ? 'is-speaking' : 'is-listening';
  return <div className={`character-position position-${position} ${state}`}>
    <span className="speaker-glow" aria-hidden="true"/>
    <Character facing={position === 'right' || position === 'guest' ? -1 : 1} listening={dialogueActive && !active} {...props}/>
    <span className="character-name">{props.character === 'dadi' ? 'Dadi' : props.character === 'aara' ? 'Aara' : 'Aarav'}{active && <span className="speaking-mark" aria-hidden="true"><i/><i/><i/></span>}</span>
  </div>;
}
