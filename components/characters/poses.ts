import type { CharacterId, Expression, FaceExpression } from '@/lib/story/types';

// All coordinates share the 250×410 character viewBox. Every pose of a part uses the same
// path commands, so Motion can morph brows, mouths and arms smoothly between expressions.
export type Pt = [number, number];
interface Brow { x1: number; y1: number; cx: number; cy: number; x2: number; y2: number; }
interface Mouth { l: Pt; r: Pt; up: number; lo: number; }
export interface ArmPose { e: Pt; h: Pt; }
export interface FacePose {
  brow: Brow; browR?: Brow; mouth: Mouth; teeth: number;
  pupils: Pt; lid: number; eyeScale: number; blush: number;
  tilt: number; drop: number; armR: ArmPose; armL?: ArmPose; gestures: boolean;
}

const legacy: Record<string, FaceExpression> = { idle: 'neutral', confused: 'curious', concerned: 'worried', relieved: 'reassuring' };
export const toFace = (expression: Expression): FaceExpression => legacy[expression] ?? (expression as FaceExpression);

const brow = (x1: number, y1: number, cx: number, cy: number, x2: number, y2: number): Brow => ({ x1, y1, cx, cy, x2, y2 });
const rest: ArmPose = { e: [176, 224], h: [182, 272] };

export const facePoses: Record<FaceExpression, FacePose> = {
  neutral: { brow: brow(93, 92, 103, 88, 113, 92), mouth: { l: [115, 137], r: [135, 137], up: 139, lo: 139.6 }, teeth: 0, pupils: [0, 0], lid: 0.12, eyeScale: 1, blush: 0.3, tilt: 0, drop: 0, armR: rest, gestures: true },
  curious: { brow: brow(93, 87, 103, 81, 113, 85), browR: brow(93, 89, 103, 84, 113, 88), mouth: { l: [119, 138], r: [130, 138], up: 135, lo: 143 }, teeth: 0, pupils: [2, -1], lid: 0, eyeScale: 1.08, blush: 0.3, tilt: -6, drop: 0, armR: rest, gestures: true },
  worried: { brow: brow(93, 94, 103, 91, 113, 87), mouth: { l: [116, 140], r: [134, 140], up: 135, lo: 136.5 }, teeth: 0, pupils: [0, 1], lid: 0, eyeScale: 1.05, blush: 0.32, tilt: 3, drop: 1, armR: { e: [172, 222], h: [150, 262] }, gestures: false },
  embarrassed: { brow: brow(93, 92, 103, 90, 113, 88), mouth: { l: [117, 139], r: [131, 138], up: 137.5, lo: 140 }, teeth: 0, pupils: [-2, 3], lid: 0.38, eyeScale: 1, blush: 0.85, tilt: 5, drop: 3, armR: { e: [170, 222], h: [132, 250] }, gestures: false },
  thinking: { brow: brow(93, 93, 103, 91, 113, 93), browR: brow(93, 87, 103, 82, 113, 87), mouth: { l: [116, 138], r: [132, 136], up: 137, lo: 138.5 }, teeth: 0, pupils: [2.5, -3], lid: 0.15, eyeScale: 1, blush: 0.3, tilt: -5, drop: 0, armR: { e: [160, 224], h: [140, 168] }, armL: { e: [74, 224], h: [68, 272] }, gestures: false },
  happy: { brow: brow(93, 90, 103, 85, 113, 90), mouth: { l: [112, 134], r: [138, 134], up: 139, lo: 151 }, teeth: 1, pupils: [0, 0], lid: 0.2, eyeScale: 0.85, blush: 0.55, tilt: 2, drop: 0, armR: { e: [178, 222], h: [190, 266] }, gestures: true },
  surprised: { brow: brow(93, 87, 103, 82, 113, 86), mouth: { l: [119, 136], r: [131, 136], up: 129, lo: 147 }, teeth: 0, pupils: [0, 0], lid: 0, eyeScale: 1.17, blush: 0.3, tilt: 0, drop: -2, armR: { e: [180, 218], h: [190, 176] }, gestures: false },
  reassuring: { brow: brow(93, 91, 103, 87, 113, 89), mouth: { l: [114, 135], r: [136, 135], up: 139, lo: 142.5 }, teeth: 0, pupils: [0, 0], lid: 0.3, eyeScale: 1, blush: 0.42, tilt: 4, drop: 0, armR: { e: [176, 224], h: [204, 246] }, gestures: true },
};

