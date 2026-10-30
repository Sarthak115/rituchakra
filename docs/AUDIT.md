# RituChakra: Phase 0 Audit

Date: 31 Oct 2026. Branch `main` @ `9837349` (working tree clean). Read-only audit: no application code was changed.
The context doc was copied from Downloads to `docs/RITUCHAKRA_CONTEXT.md` so it lives with the repo.

---

## 1. Stack, versions, structure

| Area | What is actually there |
|---|---|
| Framework | **vinext 1.0.0-beta.5**: a Vite 8 re-implementation of the Next.js App Router API. It is **not** the real Next.js build. `next@16.2.6` is installed only for its types, `next/*` imports and eslint config. |
| Origin | Scaffolded from an OpenAI Codex "site-creator-vinext-starter" (`package.json` name, `.openai/hosting.json`, `app/chatgpt-auth.ts`, Cloudflare/Wrangler/D1/Drizzle wiring). |
| React | 19.2.6 (+ RSC via `@vitejs/plugin-rsc`) |
| Language | TypeScript 5.9 (strict). `tsc --noEmit` passes. |
| Styling | Hand-written CSS in `app/globals.css` (minified-style, about 60 long lines) plus `app/ritureels/reels.css`. Tailwind 4 is installed but only the vendored shadcn `components/ui/*` use it. |
| UI kit | 62 shadcn components in `components/ui/`. **Only 2 are used** (`radio-group`, `select`). |
| Animation libs | **None.** No Framer Motion, Lottie or GSAP. All motion is CSS keyframes/transitions plus one JS blink timer. |
| State | `localStorage` key `rituchakra.progress.v1` through a `useSyncExternalStore` store (`lib/story/useProgress.ts`). No backend, DB or auth in use. |
| Audio (reels) | Browser `speechSynthesis` TTS (`lib/reels/useReelAudio.ts`). No recorded audio files exist. |
| Tests | `node:test` run via `tsx`: `tests/story.test.ts`, `tests/phase4.test.ts`. There is no `npm test` script. |
| Deploy | Vercel. `vercel.json` sets `framework: null`, `buildCommand: npm run build:vercel` (= `vite build` with the **nitro** plugin when `VERCEL` is set). |

**Folder layout:** there is no `src/`. Code sits at the repo root: `app/` (routes), `components/` (characters, story, worlds, reels, science, layout, ui), `lib/` (story engine, progress, language, reel audio), `data/` (stories, reels, translations, skills), `tests/`, `public/`.

Untracked local folders (all gitignored): `.next/`, `.vinext/`, `.vercel/output/`, `.wrangler/`, `dist/`, `work/` (old Codex scratch `.cjs` scripts).

## 2. Routes

| Route | File | Renders |
|---|---|---|
| `/` | `app/page.tsx` → `WorldMap` | Hero/tagline, language selector, companion picker (Aara/Aarav), 5 world cards (Ghar, Vidyalaya, Bazaar, Sakhi Sabha available; Nagar "Coming soon"), a **"Watch RituReels" banner** linking to `/ritureels`, and a footer. The "Explore the RituChakra Experience" showcase is **already removed** (its CSS remains). |
| `/ghar` | `StoryScene` with default story | **Dadi Ki Rasoi** (Dadi + selected companion, kitchen SVG) |
| `/vidyalaya` | `StoryScene storyData={theStain}` | **The Stain** (Aarav + Aara, school SVG) |
| `/bazaar` | `StoryScene storyData={chooseWhatFits}` | **Choose What Fits** (Aarav + Aara, 2 MB PNG backdrop) |
| `/sakhi-sabha` | `StoryScene storyData={theJoke}` | **The Joke** (Aarav + Aara, reuses the *school* SVG) |
| `/ritureels` | `ReelLibrary` | Reel list, filtered to show only *Dadi Ka Mandir* |
| `/ritureels/dadi-ka-mandir` | `ReelPlayer templeReel` | Auto-advancing reel with TTS |
| `/ritureels/dadi-ki-rasoi` | `ReelPlayer kitchenReel` | Hidden from the listing but the route is still live |
| `/nagar` | none | 404 (expected: the card is not a link) |

