'use client';
import { useEffect, useRef, useState } from 'react';
import { BookOpen, Flower2, RotateCcw, Sun, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { dadiKiRasoi as story } from '@/data/stories/dadiKiRasoi';
import { en } from '@/data/translations/en';
import type { Choice, Companion } from '@/lib/story/types';
import { useStoryTool } from '@/lib/story/useStoryTool';
import { KitchenBackground } from './KitchenBackground';
import { CharacterPosition } from './CharacterPosition';
import { DialogueBox } from './DialogueBox';
import { ChoiceButton } from './ChoiceButton';
import { StoryProgress } from './StoryProgress';
import { SceneTransition } from './SceneTransition';

export function StoryScene() {
  const [companion, setCompanion] = useState<Companion>('aara');
  const [sceneId, setSceneId] = useState('opening');
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<'dialogue' | 'choices' | 'end'>('dialogue');
  const [selected, setSelected] = useState<Choice | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const initialFocus = useRef(true);
  const scene = story.scenes[sceneId];
  const dialogue = scene.dialogue[index];
  const speaker = dialogue.speaker === 'companion' ? companion : dialogue.speaker;
  const revealing = mode === 'dialogue' && count < dialogue.text.length;
  useStoryTool({ companion, scene: sceneId, speaker, dialogue: dialogue.text, mode, choices: mode === 'choices' ? (scene.choices ?? []).map(c => ({ id: c.id, text: c.text })) : [] });

  useEffect(() => {
    if (!revealing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const t = setTimeout(() => setCount(dialogue.text.length), 0); return () => clearTimeout(t); }
    const t = setInterval(() => setCount(c => Math.min(c + 2, dialogue.text.length)), 29);
    return () => clearInterval(t);
  }, [dialogue.id, dialogue.text.length, revealing]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { if (initialFocus.current) { initialFocus.current = false; return; } actionRef.current?.querySelector<HTMLButtonElement>(mode === 'dialogue' ? '.continue-button' : 'button')?.focus({ preventScroll: true }); }, [mode]);

  function advance() {
    if (transitioning || mode !== 'dialogue') return;
    if (revealing) { setCount(dialogue.text.length); return; }
    if (index + 1 < scene.dialogue.length) { setIndex(index + 1); setCount(0); }
    else setMode(scene.choices ? 'choices' : 'end');
  }
  function restart(nextCompanion = companion) {
    if (timer.current) clearTimeout(timer.current);
    setCompanion(nextCompanion); setSceneId('opening'); setIndex(0); setCount(0); setMode('dialogue'); setSelected(null); setTransitioning(false);
  }
  function choose(choice: Choice) {
    if (transitioning) return;
    setSelected(choice); setTransitioning(true);
    timer.current = setTimeout(() => { setSceneId(choice.nextScene); setIndex(0); setCount(0); setMode('dialogue'); setTransitioning(false); }, 420);
  }
  const dadiExpression = mode === 'end' ? 'relieved' : transitioning && selected ? story.scenes[selected.nextScene].dialogue[0].expression : speaker === 'dadi' ? dialogue.expression : dialogue.listener;
  const companionExpression = transitioning && selected ? selected.companionExpression : mode === 'end' ? 'relieved' : speaker === companion ? dialogue.expression : dialogue.listener;

  return <main className="story-app">
    <header className="site-header"><a className="brand" href="/" aria-label="Return to story worlds" title="Return to story worlds"><Flower2 strokeWidth={1.5}/><span>{en.brand}</span></a><span className="header-tagline">{en.tagline}</span><button className="restart-button" aria-label={en.restart} onClick={() => restart()}><RotateCcw size={16}/><span>{en.restart}</span></button></header>
    <div className="story-shell">
      <div className="story-heading"><div><div className="eyebrow"><span><BookOpen size={14}/>{story.world}</span><span className="chapter">{en.chapter}</span></div><h1>{story.title}<span className="title-flourish" aria-hidden="true">✳</span></h1><p>{en.subtitle}</p></div>
        <fieldset className="companion-picker"><legend>{en.companion}</legend><RadioGroup value={companion} onValueChange={value => restart(value as Companion)} aria-label={en.companion} orientation="horizontal">{(['aara', 'aarav'] as Companion[]).map(c => <label key={c} className={companion === c ? 'companion-option active' : 'companion-option'}><RadioGroupItem value={c} aria-label={en[c]} /><span className={`companion-seed ${c}`}/>{en[c]}</label>)}</RadioGroup></fieldset>
      </div>
      <div className="story-book">
        <div className={`scene-stage ${transitioning ? 'is-transitioning' : ''}`}><KitchenBackground/><div className="scene-caption"><Sun size={15}/>{en.context}</div><div className="scene-corner" aria-hidden="true">01 / GHAR</div>
          <CharacterPosition position="left" character="dadi" expression={dadiExpression} animation={revealing && speaker === 'dadi' ? 'talking' : transitioning ? 'react' : 'idle'} active={mode === 'dialogue' && speaker === 'dadi'}/>
          <CharacterPosition position="right" character={companion} expression={companionExpression} animation={revealing && speaker === companion ? 'talking' : transitioning ? 'react' : 'idle'} active={mode === 'dialogue' && speaker === companion}/>
          <span className="scene-note">A story unfolds in the everyday.</span>
        </div>
        <div className="story-interaction" ref={actionRef}>
          <SceneTransition sceneKey={`${sceneId}-${mode}`}>
            {mode === 'dialogue' && <DialogueBox dialogue={dialogue} speaker={en[speaker]} count={count} onContinue={advance} focusKey={sceneId}/>}
            {mode === 'choices' && <section className="choices-panel"><div className="choices-heading"><span className="eyebrow">YOUR TURN</span><h2>{en.choose}</h2><p>{en.chooseHint}</p></div><div className="choices-list">{scene.choices?.map((choice, i) => <ChoiceButton key={choice.id} choice={choice} index={i} selected={transitioning ? selected?.id ?? null : null} disabled={transitioning} onSelect={() => choose(choice)}/>)}</div></section>}
            {mode === 'end' && <section className="ending-panel"><Flower2 size={32}/><span className="eyebrow">A MOMENT TO REFLECT</span><h2>{en.end}</h2><p>{selected?.consequence}</p><p className="ending-hint">{en.endHint}</p><button className="primary-button" onClick={() => { setSceneId('opening'); setIndex(2); setCount(story.scenes.opening.dialogue[2].text.length); setSelected(null); setMode('choices'); }}>{en.another}<ArrowRight size={17}/></button></section>}
          </SceneTransition>
        </div>
        <div className="book-footer"><span className="chapter-label">A CONVERSATION AT HOME</span><StoryProgress step={mode === 'end' || sceneId !== 'opening' ? 3 : mode === 'choices' ? 2 : index === 0 ? 0 : 1}/><span className="page-number">{sceneId !== 'opening' ? '04' : mode === 'choices' ? '03' : `0${index + 1}`}</span></div>
      </div>
      <footer className="philosophy"><span aria-hidden="true">✧</span>{en.footer}<span aria-hidden="true">✧</span></footer>
    </div>
  </main>;
}





