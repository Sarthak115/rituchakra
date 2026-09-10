import type { Expression } from '@/lib/story/types';
export function CharacterExpression({ expression, blinking }: { expression: Expression; blinking: boolean }) {
  const worried = expression === 'concerned' || expression === 'confused';
  const smile = expression === 'happy' || expression === 'relieved';
  const surprise = expression === 'surprised';
  return <g className={`face expression-${expression}`}>
    <g className="brows" fill="none" stroke="#402d2c" strokeWidth="3.5" strokeLinecap="round">
      <path d={worried ? 'M93 94 Q103 94 112 88' : surprise ? 'M93 87 Q102 81 113 86' : 'M93 92 Q103 88 113 92'} />
      <path d={worried ? 'M135 88 Q145 94 155 94' : surprise ? 'M135 86 Q145 81 155 87' : 'M135 92 Q145 88 155 92'} />
    </g>
    <g className={`eyes ${blinking ? 'blink' : ''}`}>
      <ellipse cx="104" cy="105" rx="8.5" ry={surprise ? 12 : 9} fill="#fff8e8" />
      <ellipse cx="145" cy="105" rx="8.5" ry={surprise ? 12 : 9} fill="#fff8e8" />
      <g className="pupils" fill="#302728"><ellipse cx="105" cy="106" rx="4.7" ry="6.8"/><ellipse cx="144" cy="106" rx="4.7" ry="6.8"/></g>
      <g fill="white"><circle cx="106" cy="103" r="1.8"/><circle cx="145" cy="103" r="1.8"/></g>
    </g>
    <path d="M125 105 L121 121 Q125 124 129 121" fill="none" stroke="#b87552" strokeWidth="2" strokeLinecap="round"/>
    <g fill="#d58068" opacity=".42"><ellipse cx="92" cy="124" rx="11" ry="5"/><ellipse cx="155" cy="124" rx="11" ry="5"/></g>
    <g className="mouth-rest">
      {surprise ? <ellipse cx="125" cy="137" rx="5" ry="7" fill="#743f3d"/> : <path d={smile ? 'M113 134 Q125 151 138 134 Q125 140 113 134' : worried ? 'M115 140 Q125 132 135 140' : 'M115 136 Q125 141 135 135'} fill={smile ? '#7b403d' : 'none'} stroke="#7b403d" strokeWidth="2.5" strokeLinecap="round"/>}
    </g>
    <g className="mouth-talk"><ellipse cx="125" cy="138" rx="9" ry="6" fill="#733d3c"/><path d="M120 141 Q125 138 130 141" stroke="#e99789" strokeWidth="3" strokeLinecap="round"/></g>
  </g>;
}
