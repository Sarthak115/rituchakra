'use client';
import { useEffect, useRef, useMemo } from 'react';
import { BookOpen, Flower2, RotateCcw, Sun, ArrowRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { dadiKiRasoi as defaultStory } from '@/data/stories/dadiKiRasoi';
import { useLanguage } from '@/lib/useLanguage';
import { localizeStory } from '@/data/translations';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { SchoolBackground } from './SchoolBackground';
import { PerspectiveSwitch } from './PerspectiveSwitch';
import type { Companion, Story } from '@/lib/story/types';
import { useStoryTool } from '@/lib/story/useStoryTool';
import { KitchenBackground } from './KitchenBackground';
import { CharacterPosition } from './CharacterPosition';
import { DialogueBox } from './DialogueBox';
import { ChoiceButton } from './ChoiceButton';
import { StoryProgress } from './StoryProgress';
import { SceneTransition } from './SceneTransition';
import { useStoryPlayer } from '@/lib/story/useStoryPlayer';
import { ScienceCheck } from '@/components/science/ScienceCheck';
import { StoryCompletion } from './StoryCompletion';
import { SkillGain } from './SkillGain';

export function StoryScene({ storyData = defaultStory }: { storyData?: Story }) {
  const { language, t, copy: en } = useLanguage();
  const story = useMemo(() => localizeStory(storyData, language), [storyData, language]);
  const school = story.setting === 'school';
  const player = useStoryPlayer(story);
  const { companion, sceneId, index, mode, scene, dialogue, pendingChoice, transitioning, revealing, count, advance, restart, choose, ready } = player;
  const speaker = dialogue.speaker === 'companion' ? companion : dialogue.speaker;
  const actionRef = useRef<HTMLDivElement>(null);
  const initialFocus = useRef(true);
  useStoryTool({ companion, scene: sceneId, speaker, dialogue: mode === 'dialogue' ? dialogue.text : scene.narrative ?? scene.scienceCheck?.evidence ?? '', mode, choices: mode === 'choices' ? (scene.choices ?? []).map(c => ({ id: c.id, text: c.text })) : [] });
  useEffect(() => {
    if (initialFocus.current) { initialFocus.current = false; return; }
    actionRef.current?.querySelector<HTMLElement>(mode === 'dialogue' ? '.continue-button' : 'button, a.primary-button')?.focus({ preventScroll: true });
  }, [mode]);
  const dadiExpression = mode === 'end' ? 'relieved' : mode === 'narrative' || mode === 'science' || mode === 'perspective' ? 'thinking' : pendingChoice ? story.scenes[pendingChoice.nextScene].dialogue[0].expression : speaker === (school ? 'aarav' : 'dadi') ? dialogue.expression : dialogue.listener;
  const companionExpression = pendingChoice ? pendingChoice.companionExpression : mode === 'end' ? 'relieved' : mode === 'narrative' || mode === 'science' || mode === 'perspective' ? 'thinking' : speaker === (school ? 'aara' : companion) ? dialogue.expression : dialogue.listener;
  const step = scene.progress ?? (mode === 'choices' ? 1 : index === 0 ? 0 : 1);
  return <main className="story-app">
    <header className="site-header"><a className="brand" href="/" aria-label={t('Return to story worlds')} title={t('Return to story worlds')}><Flower2 strokeWidth={1.5}/><span>{en.brand}</span></a><span className="header-tagline">{en.tagline}</span><div className="story-header-actions"><LanguageSelector/><button className="restart-button" aria-label={en.restart} disabled={!ready} onClick={() => restart()}><RotateCcw size={16}/><span>{en.restart}</span></button></div></header>
    <div className="story-shell">
      <div className="story-heading"><div><div className="eyebrow"><span><BookOpen size={14}/>{story.world}</span><span className="chapter">{school ? t('CHAPTER 02') : en.chapter}</span></div><h1>{story.title}<span className="title-flourish" aria-hidden="true">✳</span></h1><p>{school ? t('One moment. Two points of view.') : en.subtitle}</p></div>
        {!school && <fieldset className="companion-picker"><legend>{en.companion}</legend><RadioGroup disabled={!ready} value={companion} onValueChange={value => restart(value as Companion)} aria-label={en.companion} orientation="horizontal">{(['aara', 'aarav'] as Companion[]).map(c => <label key={c} className={companion === c ? 'companion-option active' : 'companion-option'}><RadioGroupItem value={c} aria-label={en[c]} /><span className={`companion-seed ${c}`}/>{en[c]}</label>)}</RadioGroup></fieldset>}
      </div>
      <div className="story-book">
        <div className={`scene-stage ${school ? 'school-stage' : ''} ${transitioning ? 'is-transitioning' : ''} ${mode === 'perspective' ? 'perspective-stage' : ''}`} data-view={scene.view}>{school ? <SchoolBackground/> : <KitchenBackground/>}<div className="scene-caption"><Sun size={15}/>{school ? t('Between classes · School corridor') : en.context}</div><div className="scene-corner" aria-hidden="true">{school ? t(scene.view === 'aarav' ? 'Aarav’s view' : 'Aara’s view') : `01 / ${story.world}`}</div>
          <CharacterPosition position="left" character={school ? 'aarav' : 'dadi'} expression={dadiExpression} animation={revealing && speaker === (school ? 'aarav' : 'dadi') ? 'talking' : transitioning ? 'react' : 'idle'} active={mode === 'dialogue' && speaker === (school ? 'aarav' : 'dadi')}/>
          <CharacterPosition position="right" character={school ? 'aara' : companion} expression={companionExpression} animation={revealing && speaker === (school ? 'aara' : companion) ? 'talking' : transitioning ? 'react' : 'idle'} active={mode === 'dialogue' && speaker === (school ? 'aara' : companion)}/>
          <span className="scene-note">{t('A story unfolds in the everyday.')}</span>
        </div>
        <div className="story-interaction" ref={actionRef}><SkillGain gains={player.gains}/>
          <SceneTransition sceneKey={`${sceneId}-${mode}`}>
            {mode === 'dialogue' && <DialogueBox dialogue={dialogue} speaker={en[speaker]} count={count} onContinue={advance} focusKey={sceneId}/>}
            {mode === 'choices' && <section className="choices-panel"><div className="choices-heading"><span className="eyebrow">{t('YOUR TURN')}</span><h2>{en.choose}</h2><p>{en.chooseHint}</p></div><div className="choices-list">{scene.choices?.map((choice, i) => <ChoiceButton key={choice.id} choice={choice} index={i} selected={transitioning ? pendingChoice?.id ?? null : null} disabled={transitioning || !ready} onSelect={() => choose(choice)}/>)}</div></section>}
            {mode === 'narrative' && <section className="story-narrative"><span className="eyebrow">{t('A MOMENT TO REFLECT')}</span><h2>{scene.narrative}</h2><button className="continue-button" onClick={advance}>{t('Let’s check together')}<ArrowRight size={17}/></button></section>}
            {mode === 'perspective' && <PerspectiveSwitch onContinue={advance}/>}
            {mode === 'science' && scene.scienceCheck && <ScienceCheck content={scene.scienceCheck} experienced={school} onContinue={advance}/>}
            {mode === 'end' && <StoryCompletion story={story} values={player.skills} onReplay={() => restart()}/>}
          </SceneTransition>
        </div>
        <div className="book-footer"><span className="chapter-label">{t(school ? 'A MOMENT AT SCHOOL' : 'A CONVERSATION AT HOME')}</span><StoryProgress step={step} school={school}/><span className="page-number">{mode === 'end' ? '✓' : String(step + 1).padStart(2, '0')}</span></div>
      </div>
      {player.storageUnavailable && <p className="local-save-note" role="status">{t('Your browser cannot save progress right now. You can keep playing in this tab.')}</p>}<footer className="philosophy"><span aria-hidden="true">✧</span>{en.footer}<span aria-hidden="true">✧</span></footer>
    </div>
  </main>;
}






