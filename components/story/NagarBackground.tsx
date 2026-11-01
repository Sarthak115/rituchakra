// Nagar: a roadside stop on the way to the city. The school bus, a chemist and a tea stall; the skyline beyond.
export function NagarBackground() {
  return <svg className="kitchen-background nagar-background" viewBox="0 0 1200 510" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="nagar-sky" x2="0" y2="1"><stop stopColor="#cfe3e6"/><stop offset=".75" stopColor="#f6e6c6"/></linearGradient></defs>
    <path d="M0 0H1200V510H0Z" fill="url(#nagar-sky)"/>
    <g fill="#d9d4cc" opacity=".85">
      <path d="M300 300V170H350V300Z M360 300V120H410V300Z M420 300V200H470V300Z M640 300V150H690V300Z M700 300V95H745V300Z M755 300V185H810V300Z M820 300V135H860V300Z"/>
    </g>
    <g fill="#ece6da" opacity=".9">{[130, 150, 170, 190, 210, 230].map(y => <g key={y}><rect x="370" y={y} width="9" height="9"/><rect x="389" y={y} width="9" height="9"/><rect x="710" y={y - 20} width="9" height="9"/><rect x="727" y={y - 20} width="9" height="9"/></g>)}</g>
    <path d="M0 300H1200V330H0Z" fill="#cbbf9f"/>
    <path d="M0 330H1200V430H0Z" fill="#b7aa8c"/>
    <path d="M0 430H1200V510H0Z" fill="#8e8b84"/><path d="M0 468H1200" stroke="#f3e7c7" strokeWidth="5" strokeDasharray="60 40"/>
    <g>
      <path d="M40 395V250Q40 236 54 236H330Q350 236 356 256L372 330V395Z" fill="#e8b93f" stroke="#b98a22" strokeWidth="3"/>
      <path d="M40 300H372" stroke="#2f4f5a" strokeWidth="5"/>
      <g fill="#bfe0ea" stroke="#9a7a2a" strokeWidth="2">{[60, 120, 180, 240].map(x => <rect key={x} x={x} y="252" width="48" height="40" rx="4"/>)}<path d="M300 252H336L352 292H300Z"/></g>
      <rect x="40" y="318" width="332" height="12" fill="#2f4f5a" opacity=".85"/>
      <g fill="#3a3a3a"><circle cx="100" cy="398" r="22"/><circle cx="310" cy="398" r="22"/></g><g fill="#9a9a9a"><circle cx="100" cy="398" r="9"/><circle cx="310" cy="398" r="9"/></g>
      <rect x="362" y="350" width="14" height="10" rx="2" fill="#f6e3a8"/>
    </g>
    <g>
      <path d="M820 330V196H1060V330Z" fill="#eef1ea" stroke="#b8bcb0" strokeWidth="3"/>
      <path d="M808 196H1072L1060 172H820Z" fill="#4f8f78"/>
      <rect x="900" y="150" width="80" height="34" rx="6" fill="#fdfcf6" stroke="#4f8f78" strokeWidth="3"/>
      <path d="M932 157H948V164H955V180H948V187H932V180H925V164H932Z" fill="#3d9a6a" transform="translate(0 -6) scale(1 .95)"/>
      <path d="M842 330V232H938V330Z" fill="#bfdfe0" stroke="#8fa7a2" strokeWidth="3"/>
      <g fill="#fff" opacity=".8"><rect x="850" y="242" width="80" height="6"/><rect x="850" y="268" width="80" height="6"/><rect x="850" y="294" width="80" height="6"/></g>
      <g>{[0, 1, 2, 3, 4].map(i => <rect key={i} x={852 + i * 15} y="252" width="11" height="14" rx="2" fill={['#e0703f', '#6fa257', '#d98aa0', '#e3b64c', '#7fb3c3'][i]}/>)}{[0, 1, 2, 3, 4].map(i => <rect key={`b${i}`} x={852 + i * 15} y="278" width="11" height="14" rx="2" fill={['#7fb3c3', '#e3b64c', '#6fa257', '#e0703f', '#d98aa0'][i]}/>)}</g>
      <path d="M958 330V236H1040V330Z" fill="#9c7752" stroke="#7b5a3c" strokeWidth="3"/><circle cx="1026" cy="284" r="4" fill="#e3b64c"/>
      <path d="M836 330H1046V342H836Z" fill="#c9c3b2"/>
    </g>
    <g>
      <path d="M1090 330V262H1180V330Z" fill="#c98b5a"/><path d="M1080 262H1190L1176 240H1094Z" fill="#c4653f"/>
      <path d="M1100 300H1170" stroke="#8a5a3c" strokeWidth="5"/><g fill="#eadfc8"><rect x="1108" y="286" width="9" height="12" rx="2"/><rect x="1124" y="286" width="9" height="12" rx="2"/></g>
      <path d="M1150 290q5 -12 0 -20" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" className="steam"/>
    </g>
    <g><path d="M580 330V230" stroke="#6c706b" strokeWidth="5"/><path d="M566 230H594L588 214H572Z" fill="#6c706b"/><circle cx="580" cy="236" r="6" fill="#f6e3a8"/></g>
    <g fill="#7f9a63"><circle cx="490" cy="300" r="26"/><circle cx="515" cy="288" r="22"/><circle cx="540" cy="302" r="20"/></g><path d="M512 330V300" stroke="#8a6447" strokeWidth="6"/>
  </svg>;
}