Every route returns 200 on the live site (checked with curl, 31 Oct). The live homepage matches `main` (it has "Watch RituReels" and no showcase).

## 3. Story data schema (`lib/story/types.ts`)

```
Story   { id, title, world, setting?: home|school|bazaar|community, startScene?, chapter?, subtitle?, context?,
          footerLabel?, stages?: string[5], completionImpact?, scenes: Record<id, Scene> }
Scene   { id, kind?: dialogue|narrative|science|perspective|end, dialogue: Dialogue[], choices?, choicePrompt?,
          nextScene?, narrative?, scienceCheck?, progress?: 0-5, view?: aara|aarav }
Dialogue{ id, speaker: aara|aarav|dadi|'companion', text, translation, expression, listener }
Choice  { id, text, translation, nextScene, skillImpact, consequence, companionExpression }
ScienceCheckContent { belief, evidence, takeaway, sources: {title,url}[] }
```

Engine (`lib/story/engine.ts`): pure `enterScene / advanceStory / selectChoice / restoreStoryState`. Player hook (`lib/story/useStoryPlayer.ts`) adds a 29 ms/grapheme typewriter, a 420 ms choice delay, checkpoint save on every transition, and skill-point rewards (Gyaan/Samvaad/Saath/Badlav, awarded once per story).

| Story | File | Route |
|---|---|---|
| Dadi Ki Rasoi | `data/stories/dadiKiRasoi.ts` | `/ghar` |
| The Stain | `data/stories/theStain.ts` | `/vidyalaya` |
| Choose What Fits | `data/stories/chooseWhatFits.ts` | `/bazaar` |
| The Joke | `data/stories/theJoke.ts` | `/sakhi-sabha` |
| Reels: Dadi Ki Rasoi, Dadi Ka Mandir | `data/reels/rituReels.ts` | `/ritureels/*` |

## 4. Characters today

- **One component draws all three**: `components/characters/Character.tsx`, an inline SVG (viewBox 250×410) that switches body, hair and clothing paths with `if dadi / aara / aarav`. Dadi wears a saree with a bun, glasses, bindi and earrings. Aara wears a teal kurta with a long braid and earrings. Aarav wears an orange kurta with short hair. It is original artwork in a flat, warm Indian illustrated style, and it **can be extended** rather than replaced.
- **One shared face**: `CharacterExpression.tsx`. All three characters have identical eyes, brows and mouth. Dadi has no age cues apart from the glasses.
- **Expression type (7):** `idle, happy, thinking, confused, surprised, concerned, relieved`. Visually only about 4 faces exist:
  - brows: neutral / worried (concerned + confused) / raised (surprised)
  - mouth: neutral / smile (happy + relieved) / frown (concerned + confused) / "O" (surprised)
  - `thinking` looks the same as idle apart from a CSS head tilt, pupil shift and raised arm.
- **Requested set vs. existing:**

| Requested | Exists? |
|---|---|
| neutral | `idle` ✓ |
| curious | ✗ missing |
| worried | `concerned` ✓ (weak) |
| embarrassed | ✗ missing (The Stain uses `confused` instead) |
| thinking | ✓ (tilt only) |
| happy | ✓ |
| surprised | ✓ |
| reassuring | ✗ missing (`relieved` is closest) |

- **Animation type (8):** `idle, talking, enter, exit, bounce, react, think, celebrate`. Only `idle`, `talking` and `react` are used.
- **Life-like motion today:**
  - Blink: a JS `setTimeout` toggles React state every 2.7–6 s, re-rendering the whole SVG.
  - Breathing: a CSS `scaleY(1.006)` loop, barely visible.
  - Talking: a CSS mouth flap, head bob and hand gesture while the typewriter runs.
  - Speaker vs. listener: the speaker gets `scale(1.025)` and brightness plus a "speaking bars" name tag; the listener gets `brightness(.96)`. This is too subtle to read on a projector.
  - Expression change: an instant swap with no cross-fade. There is no distinct listener reaction.
- **Reduced motion:** a global `prefers-reduced-motion` rule kills all animations and transitions, the blink, and the typewriter. ✓

## 5. Language (EN / HI / OD)

