'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clapperboard, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useReelAudio } from '@/lib/reels/useReelAudio';
import type { RituReel } from '@/data/reels/rituReels';
import { localizeStory } from '@/data/translations';
import { skills } from '@/data/skills';
import { useLanguage } from '@/lib/useLanguage';
import { useStoryPlayer } from '@/lib/story/useStoryPlayer';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
import { KitchenBackground } from '@/components/story/KitchenBackground';
import { CharacterPosition } from '@/components/story/CharacterPosition';
import { DialogueBox } from '@/components/story/DialogueBox';
import { ChoiceButton } from '@/components/story/ChoiceButton';
import { SceneTransition } from '@/components/story/SceneTransition';
import { ScienceCheck } from '@/components/science/ScienceCheck';
import { SkillGain } from '@/components/story/SkillGain';

export function ReelPlayer({ reel }: { reel: RituReel }) {
  const { language, t } = useLanguage();
  const story = useMemo(() => localizeStory(reel, language), [reel, language]);
  const player = useStoryPlayer(story, { instantCaptions: true });
  const { scene, sceneId, index, mode, dialogue, ready, transitioning } = player;
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captionsOnly, setCaptionsOnly] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [playSession, setPlaySession] = useState(0);
  const beat = `${sceneId}-${index}-${mode}`;
  const timingKey = `${reel.id}-${playSession}-${language}-${beat}`;
  const duration = reel.timings[sceneId]?.[index] ?? 4000;
  const running = ready && started && !paused && !hidden && !transitioning && mode !== 'choices' && mode !== 'end';
  const latest = useRef(player);
  latest.current = player;
  const clock = useRef({ key: '', remaining: duration });
  const interaction = useRef<HTMLDivElement>(null);
  const audioText = mode === 'dialogue' ? dialogue.text : mode === 'science' && scene.scienceCheck ? `${scene.scienceCheck.evidence} ${scene.scienceCheck.takeaway}` : mode === 'narrative' ? scene.narrative ?? '' : '';
  const audioSpeaker = mode === 'dialogue' && dialogue.speaker === 'dadi' ? 'dadi' : 'aara';
  const audioId = mode === 'dialogue' ? dialogue.id : sceneId;
  const audio = useReelAudio({ beat: timingKey, text: audioText, speaker: audioSpeaker, language, src: reel.audio?.[audioId]?.[language], enabled: ready && started && !captionsOnly && !!audioText && !transitioning, paused: paused || hidden, muted, onEnd: () => latest.current.advance() });

  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  useEffect(() => {
    if (clock.current.key !== timingKey) clock.current = { key: timingKey, remaining: duration };
    if (!running || (!captionsOnly && audioText)) return;
    const started = performance.now();
    const timer = setTimeout(() => latest.current.advance(), clock.current.remaining);
    return () => {
      clearTimeout(timer);
      clock.current.remaining = Math.max(0, clock.current.remaining - (performance.now() - started));
    };
  }, [timingKey, duration, running, captionsOnly, audioText]);
  useEffect(() => {
    if (mode === 'choices' || mode === 'end') interaction.current?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  }, [mode]);

  function replay() {
    clock.current.key = '';
    setPlaySession(value => value + 1);
    setPaused(false);
    setStarted(true);
    player.restart();
  }
  const speaking = audio.speaking;
  function togglePlayback() { if (!started) { setStarted(true); setPaused(false); } else setPaused(value => !value); }
  const dadiExpression = mode === 'end' ? 'happy' : mode === 'dialogue' ? dialogue.speaker === 'dadi' ? dialogue.expression : dialogue.listener : 'thinking';
  const aaraExpression = mode === 'end' ? 'happy' : mode === 'dialogue' ? dialogue.speaker === 'aara' ? dialogue.expression : dialogue.listener : 'thinking';

  return <main className="reels-player-page">
    <header className="reels-player-header"><a className="reels-back" href="/ritureels"><ArrowLeft size={17}/>{t('All reels')}</a><LanguageSelector/></header>
    <div className={`reel-frame reel-${reel.theme}`}>
      <div className="reel-title-row"><div><p className="eyebrow"><Clapperboard size={14}/>{t('RituReels')} · {t('Dadi Se Baat')}</p><h1>{story.title}</h1></div><button className="reel-icon-button" onClick={replay} disabled={!ready} aria-label={t('Replay reel')} title={t('Replay reel')}><RotateCcw size={19}/></button></div>
      <div className="reel-progress" role="progressbar" aria-label={t('Reel progress')} aria-valuemin={0} aria-valuemax={5} aria-valuenow={scene.progress ?? 0}>{Array.from({ length: 5 }, (_, i) => <span className={i < (scene.progress ?? 0) ? 'finished' : i === (scene.progress ?? 0) ? 'current' : ''} key={i}/>)}</div>
      <div className="scene-stage reel-stage">
        <KitchenBackground/>
        <span className="scene-caption">{t(reel.context ?? '')}</span>
        <CharacterPosition character="dadi" position="left" expression={dadiExpression} animation={speaking && audioSpeaker === 'dadi' ? 'talking' : 'idle'} active={speaking && audioSpeaker === 'dadi'}/>
        <CharacterPosition character="aara" position="right" expression={aaraExpression} animation={speaking && audioSpeaker === 'aara' ? 'talking' : 'idle'} active={speaking && audioSpeaker === 'aara'}/>
        {mode !== 'choices' && mode !== 'end' && <button className="reel-pause" disabled={!ready} onClick={togglePlayback} aria-label={t(!started || paused ? 'Play reel' : 'Pause reel')}>{!started || paused ? <Play size={17}/> : <Pause size={17}/>}<span>{t(!started || paused ? 'Play reel' : 'Pause reel')}</span></button>}
        <button className="reel-mute reel-icon-button" onClick={() => setMuted(value => !value)} aria-label={t(muted ? 'Unmute' : 'Mute')} aria-pressed={muted}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
      </div>
      <div className="reel-interaction" ref={interaction} onFocusCapture={event => { if ((event.target as HTMLElement).closest('.science-sources a')) setPaused(true); }}>
        {!started && mode !== 'end' && mode !== 'choices' && <p className="reel-audio-notice">{t('Tap Play to hear Dadi and Aara.')}</p>}
        {audio.status === 'loading' && <p className="reel-audio-notice" role="status">{t('Preparing speech…')}</p>}
        {audio.status === 'error' && !captionsOnly && <div className="reel-audio-notice" role="status"><p>{t('Audio could not play. This language needs two distinct voices or recorded audio.')}</p><button onClick={() => { setPaused(false); audio.retry(); }}>{t('Retry audio')}</button><button onClick={() => { setCaptionsOnly(true); setPaused(false); }}>{t('Continue with captions')}</button></div>}
        {captionsOnly && <div className="reel-audio-notice"><span>{t('Caption playback')}</span><button onClick={() => { setCaptionsOnly(false); setPaused(false); audio.retry(); }}>{t('Retry audio')}</button></div>}
        <SkillGain gains={player.gains}/>
        <SceneTransition sceneKey={`${beat}-${language}`}>
          {mode === 'dialogue' && <DialogueBox dialogue={dialogue} speaker={dialogue.speaker === 'dadi' ? 'Dadi' : 'Aara'} count={dialogue.text.length} onContinue={player.advance} focusKey={beat} passive/>}
          {mode === 'science' && scene.scienceCheck && <ScienceCheck content={scene.scienceCheck} onContinue={player.advance} automatic/>}
          {mode === 'narrative' && <section className="reel-endcard"><span className="eyebrow">{t('A moment to think')}</span><h2>{scene.narrative}</h2></section>}
          {mode === 'choices' && <section className="choices-panel"><div className="choices-heading"><span className="eyebrow">{t('Your reflection')}</span><h2 tabIndex={-1}>{scene.choicePrompt}</h2></div><div className="choices-list">{scene.choices?.map((choice, i) => <ChoiceButton key={choice.id} choice={choice} index={i} selected={player.pendingChoice?.id ?? null} disabled={!ready || transitioning} onSelect={() => { setPaused(false); player.choose(choice); }}/>)}</div></section>}
          {mode === 'end' && <section className="reel-complete"><Check size={30}/><h2 tabIndex={-1}>{t('Reel complete')}</h2><p>{scene.narrative}</p><div className="reel-skill-totals">{skills.map(({ id, name, icon: Icon }) => <div key={id}><Icon size={19}/><strong>{player.skills[id]}</strong><span>{t(name)}</span></div>)}</div><p className="reel-points-note">{t('Your journey totals. Replaying keeps your earned points.')}</p><div className="reel-complete-actions"><button className="continue-button" onClick={replay}><RotateCcw size={15}/>{t('Replay reel')}</button><a href="/ritureels">{t('All reels')}<ArrowRight size={16}/></a><a href="/">{t('Back to Story World')}</a></div></section>}
        </SceneTransition>
      </div>
      {captionsOnly && mode !== 'choices' && mode !== 'end' && <div className="reel-beat-progress" aria-hidden="true"><span key={timingKey} style={{ animationDuration: `${duration}ms`, animationPlayState: running ? 'running' : 'paused' }}/></div>}
      <p className="reel-watch-note">{t(mode === 'choices' ? 'Take your time. The reel waits for your reflection.' : mode === 'end' ? 'A small conversation. A new way to think.' : 'Listen at your pace. Pause whenever you need.')}</p>
    </div>
    {player.storageUnavailable && <p className="local-save-note" role="status">{t('Your browser cannot save progress right now. You can keep playing in this tab.')}</p>}
  </main>;
}
