'use client';
import { useEffect, useId, useState } from 'react';
import * as m from 'motion/react-m';
import { useReducedMotion, type Transition } from 'motion/react';
import { useLanguage } from '@/lib/useLanguage';
import type { Animation, CharacterId, Expression } from '@/lib/story/types';
import { Accessories, BodyArt, FaceBase, FaceDetails, HairBack, HairFront } from './CharacterArt';
import { armPaths, browPaths, facePoses, gesturePoses, looks, mirrorArm, mouthPath, teethPath, toFace, type ArmPose, type Look, type Pt } from './poses';

export interface CharacterProps {
  character: CharacterId; expression?: Expression; animation?: Animation; className?: string;
  /** 1 = looking toward the right of the stage, -1 = toward the left. */
  facing?: 1 | -1;
  /** True while someone else is speaking: the character leans in, looks at them and nods on each new line. */
  listening?: boolean;
  /** Changes on every new line so listeners can react. */
  reactKey?: string;
}

const names: Record<CharacterId, string> = { aara: 'Aara', aarav: 'Aarav', dadi: 'Dadi' };
// Pivot points are in the character's 250×410 drawing coordinates. Motion defaults SVG parts to
// transform-box: fill-box, which would measure them from each part's own corner instead: blinks
// then collapse the eyes toward a point near the chin, and the head swings from the wrong spot.
const origin = (x: number, y: number) => ({ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' as const });
const loop = (duration: number): Transition => ({ duration, repeat: Infinity, ease: 'easeInOut' });

export function Character({ character, expression = 'neutral', animation = 'idle', className = '', facing = 1, listening = false, reactKey = '' }: CharacterProps) {
  const { t } = useLanguage();
  const reduce = useReducedMotion() ?? false;
  const look = looks[character];
  const face = toFace(expression);
  const pose = facePoses[face];
  const speaking = animation === 'talking';
  const hop = animation === 'react' || animation === 'bounce' || animation === 'celebrate';
  const morph: Transition = reduce ? { duration: 0 } : { duration: 0.32, ease: 'easeInOut' };
  const spring: Transition = reduce ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 14 };

  // A listener gives a small nod each time the speaker starts a new line.
  const [nod, setNod] = useState({ key: reactKey, count: 0 });
  if (nod.key !== reactKey) setNod({ key: reactKey, count: nod.count + 1 });
  const nodding = listening && !reduce && nod.count > 0;

  const [browL, browR] = browPaths(pose);
  const closedMouth = mouthPath(pose.mouth);
  const talkingMouth = [closedMouth, mouthPath(pose.mouth, 7), mouthPath(pose.mouth, 2.5), mouthPath(pose.mouth, 8.5), mouthPath(pose.mouth, 1.5), closedMouth];
  const look2 = listening ? facing * 1.6 : 0;
  const [px, py] = pose.pupils;

  // Gestures step between two poses on a slow beat. Plain target changes (not an infinite
  // keyframe loop) so the arm always settles back when the line ends, even after fast clicks.
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (!speaking || reduce) return;
    const timer = setInterval(() => setBeat(value => value + 1), 1300);
    return () => clearInterval(timer);
  }, [speaking, reduce]);
  const gestureArm = facing === 1 ? 'right' : 'left';
  const armFor = (side: 'left' | 'right'): ArmPose => {
    if (speaking && pose.gestures && !reduce && side === gestureArm) { const gesture = gesturePoses[beat % 2]; return side === 'right' ? gesture : mirrorArm(gesture); }
    return side === 'right' ? pose.armR : pose.armL ?? mirrorArm(pose.armR);
  };

  return <svg viewBox="0 0 250 410" role="img" aria-label={`${names[character]}, ${t(face)}${speaking ? `, ${t('speaking')}` : ''}`} className={`character character-${character} ${className}`}>
    <m.ellipse cx="126" cy="395" ry="9" fill="#694e3b" initial={false} animate={{ rx: speaking ? 72 : 65, opacity: speaking ? 0.2 : 0.13 }} transition={morph}/>
    <m.g style={origin(125, 395)} initial={false} animate={{ rotate: listening ? facing * 1.4 : 0 }} transition={spring}>
      <m.g style={origin(125, 395)} animate={reduce ? { rotate: 0 } : { rotate: [-0.5, 0.5, -0.5] }} transition={loop(7.5)}>
        <m.g initial={false} animate={hop && !reduce ? { y: [0, -7, 0, -2, 0] } : { y: 0 }} transition={{ duration: 0.6 }}>
          <m.g style={origin(125, 390)} animate={reduce ? { scaleY: 1 } : { scaleY: [1, 1.012, 1] }} transition={loop(3.8)}>
            <BodyArt character={character}/>
            <Arm look={look} shoulder={look.shoulders[0]} pose={armFor('left')} morph={morph}/>
            <Arm look={look} shoulder={look.shoulders[1]} pose={armFor('right')} morph={morph}/>
            <m.g style={origin(125, 165)} initial={false} animate={{ rotate: pose.tilt * facing, y: pose.drop }} transition={spring}>
              <m.g style={origin(125, 165)} animate={reduce ? { rotate: 0 } : { rotate: [0, 1.1, 0, -0.9, 0] }} transition={loop(9)}>
                <m.g style={origin(125, 165)} initial={false} animate={speaking && !reduce ? { rotate: beat % 2 ? -1.8 : 1.3, y: beat % 2 ? -1.2 : 0.4 } : { rotate: 0, y: 0 }} transition={{ duration: 0.65, ease: 'easeInOut' }}>
                <m.g initial={false} animate={{ y: nodding ? (nod.count % 2 ? [0, 3, 0, 1.5, 0] : [0, 3.01, 0, 1.5, 0]) : 0 }} transition={{ duration: 0.9 }}>
                  <HairBack character={character}/>
                  <FaceBase character={character}/>
                  <HairFront character={character}/>
                  <m.g fill="#d8806a" initial={false} animate={{ opacity: pose.blush }} transition={morph}><ellipse cx="92" cy="124" rx="11" ry="5"/><ellipse cx="157" cy="124" rx="11" ry="5"/></m.g>
                  <Eye cx={104} look={look} pose={{ px: px + look2, py, lid: pose.lid, scale: pose.eyeScale }} reduce={reduce} morph={morph}/>
                  <Eye cx={145} look={look} pose={{ px: px + look2, py, lid: pose.lid, scale: pose.eyeScale }} reduce={reduce} morph={morph}/>
                  <g fill="none" stroke={look.brow} strokeWidth={character === 'aarav' ? 4.2 : 3.6} strokeLinecap="round">
                    <m.path initial={false} animate={{ d: browL }} transition={morph}/>
                    <m.path initial={false} animate={{ d: browR }} transition={morph}/>
                  </g>
                  <FaceDetails character={character}/>
                  <m.path key={speaking && !reduce ? 'talk' : 'rest'} fill="#7b403d" stroke="#6e3a37" strokeWidth="2.4" strokeLinejoin="round" initial={false} animate={{ d: speaking && !reduce ? talkingMouth : closedMouth }} transition={speaking && !reduce ? { duration: 0.62, repeat: Infinity, ease: 'easeInOut' } : morph}/>
                  <m.path d={teethPath(pose.mouth)} fill="none" stroke="#fff6ea" strokeWidth="3.2" strokeLinecap="round" initial={false} animate={{ opacity: speaking ? 0 : pose.teeth, d: teethPath(pose.mouth) }} transition={morph}/>
                  <Accessories character={character}/>
                </m.g>
                </m.g>
              </m.g>
            </m.g>
          </m.g>
        </m.g>
      </m.g>
    </m.g>
  </svg>;
}

