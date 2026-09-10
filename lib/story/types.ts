export type CharacterId = 'aara' | 'aarav' | 'dadi';
export type Companion = Exclude<CharacterId, 'dadi'>;
export type Expression = 'idle' | 'happy' | 'thinking' | 'confused' | 'surprised' | 'concerned' | 'relieved';
export type Animation = 'idle' | 'talking' | 'enter' | 'exit' | 'bounce' | 'react' | 'think' | 'celebrate';
export type Skill = 'gyaan' | 'samvaad' | 'saath' | 'badlav';
export interface Dialogue { id: string; speaker: CharacterId | 'companion'; text: string; translation: string; expression: Expression; listener: Expression; }
export interface Choice { id: string; text: string; translation: string; nextScene: string; skillImpact: Partial<Record<Skill, number>>; consequence: string; companionExpression: Expression; }
export interface Scene { id: string; dialogue: Dialogue[]; choices?: Choice[]; }
export interface Story { id: string; title: string; world: string; scenes: Record<string, Scene>; }
