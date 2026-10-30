# RituChakra — Project Context for Claude Code

> Source: "RituChakra Project Handover & Product Blueprint" (30 Oct 2026), converted to Markdown.
> Updates since that document (these override it):
> - RituReels is OUT of the current plan. Hide its listing/links in the UI; keep the code and data intact.
> - First school demo: Odisha High School, as part of the Project Lali awareness campaign (shared screen, no phones).
> - Positioning is pan-India, starting in Odisha.
> - Live v1: https://rituchakra-beta.vercel.app/
> - Team: Resolvers (Sarthak Kumar).

**RITUCHAKRA**

*Change the Story. Change the Conversation.*

**PROJECT HANDOVER & PRODUCT BLUEPRINT**

Product vision • Problem • Characters • Story design • Current build • Roadmap • Technology • Evidence & evaluation

Prepared for project continuity and ReFlow 2026 Round 2 planning
30 October 2026

# How to use this handover

This document consolidates the RituChakra product decisions, implementation context, design rationale, known limitations, and next steps discussed to date. It is intended to help a teammate, developer, designer, mentor, evaluator, or future contributor understand the project without needing the full conversation history.

Status discipline: 'Built / described as implemented' means the feature has been discussed as present in the existing website or code. 'Planned' means it is a product direction, not a verified implementation. The repository was not inspected while preparing this document, so confirm current code and deployment status before claiming a feature is complete.

## At a glance

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Item**                            **Current understanding**
  ----------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Product                             RituChakra --- interactive, culturally adaptive menstrual-health storytelling and decision-practice platform.

  Tagline                             Change the Story. Change the Conversation.

  Primary audience                    Young people approximately 11--16, especially rural and government-school learners in Odisha.

  Core learning loop                  Story → Choice → Consequence → Science Check → Reflection / Skill Update.

  Core differentiator                 Learners practise what to do in realistic situations, not just memorise facts or answer a generic quiz.

  Languages                           English, Hindi, Odia are part of the intended experience; text/captions are present in the current content design. Spoken audio availability differs by language.

  Competition context                 ReFlow: Menstrual Health Innovation Hackathon 2026, Track 1: Menstrual Literacy through Digital Storytelling; shortlisted for Level 2 online evaluation.

  Primary next priorities             Evidence register and source-linked Science Checks; story completeness; translation QA; classroom delivery support; evaluation evidence.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 1. Why RituChakra? The name and the purpose

## 1.1 Name rationale

"Ritu" is associated with a cycle/season and is also commonly used in Indian languages as a name associated with menstruation; "Chakra" means a cycle or wheel. Together, RituChakra evokes the menstrual cycle as a natural biological process and a cycle of learning, reflection, and changing conversations. The name is locally resonant and easy to connect with the project's focus. This is a product-branding rationale, not a claim about a single definitive linguistic etymology.

## 1.2 The purpose

RituChakra aims to help young people build practical menstrual-health literacy, confidence, empathy, and respectful communication. It uses familiar situations---home, school, shopping for products, and peer conversations---to make the subject less abstract and easier to discuss.

The platform should help a learner move from "I have heard a rule or myth" to "I can ask a respectful question, recognise the difference between evidence and belief, and decide what to do in a real situation."

Product principle: Respect the person. Question the belief. Verify the fact.

## 1.3 The central insight

Knowing a fact and knowing what to do when a real situation happens are different skills. A student may know that menstruation is normal but still feel unable to respond when a classmate is teased, a period stain appears at school, or a family belief is repeated. RituChakra is designed to rehearse those moments safely through stories and decisions.

"You don't break a myth by memorising a fact. You break it by knowing what to do when you hear it."

# 2. The problem we are solving

## 2.1 The learning gap

-   Menstrual-health information can be incomplete, inconsistent, or framed mainly as facts to memorise.

-   Stigma, embarrassment, teasing, inherited beliefs, and social pressure can make it hard to use accurate knowledge in everyday life.

-   A learner may understand a scientific explanation but not know how to communicate it respectfully to a friend, parent, or elder.

-   Product choices are influenced by cost, availability, comfort, routines, and access---not only by knowing that products exist.

-   Digital-first solutions can exclude students who do not have personal devices, reliable connectivity, or permission to bring phones to school.

## 2.2 Who is affected?

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Audience**                          **Needs / barriers**                                                                    **RituChakra response**
  ------------------------------------- --------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------
  Learners, approx. 11--16              Age-appropriate information, privacy, confidence, relatable examples, clear language.   Short interactive stories, meaningful choices, evidence-based explanations, reflection.

  Girls experiencing menstruation       Practical responses to stains, products, privacy, access to help, and stigma.           Situational rehearsal without treating menstruation as shameful.

  Boys and other peers                  Understanding, empathy, respectful behaviour, ability to be supportive allies.          Aarav and stories that practise allyship rather than positioning the topic as girls-only.

  Families / elders                     Respectful dialogue across generations and sensitivity to culture.                      Dadi as a nuanced character; distinguish medical facts from varied cultural/religious practices.

  Teachers / facilitators               A safe, manageable way to lead discussion with a class.                                 Planned Classroom Mode: shared-screen stories, group choices, discussion prompts.

  Schools / NGOs / community partners   Delivery options that do not assume every learner owns a smartphone.                    Future facilitator-led and printable formats alongside the individual digital experience.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 2.3 What RituChakra is not