function Eye({ cx, look, pose, reduce, morph }: { cx: number; look: Look; pose: { px: number; py: number; lid: number; scale: number }; reduce: boolean; morph: Transition }) {
  const clip = useId();
  const cy = 105, { rx, ry, pupilRx, pupilRy } = look.eye;
  const { period, double } = look.blink;
  const blink = double ? { scaleY: [1, 1, 0.1, 1, 0.1, 1], times: [0, 0.9, 0.925, 0.95, 0.975, 1] } : { scaleY: [1, 1, 0.1, 1], times: [0, 0.94, 0.97, 1] };
  // Eyes drift toward a point now and then, like someone listening and thinking.
  const glance = [pose.px, pose.px, pose.px + 1.6, pose.px + 1.6, pose.px, pose.px];
  return <m.g style={origin(cx, cy)} initial={false} animate={{ scaleY: pose.scale }} transition={morph}>
    <m.g style={origin(cx, cy)} animate={reduce ? { scaleY: 1 } : { scaleY: blink.scaleY }} transition={reduce ? { duration: 0 } : { duration: period, times: blink.times, repeat: Infinity, ease: 'linear', delay: cx === 104 ? 0 : 0.02 }}>
      <clipPath id={clip}><ellipse cx={cx} cy={cy} rx={rx} ry={ry}/></clipPath>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff8e8" stroke="#5a403a" strokeWidth="1"/>
      <g clipPath={`url(#${clip})`}>
        <m.g initial={false} animate={{ x: reduce ? pose.px : glance, y: pose.py }} transition={reduce ? { duration: 0 } : { x: { duration: 7, times: [0, 0.55, 0.6, 0.82, 0.87, 1], repeat: Infinity }, y: morph }}>
          <ellipse cx={cx + 1} cy={cy + 1} rx={pupilRx} ry={pupilRy} fill="#302728"/>
          <circle cx={cx + 2.5} cy={cy - 2} r="1.9" fill="#fff"/>
        </m.g>
        <m.rect x={cx - rx - 1} y={cy - ry - 1} width={rx * 2 + 2} height={ry * 2 + 2} fill={look.skin} style={origin(cx, cy - ry - 1)} initial={false} animate={{ scaleY: pose.lid }} transition={morph}/>
      </g>
    </m.g>
  </m.g>;
}

function Arm({ look, shoulder, pose, morph }: { look: Look; shoulder: Pt; pose: ArmPose; morph: Transition }) {
  const { limb, sleeve, hand, bangle } = armPaths(shoulder, pose);
  const transition: Transition = morph.duration === 0 ? morph : { duration: 0.7, ease: 'easeInOut' };
  return <g strokeLinecap="round" strokeLinejoin="round" fill="none">
    <m.path stroke={look.skinLine} strokeWidth="16.5" initial={false} animate={{ d: limb }} transition={transition}/>
    <m.path stroke={look.skin} strokeWidth="13.5" initial={false} animate={{ d: limb }} transition={transition}/>
    <m.path stroke={look.clothLine} strokeWidth="19" initial={false} animate={{ d: sleeve }} transition={transition}/>
    <m.path stroke={look.cloth} strokeWidth="16" initial={false} animate={{ d: sleeve }} transition={transition}/>
    {look.bangles && <m.circle r="7.2" stroke="#d9ad53" strokeWidth="2.6" initial={false} animate={{ cx: bangle[0], cy: bangle[1] }} transition={transition}/>}
    <m.circle r="7.6" fill={look.skin} stroke={look.skinLine} strokeWidth="1.5" initial={false} animate={{ cx: hand[0], cy: hand[1] }} transition={transition}/>
  </g>;
}
