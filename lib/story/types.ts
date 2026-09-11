export type CharacterId = 'aara' | 'aarav' | 'dadi';
export type Companion = Exclude<CharacterId, 'dadi'>;
export type Expression = 'idle' | 'happy' | 'thinking' | 'confused' | 'surprised' | 'concerned' | 'relieved';
export type Animation = 'idle' | 'talking' | 'enter' | 'exit' | 'bounce' | 'react' | 'think' | 'celebrate';
export type Skill = 'gyaan' | 'samvaad' | 'saath' | 'badlav';
export interface Dialogue { id: string; speaker: CharacterId | 'companion'; text: string; translation: string; expression: Expression; listener: Expression; }
export interface Choice { id: string; text: string; translation: string; nextScene: string; skillImpact: Partial<Record<Skill, number>>; consequence: string; companionExpression: Expression; }
export type SkillValues = Record<Skill, number>;
export type StoryMode = 'dialogue' | 'choices' | 'narrative' | 'science' | 'perspective' | 'end';
export interface ScienceCheckContent { belief: string; evidence: string; takeaway: string; sources: { title: string; url: string }[]; }
export interface Scene { id: string; dialogue: Dialogue[]; choices?: Choice[]; choicePrompt?: string; kind?: Exclude<StoryMode, 'choices'>; nextScene?: string; narrative?: string; scienceCheck?: ScienceCheckContent; progress?: number; view?: Companion; }
export interface Story { id: string; title: string; world: string; startScene?: string; setting?: 'home' | 'school' | 'bazaar' | 'community'; chapter?: string; subtitle?: string; context?: string; footerLabel?: string; stages?: string[]; completionImpact?: Partial<SkillValues>; scenes: Record<string, Scene>; }
export interface StoryState { sceneId: string; index: number; mode: StoryMode; choiceId: string | null; choiceIds?: string[]; }

