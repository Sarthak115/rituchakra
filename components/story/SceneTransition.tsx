import type { ReactNode } from 'react';
export function SceneTransition({ sceneKey, children }: { sceneKey: string; children: ReactNode }) { return <div className="scene-transition" key={sceneKey}>{children}</div>; }
