import type { Story, Dialogue, Choice, Companion, Scene } from '@/lib/story/types';
// Script approved by Sarthak Kumar, Nov 2026 (docs/NAGAR_STORY.md).
const line = (id: string, speaker: Companion, text: string, expression: Dialogue['expression'] = 'thinking', listener: Dialogue['expression'] = 'concerned'): Dialogue => ({ id, speaker, text, translation: '', expression, listener });
const choice = (id: string, text: string, nextScene: string, skillImpact: Choice['skillImpact'], consequence: string): Choice => ({ id, text, nextScene, skillImpact, translation: '', consequence, companionExpression: 'thinking' });
const scene = (id: string, view: Companion, progress: number, dialogue: Dialogue[], nextScene?: string): Scene => ({ id, view, progress, dialogue, nextScene });

export const theLongJourney: Story = {
  id: 'nagar-the-long-journey', title: 'The Long Journey', world: 'Nagar', setting: 'city', startScene: 'opening',
  chapter: 'CHAPTER 05', subtitle: 'Periods don’t follow a timetable.', context: 'School trip to the city · A roadside stop', footerLabel: 'A JOURNEY TO THE CITY',
  stages: ['Notice', 'Ask for help', 'See their side', 'Respond', 'Evidence'],
  reflection: 'What would you put in a small period kit for a trip, and who could you ask for help on the way?',
  completionImpact: { gyaan: 2, badlav: 3 },
  scenes: {
    opening: { ...scene('opening', 'aara', 0, [
      line('bus-start', 'aara', 'Oh no. I think my period has started, and we’re still an hour from the city.', 'worried'),
      line('bus-worry', 'aara', 'I didn’t pack anything. What if it leaks onto the seat?', 'embarrassed'),
    ]), choicePrompt: 'What will Aara do?', choices: [
      choice('tell-teacher', 'Quietly tell the teacher at the front.', 'teacher-bus', { samvaad: 4, saath: 2, badlav: 4 }, 'Teachers are there to help. A quiet word is enough.'),
      choice('ask-friend', 'Ask a friend if she has a spare pad.', 'friend-bus', { samvaad: 4, saath: 3, badlav: 3 }, 'Many people carry a spare pad. Asking for one is normal.'),
      choice('say-nothing', 'Say nothing and wait until the museum.', 'quiet-bus', { samvaad: 1, saath: 1, badlav: 1 }, 'Waiting alone can feel worse. There is usually someone who can help.'),
    ] },
    'teacher-bus': scene('teacher-bus', 'aara', 1, [
      line('teacher-plan', 'aara', 'Ma’am said we’ll stop at the next roadside stop, and nobody else needs to know.', 'reassuring', 'reassuring'),
      line('teacher-relief', 'aara', 'That was easier than I thought.', 'happy', 'reassuring'),
    ], 'roadside'),
    'friend-bus': scene('friend-bus', 'aara', 1, [
      line('friend-pad', 'aara', 'Meera gave me one pad from her bag. But it’s a long day, so I’ll need more.', 'thinking', 'reassuring'),
      line('friend-relief', 'aara', 'I’m glad I asked instead of worrying alone.', 'reassuring', 'reassuring'),
    ], 'roadside'),
    'quiet-bus': scene('quiet-bus', 'aara', 1, [
      line('quiet-worry', 'aara', 'I kept quiet, but I couldn’t stop worrying the whole way.', 'worried', 'curious'),
      line('quiet-help', 'aara', 'At the next stop I told Ma’am. She helped right away.', 'reassuring', 'reassuring'),
    ], 'roadside'),
    roadside: scene('roadside', 'aara', 1, [
      line('roadside-chemist', 'aara', 'The bus stopped near a chemist. Ma’am asked Aarav to buy a packet of pads while I use the restroom.', 'reassuring', 'curious'),
    ], 'switch'),
    switch: { ...scene('switch', 'aara', 2, [], 'chemist'), kind: 'perspective' },
    chemist: { ...scene('chemist', 'aarav', 2, [
      line('chemist-watch', 'aarav', 'Ma’am gave me money for pads. A few boys from our class are watching me at the counter.', 'thinking', 'curious'),
      line('chemist-bag', 'aarav', 'The shopkeeper is wrapping the packet in newspaper and a black bag, as if it’s a secret.', 'curious', 'curious'),
    ]), choicePrompt: 'What will Aarav do?', choices: [
      choice('black-bag', 'Take the black bag and hurry back.', 'bag', { samvaad: 1, saath: 2, badlav: 1 }, 'Being discreet is fine, but buying pads is nothing to be ashamed of.'),
      choice('no-secret', '“No need to hide it, thank you,” and walk back.', 'normal', { samvaad: 5, saath: 4, badlav: 5 }, 'Treating pads as an everyday item helps make periods less of a secret.'),
      choice('laugh-off', 'Laugh it off with the boys watching.', 'laugh', {}, 'A joke can make it awkward for Aara later, even if no one means harm.'),
    ] },
    bag: scene('bag', 'aarav', 3, [
      line('bag-rush', 'aarav', 'I rushed back, feeling awkward for no reason.', 'embarrassed', 'reassuring'),
      line('bag-next', 'aarav', 'Next time I’ll just carry it like anything else from a shop.', 'reassuring', 'happy'),
    ], 'reflect'),
    normal: scene('normal', 'aarav', 3, [
      line('normal-ask', 'aarav', 'One of the boys asked what I bought. I said, ‘Pads, for someone who needs them.’', 'reassuring', 'curious'),
      line('normal-nod', 'aarav', 'He just nodded. It wasn’t a big deal at all.', 'happy', 'happy'),
    ], 'reflect'),
    laugh: scene('laugh', 'aarav', 3, [
      line('laugh-joke', 'aarav', 'I joked about it, and the boys laughed all the way back to the bus.', 'happy', 'worried'),
      line('laugh-sorry', 'aarav', 'Then I saw Aara’s face. I stopped and said sorry.', 'worried', 'reassuring'),
    ], 'reflect'),
    reflect: { ...scene('reflect', 'aarav', 3, [], 'science'), kind: 'narrative', narrative: 'Periods don’t follow a timetable. A little planning and a lot of kindness go a long way.' },
    // Every claim is in docs/health-evidence-register.md (NG-1 to NG-4).
    science: { ...scene('science', 'aarav', 4, [], 'resolution'), kind: 'science', scienceCheck: {
      belief: 'If my period starts while travelling, I have to manage on my own.',
      evidence: 'Periods can vary and can start suddenly, especially in the first few years. Carrying a pad and a small bag for used products helps when you are away from home. Everyone needs a clean, private place to change. Used pads go in a bin, never down the toilet.',
      takeaway: 'Plan a little. Ask for help. Never make it a secret or a joke.',
      sources: [
        { title: 'UNFPA: Menstruation and human rights – FAQ', url: 'https://www.unfpa.org/menstruationfaq' },
        { title: 'UNICEF: Talking about periods at home', url: 'https://www.unicef.org/parenting/health/talking-about-periods-at-home' },
        { title: 'WHO: Menstrual health fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health' },
      ],
    } },
    resolution: scene('resolution', 'aarav', 4, [
      line('journey-aara', 'aara', 'Thank you, Aarav. Next time I’ll keep a small period kit in my bag.', 'happy', 'reassuring'),
      line('journey-aarav', 'aarav', 'And I’ll remember that buying pads is just like buying anything else.', 'reassuring', 'happy'),
    ], 'complete'),
    complete: { ...scene('complete', 'aarav', 5, []), kind: 'end' },
  },
};