- The selected language is stored in the progress object (localStorage) and set by `LanguageSelector` (shadcn Select) on the map, story and reel pages. `LanguageBoundary` sets `<html lang>` **after hydration** (server HTML is always `lang="en"`).
- `translate(text, lang)` is an **English-keyed dictionary lookup** across `data/translations/{ui,stories,communityStories,reels}.ts`. A missing key **silently falls back to English**.
- `localizeStory()` translates titles, dialogue, choices, narrative, prompts, Science Checks and source titles.
- **Coverage check** (script run during the audit): all story strings have both HI and OR entries. Dadi Ki Rasoi 25/25, The Stain 37/37, Choose What Fits 52/52, The Joke 46/46. The existing test `phase4.test.ts` asserts the same.
- **Review status: unknown.** Nothing in the repo records a native-speaker review, so all HI/OR text must be treated as an *unreviewed draft*.
- Dadi Ki Rasoi's Hinglish `text` fields are never displayed. EN mode shows the English `translation` and HI mode shows the Devanagari dictionary entry.
- Fonts: HI/OR rely on the system fonts `Nirmala UI` / `Kalinga`. No web font is loaded, so Odia may render as boxes on machines without an Odia font. This must be tested on the actual demo laptop.
- Reel TTS: `hi-IN` / `or-IN` voices are often missing from browsers. The player then shows an "Audio could not play" error with a captions fallback.

## 6. Story completeness (context → choice → consequence → Science Check → reflection)

All 9 + 3 + 12 + 9 branch paths reach the end screen (16/16 engine tests pass). The gaps are content and UX, not crashes.

### Dadi Ki Rasoi (`/ghar`)
Path: opening (3 lines) → **choice** (why / fact / who told you) → consequence (**1 line** for why and fact; 2 lines plus a narrative for "source") → Science Check → understanding (3 lines) → resolution (1 line) → completion.
- 🔴 **Safety issue: if the learner picked Aarav, Dadi says "you shouldn't go into the kitchen during *your* period" to Aarav.** This implies a boy menstruates, which breaks a hard rule.
- `Choice.consequence` text is written for every choice but **never rendered**, so there is no clear consequence card.
- The why and fact branches are very thin (one Dadi line each).
- There is no learner reflection question. The end screen shows skill points only, and only the "source" branch gets a reflection narrative.
- The Science Check has no culture/tradition note ("practices vary between families") even though the topic is a tradition.
- The emotional payoff line from the context doc ("Hamare zamaane mein humein kisi ne samjhaya nahi tha…") is missing.

### The Stain (`/vidyalaya`)
Path: Aara opening (2 lines) → **choice 1** (friend / leave quietly / teacher) → consequence (2–3 lines) → shared "support" line → **perspective switch** → Aarav opening → **choice 2** (joke / ignore / quietly help) → consequence (3 lines) → reflection narrative → Science Check → resolution → completion. This is the most demo-worthy structure.
- The Science Check "What we heard" is *"Period stains can happen unexpectedly."* That is a fact, not a belief or myth, so the card reads oddly. Its source (UNICEF "Talking about periods at home") is only loosely tied to a school situation.
- There is no learner reflection question, and the consequence text is unused here too.
- "Embarrassed" is drawn with the `confused` face.
- The companion choice is ignored. Peer stories always place Aarav on the left and Aara on the right, which is correct for this story, but the map picker has no visible effect.
- 🔴 **At 1366×768 the dialogue box starts at y = 673 px of 768**, so the story text is below the fold on a projector (measured on the live site).
- The tab title is "RituChakra — Dadi Ki Rasoi" because `app/vidyalaya/page.tsx` has no metadata. `/ghar` has the same problem.

### Choose What Fits (`/bazaar`)
Path: 5 opening lines → choose 1 of 4 products → 3-line exploration → "how will you decide" choice (3) → consequence (2 lines) → Science Check → resolution → closing narrative → completion. Structurally complete.
- Dialogue contains **product/health claims outside the Science Check** (cup insertion and cleaning, period-underwear absorption, reusable pad washing and drying). These need sources in the evidence register.
- Backdrop is a 2.0 MB PNG rendered with `<img>` (slow on school Wi-Fi).

