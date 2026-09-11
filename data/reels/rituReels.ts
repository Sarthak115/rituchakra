import type { Story, Dialogue, Choice, ScienceCheckContent } from '@/lib/story/types';
import type { ReelAudioMap } from '@/lib/reels/useReelAudio';

// Stable dialogue IDs can also identify future language-specific audio assets.
// Playback only supplies timing; graph transitions, rewards and saves remain shared.
export interface RituReel extends Story {
  slug: string;
  theme: 'kitchen' | 'temple';
  timings: Record<string, number[]>;
  audio?: ReelAudioMap;
}
const line = (id: string, speaker: 'dadi' | 'aara', text: string, expression: Dialogue['expression'] = 'thinking', listener: Dialogue['expression'] = 'thinking'): Dialogue => ({ id, speaker, text, translation: '', expression, listener });
const answer = (id: string, text: string, nextScene: string, consequence: string, informed = false): Choice => ({ id, text, nextScene, consequence, translation: '', companionExpression: 'thinking', skillImpact: informed ? { gyaan: 4, samvaad: 2, saath: 2 } : { gyaan: 1 } });
const kitchenEvidence: ScienceCheckContent = {
  belief: 'You should not enter the kitchen during your period.',
  evidence: 'Menstruation is normal. There is no medical reason to keep someone who is menstruating from entering a kitchen or preparing food.',
  takeaway: 'Respect the person. Question the belief. Verify the fact.',
  sources: [{ title: 'UNICEF: Talking about periods at home', url: 'https://www.unicef.org/parenting/health/talking-about-periods-at-home' }],
};
const templeEvidence: ScienceCheckContent = {
  belief: 'You should not visit a temple or take part in puja during your period.',
  evidence: 'Menstruation is a normal biological process. It does not make a person medically impure.',
  takeaway: 'Religious and cultural practices can differ between families and communities.',
  sources: [{ title: 'UNFPA: Menstruation and human rights', url: 'https://www.unfpa.org/menstruationfaq' }],
};
function feedback(id: string, content: ScienceCheckContent, takeaway: string): Story['scenes'][string] {
  return { id, kind: 'science', dialogue: [], progress: 4, scienceCheck: { ...content, takeaway }, nextScene: 'complete' };
}

export const kitchenReel: RituReel = {
  id: 'ritureels-dadi-ki-rasoi', slug: 'dadi-ki-rasoi', title: 'Dadi Ki Rasoi', world: 'RituReels', setting: 'home', theme: 'kitchen', context: 'A little conversation in Dadi’s kitchen', completionImpact: { badlav: 2 },
  timings: { opening: [3800, 2400, 4200, 4200], evidence: [8500], rethink: [4200, 1800, 3600], reflection: [2600], inherited: [8000], understood: [8000], traditions: [8000] },
  scenes: {
    opening: { id: 'opening', progress: 0, dialogue: [
      line('kitchen-belief', 'dadi', 'Beta, you should not go into the kitchen during your period.', 'concerned'),
      line('kitchen-question', 'aara', 'Dadi, why do you think that?'),
      line('kitchen-inherited', 'dadi', 'In our time, that was what we did. We stayed away from the kitchen during periods.'),
      line('kitchen-evidence-question', 'aara', 'But Dadi, have we ever checked whether there is a scientific reason?'),
    ], nextScene: 'evidence' },
    evidence: { id: 'evidence', progress: 1, dialogue: [], kind: 'science', scienceCheck: kitchenEvidence, nextScene: 'rethink' },
    rethink: { id: 'rethink', progress: 2, dialogue: [
      line('kitchen-rethink', 'dadi', 'So just because we did it before, it does not mean it must still be right?', 'surprised'),
      line('kitchen-yes', 'aara', 'Exactly, Dadi.', 'happy', 'relieved'),
      line('kitchen-reflect', 'dadi', 'Then even an old belief is worth checking sometimes.', 'relieved', 'happy'),
    ], nextScene: 'reflection' },
    reflection: { id: 'reflection', progress: 3, kind: 'narrative', dialogue: [line('kitchen-reflection-question', 'aara', 'What did we learn?')], narrative: kitchenEvidence.takeaway, choicePrompt: 'What did we learn?', choices: [
      answer('kitchen-exclusion', 'Going into the kitchen during periods is wrong.', 'inherited', 'A familiar rule is not the same as medical evidence.'),
      answer('kitchen-normal', 'Menstruation is normal; there is no medical reason to keep someone away from the kitchen.', 'understood', 'Yes. We can respect Dadi and still check a health claim.', true),
      answer('kitchen-all-traditions', 'Old traditions are always wrong.', 'traditions', 'Not every tradition is wrong. We can check health claims without judging people.'),
    ] },
    inherited: feedback('inherited', kitchenEvidence, 'A familiar rule is not the same as medical evidence.'),
    understood: feedback('understood', kitchenEvidence, 'Yes. We can respect Dadi and still check a health claim.'),
    traditions: feedback('traditions', kitchenEvidence, 'Not every tradition is wrong. We can check health claims without judging people.'),
    complete: { id: 'complete', progress: 5, dialogue: [], kind: 'end', narrative: kitchenEvidence.takeaway },
  },
};

