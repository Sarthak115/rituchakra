'use client';
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from 'react';
import * as m from 'motion/react-m';
import { AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { Check, LockKeyhole } from 'lucide-react';
import { Character } from '@/components/characters/Character';
import { IslandArt, type IslandKind } from './IslandArt';
import { useProgress } from '@/lib/story/useProgress';
import { useLanguage } from '@/lib/useLanguage';
import { sounds } from '@/lib/sound';

// Map order stays Ghar → Vidyalaya → Bazaar → Sakhi Sabha → Nagar. Positions are % of the sea.
export const islands: { name: string; theme: string; kind: IslandKind; path?: string; storyId?: string; wide: [number, number]; tall: [number, number] }[] = [
  { name: 'Ghar', theme: 'Family & Traditions', kind: 'ghar', path: '/ghar', storyId: 'ghar-dadi-rasoi', wide: [13, 64], tall: [27, 11] },
  { name: 'Vidyalaya', theme: 'School & Adolescence', kind: 'school', path: '/vidyalaya', storyId: 'vidyalaya-the-stain', wide: [33, 30], tall: [72, 29] },
  { name: 'Bazaar', theme: 'Products & Choices', kind: 'bazaar', path: '/bazaar', storyId: 'bazaar-choose-what-fits', wide: [51, 66], tall: [28, 48] },
  { name: 'Sakhi Sabha', theme: 'Allyship & Community', kind: 'sakhi', path: '/sakhi-sabha', storyId: 'sakhi-sabha-the-joke', wide: [69, 28], tall: [72, 67] },
  { name: 'Nagar', theme: 'Modern Life', kind: 'nagar', path: '/nagar', storyId: 'nagar-the-long-journey', wide: [87, 62], tall: [30, 86] },
];

function useNarrow() {
  return useSyncExternalStore(change => {
    const query = window.matchMedia('(max-width: 700px)');
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, () => window.matchMedia('(max-width: 700px)').matches, () => false);
}

// The boat docks just below and beside an island.
const dock = ([x, y]: [number, number], narrow: boolean): [number, number] => [x + (narrow ? -14 : -6), y + (narrow ? 4 : 13)];

export function IslandMap() {
  const { t } = useLanguage();
  const { progress, ready } = useProgress();
  const reduce = useReducedMotion() ?? false;
  const narrow = useNarrow();
  const layout = narrow ? 'tall' : 'wide';
  const [travel, setTravel] = useState<{ to: number; from: number } | null>(null);
  const [greeting, setGreeting] = useState(true);
  const [nudge, setNudge] = useState<number | null>(null);
  const travelRef = useRef(travel);
  useEffect(() => { travelRef.current = travel; });
  useEffect(() => { const timer = setTimeout(() => setGreeting(false), 6500); return () => clearTimeout(timer); }, [progress.companion, progress.language]);

  // The boat waits at the first world not yet completed.
  const done = (i: number) => !!islands[i].storyId && !!progress.stories[islands[i].storyId!]?.completed;
  const home = Math.max(0, islands.findIndex((island, i) => island.path && !done(i)));
  const at = travel?.to ?? (ready ? home : 0);
  const [bx, by] = dock(islands[at][layout], narrow);
  const fromX = travel ? islands[travel.from][layout][0] : bx;
  const facing = travel && islands[travel.to][layout][0] < fromX ? -1 : 1;
  const route = islands.map(island => island[layout]);
  const routePath = route.map(([x, y], i) => i === 0 ? `M${x} ${y}` : `Q${(route[i - 1][0] + x) / 2 + (i % 2 ? -6 : 6)} ${(route[i - 1][1] + y) / 2 + (i % 2 ? 10 : -10)} ${x} ${y}`).join(' ');

  // Parallax: layers drift against the pointer. Motion values update without re-rendering React.
  const px = useMotionValue(0), py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 }), sy = useSpring(py, { stiffness: 60, damping: 18 });
  const cloudX = useTransform(sx, v => v * -34), cloudY = useTransform(sy, v => v * -10);
  const seaX = useTransform(sx, v => v * -10), islandX = useTransform(sx, v => v * -18), islandY = useTransform(sy, v => v * -8);
  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5); py.set((event.clientY - box.top) / box.height - 0.5);
  }
  const sound = (name: keyof typeof sounds) => { if (!progress.muted) sounds[name](); };

  function sail(index: number) {
    const island = islands[index];
    if (!island.path) { sound('locked'); setNudge(index); setTimeout(() => setNudge(null), 600); return; }
    if (travelRef.current) return;
    sound('tap'); setGreeting(false);
    if (reduce || index === at) { sound('arrive'); setTimeout(() => { window.location.href = island.path!; }, reduce ? 0 : 350); return; }
    sound('splash'); setTravel({ from: at, to: index });
  }
  function arrived() {
    const current = travelRef.current;
    if (!current) return;
    sound('arrive');
    setTimeout(() => { window.location.href = islands[current.to].path!; }, 380);
  }
  const distance = travel ? Math.hypot(islands[travel.to][layout][0] - islands[travel.from][layout][0], islands[travel.to][layout][1] - islands[travel.from][layout][1]) : 0;
  const name = progress.companion === 'aarav' ? 'Aarav' : 'Aara';

  return <div className={`island-map island-map-${layout}`} onPointerMove={onMove} onPointerLeave={() => { px.set(0); py.set(0); }}>
    <div className="island-sea" aria-hidden="true">
      <m.div className="island-sea-waves" style={{ x: seaX }}/>
      <div className="island-sun"/>
      <m.div className="island-clouds" style={{ x: cloudX, y: cloudY }}><span/><span/><span/></m.div>
    </div>
    <m.svg className="island-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ x: islandX, y: islandY }}><path d={routePath} vectorEffect="non-scaling-stroke"/></m.svg>
    <m.ul className="island-list" style={{ x: islandX, y: islandY }} aria-label={t('Choose your story world')}>
      {islands.map((island, i) => {
        const [x, y] = island[layout];
        const complete = done(i);
        const label = `${t(island.name)} · ${t(island.theme)} · ${island.path ? t(complete ? 'Story complete' : 'Available') : t('Coming soon')}`;
        const content = <>
          <m.span className="island-float" animate={nudge === i ? { x: [0, -6, 6, -4, 0] } : reduce ? undefined : { y: [0, -4, 0] }} transition={nudge === i ? { duration: 0.45 } : { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
            <IslandArt kind={island.kind} done={complete} locked={!island.path}/>
          </m.span>
          <span className={`island-label ${complete ? 'is-done' : ''} ${island.path ? '' : 'is-locked'}`}><span className="island-number">{i + 1}</span><strong>{t(island.name)}</strong><small>{t(island.theme)}</small>{complete && <span className="island-badge"><Check size={12}/></span>}{!island.path && <span className="island-soon"><LockKeyhole size={11}/>{t('Coming soon')}</span>}</span>
        </>;
        return <li key={island.name} className={`island island-${island.kind}`} style={{ left: `${x}%`, top: `${y}%` }}>
          {island.path ? <a href={island.path} aria-label={label} onClick={event => { event.preventDefault(); sail(i); }}>{content}</a> : <button type="button" aria-label={label} onClick={() => sail(i)}>{content}</button>}
        </li>;
      })}
    </m.ul>
    <m.div className="island-boat" style={{ x: islandX, y: islandY }} initial={false} animate={{ left: `${bx}%`, top: `${by}%` }} transition={reduce ? { duration: 0 } : { duration: Math.min(2.6, 0.9 + distance / 35), ease: [0.45, 0, 0.3, 1] }} onAnimationComplete={arrived}>
      <m.div className="island-boat-bob" animate={reduce ? undefined : { y: [0, -3, 0], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: travel ? 1.2 : 3.2, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="island-boat-rider" style={{ transform: `scaleX(${facing})` }}><Character character={progress.companion} expression={travel ? 'happy' : greeting ? 'happy' : 'neutral'} animation={greeting && !reduce ? 'talking' : 'idle'} facing={facing}/></div>
        <svg className="island-boat-hull" viewBox="0 0 120 50" aria-hidden="true" style={{ transform: `scaleX(${facing})` }}>
          <path d="M6 18H114L100 42Q60 50 20 42Z" fill="#c4653f" stroke="#8f4528" strokeWidth="2"/><path d="M12 24H108" stroke="#f3dcab" strokeWidth="4"/><path d="M22 34H98" stroke="#a9512f" strokeWidth="2" opacity=".6"/>
        </svg>
        {travel && !reduce && <span className="island-wake" aria-hidden="true"/>}
      </m.div>
      <AnimatePresence>{greeting && ready && <m.p className="island-greeting" role="status" initial={{ opacity: 0, y: 6, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.35 }}>{t('Hi! I’m')} {name}. {t('Which island shall we sail to?')}</m.p>}</AnimatePresence>
    </m.div>
  </div>;
}
