'use client';
import { useEffect, useRef } from 'react';
interface StorySnapshot { companion: string; scene: string; speaker: string; dialogue: string; mode: string; choices: { id: string; text: string }[]; }
interface ModelContext { registerTool: (tool: { name: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean }; execute: (input: unknown) => StorySnapshot }, options: { signal: AbortSignal }) => void | Promise<void>; }
export function useStoryTool(snapshot: StorySnapshot) {
  const current = useRef(snapshot);
  useEffect(() => { current.current = snapshot; }, [snapshot]);
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      Promise.resolve(context.registerTool({ name: 'read_story_scene', description: 'Read the current RituChakra conversation and available response choices without advancing the story.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute(input) {
        if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('Expected an empty object.');
        return current.current;
      } }, { signal: lifecycle.signal })).catch(() => { /* Optional browser capability; visible gameplay remains available. */ });
    } catch { /* Unsupported browser implementation. */ }
    return () => lifecycle.abort();
  }, []);
}