-   Not merely a static information website.

-   Not just a generic quiz with right/wrong answers.

-   Not a chatbot that improvises medical advice.

-   Not a diagnosis tool or replacement for a healthcare professional.

-   Not a product that assumes every student has a personal smartphone.

-   Not a platform that mocks elders or treats all cultural practices as identical.

-   Not a claim that every tradition has a medical explanation; cultural practices and medical evidence should be described separately.

# 3. Product vision, promise and learning model

## 3.1 Product promise

RituChakra lets learners enter realistic menstrual-health situations, make choices, see consequences, and then connect their experience to reliable information and reflection. The story provides the emotional and social context; the Science Check provides the evidence; the reflection connects learning to future behaviour.

## 3.2 Core loop

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Stage**                       **What happens**                                                                                   **Why it matters**
  ------------------------------- -------------------------------------------------------------------------------------------------- --------------------------------------------
  1\. Story                       A character faces a relatable situation.                                                           Creates context and emotional engagement.

  2\. Choice                      The learner selects a response or discusses possible responses.                                    Practises agency and decision-making.

  3\. Consequence                 The story shows what follows from that choice.                                                     Makes the social/practical effect visible.

  4\. Science Check               A concise, source-backed explanation separates evidence from misconceptions or cultural beliefs.   Builds accurate understanding.

  5\. Reflection / Skill Update   A question or takeaway invites the learner to reconsider or practise a skill.                      Connects the story to real-life action.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 3.3 Knowledge and communication should be distinguishable

A response can be scientifically correct but unnecessarily rude. RituChakra should avoid scoring every response on a single simplistic 'correct/incorrect' axis. Where suitable, story feedback can distinguish scientific understanding, practical safety, empathy, and communication. For example, a learner can be told that their factual point is correct while a more respectful way of saying it may lead to a better conversation.

## 3.4 Open-ended responses: the agreed direction

Feedback suggested that students should sometimes be able to respond in their own words rather than only choosing from three fixed options. The preferred direction is a hybrid, not a complete replacement of choices:

-   Keep predefined choices for clear, predictable story branches and reliable evaluation.

-   Add an optional "Say it your way" text response at a carefully selected moment in one story, if time and implementation capacity allow.

-   If AI is later used to interpret open responses, it should map a response to reviewed, predefined learning pathways and provide bounded feedback. It must not generate unrestricted story branches or unreviewed medical guidance.

-   Voice input is a possible future enhancement, not a Round 2 dependency.

-   Test age-appropriateness, privacy, safety, language handling, and moderation before collecting free-text responses from children.

## 3.5 Engagement philosophy

A slow educational experience will struggle to hold attention. The answer is not decorative animation everywhere; it is purposeful pacing. Start with a recognisable hook, show the dilemma quickly, keep choices readable, make the consequence visible, and make the Science Check feel like a meaningful reveal. Aim for short, focused episodes that can be completed in roughly a minute when appropriate, but let the story's educational needs determine the final length.

# 4. Characters and why they matter

## 4.1 Aara --- the curious learner

-   Age range: approximately 11--12.

-   Personality: curious, empathetic, expressive, thoughtful, willing to ask questions.

-   Role: helps learners see how to question a belief respectfully and seek evidence.

-   Design purpose: provides a relatable viewpoint for situations directly affecting girls, without making her a perfect expert who knows every answer.

## 4.2 Aarav --- the supportive peer and ally

-   Age range: approximately 11--12.

-   Personality: curious, friendly, slightly playful, supportive.

-   Role: helps broaden menstrual literacy beyond girls and practises respectful allyship, empathy, and everyday peer behaviour.

-   Design purpose: signals that menstrual health is not solely a girl's responsibility. Boys can learn accurate information, avoid stigma, and support friends respectfully.

## 4.3 Why offer both a girl and a boy character?

The learner chooses Aara or Aarav at global onboarding ("Who would you like to experience RituChakra as?"). The selection should persist through the journey. This gives learners agency and makes the experience welcoming to different users. The choice should not lock learners into gender stereotypes or imply that one character is only allowed to learn certain facts. Both should encounter meaningful learning, and the stories should not suggest that boys menstruate.

## 4.4 Dadi --- a bridge across generations

-   Personality: warm, familiar, emotionally grounded, shaped by what she learned in her own time.

-   Role: represents inherited beliefs and the opportunity for intergenerational learning.

-   She is not a villain, a punchline, or a person to be shamed for what she was taught.

-   Her arc: inherited belief → respectful question → reflection → evidence → understanding → support.

-   Emotional payoff: "Hamare zamaane mein humein kisi ne samjhaya nahi tha. Tum logon ko samajhna chahiye."

## 4.5 Why Dadi is important

