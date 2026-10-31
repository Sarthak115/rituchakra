// Sakhi Sabha: a neighbourhood park after school. Original artwork in the storybook palette.
export function ParkBackground() {
  return <svg className="kitchen-background park-background" viewBox="0 0 1200 510" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="park-sky" x2="0" y2="1"><stop stopColor="#d6e8df"/><stop offset=".7" stopColor="#f4ecd3"/></linearGradient>
      <linearGradient id="park-grass" x2="0" y2="1"><stop stopColor="#a9bf8a"/><stop offset="1" stopColor="#8fa874"/></linearGradient>
    </defs>
    <path d="M0 0H1200V510H0Z" fill="url(#park-sky)"/>
    <circle cx="955" cy="92" r="38" fill="#f7deaa" opacity=".8"/>
    <g fill="#e9dcc0" opacity=".9"><path d="M60 300V205H130V300Z M150 300V170H215V300Z M840 300V190H905V300Z M925 300V225H1010V300Z M1030 300V160H1090V300Z"/></g>
    <g fill="#d7c8a6" opacity=".9"><path d="M75 222H95V236H75Z M105 222H120V236H105Z M165 190H180V204H165Z M190 190H205V204H190Z M855 210H872V224H855Z M1045 180H1060V194H1045Z M1068 180H1080V194H1068Z"/></g>
    <path d="M0 300 Q180 262 360 292 Q560 322 760 286 Q980 250 1200 292V330H0Z" fill="#bfcf9f"/>
    <path d="M0 318H1200V510H0Z" fill="url(#park-grass)"/>
    <path d="M440 510 Q560 420 600 318 L650 318 Q690 420 860 510Z" fill="#e3cfa6"/>
    <path d="M470 510 Q575 425 608 330 M830 510 Q690 425 642 330" stroke="#cdb48a" strokeWidth="3" fill="none" opacity=".6"/>
    <g><path d="M180 420 L176 250 Q174 232 186 230 L198 230 Q208 232 206 250 L202 420Z" fill="#8a6447"/>
      <g fill="#6f8f5a"><circle cx="150" cy="215" r="62"/><circle cx="225" cy="200" r="70"/><circle cx="190" cy="150" r="66"/><circle cx="120" cy="170" r="45"/></g>
      <g fill="#86a46b" opacity=".75"><circle cx="205" cy="140" r="34"/><circle cx="240" cy="190" r="30"/><circle cx="140" cy="200" r="26"/></g>
      <ellipse cx="190" cy="422" rx="70" ry="10" fill="#6d8858" opacity=".35"/></g>
    <g><path d="M1043 405 L1040 275 Q1039 262 1048 262 L1056 262 Q1064 262 1062 275 L1059 405Z" fill="#8a6447"/>
      <g fill="#6f8f5a"><circle cx="1015" cy="250" r="50"/><circle cx="1085" cy="242" r="55"/><circle cx="1050" cy="198" r="52"/></g>
      <g fill="#86a46b" opacity=".75"><circle cx="1062" cy="192" r="26"/><circle cx="1098" cy="236" r="22"/></g></g>
    <g fill="none" stroke="#7b5a42" strokeWidth="7" strokeLinecap="round"><path d="M880 372H1000 M880 390H1000"/><path d="M890 372V410 M990 372V410"/></g>
    <path d="M876 352H1004" stroke="#9a7254" strokeWidth="9" strokeLinecap="round"/><path d="M888 352V372 M992 352V372" stroke="#7b5a42" strokeWidth="5"/>
    <path d="M330 420V240" stroke="#5f625e" strokeWidth="6"/><path d="M314 240H346L340 222H320Z" fill="#6c706b"/><circle cx="330" cy="246" r="7" fill="#f6e3a8"/>
    <g fill="#e7a3a0"><circle cx="300" cy="455" r="5"/><circle cx="318" cy="462" r="4"/><circle cx="740" cy="470" r="5"/><circle cx="1120" cy="450" r="5"/></g>
    <g fill="#f1d77e"><circle cx="286" cy="466" r="4"/><circle cx="755" cy="458" r="4"/><circle cx="1135" cy="462" r="4"/><circle cx="90" cy="470" r="5"/></g>
    <g stroke="#7f9a63" strokeWidth="3" strokeLinecap="round"><path d="M60 480l6-14M70 482l2-15M380 476l5-12M390 478l1-13M960 486l5-12M970 488l2-13"/></g>
  </svg>;
}
