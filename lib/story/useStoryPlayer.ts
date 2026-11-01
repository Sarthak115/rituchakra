'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import type { Choice, Companion, Story, StoryState } from './types';
import { advanceStory, getChoice, initialStoryState, restoreStoryState, rewindToLastChoice, selectChoice } from './engine';
import { emptySkills, recordTransition } from './progress';
import { updateProgress, useProgress } from './useProgress';

export function useStoryPlayer(story: Story, options?: { instantCaptions?: boolean; hold?: boolean }) {
  const { progress, ready, storageUnavailable } = useProgress();
  // A checkpoint saved while playing as the other companion belongs to the other version: start fresh.
  const saved = progress.stories[story.id]?.checkpoint;
  const state = restoreStoryState(story, saved?.companion && saved.companion !== progress.companion ? null : saved);
  const { sceneId, index, mode } = state;
  const scene = story.scenes[sceneId];
  const dialogue = scene.dialogue[index] ?? story.scenes[story.startScene ?? 'opening'].dialogue.at(-1)!;
  const selected = getChoice(story, state.choiceId) ?? null;
  const [pendingChoice, setPendingChoice] = useState<Choice | null>(null);
  const [reveal, setReveal] = useState({ key: '', count: 0 });
  const [gains, setGains] = useState(emptySkills);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locked = useRef(false);
  const revealKey = `${progress.language}-${progress.companion}-${sceneId}-${index}`;
  const boundaries = useMemo(() => Array.from(new Intl.Segmenter(progress.language, { granularity: 'grapheme' }).segment(dialogue.text), segment => segment.index + segment.segment.length), [dialogue.text, progress.language]);
  const count = options?.instantCaptions ? dialogue.text.length : reveal.key === revealKey ? reveal.count : 0;
  // `hold` pauses the typewriter while an intro or consequence card covers the dialogue.
  const revealing = ready && mode === 'dialogue' && count < dialogue.text.length;
  const hold = !!options?.hold;
  useEffect(() => {
    if (!revealing || hold) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setInterval(() => setReveal(previous => {
      const current = previous.key === revealKey ? previous.count : 0;
      const next = boundaries.findIndex(end => end > current);
      return { key: revealKey, count: reduced || next < 0 ? dialogue.text.length : boundaries[Math.min(next + 1, boundaries.length - 1)] };
    }), reduced ? 1 : 29);
    return () => clearInterval(t);
  }, [revealing, hold, revealKey, dialogue.text.length, boundaries]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (!Object.values(gains).some(Boolean)) return;
    const t = setTimeout(() => setGains(emptySkills()), 4200);
    return () => clearTimeout(t);
  }, [gains]);

  function commit(next: StoryState) {
    let earned = emptySkills();
    updateProgress(current => {
      const saved = recordTransition(current, story, state, { ...next, companion: current.companion });
      earned = saved.gains;
      return saved.progress;
    });
    if (Object.values(earned).some(Boolean)) setGains(earned);
  }
  function advance() {
    if (!ready || locked.current || mode === 'choices' || mode === 'end') return;
    if (revealing) { setReveal({ key: revealKey, count: dialogue.text.length }); return; }
    commit(advanceStory(story, state));
  }
  function restart(companion: Companion = progress.companion) {
    if (timer.current) clearTimeout(timer.current);
    locked.current = false; setPendingChoice(null); setGains(emptySkills()); setReveal({ key: '', count: 0 });
    updateProgress(current => ({ ...current, companion, stories: { ...current.stories, [story.id]: { ...(current.stories[story.id] ?? { choiceAwarded: false, completed: false }), checkpoint: { ...initialStoryState(story), companion } } } }));
  }
  function rewind() {
    const previous = rewindToLastChoice(story, state);
    if (!ready || !previous) return;
    if (timer.current) clearTimeout(timer.current);
    locked.current = false; setPendingChoice(null); setGains(emptySkills()); setReveal({ key: '', count: 0 });
    commit(previous);
  }
  function choose(choice: Choice) {
    if (!ready || locked.current || mode !== 'choices') return;
    const next = selectChoice(story, state, choice.id);
    locked.current = true; setPendingChoice(choice);
    timer.current = setTimeout(() => { commit(next); setPendingChoice(null); locked.current = false; }, 420);
  }
  return { companion: progress.companion, sceneId, index, mode, scene, dialogue, selected, pendingChoice, transitioning: !!pendingChoice, revealing: revealing && !hold, count, advance, restart, choose, rewind, canRewind: !!(state.choiceIds?.length || state.choiceId), gains, skills: progress.skills, ready, storageUnavailable };
}