A culturally respectful menstrual-health product should not create a simple conflict between 'modern children' and 'ignorant elders'. Many beliefs are inherited, and people may follow practices for cultural, religious, family, or personal reasons. Dadi allows a learner to practise asking questions without attacking the person. The story can explain what medical evidence says while acknowledging that cultural and religious practices vary between families and communities.

Character rule: Challenge the claim when needed; preserve the dignity of the person.

## 4.6 Character consistency

-   Use consistent names, age range, expressions, voice, visual design, and personality across stories.

-   Avoid giving a character perfect knowledge solely to deliver a lecture; let them ask and learn.

-   Use expressions and speaker changes to improve comprehension, not as decoration that delays the story.

-   Make the characters supportive and non-judgmental; do not make menstruation shameful or frightening.

# 5. Worlds and story architecture

The map uses a familiar progression from home to school, shopping, peer/community life, and eventually wider public life. The existing map order should remain unchanged.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Order**         **World**         **Theme**              **Current status / purpose**
  ----------------- ----------------- ---------------------- --------------------------------------------------------------------------------------------------
  1                 🏡 GHAR           Family & Traditions    Available. Includes Dadi Ki Rasoi story content; the related reel listing is temporarily hidden.

  2                 🏫 VIDYALAYA      School & Adolescence   Available. Includes The Stain.

  3                 🛍️ BAZAAR         Products & Choices     Available. Includes Choose What Fits.

  4                 🌳 SAKHI SABHA    Allyship & Community   Available. Includes The Joke.

  5                 🏙️ NAGAR          Modern Life            Coming Soon. Do not present the proposed journey story as built.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------

## 5.1 Story coverage matrix

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Story**          **Learning objective**                                                                      **Situation and practice**                                                                                                 **Status**
  ------------------ ------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------
  Dadi Ki Rasoi      Question inherited beliefs respectfully; separate medical evidence from family tradition.   Dadi says not to enter the kitchen during menstruation; Aara asks why and explores whether there is a scientific reason.   Story content exists in project context. Reel listing should remain hidden for now.

  The Stain          Practise practical help-seeking, privacy, confidence, and supportive peer behaviour.        A student notices a period stain at school and considers what to do, including asking for help or hiding it.               Existing story.

  Choose What Fits   Understand that products differ and that suitability depends on individual context.         Compare comfort, cost, availability, reusability, routine, preference, use and care.                                       Existing story.

  The Joke           Recognise stigma and practise respectful allyship.                                          A friend makes a mild period joke; the learner considers laughing, ignoring, or stepping in respectfully.                  Existing story.

  The Long Journey   Handle access, privacy, product, and toilet needs while away from home.                     A period begins during a bus journey or other travel situation.                                                            Proposed future story; not built / keep Nagar Coming Soon.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 5.2 Story completeness checklist

Each story should cover one clear learning objective well rather than attempting to teach every menstrual-health topic in one episode. Use this checklist when reviewing or adding stories:

-   Context: Can the learner understand where the character is and what happened?

-   Dilemma: Is the practical or social challenge clear?

-   Choices: Are the options realistic, age-appropriate, and meaningfully different?

-   Consequences: Does each branch explain what may happen without shaming the learner?

-   Science Check: Is every health claim accurate, sourced, and written in accessible language?

-   Cultural nuance: Are cultural/religious practices distinguished from medical facts?

-   Takeaway: Is there one memorable action or idea?

-   Reflection: Does the learner have a chance to think about what they would do?

-   Inclusion and safety: Does the story avoid blame, humiliation, stereotypes, or unsafe instructions?

-   Coverage tracking: Is the objective mapped to the wider learning plan so important topics are not accidentally omitted?

# 6. RituReels --- short-form storytelling

## 6.1 Purpose

RituReels is the short-form animated/video-like storytelling experience. Its current label is "RituReels --- Dadi Se Baat". It should feel like a compact conversation with visible speakers, expressive characters, readable captions, controlled pacing, and one clear reflection at the end---not a long sequence requiring the learner to click after every line.

## 6.2 Current reel visibility decision

Show only "Dadi Ka Mandir" in the RituReels frontend listing for now. Keep the Dadi Ki Rasoi reel code/data intact; do not delete it. This is a listing/visibility change, not removal of the story from the codebase.

## 6.3 Dadi Ka Mandir --- dialogue and message intent

The current content begins with Dadi saying that Aara should not do puja or visit a temple during her period. Aara asks why, acknowledges the family belief, and asks whether menstruation medically prevents temple attendance. The Science Check explains that menstruation is a normal biological process and does not make a person medically impure, while noting that religious and cultural practices differ between families and communities. The reflection helps Dadi distinguish a medical issue from a belief or tradition.

Important nuance: the story should not prescribe a religious rule or mock anyone's faith. It should state the medical point accurately and leave room for varied cultural/religious practice.

## 6.4 Reel experience requirements

-   Portrait-inspired, short-video presentation using the existing Indian illustrated style and Aara/Dadi characters.

-   Subtle talking/speaker animation and expressions; clear distinction between active speaker and listener.

