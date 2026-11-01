import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dadiKiRasoi } from '../data/stories/dadiKiRasoi';
import { theStain } from '../data/stories/theStain';
import { chooseWhatFits } from '../data/stories/chooseWhatFits';
import { theJoke } from '../data/stories/theJoke';
import { theLongJourney } from '../data/stories/theLongJourney';
import { translations } from '../data/translations';
import { storyForCompanion } from '../lib/story/engine';
import type { Story } from '../lib/story/types';

// Every learner-facing string of every story, in both companion versions, needs Hindi and Odia.
function strings(story: Story) {
  const keys = [story.title, story.world, story.chapter, story.subtitle, story.context, story.footerLabel, story.reflection, ...(story.stages ?? [])];
  for (const scene of Object.values(story.scenes)) {
    for (const line of scene.dialogue) keys.push(line.translation || line.text);
    for (const choice of scene.choices ?? []) keys.push(choice.translation || choice.text, choice.consequence);
    keys.push(scene.narrative, scene.choicePrompt);
    const check = scene.scienceCheck;
    if (check) keys.push(check.belief, check.evidence, check.takeaway, check.cultureNote, ...check.sources.map(source => source.title));
  }
  return keys.filter((key): key is string => !!key);
}

test('all story text has Hindi and Odia for both Aara and Aarav', () => {
  const missing = new Set<string>();
  for (const base of [dadiKiRasoi, theStain, chooseWhatFits, theJoke, theLongJourney]) for (const companion of ['aara', 'aarav'] as const)
    for (const key of strings(storyForCompanion(base, companion))) if (!translations[key]?.[0] || !translations[key]?.[1]) missing.add(key);
  assert.deepEqual([...missing], []);
});

test('Aarav is never told about his own period', () => {
  const aarav = storyForCompanion(dadiKiRasoi, 'aarav');
  for (const scene of Object.values(aarav.scenes)) for (const line of scene.dialogue)
    if (line.speaker === 'dadi') assert.doesNotMatch(line.translation, /your period/i, line.id);
});

test('Ghar as Aarav: every branch reaches the end and Aara joins only at the end', async () => {
  const { initialStoryState, advanceStory, selectChoice } = await import('../lib/story/engine');
  const aarav = storyForCompanion(dadiKiRasoi, 'aarav');
  for (const pick of ['why', 'fact', 'source']) {
    let state = initialStoryState(aarav);
    const guests: string[] = [];
    for (let i = 0; i < 40 && state.mode !== 'end'; i++) {
      if (aarav.scenes[state.sceneId].guest) guests.push(state.sceneId);
      state = state.mode === 'choices' ? selectChoice(aarav, state, pick) : advanceStory(aarav, state);
    }
    assert.equal(state.mode, 'end');
    assert.deepEqual([...new Set(guests)], ['resolution']);
  }
});
