'use client';
import { useLanguage } from '@/lib/useLanguage';
import { useEffect, useState } from 'react';
import type { Animation, CharacterId, Expression } from '@/lib/story/types';
import { CharacterExpression } from './CharacterExpression';
export interface CharacterProps { character: CharacterId; expression?: Expression; animation?: Animation; className?: string; }
export function Character({ character, expression = 'idle', animation = 'idle', className = '' }: CharacterProps) {
  const { t } = useLanguage();
  const [blinking, setBlinking] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>; let closed = false;
    const tick = () => { closed = !closed; setBlinking(closed); timer = setTimeout(tick, closed ? 140 : 2700 + Math.random() * 3400); };
    timer = setTimeout(tick, 1800 + Math.random() * 2700);
    return () => clearTimeout(timer);
  }, []);
  const dadi = character === 'dadi', aara = character === 'aara';
  const skin = dadi ? '#c68d66' : aara ? '#dba075' : '#cb9068';
  return <svg viewBox="0 0 250 410" role="img" aria-label={`${character}, ${t(expression)}${animation === 'talking' ? `, ${t('speaking')}` : ''}`} className={`character character-${character} anim-${animation} mood-${expression} ${className}`}>
    <ellipse cx="126" cy="395" rx="65" ry="9" fill="#694e3b" opacity=".13"/>
    <g className="character-body">
      {!dadi && <g><path d="M92 285 L90 370 Q100 380 113 371 L124 302 L135 371 Q147 380 158 371 L155 283" fill={aara ? '#ead7b1' : '#485d68'}/><path d="M89 366 L86 389 Q101 397 118 389 L114 368 M136 368 L133 389 Q152 397 168 389 L158 368" fill={aara ? '#a24e39' : '#e9c595'} stroke="#574037" strokeWidth="2"/></g>}
      {dadi ? <><path d="M85 163 Q60 193 67 259 L59 375 Q126 405 183 374 L176 252 Q181 194 159 164Z" fill="#a64c4e" stroke="#743e42" strokeWidth="2"/><path d="M151 163 Q146 220 72 287 L60 372 L86 382 Q130 277 176 215 L169 173Z" fill="#efd2a0"/><path d="M157 169 Q149 228 79 292 L68 374" fill="none" stroke="#d89a53" strokeWidth="7"/><path d="M103 274 L94 376 M126 270 L124 383 M148 265 L156 378" stroke="#863f46" strokeWidth="2" fill="none"/><path d="M77 382 L72 394 L107 395 L109 384 M143 384 L144 396 L176 392 L168 380" fill="#65413b"/></> : <><path d="M94 163 Q77 165 65 192 L80 213 L86 292 Q125 308 165 291 L169 213 L185 194 Q174 169 151 163Z" fill={aara ? '#478a78' : '#d79445'} stroke={aara ? '#316456' : '#ac6b35'} strokeWidth="2"/><path d="M107 166 Q125 184 143 166" stroke={aara ? '#e3d5a3' : '#f5d9a3'} strokeWidth="5" fill="none"/>{aara ? <g stroke="#dfcf93" strokeWidth="2"><path d="M120 190 L125 183 L130 190 L125 197Z M120 225 L125 218 L130 225 L125 232Z M98 251 L103 244 L108 251 L103 258Z M140 251 L145 244 L150 251 L145 258Z" fill="none"/><path d="M89 283 Q126 293 162 283"/></g> : <><path d="M89 210 L162 210 M87 221 L163 221" stroke="#edbe75" strokeWidth="4"/><path d="M142 231 L158 231 L157 248 L150 252 L143 248Z" fill="#be793a"/><circle cx="126" cy="189" r="2" fill="#725331"/></>}</>}
      <g className="arm arm-left"><path d={dadi ? 'M80 179 Q65 181 61 202 L50 247 Q48 260 59 266 Q71 268 77 253 L94 202' : 'M73 195 L62 249 Q60 262 69 266 Q79 270 83 257 L91 210'} fill={skin} stroke="#a16a4e" strokeWidth="2"/>{dadi && <path d="M77 174 Q60 180 56 205 L84 218 L96 187" fill="#a64c4e"/>}<path d="M62 248 L77 253" stroke="#d9ad53" strokeWidth="5" strokeLinecap="round"/></g>
      <g className="arm arm-right"><path d={dadi ? 'M164 188 Q181 187 185 207 L192 251 Q194 265 183 268 Q172 269 169 253 L154 209' : 'M173 196 L190 246 Q195 260 185 265 Q175 269 169 253 L158 211'} fill={skin} stroke="#a16a4e" strokeWidth="2"/>{dadi && <path d="M164 175 Q185 183 188 207 L162 218 L151 191" fill="#a64c4e"/>}<path d="M173 251 L189 247" stroke="#d9ad53" strokeWidth="4" strokeLinecap="round"/></g>
      <path d="M111 145 L108 169 Q125 182 143 168 L138 145" fill={skin}/>
      <g className="head">
        {dadi ? <><ellipse cx="171" cy="71" rx="24" ry="26" fill="#686060"/><path d="M76 114 Q62 45 112 39 Q165 26 178 77 L172 124" fill="#7c7470"/></> : aara ? <><path d="M76 114 Q62 47 111 38 Q172 25 181 81 L175 161 L153 174 L84 163Z" fill="#352e2d"/><path d="M77 99 Q49 134 69 196 Q82 209 91 197 L85 113 M170 96 Q195 125 181 187 Q173 204 160 197 L161 118" fill="#352e2d"/><path d="M69 157 L86 159 M164 157 L182 154" stroke="#d88c57" strokeWidth="7"/></> : <path d="M74 117 Q65 85 74 64 L67 62 L84 52 L79 42 Q101 46 109 35 Q166 30 177 63 L178 114Z" fill="#352e2d"/>}
        <ellipse cx="78" cy="112" rx="9" ry="15" fill={skin}/><ellipse cx="171" cy="112" rx="9" ry="15" fill={skin}/>
        <path d="M79 82 Q85 56 124 57 Q165 57 171 84 L168 125 Q160 158 125 164 Q90 158 81 129Z" fill={skin} stroke="#a36e52" strokeWidth="1.5"/>
        {dadi ? <><path d="M77 89 Q100 84 125 56 Q148 86 174 89 L170 62 Q127 27 85 58Z" fill="#827976"/><path d="M84 75 Q108 66 121 50 M137 50 Q151 68 167 75" stroke="#c2b4a5" strokeWidth="3" fill="none"/><circle cx="125" cy="89" r="3.5" fill="#923c37"/></> : aara ? <><path d="M77 91 Q79 48 124 48 Q169 48 175 85 Q147 85 137 62 Q116 88 77 91" fill="#352e2d"/><path d="M87 74 Q107 69 118 57" stroke="#584139" strokeWidth="4" fill="none"/><path d="M160 74 L171 79" stroke="#e5ba57" strokeWidth="5" strokeLinecap="round"/></> : <><path d="M76 90 L77 65 Q92 45 114 49 Q146 35 170 65 L175 92 L160 77 L157 65 Q128 83 95 74 L83 98Z" fill="#352e2d"/><path d="M89 65 Q124 66 145 49" stroke="#574039" strokeWidth="4" fill="none"/></>}
        <CharacterExpression expression={expression} blinking={blinking}/>
        {dadi && <g fill="none" stroke="#66534c" strokeWidth="2"><rect x="89" y="97" width="29" height="22" rx="9"/><rect x="132" y="97" width="29" height="22" rx="9"/><path d="M118 105 Q125 100 132 105 M89 103 L79 99 M161 103 L171 99 M92 133 L102 135 M148 135 L157 131"/><path d="M103 82 L115 81 M133 81 L145 83" opacity=".5"/></g>}
        {(aara || dadi) && <g fill="#e9ba54" stroke="#aa7e35" strokeWidth="1.5"><circle cx="78" cy="127" r={dadi ? 5 : 3}/><circle cx="171" cy="127" r={dadi ? 5 : 3}/></g>}
      </g>
    </g>
  </svg>;
}