### The Joke (`/sakhi-sabha`)
Path: opening → narrative → perspective switch → **choice 1** (laugh / ignore / step in) → consequence → check-in **choice 2** → consequence → reflection narrative → Science Check → resolution → closing → completion. The most complete loop.
- It uses the school corridor backdrop, not a park or community space.
- The Science Check source is a generic UNICEF WASH page.

### Science Check component (`components/science/ScienceCheck.tsx`)
It has "What we heard", "What evidence says", "Remember" and source links. It has **no slot for a culture/religion note**, the source links are 11 px (unreadable on a projector), and it opens without a reveal moment (same fade as everything else).

## 7. Vercel build investigation (nothing changed)

- **The current live deploy works**: all routes return 200 and it contains the latest commit's features.
- The historical `.next/routes-manifest.json missing` error is what Vercel's **Next.js builder** says when it auto-detects `next` in `package.json` while the app was actually built by vinext (Vite), which never writes `.next/routes-manifest.json`. Commit `4dd0fd1` addressed it with `vercel.json` (`framework: null`) plus `build:vercel` (vite plus nitro, writing Vercel Build Output API v3 to `.vercel/output`).
- Local reproduction: `VERCEL=1 npm run build:vercel` ✓ (36 s) produces `.vercel/output/config.json` with `framework: nitro`. `npm run build` (vinext/Cloudflare) also passes ✓.
- **Residual risks:**
  1. `vercel.json` says `outputDirectory: ".output"`, but nitro writes `.vercel/output` and `.output` never exists. It works only because Vercel prefers `.vercel/output` when present, so the setting is misleading.
  2. `nitro@^3.0.260903-beta` is a beta with a caret range, and `vinext` is a beta too.
  3. **`npm ci` fails**: `package-lock.json` is out of sync (missing `@emnapi/*`). Vercel runs `npm install`, which can re-resolve and pull a newer beta on a demo-day redeploy.
- I could not see the Vercel dashboard or its build logs (no Vercel CLI login here). To confirm: the dashboard *Framework Preset* override, *Node.js version* (≥ 22.13 required by `engines`), and the last build log.

## 8. Install / lint / build / test results

| Command | Result |
|---|---|
| `npm ci` | ❌ **Fails**: lockfile out of sync (`@emnapi/runtime@1.11.3`, `@emnapi/core@1.11.3`, `@emnapi/wasi-threads@1.2.3/1.2.1` missing). The existing `node_modules` was left intact. |
| `npm run lint` | ❌ **2994 problems (16 errors)**. Almost all come from linting untracked build output (`.vercel/output`, `work/`) because the ignore list only covers `dist`, `.next` and `build`. |
| eslint on **tracked files only** | ❌ **11 errors, 4 warnings**: 5× `no-html-link-for-pages` (`<a href="/">` in ReelLibrary ×2, ReelPlayer, StoryCompletion, StoryScene); 4× react-hooks `refs` / `set-state-in-effect` + 1× `prefer-const` in `useReelAudio.ts`/`ReelPlayer.tsx`; warnings: `<img>` in StoryScene, missing dep, unused import in a test, and an unparseable `build/sites-vite-plugin.ts`. |
| `npx tsc --noEmit` | ✅ pass |
| `npx tsx --test tests/*.test.ts` | ✅ 16/16 pass (engine, branches, saves, translations) |
| `npm run build` (vinext) | ✅ pass, 8 routes |
| `VERCEL=1 npm run build:vercel` | ✅ pass |
| Live site, `/vidyalaya` at 1366×768 | ✅ no console errors; ❌ dialogue below the fold |

## 9. Bugs, dead code, a11y, performance

**Bugs / content risks**
1. 🔴 Aarav as companion in Dadi Ki Rasoi implies a boy menstruates.
2. 🔴 Projector layout: at 1366×768 the dialogue text sits below the fold on every story page.
3. `Choice.consequence` is authored but never shown, so there is no explicit consequence step.
4. No reflection question in any of the 4 stories. The end screen is skill points plus Replay.
5. The Science Check has no source date or culture note, and The Stain's "belief" is not a belief.
6. Page titles on `/ghar` and `/vidyalaya` show "Dadi Ki Rasoi" (layout default).
7. The homepage still links to RituReels ("Watch RituReels"), and `/ritureels/dadi-ki-rasoi` is reachable.
8. The map companion picker only affects Ghar. Its effect elsewhere is unclear to the learner.
9. Speaker vs. listener contrast and expression changes are too subtle at classroom distance.

