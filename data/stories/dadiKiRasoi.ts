import type { Story } from '@/lib/story/types';
export const dadiKiRasoi: Story = {
  id: 'ghar-dadi-rasoi', title: 'Dadi Ki Rasoi', world: 'Ghar',
  scenes: {
    opening: { id: 'opening', dialogue: [
      { id: 'belief', speaker: 'dadi', text: 'Beta, tumhare periods ke time kitchen mein nahi jaana chahiye.', translation: 'Dear, you shouldn’t go into the kitchen during your period.', expression: 'concerned', listener: 'confused' },
      { id: 'question', speaker: 'companion', text: 'Dadi, aapko aisa kyun lagta hai?', translation: 'Dadi, why do you think that?', expression: 'thinking', listener: 'thinking' },
      { id: 'tradition', speaker: 'dadi', text: 'Hamare zamaane mein aisa hi hota tha. Periods mein kitchen se door rehte the.', translation: 'That’s how it was in our time. We stayed away from the kitchen during periods.', expression: 'thinking', listener: 'concerned' },
    ], choices: [
      { id: 'why', text: 'Par Dadi, aisa kyun mana karte the?', translation: 'But Dadi, why was it discouraged?', nextScene: 'curiosity', skillImpact: { samvaad: 8, gyaan: 3 }, consequence: 'A thoughtful question gives Dadi space to reflect.', companionExpression: 'thinking' },
      { id: 'fact', text: 'Periods mein kitchen jaana bilkul galat nahi hai.', translation: 'There’s nothing wrong with entering the kitchen during a period.', nextScene: 'direct', skillImpact: { gyaan: 8, samvaad: 2 }, consequence: 'Speaking directly surprises Dadi. She wants to understand your point of view.', companionExpression: 'happy' },
      { id: 'source', text: 'Dadi, aapko ye baat kisne batayi thi?', translation: 'Dadi, who told you this?', nextScene: 'reflection', skillImpact: { saath: 8, samvaad: 8 }, consequence: 'Listening to her story makes room for a different conversation.', companionExpression: 'relieved' },
    ] },
    curiosity: { id: 'curiosity', dialogue: [{ id: 'why-response', speaker: 'dadi', text: 'Achha sawaal hai, beta. Maine kabhi iska kaaran poochha hi nahi.', translation: 'That’s a good question, dear. I never asked about the reason.', expression: 'thinking', listener: 'thinking' }] },
    direct: { id: 'direct', dialogue: [{ id: 'fact-response', speaker: 'dadi', text: 'Achha? Mujhe toh kuch aur bataya gaya tha. Tum mujhe samjhaoge?', translation: 'Really? I was taught something different. Will you help me understand?', expression: 'surprised', listener: 'relieved' }] },
    reflection: { id: 'reflection', dialogue: [{ id: 'source-response', speaker: 'dadi', text: 'Meri maa ne. Unhone bhi apni maa se suna tha.', translation: 'My mother did. She had heard it from her mother, too.', expression: 'thinking', listener: 'relieved' }] },
  },
};
