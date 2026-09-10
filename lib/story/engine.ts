import type { Choice, Story, StoryState } from './types';

export function enterScene(story: Story, sceneId: string, choiceId: string | null = null, choiceIds: string[] = []): StoryState {
  const scene = story.scenes[sceneId];
  if (!scene) throw new Error(`Unknown story scene: ${sceneId}`);
  return { sceneId, index: 0, mode: scene.kind ?? 'dialogue', choiceId, choiceIds };
}
export function initialStoryState(story: Story) { return enterScene(story, story.startScene ?? 'opening'); }
export function getChoice(story: Story, id: string | null): Choice | undefined {
  return Object.values(story.scenes).flatMap(scene => scene.choices ?? []).find(choice => choice.id === id);
}
export function advanceStory(story: Story, state: StoryState): StoryState {
  const scene = story.scenes[state.sceneId];
  if (state.mode === 'end' || state.mode === 'choices') return state;
  if (state.mode === 'dialogue' && state.index + 1 < scene.dialogue.length) return { ...state, index: state.index + 1 };
  if (scene.choices?.length) return { ...state, mode: 'choices' };
  if (scene.nextScene) return enterScene(story, scene.nextScene, state.choiceId, state.choiceIds);
  throw new Error(`Scene has no continuation: ${scene.id}`);
}
export function selectChoice(story: Story, state: StoryState, id: string): StoryState {
  const choice = story.scenes[state.sceneId].choices?.find(item => item.id === id);
  if (state.mode !== 'choices' || !choice) throw new Error('This choice is not available.');
  return enterScene(story, choice.nextScene, choice.id, [...(state.choiceIds ?? (state.choiceId ? [state.choiceId] : [])), choice.id]);
}
export function restoreStoryState(story: Story, value: unknown): StoryState {
  const fallback = initialStoryState(story);
  if (!value || typeof value !== 'object') return fallback;
  const state = value as StoryState;
  const scene = story.scenes[state.sceneId];
  if (!scene || !Number.isInteger(state.index) || state.index < 0 || state.index >= Math.max(scene.dialogue.length, 1)) return fallback;
  if (state.mode !== (scene.kind ?? 'dialogue') && !(state.mode === 'choices' && scene.choices?.length && state.index === scene.dialogue.length - 1)) return fallback;
  if (state.choiceId !== null && !getChoice(story, state.choiceId)) return fallback;
  if (state.sceneId !== fallback.sceneId && !state.choiceId) return fallback;
  const choiceIds = state.choiceIds ?? (state.choiceId ? [state.choiceId] : []);
  if (!Array.isArray(choiceIds) || choiceIds.some(id => !getChoice(story, id))) return fallback;
  return { sceneId: state.sceneId, index: state.index, mode: state.mode, choiceId: state.choiceId, choiceIds };
}

