import type { Story } from '@/lib/story/types';

const tradition = { id: 'tradition', speaker: 'dadi', text: 'Hamare zamaane mein aisa hi hota tha. Periods mein kitchen se door rehte the.', translation: 'That’s how it was in our time. We stayed away from the kitchen during periods.', expression: 'thinking', listener: 'concerned' } as const;

export const dadiKiRasoi: Story = {
  id: 'ghar-dadi-rasoi', title: 'Dadi Ki Rasoi', world: 'Ghar', startScene: 'opening', reflection: 'Is there a belief in your family you would like to understand better? How could you ask about it respectfully?', completionImpact: { badlav: 4 },
  scenes: {
    opening: { id: 'opening', dialogue: [
      { id: 'belief', speaker: 'dadi', text: 'Beta, tumhare periods ke time kitchen mein nahi jaana chahiye.', translation: 'Dear, you shouldn’t go into the kitchen during your period.', expression: 'concerned', listener: 'confused' },
      { id: 'question', speaker: 'companion', text: 'Dadi, aapko aisa kyun lagta hai?', translation: 'Dadi, why do you think that?', expression: 'thinking', listener: 'thinking' },
      tradition,
    ], choices: [
      { id: 'why', text: 'Par Dadi, aisa kyun mana karte the?', translation: 'But Dadi, why was it discouraged?', nextScene: 'curiosity', skillImpact: { gyaan: 4, samvaad: 5, saath: 2 }, consequence: 'A thoughtful question gives Dadi space to reflect.', companionExpression: 'thinking' },
      { id: 'fact', text: 'Periods mein kitchen jaana bilkul galat nahi hai.', translation: 'There’s nothing wrong with entering the kitchen during a period.', nextScene: 'direct', skillImpact: { gyaan: 6, samvaad: 1, saath: 1 }, consequence: 'Speaking directly surprises Dadi. She wants to understand your point of view.', companionExpression: 'happy' },
      { id: 'source', text: 'Dadi, aapko ye baat kisne batayi thi?', translation: 'Dadi, who told you this?', nextScene: 'reflection', skillImpact: { gyaan: 3, samvaad: 6, saath: 6 }, consequence: 'Listening to her story makes room for a different conversation.', companionExpression: 'relieved' },
    ] },
    curiosity: { id: 'curiosity', progress: 2, nextScene: 'science', dialogue: [
      { id: 'why-response', speaker: 'dadi', text: 'Achha sawaal hai, beta. Maine kabhi iska kaaran poochha hi nahi.', translation: 'That’s a good question, dear. I never asked about the reason.', expression: 'thinking', listener: 'thinking' },
      { id: 'find-out', speaker: 'companion', text: 'Toh kya hum saath mein pata karein, Dadi?', translation: 'Then shall we find out together, Dadi?', expression: 'curious', listener: 'reassuring' },
      { id: 'lets-check', speaker: 'dadi', text: 'Haan, chalo dekhte hain.', translation: 'Yes, let’s find out.', expression: 'happy', listener: 'happy' },
    ] },
    direct: { id: 'direct', progress: 2, nextScene: 'science', dialogue: [
      { id: 'fact-response', speaker: 'dadi', text: 'Achha? Mujhe toh kuch aur bataya gaya tha. Tum mujhe samjhaoge?', translation: 'Really? I was taught something different. Will you help me understand?', expression: 'surprised', listener: 'relieved' },
      { id: 'fact-explain', speaker: 'companion', text: 'Zaroor, Dadi. Chaliye saath mein dekhte hain ki science kya kehta hai.', translation: 'Of course, Dadi. Let’s look at what science says, together.', expression: 'reassuring', listener: 'curious' },
    ] },
    reflection: { id: 'reflection', progress: 2, nextScene: 'inherited-beliefs', dialogue: [{ id: 'source-question', speaker: 'companion', text: 'Dadi, aapko ye baat kisne batayi thi?', translation: 'Dadi, who told you this?', expression: 'thinking', listener: 'thinking' }, { id: 'source-response', speaker: 'dadi', text: 'Meri maa ne. Unhone bhi apni maa se suna tha.', translation: 'My mother did. She had heard it from her mother, too.', expression: 'thinking', listener: 'relieved' }] },
    'inherited-beliefs': { id: 'inherited-beliefs', kind: 'narrative', progress: 2, dialogue: [], narrative: 'Sometimes beliefs travel through generations without being checked.', nextScene: 'science' },
    // Wording mirrors WHO and UNFPA; see docs/health-evidence-register.md (claims GH-1 to GH-3).
    science: { id: 'science', kind: 'science', progress: 3, dialogue: [], nextScene: 'understanding', scienceCheck: {
      belief: 'During a period, one should stay out of the kitchen.',
      evidence: 'Menstruation is a natural bodily process. Menstrual blood is regular blood and tissue, with no special or dangerous properties. Rules about not handling food during a period come from culture and tradition.',
      cultureNote: 'Families and communities follow different traditions. You can respect a tradition and still know the medical fact.',
      takeaway: 'Respect the person. Question the belief. Verify the fact.',
      sources: [
        { title: 'WHO: Menstrual health fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health' },
        { title: 'UNFPA: Menstruation and human rights – FAQ', url: 'https://www.unfpa.org/menstruationfaq' },
      ],
    } },
    understanding: { id: 'understanding', progress: 4, nextScene: 'resolution', dialogue: [
      { id: 'dadi-reconsiders', speaker: 'dadi', text: 'Toh mujhe ye baat galat sikhayi gayi thi?', translation: 'So, was I taught something that wasn’t true?', expression: 'surprised', listener: 'concerned' },
      { id: 'learn-together', speaker: 'companion', text: 'Ho sakta hai Dadi. Lekin ab hum dono milke sahi information jaan sakte hain.', translation: 'Maybe, Dadi. But now we can find the right information together.', expression: 'relieved', listener: 'thinking' },
      { id: 'dadi-payoff', speaker: 'dadi', text: 'Hamare zamaane mein humein kisi ne samjhaya nahi tha. Tum logon ko samajhna chahiye.', translation: 'In our time, nobody explained this to us. You children should understand it.', expression: 'reassuring', listener: 'happy' },
      { id: 'dadi-welcomes', speaker: 'dadi', text: 'Achha... toh mujhe bhi batao.', translation: 'Alright… tell me more, too.', expression: 'relieved', listener: 'happy' },
    ] },
    resolution: { id: 'resolution', progress: 4, nextScene: 'complete', dialogue: [
      { id: 'kitchen-together', speaker: 'dadi', text: 'Aao beta, saath baithte hain. Aaj hum dono kuch naya seekhenge.', translation: 'Come, dear, let’s sit together. Today we’ll both learn something new.', expression: 'happy', listener: 'relieved' },
    ] },
    complete: { id: 'complete', kind: 'end', progress: 5, dialogue: [] },
  },
  // Playing as Aarav: the rule is about his sister Aara, never about him. Aarav practises
  // asking respectfully as an ally, and Aara joins them in the kitchen at the end.
  companionScenes: {
    aarav: {
      opening: { dialogue: [
        { id: 'belief', speaker: 'dadi', text: 'Aarav beta, Aara ko bolo ki periods ke time woh kitchen mein na aaye.', translation: 'Aarav, dear, tell Aara not to come into the kitchen during her period.', expression: 'worried', listener: 'curious' },
        { id: 'question', speaker: 'companion', text: 'Dadi, aap aisa kyun kehti hain?', translation: 'Dadi, why do you say that?', expression: 'thinking', listener: 'thinking' },
        tradition,
      ] },
      resolution: { guest: 'aara', dialogue: [
        { id: 'kitchen-together', speaker: 'dadi', text: 'Aara beta, aao, andar aao. Aaj hum teeno saath mein khana banayenge.', translation: 'Aara, dear, come in. Today the three of us will cook together.', expression: 'happy', listener: 'happy' },
        { id: 'aara-joins', speaker: 'aara', text: 'Sach, Dadi? Aarav, poochne ke liye shukriya.', translation: 'Really, Dadi? Thank you for asking, Aarav.', expression: 'happy', listener: 'reassuring' },
        { id: 'aarav-ally', speaker: 'companion', text: 'Sahi jaankari sabke liye hai. Sawaal poochne se hum sab seekhte hain.', translation: 'The right information is for everyone. Asking questions helps all of us learn.', expression: 'reassuring', listener: 'happy' },
      ] },
      complete: { guest: 'aara' },
    },
  },
};
