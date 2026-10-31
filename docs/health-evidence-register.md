# Health Evidence Register

Every health or product claim a learner sees in the four demo stories, the exact English wording, and the source passage it rests on. The Hindi/Odia wording of each claim is listed in `docs/translations-qa.md` (status: machine draft, needs native review).

- **Checked:** 1 Nov 2026, by Claude (AI assistant), reading the source pages listed below. Quotes are verbatim.
- **Human reviewer:** not yet. A health educator or doctor should countersign before wider rollout.
- **Next review due:** before the Grand Finale (Dec 2026), or whenever a source page changes.
- **Rule:** if wording goes beyond what the source says, change the wording, not the source.

## Sources

| Key | Organisation and title | URL | Date shown |
|---|---|---|---|
| WHO-MH | WHO, *Menstrual health* (fact sheet) | https://www.who.int/news-room/fact-sheets/detail/menstrual-health | 18 Jun 2026 |
| UNFPA-FAQ | UNFPA, *Menstruation and human rights – Frequently asked questions* | https://www.unfpa.org/menstruationfaq | May 2022 |
| UNICEF-HOME | UNICEF Parenting, *Talking about periods at home* | https://www.unicef.org/parenting/health/talking-about-periods-at-home | none shown |
| UNICEF-GUIDE | UNICEF, *Guide to Menstrual Hygiene Materials*, 1st ed. | https://www.unicef.org/documents/guide-menstrual-hygiene-materials (PDF: /media/91346/file/UNICEF-Guide-menstrual-hygiene-materials-2019.pdf) | May 2019 |
| UNICEF-FACTS | UNICEF, *Fast facts: Nine things you didn't know about menstruation* | https://www.unicef.org/press-releases/fast-facts-nine-things-you-didnt-know-about-menstruation | 25 May 2018 |
| NHM-MHS | National Health Mission (India), *Menstrual Hygiene Scheme* | https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1021&lid=391 | page updated 29 Oct 2026 |

## Claims shown in Science Checks

### Ghar: Dadi Ki Rasoi (`data/stories/dadiKiRasoi.ts`, scene `science`)

| ID | Exact wording shown | Source and passage | Status |
|---|---|---|---|
| GH-1 | "Menstruation is a natural bodily process." | WHO-MH: "Menstruation is a natural bodily process, but people who menstruate experience it differently." | ✅ Supported |
| GH-2 | "Menstrual blood is regular blood and tissue, with no special or dangerous properties." | UNFPA-FAQ: "Menstrual blood is composed of regular blood and tissue, with no special or dangerous properties." | ✅ Supported |
| GH-3 | "Rules about not handling food during a period come from culture and tradition." | UNFPA-FAQ: "Some restrictions are cultural, such as prohibitions on handling food or entering religious spaces, or the requirement that women and girls isolate themselves." | ✅ Supported. Deliberately does **not** say "there is no medical reason to stay out of a kitchen": no source states that literally. |
| GH-C | Culture note: "Families and communities follow different traditions. You can respect a tradition and still know the medical fact." | Not a health claim; a values statement that keeps tradition separate from the medical fact (product principle). | n/a |

### Vidyalaya: The Stain (`data/stories/theStain.ts`, scene `science`)

