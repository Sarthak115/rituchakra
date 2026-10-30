# RituChakra: Demo Upgrade Plan (Phase 1)

Status: **draft, waiting for "go"**. Based on `docs/AUDIT.md` and your answers of 31 Oct:
- You will review the Hindi and Odia text yourself.
- Use Framer Motion (or the best tool) for much richer character animation.
- RituReels: remove it from the main page; keep the code and routes.
- Answers (round 2): Aara and Aarav are **siblings** in Ghar. Peer stories keep **both views** (Aara's moment, then Aarav's ally view). The demo runs mainly on a **laptop, but learners may use phones**, so phone layout and fonts are P0. You have **Vercel dashboard access** for the Phase 5 check.
- Stories must not be limited to girls. When the learner plays as Aarav, the period topic is raised about **Aara (his sister)**, and Aarav practises being an ally. Check every story for this.

All work happens on a new branch `demo-upgrade`, in small commits. Nothing goes to `main` or to a deploy without your OK.

---

## Decisions already taken (tell me if you disagree)

| Topic | Decision |
|---|---|
| Animation library | **`motion`** (the current package name for Framer Motion, `motion/react`), exact pinned version. Use `LazyMotion` + `m` components with the `domAnimation` feature set, about 15–20 KB gzipped. Animate only transform, opacity and SVG path `d` (all smooth on mid-range Android). |
| Characters | Keep the current illustrated look (palette, clothes, proportions) and rebuild it as a proper rig: `Aara.tsx`, `Aarav.tsx` and `Dadi.tsx` on a shared `CharacterRig` with separate head, eyes, brows, mouth, arms and body groups, so each part can move independently. |
| Boy/girl framing | Aarav **never** has a period in any line. In Ghar, Aarav mode is rewritten so Dadi's rule is about Aara and Aarav asks the respectful questions. In the peer stories (Stain, Bazaar, Joke), Aara is already the person menstruating and Aarav is the ally. Checked: no line implies a boy menstruates. |
| Auto-advance | ON by default: each line auto-advances after it is fully revealed plus reading time (about 55 ms per character, minimum 2.2 s). A visible **Pause** and **Next** control is always there, and choices never auto-select. Reduced motion shows text instantly; auto-advance still works and can be paused. |
| Reflection | One question per story, shown on screen to think about or discuss. **Nothing is typed or stored** (no child data). |
| Translations | Any HI/OR string I write or change goes into `docs/translations-qa.md` as **"machine draft – needs native review"** for you to check. Nothing is presented as final. |
| Health claims | Only claims I can tie to WHO, UNICEF, UNFPA or NHM pages that I actually open and read. Anything else is flagged **NEEDS REVIEW** in `docs/health-evidence-register.md`. |

---

## P0: must work for the demo

