# RituChakra: Live Demo Script (90 seconds)

**Story:** *The Stain* (Vidyalaya). One realistic moment, two points of view, choice → consequence → Science Check → reflection.
**Screen:** laptop on the projector at 1366×768, browser at 100 % zoom, in English (switch language at the end).

## Before you present (10 minutes before)

1. Open the demo URL (see *Where to run it* below) in **Chrome**. Close other tabs. Sound is on by default (soft taps and chimes); use the speaker button at the top right to mute it if the room needs quiet.
2. Open **Vidyalaya → Restart story** (top right) so the story starts fresh, then go back to the map. Do the same on **Ghar** if you will show it.
3. Keep the browser window **in front and visible**. Browsers pause animation in hidden or background windows, so characters look frozen if you switch away and come back mid-line.
4. Language: **English**. Companion: **Aara**.
5. Click through the first line once, then restart, to warm up the page.

## The 90-second click path

| Time | Do | Say (suggested) |
|---|---|---|
| 0:00 | Homepage: the island map. Aara greets you from her boat. Point to the five islands, from Ghar to Nagar (under a cloud: coming soon). | "RituChakra is a voyage through real period moments: home, school, the market, friends, and the city. Kids pick who sails with them." |
| 0:10 | Tap the **Vidyalaya** island. The boat sails there, then the story opens with its title card and Aara speaks. | "Watch the characters: the speaker is highlighted, the listener reacts." |
| 0:18 | Tap **Continue** through Aara's two lines. | |
| 0:25 | Choose **"Ask a trusted friend for help."** The consequence card appears. Tap **See what happens**, then tap through 2 lines. | "Every choice shows its consequence, without shaming the learner." |
| 0:42 | **See their side** card → **Step into Aarav's view**. Tap through 2 lines. | "Then we switch perspective. Aarav, a boy, practises being an ally." |
| 0:52 | Choose **"Quietly offer help."** Consequence card → tap through to the reflect card → **Let's check together**. | |
| 1:05 | **Science Check.** Point to *What we heard*, then *What evidence says*, then the **source badges** (UNFPA, UNICEF, WHO). | "Every health fact is tied to WHO, UNICEF or UNFPA wording. We keep a public evidence register." |
| 1:15 | **Back to the conversation** → tap through to the end. The **reflection question** shows. | "We end with one question to discuss. No scores to beat." |
| 1:22 | Click **Try another choice**: it jumps back to Aarav's decision. | "Learners can go back and try another path." |
| 1:27 | Switch the language to **ଓଡ଼ିଆ** (or **हिन्दी**) on the same screen. | "Everything is available in Hindi and Odia, for a pan-India start in Odisha." |

**If the judges ask about schools without phones (or you have 20 more seconds):** click **Classroom view** (top right). Text becomes extra-large and each choice gets a vote counter. Say: "In the government school, students couldn't bring phones. The teacher runs one shared screen, the class raises hands, the teacher counts with + and −, and clicks the winning answer. No accounts, nothing stored." Turn it off again before continuing.

**If you have 20 more seconds:** open **Ghar**, set the companion to **Aarav**. Dadi asks Aarav to tell his sister Aara to stay out of the kitchen; Aarav asks why, respectfully. "Boys learn too, without ever being told they menstruate."

## What to say (and not say) about status

| ✅ Say | ❌ Don't claim |
|---|---|
| Four stories are playable end to end, every branch tested. | That Classroom view has been tested in a real classroom (it is a working prototype), or that Offline Mode exists as a feature (the local build runs offline, but there is no offline install). |
| Science Checks are sourced; see `docs/health-evidence-register.md`. | Measured learning gains (no evaluation yet). |
| Hindi and Odia text is in place and **under native-speaker review**. | That the translations are validated, or that there is Hindi/Odia voice. |
| It works on a shared classroom screen and on phones. | That RituReels is part of this demo (it is hidden). |

## Where to run it

| Option | URL / how | When |
|---|---|---|
| **A. Live site** | https://rituchakra-beta.vercel.app/ (after the `demo-upgrade` branch is deployed) | Default, if the venue Wi-Fi works |
| **B. Local production build (offline)** | Run `npm run build` once, then `npm start`, and open http://127.0.0.1:8787 | Wi-Fi is down. The app loads nothing from the internet (fonts are bundled). |
| **C. Local dev server** | `npm run dev`, then open http://[::1]:5173 (on this laptop `localhost` may not resolve to it) | Only if B fails |

## Backup plan

1. **Live site slow or down** → switch to option B (have it running in a second tab before you start).
2. **Laptop or projector fails** → open the live URL on a phone. The layout works at phone width.
3. **Everything fails** → play the screen recording. Record one practice run of this exact path beforehand, and keep 6 screenshots: map, stain moment, consequence card, Science Check with sources, reflection, Odia screen.
4. **A character looks frozen** → the window lost focus. Click into the page, or press **Restart story**.
5. **A Hindi/Odia line looks wrong** → switch back to English and say translations are under native review.
6. **You click the wrong choice** → keep going. Every branch reaches the Science Check, then use **Try another choice**.
