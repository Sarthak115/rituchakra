# "Say it your way": voice answers (concept)

**Status:** front-end preview only. The "Tap to speak" button under each set of choices explains the idea. It never opens the microphone and records nothing. This file describes how the real feature would work, so the pitch and the later build agree.

## The idea
At each decision, a learner can keep tapping one of the three reviewed choices, or say what they would do in their own words, in Hindi, Odia or English. RituChakra works out which reviewed path their answer is closest to and continues the story from there.

## How it would work

1. **Speech to text.** Use an Indian-language speech service with strong Odia support, for example Government of India's Bhashini, or on-device recognition where available.
2. **Match, don't generate.** An AI model reads the transcript and picks one label:
   - one of the existing reviewed choices, e.g. `ask-friend`, `ask-teacher`, `leave-quietly`;
   - `unclear`, which leads to a friendly follow-up: "Can you say a bit more?";
   - `needs-care`, if the learner says something worrying about themselves, which shows a "talk to a trusted adult" card.
   It returns only that label and a confidence score. It never writes story text, dialogue or health advice.
3. **Continue the story.** The chosen label drives the existing story engine, so every consequence and Science Check a learner sees has been reviewed.
4. **Fall back to buttons.** If confidence is low, the network is down, or the language isn't recognised, the learner sees the three choices with their words shown: "Did you mean…?"

This matches the product rule already in `docs/RITUCHAKRA_CONTEXT.md`: AI may map a response to reviewed pathways, but must not generate unrestricted story branches or unreviewed medical guidance.

## Safety and privacy, before any real use
- **Consent:** parent or school consent before any child's voice is processed. Classroom view uses the teacher's device only.
- **No storage:** audio and transcripts are discarded straight after matching; nothing is linked to a child.
- **Labels only:** the model output is limited to a fixed list of labels.
- **Review sample:** a small, anonymised, consented set of phrases is checked by the team so the matching can be tuned.
- **Distress handling:** the `needs-care` path is written with a counsellor or health educator.
- **Testing:** with real Odisha learners for accents, code-mixing (Hinglish, Odia + English) and noisy classrooms.

## What to tell judges
"Today learners choose from reviewed answers. Next, they can say it their own way in Odia, Hindi or English. AI only matches their answer to a reviewed path; it never invents health advice. The button you see is a preview: it doesn't record anything yet, because children's voices need consent and safeguards first."