**Dead code / template leftovers** (safe to leave for the demo; listed for honesty):
- `app/chatgpt-auth.ts`, `db/`, `drizzle/`, `examples/`, `cloudflare-env.d.ts`, `.openai/hosting.json`
- 60 unused `components/ui/*`, `hooks/use-mobile.ts`, `app/worlds.module.css` (an unused duplicate of map CSS)
- `.world-map-overview` / `preview-*` CSS (removed showcase), `en.end/endHint/another`
- the `Animation` values `enter/exit/bounce/think/celebrate`
- unused `public/{file,globe,window}.svg`
- the `useStoryTool` WebMCP hook (`document.modelContext`, a Codex leftover; harmless)
- the `"codex-preview"` meta tag

**Accessibility**
- Many 9–12 px labels (eyebrows, sources, progress steps). Muted text `#797262` on `#faf6ed` is about 4.4:1, borderline.
- Character `aria-label` uses the raw id ("aara, Thinking").
- Server HTML is always `lang="en"`.
- Good: dialogue has an `aria-live` region, focus moves to the next action, there are keyboard paths, and reduced motion is respected.

**Performance**
- 2 MB bazaar PNG.
- The blink state re-renders each character SVG every few seconds. Cheap, but it could be pure CSS.
- `useLanguage` builds a `copy` object on every render.
- These are all minor. The rest is lightweight (no animation libs).

## 10. Feature status

| Feature | Built | Works | Notes |
|---|---|---|---|
| World map, 5 worlds, correct order, Nagar "Coming soon" | ✅ | ✅ | |
| Aara/Aarav selection persisted (localStorage) | ✅ | ⚠️ | Persists across reloads; only used by Ghar |
| Dadi Ki Rasoi end-to-end | ✅ | ⚠️ | Runs; **Aarav pronoun/safety bug**, thin branches, no reflection |
| The Stain end-to-end (9 paths) | ✅ | ⚠️ | Runs; weak Science Check, no reflection, projector fold |
| Choose What Fits | ✅ | ✅ | Unsourced product claims in dialogue |
| The Joke | ✅ | ✅ | Wrong backdrop |
| Consequence step | ⚠️ data only | ❌ | `consequence` never rendered |
| Science Check with sources | ✅ | ✅ | Tiny links, no culture note, no evidence register |
| Reflection question | ❌ | n/a | Missing |
| EN/HI/OR switching on story pages | ✅ | ✅ | All strings present; **not reviewed** |
| Character SVGs, 3 characters | ✅ | ✅ | One shared face |
| Expressions (8 requested) | ⚠️ 5/8 | ⚠️ | No curious/embarrassed/reassuring; weak thinking |
| Blink / breathe / mouth flap | ✅ | ✅ | Subtle; no listener reaction, no cross-fade |
| Speaker highlight / listener dim | ✅ | ⚠️ | Too subtle for a projector |
| Reduced motion | ✅ | ✅ | |
| Scene backgrounds | ⚠️ | ⚠️ | Kitchen, school SVG; bazaar PNG; no park |
| Auto-advance dialogue | ❌ (stories) / ✅ (reels) | | Stories are tap-to-continue |
| RituReels (2 reels, TTS) | ✅ | ⚠️ | HI/OR voices device-dependent; must be hidden |
| Explore-experience showcase | removed | n/a | CSS leftovers only |
| Evidence register | ❌ | n/a | |
| Translation QA list | ❌ | n/a | |
| Classroom view | ❌ | n/a | |
| Offline mode | ❌ | n/a | |
| Lint clean | ❌ | | 11 errors in tracked files plus config scanning build output |
| `npm ci` | ❌ | | Lockfile out of sync |
| Build (vinext / Vercel) | ✅ | ✅ | Live site up |
