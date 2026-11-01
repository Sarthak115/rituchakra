// Five original island illustrations (viewBox 200×150), one landmark per story world.
export type IslandKind = 'ghar' | 'school' | 'bazaar' | 'sakhi' | 'nagar';

function Base({ grass = '#9cc47a' }: { grass?: string }) {
  return <>
    <ellipse cx="100" cy="118" rx="98" ry="30" fill="#c9eee8" opacity=".7"/>
    <ellipse cx="100" cy="112" rx="88" ry="26" fill="#e6c48c"/>
    <ellipse cx="100" cy="108" rx="86" ry="24" fill="#f3dcab"/>
    <ellipse cx="100" cy="101" rx="72" ry="19" fill={grass}/>
    <ellipse cx="86" cy="97" rx="40" ry="9" fill="#fff" opacity=".12"/>
  </>;
}

const Palm = ({ x, s = 1 }: { x: number; s?: number }) => <g transform={`translate(${x} 100) scale(${s})`}>
  <path d="M0 0 Q-3 -22 3 -44" stroke="#9b6b45" strokeWidth="4" fill="none" strokeLinecap="round"/>
  <g fill="#5f9150"><path d="M3 -44 Q-14 -50 -22 -38 Q-9 -45 3 -42Z"/><path d="M3 -44 Q20 -52 27 -39 Q14 -46 3 -42Z"/><path d="M3 -44 Q-4 -60 -16 -58 Q-3 -55 2 -44Z"/><path d="M3 -44 Q12 -60 22 -55 Q9 -54 4 -44Z"/></g>
</g>;

