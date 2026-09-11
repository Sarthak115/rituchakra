import type { Story, Dialogue, Choice, Scene, Companion } from '@/lib/story/types';

const line = (id: string, speaker: Companion, text: string, expression: Dialogue['expression'] = 'thinking', listener: Dialogue['expression'] = 'thinking'): Dialogue => ({ id, speaker, text, translation: '', expression, listener });
const choice = (id: string, text: string, nextScene: string, skillImpact: Choice['skillImpact']): Choice => ({ id, text, nextScene, skillImpact, translation: '', consequence: '', companionExpression: 'thinking' });
const scene = (id: string, progress: number, dialogue: Dialogue[], nextScene?: string): Scene => ({ id, view: 'aara', progress, dialogue, nextScene });

export const chooseWhatFits: Story = {
  id: 'bazaar-choose-what-fits', title: 'Choose What Fits', world: 'Bazaar', setting: 'bazaar',
  chapter: 'CHAPTER 03', subtitle: 'Different needs. Informed choices.', context: 'Before the school trip · Neighbourhood shop', footerLabel: 'A CONVERSATION IN THE BAZAAR',
  stages: ['Explore', 'Consider', 'Discuss', 'Evidence', 'Choose'], completionImpact: { badlav: 3 },
  scenes: {
    opening: { ...scene('opening', 0, [
      line('trip', 'aara', 'The school trip is tomorrow. We will be out all day!', 'happy'),
      line('bag', 'aarav', 'You have your water bottle and lunch. What else is on your mind?'),
      line('period', 'aara', 'What if my period starts? Dadi suggested we talk through my options before packing.'),
      line('best', 'aarav', 'There are pads, reusable pads, cups and period underwear. Is one best for everyone?', 'confused'),
      line('explore', 'aara', 'Let’s explore an option for the trip. I want to understand what using it would involve.'),
    ]), choicePrompt: 'Which option would you like to explore for the trip?', choices: [
      choice('disposable-pad', 'Disposable pad', 'disposable', { gyaan: 2 }),
      choice('reusable-pad', 'Reusable cloth/period pad', 'reusable', { gyaan: 2 }),
      choice('menstrual-cup', 'Menstrual cup', 'cup', { gyaan: 2 }),
      choice('period-underwear', 'Period underwear', 'underwear', { gyaan: 2 }),
    ] },
    disposable: scene('disposable', 1, [
      line('pad-fit', 'aara', 'A disposable pad could be practical if I already feel comfortable using it. It is often easy to find.'),
      line('pad-plan', 'aarav', 'We can check the cost and pack enough. You will still need somewhere to change and dispose of used pads.'),
      line('pad-thought', 'aara', 'Convenient for some situations, but it does not have to be everyone’s choice.', 'relieved'),
    ], 'conversation'),
    reusable: scene('reusable', 1, [
      line('reuse-fit', 'aara', 'A reusable pad could suit me if I prefer it and can wash, dry and store it properly.'),
      line('reuse-plan', 'aarav', 'On a full-day trip, you would need clean spares and a separate bag for used pads until they can be washed.'),
      line('reuse-thought', 'aara', 'I should think about the trip facilities and the care instructions, not just the product.', 'relieved'),
    ], 'conversation'),
    cup: scene('cup', 1, [
      line('cup-fit', 'aara', 'A menstrual cup is reusable. It takes learning, correct use, cleaning and comfort with insertion.'),
      line('cup-plan', 'aarav', 'You do not need to try something unfamiliar just because someone recommends it.'),
      line('cup-thought', 'aara', 'Yes. I can take my time learning about it. I do not have to try it on the trip.', 'relieved'),
    ], 'conversation'),
    underwear: scene('underwear', 1, [
      line('underwear-fit', 'aara', 'Period underwear absorbs menstrual blood. It can suit some people, but comfort, availability and cost matter.'),
      line('underwear-plan', 'aarav', 'You would also need a plan for changing, carrying used underwear and washing it according to its instructions.'),
      line('underwear-thought', 'aara', 'So I should think about my routine and what I can manage during the outing.', 'relieved'),
    ], 'conversation'),
    conversation: { ...scene('conversation', 2, [line('which', 'aarav', 'So, how will you decide what to take?')]), choicePrompt: 'How will Aara decide?', choices: [
      choice('follow-everyone', 'Whatever everyone uses must be best.', 'popular', { samvaad: 1 }),
      choice('personal-fit', 'I can choose what feels comfortable and practical for me.', 'informed', { gyaan: 4, samvaad: 3, saath: 3, badlav: 3 }),
      choice('one-best', 'There should be one best product for everyone.', 'universal', { samvaad: 1 }),
    ] },
    popular: scene('popular', 2, [
      line('popular-question', 'aarav', 'Friends can share their experiences, but their routines and comfort may be different from yours.'),
      line('popular-response', 'aara', 'I can listen without feeling pressured to make the same choice.', 'relieved'),
    ], 'science'),
    informed: scene('informed', 2, [
      line('fit-support', 'aarav', 'That makes sense. I can help with the packing list, and you can decide what feels right.', 'happy', 'relieved'),
      line('fit-response', 'aara', 'Thanks. It is easier to talk when my choices are respected.', 'relieved', 'happy'),
    ], 'science'),
    universal: scene('universal', 2, [
      line('universal-question', 'aarav', 'Would the same option fit someone at home and someone travelling without easy access to washing facilities?', 'confused'),
      line('universal-response', 'aara', 'Maybe not. Different situations and preferences need different options.', 'thinking'),
    ], 'science'),
    science: { ...scene('science', 3, [], 'resolution'), kind: 'science', scienceCheck: {
      belief: 'One menstrual product is best for everyone.',
      evidence: 'There is no single menstrual product that is best for everyone. The right choice can depend on comfort, access, cost, routine, personal preference, and how the product is used and cared for.',
      takeaway: 'Know your options. Choose what fits.',
      sources: [{ title: 'UNICEF: Guide to menstrual hygiene materials', url: 'https://www.unicef.org/documents/guide-menstrual-hygiene-materials' }],
    } },
    resolution: scene('resolution', 4, [
      line('best-ending', 'aarav', 'So the “best product” does not have to be the same for everyone?', 'thinking', 'happy'),
      line('fit-ending', 'aara', 'Exactly. I will pack something familiar and practical for me, with the supplies I need.', 'happy', 'happy'),
      line('information-ending', 'aarav', 'An informed choice, not a trend. Now we can get back to planning the trip!', 'happy', 'happy'),
    ], 'closing'),
    closing: { ...scene('closing', 4, [], 'complete'), kind: 'narrative', narrative: 'Good choices begin with good information.' },
    complete: { ...scene('complete', 5, []), kind: 'end' },
  },
};