| ID | Exact wording shown | Source and passage | Status |
|---|---|---|---|
| ST-1 | "Periods can vary, especially in the first few years, and can start suddenly." | UNFPA-FAQ: "...they can also change or vary, particularly in the first few years after menarche." UNICEF-HOME: "...so she's ready if her period suddenly starts or if a friend needs help." | ✅ Supported |
| ST-2 | "Carrying a pad in your school bag helps you, or a friend who needs one." | UNICEF-HOME: "It can be a good idea for your daughter to carry menstrual products in her school bag so she's ready if her period suddenly starts or if a friend needs help." | ✅ Supported |
| ST-3 | "Shame and fear of teasing can keep girls away from school, so quiet, kind help matters." | UNICEF-HOME: "Girls may avoid attending school during their period due to fear of bullying and inadequate toilet facilities." WHO-MH: "Menstrual stigma can limit health and well-being, years of education completed..." | ✅ Supported ("so kind help matters" is the story's takeaway, not a cited claim) |

The old "What we heard" line ("Period stains can happen unexpectedly") was a fact, not a belief. It was replaced with the worry the story tackles: "If I get a stain at school, I have to hide it and manage alone."

### Sakhi Sabha: The Joke (`data/stories/theJoke.ts`, scene `science`)

| ID | Exact wording shown | Source and passage | Status |
|---|---|---|---|
| JK-1 | "Menstruation is a natural bodily process." | WHO-MH (same as GH-1) | ✅ Supported |
| JK-2 | "Stigma about periods can harm a person's well-being and even how long they stay in school." | WHO-MH: "Menstrual stigma can limit health and well-being, years of education completed, wages and income from paid work, and a sense of social and cultural belonging." | ✅ Supported |
| JK-3 | "Some girls avoid school during their period out of fear of bullying." | UNICEF-HOME: "Girls may avoid attending school during their period due to fear of bullying and inadequate toilet facilities." | ✅ Supported |

### Bazaar: Choose What Fits (`data/stories/chooseWhatFits.ts`, scene `science`)

| ID | Exact wording shown | Source and passage | Status |
|---|---|---|---|
| BZ-1 | "The choice of product is very personal. It depends on what feels comfortable, what is available where you live..." | UNICEF-HOME: "The choice of product is very personal, so see which one your daughter is comfortable with that is available where you live." | ✅ Supported |
| BZ-2 | "...cost..." | WHO-MH: many people lack access to menstrual materials "or they are too expensive". | ✅ Supported |
| BZ-3 | "...and whether you can wash, dry or dispose of it properly." | WHO-MH: education should "describe how to use and dispose of (or wash, dry and re-use) menstrual materials". UNICEF-GUIDE p.24: "Proper washing and drying is crucial for safe use". | ✅ Supported |
| BZ-4 | "Used disposable pads go in a bin, never down the toilet." | UNICEF-HOME: "Place used disposable menstrual products properly in a waste bin and never down flushing toilets as it may block the toilet." | ✅ Supported |

## Health or product claims inside dialogue

| ID | Story / line id | Exact wording | Source and passage | Status |
|---|---|---|---|---|
| BZ-5 | Bazaar `cup-fit` | "A menstrual cup can be reused for years. It takes learning, boiling it after each period, and comfort with insertion." | UNICEF-GUIDE p.30: "Cups are reusable for 5-10 years." "After each menstrual cycle the cup must be boiled for 5-10 minutes." Cup "is inserted into the vagina"; "Education and discussion of myths and perceptions are crucial for cup acceptability, as well as continued support". | ✅ Supported (reworded from "is reusable… cleaning") |
| BZ-6 | Bazaar `reuse-fit`, `reuse-plan` | "...if I prefer it and can wash, dry and store it properly." / "...a separate bag for used pads until they can be washed." | UNICEF-GUIDE p.24: "After use, they are washed, dried and re-used for approximately one year." It also mentions storage bags. UNICEF-HOME: carry "the used one home in a bag to wash". | ✅ Supported |
| BZ-7 | Bazaar `underwear-fit`, `underwear-plan` | "Period underwear is made of absorbent fabric..." / "...washing it according to its instructions." | UNFPA-FAQ lists "clean, absorbent fabrics such as cloths or period underwear". UNICEF-HOME: period underwear is carried home "in a bag to wash". | ✅ Supported (reworded from "absorbs menstrual blood") |
| BZ-8 | Bazaar `pad-fit`, `pad-plan` | "A disposable pad could be practical if I already feel comfortable using it." / "...somewhere to change and dispose of used pads." | WHO-MH notes the need for "safe, clean and private rooms in which they can change". Disposal: see BZ-4. | ✅ Supported. The unsourced sentence "It is often easy to find." was **removed**. |
| ST-D | The Stain `support` | "A stain can happen." | See ST-1. | ✅ Supported |

Everything else in the dialogue is about feelings, choices or respectful behaviour, not health facts.

## Not in the demo (RituReels, hidden from navigation)

These are recorded so nobody re-enables them unchecked.

| ID | Where | Wording | Note |
|---|---|---|---|
| RR-1 | `data/reels/rituReels.ts` kitchen reel | "There is no medical reason to keep someone who is menstruating from entering a kitchen or preparing food." | ⚠️ Reword to GH-1…GH-3 before re-enabling. No source says this literally. |
| RR-2 | temple reel | "It does not make a person medically impure." | ⚠️ Reword before re-enabling. Sources frame impurity as a belief or myth (WHO-MH: "the myth that menstruation is inherently dirty or unclean"; UNFPA-FAQ: "Some communities believe women and girls can spread misfortune or impurity"). Suggested wording: "Menstrual blood has no special or dangerous properties. The idea that periods make someone dirty is a myth." |

## Change log
- **1 Nov 2026:** register created. GH, ST, JK and BZ Science Checks rewritten to match source wording. Bazaar cup and underwear lines reworded; one unsourced sentence removed.