| # | Task | Effort | Files |
|---|---|---|---|
| 0 | **Setup**: create branch `demo-upgrade`; commit `docs/`; make eslint ignore `.vercel`, `.output`, `work`, `.wrangler` so lint checks only real code | 0.5 h | `eslint.config.mjs`, `docs/*` |
| 1 | **Hide RituReels**: remove the "Watch RituReels" banner from the homepage. Keep `/ritureels*` routes, components and data untouched. | 0.25 h | `components/worlds/WorldMap.tsx`, `app/globals.css` (banner CSS can stay) |
| 2 | **Character system**<br>• 8 expressions as props: neutral, curious, worried, embarrassed (blush, eyes down), thinking (eyes up, hand to chin), happy, surprised, reassuring (soft smile, head tilt, small nod). Old names are mapped so existing data keeps working.<br>• Per-character faces: Dadi gets softer older eyes, smile lines and grey brows; the kids get bigger eyes.<br>• Idle: random blinks (with occasional double blink), breathing, gentle sway, small eye glances.<br>• Speaking: mouth flap driven by the text reveal (stops when the line finishes), head nods, hand gesture.<br>• Listener: small nod or reaction when the speaker's line changes, slight lean toward the speaker.<br>• Smooth morphs between expressions (brows and mouth paths animate, about 250 ms).<br>• Speaker highlighted (full colour, slight scale-up, warm ground glow, name tag); listener dimmed (about 80 % brightness, slight desaturation).<br>• `prefers-reduced-motion`: static poses and instant swaps, no loops.<br>• Performance: no per-frame React state; loops run in motion's animation engine; transform and opacity only. | 9–11 h | new `components/characters/{CharacterRig,Aara,Aarav,Dadi,faces,expressions}.tsx`; update `Character.tsx` (kept as a wrapper), `CharacterPosition.tsx`, `lib/story/types.ts`; `package.json` (+`motion`) |
| 3 | **Ghar, Aarav mode**<br>• Add optional per-companion variants to dialogue and choices in the schema.<br>• Write Aarav-mode lines: Dadi asks Aarav to tell his sister Aara to stay out of the kitchen during her period; Aarav asks why; the same three choices reworded as an ally; the same Science Check.<br>• Ending: Aara joins Dadi and Aarav in the kitchen (3 characters on stage).<br>• Aara mode stays as it is, plus the missing payoff line *"Hamare zamaane mein humein kisi ne samjhaya nahi tha. Tum logon ko samajhna chahiye."*<br>• Thicken the thin "why" and "fact" branches by 1–2 lines each. | 3 h | `lib/story/types.ts`, `data/stories/dadiKiRasoi.ts`, `data/translations/index.ts` + `stories.ts`, `components/story/StoryScene.tsx` |
| 4 | **Projector and mobile layout**: the scene stage takes about 45–50 % of the viewport height, so the dialogue is fully visible at **1366×768** without scrolling; dialogue text about 28 px on desktop; minimum UI text 14 px; source labels about 15 px. | 2 h | `app/globals.css`, `StoryScene.tsx` |
| 5 | **Story experience polish** (shared `StoryScene`, so all 4 stories benefit)<br>• **Scene intro**: about 1.8 s world-title card over the backdrop (world, place, time); skippable.<br>• **Dialogue**: bubble with readable reveal, auto-advance with Pause/Next, a line-progress bar and a story stage tracker.<br>• **Choice cards**: animate in with a stagger; the selected card lifts and the others fade.<br>• **Consequence card**: shows the already-written `consequence` text after a choice. The tone is kind and never "wrong!". Missing consequence texts get written for The Stain, The Joke and Bazaar.<br>• **Science Check reveal**: a distinct card that flips or slides in, with: one short fact; a visible source label (organisation + title + link); an optional **"Culture & tradition"** note kept visually separate from the medical fact.<br>• **Reflection screen**: one question, plus **"Try another choice"** (jump back to the last choice point) and **"Replay"**.<br>• Language switch EN/HI/OR verified on every screen of the demo path. | 7–8 h | `components/story/*`, `components/science/ScienceCheck.tsx`, `lib/story/{engine,useStoryPlayer,types}.ts`, `data/stories/*`, `data/translations/*`, `app/globals.css` |
| 6 | **The Stain content**: fix the Science Check (the "What we heard" line becomes a real worry/belief, e.g. "If I get a stain at school, I have to hide it alone"); source it properly; add the reflection question; check that the Aara-then-Aarav perspective flow reads well with the new UI. | 1.5 h | `data/stories/theStain.ts`, translations |
| 7 | **Evidence register**: every Science Check claim (all 4 stories), its exact wording, source org/title/URL/section, and status. Unverifiable claims are marked NEEDS REVIEW. Bazaar product claims inside dialogue are included. | 2.5 h | `docs/health-evidence-register.md`, `data/stories/*` (source links) |
| 8 | **Translations QA list**: a story × language matrix; every new or changed HI/OR string listed as a machine draft for your review. | 1 h | `docs/translations-qa.md` |
| 9 | **Ship safely**<br>• Repair the lockfile so `npm ci` passes; pin `nitro`/`vinext` to the exact versions that build today.<br>• Fix the 11 lint errors (`<a href>` → `Link`; refactor the reel audio hook or scope a rule override, since that code stays hidden).<br>• Fix `vercel.json` `outputDirectory` after checking your dashboard settings.<br>• Production build plus a full demo-path test: console errors, 1366×768, a 360 px phone, reduced motion, HI/OR fonts.<br>• Write `docs/DEMO_SCRIPT.md` (90-second click path plus a backup plan). | 3–4 h | `package.json`, `package-lock.json`, `vercel.json`, `components/reels/*`, `components/story/StoryCompletion.tsx`, `docs/DEMO_SCRIPT.md` |

| 10 | **Fonts for HI/OR**: self-host Noto Sans Devanagari and Noto Sans Oriya (open licence, subset), so Hindi and Odia render the same on the laptop and on learners' phones. | 1 h | `public/fonts/*`, `app/globals.css` |

**P0 total: about 31–35 h of work.** Order: 0 → 1 → 2 → 3 → 4/5 → 6 → 7/8 → 9. The Vidyalaya → The Stain path is finished and tested first, then Ghar → Dadi Ki Rasoi.

## P1: nice to have, only after P0

| # | Task | Effort |
|---|---|---|
| 11 | **Classroom view** toggle: extra-large text, a "Class vote" step with tap-to-count tallies on each choice card, and the teacher clicks the winning choice. No accounts, no data stored. | 3 h |
| 12 | Market SVG backdrop to replace the 2 MB Bazaar PNG; park/community SVG for Sakhi Sabha (currently reuses the school corridor). | 3 h |
| 13 | Reflection and consequence content polish for Bazaar and The Joke (they get the new UI automatically). | 1.5 h |

## Not doing now
RituReels changes (hidden only); offline mode; AI or free-text responses; selfie avatars; deleting template leftovers (listed in the audit, harmless); multilingual voice.

## Risks
- **Animation performance on a weak Android or old laptop.** Mitigation: transform/opacity-only animation, a single `LazyMotion` bundle, and testing with a throttled CPU in DevTools. If needed, ambient sway turns off automatically on low-end devices (`hardwareConcurrency ≤ 4`).
- **New HI/OR text is unreviewed until you check it.** The QA list makes this explicit.
- **Source pages can change or block fetching.** Any claim I cannot verify is flagged, not invented.
- **vinext and nitro are betas.** Pinning plus a fixed lockfile keeps demo-day rebuilds identical. I will ask before any deploy.
