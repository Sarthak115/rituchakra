import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dadiKiRasoi as story } from '../data/stories/dadiKiRasoi';
import { advanceStory, initialStoryState, selectChoice, restoreStoryState } from '../lib/story/engine';
import { emptyProgress, parseProgress, recordTransition, type LearnerProgress } from '../lib/story/progress';

function play(choiceId: string, progress: LearnerProgress = emptyProgress()) {
  let state = initialStoryState(story);
  const visited: string[] = [];
  for (let i = 0; i < 35 && state.mode !== 'end'; i++) {
    visited.push(state.sceneId);
    const next = state.mode === 'choices' ? selectChoice(story, state, choiceId) : advanceStory(story, state);
    progress = recordTransition(progress, story, state, next).progress;
    if (state.mode !== 'science' && !visited.includes('science')) assert.deepEqual(progress.skills, { gyaan: 0, samvaad: 0, saath: 0, badlav: 0 });
    // Simulate a full refresh after every transition.
    progress = parseProgress(JSON.stringify(progress));
    state = restoreStoryState(story, progress.stories[story.id].checkpoint);
  }
  assert.equal(state.mode, 'end');
  return { progress, visited };
}

for (const [id, expected] of Object.entries({ why: [4, 5, 2, 4], fact: [6, 1, 1, 4], source: [3, 6, 6, 4] })) {
  test(`${id} reaches evidence, warm resolution and completion with persisted rewards`, () => {
    const { progress, visited } = play(id);
    assert.deepEqual(Object.values(progress.skills), expected);
    assert.equal(progress.stories[story.id].completed, true);
    assert.ok(visited.includes('science') && visited.includes('understanding') && visited.includes('resolution'));
    assert.equal(visited.includes('inherited-beliefs'), id === 'source');
  });
}
test('replaying and duplicate completion do not inflate points', () => {
  const completed = play('source').progress;
  let state = initialStoryState(story);
  let progress = completed;
  for (let i = 0; i < 35 && state.mode !== 'end'; i++) {
    const next = state.mode === 'choices' ? selectChoice(story, state, 'fact') : advanceStory(story, state);
    progress = recordTransition(progress, story, state, next).progress;
    state = next;
  }
  assert.deepEqual(progress.skills, completed.skills);
  assert.deepEqual(recordTransition(progress, story, state, state).progress.skills, completed.skills);
});
test('companion survives a save and malformed saves fail safely', () => {
  const progress = emptyProgress(); progress.companion = 'aarav';
  assert.equal(parseProgress(JSON.stringify(progress)).companion, 'aarav');
  assert.deepEqual(parseProgress('{broken'), emptyProgress());
  assert.deepEqual(restoreStoryState(story, { sceneId: 'missing' }), initialStoryState(story));
  assert.deepEqual(restoreStoryState(story, { sceneId: 'opening', index: 0, mode: 'science', choiceId: null }), initialStoryState(story));
  assert.throws(() => selectChoice(story, initialStoryState(story), 'source'));
});
