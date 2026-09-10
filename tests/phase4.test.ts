import { test } from 'node:test';
import assert from 'node:assert/strict';
import { theStain } from '../data/stories/theStain';
import { dadiKiRasoi } from '../data/stories/dadiKiRasoi';
import { initialStoryState, advanceStory, selectChoice, restoreStoryState } from '../lib/story/engine';
import { emptyProgress, parseProgress, recordTransition, type LearnerProgress } from '../lib/story/progress';
import { localizeStory, translations, type Language } from '../data/translations';

for (const first of ['ask-friend', 'leave-quietly', 'ask-teacher']) for (const second of ['make-joke', 'ignore', 'offer-help']) {
  test(`The Stain: ${first} / ${second}, perspective and all language switches preserve progress`, () => {
    let saved = emptyProgress(); saved.companion = 'aarav';
    let state = initialStoryState(theStain);
    const visited: string[] = [];
    for (let i = 0; i < 60 && state.mode !== 'end'; i++) {
      visited.push(state.sceneId);
      for (const language of ['en', 'hi', 'or'] as Language[]) {
        const before = structuredClone(saved);
        saved = parseProgress(JSON.stringify({ ...saved, language }));
        assert.deepEqual(saved.skills, before.skills);
        assert.deepEqual(saved.stories, before.stories);
        assert.equal(saved.companion, 'aarav');
        if (saved.stories[theStain.id]?.checkpoint) assert.deepEqual(restoreStoryState(localizeStory(theStain, language), saved.stories[theStain.id].checkpoint), state);
      }
      const next = state.mode === 'choices' ? selectChoice(theStain, state, state.sceneId === 'opening' ? first : second) : advanceStory(theStain, state);
      saved = recordTransition(saved, theStain, state, next).progress;
      state = next;
    }
    assert.equal(state.mode, 'end');
    assert.ok(visited.indexOf('switch') < visited.indexOf('aarav-opening'));
    assert.ok(visited.includes('science') && visited.includes('resolution'));
    assert.equal(saved.stories[theStain.id].completed, true);
    const impacts = Object.values(theStain.scenes).flatMap(scene => scene.choices ?? []).filter(choice => [first, second].includes(choice.id));
    for (const skill of ['gyaan', 'samvaad', 'saath', 'badlav'] as const) assert.equal(saved.skills[skill], impacts.reduce((sum, c) => sum + (c.skillImpact[skill] ?? 0), theStain.completionImpact?.[skill] ?? 0));
    assert.deepEqual(recordTransition(saved, theStain, state, state).progress.skills, saved.skills);
  });
}

test('every story line, choice, reflection, evidence, and source has Hindi and Odia content', () => {
  const content: string[] = [];
  for (const story of [dadiKiRasoi, theStain]) {
    content.push(story.title, story.world);
    for (const scene of Object.values(story.scenes)) {
      for (const line of scene.dialogue) content.push(line.translation || line.text);
      for (const choice of scene.choices ?? []) content.push(choice.translation || choice.text, choice.consequence);
      if (scene.narrative) content.push(scene.narrative);
      if (scene.scienceCheck) content.push(scene.scienceCheck.belief, scene.scienceCheck.evidence, scene.scienceCheck.takeaway, ...scene.scienceCheck.sources.map(source => source.title));
    }
  }
  for (const text of content.filter(Boolean)) {
    assert.ok(translations[text], `Missing translation: ${text}`);
    assert.match(translations[text][0], /[\u0900-\u097f]/, `Missing Hindi script: ${text}`);
    assert.match(translations[text][1], /[\u0b00-\u0b7f]/, `Missing Odia script: ${text}`);
  }
});

test('legacy Ghar saves retain scores, completion, companion and current checkpoint', () => {
  const legacy = { version: 1, companion: 'aarav', skills: { gyaan: 3, samvaad: 6, saath: 6, badlav: 4 }, stories: { [dadiKiRasoi.id]: { completed: true, choiceAwarded: true, checkpoint: { sceneId: 'complete', index: 0, mode: 'end', choiceId: 'source' } } } };
  const migrated = parseProgress(JSON.stringify(legacy));
  assert.equal(migrated.language, 'en');
  assert.deepEqual(migrated.skills, legacy.skills);
  assert.equal(restoreStoryState(dadiKiRasoi, migrated.stories[dadiKiRasoi.id].checkpoint).mode, 'end');
  assert.deepEqual(restoreStoryState(dadiKiRasoi, migrated.stories[dadiKiRasoi.id].checkpoint).choiceIds, ['source']);
});
