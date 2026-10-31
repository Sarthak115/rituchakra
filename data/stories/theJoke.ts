import type { Story, Dialogue, Choice, Scene, Companion } from '@/lib/story/types';

const line = (id: string, speaker: Companion, text: string, expression: Dialogue['expression'] = 'thinking', listener: Dialogue['expression'] = 'thinking'): Dialogue => ({ id, speaker, text, translation: '', expression, listener });
const choice = (id: string, text: string, nextScene: string, skillImpact: Choice['skillImpact'], consequence = ''): Choice => ({ id, text, nextScene, skillImpact, translation: '', consequence, companionExpression: 'thinking' });
const scene = (id: string, view: Companion, progress: number, dialogue: Dialogue[], nextScene?: string): Scene => ({ id, view, progress, dialogue, nextScene });

export const theJoke: Story = {
  id: 'sakhi-sabha-the-joke', title: 'The Joke', world: 'Sakhi Sabha', setting: 'community',
  chapter: 'CHAPTER 04', subtitle: 'Small actions. A kinder space.', context: 'After class · A conversation with friends', footerLabel: 'A MOMENT OF ALLYSHIP',
  stages: ['Notice', 'See their side', 'Respond', 'Evidence', 'Together'], reflection: 'What could you say next time a joke makes someone uncomfortable?', completionImpact: { gyaan: 2, badlav: 3 },
  scenes: {
    opening: scene('opening', 'aara', 0, [
      line('group-joke', 'aara', 'I mentioned needing a pad. A classmate said, ‘Why so serious? Is it a period emergency?’', 'concerned'),
      line('group-feeling', 'aara', 'Some friends laughed. I wish I could ask for what I need without becoming the joke.', 'concerned', 'concerned'),
    ], 'feeling'),
    feeling: { ...scene('feeling', 'aara', 0, [], 'switch'), kind: 'narrative', narrative: 'A joke can feel different when you’re the one being laughed at.' },
    switch: { ...scene('switch', 'aara', 1, [], 'response'), kind: 'perspective' },
    response: { ...scene('response', 'aarav', 1, [
      line('ally-notices', 'aarav', 'I was about to laugh, but Aara has gone quiet. She looks uncomfortable.', 'concerned', 'concerned'),
      line('ally-decision', 'aarav', 'I can choose how I respond to the group.'),
    ]), choicePrompt: 'How will Aarav respond?', choices: [
      choice('laugh-along', 'Laugh along.', 'laugh', {}, 'Laughing along can keep a joke going, even when no harm is meant.'),
      choice('stay-silent', 'Ignore it.', 'silent', { samvaad: 1 }, 'Staying quiet can feel safer, but the person being teased may feel alone.'),
      choice('step-in', 'Step in respectfully.', 'respect', { samvaad: 5, saath: 6, badlav: 3 }, 'Stepping in calmly can change the mood without embarrassing anyone.'),
    ] },
    laugh: scene('laugh', 'aarav', 2, [
      line('laugh-cost', 'aara', 'When you laughed too, the others kept going. I felt even more alone.', 'concerned', 'concerned'),
      line('laugh-repair', 'aarav', 'I am sorry I joined in. Friends, let’s stop. We are making someone uncomfortable.', 'concerned', 'thinking'),
      line('laugh-listen', 'aara', 'They have stopped now. Thank you for noticing and changing what you did.', 'relieved', 'thinking'),
    ], 'check-in'),
    silent: scene('silent', 'aarav', 2, [
      line('silence-cost', 'aara', 'I know you did not join in, but I was hoping someone would help change the conversation.', 'concerned'),
      line('silence-repair', 'aarav', 'I can still help. Let’s leave the jokes, everyone. We have other things to talk about.', 'thinking', 'relieved'),
    ], 'check-in'),
    respect: scene('respect', 'aarav', 2, [
      line('respect-response', 'aarav', 'Come on, periods are normal. Let’s not make anyone uncomfortable.', 'thinking', 'relieved'),
      line('respect-result', 'aara', 'They have moved on to talking about the game. I feel less singled out now.', 'relieved', 'happy'),
    ], 'check-in'),
    'check-in': { ...scene('check-in', 'aarav', 2, [line('thanks', 'aara', 'Thanks for helping stop it. I was feeling awkward.', 'relieved')]), choicePrompt: 'What would you say to Aara?', choices: [
      choice('brush-off', 'Just ignore them.', 'dismiss', { samvaad: 1 }, '“Just ignore them” can feel dismissive. Listening first shows you care.'),
      choice('offer-support', 'Of course. If you need any help, you can tell me.', 'support', { samvaad: 4, saath: 5, badlav: 2 }, 'Offering help and letting her decide respects her choices.'),
      choice('too-sensitive', 'You should not be so sensitive.', 'sensitive', {}, 'Calling someone too sensitive can make them feel their feelings do not matter.'),
    ] },
    dismiss: scene('dismiss', 'aarav', 2, [
      line('dismiss-feeling', 'aara', 'That is harder than it sounds. I would rather you listened than told me to ignore it.', 'concerned'),
      line('dismiss-repair', 'aarav', 'You are right. I am here if you want to talk or need help.', 'thinking', 'relieved'),
    ], 'reflection'),
    support: scene('support', 'aarav', 2, [
      line('support-agency', 'aara', 'Thank you. I would like a little space now. I will tell you if I need anything.', 'relieved', 'happy'),
      line('support-listen', 'aarav', 'Of course. You get to decide.', 'happy', 'relieved'),
    ], 'reflection'),
    sensitive: scene('sensitive', 'aarav', 2, [
      line('sensitive-feeling', 'aara', 'That makes me feel like my feelings are the problem. I just wanted some respect.', 'concerned', 'concerned'),
      line('sensitive-repair', 'aarav', 'I am sorry. You do not have to explain away your feelings. I can listen.', 'concerned', 'relieved'),
    ], 'reflection'),
    reflection: { ...scene('reflection', 'aarav', 2, [], 'science'), kind: 'narrative', narrative: 'Being an ally doesn’t mean speaking for someone. It means helping create a space where they feel safe and respected.' },
    science: { ...scene('science', 'aarav', 3, [], 'resolution'), kind: 'science', scienceCheck: {
      belief: 'Periods are embarrassing, so jokes about them are harmless.',
      // Wording mirrors WHO and UNICEF; see docs/health-evidence-register.md (claims JK-1 to JK-2).
      evidence: 'Menstruation is a natural bodily process. Stigma about periods can harm a person’s well-being and even how long they stay in school. Some girls avoid school during their period out of fear of bullying.',
      takeaway: 'Respect the person. Challenge the stigma. Be a Sakhi.',
      sources: [
        { title: 'WHO: Menstrual health fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health' },
        { title: 'UNICEF: Talking about periods at home', url: 'https://www.unicef.org/parenting/health/talking-about-periods-at-home' },
      ],
    } },
    resolution: scene('resolution', 'aarav', 4, [
      line('ally-ending', 'aarav', 'Making a joke is easy. Supporting a friend should be easy too.', 'happy', 'relieved'),
      line('aara-ending', 'aara', 'I just needed someone to help without making things more awkward.', 'relieved', 'happy'),
    ], 'closing'),
    closing: { ...scene('closing', 'aarav', 4, [], 'complete'), kind: 'narrative', narrative: 'Small choices can change the space around us.' },
    complete: { ...scene('complete', 'aarav', 5, []), kind: 'end' },
  },
};
