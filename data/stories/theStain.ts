import type { Story, Dialogue, Choice, Companion, Scene } from '@/lib/story/types';
const line = (id: string, speaker: Companion, text: string, expression: Dialogue['expression'] = 'thinking', listener: Dialogue['expression'] = 'concerned'): Dialogue => ({ id, speaker, text, translation: '', expression, listener });
const choice = (id: string, text: string, nextScene: string, skillImpact: Choice['skillImpact'], consequence = ''): Choice => ({ id, text, nextScene, skillImpact, translation: '', consequence, companionExpression: 'thinking' });
const scene = (id: string, view: Companion, progress: number, dialogue: Dialogue[], nextScene?: string): Scene => ({ id, view, progress, dialogue, nextScene });
export const theStain: Story = {
  id: 'vidyalaya-the-stain', title: 'The Stain', world: 'Vidyalaya', setting: 'school', startScene: 'opening', reflection: 'If you saw a classmate with a stain, what is one quiet, kind thing you could do?', completionImpact: { gyaan: 2, badlav: 2 },
  scenes: {
    opening: { ...scene('opening', 'aara', 0, [
      line('stain-noticed', 'aara', 'Oh no… I think I have a stain.', 'concerned'),
      line('stain-worry', 'aara', 'What if someone notices? I feel embarrassed. I need a moment.', 'confused'),
    ]), choices: [
      choice('ask-friend', 'Ask a trusted friend for help.', 'friend-help', { samvaad: 4, saath: 3, badlav: 3 }, 'Asking someone you trust means you do not have to handle it alone.'),
      choice('leave-quietly', 'Try to hide it and leave quietly.', 'quiet-exit', { samvaad: 1, saath: 1, badlav: 2 }, 'Wanting privacy is understandable. Asking for help can still make things easier.'),
      choice('ask-teacher', 'Ask a teacher for help.', 'teacher-help', { samvaad: 4, saath: 2, badlav: 4 }, 'Teachers can help with supplies and a private place to change.'),
    ] },
    'friend-help': scene('friend-help', 'aara', 1, [
      line('ask-friend-line', 'aara', 'Aarav, could you help me find a teacher? Please keep this between us.', 'concerned', 'thinking'),
      line('friend-response', 'aarav', 'Of course. We can go quietly. You can tell me what you need.', 'relieved', 'relieved'),
    ], 'support'),
    'quiet-exit': scene('quiet-exit', 'aara', 1, [
      line('quiet-thought', 'aara', 'I will step outside for a moment. But I still need somewhere private to change.', 'concerned'),
      line('quiet-support', 'aarav', 'Would you like me to find a teacher? It is okay if you need some space.', 'thinking', 'relieved'),
      line('quiet-accept', 'aara', 'Yes, please. I do not have to manage this alone.', 'relieved', 'relieved'),
    ], 'support'),
    'teacher-help': scene('teacher-help', 'aara', 1, [
      line('teacher-request', 'aara', 'I will ask my teacher privately for a pad and somewhere to change.', 'thinking'),
      line('teacher-response', 'aara', 'She listened quietly and helped me find what I needed. I feel safer now.', 'relieved', 'relieved'),
    ], 'support'),
    support: scene('support', 'aara', 1, [line('supported', 'aara', 'A stain can happen. I felt embarrassed, but asking for help made things easier.', 'relieved', 'relieved')], 'switch'),
    switch: { ...scene('switch', 'aara', 2, [], 'aarav-opening'), kind: 'perspective', narrative: 'Now see what happened from another perspective.' },
    'aarav-opening': { ...scene('aarav-opening', 'aarav', 2, [
      line('aarav-notices', 'aarav', 'Aara looks worried. I noticed the stain, but I do not know what she needs.', 'thinking', 'concerned'),
      line('aarav-choice', 'aarav', 'What I do next could make this moment easier—or harder—for her.', 'thinking', 'concerned'),
    ]), choices: [
      choice('make-joke', 'Make a joke.', 'joke', { samvaad: 0, saath: 0, badlav: 0 }, 'Even a light joke can make an embarrassing moment feel worse.'),
      choice('ignore', 'Ignore what happened.', 'ignore-reaction', { samvaad: 1, saath: 1, badlav: 0 }, 'Giving privacy is respectful, but quietly checking in can help more.'),
      choice('offer-help', 'Quietly offer help.', 'help', { samvaad: 5, saath: 6, badlav: 5 }, 'Offering help quietly lets your friend decide what she needs.'),
    ] },
    joke: scene('joke', 'aarav', 3, [
      line('joke-hurts', 'aara', 'Please do not joke about it. I am already feeling embarrassed.', 'concerned', 'concerned'),
      line('joke-repair', 'aarav', 'I am sorry. That was unkind. Would you like me to get a teacher?', 'concerned', 'thinking'),
      line('repair-accepted', 'aara', 'Yes, quietly, please. Thank you for listening.', 'relieved', 'relieved'),
    ], 'reflection'),
    'ignore-reaction': scene('ignore-reaction', 'aarav', 3, [
      line('ignored', 'aara', 'I wish someone would check whether I need help.', 'concerned', 'thinking'),
      line('ignore-reconsider', 'aarav', 'I can respect her privacy and still ask quietly if she needs anything.', 'thinking', 'thinking'),
      line('ignore-offer', 'aarav', 'Would you like some help, or a little space?', 'relieved', 'relieved'),
    ], 'reflection'),
    help: scene('help', 'aarav', 3, [
      line('help-offer', 'aarav', 'Aara, would you like me to find a teacher or wait here with you?', 'thinking', 'concerned'),
      line('help-response', 'aara', 'Please find a teacher. Thank you for asking quietly.', 'relieved', 'relieved'),
      line('help-respect', 'aarav', 'Of course. I will let you decide what happens next.', 'relieved', 'happy'),
    ], 'reflection'),
    reflection: { ...scene('reflection', 'aarav', 3, [], 'science'), kind: 'narrative', narrative: 'Sometimes the same moment feels completely different depending on where you stand. Being an ally means helping without making someone feel embarrassed.' },
    science: { ...scene('science', 'aarav', 4, [], 'resolution'), kind: 'science', scienceCheck: {
      belief: 'Period stains can happen unexpectedly.',
      evidence: 'Menstruation is a normal biological process. A period may start unexpectedly or leak onto clothing, and a person may need practical support.',
      takeaway: 'Help with dignity. Never turn someone’s period into a joke.',
      sources: [{ title: 'UNICEF: Talking about periods at home', url: 'https://www.unicef.org/parenting/health/talking-about-periods-at-home' }],
    } },
    resolution: scene('resolution', 'aarav', 4, [
      line('stain-ending-aara', 'aara', 'I have what I need now. Thank you for giving me privacy and support.', 'relieved', 'relieved'),
      line('stain-ending-aarav', 'aarav', 'We all deserve kindness. Let’s head back when you feel ready.', 'happy', 'happy'),
    ], 'complete'),
    complete: { ...scene('complete', 'aarav', 5, []), kind: 'end' },
  },
};