// Talking alternates between two open-hand gestures on the arm nearest the listener.
export const gesturePoses: ArmPose[] = [{ e: [184, 222], h: [205, 182] }, { e: [182, 224], h: [214, 204] }];

const mirrorX = (x: number) => 250 - x;
export const mirrorArm = ({ e, h }: ArmPose): ArmPose => ({ e: [mirrorX(e[0]), e[1]], h: [mirrorX(h[0]), h[1]] });
const mirrorBrow = (b: Brow): Brow => ({ x1: 249 - b.x1, y1: b.y1, cx: 249 - b.cx, cy: b.cy, x2: 249 - b.x2, y2: b.y2 });

export const browPath = (b: Brow) => `M${b.x1} ${b.y1} Q${b.cx} ${b.cy} ${b.x2} ${b.y2}`;
export const browPaths = (pose: FacePose) => [browPath(pose.brow), browPath(mirrorBrow(pose.browR ?? pose.brow))] as const;

export function mouthPath({ l, r, up, lo }: Mouth, open = 0) {
  const cx = (l[0] + r[0]) / 2;
  return `M${l[0]} ${l[1]} Q${cx} ${up - open * 0.3} ${r[0]} ${r[1]} Q${cx} ${Math.max(lo, up) + open} ${l[0]} ${l[1]} Z`;
}
export const teethPath = ({ l, r, up }: Mouth) => `M${l[0] + 4} ${l[1] + 1.5} Q${(l[0] + r[0]) / 2} ${up + 1.5} ${r[0] - 4} ${r[1] + 1.5}`;

const lerp = (a: Pt, b: Pt, t: number): Pt => [+(a[0] + (b[0] - a[0]) * t).toFixed(1), +(a[1] + (b[1] - a[1]) * t).toFixed(1)];
export function armPaths(shoulder: Pt, { e, h }: ArmPose) {
  const cuff = lerp(e, h, 0.3), bangle = lerp(e, h, 0.8);
  return { limb: `M${shoulder[0]} ${shoulder[1]} L${e[0]} ${e[1]} L${h[0]} ${h[1]}`, sleeve: `M${shoulder[0]} ${shoulder[1]} L${e[0]} ${e[1]} L${cuff[0]} ${cuff[1]}`, hand: h, bangle };
}

export interface Look { skin: string; skinLine: string; cloth: string; clothLine: string; brow: string; shoulders: [Pt, Pt]; eye: { rx: number; ry: number; pupilRx: number; pupilRy: number }; bangles: boolean; blink: { period: number; double: boolean }; }
export const looks: Record<CharacterId, Look> = {
  aara: { skin: '#dba075', skinLine: '#a16a4e', cloth: '#478a78', clothLine: '#316456', brow: '#3b2a28', shoulders: [[86, 182], [164, 182]], eye: { rx: 8.5, ry: 9.5, pupilRx: 4.8, pupilRy: 6.8 }, bangles: true, blink: { period: 4.1, double: false } },
  aarav: { skin: '#cb9068', skinLine: '#9a6347', cloth: '#d79445', clothLine: '#ac6b35', brow: '#2f2221', shoulders: [[86, 182], [164, 182]], eye: { rx: 8.3, ry: 9.2, pupilRx: 4.8, pupilRy: 6.6 }, bangles: false, blink: { period: 3.7, double: true } },
  dadi: { skin: '#c68d66', skinLine: '#94603f', cloth: '#a64c4e', clothLine: '#743e42', brow: '#8a817c', shoulders: [[88, 180], [162, 180]], eye: { rx: 7.4, ry: 7.4, pupilRx: 4, pupilRy: 5.2 }, bangles: true, blink: { period: 4.8, double: true } },
};