-   Captions and language selection; visible progress and minimal controls.

-   Play/pause, replay, mute, and language selector where currently supported.

-   Dialogue should progress automatically according to the existing timing system; avoid requiring a click after every line.

-   Make the evidence segment visually distinct from the conversation and end with one reflection.

-   Do not change Dadi Ka Mandir's dialogue, timing, animation, audio, controls, Science Check, reflection, or language behaviour during a task that only changes reel listing visibility.

## 6.5 Code context

A previously shared file path was \`src/data/reels/rituReels.ts\`. The \`RituReel\` type extends \`Story\` and includes a \`slug\`, a \`theme\` of \`kitchen\` or \`temple\`, \`timings: Record<string, number[]>\`, and optional audio data. A helper named \`line(\...)\` creates dialogue lines with stable IDs, speaker, text, translation, expression, and listener expression. Existing dialogue IDs and timing relationships should be preserved when changing unrelated UI.

English audio has been described as working. Hindi/Odia text/captions exist in the content design, but spoken Hindi/Odia audio is not guaranteed because recorded clips or a voice provider have not been confirmed. Do not advertise multilingual voice-over until it is tested.

## 6.6 Audio approach if expanded later

If multilingual spoken audio becomes a priority, pre-generated clips keyed to stable dialogue IDs and language are a predictable option. Per-line clips can improve dialogue synchronisation and allow a fallback to captions. This is a future technical direction, not a confirmed completed feature.

# 7. Website experience and design decisions

## 7.1 Main page and navigation decisions

-   Preserve the existing hero/header and tagline: "Change the story. Change the conversation."

-   Keep character selection for Aara/Aarav.

-   Keep the full five-world map, in its current order and with existing availability/coming-soon states.

-   Keep the existing visual style and responsive behaviour; avoid broad redesigns when the task is only to hide one listing or remove a non-functional showcase.

-   Remove the non-functional "Explore the RituChakra Experience" feature-card/showcase section, including cards for Science Check, Myth Mandi, Perspective Switch, Adaptive Journey, Impact Dashboard, and Regional Story Packs, if these are still present as described. Do not remove functioning story-level Science Checks just because a showcase card is removed.

-   Hide Dadi Ki Rasoi from RituReels frontend listings while keeping its implementation/data intact; display Dadi Ka Mandir only in the reel listing for now.

## 7.2 Scope control

The product has multiple attractive expansion ideas. For the competition, prioritise learning quality and a coherent working flow over adding many unfinished modules. A polished small experience with traceable evidence and real learner feedback is stronger than a large feature grid whose cards do not lead to functioning experiences.

## 7.3 Avatar personalisation

A selfie-upload or generated-personal-avatar idea was discussed. The current recommendation is to defer it for Round 2. It introduces privacy and safeguarding issues because the target audience includes children, as well as implementation and moderation complexity. A simple Aara/Aarav selection already gives a meaningful sense of agency. If customisation is added later, prefer non-identifying preset choices and avoid collecting children's photos unless a robust consent, retention, and safeguarding design exists.

# 8. Classroom Mode and Offline Mode --- supporting features, not the main product

Product hierarchy decision: One-on-one interactive storytelling remains the primary experience. Classroom Mode and Offline Mode are complementary delivery options, not the core identity of RituChakra.

## 8.1 Primary mode: individual experience

The default product experience remains a learner engaging with a character/story, making choices, seeing consequences, checking evidence, and reflecting. It is the clearest way to deliver the core decision-practice loop.

## 8.2 Classroom Mode --- planned addition

The school demonstration context matters: in a government school, students were not allowed to bring phones, so the experience was shown on a shared device/screen and learners participated together. Classroom Mode should build on this real constraint rather than assuming one device per student.

-   A teacher/facilitator controls the story on one laptop or shared display.

-   The class discusses a dilemma and votes by raising hands or using simple response cards.

-   The facilitator selects the group's choice; the story shows the consequence.

-   Discussion prompts and facilitator notes support a short group conversation.

-   No mandatory individual student account or phone is required for this mode.

-   Large, readable text and simple controls make the experience usable from across a classroom.

This is a planned delivery mode. Do not claim it is fully implemented until it has been built and tested in a real classroom.

## 8.3 Offline Mode --- planned addition

Offline access is a supporting capability for settings with unreliable connectivity. Keep the scope realistic and distinguish levels:

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Level**                       **Potential capability**                                                                                          **Planning status**
  ------------------------------- ----------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------
  Level 1: offline presentation   A downloaded/static presentation or locally available story materials that can be shown without network access.   Most practical first milestone; implement and test before claiming.

  Level 2: offline interaction    Story content, choices, consequences, and Science Checks work locally, with progress stored on the device.        Possible later milestone; requires deliberate implementation and testing.

  Level 3: offline AI             AI interpretation or generation while disconnected.                                                               Not needed for the current evaluation; do not make this a dependency.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Classroom Mode and Offline Mode solve different but related access issues. Classroom Mode changes who controls the experience and how a group participates. Offline Mode changes whether the experience requires a network. They can be combined, but neither should displace the one-on-one product as the main proposition.

# 9. Evidence, medical accuracy, cultural nuance and sources

## 9.1 Why evidence is a competition priority

ReFlow feedback emphasised story completeness, sources of information, translation accuracy, and the digital-access reality for school students. RituChakra's Science Checks must therefore be auditable: each health claim should have a reliable source, a clear approved wording, and a record of where it is used.

## 9.2 Evidence register --- recommended artefact

Create \`docs/health-evidence-register.md\` or an equivalent maintained document. Suggested fields:

-   Claim ID and topic.

-   Exact claim as shown to learners.

-   Source organisation, title, URL, publication/update date, and relevant section/page.

-   A short note explaining what the source supports and what it does not support.

-   Approved child-friendly wording in English.

-   Hindi and Odia translations and reviewer names/status.

-   Story/reel/Science Check locations using the claim.

-   Review date, reviewer, and next review date.

## 9.3 Starter authoritative sources

Use these as starting points for source review; check the current page and relevant passages before tying a specific sentence to it.

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Source**                                                                       **Potential use**                                                                         **Link**
  -------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------
  World Health Organization (WHO), Menstrual Health fact sheet                     General menstrual-health framing, education, stigma and access context.                   https://www.who.int/news-room/fact-sheets/detail/menstrual-health

  UNICEF, Guidance on Menstrual Health and Hygiene                                 Programmatic guidance for menstrual-health and hygiene interventions.                     https://www.unicef.org/documents/guidance-menstrual-health-and-hygiene

  India National Health Mission, Menstrual Hygiene Policy for School-Going Girls   Indian school context, education, access, sanitation and stigma-related policy framing.   https://www.nhm.gov.in/images/pdf/guidelines/index1.php?lang=1&level=3&lid=859&sublinkid=1531

  National Health Mission, Menstrual Hygiene Scheme                                Context for public menstrual-hygiene support in India.                                    https://nhm.gov.in/nhm_live/index1.php?lang=1&level=3&lid=391&sublinkid=1021

  UNICEF Data, translation and customisation guidance                              A reference for translation, adaptation, review and testing practices.                    https://data.unicef.org/resources/module-on-child-functioning-guidance-note-for-translation-and-customization/

  UNESCO, Languages Matter                                                         Multilingual education context and the importance of language in learning.                https://www.unesco.org/en/articles/languages-matter-global-guidance-multilingual-education
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 9.4 Science Check rules

-   Use evidence-based, age-appropriate language; avoid absolute claims that the source does not support.

-   Separate medical statements from cultural or religious practice. A practice may vary between families and communities; do not present it as universal.

-   Do not diagnose. If a story mentions symptoms or a possible health concern, use reviewed guidance and direct the learner to a trusted adult/health professional where appropriate.

-   Do not imply that all products suit all people. Discuss choice, access, fit, cost, routine, and safe use/care using reliable sources.

-   Provide a visible "Sources & Evidence" affordance or source reference from Science Checks when practical.

-   Review claims periodically and log changes.

## 9.5 Example: temple story nuance

The intended message is that menstruation is a normal biological process and does not make a person medically impure. The story should also explicitly acknowledge that religious and cultural practices vary. It should not tell learners what religious choice they must make; it should help them distinguish medical evidence from a family or community tradition.

## 9.6 Translation quality assurance

Translation is not just a word-for-word conversion. Dialogue, choices, consequences, Science Checks, reflection, labels, buttons, captions, and help text all need review.

-   Approve the English source text first.

-   Translate the entire learner journey, not just dialogue.

-   Have fluent/native Hindi and Odia reviewers check meaning, tone, age appropriateness, and cultural nuance.

-   Check whether a phrase is natural when spoken aloud; avoid literal translations that sound formal or unnatural to children.

-   Check text overflow, line breaks, caption timing, language switching, and consistency of character names.

-   Keep a QA matrix by story and language, with statuses such as Not started / Translated / Reviewed / Tested.

-   Do not claim a language is fully validated until review and interface testing are complete.

# 10. Technology and implementation context

## 10.1 Stack known from project discussions

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Area**                **Known / discussed technology**                                                                         **Status note**
  ----------------------- -------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------
  Frontend framework      React / Next.js with TypeScript                                                                          Project context indicates this stack; verify package files before making an external technical claim.

  Styling                 Tailwind CSS                                                                                             Used/discussed in the project context.

  Deployment              Vercel                                                                                                   Deployment has been attempted; latest success/failure state is not confirmed in this handover.

  AI                      Gemini API was explored in the broader project workflow                                                  Do not assume the current production path depends on Gemini; confirm actual calls and environment variables.

  Story content           Structured story/reel data in TypeScript                                                                 Known file path: \`src/data/reels/rituReels.ts\` for RituReels data.

  Reel dialogue           Stable dialogue IDs, speaker text, expressions/listener expressions, timing arrays, optional audio map   Preserve IDs and timing relationships when changing unrelated UI.

  Audio                   English audio described as working; Hindi/Odia speech not confirmed                                      Verify per-language behaviour before claiming multilingual audio.

  Backend / database      No confirmed RituChakra production database architecture in the available project summary                Do not import Firebase Realtime Database details from the separate HeritageHealth project.

  Repository              GitHub repo previously identified as \`https://github.com/Sarthak115/rituchakra.git\`, branch \`main\`   Whether latest changes were committed/pushed is unknown; verify in Git before assuming.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 10.2 Deployment caution

A previous Vercel build log was reported with a mismatch involving a missing \`.next/routes-manifest.json\`, while a \`vinext\` build appeared to succeed. This is a historical issue, not a confirmed current failure. Do not change the framework or build pipeline blindly. Inspect \`package.json\`, lockfile, Vercel build settings, and current logs first; make the smallest reversible change.

## 10.3 Safe implementation practices

-   Keep the requested change narrow. A listing-visibility change should not rewrite story content or the reel player.

-   Preserve the five-world map order and current states unless explicitly asked to change them.

-   Do not delete \`kitchenReel\` data when only hiding it from a frontend list.

-   Avoid changing Dadi Ka Mandir's dialogue, timings, audio, animation, controls, Science Check, reflection, or language behaviour for unrelated UI cleanup.

-   Before changing deployment configuration, inspect the existing build and deployment setup.

-   Do not expose API keys in client-side code or commit secrets to Git.

-   Commit coherent changes to the existing repository and branch only after reviewing the diff; confirm the push actually succeeded.

## 10.4 Current status confidence

This handover is a synthesis of prior project discussions, not a live code audit. The implementation labels below reflect the available conversation history and must be verified against the repository before being used as formal evidence.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Feature / area**                       **Working status assessment**                                                  **Verification needed**
  ---------------------------------------- ------------------------------------------------------------------------------ ----------------------------------------------------------------------
  World map and story structure            Described as present in the current website.                                   Check actual route, availability states and order.

  Aara/Aarav character selection           Described as part of the intended/current experience.                          Confirm selection persists across navigation/reload.

  Four existing story concepts             Described as existing: Dadi Ki Rasoi, The Stain, Choose What Fits, The Joke.   Run each story end-to-end; verify branch completeness.

  RituReels                                Two reels described in code: kitchen and temple.                               Confirm current player, listing and timing behaviour.

  Hide kitchen reel in listing             A requested change; completion not confirmed.                                  Verify listing shows only Dadi Ka Mandir while data remains intact.

  Remove non-functional feature showcase   A requested cleanup; completion not confirmed.                                 Check homepage and ensure working story-level features remain.

  Hindi/Odia text                          Present in content design according to prior discussion.                       Review all strings and check the full interface.

  Hindi/Odia speech audio                  Not confirmed.                                                                 Do not claim until tested.

  Classroom Mode                           Planned product addition.                                                      Build and pilot before claiming available.

  Offline Mode                             Planned product addition.                                                      Test specific offline level before claiming.

  Open-ended response                      Agreed as a possible hybrid enhancement.                                       Prototype one bounded moment; safety and evaluation review required.

  Selfie avatar                            Deferred.                                                                      Do not prioritise for Round 2.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 11. ReFlow 2026 competition context

## 11.1 Track and status

RituChakra is positioned for ReFlow: Menstrual Health Innovation Hackathon 2026, Track 1: "Menstrual Literacy through Digital Storytelling." Project context records that it was shortlisted for Level 2 / online pre-final evaluation.

Dates previously shared in the project context: Level 2 online evaluation 30 October--5 November 2026; finalist announcement 10 November 2026; Grand Finale tentatively 4 December 2026 at IIT Bhubaneswar. Confirm all dates and instructions against the latest organiser communication.

## 11.2 What feedback indicates judges may care about

-   Story completeness: what aspects are covered, how the story flows, and what the scope/limits of each story are.

-   Information sources: health claims need to be traceable and trustworthy.

-   Translation accuracy: English, Hindi and Odia content needs careful review.

-   Digital access: a student may not own or be permitted to bring a phone.

-   Quality of execution, impact potential, scalability, presentation, and live demonstration are important considerations from prior competition context; do not assume an exact scoring rubric without the official document.

## 11.3 Competition positioning

The strongest defensible pitch is not "we have the most features." It is: RituChakra helps young people rehearse real menstrual-health situations, makes choices and consequences visible, grounds the learning in reviewed evidence, and supports both individual and facilitated classroom delivery.

## 11.4 What will make the entry more credible

-   A clear learning objective and coverage map for every story.

-   A source register tied directly to each Science Check.

-   A reviewed Hindi/Odia translation matrix for the stories shown in the demo.

-   A short, reliable demo that works without depending on unstable external services.

-   A real feedback summary from the school demonstration, with consent and privacy respected.

-   A classroom delivery plan for schools where learners do not have individual devices.

-   Honest status labels: built, tested, planned, or not yet validated.

# 12. Demo and pitch narrative

## 12.1 Suggested concise pitch

RituChakra is an interactive, culturally adaptive menstrual-health storytelling platform that puts young people into real-life situations, lets them practise decisions and conversations, and helps them learn evidence-based responses. Instead of only memorising facts, learners experience a story, choose what to do, see the consequence, check the science, and reflect. With Aara, Aarav and Dadi, RituChakra supports respectful intergenerational dialogue and helps make menstrual literacy a shared responsibility. Individual storytelling is the core experience, with classroom-led and offline delivery planned to extend access where personal devices or reliable internet are unavailable.

## 12.2 Suggested demo order

1.  Open with a familiar real-world dilemma, not a feature list.

2.  Show the learner/character selection and the map briefly.

3.  Play one short story with a meaningful decision.

4.  Show the consequence and the Science Check with its source reference.

5.  Show the reflection and how the learner might respond differently next time.

6.  Explain that Classroom Mode is being designed for settings like the government school demonstration, where students cannot bring phones.

7.  Close with the core differentiator: decision practice grounded in evidence.

## 12.3 Do not overclaim

-   Do not call Classroom Mode complete until implemented and tested.

-   Do not claim offline interaction unless the website has been tested without a network.

-   Do not claim measurable learning gains without an evaluation.

-   Do not claim Hindi/Odia voice support unless it works end-to-end.

-   Do not say every cultural belief is medically false or that all communities follow the same practice.

-   Do not present proposed Nagar or other future stories as already built.

# 13. Evaluation plan: prove learning, not just usage

## 13.1 Lightweight pilot plan

A small, ethically conducted classroom pilot can help establish usability and learning signals. Obtain school/guardian/organiser permissions as appropriate, do not collect unnecessary personal data, and avoid asking children to disclose personal menstrual experiences publicly.

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Measure**                      **Simple method**                                                             **What it tells us**
  -------------------------------- ----------------------------------------------------------------------------- -------------------------------------------------------------------------------------
  Comprehension                    A few age-appropriate pre/post questions tied to one story objective.         Whether understanding appears to improve; small pilot is not proof of broad impact.

  Decision reasoning               Ask learners to explain why they chose an option, optionally in a group.      Whether they can articulate a reason rather than guess.

  Participation                    Facilitator observes whether learners engage and whether prompts are clear.   Whether the classroom format is usable.

  Language clarity                 Ask which phrases were confusing; record reviewer notes by language.          Where translation or reading level needs improvement.

  Story pacing                     Observe where learners lose attention or need repeated explanation.           Where to shorten or clarify.

  Confidence / intended response   Use a non-invasive scenario question before and after.                        Whether learners feel better equipped to respond in a scenario.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 13.2 Suggested feedback prompts

-   What happened in the story?

-   What choices did the character have?

-   What would you do, and why?

-   Which part was confusing or too long?

-   Was any word difficult in English, Hindi, or Odia?

-   Did the Science Check explain the reason clearly?

-   Would you be comfortable doing this activity with a teacher and classmates? What would make it easier?

## 13.3 Evidence and ethics

Record only what is necessary, anonymise feedback, and do not collect names, photographs, health histories, or identifiable disclosures from children unless there is a clear approved reason and appropriate consent/safeguarding. Avoid making public impact claims from a tiny informal pilot. Report the sample size and limitations honestly.

# 14. Roadmap and prioritisation

  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Priority**      **Workstream**                       **Concrete deliverable**                                                                                     **Reason**
  ----------------- ------------------------------------ ------------------------------------------------------------------------------------------------------------ -----------------------------------------------------------------------------
  P0                Content accuracy                     Evidence register; every demo Science Check mapped to source and approved wording.                           Directly addresses evaluator feedback and protects credibility.

  P0                Story completeness                   One-page story spec and coverage map for each current story.                                                 Shows intentional learning design and avoids shallow/unfinished narratives.

  P0                Translation QA                       Reviewed English/Hindi/Odia matrix for demo paths.                                                           Addresses explicit language-quality feedback.

  P0                Demo reliability                     One dependable end-to-end story flow and clear source reveal.                                                Reduces live-demo risk.

  P1                Classroom Mode concept               Facilitator flow and group-choice prototype/design, using shared-screen context.                             Responds to actual device restrictions without changing core product.

  P1                Frontend cleanup                     Only Dadi Ka Mandir shown in RituReels; remove non-functional showcase cards; preserve map/hero/selection.   Makes the current product more coherent.

  P1                Bounded open response                Optional "Say it your way" at one selected story point, only if safe and feasible.                           Adds agency while retaining predictable branches.

  P2                Offline presentation                 A tested offline presentation/packaged story mode.                                                           Extends reach in low-connectivity settings.

  P2                Offline interaction                  Local story engine and local progress, tested without internet.                                              More complex; only after the first level is reliable.

  P3                Multilingual audio                   Reviewed/generated/recorded per-line audio with fallback captions.                                           Useful but not a substitute for translation review.

  Deferred          Selfie avatar and open-ended voice   Revisit only with safeguarding, consent, privacy, moderation, and time plan.                                 High complexity for limited immediate competition value.
  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 14.1 Recommended sequence

8.  Freeze the core product proposition and story map; avoid new feature sprawl.

9.  Audit the current demo path and mark each feature Built / Tested / Planned.

10. Create the evidence register and attach sources to every Science Check shown in the demo.

11. Review and test English, Hindi, and Odia for the selected demo story.

12. Complete the requested listing/homepage cleanup without changing story/player behaviour.

13. Prepare a classroom facilitation script and a simple group-voting method.

14. Run a small usability/learning pilot if permissions and time allow; document limitations.

15. Rehearse the pitch and test the demo on the actual presentation setup.

# 15. Risks and mitigations

  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Risk**                              **Why it matters**                                                            **Mitigation**
  ------------------------------------- ----------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------
  Unsupported health claims             Could harm trust and weaken the entry.                                        Source every claim; use evidence register and periodic review.

  Translation errors                    Learners may misunderstand or receive inconsistent guidance.                  Fluent/native review plus UI and spoken-language QA.

  Digital exclusion                     Individual-device assumptions exclude intended users.                         Keep one-on-one primary, add facilitator-led shared-screen mode and later offline options.

  Overbuilding                          Too many unfinished features dilute the core experience.                      Prioritise source-backed stories and reliable demo.

  AI hallucination / unsafe free text   Could create inaccurate health guidance or unsuitable content for children.   Use bounded, reviewed pathways; defer AI-generated branches and voice input.

  Cultural insensitivity                Can alienate families and communities.                                        Respect people, question claims, distinguish medical evidence from practice.

  Privacy and child safeguarding        Selfies, free text, or personal disclosures can create risk.                  Minimise data, avoid unnecessary identifiers, use appropriate permissions and safeguards.

  Deployment/build mismatch             Live demo may fail even when local development works.                         Inspect current Vercel settings/logs; test the exact deployed build and keep a backup demo.

  Overstated impact                     Small informal tests do not prove broad learning outcomes.                    Describe pilot scope, measures, and limitations honestly.
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 16. Glossary

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Term**                            **Meaning in this project**
  ----------------------------------- ----------------------------------------------------------------------------------------------------------------------------
  Science Check                       A concise, evidence-backed explanation linked to the situation in the story.

  Story branch                        A different story path or consequence based on the learner's choice.

  RituReels                           Short-form, animated conversation-based story experience.

  Classroom Mode                      Planned facilitator-led delivery where a class participates using one shared screen/device.

  Offline Mode                        Planned ability to access some content without a live internet connection; exact capability depends on implementation.

  Evidence register                   A maintained record linking each health claim to its source, approved wording, language review and story usage.

  Allyship                            Practical, respectful support for someone experiencing stigma or embarrassment.

  Built vs. planned                   Built means present in the current implementation; planned means an intended future feature. Testing is a separate status.
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------

# 17. Final product decisions to preserve

-   Product identity: RituChakra --- "Change the Story. Change the Conversation."

-   Core loop: Story → Choice → Consequence → Science Check → Reflection / Skill Update.

-   Primary mode is the individual, one-on-one interactive story experience.

-   Classroom Mode and Offline Mode are supporting additions, not the main product proposition.

-   Keep both Aara and Aarav as character choices; selection persists across the journey.

-   Dadi remains warm and nuanced; challenge misinformation without mocking the person or tradition.

-   Keep the map order: Ghar → Vidyalaya → Bazaar → Sakhi Sabha → Nagar; Nagar remains Coming Soon until built.

-   Keep story-level Science Checks even if the non-functional "Explore the RituChakra Experience" showcase cards are removed.

-   RituReels listing should show only Dadi Ka Mandir for now; keep Dadi Ki Rasoi code/data intact.

-   Open-ended responses should be a bounded optional layer alongside predefined choices, not an uncontrolled AI story engine.

-   Defer selfie avatars and voice input until the core evidence, story quality, translations and demo are solid.

-   Never claim offline operation, multilingual speech, validated translations, or learning impact without testing/evidence.

# Appendix A --- Known project file / repository references

-   RituReels data file discussed: \`src/data/reels/rituReels.ts\`.

-   Repository previously identified: \`https://github.com/Sarthak115/rituchakra.git\`.

-   Branch previously specified for work: \`main\`.

-   Deployment platform discussed: Vercel.

These references come from prior project discussion. Confirm that paths, branch, remote, deployment configuration, and current commit remain correct before editing or sharing.

# Appendix B --- Handover checklist for the next contributor

-   Read this document and confirm the current repository and deployed version.

-   Audit the current homepage, map, story paths, reel listing and language selector.

-   Mark the status table with actual code-level evidence and test results.

-   Ensure only Dadi Ka Mandir appears in the RituReels listing, without deleting Dadi Ki Rasoi data.

-   Remove only the non-functional feature showcase; preserve functioning Science Checks.

-   Build the evidence register and source every health claim shown in the demo.

-   Review Hindi and Odia with fluent/native reviewers; test captions and layout.

-   Prepare and rehearse the classroom facilitator flow.

-   Check the deployed demo and keep a reliable fallback if network/build issues occur.

-   Record what is built, what is tested, what is planned, and what is still unknown.