export function IslandArt({ kind, done = false, locked = false }: { kind: IslandKind; done?: boolean; locked?: boolean }) {
  return <svg viewBox="0 0 200 150" className={`island-art ${locked ? 'is-locked' : ''}`} aria-hidden="true">
    <Base grass={kind === 'nagar' ? '#a9bf94' : undefined}/>
    {kind === 'ghar' && <g>
      <Palm x={46} s={.9}/>
      <path d="M72 100V68H128V100Z" fill="#f6e2b8" stroke="#c99a68" strokeWidth="1.5"/>
      <path d="M64 70L100 44L136 70Z" fill="#c4653f" stroke="#9c4a2c" strokeWidth="1.5"/>
      <path d="M93 100V82Q100 76 107 82V100Z" fill="#8a5a3c"/>
      <rect x="78" y="76" width="10" height="10" rx="2" fill="#7fb3c3" stroke="#c99a68"/><rect x="112" y="76" width="10" height="10" rx="2" fill="#7fb3c3" stroke="#c99a68"/>
      <path d="M140 100V92H150V100Z" fill="#c4653f"/><path d="M145 92Q138 82 145 76Q152 82 145 92" fill="#6fa257"/>
    </g>}
    {kind === 'school' && <g>
      <path d="M58 100V66H142V100Z" fill="#f4e7c6" stroke="#b99a6c" strokeWidth="1.5"/>
      <path d="M52 68H148L140 58H60Z" fill="#3f7f70"/>
      <path d="M90 66V40H110V66Z" fill="#f4e7c6" stroke="#b99a6c" strokeWidth="1.5"/><path d="M86 42L100 30L114 42Z" fill="#3f7f70"/>
      <circle cx="100" cy="47" r="4" fill="#e3b64c"/>
      <path d="M100 30V16" stroke="#7b6a55" strokeWidth="1.5"/><path d="M100 16L112 19L100 22Z" fill="#e0703f"/>
      <g fill="#8fc0cf" stroke="#b99a6c"><rect x="66" y="74" width="12" height="10" rx="1"/><rect x="122" y="74" width="12" height="10" rx="1"/></g>
      <path d="M94 100V82H106V100Z" fill="#8a5a3c"/>
      <Palm x={158} s={.75}/>
    </g>}
    {kind === 'bazaar' && <g>
      <path d="M66 100V70H134V100Z" fill="#f2d9a4" stroke="#b98d55" strokeWidth="1.5"/>
      <g>{[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M${60 + i * 11.4} 58H${71.4 + i * 11.4}V70Q${65.7 + i * 11.4} 76 ${60 + i * 11.4} 70Z`} fill={i % 2 ? '#fbf1da' : '#3f8a6a'}/>)}</g>
      <path d="M58 58H142" stroke="#2f6b52" strokeWidth="2"/>
      <path d="M74 90H126V100H74Z" fill="#a8723f"/>
      <g><rect x="76" y="78" width="9" height="9" rx="1" fill="#e0703f"/><rect x="88" y="76" width="9" height="11" rx="1" fill="#e3b64c"/><rect x="100" y="79" width="9" height="8" rx="1" fill="#6fa257"/><rect x="112" y="77" width="10" height="10" rx="1" fill="#d98aa0"/></g>
      <ellipse cx="148" cy="98" rx="10" ry="5" fill="#b98d55"/><g fill="#e0703f"><circle cx="144" cy="94" r="3"/><circle cx="150" cy="93" r="3"/></g><circle cx="147" cy="91" r="3" fill="#e3b64c"/>
    </g>}
    {kind === 'sakhi' && <g>
      <path d="M98 100L96 66" stroke="#8a6447" strokeWidth="8" strokeLinecap="round"/>
      <g fill="#6f9a57"><circle cx="80" cy="56" r="22"/><circle cx="114" cy="52" r="24"/><circle cx="98" cy="36" r="22"/></g>
      <g fill="#8db66c"><circle cx="106" cy="34" r="10"/><circle cx="122" cy="50" r="9"/><circle cx="78" cy="50" r="8"/></g>
      <path d="M124 92H158" stroke="#9a7254" strokeWidth="4" strokeLinecap="round"/><path d="M128 92V100M154 92V100" stroke="#7b5a42" strokeWidth="3"/><path d="M124 85H158" stroke="#9a7254" strokeWidth="3" strokeLinecap="round"/>
      <g fill="#e7a3a0"><circle cx="56" cy="98" r="3"/><circle cx="64" cy="102" r="3"/></g><g fill="#f1d77e"><circle cx="60" cy="94" r="3"/><circle cx="140" cy="104" r="3"/></g>
    </g>}
    {kind === 'nagar' && <g>
      <path d="M62 100V54H82V100Z" fill="#c9d3d8" stroke="#8a9aa3" strokeWidth="1.5"/>
      <path d="M86 100V36H108V100Z" fill="#e4d5b4" stroke="#a8977a" strokeWidth="1.5"/>
      <path d="M112 100V62H136V100Z" fill="#d6c3d8" stroke="#9c87a0" strokeWidth="1.5"/>
      <g fill="#f6e3a8">{[44, 54, 64, 74, 84].map(y => <g key={y}><rect x="90" y={y} width="5" height="5"/><rect x="99" y={y} width="5" height="5"/></g>)}{[62, 72, 82].map(y => <g key={y}><rect x="66" y={y} width="4" height="5"/><rect x="74" y={y} width="4" height="5"/><rect x="117" y={y + 6} width="5" height="5"/><rect x="126" y={y + 6} width="5" height="5"/></g>)}</g>
      <rect x="140" y="86" width="30" height="13" rx="4" fill="#e3b64c" stroke="#b98d2f"/><g fill="#9fd0e0"><rect x="144" y="89" width="6" height="5"/><rect x="153" y="89" width="6" height="5"/><rect x="162" y="89" width="5" height="5"/></g><g fill="#4a4a4a"><circle cx="146" cy="100" r="3"/><circle cx="164" cy="100" r="3"/></g>
      <path d="M44 100V88" stroke="#6c706b" strokeWidth="2"/><circle cx="44" cy="87" r="3" fill="#f6e3a8"/>
    </g>}
    {done && <g className="island-lanterns">
      {[[38, 70], [100, 26], [164, 66]].map(([x, y], i) => <g key={i} className={`lantern lantern-${i}`} transform={`translate(${x} ${y})`}>
        <circle r="11" fill="#ffd77a" opacity=".35"/><path d="M-5 -6H5L6 5Q0 9 -6 5Z" fill="#f2a33a" stroke="#c4762b" strokeWidth="1"/><path d="M-3 -6V-9H3V-6" stroke="#8a5a3c" strokeWidth="1.2" fill="none"/>
      </g>)}
    </g>}
    {locked && <g><ellipse cx="100" cy="72" rx="80" ry="30" fill="#fff" opacity=".55"/><ellipse cx="70" cy="62" rx="34" ry="16" fill="#fff" opacity=".5"/><ellipse cx="132" cy="66" rx="36" ry="15" fill="#fff" opacity=".5"/></g>}
  </svg>;
}
