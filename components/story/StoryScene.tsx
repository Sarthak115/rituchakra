'use client';
import { useEffect, useRef, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BookOpen, Flower2, Minus, Plus, Presentation, RotateCcw, Sun, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { dadiKiRasoi as defaultStory } from '@/data/stories/dadiKiRasoi';
import { useLanguage } from '@/lib/useLanguage';
import { localizeStory } from '@/data/translations';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { SchoolBackground } from './SchoolBackground';
import { ParkBackground } from './ParkBackground';
import { NagarBackground } from './NagarBackground';
import { PerspectiveSwitch } from './PerspectiveSwitch';
import type { Choice, Companion, Story } from '@/lib/story/types';
import { useStoryTool } from '@/lib/story/useStoryTool';
import { KitchenBackground } from './KitchenBackground';
import { CharacterPosition } from './CharacterPosition';
import { DialogueBox } from './DialogueBox';
import { ChoiceButton } from './ChoiceButton';
import { StoryProgress } from './StoryProgress';
import { SceneTransition } from './SceneTransition';
import { SceneIntro } from './SceneIntro';
import { ConsequenceCard } from './ConsequenceCard';
import { useStoryPlayer } from '@/lib/story/useStoryPlayer';
import { updateProgress, useProgress } from '@/lib/story/useProgress';
import { storyForCompanion } from '@/lib/story/engine';
import { ScienceCheck } from '@/components/science/ScienceCheck';
import { StoryCompletion } from './StoryCompletion';
import { SkillGain } from './SkillGain';

// Keyed by story so client-side navigation between worlds starts each story with fresh UI state.
export function StoryScene({ storyData = defaultStory }: { storyData?: Story }) {
  return <StoryStage key={storyData.id} storyData={storyData}/>;
}

function StoryStage({ storyData }: { storyData: Story }) {
  const { language, t, copy: en } = useLanguage();
  const { companion: chosen, classroom = false } = useProgress().progress;
  // Class vote tallies for the current decision. Counts only; nothing is stored.
  const [votes, setVotes] = useState<Record<string, number>>({});
  const story = useMemo(() => localizeStory(storyForCompanion(storyData, chosen), language), [storyData, chosen, language]);
  const school = story.setting === 'school' || story.setting === 'community' || story.setting === 'city';
  const bazaar = story.setting === 'bazaar';
  const peers = school || bazaar;
  const [introPending, setIntroPending] = useState(true);
  const [consequence, setConsequence] = useState<Choice | null>(null);
  const player = useStoryPlayer(story, { hold: introPending || !!consequence });
  const { companion, sceneId, index, mode, scene, dialogue, pendingChoice, transitioning, revealing, count, advance, restart, choose, ready } = player;
  const speaker = dialogue.speaker === 'companion' ? companion : dialogue.speaker;
  const left = peers ? 'aarav' : 'dadi', right = peers ? 'aara' : companion;
  const guest = scene.guest;
  const atStart = sceneId === (story.startScene ?? 'opening') && index === 0 && mode === 'dialogue';
  const showIntro = ready && introPending && atStart;
  const showConsequence = !!consequence && !transitioning && mode === 'dialogue';
  const talking = mode === 'dialogue' && !showIntro && !showConsequence;
  const actionRef = useRef<HTMLDivElement>(null);
  const initialFocus = useRef(true);
  useStoryTool({ companion, scene: sceneId, speaker, dialogue: mode === 'dialogue' ? dialogue.text : scene.narrative ?? scene.scienceCheck?.evidence ?? '', mode, choices: mode === 'choices' ? (scene.choices ?? []).map(c => ({ id: c.id, text: c.text })) : [] });
  useEffect(() => {
    if (initialFocus.current) { initialFocus.current = false; return; }
    actionRef.current?.querySelector<HTMLElement>(mode === 'dialogue' ? '.continue-button' : 'button, a.primary-button')?.focus({ preventScroll: true });
  }, [mode, showConsequence]);
  // The title card plays once at the start of a story; mid-story reloads skip it.
  useEffect(() => {
    if (!ready || !introPending) return;
    const timer = setTimeout(() => setIntroPending(false), atStart ? 2400 : 0);
    return () => clearTimeout(timer);
  }, [ready, introPending, atStart]);

  function pick(choice: Choice) { setVotes({}); setConsequence(choice.consequence ? choice : null); choose(choice); }
  const vote = (id: string, change: number) => setVotes(current => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + change) }));
  const topVote = Math.max(0, ...Object.values(votes));
  function restartStory(next?: Companion) { setVotes({}); setConsequence(null); setIntroPending(true); restart(next); }
  function rewind() { setConsequence(null); player.rewind(); }

  const reflective = mode === 'narrative' || mode === 'science' || mode === 'perspective';
  const leftExpression = mode === 'end' ? 'reassuring' : reflective ? 'thinking' : pendingChoice ? story.scenes[pendingChoice.nextScene].dialogue[0]?.expression ?? 'thinking' : speaker === left ? dialogue.expression : dialogue.listener;
  const rightExpression = pendingChoice ? pendingChoice.companionExpression : mode === 'end' ? 'happy' : reflective ? 'thinking' : speaker === right ? dialogue.expression : dialogue.listener;
  const guestExpression = mode === 'end' ? 'happy' : speaker === guest ? dialogue.expression : dialogue.listener;
  const step = scene.progress ?? (mode === 'choices' ? 1 : index === 0 ? 0 : 1);
  const context = story.context ? t(story.context) : school ? t('Between classes · School corridor') : en.context;
  return <main className={`story-app ${classroom ? 'classroom-mode' : ''}`}>
    <header className="site-header"><a className="brand" href="/" aria-label={t('Return to story worlds')} title={t('Return to story worlds')}><Flower2 strokeWidth={1.5}/><span>{en.brand}</span></a><span className="header-tagline">{en.tagline}</span><div className="story-header-actions"><button className="restart-button classroom-toggle" aria-pressed={classroom} title={t('Classroom view')} onClick={() => updateProgress(current => ({ ...current, classroom: !current.classroom }))}><Presentation size={16}/><span>{t('Classroom view')}</span></button><LanguageSelector/><button className="restart-button" aria-label={en.restart} disabled={!ready} onClick={() => restartStory()}><RotateCcw size={16}/><span>{en.restart}</span></button></div></header>
    <div className="story-shell">
      <div className="story-heading"><div><div className="eyebrow"><span><BookOpen size={14}/>{story.world}</span><span className="chapter">{story.chapter ? t(story.chapter) : school ? t('CHAPTER 02') : en.chapter}</span></div><h1>{story.title}<span className="title-flourish" aria-hidden="true">✳</span></h1><p>{story.subtitle ? t(story.subtitle) : school ? t('One moment. Two points of view.') : en.subtitle}</p></div>
        {!peers && <fieldset className="companion-picker"><legend>{en.companion}</legend><RadioGroup disabled={!ready} value={companion} onValueChange={value => restartStory(value as Companion)} aria-label={en.companion} orientation="horizontal">{(['aara', 'aarav'] as Companion[]).map(c => <label key={c} className={companion === c ? 'companion-option active' : 'companion-option'}><RadioGroupItem value={c} aria-label={en[c]} /><span className={`companion-seed ${c}`}/>{en[c]}</label>)}</RadioGroup></fieldset>}
      </div>
      <div className="story-book">
        <div className={`scene-stage ${peers ? 'school-stage' : ''} ${bazaar ? 'bazaar-stage' : ''} ${transitioning ? 'is-transitioning' : ''} ${mode === 'perspective' ? 'perspective-stage' : ''} ${guest ? 'has-guest' : ''}`} data-view={scene.view}>{bazaar ? <picture><source srcSet="/bazaar-background.webp" type="image/webp"/><img className="kitchen-background bazaar-background" src="/bazaar-background.jpg" alt="" aria-hidden="true"/></picture> : story.setting === 'community' ? <ParkBackground/> : story.setting === 'city' ? <NagarBackground/> : school ? <SchoolBackground/> : <KitchenBackground/>}<div className="scene-caption"><Sun size={15}/>{context}</div><div className="scene-corner" aria-hidden="true">{peers ? t(scene.view === 'aarav' ? 'Aarav’s view' : 'Aara’s view') : `01 / ${story.world}`}</div>
          <CharacterPosition position="left" character={left} expression={leftExpression} animation={revealing && talking && speaker === left ? 'talking' : transitioning ? 'react' : 'idle'} active={talking && speaker === left} dialogueActive={talking} reactKey={`${sceneId}-${index}`}/>
          <CharacterPosition position="right" character={right} expression={rightExpression} animation={revealing && talking && speaker === right ? 'talking' : transitioning ? 'react' : 'idle'} active={talking && speaker === right} dialogueActive={talking} reactKey={`${sceneId}-${index}`}/>
          {guest && <CharacterPosition position="guest" character={guest} expression={guestExpression} animation={revealing && talking && speaker === guest ? 'talking' : 'idle'} active={talking && speaker === guest} dialogueActive={talking} reactKey={`${sceneId}-${index}`}/>}
          <span className="scene-note">{t('A story unfolds in the everyday.')}</span>
          <AnimatePresence>{showIntro && <SceneIntro key="intro" world={story.world} title={story.title} place={context} onDone={() => setIntroPending(false)}/>}</AnimatePresence>
        </div>
        <div className="story-interaction" ref={actionRef}><SkillGain gains={player.gains}/>
          <SceneTransition sceneKey={`${sceneId}-${mode}-${showConsequence}`}>
            {showConsequence && consequence && <ConsequenceCard choice={consequence} onContinue={() => setConsequence(null)}/>}
            {mode === 'dialogue' && !showConsequence && <DialogueBox dialogue={dialogue} speaker={en[speaker]} count={count} onContinue={advance} focusKey={`${sceneId}-${index}`} side={speaker === left ? 'left' : speaker === guest ? 'guest' : 'right'} line={[index + 1, scene.dialogue.length]}/>}
            {mode === 'choices' && <section className="choices-panel"><div className="choices-heading"><span className="eyebrow">{t(classroom ? 'CLASS VOTE' : 'YOUR TURN')}</span><h2>{scene.choicePrompt ?? en.choose}</h2><p>{classroom ? t('Raise hands for each answer. Count the votes, then click the class’s choice.') : en.chooseHint}</p></div><div className="choices-list">{scene.choices?.map((choice, i) => {
              const button = <ChoiceButton key={choice.id} choice={choice} index={i} selected={transitioning ? pendingChoice?.id ?? null : null} disabled={transitioning || !ready} onSelect={() => pick(choice)}/>;
              if (!classroom) return button;
              const count = votes[choice.id] ?? 0;
              return <div key={choice.id} className={`vote-row ${count > 0 && count === topVote ? 'vote-leader' : ''}`}>{button}<div className="vote-tally"><button onClick={() => vote(choice.id, -1)} disabled={!count} aria-label={`${t('Remove a vote')}: ${choice.text}`}><Minus size={18}/></button><output aria-live="polite" aria-label={`${count} ${t('votes')}`}>{count}</output><button onClick={() => vote(choice.id, 1)} aria-label={`${t('Add a vote')}: ${choice.text}`}><Plus size={18}/></button></div></div>;
            })}</div></section>}
            {mode === 'narrative' && <section className="story-narrative"><span className="eyebrow">{t('A MOMENT TO REFLECT')}</span><h2>{scene.narrative}</h2><button className="continue-button" onClick={advance}>{t(story.scenes[scene.nextScene ?? '']?.kind === 'science' ? 'Let’s check together' : 'Continue')}<ArrowRight size={17}/></button></section>}
            {mode === 'perspective' && <PerspectiveSwitch onContinue={advance}/>}
            {mode === 'science' && scene.scienceCheck && <ScienceCheck content={scene.scienceCheck} experienced={school} onContinue={advance}/>}
            {mode === 'end' && <StoryCompletion story={story} values={player.skills} onReplay={() => restartStory()} onRewind={player.canRewind ? rewind : undefined}/>}
          </SceneTransition>
        </div>
        <div className="book-footer"><span className="chapter-label">{t(story.footerLabel ?? (school ? 'A MOMENT AT SCHOOL' : 'A CONVERSATION AT HOME'))}</span><StoryProgress step={step} school={school} labels={story.stages}/><span className="page-number">{mode === 'end' ? '✓' : String(step + 1).padStart(2, '0')}</span></div>
      </div>
      {player.storageUnavailable && <p className="local-save-note" role="status">{t('Your browser cannot save progress right now. You can keep playing in this tab.')}</p>}<footer className="philosophy"><span aria-hidden="true">✧</span>{en.footer}<span aria-hidden="true">✧</span></footer>
    </div>
  </main>;
}
