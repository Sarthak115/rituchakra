import * as m from 'motion/react-m';
// Opening title card over the backdrop: where we are before anyone speaks. Click to skip.
export function SceneIntro({ world, title, place, onDone }: { world: string; title: string; place: string; onDone: () => void }) {
  return <m.button className="scene-intro" onClick={onDone} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
    <m.span className="scene-intro-world" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>{world}</m.span>
    <m.strong initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>{title}</m.strong>
    <m.span className="scene-intro-place" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>{place}</m.span>
  </m.button>;
}
