'use client';
import { useSyncExternalStore } from 'react';
import { emptyProgress, parseProgress, type LearnerProgress } from './progress';

const storageKey = 'rituchakra.progress.v1';
const serverSnapshot = { progress: emptyProgress(), ready: false, storageUnavailable: false };
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();
function emit() { listeners.forEach(listener => listener()); }
function hydrate() {
  try { snapshot = { progress: parseProgress(localStorage.getItem(storageKey)), ready: true, storageUnavailable: false }; }
  catch { snapshot = { ...snapshot, ready: true, storageUnavailable: true }; }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!snapshot.ready) { hydrate(); emit(); }
  function storageChanged(event: StorageEvent) { if (event.key === storageKey || event.key === null) { hydrate(); emit(); } }
  window.addEventListener('storage', storageChanged);
  return () => { listeners.delete(listener); window.removeEventListener('storage', storageChanged); };
}
export function updateProgress(update: (current: LearnerProgress) => LearnerProgress) {
  if (!snapshot.ready) hydrate();
  const progress = update(snapshot.progress);
  let storageUnavailable = false;
  try { localStorage.setItem(storageKey, JSON.stringify(progress)); } catch { storageUnavailable = true; }
  snapshot = { progress, ready: true, storageUnavailable };
  emit();
}
export function useProgress() { return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot); }
