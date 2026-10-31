import { test } from 'node:test';
import assert from 'node:assert/strict';
import { theStain } from '../data/stories/theStain';
import { theJoke } from '../data/stories/theJoke';
import { advanceStory, initialStoryState, restoreStoryState, rewindToLastChoice, selectChoice } from '../lib/story/engine';
import type { Story, StoryState } from '../lib/story/types';

function playTo(story: Story, picks: string[]) {
  let state: StoryState = initialStoryState(story);
  const queue = [...picks];
  for (let i = 0; i < 80 && state.mode !== 'end'; i++) state = state.mode === 'choices' ? selectChoice(story, state, queue.shift()!) : advanceStory(story, state);
  return state;
}

for (const [story, picks] of [[theStain, ['ask-teacher', 'offer-help']], [theJoke, ['step-in', 'offer-support']]] as const) {
  test(`${story.title}: "Try another choice" returns to the last decision as a valid save`, () => {
    const end = playTo(story, [...picks]);
    assert.equal(end.mode, 'end');
    const back = rewindToLastChoice(story, end)!;
    assert.equal(back.mode, 'choices');
    assert.ok(story.scenes[back.sceneId].choices?.some(choice => choice.id === picks[1]));
    assert.deepEqual(back.choiceIds, [picks[0]]);
    assert.deepEqual(restoreStoryState(story, back), back);
    // Rewinding again reaches the first decision, then nothing is left to undo.
    const first = rewindToLastChoice(story, back)!;
    assert.deepEqual(restoreStoryState(story, first), first);
    assert.equal(rewindToLastChoice(story, first), null);
  });
}

test('every story choice in the demo stories has consequence text and every story has a reflection', () => {
  for (const story of [theStain, theJoke]) {
    assert.ok(story.reflection);
    for (const scene of Object.values(story.scenes)) for (const choice of scene.choices ?? []) assert.ok(choice.consequence, `${story.id}/${choice.id}`);
  }
});

test('Classroom view is a saved on/off setting and nothing else', async () => {
  const { parseProgress } = await import('../lib/story/progress');
  assert.equal(parseProgress(JSON.stringify({ version: 1, classroom: true })).classroom, true);
  assert.equal(parseProgress(JSON.stringify({ version: 1, classroom: 'yes' })).classroom, undefined);
  assert.equal(parseProgress(null).classroom, undefined);
});

test('Nagar: all 9 paths reach evidence, reflection and the end; every choice has a consequence', async () => {
  const { theLongJourney } = await import('../data/stories/theLongJourney');
  const { advanceStory } = await import('../lib/story/engine');
  for (const first of ['tell-teacher', 'ask-friend', 'say-nothing']) for (const second of ['black-bag', 'no-secret', 'laugh-off']) {
    let state = initialStoryState(theLongJourney);
    const visited: string[] = [];
    for (let i = 0; i < 80 && state.mode !== 'end'; i++) {
      visited.push(state.sceneId);
      state = state.mode === 'choices' ? selectChoice(theLongJourney, state, state.sceneId === 'opening' ? first : second) : advanceStory(theLongJourney, state);
    }
    assert.equal(state.mode, 'end', `${first}/${second}`);
    for (const scene of ['roadside', 'switch', 'chemist', 'reflect', 'science', 'resolution']) assert.ok(visited.includes(scene), `${first}/${second} misses ${scene}`);
    assert.ok(visited.indexOf('switch') < visited.indexOf('chemist'));
  }
  assert.ok(theLongJourney.reflection);
  for (const scene of Object.values(theLongJourney.scenes)) for (const choice of scene.choices ?? []) assert.ok(choice.consequence, choice.id);
});