export const templeReel: RituReel = {
  id: 'ritureels-dadi-ka-mandir', slug: 'dadi-ka-mandir', title: 'Dadi Ka Mandir', world: 'RituReels', setting: 'home', theme: 'temple', context: 'At home, before a family temple visit', completionImpact: { badlav: 2 },
  timings: { opening: [3600, 2200, 3200, 4600], evidence: [8000], rethink: [2000, 4400, 3400, 1300], reflection: [2600], impurity: [8000], understood: [8000], same: [8000] },
  scenes: {
    opening: { id: 'opening', progress: 0, dialogue: [
      line('temple-belief', 'dadi', 'Beta, you should not do puja or visit a temple during your period.', 'concerned'),
      line('temple-question', 'aara', 'Dadi, why do you think that?'),
      line('temple-inherited', 'dadi', 'That is what our family has always believed.'),
      line('temple-medical', 'aara', 'I understand, Dadi. But do periods medically prevent someone from going to a temple?'),
    ], nextScene: 'evidence' },
    evidence: { id: 'evidence', progress: 1, dialogue: [], kind: 'science', scienceCheck: templeEvidence, nextScene: 'rethink' },
    rethink: { id: 'rethink', progress: 2, dialogue: [
      line('temple-problem', 'dadi', 'So it is not a medical problem?', 'surprised'),
      line('temple-difference', 'aara', 'No, Dadi. It may be about beliefs and traditions, which differ from place to place.', 'thinking', 'relieved'),
      line('temple-reflect', 'dadi', 'I see. We should understand the difference between a fact and a belief.', 'relieved', 'happy'),
      line('temple-exactly', 'aara', 'Exactly.', 'happy', 'happy'),
    ], nextScene: 'reflection' },
    reflection: { id: 'reflection', progress: 3, kind: 'narrative', dialogue: [line('temple-reflection-question', 'aara', 'What did we learn?')], narrative: 'Respect the person. Understand the belief. Verify the fact.', choicePrompt: 'What did we learn?', choices: [
      answer('temple-impure', 'Periods make someone impure.', 'impurity', 'Menstruation does not make a person medically impure.'),
      answer('temple-normal', 'Menstruation is normal; cultural or religious practices may differ between families and communities.', 'understood', 'We can distinguish medical facts from practices, and talk about both respectfully.', true),
      answer('temple-uniform', 'Everyone must follow exactly the same practice.', 'same', 'Families and communities may practise differently. Everyone still deserves respect.'),
    ] },
    impurity: feedback('impurity', templeEvidence, 'Menstruation does not make a person medically impure.'),
    understood: feedback('understood', templeEvidence, 'We can distinguish medical facts from practices, and talk about both respectfully.'),
    same: feedback('same', templeEvidence, 'Families and communities may practise differently. Everyone still deserves respect.'),
    complete: { id: 'complete', progress: 5, dialogue: [], kind: 'end', narrative: 'Respect the person. Understand the belief. Verify the fact.' },
  },
};

export const rituReels = [kitchenReel, templeReel];
