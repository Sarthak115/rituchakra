import type { Story } from '@/lib/story/types';
export const dadiKiRasoi: Story = {
  id: 'ghar-dadi-rasoi', title: 'Dadi Ki Rasoi', world: 'Ghar', startScene: 'opening', reflection: 'Is there a belief in your family you would like to understand better? How could you ask about it respectfully?', completionImpact: { badlav: 4 },
  scenes: {
    opening: { id: 'opening', dialogue: [
      { id: 'belief', speaker: 'dadi', text: 'Beta, tumhare periods ke time kitchen mein nahi jaana chahiye.', translation: 'Dear, you shouldn’t go into the kitchen during your period.', expression: 'concerned', listener: 'confused' },
      { id: 'question', speaker: 'companion', text: 'Dadi, aapko aisa kyun lagta hai?', translation: 'Dadi, why do you think that?', expression: 'thinking', listener: 'thinking' },
      { id: 'tradition', speaker: 'dadi', text: 'Hamare zamaane mein aisa hi hota tha. Periods mein kitchen se door rehte the.', translation: 'That’s how it was in our time. We stayed away from the kitchen during periods.', expression: 'thinking', listener: 'concerned' },
    ], choices: [
      { id: 'why', text: 'Par Dadi, aisa kyun mana karte the?', translation: 'But Dadi, why was it discouraged?', nextScene: 'curiosity', skillImpact: { gyaan: 4, samvaad: 5, saath: 2 }, consequence: 'A thoughtful question gives Dadi space to reflect.', companionExpression: 'thinking' },
      { id: 'fact', text: 'Periods mein kitchen jaana bilkul galat nahi hai.', translation: 'There’s nothing wrong with entering the kitchen during a period.', nextScene: 'direct', skillImpact: { gyaan: 6, samvaad: 1, saath: 1 }, consequence: 'Speaking directly surprises Dadi. She wants to understand your point of view.', companionExpression: 'happy' },
      { id: 'source', text: 'Dadi, aapko ye baat kisne batayi thi?', translation: 'Dadi, who told you this?', nextScene: 'reflection', skillImpact: { gyaan: 3, samvaad: 6, saath: 6 }, consequence: 'Listening to her story makes room for a different conversation.', companionExpression: 'relieved' },
    ] },
    curiosity: { id: 'curiosity', progress: 2, nextScene: 'science', dialogue: [{ id: 'why-response', speaker: 'dadi', text: 'Achha sawaal hai, beta. Maine kabhi iska kaaran poochha hi nahi.', translation: 'That’s a good question, dear. I never asked about the reason.', expression: 'thinking', listener: 'thinking' }] },
    direct: { id: 'direct', progress: 2, nextScene: 'science', dialogue: [{ id: 'fact-response', speaker: 'dadi', text: 'Achha? Mujhe toh kuch aur bataya gaya tha. Tum mujhe samjhaoge?', translation: 'Really? I was taught something different. Will you help me understand?', expression: 'surprised', listener: 'relieved' }] },
    reflection: { id: 'reflection', progress: 2, nextScene: 'inherited-beliefs', dialogue: [{ id: 'source-question', speaker: 'companion', text: 'Dadi, aapko ye baat kisne batayi thi?', translation: 'Dadi, who told you this?', expression: 'thinking', listener: 'thinking' }, { id: 'source-response', speaker: 'dadi', text: 'Meri maa ne. Unhone bhi apni maa se suna tha.', translation: 'My mother did. She had heard it from her mother, too.', expression: 'thinking', listener: 'relieved' }] },
    'inherited-beliefs': { id: 'inherited-beliefs', kind: 'narrative', progress: 2, dialogue: [], narrative: 'Sometimes beliefs travel through generations without being checked.', nextScene: 'science' },
    science: { id: 'science', kind: 'science', progress: 3, dialogue: [], nextScene: 'understanding', scienceCheck: {
      belief: 'Periods ke time kitchen mein nahi jaana chahiye.',
      evidence: 'Menstruation is a normal biological process. There is no medical reason that someone who is menstruating cannot enter a kitchen or prepare food.',
      takeaway: 'Respect the person. Question the belief. Verify the fact.',
      sources: [
        { title: 'UNICEF: Talking about periods at home', url: 'https://www.unicef.org/parenting/health/talking-about-periods-at-home' },
        { title: 'UNICEF: Breaking taboos', url: 'https://www.unicef.org/afghanistan/stories/breaking-taboos' },
      ],
    } },
    understanding: { id: 'understanding', progress: 4, nextScene: 'resolution', dialogue: [
      { id: 'dadi-reconsiders', speaker: 'dadi', text: 'Toh mujhe ye baat galat sikhayi gayi thi?', translation: 'So, was I taught something that wasn’t true?', expression: 'surprised', listener: 'concerned' },
      { id: 'learn-together', speaker: 'companion', text: 'Ho sakta hai Dadi. Lekin ab hum dono milke sahi information jaan sakte hain.', translation: 'Maybe, Dadi. But now we can find the right information together.', expression: 'relieved', listener: 'thinking' },
      { id: 'dadi-welcomes', speaker: 'dadi', text: 'Achha... toh mujhe bhi batao.', translation: 'Alright… tell me more, too.', expression: 'relieved', listener: 'happy' },
    ] },
    resolution: { id: 'resolution', progress: 4, nextScene: 'complete', dialogue: [
      { id: 'kitchen-together', speaker: 'dadi', text: 'Aao beta, saath baithte hain. Aaj hum dono kuch naya seekhenge.', translation: 'Come, dear, let’s sit together. Today we’ll both learn something new.', expression: 'happy', listener: 'relieved' },
    ] },
    complete: { id: 'complete', kind: 'end', progress: 5, dialogue: [] },
  },
};

